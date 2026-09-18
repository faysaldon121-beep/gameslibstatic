import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { deriveCatalog } from '../lib/games.js'

const GamesContext = createContext(null)

export function GamesProvider({ children }) {
  const [raw, setRaw] = useState(null)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let alive = true
    setRaw(null)
    setError(null)

    fetch(`${import.meta.env.BASE_URL}data/games.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (alive) setRaw(Array.isArray(data) ? data : [])
      })
      .catch((err) => {
        if (alive) setError(err?.message || 'Network error')
      })

    return () => {
      alive = false
    }
  }, [reloadKey])

  const value = useMemo(
    () => ({
      ...deriveCatalog(raw || []),
      loading: raw === null && !error,
      error,
      reload: () => setReloadKey((k) => k + 1),
    }),
    [raw, error]
  )

  return <GamesContext.Provider value={value}>{children}</GamesContext.Provider>
}

export function useGames() {
  const ctx = useContext(GamesContext)
  if (!ctx) throw new Error('useGames must be used inside <GamesProvider>')
  return ctx
}
