import { EditorView } from '@codemirror/view'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags as t } from '@lezer/highlight'
import type { Extension } from '@codemirror/state'

// Color tokens shared between editor and preview
const tokens = {
  bg: '#ffffff',
  fg: '#1a1a2e',
  heading: '#1a1a2e',
  link: '#0066cc',
  code: '#d63031',
  codeBg: '#f4f4f8',
  codeBorder: '#e0e0e8',
  em: '#555577',
  strong: '#1a1a2e',
  quote: '#666688',
  quoteBg: '#f8f8fc',
  quoteBorder: '#c0c0d8',
  keyword: '#8b008b',
  string: '#228b22',
  number: '#b8860b',
  comment: '#808080',
  type: '#00688b',
  operator: '#555555',
  meta: '#999999',
  cursor: '#333333',
  selection: '#c8d8f8',
  lineHighlight: '#f7f7fa',
  gutter: '#aaaaaa',
  gutterBg: '#f4f4f8',
  border: '#e0e0e8',
}

const darkTokens = {
  bg: '#1e1e2e',
  fg: '#cdd6f4',
  heading: '#cba6f7',
  link: '#89b4fa',
  code: '#f38ba8',
  codeBg: '#181825',
  codeBorder: '#313244',
  em: '#a6adc8',
  strong: '#cdd6f4',
  quote: '#a6adc8',
  quoteBg: '#181825',
  quoteBorder: '#45475a',
  keyword: '#cba6f7',
  string: '#a6e3a1',
  number: '#fab387',
  comment: '#6c7086',
  type: '#89dceb',
  operator: '#89dceb',
  meta: '#6c7086',
  cursor: '#f5c2e7',
  selection: '#45475a',
  lineHighlight: '#252535',
  gutter: '#6c7086',
  gutterBg: '#181825',
  border: '#313244',
}

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

function makePreviewCss(tk: typeof tokens): string {
  return `
/* mycelium preview theme */
.mycelium-preview {
  font-family: 'Georgia', 'Times New Roman', serif;
  font-size: 16px;
  color: ${tk.fg};
  background: ${tk.bg};
  line-height: 1.7;
  padding: 16px;
}
.mycelium-preview h1 { font-size: 1.6em; font-weight: bold; color: ${tk.heading}; margin: 0.8em 0 0.4em; }
.mycelium-preview h2 { font-size: 1.4em; font-weight: bold; color: ${tk.heading}; margin: 0.8em 0 0.4em; }
.mycelium-preview h3 { font-size: 1.2em; font-weight: bold; color: ${tk.heading}; margin: 0.8em 0 0.4em; }
.mycelium-preview h4 { font-size: 1.1em; font-weight: bold; color: ${tk.heading}; margin: 0.8em 0 0.4em; }
.mycelium-preview h5, .mycelium-preview h6 { font-weight: bold; color: ${tk.heading}; margin: 0.8em 0 0.4em; }
.mycelium-preview strong { font-weight: bold; color: ${tk.strong}; }
.mycelium-preview em { font-style: italic; color: ${tk.em}; }
.mycelium-preview a { color: ${tk.link}; text-decoration: underline; }
.mycelium-preview code {
  font-family: 'Fira Code', 'Cascadia Code', monospace;
  color: ${tk.code};
  background: ${tk.codeBg};
  padding: 0.15em 0.3em;
  border-radius: 3px;
  font-size: 0.9em;
}
.mycelium-preview pre {
  background: ${tk.codeBg};
  border: 1px solid ${tk.codeBorder};
  border-radius: 6px;
  padding: 12px 16px;
  overflow-x: auto;
}
.mycelium-preview pre code {
  background: none;
  padding: 0;
  color: ${tk.fg};
}
.mycelium-preview blockquote {
  color: ${tk.quote};
  background: ${tk.quoteBg};
  border-left: 4px solid ${tk.quoteBorder};
  padding: 8px 16px;
  margin: 0.8em 0;
  font-style: italic;
}
.mycelium-preview ul, .mycelium-preview ol { padding-left: 2em; margin: 0.5em 0; }
.mycelium-preview li { margin: 0.2em 0; }
.mycelium-preview hr { border: none; border-top: 1px solid ${tk.border}; margin: 1.5em 0; }
.mycelium-preview p { margin: 0.7em 0; }
.mycelium-preview table { border-collapse: collapse; width: 100%; }
.mycelium-preview th, .mycelium-preview td { border: 1px solid ${tk.border}; padding: 6px 12px; }
.mycelium-preview th { background: ${tk.codeBg}; font-weight: bold; }
/* syntax highlight colors matching editor */
.mycelium-preview .hljs-keyword { color: ${tk.keyword}; }
.mycelium-preview .hljs-string { color: ${tk.string}; }
.mycelium-preview .hljs-number { color: ${tk.number}; }
.mycelium-preview .hljs-comment { color: ${tk.comment}; font-style: italic; }
.mycelium-preview .hljs-type { color: ${tk.type}; }
`.trim()
}

function makeDarkPreviewCss(tk: typeof darkTokens): string {
  return makePreviewCss(tk as typeof tokens).replace('.mycelium-preview', '.mycelium-preview.dark')
}

export const myceliumCss: string = makePreviewCss(tokens)
export const myceliumDarkCss: string = makeDarkPreviewCss(darkTokens)
