import { Link } from 'react-router-dom'

// Product tile — written with pure Tailwind utilities (no component classes):
// simple card pattern, brand hover ring, image zoom on hover.
export default function GameCard({ game }) {
  return (
    <Link
      to={`/games/${game.slug}`}
      className="group flex flex-col overflow-hidden rounded-[18px] bg-paper-2 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(76,60,160,0.14)] hover:ring-1 hover:ring-brand/30"
    >
      <div className="h-[250px] overflow-hidden bg-[#e8e8ed]">
        <img
          src={game.coverImage}
          alt={game.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col items-start gap-1.5 p-[22px] text-left">
        <h3 className="line-clamp-2 text-[19px] font-semibold tracking-[-0.01em]">
          {game.title}
        </h3>
        <p className="m-0 text-sm text-ink-2">
          {game.genre} · {game.fileSize}
        </p>
        <span className="mt-2.5 inline-flex h-7 items-center justify-center rounded-full bg-brand px-4 text-[13px] text-white transition group-hover:bg-brand-dark">
          View
        </span>
      </div>
    </Link>
  )
}
