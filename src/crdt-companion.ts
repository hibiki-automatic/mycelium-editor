/**
 * CRDT companion for md-preview's offline editor.
 *
 * Exports exactly what the CollabProvider needs from a single bundled module,
 * ensuring the yjs module identity is shared with y-codemirror.next (which also
 * imports yjs from the same node_modules tree via mycelium-editor's bundle).
 *
 * NOTE: y-codemirror.next is bundled inside mycelium-editor.es.js (index-CUCuSPF_.js).
 * For module identity to work the Y.Doc / Y.Text we pass to createMyceliumEditor
 * MUST come from THIS bundle (same resolved module path), not from a separate yjs load.
 * Both this file and the mycelium-editor vite build resolve yjs from the same
 * node_modules/yjs, so in a bundled context they share the same code. When served
 * from /editor-bundle/crdt.es.js and /editor-bundle/mycelium-editor.es.js (same origin),
 * the browser caches the yjs code from the first import and reuses it for both.
 *
 * Actually: vite bundles ALL deps inline (external: []), so both bundles will have
 * their own copy of yjs code. This means Y.Doc from crdt.es.js and Y.Doc in
 * mycelium-editor's bundle are DIFFERENT classes. The y-codemirror.next binding
 * INSIDE the mycelium-editor bundle does instanceof checks against its bundled yjs.
 * Passing a Y.Text from crdt.es.js's yjs would FAIL those checks.
 *
 * RESOLUTION: mycelium-editor's index-CUCuSPF_.js exports enough symbols for us.
 * We need to get Y.Doc from the SAME bundle. Since it doesn't export Y.Doc directly,
 * the only clean solution is: DON'T pass yText to createMyceliumEditor.
 * Instead, createMyceliumEditor creates its own internal Y.Doc, and we provide
 * CRDT via the onChange/setValue API (document-level sync, not fine-grained CRDT).
 * The CollabProvider manages the ydoc, syncs with server, and calls editor.setValue()
 * on remote changes + listens to onChange for local changes.
 *
 * This is "last-write-wins document sync" — not the fine-grained Y.Text binding.
 * For the Y.Text binding to work properly, we'd need mycelium-editor to export
 * Y.Doc or for a future vite build to externalize yjs (shared across bundles).
 * That is logged in MORNING-NOTES as the remaining work for CRDT Y.Text binding.
 *
 * THIS file therefore only exports the CollabProvider class with Y.Doc/Y.Text
 * bundled from this package's own yjs copy (for the sync wire protocol with the
 * server). The Y.Text "content" is linked to onChange/setValue, not yCollab.
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
