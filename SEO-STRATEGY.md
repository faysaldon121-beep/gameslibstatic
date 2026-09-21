# GetGamerz — Keyword & Link-Building Strategy

Status as of Sep 21, 2026: site verified in Search Console, **not yet indexed**
(zero pages in Google). Sitemap submitted. This document is the plan from here.

---

## 1. The keyword ladder (and what's realistic)

Ranking follows a ladder. You earn the top by winning the bottom first.

### Tier 1 — Head terms (6–18+ months, need real authority)
| Keyword | Target page | Reality |
|---|---|---|
| free pc games | Homepage | Dominated by giant aged sites. Don't chase directly yet. |
| free pc games download | Homepage | Same — the homepage title now targets this. |
| download games for pc | Homepage | Same. |

These rank ONLY after the domain has accumulated months of Tier-3 wins,
traffic, and backlinks. No shortcut exists.

### Tier 2 — Mid-tail (2–6 months) ← **main fight, game pages**
| Keyword pattern | Example | Target page |
|---|---|---|
| download {game} free for pc | download gta 5 free for pc | Game pages |
| {game} free download | elden ring free download | Game pages |
| {game} pc download | cyberpunk 2077 pc download | Game pages |

**This round's change targets exactly these**: every game page title is now
`Download {title} Free for PC | GetGamerz` — the exact phrase people type,
front-loaded (first words matter most to Google).

### Tier 3 — Long-tail (weeks–2 months) ← **early wins live here**
| Keyword pattern | Example | Already targeted by |
|---|---|---|
| {game} system requirements | gta 5 system requirements | Tech Specs section |
| {game} download size | gta 5 download size | Meta + specs rows |
| {game} file size / version | elden ring file size | Specs + download panel |
| {game} dlc list / included dlcs | cyberpunk all dlcs | Title/desc "Full Games + DLCs" |

Your 35 game pages × ~4 long-tail patterns = **~140 realistic entry points**.
These queries have low competition and high intent — the people who find you
this way are exactly the people who download.

### Tier 0 — Brand
"getgamerz" — will rank #1 within days of indexing. Worth nothing yet; worth
everything later (branded search volume is a ranking-quality signal).

---

## 2. What's already in place (on-page)

- Unique title + meta description + canonical per page (38 prerendered pages)
- `Download {game} Free for PC` title pattern (this round)
- VideoGame + BreadcrumbList structured data
- sitemap.xml (36 URLs), robots.txt, llms.txt
- Fast static HTML (perf 97 desktop / high-80s mobile) — Core Web Vitals pass
- Internal linking: home → tiles → game pages → tag searches

**Remaining on-page lever (optional next):** a small blog section targeting
list keywords ("best free racing games pc", "games under 10GB") — each post
funnels internal links to game pages. Say the word and I'll build it.

---

## 3. Link building — ranked by effort-to-impact

Honest framing: this niche (full free games) is hard for classic link building
because most legit sites won't link to download sites, and Google actively
demotes pages hit by DMCA takedowns. What actually works here:

### Do first (this week)
1. **Community seeding** — Reddit (r/pcgamesdownload-type subs), gaming
   Discords, Telegram channels: share *specific game pages*, not the homepage.
   Deep links to game pages are worth more than root links anyway.
2. **YouTube comments/descriptions** — videos about the games you host
   ("GTA 5 mods 2026") get constant traffic; a helpful comment with the
   direct game page link survives and refers for months.
3. **Web directories for this niche** — "free pc game download sites" listicles
   exist and accept submissions. 30 minutes of work each, permanent links.

### Do consistently (monthly)
4. **Profile/brand links** — GitHub repo, Telegram channel for the site
   (doubles as a traffic channel), a simple Twitter/X account that posts each
   "Fresh Drop".
5. **Niche forums** — tech/gaming forums with website fields in profiles.

### Only if you're serious about Tier 1
6. **Link-worthy content** — the blog posts above ("games under 10GB",
   "best low-spec games that run on a potato") attract links from forums
   naturally. This is the only sustainable path to head terms.

### Avoid
- Buying links (penalty risk outweighs everything on a new domain)
- Spam comment blasts (Google ignores them, reputation tanks)
- Link exchanges with other download sites (pattern is trivially detected)

---

## 4. Risks you should plan around (this niche specifically)

- **DMCA / pirate demotion**: publishers file takedowns for popular titles;
  URLs receiving valid DMCA notices get removed from search and repeated
  notices demote the whole domain. Mitigations: honor takedowns quickly,
  diversify catalog (older/abandonware titles are much safer than new AAA),
  keep the Telegram channel as a traffic source that survives search dips.
- **Subdomain ceiling**: `github.io` / `workers.dev` subdomains inherit
  limited trust and can share baggage. A $10/yr custom domain is the single
  best long-term ranking investment. Do it BEFORE the site gains traction,
  not after (changing domains later resets a lot).

## 5. Timeline (realistic)

| When | Milestone |
|---|---|
| Week 1–2 | Indexed (after sitemap + Request Indexing) |
| Month 1–2 | First long-tail impressions in GSC (system requirements queries) |
| Month 2–4 | Long-tail page-1 rankings; first steady organic downloads |
| Month 4–6 | Mid-tail game-download queries on page 1–2 |
| Month 6–12+ | Head-term visibility IF link building + blog happen; otherwise capped |

## 6. What to check monthly (30 minutes)

1. Search Console → Performance: impressions by query (watch Tier-3 patterns)
2. Search Console → Coverage: all 38 pages indexed?
3. Search Console → Links: new referring domains (any growth = on track)
4. Fix anything with impressions but rank > 20: sharpen that page's title/desc
