import { Helmet } from 'react-helmet-async'

const SITE = import.meta.env.VITE_SITE_URL || 'https://getgamerz.pages.dev'
const SITE_NAME = 'GetGamerz'
const DEFAULT_DESCRIPTION =
  'Free PC game downloads that actually work. Full games, instant links, no surveys, no fake buttons. Find your next game and start playing in minutes.'

export default function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  ogDescription,
  image,
  path = '/',
  type = 'website',
  jsonLd,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Download PC Games Free, Play Tonight`
  const url = `${SITE.replace(/\/$/, '')}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={ogDescription || description} />
      {image && <meta name="twitter:image" content={image} />}

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  )
}
