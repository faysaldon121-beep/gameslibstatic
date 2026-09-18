import Seo from '../components/Seo.jsx'

export default function About() {
  return (
    <>
      <Seo
        title="About"
        description="About GetGamerz — what we do, how we source games, and how to reach us."
        path="/about"
      />
      <div className="about-box">
        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="GetGamerz logo" />
        <h1>GetGamerz</h1>
        <p className="muted">Version 1.0</p>
      </div>
      <div className="prose">
        <p>
          GetGamerz is a catalog of free PC game downloads with a focus on clarity.
          Every listing shows real system requirements, honest screenshots, and the
          actual download size — no vague marketing copy.
        </p>
        <h2>How the catalog works</h2>
        <p>
          The whole catalog lives in a single <code>data/games.json</code> file that
          the app reads at runtime. Every entry — using the same object schema — is
          listed automatically and gets its own page at <code>/games/&lt;slug&gt;</code>{' '}
          with metadata and structured data for search engines. Add an object,
          refresh, and it's on the site.
        </p>
        <h2>Contact</h2>
        <p>
          Found a broken link or wrong requirement? Reach out and we'll fix it.
        </p>
      </div>
    </>
  )
}
