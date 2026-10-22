// Serves the production build the way GitHub Pages does, so deep links,
// refreshes and 404s behave exactly as they will in production:
//   1. an exact file (or a directory's index.html),
//   2. otherwise `<path>.html` (e.g. /case-study-1 → case-study-1.html),
//   3. otherwise 404.html with HTTP 404.
// Responses are gzip-compressed like GitHub Pages so timing-sensitive checks
// see realistic transfer sizes.
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

const root = path.resolve(process.argv[2] ?? 'build')
const port = Number(process.argv[3] ?? process.env.PORT ?? 4173)

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
}
const COMPRESSIBLE = new Set(['.html', '.js', '.css', '.json', '.xml', '.txt', '.svg'])

function resolveFile(urlPath) {
  const safe = path.normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, '')
  let file = path.join(root, safe)
  if (!file.startsWith(root)) return { file: path.join(root, '404.html'), status: 404 }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html')
  if (fs.existsSync(file)) return { file, status: 200 }
  if (fs.existsSync(`${file}.html`)) return { file: `${file}.html`, status: 200 }
  return { file: path.join(root, '404.html'), status: 404 }
}

http
  .createServer((req, res) => {
    const { file, status } = resolveFile((req.url ?? '/').split('?')[0])
    const ext = path.extname(file)
    const gzip = COMPRESSIBLE.has(ext) && /\bgzip\b/.test(req.headers['accept-encoding'] ?? '')
    res.writeHead(status, {
      'content-type': TYPES[ext] ?? 'application/octet-stream',
      'cache-control': 'no-cache',
      ...(gzip ? { 'content-encoding': 'gzip' } : {}),
    })
    const stream = fs.createReadStream(file)
    ;(gzip ? stream.pipe(zlib.createGzip()) : stream).pipe(res)
  })
  .listen(port, '127.0.0.1', () => console.log(`Serving ${root} on http://127.0.0.1:${port}`))
