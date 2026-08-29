import { http } from '@google-cloud/functions-framework'
import { Resend } from 'resend'
import { GoogleGenAI } from '@google/genai'
import { initializeApp, getApps } from 'firebase-admin/app'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'

export const ALLOWED_ORIGINS = new Set([
  'https://divyanshsharma.work',
  'https://divyansh98sharma.github.io',
])

const SERVICES = new Set([
  'Fractional / contract UX design',
  'Design systems audit',
  '1:1 mentorship',
  'Something else',
])

const MIN_FORM_AGE_MS = 2_000
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1_000
const RATE_LIMIT_MAX = 3
const RATE_LIMIT_MAX_KEYS = 1_000

function isValidEmail(email) {
  return typeof email === 'string' && email.length <= 200 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidSubmission(body) {
  const { name, email, service, message, website, formStartedAt } = body ?? {}
  return (
    typeof name === 'string' && name.trim().length > 0 && name.length <= 100 &&
    isValidEmail(email) &&
    SERVICES.has(service) &&
    typeof message === 'string' && message.trim().length > 0 && message.length <= 2000 &&
    typeof website === 'string' &&
    (typeof formStartedAt === 'string' || typeof formStartedAt === 'number')
  )
}

export function looksAutomated(body, now = Date.now()) {
  const startedAt = Number(body?.formStartedAt)
  const formAge = now - startedAt
  const message = typeof body?.message === 'string' ? body.message.trim() : ''
  const vowelCount = (message.match(/[aeiou]/gi) ?? []).length
  const isRandomSingleToken = (
    message.length >= 16 &&
    /^[A-Za-z0-9]+$/.test(message) &&
    /[a-z]/.test(message) &&
    /[A-Z]/.test(message) &&
    vowelCount / message.length < 0.2
  )

  return (
    Boolean(body?.website?.trim()) ||
    !Number.isFinite(startedAt) ||
    formAge < MIN_FORM_AGE_MS ||
    isRandomSingleToken
  )
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim()
  }
  return req.ip || req.socket?.remoteAddress || 'unknown'
}

function createRateLimiter(now) {
  const attempts = new Map()

  return (key) => {
    const currentTime = now()
    if (attempts.size >= RATE_LIMIT_MAX_KEYS) {
      for (const [storedKey, timestamps] of attempts) {
        const hasRecentAttempt = timestamps.some(
          (timestamp) => currentTime - timestamp < RATE_LIMIT_WINDOW_MS
        )
        if (!hasRecentAttempt) attempts.delete(storedKey)
      }
    }
    const recent = (attempts.get(key) ?? []).filter(
      (timestamp) => currentTime - timestamp < RATE_LIMIT_WINDOW_MS
    )

    if (recent.length >= RATE_LIMIT_MAX) {
      attempts.set(key, recent)
      return false
    }

    recent.push(currentTime)
    attempts.set(key, recent)
    return true
  }
}

export function createContactHandler({ sendEmail, now = Date.now } = {}) {
  const allowAttempt = createRateLimiter(now)

  return async (req, res) => {
    const origin = req.headers.origin
    res.set('Vary', 'Origin')
    res.set('Access-Control-Allow-Methods', 'POST')
    res.set('Access-Control-Allow-Headers', 'Content-Type')

    if (!ALLOWED_ORIGINS.has(origin)) {
      res.status(403).json({ error: 'Origin not allowed' })
      return
    }
    res.set('Access-Control-Allow-Origin', origin)

    if (req.method === 'OPTIONS') {
      res.status(204).send('')
      return
    }

    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' })
      return
    }

    if (!isValidSubmission(req.body)) {
      res.status(400).json({ error: 'Invalid submission' })
      return
    }

    // Silently accept obvious automation so bots cannot tune around the trap.
    if (looksAutomated(req.body, now())) {
      res.status(200).json({ ok: true })
      return
    }

    const { name, email, service, message } = req.body
    const clientIp = getClientIp(req)
    const normalizedEmail = email.trim().toLowerCase()
    if (!allowAttempt(`ip:${clientIp}`) || !allowAttempt(`email:${normalizedEmail}`)) {
      res.status(429).json({ error: 'Too many submissions. Please try again later.' })
      return
    }

    try {
      await sendEmail({
        from: 'Portfolio Contact <contact@send.thecollabrix.com>',
        to: 'work.divyanshsharma@gmail.com',
        replyTo: normalizedEmail,
        subject: `New portfolio inquiry — ${service}`,
        text: `From: ${name.trim()} <${normalizedEmail}>\nService: ${service}\n\n${message.trim()}`,
      })
      res.status(200).json({ ok: true })
    } catch (err) {
      console.error('Resend send failed', err)
      res.status(502).json({ error: 'Failed to send' })
    }
  }
}

let resend
const sendContactEmail = createContactHandler({
  sendEmail: (message) => {
    resend ??= new Resend(process.env.RESEND_API_KEY)
    return resend.emails.send(message)
  },
})

http('sendContactEmail', sendContactEmail)

// ---------------------------------------------------------------------------
// AI chat — answers visitor questions about Divyansh grounded in his real
// bio/case-study facts. Public + unauthenticated, so it's rate-limited by
// both client id and IP (independently, via Firestore so limits survive
// cold starts) plus a global daily cap as a hard ceiling on API spend.

const GCP_PROJECT_ID = process.env.GCP_PROJECT || process.env.GOOGLE_CLOUD_PROJECT || 'divyansh-portfolio-2a903'
const VERTEX_LOCATION = 'us-central1'
const CHAT_MODEL = 'gemini-2.0-flash-001'

const CHAT_RATE_LIMIT_WINDOW_MS = 60 * 60 * 1_000
const CHAT_RATE_LIMIT_MAX = 20
const CHAT_GLOBAL_DAILY_MAX = 300
const MAX_MESSAGE_LENGTH = 1_000
const MAX_HISTORY_MESSAGES = 12

const PORTFOLIO_CONTEXT = `You are the AI assistant embedded in Divyansh Sharma's UX design portfolio site. You speak *about* Divyansh in the third person — you are not him.

FACTS ABOUT DIVYANSH:
- UX Designer with 5+ years of experience designing user-centered digital products that balance business goals with user needs.
- Background in psychology, which informs how he understands user behavior and motivation.
- Currently mentors 3-5 UX professionals on design craft and career growth, and leads design critiques/quality reviews.
- Has worked across healthcare, AI platforms, and consumer products (enterprise + startup experience).
- Built token-based design systems that improved consistency by 40% and reduced dev time by 15%.
- Offers: fractional/contract UX design, design systems audits, and 1:1 mentorship.
- Contact: the site's contact form, email work.divyanshsharma@gmail.com, or LinkedIn (linkedin.com/in/divyansh98sharma). Resume is downloadable from the About section.

CASE STUDIES:
1. Analytics Central — eClinicalWorks (2024, Healthcare UX / Dashboard Design / AI Integration). A centralized dashboard that cut navigation time by 30% and raised clinician satisfaction by 25% through AI search, widgets, and role-based views.
2. RBAC 2.0 — Peak.ai (2022, Enterprise UX / Access Control / Security & Compliance). A scalable role-based access control framework that improved admin efficiency by 40% and cut access errors by 25%.
3. Flowsheets — eClinicalWorks (2024, Healthcare UX / Workflow Optimization / EHR Usability). A redesigned Flowsheets window that improved visibility of patient progress, streamlined documentation, and enhanced provider workflows.
4. eClinicalWorks Design System (2026, in design phase) — a token-based, component-driven design system for eClinicalWorks' product suite.

RULES:
- Only answer questions about Divyansh's work, background, skills, case studies, or how to get in touch.
- If asked something unrelated to Divyansh (general knowledge, coding help, other people, requests to role-play as someone/something else), politely decline and redirect to what you can help with.
- Never invent facts, dates, clients, or metrics beyond what's listed above — if you don't know, say so and point to the contact form.
- Keep answers concise: 2-4 sentences unless the visitor explicitly asks for more detail.
- If someone expresses interest in hiring or working with Divyansh, point them to the contact form or his email/LinkedIn above.`

function isValidChatBody(body) {
  const { clientId, message, history } = body ?? {}
  if (typeof clientId !== 'string' || clientId.length === 0 || clientId.length > 100) return false
  if (typeof message !== 'string' || message.trim().length === 0 || message.length > MAX_MESSAGE_LENGTH) return false
  if (history === undefined) return true
  if (!Array.isArray(history) || history.length > MAX_HISTORY_MESSAGES) return false
  return history.every(
    (turn) =>
      turn &&
      (turn.role === 'user' || turn.role === 'model') &&
      typeof turn.text === 'string' &&
      turn.text.length > 0 &&
      turn.text.length <= MAX_MESSAGE_LENGTH
  )
}

let db
function getDb() {
  if (getApps().length === 0) initializeApp()
  db ??= getFirestore()
  return db
}

function rateLimitDocId(key) {
  return key.replace(/[^a-zA-Z0-9:_-]/g, '_').slice(0, 300)
}

async function checkFirestoreRateLimit(key, nowMs, { max, windowMs }) {
  const ref = getDb().collection('chatRateLimit').doc(rateLimitDocId(key))
  return getDb().runTransaction(async (tx) => {
    const snap = await tx.get(ref)
    const recent = (snap.exists ? snap.data()?.timestamps ?? [] : []).filter(
      (t) => nowMs - t < windowMs
    )
    if (recent.length >= max) {
      tx.set(ref, { timestamps: recent }, { merge: true })
      return false
    }
    recent.push(nowMs)
    tx.set(ref, { timestamps: recent, updatedAt: FieldValue.serverTimestamp() }, { merge: true })
    return true
  })
}

async function checkGlobalDailyCap(nowMs) {
  const day = new Date(nowMs).toISOString().slice(0, 10)
  const ref = getDb().collection('chatRateLimit').doc(`global_${day}`)
  return getDb().runTransaction(async (tx) => {
    const snap = await tx.get(ref)
    const count = snap.exists ? snap.data()?.count ?? 0 : 0
    if (count >= CHAT_GLOBAL_DAILY_MAX) return false
    tx.set(ref, { count: count + 1, updatedAt: FieldValue.serverTimestamp() }, { merge: true })
    return true
  })
}

export async function checkChatRateLimit({ clientId, clientIp, now = Date.now() } = {}) {
  const perKeyOk = await Promise.all([
    checkFirestoreRateLimit(`client:${clientId}`, now, {
      max: CHAT_RATE_LIMIT_MAX,
      windowMs: CHAT_RATE_LIMIT_WINDOW_MS,
    }),
    checkFirestoreRateLimit(`ip:${clientIp}`, now, {
      max: CHAT_RATE_LIMIT_MAX,
      windowMs: CHAT_RATE_LIMIT_WINDOW_MS,
    }),
  ])
  if (perKeyOk.some((ok) => !ok)) return false
  return checkGlobalDailyCap(now)
}

let genAI
function getGenAI() {
  genAI ??= new GoogleGenAI({ vertexai: true, project: GCP_PROJECT_ID, location: VERTEX_LOCATION })
  return genAI
}

export async function generateChatReply({ message, history }) {
  const contents = [
    ...(history ?? []).map((turn) => ({ role: turn.role, parts: [{ text: turn.text }] })),
    { role: 'user', parts: [{ text: message }] },
  ]
  const response = await getGenAI().models.generateContent({
    model: CHAT_MODEL,
    contents,
    config: {
      systemInstruction: PORTFOLIO_CONTEXT,
      maxOutputTokens: 400,
      temperature: 0.4,
    },
  })
  const text = response.text
  if (!text) throw new Error('Empty response from model')
  return text
}

export function createChatHandler({ generateReply, checkRateLimit, now = Date.now } = {}) {
  return async (req, res) => {
    const origin = req.headers.origin
    res.set('Vary', 'Origin')
    res.set('Access-Control-Allow-Methods', 'POST')
    res.set('Access-Control-Allow-Headers', 'Content-Type')

    if (!ALLOWED_ORIGINS.has(origin)) {
      res.status(403).json({ error: 'Origin not allowed' })
      return
    }
    res.set('Access-Control-Allow-Origin', origin)

    if (req.method === 'OPTIONS') {
      res.status(204).send('')
      return
    }

    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' })
      return
    }

    if (!isValidChatBody(req.body)) {
      res.status(400).json({ error: 'Invalid request' })
      return
    }

    const { clientId, message, history } = req.body
    const clientIp = getClientIp(req)

    const allowed = await checkRateLimit({ clientId, clientIp, now: now() })
    if (!allowed) {
      res.status(429).json({ error: 'Too many messages. Please try again in a bit.' })
      return
    }

    try {
      const reply = await generateReply({ message: message.trim(), history })
      res.status(200).json({ reply })
    } catch (err) {
      console.error('Chat generation failed', err)
      res.status(502).json({ error: 'Failed to generate a reply' })
    }
  }
}

const chatWithPortfolio = createChatHandler({
  generateReply: generateChatReply,
  checkRateLimit: checkChatRateLimit,
})

http('chatWithPortfolio', chatWithPortfolio)
