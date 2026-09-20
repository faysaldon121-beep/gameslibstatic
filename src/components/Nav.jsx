import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  )
}

// apple.com global nav: dark translucent bar, small links, logo left.
export default function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="global-nav">
      <div className="global-nav-inner">
        <Link to="/" className="nav-brand" onClick={close} aria-label="GetGamerz home">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" />
          <span className="nav-brand-name">GetGamerz</span>
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          <NavLink to="/" end onClick={close}>Home</NavLink>
          <NavLink to="/games" onClick={close}>Games</NavLink>
          <NavLink to="/about" onClick={close}>About</NavLink>
        </nav>

        <Link to="/games" className="nav-search-icon" aria-label="Search games" onClick={close}>
          <SearchIcon />
        </Link>

        <button
          className={`nav-toggle ${open ? 'is-open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span />
        </button>
      </div>

      <div className={`nav-drawer ${open ? 'is-open' : ''}`}>
        <NavLink to="/" end onClick={close}>Home</NavLink>
        <NavLink to="/games" onClick={close}>Games</NavLink>
        <NavLink to="/about" onClick={close}>About</NavLink>
      </div>
    </header>
  )
}
