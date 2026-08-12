const { onRequest } = require('firebase-functions/v2/https')
const { defineSecret } = require('firebase-functions/params')
const { Resend } = require('resend')

const RESEND_API_KEY = defineSecret('RESEND_API_KEY')

// Custom domain + the raw GitHub Pages URL as a fallback, so the function
// only answers CORS preflight for requests actually coming from this site.
const ALLOWED_ORIGINS = ['https://divyanshsharma.work', 'https://divyansh98sharma.github.io']

const SERVICES = new Set([
  'Fractional / contract UX design',
  'Design systems audit',
  '1:1 mentorship',
  'Something else',
])

function isValidEmail(email) {
  return typeof email === 'string' && email.length <= 200 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidSubmission(body) {
  const { name, email, service, message } = body ?? {}
  return (
    typeof name === 'string' && name.trim().length > 0 && name.length <= 100 &&
    isValidEmail(email) &&
    SERVICES.has(service) &&
    typeof message === 'string' && message.trim().length > 0 && message.length <= 2000
  )
}

exports.sendContactEmail = onRequest(
  { region: 'us-central1', secrets: [RESEND_API_KEY], cors: ALLOWED_ORIGINS },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' })
      return
    }

    if (!isValidSubmission(req.body)) {
      res.status(400).json({ error: 'Invalid submission' })
      return
    }

    const { name, email, service, message } = req.body
    const resend = new Resend(RESEND_API_KEY.value())

    try {
      await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: 'work.divyanshsharma@gmail.com',
        replyTo: email,
        subject: `New portfolio inquiry — ${service}`,
        text: `From: ${name.trim()} <${email}>\nService: ${service}\n\n${message.trim()}`,
      })
      res.status(200).json({ ok: true })
    } catch (err) {
      console.error('Resend send failed', err)
      res.status(502).json({ error: 'Failed to send' })
    }
  }
)
