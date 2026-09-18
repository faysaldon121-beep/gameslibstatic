import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { useGames } from '../context/GamesContext.jsx'

export default function Games() {
  const { games, genres, allTags } = useGames()
  const [params] = useSearchParams()
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

  return (
    <>
      <Seo
        title="All Games"
        description="Browse every PC game on GetGamerz. Filter by genre, tag, or search by name."
        path="/games"
      />

      <div className="page-head">
        <h1>Games</h1>
        <p className="muted">{filtered.length} of {games.length} titles</p>
      </div>

      <div className="filter-bar">
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
          <h3>No games found</h3>
          <p className="muted">Try clearing the filters or searching for something else.</p>
        </div>
      ) : (
        <div className="list">
          {filtered.map((g) => (
            <Link key={g.slug} to={`/games/${g.slug}`} className="list-row">
              <img className="list-icon" src={g.coverImage} alt={g.title} loading="lazy" />
              <div className="list-row-info">
                <h3>{g.title}</h3>
                <p>
                  {g.genre}
                  {g.tags.length > 0 && ` · ${g.tags.map((t) => `#${t}`).join(' ')}`}
                </p>
              </div>
              <div className="list-row-meta">
                <span className="muted small">{g.fileSize}</span>
                <span className="pill">View</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
