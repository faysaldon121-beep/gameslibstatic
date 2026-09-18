import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import GameCard from '../components/GameCard.jsx'
import { useGames } from '../context/GamesContext.jsx'

const SITE = import.meta.env.VITE_SITE_URL || 'https://getgamerz.pages.dev'

export default function Home() {
  const { games, genres, featuredGames, latestGames, totalDownloads } = useGames()

  const featured = featuredGames.length ? featuredGames : latestGames.slice(0, 3)
  const spotlight = featured[0]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'GetGamerz',
    url: SITE,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE}/games?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <Seo path="/" jsonLd={jsonLd} />

      <section className="page-hero">
        <h1>Discover.</h1>
        <p className="page-hero-sub">
          Free PC game downloads with real system requirements, honest screenshots
          and verified links. No bloat, no bait.
        </p>
        <div className="stats">
          <div><strong>{games.length}</strong><span>Games</span></div>
          <div><strong>{genres.length}</strong><span>Genres</span></div>
          <div><strong>{totalDownloads.toLocaleString()}</strong><span>Downloads</span></div>
        </div>
      </section>

      {spotlight && (
        <section className="home-section">
          <div className="section-label">
            <h2>Featured</h2>
          </div>
          <Link
            to={`/games/${spotlight.slug}`}
            className="feature-banner"
          >
            <img src={spotlight.coverImage} alt={spotlight.title} />
            <div className="feature-banner-overlay" aria-hidden="true" />
            <div className="feature-banner-body">
              <p className="eyebrow">Game of the week</p>
              <h2>{spotlight.title}</h2>
              <p className="feature-banner-desc">{spotlight.shortDescription}</p>
              <div className="feature-banner-actions">
                <span className="pill pill-accent">View</span>
                <span className="feature-banner-note">
                  Free · {spotlight.fileSize}
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      <section className="home-section">
        <div className="section-label">
          <h2>Latest releases</h2>
          <Link className="see-all" to="/games">See all ›</Link>
        </div>
        <div className="tile-grid">
          {latestGames.slice(0, 8).map((g) => (
            <GameCard key={g.slug} game={g} />
          ))}
        </div>
      </section>
    </>
  )
}
