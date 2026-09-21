import { Link, NavLink } from 'react-router-dom'

// Simple top bar: brand left, plain links right.
export default function Nav() {
  return (
    <header className="global-nav">
      <div className="global-nav-inner">
        <Link to="/" className="nav-brand" aria-label="GetGamerz home">
          <img src={`${import.meta.env.BASE_URL}logo-96.png`} alt="" />
          <span className="nav-brand-name">GetGamerz</span>
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/games">Games</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </div>
    </header>
  )
}
