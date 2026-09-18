import { Link } from 'react-router-dom'

// App Store–style app tile (icon, name, subtitle, pill button).
export default function GameCard({ game }) {
  return (
    <Link to={`/games/${game.slug}`} className="app-tile">
      <img src={game.coverImage} alt={game.title} loading="lazy" />
      <h3>{game.title}</h3>
      <p>{game.genre} · {game.fileSize}</p>
      <span className="pill">View</span>
    </Link>
  )
}
