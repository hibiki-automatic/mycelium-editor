/**
 * Build a standalone offline CRDT companion bundle:
 *   yjs + y-protocols/sync + y-protocols/awareness + lib0/encoding + lib0/decoding
 *
 * This is bundled as a single ESM file so the md-preview editor page can load
 * it offline from /editor-bundle/crdt.es.js. The bundle is SEPARATE from
 * mycelium-editor.es.js so the two share the same yjs module instance
 * (module identity is per-URL in browsers; serving crdt.es.js and the
 * mycelium-editor chunk from the same origin/path ensures there is only one
 * yjs instance in the page).
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
      external: [],       // bundle everything
    },
    sourcemap: true,
    minify: false,        // keep readable for audit
  },
  logLevel: 'info',
});

console.log('CRDT companion bundle built: dist/crdt.es.js');
