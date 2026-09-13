# The Job Talk Field Guide

A companion to Benjamin Golub’s advice on giving a better job talk. Twelve cases from public research presentations pair original slides with newly rendered revisions. Three cases provide browsable original and revised outlines of complete talks.

[Open the public gallery](https://bengolub-economics.github.io/job-talk-field-guide/)

## Build for GitHub Pages

```sh
npm ci
npm run build:pages
```

The static website is written to `dist/client/`. Publish that directory, including `.nojekyll`, to the root of the `gh-pages` branch. GitHub Pages uses that branch as its source.

The default project path is `/job-talk-field-guide`. Set `PAGES_BASE_PATH` when building for a differently named repository. The export checks every HTML page, internal link, image, stylesheet, and font target. It retains interactive filters, slide controls, enlargement, and local KaTeX fonts.

The installed vinext beta exporter needs two adaptations for project-path hosting: its local prerender requests need the configured path and trailing slash, and its prefixed asset directory needs flattening to match the GitHub Pages mount. The build script handles both without changing the dependency package.

## Edit the gallery

- `lib/gallery-data.json`: case content, source attribution, and outline sequences.
- `components/slide.tsx`, `research-examples.tsx`, and `rebuilt-results.tsx`: revised slide layouts and diagrams.
- `components/panel-viewer.tsx`: slide navigation and enlargement.
- `components/deck-outline.tsx`: whole-talk schematic sequences.
- `public/originals/`: selected original slide renders, attributed in each case.
- `content/essay.html` and `public/talk.pdf`: companion essay and talk.

All revised panels use HTML, SVG, and typeset mathematics. The build rejects an original slide image on the revised side. Numerical reconstruction notes record any calculated or digitized values.

## Other deployment target

`npm run dev` and `npm run build` retain the original Sites/Vinext deployment. The GitHub Pages build is a separate static target; application content and styling are shared.
