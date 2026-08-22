import { http } from '@google-cloud/functions-framework'
import { Resend } from 'resend'

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
