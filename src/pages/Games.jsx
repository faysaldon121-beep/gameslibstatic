import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import GameCard from '../components/GameCard.jsx'
import { useGames } from '../context/GamesContext.jsx'

export default function Games() {
  const { games, genres, allTags } = useGames()
  const [params, setParams] = useSearchParams()
  const [genre, setGenre] = useState('All')
  const [tag, setTag] = useState(null)

  const q = params.get('q') || ''

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return games.filter((g) => {
      if (genre !== 'All' && g.genre !== genre) return false
      if (tag && !g.tags.includes(tag)) return false
      if (!needle) return true
      return (
        g.title.toLowerCase().includes(needle) ||
        g.shortDescription.toLowerCase().includes(needle) ||
        g.tags.some((t) => t.toLowerCase().includes(needle))
      )
    })
  }, [games, q, genre, tag])

  const onSearch = (e) => {
    const value = e.target.value
    if (value) setParams({ q: value }, { replace: true })
    else setParams({}, { replace: true })
  }

  return (
    <>
      <Seo
        title="All Games"
        description="Every game, one click away. Free PC downloads with links that work — filter by genre or tag, then grab it."
        path="/games"
      />

      <div className="container">
        <div className="page-head">
          <h1>Games.</h1>
          <p className="muted">{filtered.length} of {games.length} titles</p>
        </div>

        <div className="filter-bar">
          <input
            type="search"
            className="filter-search"
            value={q}
            onChange={onSearch}
            placeholder="What are you playing tonight?"
            aria-label="Search games"
          />

          <div className="filter-group">
            <span className="filter-label">Pick your poison</span>
            <div className="seg" role="group" aria-label="Filter by genre">
              {['All', ...genres].map((g) => (
                <button
                  key={g}
                  type="button"
                  className={genre === g ? 'is-active' : ''}
                  onClick={() => setGenre(g)}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {allTags.length > 0 && (
            <div className="token-row">
              {allTags.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`token token-btn ${tag === t ? 'is-active' : ''}`}
                  onClick={() => setTag(tag === t ? null : t)}
                >
                  #{t}
                </button>
              ))}
            </div>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <h3>Nothing here.</h3>
            <p className="muted">Try a different search, or just browse the catalog — you'll find something.</p>
            <Link className="btn" to="/games">Show everything</Link>
          </div>
        ) : (
          <div className="tile-grid tile-grid-pad">
            {filtered.map((g) => (
              <GameCard key={g.slug} game={g} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
