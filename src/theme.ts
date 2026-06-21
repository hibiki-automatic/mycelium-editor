import { EditorView } from '@codemirror/view'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags as t } from '@lezer/highlight'
import type { Extension } from '@codemirror/state'
import { tokens, darkTokens } from '@hibiki-automatic/mycelium-theme'

export { myceliumCss, myceliumDarkCss } from '@hibiki-automatic/mycelium-theme'

function makeHighlightStyle(tk: typeof tokens) {
  return HighlightStyle.define([
    { tag: t.heading1, fontWeight: 'bold', fontSize: '1.6em', color: tk.heading },
    { tag: t.heading2, fontWeight: 'bold', fontSize: '1.4em', color: tk.heading },
    { tag: t.heading3, fontWeight: 'bold', fontSize: '1.2em', color: tk.heading },
    { tag: t.heading4, fontWeight: 'bold', fontSize: '1.1em', color: tk.heading },
    { tag: t.heading5, fontWeight: 'bold', color: tk.heading },
    { tag: t.heading6, fontWeight: 'bold', color: tk.heading },
    { tag: t.strong, fontWeight: 'bold', color: tk.strong },
    { tag: t.emphasis, fontStyle: 'italic', color: tk.em },
    { tag: t.strikethrough, textDecoration: 'line-through' },
    { tag: t.link, color: tk.link, textDecoration: 'underline' },
    { tag: t.url, color: tk.link },
    { tag: t.monospace, fontFamily: 'monospace', color: tk.code, backgroundColor: tk.codeBg },
    { tag: t.processingInstruction, color: tk.meta },
    { tag: t.comment, color: tk.comment, fontStyle: 'italic' },
    { tag: t.keyword, color: tk.keyword },
    { tag: t.string, color: tk.string },
    { tag: t.number, color: tk.number },
    { tag: t.typeName, color: tk.type },
    { tag: t.operator, color: tk.operator },
    { tag: t.meta, color: tk.meta },
    { tag: t.content, color: tk.fg },
    { tag: t.quote, color: tk.quote, fontStyle: 'italic' },
    { tag: t.list, color: tk.fg },
  ])
}

function makeEditorTheme(tk: typeof tokens, dark: boolean) {
  return EditorView.theme(
    {
      '&': {
        color: tk.fg,
        backgroundColor: tk.bg,
        fontFamily: "'Georgia', 'Times New Roman', serif",
        fontSize: '16px',
        height: '100%',
      },
      '.cm-content': {
        padding: '12px 16px',
        caretColor: tk.cursor,
        fontFamily: 'inherit',
      },
      '.cm-cursor': { borderLeftColor: tk.cursor },
      '&.cm-focused .cm-selectionBackground, .cm-selectionBackground': {
        backgroundColor: tk.selection,
      },
      '.cm-activeLine': { backgroundColor: tk.lineHighlight },
      '.cm-gutters': {
        backgroundColor: tk.gutterBg,
        color: tk.gutter,
        borderRight: `1px solid ${tk.border}`,
      },
      '.cm-lineNumbers .cm-gutterElement': { padding: '0 8px' },
      '.cm-scroller': { overflow: 'auto', fontFamily: 'inherit' },
      '&.cm-focused': { outline: `2px solid ${tk.link}` },
      '.cm-code-block': {
        backgroundColor: tk.codeBg,
        fontFamily: "'Fira Code', 'Cascadia Code', monospace",
        display: 'block',
        padding: '2px 4px',
        borderRadius: '3px',
      },
      '.cm-fenced-code': {
        backgroundColor: tk.codeBg,
        fontFamily: "'Fira Code', 'Cascadia Code', monospace",
        display: 'block',
      },
    },
    { dark },
  )
}

export const myceliumHighlightStyle = makeHighlightStyle(tokens)
export const myceliumDarkHighlightStyle = makeHighlightStyle(darkTokens)

export const myceliumTheme: Extension = [
  makeEditorTheme(tokens, false),
  syntaxHighlighting(myceliumHighlightStyle),
]

export const myceliumDarkTheme: Extension = [
  makeEditorTheme(darkTokens, true),
  syntaxHighlighting(myceliumDarkHighlightStyle),
]
