# The Job Talk Field Guide

A companion to Benjamin Golub’s advice on giving a better job talk. Ten cases pair before slides with newly rendered revisions: nine from public research presentations and one constructed example of mnemonic notation.

[Open the public gallery](https://bengolub-economics.github.io/job-talk-field-guide/)

## Build for GitHub Pages

```sh
npm ci
npm run build:pages
```

The static website is written to `dist/client/`. Publish that directory, including `.nojekyll`, to the root of the `gh-pages` branch. GitHub Pages uses that branch as its source.

The default project path is `/job-talk-field-guide`. Set `PAGES_BASE_PATH` when building for a differently named repository. The export checks every HTML page, internal link, image, stylesheet, and font target. It retains numbered case navigation, slide controls, enlargement, and local KaTeX fonts.

The installed vinext beta exporter needs two adaptations for project-path hosting: its local prerender requests need the configured path and trailing slash, and its prefixed asset directory needs flattening to match the GitHub Pages mount. The build script handles both without changing the dependency package.

## Edit the gallery

- `lib/gallery-data.json`: case content, source attribution, and outline sequences.
- `components/slide.tsx`, `research-examples.tsx`, and `rebuilt-results.tsx`: revised slide layouts and diagrams.
- `components/panel-viewer.tsx`: slide navigation and enlargement.
- `components/deck-outline.tsx`: whole-talk schematic sequences.
- `public/originals/`: selected original slide renders, attributed in each case.
- `content/essay.md` and `content/essay.html`: matching source snapshot and illustrated companion essay. `public/essay.html` is generated with local KaTeX fonts; `public/talk.pdf` is the accompanying talk.

### Keep the essay synchronized

The current manuscript is `job-talk-essay-revised.md` in the parent JM wisdom folder. The opening listicle is edited separately in `job-talk-dos-and-donts.md`. From that folder, run:

```sh
python3 scripts/build_essay_html.py
```

This regenerates the standalone `job-talk-essay.html` and synchronizes `content/essay.md`, `content/essay-listicle.md`, and `content/essay.html`, retaining the link back to the field guide. Listicle headlines link directly to the supporting paragraphs in the same page. Then run `npm run build:pages` in this folder. Every build checks both Markdown snapshots against the source hashes embedded in the HTML; in the writing workspace, it also checks against the latest manuscripts. The build stops if they differ or a paragraph link has no target. Do not edit the generated HTML directly.

All revised panels use HTML, SVG, and typeset mathematics. The build rejects an original slide image on the revised side. Numerical reconstruction notes record any calculated or digitized values.

## Other deployment target

`npm run dev` and `npm run build` retain the original Sites/Vinext deployment. The GitHub Pages build is a separate static target; application content and styling are shared.

Each improved slide links to the visible before slides it reworks. The before and improved viewers navigate independently; the links let a reader explicitly select the original slide that a revision reworks. The content validator checks those references, source assets, strict LaTeX, and the rule that improved slides are rendered from code.
