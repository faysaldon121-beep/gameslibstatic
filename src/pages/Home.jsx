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

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <h1>Your next game is<br className="hero-break" /> one click away.</h1>
          <p className="hero-sub">
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
          <p className="hero-cta-row">
            <Link className="chev" to="/games">Browse the full catalog</Link>
          </p>

          <div className="stats">
            <div><strong>{games.length}</strong><span>games ready to download</span></div>
            <div><strong>{totalDownloads.toLocaleString('en-US')}</strong><span>gamers already grabbed theirs</span></div>
            <div><strong>{genres.length}</strong><span>genres, zero filler</span></div>
          </div>
        </div>
      </section>

      {/* Featured — full-bleed dark product panel */}
      {spotlight && (
        <section className="feature-hero">
          <img className="feature-hero-img" src={spotlight.coverImage} alt="" />
          <div className="feature-hero-overlay" aria-hidden="true" />
          <div className="feature-hero-body">
            <p className="eyebrow">Start Here</p>
            <h2>{spotlight.title}</h2>
            <p className="feature-hero-desc">{spotlight.shortDescription}</p>
            <div className="feature-hero-actions">
              <Link className="btn" to={`/games/${spotlight.slug}`}>Learn more</Link>
              <Link className="chev chev-light" to={`/games/${spotlight.slug}`}>Get It</Link>
            </div>
            <p className="feature-hero-note">Free · {spotlight.fileSize}</p>
          </div>
        </section>
      )}

      {/* Fresh Drops */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Fresh Drops.</h2>
            <p>Freshly added to the catalog.</p>
          </div>
          <div className="tile-grid">
            {latestGames.slice(0, 8).map((g) => (
              <GameCard key={g.slug} game={g} />
            ))}
          </div>
          <p className="section-more">
            <Link className="chev" to="/games">See all games</Link>
          </p>
        </div>
      </section>
    </>
  )
}
