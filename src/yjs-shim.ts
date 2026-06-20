// Entry point for the standalone yjs.es.js bundle.
// Consumers map 'yjs' → dist/yjs.es.js via importmap so that every module
// (mycelium-editor + crdt-companion) resolves to ONE cached instance,
// making Y.Doc / Y.Text identity checks in y-codemirror.next reliable.
export * from 'yjs'
