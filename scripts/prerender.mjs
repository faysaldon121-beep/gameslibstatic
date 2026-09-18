// Build-time prerendering (the "react-static" capability, native to this stack).
//
// After `vite build` produces the SPA shell in dist/, this script:
//   1. builds a small server bundle (src/entry-server.jsx) via Vite's SSR build
//   2. loads the catalog from public/data/games.json
//   3. renders every route (/, /games, /about, /games/<slug>) to static HTML
//      with react-helmet-async's per-page SEO tags injected into <head>
//   4. writes dist/<route>/index.html — real, crawlable HTML per page
//
// Set PRERENDER_ORIGIN (or VITE_SITE_URL) to get absolute canonical/OG URLs,
// e.g. https://getgamerz.your-subdomain.workers.dev

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { build } from 'vite'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const origin = process.env.PRERENDER_ORIGIN || process.env.VITE_SITE_URL || ''

// The SEO helpers read window.location.origin — provide it before the app
// bundle is imported so module-level constants pick it up.
globalThis.window = globalThis.window || { location: { origin } }
globalThis.window.location = globalThis.window.location || { origin }
globalThis.window.location.origin = origin

async function main() {
  // 1. Server bundle
  await build({
    root,
    configFile: path.join(root, 'vite.config.js'),
    logLevel: 'warn',
    // react-helmet-async is CJS — bundle it (and anything else CJS) instead of
    // letting Node's ESM loader choke on named exports.
    ssr: { noExternal: ['react-helmet-async'] },
    build: {
      ssr: path.join(root, 'src/entry-server.jsx'),
      outDir: path.join(root, '.ssr'),
      emptyOutDir: true,
    },
  })

  // 2. Load the SSR bundle + catalog
  const serverUrl = pathToFileURL(path.join(root, '.ssr/entry-server.js')).href
  const { render, deriveCatalog } = await import(serverUrl)

  const catalogPath = path.join(root, 'public/data/games.json')
  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'))
  const { games } = deriveCatalog(catalog)

  // 3. Render every route
  const routes = ['/', '/games', '/about', ...games.map((g) => `/games/${g.slug}`)]

  const shell = fs.readFileSync(path.join(root, 'dist/index.html'), 'utf-8')
  if (!shell.includes('<div id="root"></div>')) {
    throw new Error('Prerender shell is missing <div id="root"></div>')
  }

  // Strip the shell's static SEO tags — every page gets its own from Helmet.
  // (Otherwise each prerendered page carries duplicate <title>/description,
  // and browsers would use the static one.) og:site_name is kept: Helmet
  // doesn't emit it.
  const bareShell = shell
    .replace(/<title>.*?<\/title>\s*/, '')
    .replace(/<meta name="description"[^>]*>\s*/g, '')
    .replace(/<meta property="og:(type|title|description)"[^>]*>\s*/g, '')
    .replace(/<meta name="twitter:card"[^>]*>\s*/g, '')

  let written = 0
  for (const route of routes) {
    const { html, helmet } = render(route, catalog)

    const head = ['title', 'meta', 'link', 'script', 'style']
      .map((k) => (helmet[k] ? helmet[k].toString() : ''))
      .filter(Boolean)
      .join('\n')

    let page = bareShell.replace('</head>', `${head}\n</head>`)
    page = page.replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div>`
    )
    page = page.replace('</body>', '<script>window.__PRERENDERED__=true</script></body>')

    const file =
      route === '/'
        ? path.join(root, 'dist/index.html')
        : path.join(root, 'dist', `${route.replace(/^\//, '')}/index.html`)

    fs.mkdirSync(path.dirname(file), { recursive: true })
    fs.writeFileSync(file, page)
    written++
  }

  fs.rmSync(path.join(root, '.ssr'), { recursive: true, force: true })
  console.log(`prerendered ${written} pages (${routes.length} routes, origin: ${origin || 'relative'})`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
