/**
 * Build the standalone shared yjs bundle: dist/yjs.es.js
 *
 * Bundles yjs (+ lib0 deps) into a single self-contained ESM file.
 * Both mycelium-editor.es.js and crdt.es.js declare 'yjs' as external
 * and resolve it at runtime via an importmap pointing to this file.
 * Because browsers deduplicate by URL, every import shares one cached
 * instance — making Y.Doc / Y.Text instanceof checks work across bundles.
 *
 * Uses rollup directly (vite lib mode auto-externalizes node_modules).
 * The custom resolver walks package.json conditional exports, preferring
 * the browser ESM path.
 */
import { rollup } from 'rollup';
import { resolve as pathResolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Conditions to check in order (browser ESM preferred)
const CONDITIONS = ['browser', 'module', 'import', 'default'];

/** Walk a conditional exports value, returning the first matching string. */
function resolveConditional(value) {
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && value !== null) {
    for (const cond of CONDITIONS) {
      if (cond in value) {
        const resolved = resolveConditional(value[cond]);
        if (resolved) return resolved;
      }
    }
  }
  return null;
}

function resolvePackageExport(id) {
  const parts = id.split('/');
  const scope = id.startsWith('@') ? `${parts[0]}/${parts[1]}` : parts[0];
  const subpath = id.startsWith('@')
    ? (parts.length > 2 ? './' + parts.slice(2).join('/') : '.')
    : (parts.length > 1 ? './' + parts.slice(1).join('/') : '.');

  const pkgDir = pathResolve(__dirname, 'node_modules', scope);
  const pkgJsonPath = join(pkgDir, 'package.json');
  if (!existsSync(pkgJsonPath)) return null;

  const pkg = JSON.parse(readFileSync(pkgJsonPath, 'utf-8'));
  const exports = pkg.exports;
  if (!exports) {
    // Fall back to main/module field
    const main = pkg.module || pkg.main;
    return main ? pathResolve(pkgDir, main) : null;
  }

  const exp = exports[subpath];
  if (!exp) return null;

  const rel = resolveConditional(exp);
  if (!rel) return null;
  return pathResolve(pkgDir, rel);
}

function esmNodeResolve() {
  return {
    name: 'esm-node-resolve',
    resolveId(id, importer) {
      if (id.startsWith('\0') || id.startsWith('/') || id.startsWith('.')) return null;
      // Skip truly-external browser APIs
      if (id === 'crypto' || id === 'buffer') return false;

      const resolved = resolvePackageExport(id);
      if (resolved && existsSync(resolved)) return resolved;
      return null;
    },
    load(id) {
      // Allow rollup to load .mjs files (not in default resolve chain)
      if ((id.endsWith('.mjs') || id.endsWith('.js')) && existsSync(id)) {
        return readFileSync(id, 'utf-8');
      }
      return null;
    },
  };
}

function tsStrip() {
  return {
    name: 'ts-strip',
    transform(code, id) {
      if (!id.endsWith('.ts')) return null;
      return { code, map: null };
    },
  };
}

const bundle = await rollup({
  input: pathResolve(__dirname, 'src/yjs-shim.ts'),
  plugins: [esmNodeResolve(), tsStrip()],
  external: [],
  onwarn(warning, warn) {
    // Suppress circular dependency warnings from yjs/lib0
    if (warning.code === 'CIRCULAR_DEPENDENCY') return;
    warn(warning);
  },
});

await bundle.write({
  file: pathResolve(__dirname, 'dist/yjs.es.js'),
  format: 'es',
  sourcemap: true,
});
await bundle.close();

console.log('yjs shared bundle built: dist/yjs.es.js');
