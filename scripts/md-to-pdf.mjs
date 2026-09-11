/**
 * Renders SPEECH.md to a print-ready A4 PDF via headless Chrome.
 * Handles only the Markdown subset used in that file — deliberately small,
 * so the output is predictable rather than general-purpose.
 *
 *   node scripts/md-to-pdf.mjs SPEECH.md SPEECH.pdf
 */
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { resolve } from 'node:path'

const [, , inPath = 'SPEECH.md', outPath = 'SPEECH.pdf'] = process.argv

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Inline: **bold**, *italic*, `code`. Order matters. */
const inline = (s) =>
  esc(s)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')

const lines = readFileSync(inPath, 'utf8').split('\n')
const out = []
let i = 0

const flushTable = () => {
  const rows = []
  while (i < lines.length && /^\s*\|/.test(lines[i])) {
    rows.push(lines[i].trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim()))
    i++
  }
  if (!rows.length) return
  const isSep = (r) => r.every((c) => /^:?-{2,}:?$/.test(c))
  const head = isSep(rows[1] ?? []) ? rows[0] : null
  const body = head ? rows.slice(2) : rows
  out.push('<table>')
  if (head) out.push('<thead><tr>' + head.map((c) => `<th>${inline(c)}</th>`).join('') + '</tr></thead>')
  out.push('<tbody>')
  for (const r of body) out.push('<tr>' + r.map((c) => `<td>${inline(c)}</td>`).join('') + '</tr>')
  out.push('</tbody></table>')
}

const flushQuote = () => {
  const buf = []
  while (i < lines.length && /^>/.test(lines[i])) {
    buf.push(lines[i].replace(/^>\s?/, ''))
    i++
  }
  const text = buf.join(' ').trim()
  const cls = text.startsWith('🛟') ? 'quote safety' : 'quote'
  out.push(`<blockquote class="${cls}">${inline(text)}</blockquote>`)
}

const flushList = (ordered) => {
  const tag = ordered ? 'ol' : 'ul'
  const re = ordered ? /^\s*\d+\.\s+/ : /^\s*-\s+/
  out.push(`<${tag}>`)
  while (i < lines.length && re.test(lines[i])) {
    let item = lines[i].replace(re, '')
    i++
    // continuation lines (indented)
    while (i < lines.length && /^\s{2,}\S/.test(lines[i]) && !re.test(lines[i])) {
      item += ' ' + lines[i].trim()
      i++
    }
    out.push(`<li>${inline(item)}</li>`)
  }
  out.push(`</${tag}>`)
}

while (i < lines.length) {
  const l = lines[i]

  if (/^\s*$/.test(l)) { i++; continue }
  if (/^---\s*$/.test(l)) { out.push('<hr/>'); i++; continue }
  if (/^\s*\|/.test(l)) { flushTable(); continue }
  if (/^>/.test(l)) { flushQuote(); continue }
  if (/^\s*\d+\.\s+/.test(l)) { flushList(true); continue }
  if (/^\s*-\s+/.test(l)) { flushList(false); continue }

  const h = l.match(/^(#{1,4})\s+(.*)$/)
  if (h) {
    const lvl = h[1].length
    const txt = h[2]
    // each "## Slide N" opens a block we keep on one page
    if (lvl === 2 && /^Slide\s/i.test(txt)) {
      if (out.lastBlock) out.push('</section>')
      out.push('<section class="slide">')
      out.lastBlock = true
    } else if (out.lastBlock && lvl <= 2) {
      out.push('</section>')
      out.lastBlock = false
    }
    const brk = lvl === 1 && out.some((o) => /^<h1/.test(o)) ? ' class="newpage"' : ''
    out.push(`<h${lvl}${brk}>${inline(txt)}</h${lvl}>`)
    i++
    continue
  }

  // paragraph: collect until blank
  const buf = []
  while (i < lines.length && !/^\s*$/.test(lines[i]) && !/^(#{1,4}\s|>|\s*\||---\s*$|\s*-\s|\s*\d+\.\s)/.test(lines[i])) {
    buf.push(lines[i].trim())
    i++
  }
  if (buf.length) {
    const cls = /^\*\(/.test(buf[0]) ? ' class="stage"' : ''
    out.push(`<p${cls}>${buf.map(inline).join('<br/>')}</p>`)
  }
}
if (out.lastBlock) out.push('</section>')

const css = `
@page { size: A4; margin: 14mm 15mm 13mm 15mm; }
* { box-sizing: border-box; }
body {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 10.4pt; line-height: 1.38; color: #14172a; margin: 0;
}
h1, h2, h3, h4 { font-family: Inter, Helvetica, Arial, sans-serif; color: #17287E; line-height: 1.2; }
h1 { font-size: 20pt; margin: 0 0 3pt; letter-spacing: -0.4pt; }
h1 + p { color: #5C6580; font-size: 10.5pt; }
h2 { font-size: 13pt; margin: 11pt 0 5pt; padding-bottom: 2.5pt; border-bottom: 2px solid #E3E9F7; }
h3 { font-size: 11pt; margin: 9pt 0 3pt; }
p { margin: 0 0 5pt; }
strong { color: #17287E; }
em { color: #5C6580; }
code { font-family: 'JetBrains Mono', Consolas, monospace; font-size: 9.5pt; background: #F4F7FD; padding: 0 3px; border-radius: 3px; }
hr { border: none; border-top: 1px solid #E3E9F7; margin: 8pt 0; }
ul, ol { margin: 0 0 8pt; padding-left: 18pt; }
li { margin-bottom: 3pt; }
table { width: 100%; border-collapse: collapse; margin: 5pt 0 8pt; font-size: 9.3pt; font-family: Inter, Helvetica, Arial, sans-serif; }
th { background: #2342CE; color: #fff; text-align: left; padding: 4pt 6pt; font-weight: 700; font-size: 9.2pt; }
td { padding: 3.8pt 6pt; border-bottom: 1px solid #E3E9F7; vertical-align: top; }
tbody tr:nth-child(even) td { background: #F8FAFF; }
blockquote.quote { margin: 5pt 0 7pt; padding: 6pt 10pt; background: #F4F7FD; border-left: 3px solid #9A66D9; font-size: 10pt; }
blockquote.safety { background: #EEF9F4; border-left-color: #16A97C; }
p.stage { color: #7B4FD0; font-style: italic; }
section.slide { break-inside: avoid; page-break-inside: avoid; margin-bottom: 4pt; }
h2 { break-after: avoid; page-break-after: avoid; }
h1.newpage { break-before: page; page-break-before: always; margin-top: 0; }
table { break-inside: avoid; page-break-inside: avoid; }
`

const html = `<!doctype html><html><head><meta charset="utf-8"/><style>${css}</style></head><body>
${out.join('\n')}
</body></html>`

const tmp = resolve('.speech-tmp.html')
writeFileSync(tmp, html)
execFileSync('google-chrome-stable', [
  '--headless=new', '--disable-gpu', '--no-sandbox',
  '--no-pdf-header-footer',
  `--print-to-pdf=${resolve(outPath)}`,
  'file://' + tmp,
], { stdio: 'pipe' })
unlinkSync(tmp)
console.log('wrote', outPath)
