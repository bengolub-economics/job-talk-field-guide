# The Job Talk Field Guide

A companion to Benjamin Golub’s job-talk advice. Twelve complete before/better cases: six verified public-source examples and six constructed teaching examples. Source baseline: September 13, 2026.

## Structure
- `lib/gallery-data.json`: editable case content, source attribution, and fidelity notes.
- `components/slide.tsx`: semantic slide layouts and teaching diagrams.
- `components/case-detail.tsx`: independent build controls, enlargement, text equivalents, printing.
- `components/timing-lab.tsx`: two explicit rehearsal scenarios.
- `public/originals`: original source-page renders, with attribution in case data.
- `public/essay.html` and `public/talk.pdf`: supplied companion material.
- `public/project-plan.md`: full project plan.

The public originals are selected critical excerpts, not open-license assets. The alternatives are this project’s work and do not imply author endorsement. Constructed examples and data must retain their labels.

## Development
Use the package manager represented by the lockfile. `npm run dev` serves the site; `npm run build` prepares the deployment. The site follows the scaffold’s Sites/Vinext architecture. `.openai/hosting.json` identifies its existing Site; reuse it for future publications.

## Editorial maintenance
Preserve numerical values, uncertainty, units, assumptions, and context. Add a source record and verify the physical PDF page before adding a public case. Do not infer oral delivery or timing from a static PDF. Keep source content and public downloadable data synchronized.
