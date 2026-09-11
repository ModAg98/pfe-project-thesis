# PFE Defense: Intelligent Similarity Search System for the Gemba Walk Assistant

Interactive presentation for the End-of-Studies Project defense of **Mohamed Mortadha Agoubi**
International Private Polytechnic School of Tunis × iObeya, 2025/2026.

React · TypeScript · Tailwind CSS · Framer Motion.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
```

For the defense, build once and serve the static output. Fonts are bundled, so the
deck runs with **no internet at all**:

```bash
npm run build && npm run preview   # http://localhost:4173
```

Open it, press **F** for fullscreen, and present.

---

## Speaker controls

| Key | Action |
| --- | --- |
| `→` / `Space` | next step (advances within a slide, then to the next slide) |
| `←` | previous step |
| `↓` / `↑` | jump a whole slide |
| `Home` / `End` | first / last |
| `F` | fullscreen |
| `O` | overview grid, click any slide to jump |
| `B` | black screen (for Q&A) |
| `H` | keyboard help |

Mouse wheel and touch swipe also advance. On-screen controls fade after a few
seconds of stillness. `#9.2` in the URL jumps straight to slide 9, step 2,
useful for rehearsing one slide.

**Videos** play automatically when their slide is on screen and pause when you
leave it. Click any clip to pause or resume it manually.

---

## The 19 slides (~21 min)

| # | Slide | Steps | ~min | What it does |
| --- | --- | --- | --- | --- |
| 01 | Cover | 1 | 0.7 | Title, you, the jury |
| 02 | Agenda | 3 | 0.6 | The five beats of the story |
| 03 | Lean | 3 | 0.8 | The 5 principles, Gemba defined |
| 04 | Obeya → iObeya | 4 | 0.9 | Physical boards → digital, real client logos |
| 05 | Gemba Walk Assistant | 4 | 1.1 | **Clip 1**: the 5W2H captured on the spot |
| 06 | The problem | 3 | 1.2 | **Cinematic video**, full-bleed |
| 07 | What it costs | 3 | 0.7 | The "buried in issues" illustration + 4 costs |
| 08 | Search by meaning | 4 | 1.1 | The two-issue / converging-vectors animation |
| 09 | **The solution** | 5 | 2.6 | **Clips 1–3**: Capture → Find → Reuse |
| 10 | Architecture | 4 | 1.0 | The 3 layers (Vue panel · Flask service · pgvector) + iObeya VMS, and the 3 decisions behind them |
| 11 | Built with | 2 | 0.8 | The stack from Table 4.2, grouped by layer, with the rationale behind the choices |
| 12 | The pipeline | 5 | 1.2 | Ingest → Embed → Search → Generate, one column per stage |
| 13 | Built on 5W2H | 5 | 1.4 | The real field weights, why What ≫ Who |
| 14 | **RAG · Retrieval** | 5 | 1.6 | Worked example: embed the issue, per-field similarity, × weight, blend with the global vector, coverage penalty, threshold |
| 15 | **RAG · Generation** | 5 | 1.3 | Context → Consolidate → Narrate → Verify → Act; two generators, anchoring confidence |
| 16 | Grounded AI | 5 | 1.2 | What the AI may and may not do |
| 17 | Results | 4 | 1.4 | KPIs + the robustness bar chart |
| 18 | Conclusion | 3 | 0.9 | 3 pillars, roadmap, closing line |
| 19 | Thank you | 1 | 0.3 | Jury names again |

**Running long?** Slide 10 (Architecture) is the clean cut, since 12, 14 and 15 already show
what runs where; then compress 03 and 04 into one breath. Slide 09 is the one to
protect (it is the demo); slides 14 and 15 are the ones the jury will ask about.

The per-field similarities on slide 14 are a **worked example** (the slide says so);
the weights, α = 0.75, the 0.25 coverage penalty and the 0.45 threshold are the real
values from the report and come from `src/data/presentation.ts`.

---

## Assets (all wired, in `public/assets/`)

| File | Used on | Source |
| --- | --- | --- |
| `problem-video.mp4` | 06 | your cinematic clip |
| `buried-in-issues.gif` | 07 | `Image1.gif` |
| `clip-1-capture.mp4` | 05, 09 | `gemba_demo_clips/1_…` |
| `clip-2-search.mp4` | 09 | `gemba_demo_clips/2_…` |
| `clip-3-reuse.mp4` | 09 | `gemba_demo_clips/3_…` |
| `full-demo.mp4` | *spare* | the full walkthrough, if you want a longer demo |
| `iobeya-logo.png` | 01, 19 | official logo |
| `gemba-logo.jpg` | 05 | Gemba by iObeya |
| `board-physical-1/2.png` | 04 | real Lean boards |
| `board-iobeya-1/2.png` | 04 | iObeya screenshots |
| `client-sanofi/airfrance/renault.png` | 04 | client logos |
| `gemba-walk-scene.png` | 05 | shop-floor illustration |
| `tech/*.png` | 11 | the "built with" slide |

The school logo (`school-logo.jpeg`) is wired as `assets.schoolLogo` in
[`src/data/presentation.ts`](src/data/presentation.ts) and appears on slides 01 and 19.

To swap the solution clips for newer recordings later, just overwrite the
`clip-*.mp4` files or repoint `assets.clips`.

---

## Editing

**Everything lives in [`src/data/presentation.ts`](src/data/presentation.ts):**
names, jury, assets, field weights, results, limitations, roadmap. The slides read
from it, so changing a number there changes every place it appears.

The field weights on slide 13 are the **real ones** from the report
(What 0.32 · Why 0.20 · How 0.15 · Where 0.10 · Who 0.06 · How many 0.05 ·
Root cause 0.05 · When 0.04 · Frequency 0.03).

### Colors

The palette is in [`tailwind.config.js`](tailwind.config.js): `brand.blue`,
`brand.violet`, `brand.sky`. Change those three and the whole deck re-tones.

### Structure

Add, remove or reorder slides in [`src/sections/index.ts`](src/sections/index.ts).
The progress bar, overview and keyboard navigation all derive from that array;
`steps` controls how many clicks a slide takes.

---

## Layout model

Every slide is composed on a fixed **1600 × 900** canvas scaled to fit the viewport
([`src/components/Stage.tsx`](src/components/Stage.tsx)), so the composition is
identical on any projector, letterboxed rather than reflowed.
