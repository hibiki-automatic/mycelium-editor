/**
 * Awareness wiring test.
 *
 * Verifies that when an Awareness instance is passed to createEditorView
 * via options.awareness, yCollab is called with that instance (not null)
 * so y-codemirror.next's yRemoteSelections plugin is registered.
 */
import { describe, it, expect, vi, afterEach } from 'vitest'
import * as Y from 'yjs'
import * as awarenessProtocol from 'y-protocols/awareness'

// Capture yCollab calls
const capturedAwarenessArgs: Array<unknown> = []

// Mock y-codemirror.next before importing editor.ts (which does a dynamic import of it)
vi.mock('y-codemirror.next', () => ({
  yCollab: (_yText: unknown, awareness: unknown) => {
    capturedAwarenessArgs.push(awareness)
    // Return a minimal no-op extension array so EditorView doesn't error
    return []
  },
}))

// Import createEditorView AFTER mocking
import { createEditorView } from '../editor.js'

afterEach(() => {
  capturedAwarenessArgs.length = 0
  vi.clearAllMocks()
})

describe('awareness wiring', () => {
  function mountEditor(awareness?: awarenessProtocol.Awareness) {
    const ydoc = new Y.Doc()
    const yText = ydoc.getText('content')
    const target = document.createElement('div')
    document.body.appendChild(target)
    const { view, cleanup } = createEditorView(target, { yText, awareness }, () => {})
    return { view, cleanup, target }
  }

  it('passes null awareness when no awareness provided', async () => {
    const { cleanup, target } = mountEditor(undefined)
    // yCollab is called asynchronously; yield the microtask queue
    await new Promise(r => setTimeout(r, 50))
    expect(capturedAwarenessArgs[0]).toBeNull()
    cleanup()
    target.remove()
  })

  it('passes the provided Awareness instance to yCollab', async () => {
    const ydoc = new Y.Doc()
    const awareness = new awarenessProtocol.Awareness(ydoc)
    const { cleanup, target } = mountEditor(awareness)
    await new Promise(r => setTimeout(r, 50))
    expect(capturedAwarenessArgs[0]).toBe(awareness)
    cleanup()
    target.remove()
    awareness.destroy()
  })
})
