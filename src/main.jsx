import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'

// Boot: fetch the catalog first so that prerendered pages (built by
// scripts/prerender.mjs) can HYDRATE with identical output — no flash, no
// loading spinner on first visit. If anything fails, fall back to a normal
// client render and let the provider fetch/retry on its own.
async function boot() {
  let catalog = null
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}data/games.json`)
    if (res.ok) catalog = await res.json()
  } catch {
    /* provider will retry */
  }

  const tree = (
    <React.StrictMode>
      <HelmetProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <App catalog={catalog} />
        </BrowserRouter>
      </HelmetProvider>
    </React.StrictMode>
  )

  const container = document.getElementById('root')
  if (catalog && window.__PRERENDERED__) {
    ReactDOM.hydrateRoot(container, tree)
  } else {
    ReactDOM.createRoot(container).render(tree)
  }
}

boot()
