// Data layer for the GetGamerz catalog.
// public/data/games.json is fetched at runtime — add objects and they are
// listed automatically. Two object schemas are supported:
//
//   1. The uploaded catalog schema (snake_case):
//      game_title, title_as_slug, game_description {short, long{story,
//      gameplay, features}}, system_requirements {minimum, recommended},
//      game_category, details {game_size, version_number, language,
//      last_update, download_count}, image_links {poster, video_trailer,
//      screenshots[]}, download_link, seo {…}
//
//   2. The original camelCase schema:
//      title, slug, shortDescription, description, coverImage, images,
//      genre, platforms, requirements, downloadLinks[], fileSize, tags, …

const BASE = import.meta.env.BASE_URL || '/'

// Resolve local asset paths ("covers/x.png") against the app base so the site
// works both at the root and under a sub-path (e.g. GitHub Pages).
export function assetUrl(p) {
  if (!p || /^(https?:|data:|blob:)/.test(p)) return p
  return BASE.replace(/\/$/, '') + '/' + String(p).replace(/^\//, '')
}

// Map the uploaded catalog schema onto the internal one.
function fromUploadedSchema(g) {
  const long = g.game_description?.long || {}
  const md = []
  if (long.story) md.push(`# Story\n${long.story}`)
  if (long.gameplay) md.push(`# Gameplay\n${long.gameplay}`)
  if (long.features) md.push(`# Features\n${long.features}`)

  const req = (tier) => {
    const r = g.system_requirements?.[tier] || {}
    return {
      os: r.os || '',
      cpu: r.processor || r.cpu || '',
      ram: r.ram || '',
      gpu: r.video_card || r.gpu || '',
      storage: r.storage || '',
      directx: r.directx || '',
    }
  }

  const size = g.details?.game_size || ''

  return {
    title: g.game_title,
    slug: g.title_as_slug,
    shortDescription: g.game_description?.short || '',
    description: md.join('\n\n'),
    coverImage: g.image_links?.poster || '',
    images: g.image_links?.screenshots || [],
    trailer: g.image_links?.video_trailer || '',
    genre: g.game_category || 'PC Games',
    platforms: ['PC'],
    version: g.details?.version_number || '',
    developer: '',
    publisher: '',
    releaseDate: null,
    lastUpdate: g.details?.last_update || '',
    language: g.details?.language || '',
    requirements: { minimum: req('minimum'), recommended: req('recommended') },
    installationGuide: [],
    downloadLinks: g.download_link
      ? [{ label: 'Direct Download', url: g.download_link, size, host: 'PeskGames' }]
      : [],
    fileSize: size,
    isFeatured: false,
    averageRating: 0,
    reviewCount: 0,
    downloadCount: g.details?.download_count || 0,
    tags: [],
  }
}

export function normalizeGame(g) {
  const src = g.game_title && g.title_as_slug ? fromUploadedSchema(g) : g

  const tags = Array.isArray(src.tags) ? src.tags : []
  const images = Array.isArray(src.images) ? src.images : []
  const downloadLinks = Array.isArray(src.downloadLinks) ? src.downloadLinks : []
  const installationGuide = Array.isArray(src.installationGuide)
    ? src.installationGuide
    : []

  return {
    ...src,
    tags,
    platforms: Array.isArray(src.platforms) ? src.platforms : ['PC'],
    downloadLinks,
    installationGuide,
    images: images.map(assetUrl),
    coverImage: assetUrl(src.coverImage),
    releaseDateObj: src.releaseDate ? new Date(src.releaseDate) : null,
  }
}

function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function deriveCatalog(rawList) {
  // Ensure unique slugs (duplicates in the data would collide on one URL)
  // and fall back to a generated slug when an entry is missing one.
  const seen = new Map()
  const games = (rawList || []).map((g) => {
    const n = normalizeGame(g)
    if (!n.slug) n.slug = slugify(n.title) || 'game'
    const base = n.slug
    const i = seen.get(base) || 0
    if (i > 0) n.slug = `${base}-${i + 1}`
    seen.set(base, i + 1)
    return n
  })
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
