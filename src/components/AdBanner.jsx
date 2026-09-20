import { useEffect } from 'react'

const INVOKE_SRC =
  'https://pl31427223.profitableratecpmnetwork.com/042e93b0467cb0bc6541c7bf029ad16c/invoke.js'
const CONTAINER_ID = 'container-042e93b0467cb0bc6541c7bf029ad16c'

// Ad network display banner. Rendered at app level (see App.jsx) so the
// container stays mounted across SPA route changes — the network script
// fills it once per page load.
export default function AdBanner() {
  useEffect(() => {
    if (document.querySelector(`script[src="${INVOKE_SRC}"]`)) return
    const s = document.createElement('script')
    s.async = true
    s.setAttribute('data-cfasync', 'false')
    s.src = INVOKE_SRC
    document.body.appendChild(s)
  }, [])

  return <div className="ad-banner" id={CONTAINER_ID} aria-label="Advertisement" />
}
