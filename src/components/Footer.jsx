import { useGames } from '../context/GamesContext.jsx'

// macOS-style status bar at the bottom of the window.
export default function Footer() {
  const { games, totalDownloads, loading } = useGames()

  return (
    <footer className="status-bar">
      <span>
        {loading ? 'Loading…' : `${games.length} games · ${totalDownloads.toLocaleString()} downloads`}
      </span>
      <span>© {new Date().getFullYear()} GetGamerz</span>
    </footer>
  )
}
