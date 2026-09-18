// Data layer for the GetGamerz catalog.
// games.json now lives in public/data/games.json and is fetched at runtime —
// add objects with the same schema and they are listed automatically.

const BASE = import.meta.env.BASE_URL || '/'

// Resolve local asset paths ("covers/x.png") against the app base so the site
// works both at the root and under a sub-path (e.g. GitHub Pages).
export function assetUrl(p) {
  if (!p || /^(https?:|data:|blob:)/.test(p)) return p
  return BASE.replace(/\/$/, '') + '/' + String(p).replace(/^\//, '')
}

export function normalizeGame(g) {
  const tags = Array.isArray(g.tags) ? g.tags : []
  const images = Array.isArray(g.images) ? g.images : []
  return {
    ...g,
    tags,
    platforms: Array.isArray(g.platforms) ? g.platforms : [],
    downloadLinks: Array.isArray(g.downloadLinks) ? g.downloadLinks : [],
    installationGuide: Array.isArray(g.installationGuide) ? g.installationGuide : [],
    coverImage: assetUrl(g.coverImage),
    images: images.map(assetUrl),
    releaseDateObj: g.releaseDate ? new Date(g.releaseDate) : null,
  }
}

export function deriveCatalog(rawList) {
  const games = (rawList || []).map(normalizeGame)
  const bySlug = new Map(games.map((g) => [g.slug, g]))

  return {
    games,
    getGameBySlug: (slug) => bySlug.get(slug),
    genres: [...new Set(games.map((g) => g.genre).filter(Boolean))],
    allTags: [...new Set(games.flatMap((g) => g.tags))].sort(),
    featuredGames: games.filter((g) => g.isFeatured),
    latestGames: [...games].sort(
      (a, b) => (b.releaseDateObj?.getTime() || 0) - (a.releaseDateObj?.getTime() || 0)
    ),
    totalDownloads: games.reduce((n, g) => n + (g.downloadCount || 0), 0),
  }
}

export function formatBytes(str) {
  return str || '—'
}

export function formatDate(d) {
  if (!d) return '—'
  try {
    return new Date(d).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return '—'
  }
}
