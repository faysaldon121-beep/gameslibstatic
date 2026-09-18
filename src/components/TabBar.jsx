import { NavLink } from 'react-router-dom'
import { IconHome, IconGames, IconAbout } from './Sidebar.jsx'

// iOS-style bottom tab bar — the mobile counterpart of the macOS sidebar.
export default function TabBar() {
  return (
    <nav className="tab-bar" aria-label="Main navigation">
      <NavLink to="/" end><IconHome /><span>Home</span></NavLink>
      <NavLink to="/games"><IconGames /><span>Games</span></NavLink>
      <NavLink to="/about"><IconAbout /><span>About</span></NavLink>
    </nav>
  )
}
