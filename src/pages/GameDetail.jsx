import { useParams, Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { useGames } from '../context/GamesContext.jsx'
import { formatDate } from '../lib/games.js'
import { renderMarkdown } from '../lib/markdown.js'

export default function GameDetail() {
  const { slug } = useParams()
  const { getGameBySlug } = useGames()
  const game = getGameBySlug(slug)

  if (!game) {
    return (
      <div className="empty-state">
        <h1>Game not found</h1>
        <p className="muted">We couldn't find a game with that slug.</p>
        <Link className="btn" to="/games">Browse all games</Link>
      </div>
    )
  }

  // Fake download button at the top: it doesn't link to the file —
  // it just scrolls to the real download links at the bottom of the page.
  const scrollToDownload = () => {
    document
      .getElementById('download')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: game.title,
    description: game.shortDescription,
    image: game.coverImage,
    genre: game.genre,
    gamePlatform: game.platforms,
    applicationCategory: 'Game',
    operatingSystem: game.requirements?.minimum?.os || 'Windows',
    datePublished: game.releaseDate,
    publisher: { '@type': 'Organization', name: game.publisher || 'Unknown' },
    author: { '@type': 'Organization', name: game.developer || 'Unknown' },
  }

  const reqRows = [
    ['OS', 'os'],
    ['CPU', 'cpu'],
    ['RAM', 'ram'],
    ['GPU', 'gpu'],
    ['Storage', 'storage'],
    ['DirectX', 'directx'],
  ]

  const metaRows = [
    ['Genre', game.genre],
    ['Platform', game.platforms.join(', ')],
    ['Developer', game.developer],
    ['Publisher', game.publisher],
    ['Released', formatDate(game.releaseDate)],
    ['Size', game.fileSize],
    ['Version', game.version],
    ['Downloads', game.downloadCount.toLocaleString()],
    ...(game.averageRating > 0
      ? [['Rating', `★ ${game.averageRating} (${game.reviewCount})`]]
      : []),
  ]

  return (
    <>
      <Seo
        title={game.title}
        description={game.shortDescription}
        image={game.coverImage}
        path={`/games/${game.slug}`}
        type="article"
        jsonLd={jsonLd}
      />

      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/games">Games</Link>
        <span>/</span>
        <span className="muted">{game.title}</span>
      </nav>

      <div className="detail-head">
        <img className="detail-icon" src={game.coverImage} alt={game.title} />
        <div className="detail-head-info">
          <h1>{game.title}</h1>
          <p className="detail-sub">
            {game.developer} · {game.genre} · {game.platforms.join(', ')}
          </p>

          {game.downloadLinks.length > 0 && (
            <div className="download-teaser">
              <button type="button" className="btn btn-lg" onClick={scrollToDownload}>
                Download
              </button>
              <p className="teaser-note">Free · {game.fileSize} · v{game.version}</p>
            </div>
          )}
        </div>
      </div>

      <section className="block">
        <div className="settings-group">
          {metaRows.map(([label, value]) => (
            <div className="settings-row" key={label}>
              <span className="settings-label">{label}</span>
              <span className="settings-value">{value}</span>
            </div>
          ))}
        </div>
      </section>

      {game.images.length > 0 && (
        <section className="block">
          <h2>Screenshots</h2>
          <div className="gallery">
            {game.images.map((src, i) => (
              <img key={i} src={src} alt={`${game.title} screenshot ${i + 1}`} loading="lazy" />
            ))}
          </div>
        </section>
      )}

      <section className="block">
        <h2>About this game</h2>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(game.description) }}
        />
      </section>

      <section className="block">
        <h2>System requirements</h2>
        <div className="req-grid">
          {['minimum', 'recommended'].map((tier) => (
            <div className="settings-group" key={tier}>
              <div className="settings-group-title">
                {tier === 'minimum' ? 'Minimum' : 'Recommended'}
              </div>
              {reqRows.map(([label, key]) => (
                <div className="settings-row" key={key}>
                  <span className="settings-label">{label}</span>
                  <span className="settings-value">
                    {game.requirements?.[tier]?.[key] || '—'}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {game.tags.length > 0 && (
        <section className="block">
          <h2>Tags</h2>
          <div className="token-row">
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

      {game.downloadLinks.length > 0 && (
        <section className="block" id="download">
          <div className="download-panel">
            <h2>Get {game.title}.</h2>
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
                >
                  {d.label} · {d.size}
                </a>
              ))}
            </div>
            <p className="muted small" style={{ marginTop: 16 }}>
              Hosted on{' '}
              {game.downloadLinks.map((d) => d.host).filter(Boolean).join(', ') ||
                'an external host'}{' '}
              — opens in a new tab.
            </p>
          </div>
        </section>
      )}
    </>
  )
}
