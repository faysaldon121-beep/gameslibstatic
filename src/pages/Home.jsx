import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Seo, { SITE } from '../components/Seo.jsx'
import GameCard from '../components/GameCard.jsx'
import { useGames } from '../context/GamesContext.jsx'

export default function Home() {
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const { games, genres, featuredGames, latestGames, totalDownloads } = useGames()

  const onSearch = (e) => {
    e.preventDefault()
    navigate(q.trim() ? `/games?q=${encodeURIComponent(q.trim())}` : '/games')
  }

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
      <Seo
        path="/"
        jsonLd={jsonLd}
        ogDescription="Your next game is one click away. Free PC downloads, working links, zero nonsense. Get in, grab it, go play."
      />

      <section className="page-hero">
        <h1>Your next game is one click away.</h1>
        <p className="page-hero-sub">
          Free PC downloads with links that work. No surveys, no fake buttons,
          no "click here to unlock." Just pick a game and play.
        </p>
        <form className="hero-search" onSubmit={onSearch} role="search">
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="What are you playing tonight?"
            aria-label="Search games"
          />
          <button className="btn" type="submit">Search</button>
        </form>

        <div className="stats">
          <div><strong>{games.length}</strong><span>games ready to download</span></div>
          <div><strong>{totalDownloads.toLocaleString()}</strong><span>gamers already grabbed theirs</span></div>
          <div><strong>{genres.length}</strong><span>genres, zero filler</span></div>
        </div>
      </section>

      {spotlight && (
        <section className="home-section">
          <div className="section-label">
            <h2>Start Here</h2>
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
                <span className="pill pill-accent">Get It</span>
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
          <h2>Fresh Drops</h2>
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
