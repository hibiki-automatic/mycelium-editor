import { ViewPlugin, ViewUpdate, Decoration, DecorationSet } from '@codemirror/view'
import { RangeSetBuilder } from '@codemirror/state'
import type { EditorView } from '@codemirror/view'

type Mark = { from: number; to: number; deco: Decoration; isLine: boolean }

export const markdownDecorations = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet

    constructor(view: EditorView) {
      this.decorations = buildDecorations(view)
    }

    update(update: ViewUpdate) {
      if (update.docChanged || update.viewportChanged) {
        this.decorations = buildDecorations(update.view)
      }
    }
  },
  { decorations: (v) => v.decorations },
)

function buildDecorations(view: EditorView): DecorationSet {
  const doc = view.state.doc
  const lineMarks: Mark[] = []
  const inlineMarks: Mark[] = []

  for (let i = 1; i <= doc.lines; i++) {
    const line = doc.line(i)
    const { from, text } = line

    // Block-level line decorations
    const headingMatch = /^(#{1,6})\s/.exec(text)
    if (headingMatch) {
      const level = headingMatch[1].length
      lineMarks.push({
        from,
        to: from,
        deco: Decoration.line({ class: `cm-md-heading cm-md-h${level}` }),
        isLine: true,
      })
    } else if (/^>\s?/.test(text)) {
      lineMarks.push({
        from,
        to: from,
        deco: Decoration.line({ class: 'cm-md-blockquote' }),
        isLine: true,
      })
    } else if (/^```/.test(text)) {
      lineMarks.push({
        from,
        to: from,
        deco: Decoration.line({ class: 'cm-md-fence-marker' }),
        isLine: true,
      })
    }

    // Inline decorations — collected per-line then deduplicated
    collectInline(from, text, inlineMarks)
  }

  // Sort inline marks: by from asc, then to desc (outer first to avoid overlap issues)
  inlineMarks.sort((a, b) => a.from - b.from || b.to - a.to)

  // Build: line decorations first (sorted by from), then inline
  lineMarks.sort((a, b) => a.from - b.from)

  const builder = new RangeSetBuilder<Decoration>()

  // Merge line + inline in from-order
  const all: Mark[] = []
  for (const m of lineMarks) all.push(m)
  for (const m of inlineMarks) all.push(m)
  all.sort((a, b) => {
    if (a.from !== b.from) return a.from - b.from
    // line decorations before inline at same position
    if (a.isLine !== b.isLine) return a.isLine ? -1 : 1
    return b.to - a.to
  })

  // Deduplicate by key and skip overlapping inline marks
  const usedRanges: Array<[number, number]> = []
  const seenKeys = new Set<string>()

  for (const { from, to, deco, isLine } of all) {
    const cls = (deco as unknown as { spec: { class?: string } }).spec?.class ?? ''
    const key = `${from}:${to}:${cls}`
    if (seenKeys.has(key)) continue
    seenKeys.add(key)

    if (!isLine) {
      // Skip if overlaps with already-used range of same class family
      const overlaps = usedRanges.some(([uf, ut]) => from < ut && to > uf)
      if (overlaps) continue
      usedRanges.push([from, to])
    }

    builder.add(from, to, deco)
  }

  return builder.finish()
}

function collectInline(lineFrom: number, text: string, marks: Mark[]) {
  // bold **…** or __…__
  const boldRe = /(\*\*|__)(.+?)\1/g
  let m: RegExpExecArray | null
  while ((m = boldRe.exec(text)) !== null) {
    marks.push(mark(lineFrom + m.index, lineFrom + m.index + m[0].length, 'cm-md-strong'))
  }

  // italic *…* or _…_ (single, not double)
  const emRe = /\*(?!\*)([^*]+)\*(?!\*)|(?<![_\w])_(?!_)([^_]+)_(?![_\w])/g
  while ((m = emRe.exec(text)) !== null) {
    marks.push(mark(lineFrom + m.index, lineFrom + m.index + m[0].length, 'cm-md-em'))
  }

  // inline code `…`
  const codeRe = /`([^`\n]+)`/g
  while ((m = codeRe.exec(text)) !== null) {
    marks.push(mark(lineFrom + m.index, lineFrom + m.index + m[0].length, 'cm-md-code'))
  }

  // links [text](url)
  const linkRe = /\[([^\]\n]+)\]\(([^)\n]+)\)/g
  while ((m = linkRe.exec(text)) !== null) {
    marks.push(mark(lineFrom + m.index, lineFrom + m.index + m[0].length, 'cm-md-link'))
  }

  // strikethrough ~~…~~
  const strikeRe = /~~([^~\n]+)~~/g
  while ((m = strikeRe.exec(text)) !== null) {
    marks.push(mark(lineFrom + m.index, lineFrom + m.index + m[0].length, 'cm-md-strike'))
  }
}

function mark(from: number, to: number, cls: string): Mark {
  return { from, to, deco: Decoration.mark({ class: cls }), isLine: false }
}
