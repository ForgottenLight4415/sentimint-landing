# Sentimint – Creative Design Specification**Design theme:** Surgical-clean fintech minimalism with a single pop of effervescent mint.**Atmosphere:** Bright trading floor at dawn – white light, glass reflections, subtle hum of data streams, gentle mint glints signalling opportunity.

---

##1. Foundations (Design System)

### Colour Tokens| Token name | Purpose | Hex |
|------------|---------|-----|
| slate-900 | Primary text / icons | #272730 (from ref img dominant) |
| slate-600 | Secondary text | #7d7c7e |
| mint-500 | Core accent, interactive states, progress bars | #2ED8A7 |
| mint-100 | Accent tint, graph backgrounds | #E5FBF4 |
| white | Canvas, cards | #FFFFFF |
| graph-line | Stock line graphics (upper-left motif) | #88C4E0 (mirrors image palette) |
| positive | BUY state glow | #39D78D |
| negative | SELL state glow | #FF5C5C |
| focus-ring | A11y focus outline | #8988AA |

### Typography• Display: “Satoshi Variable”, weight500-700, tight line-height1.1• Body: “Inter”, weight400-500, line-height1.6• Mono / data: “IBM Plex Mono”, weight400### Sizing & Effects• Spacing scale (Tailwind t-shirt):1=4px, then2,3,4,6,8,12,16,20,24,32• Corner radii: xs=4px, sm=8px, lg=16px (progress boxes), full for pills• Shadows: – card-elevate:024-1rgba(39,39,48,.06) – hover-lift:0612-2rgba(39,39,48,.10)• Special: glass-mint backdrop-blur(12px) + thin border-mint-100 for flow chart nodes---

##2. Site-wide Layout• Grid:12-col /72px max col @ ≥1280px,16px gutter.• Breakpoints: sm640, md768, lg1024, xl1280,2xl1536.• Max-width for content:1440px.• Motion: – Stock line graphic animates via subtle8s infinite drift (parallax speed0.4) – Elements reveal on60% viewport with250ms cubic-bezier(.16,.84,.44,1) stagger120ms. – Reduced-motion: fade-only, no drift.

• Header: sticky top0, transparent → solid white on scroll>64px,48px height mobile /72px desktop.• Footer: slim64px, anchored links + legal, fades up on300ms composited transform.

---

##3. Pages & Key Sections### HOME / Landing| Seq | Block | Notes |
|-----|-------|-------|
|1 | Hero Header | “Sentimint” logotype left, right-side minimal nav: Docs · Pricing · Sign In. |
|2 | Central Search Module |560px wide rounded-lg input. Idle: slate-900 placeholder “Enter a ticker…”. Hover: ring-mint-500/20. Focus: ring-mint-500/80, mono cursor pulsates. Autocomplete dropdown8 items. |
|3 | Agents Progress Trio | Three horizontal cards ↓ below search. Each shows Agent name, progress bar mint-500 gradient, % label, tiny pause/resume icon. Live animates from0→current over1.2s on load. |
|4 | Stock Line Graphic | Upper-left hero corner, SVG poly-line stroke graph-line2px, soft blur8px, z-index-0, absolute so it peeks behind header. |
|5 | Flow Chart BUY/SELL | Responsive SVG graph centred beneath progress cards. Nodes: “Signal”, “Agent”, “Exchange”. Green glow on BUY path, red glow on SELL path; hover a node → magnify1.08 & elevate shadow. Tap toggles to show live sampleON in mono panel. |
|6 | Call-to-Action Strip | “Start minting alpha” button (mint-500 bg → white text, hover inverse). |
|7 | Footer | © Sentimint2024 · socials · dark-mode toggle. |

---

##4. Reusable Components & Micro-Interactions| Component | Behaviour / States | A11y |
|-----------|-------------------|------|
| LogoMark | SVG mint coin rotates180° on hover (prefers-reduced-motion: none). | aria-label “Sentimint home” |
| PrimaryButton | Idle white border-mint-500 text-mint-500 → hover bg-mint-500 text-white → active scale .96 |3px focus-ring colour token |
| SearchBox | Idle, hover, focus, loading (spinner after enter400ms), error (shake2×, border negative), disabled (slate-600/30) | aria-live polite for errors |
| ProgressCard | Progress bar animates width; hover lifts; pause icon toggles to play | role=progressbar, aria-valuenow/up/max |
| FlowNode | Hover glow (008rgba token), focus same, active pulse | keyboard navigable with arrow keys |
| Tooltip | Fades120ms; tail arrow; escape key dismiss | WCAG2.2 non-modal |

---

##5. Performance & Accessibility Targets• Static SVG + Lottie for micro-icons; defer heavy; critical CSS in <head>, rest via `@import` preload.• Images ≤80KB, AVIF preferred; SVG inline for graphs.• Lighthouse: ≥95 performance, ≥100 a11y, ≥100 best-practices.• Colour contrast AA min4.5:1 (mint-500 on white passes large-text; use slate-900 otherwise).• Prefers-reduced-motion: disable drift, scale, bar animation (opacity only).• Semantic landmarks, heading order, tab index ≤0, skip-nav link first.