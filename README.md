# GetGamerz

A React + Vite catalog site for free PC game downloads, styled as a macOS 13
(Ventura) app window. Every entry in `public/data/games.json` is fetched at
runtime and automatically listed — filters, tags, search, detail pages, SEO
metadata and the sitemap all derive from that one file.

## Quick start

```bash
npm install
npm run dev       # start dev server
npm run sitemap   # regenerate public/sitemap.xml from the catalog
npm run build     # production build → dist/
```

## How the catalog works (runtime reading)

The app **fetches `public/data/games.json` at runtime** (not bundled at build
time). To add a game:

1. Open `public/data/games.json`
2. Append an object using the same schema as the existing entries
   (title, slug, shortDescription, description, coverImage, images, genre,
   platforms, version, developer, publisher, releaseDate, requirements,
   installationGuide, downloadLinks, fileSize, isFeatured, averageRating,
   reviewCount, downloadCount, tags, changelog)
3. Save and refresh — the new game appears in the list, filters, tags,
   search, and gets its own page at `/games/<slug>`

Image fields accept either full URLs (`https://…`) or local paths relative to
the `public/` folder (`covers/my-game.png` → put the file in `public/covers/`).

Two demo entries — *Neon Drift* and *Shadow Protocol*, with generated cover
art in `public/covers/` and screenshots in `public/shots/` — are included to
show the listing capability. Delete them freely, and replace their
`REPLACE_WITH_REAL_LINK` download URLs when adding real files.

Run `npm run sitemap` after editing the catalog to refresh `sitemap.xml`.

## Download buttons on game pages

- **Top of page — fake button**: a large "Download" button that has no link;
  clicking it smooth-scrolls to the bottom of the page.
- **Bottom of page — real button**: the actual link from the game's
  `downloadLinks[].url` field, opening in a new tab.

## UI

macOS 13 Ventura look: window with traffic lights (green toggles zoom /
double-click the title), translucent sidebar navigation, toolbar search field,
segmented genre control, grouped settings-style info rows, status bar, and an
iOS-style bottom tab bar on mobile.

## Configuration

Copy `.env.example` to `.env` and set your real domain:

```
VITE_SITE_URL=https://your-domain.com
```

## Structure

```
public/
  data/games.json     # the catalog — single source of truth (fetched at runtime)
  covers/, shots/     # local game artwork
  logo.png            # app icon (header, favicon, About)
src/
  context/GamesContext.jsx  # runtime fetch + load/error states
  lib/games.js              # normalization, derived lists, asset URL helper
  lib/markdown.js           # tiny markdown renderer for descriptions
  components/               # TitleBar, Sidebar, TabBar, Footer, GameCard, Seo
  pages/                    # Home, Games, GameDetail, About
scripts/generate-sitemap.js # reads public/data/games.json → public/sitemap.xml
```

## Deploy

**Cloudflare Pages**
- Build command: `npm run build`
- Output directory: `dist`
- Env var: `VITE_SITE_URL=https://your-domain.com`

**GitHub Pages**
```bash
VITE_BASE=/getgamerz/ VITE_SITE_URL=https://username.github.io/getgamerz npm run build
npx gh-pages -d dist
```
Set `segmentCount = 1` in `public/404.html` for project pages
(`username.github.io/repo`), `0` for user pages.
