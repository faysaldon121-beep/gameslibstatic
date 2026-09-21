import { Helmet } from 'react-helmet-async'

// Site URL resolution: explicit VITE_SITE_URL (for builds where the domain is
// known ahead of time) — otherwise the domain is read automatically from the
// browser's URL bar, so canonical/OG/JSON-LD URLs are always correct no matter
// where the site is deployed (workers.dev, custom domain, GitHub Pages, …).
export const SITE =
  import.meta.env.VITE_SITE_URL ||
  (typeof window !== 'undefined' ? window.location.origin : '')

const SITE_NAME = 'GetGamerz'
const DEFAULT_DESCRIPTION =
  'A huge library of full free PC games with all content and add-ons (DLCs), with direct download links. No surveys, no fake buttons — get playing in minutes.'

export default function Seo({
  title,
  titleSuffix = true,
  description = DEFAULT_DESCRIPTION,
  ogDescription,
  image,
  path = '/',
  type = 'website',
  jsonLd,
}) {
  const fullTitle = title
    ? titleSuffix
      ? `${title} | ${SITE_NAME}`
      : title
    : `${SITE_NAME} — Free PC Games Download, Full Games + DLCs`
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

      {(jsonLd
        ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd])
        : []
      ).map((obj, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}
    </Helmet>
  )
}
