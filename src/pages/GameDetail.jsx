import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Seo, { SITE } from '../components/Seo.jsx'
import { useGames } from '../context/GamesContext.jsx'
import { formatDate } from '../lib/games.js'
import { renderMarkdown } from '../lib/markdown.js'

export default function GameDetail() {
  const { slug } = useParams()
  const { getGameBySlug } = useGames()
  const game = getGameBySlug(slug)

  // macOS-style toast for the "download started" microcopy
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)

  useEffect(() => () => window.clearTimeout(toastTimer.current), [])

  if (!game) {
    return (
      <div className="empty-state">
        <h1>This one got away.</h1>
        <p className="muted">The link's broken or the game's gone. No big deal — the catalog's right this way.</p>
        <Link className="btn" to="/games">Browse the catalog</Link>
      </div>
    )
  }

  const scrollTo = (id) => () => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const onDownloadClick = (d) => {
    window.clearTimeout(toastTimer.current)
    setToast(`Download started. Go make a sandwich — this one's ${d.size || game.fileSize}.`)
    toastTimer.current = window.setTimeout(() => setToast(null), 6000)
  }

  // Keyword-targeted SEO title: matches how people search ("download <game>
  // free for pc"). Keeps the brand suffix when it fits Google's ~60-char
  // display limit, and degrades gracefully for very long game titles.
  const kwTitle = `Download ${game.title} Free for PC`
  const fitsWithBrand = kwTitle.length + 12 <= 62
  const seoTitle = kwTitle.length <= 62 ? kwTitle : game.title

  const kwDesc = `Download ${game.title} for free on PC — full game${game.fileSize ? ` (${game.fileSize})` : ''}${game.version ? `, ${game.version}` : ''}. Minimum and recommended specs, screenshots and a direct download link. No surveys, no fake buttons.`

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'VideoGame',
      name: game.title,
      description: game.shortDescription,
      image: game.coverImage,
      genre: game.genre,
      gamePlatform: game.platforms,
      applicationCategory: 'Game',
      operatingSystem: game.requirements?.minimum?.os || 'Windows',
      ...(game.releaseDate ? { datePublished: game.releaseDate } : {}),
      publisher: { '@type': 'Organization', name: game.publisher || 'Unknown' },
      author: { '@type': 'Organization', name: game.developer || 'Unknown' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE || '/' },
        { '@type': 'ListItem', position: 2, name: 'Games', item: `${SITE}/games` },
        { '@type': 'ListItem', position: 3, name: game.title },
      ],
    },
  ]

  const reqRows = [
    ['OS', 'os'],
    ['CPU', 'cpu'],
    ['RAM', 'ram'],
    ['GPU', 'gpu'],
    ['Storage', 'storage'],
    ['DirectX', 'directx'],
  ]

  const generalRows = [
    ['Genre', game.genre],
    ['Platform', game.platforms.join(', ')],
    ['Size', game.fileSize || '—'],
    game.version ? ['Version', game.version] : null,
    game.language ? ['Language', game.language] : null,
    game.lastUpdate ? ['Last update', game.lastUpdate] : null,
    game.releaseDate ? ['Released', formatDate(game.releaseDate)] : null,
    game.developer && game.developer !== 'Unknown' ? ['Developer', game.developer] : null,
    game.publisher && game.publisher !== 'Unknown' ? ['Publisher', game.publisher] : null,
    game.downloadCount ? ['Downloads', game.downloadCount.toLocaleString('en-US')] : null,
    ...(game.averageRating > 0
      ? [['Rating', `★ ${game.averageRating} (${game.reviewCount})`]]
      : []),
  ].filter(Boolean)

  return (
    <>
      <Seo
        title={seoTitle}
        titleSuffix={fitsWithBrand || kwTitle.length > 62}
        description={kwDesc}
        image={game.coverImage}
        path={`/games/${game.slug}`}
        type="article"
        jsonLd={jsonLd}
      />

      {/* Product subnav — apple.com style ("Overview · Tech Specs" + Buy) */}
      <div className="product-subnav">
        <div className="subnav-inner">
          <span className="subnav-title">{game.title}</span>
          <nav className="subnav-links" aria-label="Sections">
            <button type="button" onClick={scrollTo('overview')}>Overview</button>
            <button type="button" onClick={scrollTo('specs')}>Tech Specs</button>
            <button type="button" onClick={scrollTo('download')}>Download</button>
          </nav>
          {game.downloadLinks.length > 0 && (
            <button type="button" className="btn btn-sm" onClick={scrollTo('download')}>
              Grab It
            </button>
          )}
        </div>
      </div>

      {/* Product hero */}
      <section className="detail-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/games">Games</Link>
            <span>/</span>
            <span>{game.title}</span>
          </nav>

          <h1>{game.title}</h1>
          <p className="detail-sub">
            {[
              game.developer && game.developer !== 'Unknown' ? game.developer : '',
              game.genre,
              game.platforms.join(', '),
            ].filter(Boolean).join(' · ')}
          </p>

          {game.downloadLinks.length > 0 && (
            <div className="detail-cta">
              {/* Fake button — no link, scrolls to the real one below */}
              <button type="button" className="btn btn-lg" onClick={scrollTo('download')}>
                Grab It — {game.fileSize}
              </button>
              <button type="button" className="nudge" onClick={scrollTo('specs')}>
                Running on a potato? Check the requirements first.
              </button>
            </div>
          )}

          <img className="detail-cover" src={game.coverImage} alt={game.title} />
        </div>
      </section>

      {/* Overview */}
      <section className="block" id="overview">
        <div className="container">
          <h2>Overview</h2>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(game.description) }}
          />

          {game.trailer && (
            <div className="trailer">
              <iframe
                src={game.trailer}
                title={`${game.title} trailer`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          )}

          {game.images.length > 0 && (
            <div className="gallery">
              {game.images.map((src, i) => (
                <img key={i} src={src} alt={`${game.title} screenshot ${i + 1}`} loading="lazy" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tech Specs */}
      <section className="section-alt block-alt" id="specs">
        <div className="container">
          <h2>Tech Specs</h2>
          <div className="spec-groups">
            <div className="spec-group">
              <div className="spec-group-title">General</div>
              {generalRows.map(([label, value]) => (
                <div className="spec-row" key={label}>
                  <span className="spec-label">{label}</span>
                  <span className="spec-value">{value}</span>
                </div>
              ))}
            </div>
            <div className="spec-group">
              <div className="spec-group-title">Minimum</div>
              {reqRows.map(([label, key]) => (
                <div className="spec-row" key={key}>
                  <span className="spec-label">{label}</span>
                  <span className="spec-value">{game.requirements?.minimum?.[key] || '—'}</span>
                </div>
              ))}
            </div>
            <div className="spec-group">
              <div className="spec-group-title">Recommended</div>
              {reqRows.map(([label, key]) => (
                <div className="spec-row" key={key}>
                  <span className="spec-label">{label}</span>
                  <span className="spec-value">{game.requirements?.recommended?.[key] || '—'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {game.tags.length > 0 && (
          <section className="block">
            <h2>Tags</h2>
            <div className="token-row token-row-left">
              {game.tags.map((t) => (
                <Link key={t} className="token" to={`/games?q=${encodeURIComponent(t)}`}>
                  #{t}
                </Link>
              ))}
            </div>
          </section>
        )}

        {game.installationGuide.length > 0 && (
          <section className="block">
            <h2>Installation guide</h2>
            <ol className="steps">
              {game.installationGuide.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </section>
        )}

        {game.changelog && (
          <section className="block">
            <h2>Changelog</h2>
            <div className="prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(game.changelog) }} />
          </section>
        )}
      </div>

      {/* Real download panel */}
      {game.downloadLinks.length > 0 && (
        <section className="download-section" id="download">
          <div className="container">
            <h2>Download {game.title} for free.</h2>
            <p className="muted">
              {game.fileSize} · {game.platforms.join(', ')} · Version {game.version}
            </p>
            <div className="downloads">
              {game.downloadLinks.map((d, i) => (
                <a
                  key={i}
                  className="btn btn-lg"
                  href={d.url}
                  rel="nofollow noopener"
                  target="_blank"
                  onClick={() => onDownloadClick(d)}
                >
                  {game.downloadLinks.length > 1 ? `${d.label} · ${d.size}` : 'Download Now · Free'}
                </a>
              ))}
            </div>
            <p className="muted small" style={{ marginTop: 18 }}>
              Link's dead? We're on it — try another host or check back in a bit.
            </p>
          </div>
        </section>
      )}

      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </>
  )
}
