#!/usr/bin/env python3
"""Render the curated reading list using the companion essay's typography."""

from pathlib import Path
import hashlib
import html
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'content/resources.md'
source = SOURCE.read_text()
source_hash = hashlib.sha256(source.encode()).hexdigest()

# Keep the research notes as the source; publish the reader-facing annotations.
entries = source[source.index('## 1. '):].split('\n---\n', 1)[0]
entries = entries.replace(
    'He is less senior than several authors here; the guide earns its place through its exceptional practical value for economics slides. ',
    '',
)
entries = entries.replace(
    "David Weinstein's widely circulated presentation advice explicitly adapts this text; it was not counted as a separate selection.",
    '',
)
sections = re.split(r'^## ', entries, flags=re.MULTILINE)[1:]
assert len(sections) == 10
labels = []
rendered = []
for number, section in enumerate(sections, 1):
    heading, body = section.split('\n', 1)
    assert heading.startswith(f'{number}. ')
    author, title = heading[len(f'{number}. '):].split(' — ', 1)
    labels.append((number, author))
    title_html = subprocess.run(
        ['pandoc', '--from=markdown', '--to=html5', '--wrap=none'],
        input=title, text=True, capture_output=True, check=True,
    ).stdout.strip().removeprefix('<p>').removesuffix('</p>')
    body_html = subprocess.run(
        ['pandoc', '--from=markdown', '--to=html5', '--wrap=none'],
        input=body, text=True, capture_output=True, check=True,
    ).stdout
    body_html = body_html.replace('<p>', '<p class="resource-meta">', 1)
    rendered.append(f'''<section class="resource" aria-labelledby="resource-{number}">
<p class="resource-author">{number:02d} · {html.escape(author)}</p>
<h2 id="resource-{number}">{title_html}</h2>
{body_html}</section>''')

toc = ''.join(f'<li><a href="#resource-{n}">{html.escape(author)}</a></li>' for n, author in labels)
resource_number = {author: n for n, author in labels}
essay = (ROOT / 'content/essay.html').read_text()
css = re.search(r'<style>([\s\S]*?)</style>', essay).group(1)
css += '''
.site-links { display:flex; flex-wrap:wrap; gap:12px 24px; margin-bottom:38px; font:15px/1.5 var(--sans); }
.resources-header { padding-bottom:22px; }
.resources-header h1 { max-width:700px; }
.resource-intro { font-size:19px; }
.reading-path { border-left:3px solid var(--teal); padding-left:20px; margin:28px 0; font-size:18px; }
.reading-path p { margin:0 0 8px; }
.reading-path p:last-child { margin:0; }
.resource-index { border-block:1px solid var(--rule); padding:20px 0; margin:32px 0 0; font:15px/1.6 var(--sans); }
.resource-index ol { margin:0; padding-left:23px; columns:2; column-gap:32px; }
.resource-index li { padding:5px 0 5px 3px; break-inside:avoid; }
.resource { padding:36px 0 14px; border-bottom:1px solid var(--rule); }
.resource-author { font:600 15px/1.5 var(--sans); color:var(--teal); margin:0 0 10px; }
.resource h2 { margin:0 0 17px; font-size:30px; }
.resource-meta { font:15px/1.7 var(--sans); color:var(--muted); margin-bottom:23px; }
.resource p:not(.resource-author):not(.resource-meta) { font-size:18px; line-height:1.7; }
.resource :target { scroll-margin-top:26px; }
.resources-footer { display:flex; justify-content:space-between; flex-wrap:wrap; gap:15px; text-align:left; font-size:14px; }
@media(max-width:600px) {
  .site-links { font-size:14px; margin-bottom:28px; }
  .resource-intro,.reading-path,.resource p:not(.resource-author):not(.resource-meta) { font-size:17px; }
  .resource-index ol { columns:1; }
  .resource h2 { font-size:27px; }
}
'''
page = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Ten guides to economics research presentations: theory, empirical work, job talks, short talks, and slide design.">
<meta name="source-sha256" content="{source_hash}">
<title>Presentation resources · The Job Talk Field Guide</title>
<style>{css}</style>
</head>
<body>
<a class="skip-link" href="#resources">Skip to resources</a>
<main id="top">
<nav class="site-links" aria-label="Companion pages"><a href="essay.html">← How to give a better job talk</a><a href="./">Slide gallery</a></nav>
<header class="essay-header resources-header">
<h1>Ten guides to economics presentations</h1>
<p>A reading list for theory, empirical work, and slide design · September 13, 2026</p>
</header>
<p class="resource-intro">Advice from economists on explaining a model, presenting evidence, designing slides, and making good use of seminar time. All ten guides are freely available.</p>
<div class="reading-path">
<p><strong>Theory:</strong> start with <a href="#resource-{resource_number['Matthew O. Jackson']}">Jackson</a> and <a href="#resource-{resource_number['Shengwu Li']}">Li</a>.</p>
<p><strong>Empirical work:</strong> start with <a href="#resource-{resource_number['Jesse M. Shapiro']}">Shapiro</a> and <a href="#resource-{resource_number['Eliana La Ferrara']}">La Ferrara</a>.</p>
<p><strong>Building slides:</strong> use <a href="#resource-{resource_number['Paul Goldsmith-Pinkham']}">Goldsmith-Pinkham's examples and editable source</a>.</p>
</div>
<nav class="resource-index" aria-label="The ten resources"><ol>{toc}</ol></nav>
<div id="resources">{''.join(rendered)}</div>
<footer class="resources-footer"><a href="essay.html">Back to the essay</a><a href="#top">Back to top ↑</a></footer>
</main>
</body>
</html>
'''
(ROOT / 'content/resources.html').write_text(page)
print('Rendered ten resources in content/resources.html')
