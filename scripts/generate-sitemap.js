import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const SITE = (process.env.VITE_SITE_URL || 'https://getgamerz.pages.dev').replace(/\/$/, '')

const games = JSON.parse(
  fs.readFileSync(path.join(root, 'public/data/games.json'), 'utf-8')
)

const today = new Date().toISOString().split('T')[0]

const urls = [
  { loc: '/', priority: '1.0', freq: 'daily' },
  { loc: '/games', priority: '0.9', freq: 'daily' },
  { loc: '/about', priority: '0.4', freq: 'monthly' },
  ...games
    .map((g) => g.slug || g.title_as_slug)
    .filter(Boolean)
    // de-dupe slugs so the sitemap never lists the same URL twice
    .filter((slug, i, arr) => arr.indexOf(slug) === i)
    .map((slug) => ({
      loc: `/games/${slug}`,
      priority: '0.8',
      freq: 'weekly',
      lastmod: today,
    })),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE}${u.loc}</loc>
    <lastmod>${u.lastmod || today}</lastmod>
    <changefreq>${u.freq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

fs.writeFileSync(path.join(root, 'public/sitemap.xml'), xml)
console.log(`sitemap.xml written with ${urls.length} URLs`)

// Also keep robots.txt in sync with the site URL.
const robots = `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`
fs.writeFileSync(path.join(root, 'public/robots.txt'), robots)
console.log('robots.txt written')

// llms.txt — markdown guide for AI agents/crawlers (llmstxt.org format).
const llms = `# GetGamerz

> Free PC game downloads that actually work. Real system requirements, honest
> screenshots, verified links. No surveys, no fake buttons.

Each game page includes an overview, tech specs (minimum and recommended
system requirements), screenshots, trailer when available, and a direct
download link with the exact file size.

## Pages

- [Home](${SITE}/): featured game and fresh drops
- [All Games](${SITE}/games): the full catalog, filterable by genre and search
- [About](${SITE}/about): what the site does and how it works

## Catalog

${games
  .map((g) => {
    const title = g.game_title || g.title
    const slug = g.title_as_slug || g.slug
    const cat = g.game_category || g.genre || 'PC Games'
    return `- [${title}](${SITE}/games/${slug}) — ${cat}`
  })
  .join('\n')}
`
fs.writeFileSync(path.join(root, 'public/llms.txt'), llms)
console.log('llms.txt written')
