// Server entry used by scripts/prerender.mjs at build time.
// Renders the real app (same components) to static HTML per route, with
// react-helmet-async collecting each page's SEO tags.
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'

export { deriveCatalog } from './lib/games.js'

export function render(url, catalog) {
  const helmetContext = {}
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter basename={import.meta.env.BASE_URL} location={url}>
        <App catalog={catalog} />
      </StaticRouter>
    </HelmetProvider>
  )
  return { html, helmet: helmetContext.helmet }
}
