import { Link } from 'react-router-dom'
import { useGames } from '../context/GamesContext.jsx'

// apple.com style footer: fine print on #f5f5f7, hairline separators.
export default function Footer() {
  const { games, totalDownloads } = useGames()

  return (
    <footer className="apple-footer">
      <div className="container">
        <p className="footnote">
          GetGamerz — free PC games, instant downloads, zero nonsense.
          {' '}{games.length} games ready to download · {totalDownloads.toLocaleString()} downloads and counting.
        </p>

        <nav className="footer-links" aria-label="Footer navigation">
          <Link to="/">Home</Link>
          <Link to="/games">Games</Link>
          <Link to="/about">About</Link>
          <a href={`${import.meta.env.BASE_URL}sitemap.xml`}>Sitemap</a>
        </nav>

        <div className="footer-legal">
          <span>Copyright © {new Date().getFullYear()} GetGamerz. All rights reserved.</span>
          <span className="footer-legal-right">
            Links open in a new tab · Downloads hosted externally
          </span>
        </div>
      </div>
    </footer>
  )
}
