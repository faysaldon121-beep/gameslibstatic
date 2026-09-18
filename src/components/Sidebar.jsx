import { NavLink } from 'react-router-dom'
import { useGames } from '../context/GamesContext.jsx'

export function IconHome() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </svg>
  )
}

export function IconGames() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6.5 7h11a4.5 4.5 0 0 1 4.4 5.4l-.8 4a3 3 0 0 1-5.2 1.4L14.5 16h-5l-1.4 1.8a3 3 0 0 1-5.2-1.4l-.8-4A4.5 4.5 0 0 1 6.5 7Z" />
      <path d="M8 10v4M6 12h4" />
      <circle cx="16" cy="11" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="18.5" cy="13" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconAbout() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <circle cx="12" cy="8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function Sidebar() {
  const { games, totalDownloads } = useGames()

  return (
    <nav className="sidebar" aria-label="Main navigation">
      <div className="sidebar-label">Discover</div>
      <NavLink to="/" end><IconHome />Home</NavLink>
      <NavLink to="/games"><IconGames />Games</NavLink>
      <NavLink to="/about"><IconAbout />About</NavLink>

      <div className="sidebar-footer">
        <p><strong>{games.length}</strong> games in catalog</p>
        <p>{totalDownloads.toLocaleString()} downloads</p>
      </div>
    </nav>
  )
}
