/**
 * True char-level CRDT convergence test.
 *
 * Proves that when two Y.Doc peers make CONCURRENT edits (no live sync during
 * the edit), then exchange updates, BOTH edits survive — no last-write-wins
 * clobber.  This requires a single shared yjs instance (same module identity)
 * so that Y.Text passed to yCollab is recognised by y-codemirror.next.
 *
 * The test runs in jsdom (vitest environment) — CodeMirror works without a
 * real browser because it falls back gracefully when layout APIs return zero.
 */
import { describe, it, expect, afterEach } from 'vitest'
import * as Y from 'yjs'
import { yCollab } from 'y-codemirror.next'
import { EditorView } from '@codemirror/view'
import { EditorState } from '@codemirror/state'

// Collect DOM nodes to clean up between tests
const cleanup: (() => void)[] = []

afterEach(() => {
  while (cleanup.length) cleanup.pop()!()
})

function makeEditor(ytext: Y.Text): EditorView {
  const target = document.createElement('div')
  document.body.appendChild(target)
  cleanup.push(() => { view.destroy(); target.remove() })

  const view = new EditorView({
    state: EditorState.create({
      doc: ytext.toString(),
      extensions: [yCollab(ytext, null, { undoManager: false })],
    }),
    parent: target,
  })
  return view
}

describe('CRDT char-level convergence', () => {
  it('converges concurrent inserts — both chars preserved, no last-write-wins clobber', () => {
    // Two independent Y.Docs (simulating two peers)
    const doc1 = new Y.Doc()
    const doc2 = new Y.Doc()
    const text1 = doc1.getText('content')
    const text2 = doc2.getText('content')

    // Collect offline updates from each peer separately (no cross-apply yet)
    const pendingTo2: Uint8Array[] = []
    const pendingTo1: Uint8Array[] = []

    const handler1 = (update: Uint8Array) => pendingTo2.push(update)
    const handler2 = (update: Uint8Array) => pendingTo1.push(update)
    doc1.on('update', handler1)
    doc2.on('update', handler2)

    // Mount editors bound to their respective Y.Texts
    const view1 = makeEditor(text1)
    const view2 = makeEditor(text2)

    // --- CONCURRENT edits: peer 1 types 'Hello', peer 2 types ' World' ---
    // Both operate offline (updates captured but not applied cross-peer yet)
    doc1.transact(() => { text1.insert(0, 'Hello') })
    doc2.transact(() => { text2.insert(0, ' World') })

    // Verify each peer only sees its own edit so far
    expect(text1.toString()).toBe('Hello')
    expect(text2.toString()).toBe(' World')

    // --- SYNC: exchange captured updates ---
    doc1.off('update', handler1)
    doc2.off('update', handler2)

    for (const u of pendingTo2) Y.applyUpdate(doc2, u)
    for (const u of pendingTo1) Y.applyUpdate(doc1, u)

    // --- CONVERGENCE: both docs must have the same text ---
    const result1 = text1.toString()
    const result2 = text2.toString()

    expect(result1).toBe(result2)  // convergence

    // Both edits must be present — no clobber
    expect(result1).toContain('Hello')
    expect(result1).toContain('World')

    // The CodeMirror views should reflect the converged state
    expect(view1.state.doc.toString()).toBe(result1)
    expect(view2.state.doc.toString()).toBe(result2)
  })

  it('converges interleaved char inserts at the same position', () => {
    const doc1 = new Y.Doc()
    const doc2 = new Y.Doc()
    const text1 = doc1.getText('content')
    const text2 = doc2.getText('content')

    // Pre-seed both docs with the same initial content
    doc1.transact(() => { text1.insert(0, 'AC') })
    // Sync doc1 → doc2 so they start equal
    Y.applyUpdate(doc2, Y.encodeStateAsUpdate(doc1))
    expect(text2.toString()).toBe('AC')

    const pendingTo2: Uint8Array[] = []
    const pendingTo1: Uint8Array[] = []
    doc1.on('update', (u: Uint8Array) => pendingTo2.push(u))
    doc2.on('update', (u: Uint8Array) => pendingTo1.push(u))

    makeEditor(text1)
    makeEditor(text2)

    // Peer 1 inserts 'B' at position 1 (between A and C)
    doc1.transact(() => { text1.insert(1, 'B') })
    // Peer 2 inserts 'X' at position 1 (between A and C) — concurrent
    doc2.transact(() => { text2.insert(1, 'X') })

    // Exchange
    for (const u of pendingTo2) Y.applyUpdate(doc2, u)
    for (const u of pendingTo1) Y.applyUpdate(doc1, u)

    const r1 = text1.toString()
    const r2 = text2.toString()

    expect(r1).toBe(r2)  // convergence
    expect(r1).toContain('A')
    expect(r1).toContain('B')
    expect(r1).toContain('X')
    expect(r1).toContain('C')
    // All four chars present — neither insert was lost
    expect(r1).toHaveLength(4)
  })
})
