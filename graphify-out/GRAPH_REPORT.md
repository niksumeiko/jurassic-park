# Graph Report - .  (2026-04-12)

## Corpus Check
- 22 files · ~26,069 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1379 nodes · 3368 edges · 19 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.9)
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
- `Playwright Mount Hook` --calls--> `App()`  [EXTRACTED]
  playwright/index.tsx → src/App.tsx
- `Main Entrypoint` --calls--> `App()`  [EXTRACTED]
  src/main.tsx → src/App.tsx
- `Routes Configuration` --references--> `PaddockMonitor()`  [EXTRACTED]
  src/routes.tsx → src/PaddockMonitor.tsx

## Communities

### Community 0 - "Community 0"
Cohesion: 0.01
Nodes (143): _a, aa, Ai(), ao(), as(), at(), B(), be() (+135 more)

### Community 1 - "Community 1"
Cohesion: 0.01
Nodes (181): _0, A0, AA(), Ad(), aE(), AS(), aT(), av() (+173 more)

### Community 2 - "Community 2"
Cohesion: 0.03
Nodes (17): bA, Bh(), Cb(), Dh(), el(), gE(), Gy(), Kv() (+9 more)

### Community 3 - "Community 3"
Cohesion: 0.03
Nodes (83): ac(), ar(), ax(), Bi(), br(), bs(), c_(), Cr (+75 more)

### Community 4 - "Community 4"
Cohesion: 0.03
Nodes (36): cd(), DE(), f0, fT(), hh(), hs(), Ia(), Jh (+28 more)

### Community 5 - "Community 5"
Cohesion: 0.04
Nodes (19): be(), ce, ct(), de, _e(), Ee(), fe(), ge() (+11 more)

### Community 6 - "Community 6"
Cohesion: 0.1
Nodes (13): a_, Ah, gc(), k0(), l_, m0, mc(), mt (+5 more)

### Community 7 - "Community 7"
Cohesion: 0.08
Nodes (4): _2, e_(), E2, fr

### Community 8 - "Community 8"
Cohesion: 0.12
Nodes (10): dc(), Fb(), id(), Io(), jS(), Kb(), Li(), ur() (+2 more)

### Community 9 - "Community 9"
Cohesion: 0.23
Nodes (5): JT(), NS, pT(), sd(), Wn()

### Community 10 - "Community 10"
Cohesion: 0.16
Nodes (4): Bo(), Fv(), oc, Ui

### Community 11 - "Community 11"
Cohesion: 0.09
Nodes (11): App(), fetchDinosaur(), getErrorMessage(), Main Entrypoint, PaddockMonitor(), dinosaur(), hoursAgo(), createHashRouter for CT Testing (+3 more)

### Community 12 - "Community 12"
Cohesion: 0.27
Nodes (17): af(), ef(), ff(), Ja(), lf(), mt(), nf(), of() (+9 more)

### Community 13 - "Community 13"
Cohesion: 0.36
Nodes (6): buildContext(), createGenericContext(), createOptionalGenericContext(), createWritableGenericContext(), getUnsupportedResetValue(), getUnsupportedSetValue()

### Community 14 - "Community 14"
Cohesion: 0.36
Nodes (2): pr(), S2

### Community 15 - "Community 15"
Cohesion: 0.38
Nodes (1): W_

### Community 16 - "Community 16"
Cohesion: 1.0
Nodes (0): 

### Community 17 - "Community 17"
Cohesion: 1.0
Nodes (0): 

### Community 18 - "Community 18"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **5 isolated node(s):** `Playwright CT Config`, `createHashRouter for CT Testing`, `g2`, `Main Entrypoint`, `Routes Configuration`
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 16`** (1 nodes): `vite.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 17`** (1 nodes): `vite-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 18`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `jS()` connect `Community 8` to `Community 1`, `Community 12`, `Community 4`, `Community 5`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Why does `rv()` connect `Community 4` to `Community 1`, `Community 2`, `Community 3`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Why does `wA` connect `Community 2` to `Community 1`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **What connects `Playwright CT Config`, `createHashRouter for CT Testing`, `g2` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.01 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.01 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.03 - nodes in this community are weakly interconnected._