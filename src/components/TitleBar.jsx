import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useGames } from '../context/GamesContext.jsx'

export default function TitleBar({ onToggleZoom }) {
  const { getGameBySlug } = useGames()
  const location = useLocation()
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()

  const q = params.get('q') || ''

  let title = 'GetGamerz'
  if (location.pathname.startsWith('/games/')) {
    title = getGameBySlug(location.pathname.split('/').pop())?.title || 'Game'
  } else if (location.pathname === '/games') {
    title = 'Games'
  } else if (location.pathname === '/about') {
    title = 'About'
  }

  // The toolbar search is the global game search: on /games it filters in
  // place (preserving the scroll/component state), anywhere else it jumps
  // to /games?q=…
  const onSearch = (e) => {
    const value = e.target.value
    if (location.pathname === '/games') {
      setParams(value ? { q: value } : {}, { replace: true })
    } else if (value) {
      navigate(`/games?q=${encodeURIComponent(value)}`)
    }
  }

  return (
    <div className="title-bar">
      <div className="traffic-lights">
        <button type="button" className="tl tl-red" tabIndex={-1} aria-hidden="true" />
        <button type="button" className="tl tl-yellow" tabIndex={-1} aria-hidden="true" />
        <button
          type="button"
          className="tl tl-green"
          aria-label="Toggle full screen"
          title="Toggle full screen"
          onClick={onToggleZoom}
        />
      </div>

      <div
        className="title-bar-title"
        onDoubleClick={onToggleZoom}
        title="Double-click to zoom"
      >
        {title}
      </div>

      <input
        type="search"
        className="toolbar-search"
        placeholder="Search"
        aria-label="Search games"
        value={q}
        onChange={onSearch}
      />
    </div>
  )
}
