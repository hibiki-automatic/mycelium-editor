# mycelium-editor

[![CI](https://github.com/hibiki-automatic/mycelium-editor/actions/workflows/ci.yml/badge.svg)](https://github.com/hibiki-automatic/mycelium-editor/actions/workflows/ci.yml)

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
| `dist/yjs.es.js` | ESM | Standalone yjs bundle (yjs + lib0, fully self-contained) — the shared module identity anchor |
| `dist/crdt.es.js` | ESM | CRDT companion: y-protocols/sync + y-protocols/awareness + lib0 encoding/decoding; externalizes yjs |

All dependencies are bundled (except `yjs`, which is shared via importmap). No CDN required at runtime.

## Consuming with CRDT

This is the **exact wiring contract** for any consumer that wants true char-level Y.Text collaboration (e.g. md-preview).

### Why it works

`mycelium-editor.es.js` and `crdt.es.js` both externalize `'yjs'` (bare specifier). At runtime the consumer provides an [importmap](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) that maps `'yjs'` to `dist/yjs.es.js`. The browser deduplicates by URL, so every `import * as Y from 'yjs'` across all modules resolves to the **same cached instance**. Y.Doc / Y.Text instanceof checks in `y-codemirror.next` pass correctly, enabling real char-level CRDT instead of last-write-wins.

### Files to serve

Serve these three files from the **same path prefix** (e.g. `/editor-bundle/`):

| File | Serve as |
|------|----------|
| `dist/yjs.es.js` | `/editor-bundle/yjs.es.js` |
| `dist/mycelium-editor.es.js` | `/editor-bundle/mycelium-editor.es.js` |
| `dist/crdt.es.js` | `/editor-bundle/crdt.es.js` |

Also serve the vite-generated chunk files alongside (`dist/index-*.js`).

### Importmap

Place this **before** any `<script type="module">` that imports the editor:

```html
<script type="importmap">
{
  "imports": {
    "yjs": "/editor-bundle/yjs.es.js"
  }
}
</script>
```

### Collab API

```javascript
import { createMyceliumEditor } from '/editor-bundle/mycelium-editor.es.js'
// Y must come from the shared yjs — import via the importmap-resolved specifier
import * as Y from 'yjs'

const ydoc = new Y.Doc()
const ytext = ydoc.getText('content')

const editor = createMyceliumEditor(document.getElementById('editor'), {
  yText: ytext,   // Y.Text CRDT mode — true char-level binding via y-codemirror.next
  theme: 'dark',
})
```

The `yText` option wires `yCollab(ytext, null)` via `y-codemirror.next`. Concurrent edits by different peers are merged character-by-character (CRDT), not last-write-wins.

### Provider wiring (y-websocket-compatible transport)

Use `dist/crdt.es.js` for the sync/awareness wire protocol:

```javascript
import { Y, syncProtocol, awarenessProtocol, encoding, decoding } from '/editor-bundle/crdt.es.js'
// Y here is re-exported from the same shared yjs instance (via importmap)

// Example: wire to a WebSocket speaking the y-websocket protocol
const ws = new WebSocket('/collab')
ws.binaryType = 'arraybuffer'

const awareness = new awarenessProtocol.Awareness(ydoc)

ws.onmessage = (event) => {
  const data = new Uint8Array(event.data)
  const decoder = decoding.createDecoder(data)
  const messageType = decoding.readVarUint(decoder)
  if (messageType === 0) {
    syncProtocol.readSyncMessage(decoder, encoding.createEncoder(), ydoc, null)
  } else if (messageType === 1) {
    awarenessProtocol.applyAwarenessUpdate(awareness, decoding.readVarUint8Array(decoder), null)
  }
}

// Send initial sync step 1
const encoder = encoding.createEncoder()
encoding.writeVarUint(encoder, 0)
syncProtocol.writeSyncStep1(encoder, ydoc)
ws.send(encoding.toUint8Array(encoder))
```

### CRDT companion (`dist/crdt.es.js`)

```bash
npm run build:crdt   # produces dist/crdt.es.js
# or as part of the full build:
npm run build        # vite build + tsc declarations + yjs.es.js + crdt.es.js
```

See `src/crdt-companion.ts` for the exported symbols (`Y`, `syncProtocol`, `awarenessProtocol`, `encoding`, `decoding`, `Doc`, `Text`).

## Part of the [mycelium](https://github.com/hibiki-automatic) ecosystem

| Repo | Description |
|------|-------------|
| [md-render](https://github.com/hibiki-automatic/md-render) | Markdown → HTML renderer (Rust crate) |
| [doc-core](https://github.com/hibiki-automatic/doc-core) | Web-free CRDT / document kernel |
| [fs-confine](https://github.com/hibiki-automatic/fs-confine) | Web-free filesystem confinement kernel |
| [md-preview](https://github.com/hibiki-automatic/md-preview) | Collaborative Markdown preview daemon |
| [mycelium-editor](https://github.com/hibiki-automatic/mycelium-editor) | CodeMirror 6 editor component (this repo) |
| [nvim-md-preview](https://github.com/hibiki-automatic/nvim-md-preview) | Neovim live-preview plugin |
| [md-hub](https://github.com/hibiki-automatic/research-thin-server) | Research document hub (Axum server) |
