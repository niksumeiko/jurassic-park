# Graph Report - .  (2026-04-11)

## Corpus Check
- 16 files · ~24,982 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1361 nodes · 3343 edges · 19 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## God Nodes (most connected - your core abstractions)
1. `rv()` - 73 edges
2. `bA` - 40 edges
3. `wA` - 36 edges
4. `r()` - 32 edges
5. `st()` - 31 edges
6. `$t()` - 30 edges
7. `E2` - 30 edges
8. `yt()` - 29 edges
9. `NS` - 27 edges
10. `gt` - 26 edges

## Surprising Connections (you probably didn't know these)
- `Playwright CT Config` --references--> `Playwright Mount Hook`  [INFERRED]
  playwright-ct.config.ts → playwright/index.tsx
- `App Component` --references--> `createHashRouter for CT Testing`  [INFERRED]
  src/App.tsx → playwright/index.tsx
- `Playwright Mount Hook` --calls--> `App Component`  [EXTRACTED]
  playwright/index.tsx → src/App.tsx
- `App Component` --calls--> `Routes Configuration`  [EXTRACTED]
  src/App.tsx → src/routes.tsx
- `Main Entrypoint` --calls--> `App Component`  [EXTRACTED]
  src/main.tsx → src/App.tsx

## Communities

### Community 0 - "Community 0"
Cohesion: 0.01
Nodes (168): _0, A0, AA(), Ad(), aE(), AS(), aT(), av() (+160 more)

### Community 1 - "Community 1"
Cohesion: 0.01
Nodes (142): _a, aa, Ai(), ao(), as(), at(), B(), be() (+134 more)

### Community 2 - "Community 2"
Cohesion: 0.03
Nodes (90): ac(), ar(), bE(), Bi(), br(), bs(), c_(), cc() (+82 more)

### Community 3 - "Community 3"
Cohesion: 0.03
Nodes (19): bA, Bh(), Cb(), Dh(), el(), gE(), Gy(), iE() (+11 more)

### Community 4 - "Community 4"
Cohesion: 0.03
Nodes (37): cd(), dd(), DE(), Do(), dv(), f0, fE(), fT() (+29 more)

### Community 5 - "Community 5"
Cohesion: 0.04
Nodes (19): be(), ce, ct(), de, _e(), Ee(), fe(), ge() (+11 more)

### Community 6 - "Community 6"
Cohesion: 0.11
Nodes (13): a_, Ah, gc(), hr(), k0(), l_, mc(), ov() (+5 more)

### Community 7 - "Community 7"
Cohesion: 0.09
Nodes (3): _2, E2, fr

### Community 8 - "Community 8"
Cohesion: 0.14
Nodes (10): dc(), Fb(), id(), Io(), jS(), Kb(), Li(), ur() (+2 more)

### Community 9 - "Community 9"
Cohesion: 0.23
Nodes (5): JT(), NS, pT(), sd(), Wn()

### Community 10 - "Community 10"
Cohesion: 0.16
Nodes (4): Bo(), Fv(), oc, Ui

### Community 11 - "Community 11"
Cohesion: 0.13
Nodes (3): m0, mt, $t()

### Community 12 - "Community 12"
Cohesion: 0.16
Nodes (1): _r

### Community 13 - "Community 13"
Cohesion: 0.27
Nodes (17): af(), ef(), ff(), Ja(), lf(), mt(), nf(), of() (+9 more)

### Community 14 - "Community 14"
Cohesion: 0.14
Nodes (7): App Component, Main Entrypoint, PaddockMonitor(), createHashRouter for CT Testing, Playwright Mount Hook, Playwright CT Config, Routes Configuration

### Community 15 - "Community 15"
Cohesion: 0.21
Nodes (4): eE, j_(), Oh(), W_

### Community 16 - "Community 16"
Cohesion: 1.0
Nodes (2): dinosaur(), hoursAgo()

### Community 17 - "Community 17"
Cohesion: 1.0
Nodes (0): 

### Community 18 - "Community 18"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **3 isolated node(s):** `Playwright CT Config`, `g2`, `Main Entrypoint`
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 17`** (1 nodes): `vite.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 18`** (1 nodes): `vite-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `jS()` connect `Community 8` to `Community 0`, `Community 13`, `Community 4`, `Community 5`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Why does `rv()` connect `Community 4` to `Community 0`, `Community 2`, `Community 3`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Why does `wA` connect `Community 3` to `Community 0`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **What connects `Playwright CT Config`, `g2`, `Main Entrypoint` to the rest of the system?**
  _3 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.01 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.01 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.03 - nodes in this community are weakly interconnected._