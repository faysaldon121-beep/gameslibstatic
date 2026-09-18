import { Link } from 'react-router-dom'

// apple.com product-tile style card.
export default function GameCard({ game }) {
  return (
    <Link to={`/games/${game.slug}`} className="app-card">
      <div className="app-card-media">
        <img src={game.coverImage} alt={game.title} loading="lazy" />
      </div>
      <div className="app-card-body">
        <h3>{game.title}</h3>
        <p>{game.genre} · {game.fileSize}</p>
        <span className="pill">View</span>
      </div>
    </Link>
  )
}
