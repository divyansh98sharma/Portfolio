import { http } from '@google-cloud/functions-framework'
import { Resend } from 'resend'

const ALLOWED_ORIGINS = new Set([
  'https://divyanshsharma.work',
  'https://divyansh98sharma.github.io',
])

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

http('sendContactEmail', async (req, res) => {
  const origin = req.headers.origin
  if (ALLOWED_ORIGINS.has(origin)) {
    res.set('Access-Control-Allow-Origin', origin)
    res.set('Vary', 'Origin')
  }
  res.set('Access-Control-Allow-Methods', 'POST')
  res.set('Access-Control-Allow-Headers', 'Content-Type')

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

  const { name, email, service, message } = req.body
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    await resend.emails.send({
      from: 'Portfolio Contact <contact@send.thecollabrix.com>',
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
})
