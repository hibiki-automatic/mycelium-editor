# mycelium-editor

Reusable **EasyMDE-style** markdown editor built on **CodeMirror 6** — framework-agnostic, offline-first, CRDT-ready.

Part of the [mycelium ecosystem](https://github.com/hibiki-automatic).

## Design

**EasyMDE-on-CM6:** Markdown source markers remain *visible* (`#`, `**bold**`, `` `code` ``, `[text](url)`, backticks) — this is intentional, not a bug. The editor applies visual styling *in place* via CM6 decorations (headings rendered larger/bold, bold shown bold, etc.) **without adding or removing a single character**. No auto-formatting, no auto-pairing that mutates text.

**Y.Text CRDT rationale:** The preferred input mode binds to a `Y.Text` via `y-codemirror.next`. This keeps the editor interoperable with other Yjs-aware tools (plain-text sources, nvim plugins, external editors) and enables efficient incremental updates without full-value diffs.

Math (`$…$`, `$$…$$`) and mermaid fences are intentionally **not rendered** in the editor — they remain plain source text. Rendering is the preview's job.

## Install

```bash
npm install @hibiki-automatic/mycelium-editor
```

## API

### `createMyceliumEditor(target, options)`

```typescript
import { createMyceliumEditor } from '@hibiki-automatic/mycelium-editor'

const editor = createMyceliumEditor(document.getElementById('editor'), {
  value: '# Hello',        // initial value (textarea mode)
  // yText: yDoc.getText('content'),  // CRDT mode (preferred)
  readOnly: false,
  theme: 'light',          // 'light' | 'dark'
  onChange: (value) => console.log(value),
})

editor.getValue()          // → string
editor.setValue('# New')
editor.setReadOnly(true)
editor.destroy()

// Scroll sync
editor.getScrollInfo()     // → { top, height, clientHeight }
editor.scrollToLine(10)
const unsub = editor.onScroll(info => { ... })  // returns unsubscribe fn
```

### `syncEditorPreviewScroll(editor, previewEl, lineToOffset)`

```typescript
import { syncEditorPreviewScroll } from '@hibiki-automatic/mycelium-editor'

const cleanup = syncEditorPreviewScroll(
  editor,
  document.getElementById('preview'),
  (line) => -1,   // provide line→pixel offset for accurate sync, or -1 for ratio-based
)
// call cleanup() to disconnect
```

### Theme

```typescript
import { myceliumTheme, myceliumDarkTheme, myceliumCss, myceliumDarkCss } from '@hibiki-automatic/mycelium-editor'

// Apply preview CSS to rendered HTML:
const style = document.createElement('style')
style.textContent = myceliumCss  // same color tokens as the editor
document.head.appendChild(style)

// In your preview container:
previewEl.className = 'mycelium-preview'
```

`myceliumTheme` / `myceliumDarkTheme` are CM6 `Extension` values — pass them directly to an EditorState/EditorView if you need to compose your own CM6 setup.

### Math copy (`preview-runtime`)

```typescript
import { enableMathCopyAsTex } from '@hibiki-automatic/mycelium-editor'
// or tree-shakeable:
import { enableMathCopyAsTex } from '@hibiki-automatic/mycelium-editor/preview-runtime'

const cleanup = enableMathCopyAsTex(previewEl)
// cleanup() on unmount
```

When the user copies a selection containing rendered KaTeX math, the clipboard receives the original LaTeX source (`$…$` / `$$…$$`) instead of KaTeX's fallback plaintext. Works with KaTeX's embedded MathML `<annotation encoding="application/x-tex">`.

## Build

```bash
npm install
npm run typecheck   # tsc --noEmit
npm run build       # dist/
npm test            # vitest
```

## Demo

```bash
npm run build
npx serve .
# open http://localhost:3000/demo/
```

Or: `python3 -m http.server` and navigate to `/demo/index.html`.

## Dist outputs

| File | Format | Description |
|------|--------|-------------|
| `dist/mycelium-editor.es.js` | ESM | Tree-shakeable ES module |
| `dist/mycelium-editor.cjs.js` | CJS | CommonJS for Node consumers |
| `dist/preview-runtime.es.js` | ESM | Math-copy module (standalone) |
| `dist/mycelium-editor.css` | CSS | Editor chrome CSS |

All dependencies are bundled. No CDN required at runtime.
