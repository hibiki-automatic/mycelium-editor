import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: {
        'mycelium-editor': resolve(__dirname, 'src/index.ts'),
        'preview-runtime': resolve(__dirname, 'src/preview-runtime.ts'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        if (format === 'es') return `${entryName}.es.js`
        if (format === 'cjs') return `${entryName}.cjs.js`
        return `${entryName}.${format}.js`
      },
    },
    rollupOptions: {
      // Externalize yjs so both mycelium-editor.es.js and crdt.es.js resolve
      // to the SAME yjs instance at runtime (via importmap → yjs.es.js).
      // Without this, each bundle inlines its own yjs copy and Y.Text instanceof
      // checks in y-codemirror.next fail across bundle boundaries.
      external: ['yjs'],
    },
    cssCodeSplit: false,
    sourcemap: true,
  },
})
