import { Routes, Route, Link } from 'react-router-dom'
import { GamesProvider, useGames } from './context/GamesContext.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Games from './pages/Games.jsx'
import GameDetail from './pages/GameDetail.jsx'
import About from './pages/About.jsx'

function NotFound() {
  return (
    <div className="empty-state">
      <h1>This one got away.</h1>
      <p className="muted">The link's broken or the game's gone. No big deal — the catalog's right this way.</p>
      <Link className="btn" to="/games">Browse the catalog</Link>
    </div>
  )
}

function Catalog() {
  const { loading, error, reload } = useGames()

  if (loading) {
    return (
      <div className="page-state">
        <div className="spinner" aria-hidden="true" />
        <p className="muted">Loading your next obsession…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-state">
        <h2>Couldn't load the catalog</h2>
        <p className="muted">
          Failed to read <code>data/games.json</code> — {error}
        </p>
        <button className="btn" onClick={reload}>Try again</button>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/games" element={<Games />} />
      <Route path="/games/:slug" element={<GameDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default function App({ catalog = null }) {
  return (
    <GamesProvider initialData={catalog}>
      <Nav />
      <main>
        <Catalog />
      </main>
      <Footer />
    </GamesProvider>
  )
}
