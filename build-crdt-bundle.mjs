/**
 * Build a standalone offline CRDT companion bundle:
 *   y-protocols/sync + y-protocols/awareness + lib0/encoding + lib0/decoding
 *
 * yjs is externalized (external: ['yjs']) so that the companion and the editor
 * bundle both resolve to the same yjs instance at runtime via an importmap
 * (importmap maps 'yjs' → /editor-bundle/yjs.es.js).  This makes Y.Doc /
 * Y.Text instanceof checks work across bundles and enables true char-level CRDT.
 *
 * IMPORTANT: This is NOT served by the mycelium-editor package itself — it is
 * a build artifact consumed by md-preview's editor_bundle module.
 */
import { build } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

await build({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/crdt-companion.ts'),
      name: 'CrdtCompanion',
      formats: ['es'],
      fileName: () => 'crdt.es.js',
    },
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: false,   // don't wipe existing dist files
    rollupOptions: {
      external: ['yjs'], // yjs resolved via importmap at runtime
    },
    sourcemap: true,
    minify: false,        // keep readable for audit
  },
  logLevel: 'info',
});

console.log('CRDT companion bundle built: dist/crdt.es.js');
