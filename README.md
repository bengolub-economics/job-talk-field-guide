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

The essay header links to `public/deck_handout.pdf` and the public gallery of before-and-betters. The essay renderer copies the current handout from `deck_handout.pdf` in the parent JM wisdom folder, so the PDF is included in the Pages export. It also updates `public/slides_handout.pdf` with the same bytes to preserve previously shared links. The gallery link uses its full public URL so it also works from the standalone HTML.

The current manuscript is `job-talk-essay-revised.md` in the parent JM wisdom folder. The opening listicle is edited separately in `job-talk-dos-and-donts.md`. From that folder, run:

```sh
python3 scripts/build_essay_html.py
```

The essay also links to `resources.html`, a curated reading list of ten presentation guides. Its source is `10-economics-presentation-guides.md` in the parent folder. Run `python3 scripts/build_resources_html.py` there to update the matching `content/resources.md` and `content/resources.html` snapshots. In a standalone checkout, edit `content/resources.md` and run `python3 scripts/build-resources.py` (requires Pandoc). The normal build validates their source hash and copies the page to `public/resources.html`. The export checks all ten resource anchors and links in both directions between the essay and resources.

This regenerates the standalone `job-talk-essay.html` and synchronizes `content/essay.md`, `content/essay-listicle.md`, and `content/essay.html`, retaining the link back to the field guide. Listicle headlines link directly to the supporting paragraphs in the same page. Then run `npm run build:pages` in this folder. Every build checks both Markdown snapshots against the source hashes embedded in the HTML; in the writing workspace, it also checks against the latest manuscripts. The build stops if they differ or a paragraph link has no target. Do not edit the generated HTML directly.

All revised panels use HTML, SVG, and typeset mathematics. The build rejects an original slide image on the revised side. Numerical reconstruction notes record any calculated or digitized values.

## Other deployment target

`npm run dev` and `npm run build` retain the original Sites/Vinext deployment. The GitHub Pages build is a separate static target; application content and styling are shared.

Each improved slide links to the visible before slides it reworks. The before and improved viewers navigate independently; the links let a reader explicitly select the original slide that a revision reworks. The content validator checks those references, source assets, strict LaTeX, and the rule that improved slides are rendered from code.
