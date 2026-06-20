/**
 * CRDT companion for offline collaborative editing.
 *
 * Exports exactly what a CollabProvider needs (yjs + y-protocols sync/awareness +
 * lib0 encoding/decoding) from a single module, for speaking the y-websocket wire
 * protocol over a consumer-owned transport (e.g. md-preview's /collab WebSocket).
 *
 * MODULE IDENTITY — the key to true char-level CRDT:
 * Both this bundle (crdt.es.js) and the editor bundle (mycelium-editor.es.js)
 * declare `yjs` as EXTERNAL (a bare `import * as Y from 'yjs'`). The consumer
 * supplies an importmap mapping `'yjs'` → `/editor-bundle/yjs.es.js`, so the
 * browser resolves every yjs import to ONE cached module instance. That makes the
 * Y.Doc / Y.Text / Y.AbstractType instanceof checks inside y-codemirror.next pass,
 * so a Y.Text constructed here (or by the consumer) binds correctly via yCollab.
 *
 * Result: concurrent edits merge character-by-character (true CRDT), NOT
 * last-write-wins document sync. The Y.Text passed to createMyceliumEditor's
 * `yText` option drives yCollab directly.
 *
 * See README → "Consuming with CRDT" for the exact files/importmap/API contract.
 * The convergence guarantee is proven by src/__tests__/crdt-convergence.test.ts.
 */

import * as Y from 'yjs';
import * as syncProtocol from 'y-protocols/sync';
import * as awarenessProtocol from 'y-protocols/awareness';
import * as encoding from 'lib0/encoding';
import * as decoding from 'lib0/decoding';

export { Y, syncProtocol, awarenessProtocol, encoding, decoding };

// Re-export the Doc and Text constructors for convenience.
export const Doc = Y.Doc;
export const Text = Y.Text;
