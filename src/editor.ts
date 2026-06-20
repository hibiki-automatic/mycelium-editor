import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  scrollPastEnd,
} from '@codemirror/view'
import {
  EditorState,
  Compartment,
  StateEffect,
  Transaction,
} from '@codemirror/state'
import { history, defaultKeymap, historyKeymap } from '@codemirror/commands'
import { markdown } from '@codemirror/lang-markdown'
import { indentOnInput } from '@codemirror/language'
import { markdownDecorations } from './decorations.js'
import { myceliumTheme, myceliumDarkTheme } from './theme.js'
import type { MyceliumEditor, MyceliumEditorOptions, ScrollInfo } from './types.js'

const readOnlyCompartment = new Compartment()
const themeCompartment = new Compartment()

export function createEditorView(
  target: HTMLElement,
  options: MyceliumEditorOptions,
  onDocChange: (value: string) => void,
): { view: EditorView; cleanup: () => void } {
  const theme = options.theme === 'dark' ? myceliumDarkTheme : myceliumTheme

  const extensions = [
    lineNumbers(),
    history(),
    highlightActiveLine(),
    indentOnInput(),
    scrollPastEnd(),
    keymap.of([...defaultKeymap, ...historyKeymap]),
    markdown(),
    markdownDecorations,
    themeCompartment.of(theme),
    readOnlyCompartment.of(EditorState.readOnly.of(options.readOnly ?? false)),
    EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        onDocChange(update.state.doc.toString())
      }
    }),
    EditorView.lineWrapping,
  ]

  const doc = options.yText
    ? options.yText.toString()
    : (options.value ?? '')

  const state = EditorState.create({
    doc,
    extensions,
  })

  const view = new EditorView({ state, parent: target })

  // CRDT mode: bind to Y.Text after view is created
  if (options.yText) {
    const yText = options.yText
    void (async () => {
      try {
        const { yCollab } = await import('y-codemirror.next')
        const collab = yCollab(yText, options.awareness ?? null)
        view.dispatch({ effects: StateEffect.appendConfig.of(collab) })
      } catch (e) {
        console.warn('y-codemirror.next not available:', e)
      }
    })()
  }

  return {
    view,
    cleanup: () => {
      view.destroy()
    },
  }
}

export class MyceliumEditorImpl implements MyceliumEditor {
  private view: EditorView
  private cleanup: () => void
  private scrollListeners: Set<(info: ScrollInfo) => void> = new Set()
  private domScrollHandler: EventListener
  _scrollerEl: HTMLElement | undefined

  constructor(
    target: HTMLElement,
    options: MyceliumEditorOptions,
    onChange?: (value: string) => void,
  ) {
    const { view, cleanup } = createEditorView(
      target,
      options,
      (value) => onChange?.(value),
    )
    this.view = view
    this.cleanup = cleanup

    // Wire scroll events
    const scroller = view.scrollDOM
    this._scrollerEl = scroller as HTMLElement
    this.domScrollHandler = () => {
      const info = this.getScrollInfo()
      for (const cb of this.scrollListeners) cb(info)
    }
    scroller.addEventListener('scroll', this.domScrollHandler, { passive: true })
  }

  getValue(): string {
    return this.view.state.doc.toString()
  }

  setValue(value: string): void {
    const { state } = this.view
    this.view.dispatch({
      changes: { from: 0, to: state.doc.length, insert: value },
      annotations: Transaction.userEvent.of('setValue'),
    })
  }

  setReadOnly(readOnly: boolean): void {
    this.view.dispatch({
      effects: readOnlyCompartment.reconfigure(EditorState.readOnly.of(readOnly)),
    })
  }

  destroy(): void {
    this.view.scrollDOM.removeEventListener('scroll', this.domScrollHandler)
    this.scrollListeners.clear()
    this.cleanup()
  }

  getScrollInfo(): ScrollInfo {
    const scroller = this.view.scrollDOM
    return {
      top: scroller.scrollTop,
      height: scroller.scrollHeight,
      clientHeight: scroller.clientHeight,
    }
  }

  scrollToLine(line: number): void {
    const doc = this.view.state.doc
    const clampedLine = Math.max(1, Math.min(line, doc.lines))
    const lineObj = doc.line(clampedLine)
    this.view.dispatch({
      effects: EditorView.scrollIntoView(lineObj.from, { y: 'start' }),
    })
  }

  onScroll(callback: (info: ScrollInfo) => void): () => void {
    this.scrollListeners.add(callback)
    return () => this.scrollListeners.delete(callback)
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.view.dispatch({
      effects: themeCompartment.reconfigure(
        theme === 'dark' ? myceliumDarkTheme : myceliumTheme,
      ),
    })
  }
}

