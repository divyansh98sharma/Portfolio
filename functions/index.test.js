import assert from 'node:assert/strict'
import test from 'node:test'
import { createContactHandler, looksAutomated } from './index.js'

const ORIGIN = 'https://divyanshsharma.work'
const NOW = 1_800_000_000_000

function validBody(overrides = {}) {
  return {
    name: 'Aarav Mehta',
    email: 'aarav@example.com',
    service: 'Design systems audit',
    message: 'We need help auditing and scaling our product design system.',
    website: '',
    formStartedAt: String(NOW - 15_000),
    ...overrides,
  }
}

function createResponse() {
  return {
    headers: {},
    statusCode: 200,
    body: undefined,
    set(name, value) {
      this.headers[name] = value
      return this
    },
    status(code) {
      this.statusCode = code
      return this
    },
    json(value) {
      this.body = value
      return this
    },
    send(value) {
      this.body = value
      return this
    },
  }
}

async function submit(handler, body, options = {}) {
  const req = {
    method: options.method ?? 'POST',
    headers: {
      origin: options.origin ?? ORIGIN,
      'x-forwarded-for': options.ip ?? '203.0.113.10',
    },
    body,
  }
  const res = createResponse()
  await handler(req, res)
  return res
}

test('delivers a legitimate inquiry', async () => {
  const sent = []
  const handler = createContactHandler({ sendEmail: async (email) => sent.push(email), now: () => NOW })
  const res = await submit(handler, validBody())

  assert.equal(res.statusCode, 200)
  assert.equal(sent.length, 1)
  assert.equal(sent[0].replyTo, 'aarav@example.com')
})

test('silently drops a filled honeypot', async () => {
  let sends = 0
  const handler = createContactHandler({ sendEmail: async () => sends++, now: () => NOW })
  const res = await submit(handler, validBody({ website: 'https://spam.example' }))

  assert.equal(res.statusCode, 200)
  assert.equal(sends, 0)
})

test('silently drops submissions completed too quickly', () => {
  assert.equal(looksAutomated(validBody({ formStartedAt: String(NOW - 500) }), NOW), true)
})

test('silently drops random single-token messages', () => {
  assert.equal(looksAutomated(validBody({ message: 'LNvaPecolGFGCsGBsPbabCXF' }), NOW), true)
})

test('allows a plausible single-token message', () => {
  assert.equal(looksAutomated(validBody({ message: 'ConsultationNeeded' }), NOW), false)
})

test('rejects requests from an unapproved origin', async () => {
  const handler = createContactHandler({ sendEmail: async () => {}, now: () => NOW })
  const res = await submit(handler, validBody(), { origin: 'https://spam.example' })

  assert.equal(res.statusCode, 403)
})

test('limits repeated submissions by IP', async () => {
  const handler = createContactHandler({ sendEmail: async () => {}, now: () => NOW })
  for (let index = 0; index < 3; index++) {
    const res = await submit(handler, validBody({ email: `person${index}@example.com` }))
    assert.equal(res.statusCode, 200)
  }

  const limited = await submit(handler, validBody({ email: 'fourth@example.com' }))
  assert.equal(limited.statusCode, 429)
})
