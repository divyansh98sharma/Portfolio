import assert from 'node:assert/strict'
import test from 'node:test'
import { createChatHandler } from './index.js'

const ORIGIN = 'https://divyanshsharma.work'
const NOW = 1_800_000_000_000

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

test('replies to a valid message', async () => {
  const calls = []
  const handler = createChatHandler({
    generateReply: async (args) => {
      calls.push(args)
      return 'Divyansh has 5+ years of UX experience.'
    },
    checkRateLimit: async () => true,
    now: () => NOW,
  })

  const res = await submit(handler, { clientId: 'client-1', message: 'What does Divyansh do?' })

  assert.equal(res.statusCode, 200)
  assert.equal(res.body.reply, 'Divyansh has 5+ years of UX experience.')
  assert.equal(calls.length, 1)
  assert.equal(calls[0].message, 'What does Divyansh do?')
})

test('rejects a missing clientId', async () => {
  const handler = createChatHandler({
    generateReply: async () => 'unused',
    checkRateLimit: async () => true,
    now: () => NOW,
  })

  const res = await submit(handler, { message: 'Hello' })
  assert.equal(res.statusCode, 400)
})

test('rejects an empty message', async () => {
  const handler = createChatHandler({
    generateReply: async () => 'unused',
    checkRateLimit: async () => true,
    now: () => NOW,
  })

  const res = await submit(handler, { clientId: 'client-1', message: '   ' })
  assert.equal(res.statusCode, 400)
})

test('rejects an oversized message', async () => {
  const handler = createChatHandler({
    generateReply: async () => 'unused',
    checkRateLimit: async () => true,
    now: () => NOW,
  })

  const res = await submit(handler, { clientId: 'client-1', message: 'x'.repeat(1_001) })
  assert.equal(res.statusCode, 400)
})

test('rejects malformed history entries', async () => {
  const handler = createChatHandler({
    generateReply: async () => 'unused',
    checkRateLimit: async () => true,
    now: () => NOW,
  })

  const res = await submit(handler, {
    clientId: 'client-1',
    message: 'Hello',
    history: [{ role: 'system', text: 'not allowed' }],
  })
  assert.equal(res.statusCode, 400)
})

test('rejects requests from an unapproved origin', async () => {
  const handler = createChatHandler({
    generateReply: async () => 'unused',
    checkRateLimit: async () => true,
    now: () => NOW,
  })

  const res = await submit(handler, { clientId: 'client-1', message: 'Hi' }, { origin: 'https://spam.example' })
  assert.equal(res.statusCode, 403)
})

test('returns 429 when the rate limiter denies the request', async () => {
  const handler = createChatHandler({
    generateReply: async () => 'unused',
    checkRateLimit: async () => false,
    now: () => NOW,
  })

  const res = await submit(handler, { clientId: 'client-1', message: 'Hi' })
  assert.equal(res.statusCode, 429)
})

test('passes clientId and clientIp to the rate limiter', async () => {
  let seen
  const handler = createChatHandler({
    generateReply: async () => 'unused',
    checkRateLimit: async (args) => {
      seen = args
      return true
    },
    now: () => NOW,
  })

  await submit(handler, { clientId: 'client-1', message: 'Hi' }, { ip: '198.51.100.7' })
  assert.equal(seen.clientId, 'client-1')
  assert.equal(seen.clientIp, '198.51.100.7')
  assert.equal(seen.now, NOW)
})

test('returns 502 when generation fails', async () => {
  const handler = createChatHandler({
    generateReply: async () => {
      throw new Error('model unavailable')
    },
    checkRateLimit: async () => true,
    now: () => NOW,
  })

  const res = await submit(handler, { clientId: 'client-1', message: 'Hi' })
  assert.equal(res.statusCode, 502)
})
