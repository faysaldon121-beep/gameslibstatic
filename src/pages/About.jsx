import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'

export default function About() {
  return (
    <>
      <Seo
        title="About"
        description="Most free game download sites suck. GetGamerz is the fix — working links, real requirements, honest screenshots, sizes upfront. No surveys, no fake buttons."
        path="/about"
      />
      <div className="container about-wrap">
        <div className="about-box">
          <img src={`${import.meta.env.BASE_URL}logo-180.png`} alt="GetGamerz logo" />
          <h1>GetGamerz</h1>
          <p className="muted">Version 1.0</p>
        </div>
        <div className="prose">
          <p><strong>Let's be honest — most free game download sites suck.</strong></p>
          <p>
            You know the drill. You find a game you want, you click download, and
            suddenly you're three redirects deep on a page that looks like it was
            built in 2007. There's a button that says "DOWNLOAD" but it's an ad.
            There's another one that says "CLICK TO UNLOCK" but it wants your email.
            Fifteen minutes later you're still staring at a spinning loader
            wondering where your evening went.
          </p>
          <p>We built GetGamerz because we were tired of that garbage.</p>

          <h2>The deal</h2>
          <p>Every game on this site comes with:</p>
          <ul>
            <li><strong>A download link that works.</strong> Click it, get the game. That's the whole transaction.</li>
            <li><strong>Requirements you can actually read.</strong> Minimum and recommended, laid out clean so you know if your rig can handle it before you commit to a 40 GB download.</li>
            <li><strong>Screenshots that aren't lies.</strong> What the game actually looks like. Not stretched promo art or a cinematic that runs at 12 FPS on your machine.</li>
            <li><strong>File sizes upfront.</strong> You'll know exactly how much of your SSD is about to disappear.</li>
            <li><strong>Descriptions written by humans.</strong> Not keyword soup copy-pasted from five other sites.</li>
          </ul>

          <h2>What you won't find here</h2>
          <p>
            No surveys. No fake download buttons. No "premium" tier hiding the real
            link. No forced signups. No 47-step download pages. No popups asking if
            you want to win an iPhone.
          </p>
          <p><strong>You pick a game. You click download. You play.</strong></p>

          <h2>How it works</h2>
          <p>
            Games are hosted on our servers and delivered straight to you. No
            bouncing through ad networks, no sketchy third-party pages, no guessing
            which button is real. Direct links, every time.
          </p>
          <p>If a link breaks — and sometimes they do — tell us. We fix it fast.</p>

          <h2>Why we exist</h2>
          <p>
            Because downloading a game should take minutes, not hours. Because
            "free" shouldn't mean "sketchy." And because gamers deserve a download
            site that respects their time as much as they respect their K/D.
          </p>
          <p>That's it. That's the pitch. Now go find something to play.</p>

          <p className="about-cta">
            <Link className="btn" to="/games">Find something to play</Link>
          </p>
        </div>
      </div>
    </>
  )
}
