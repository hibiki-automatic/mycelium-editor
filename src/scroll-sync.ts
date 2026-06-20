import type { MyceliumEditor, ScrollInfo } from './types.js'

export function syncEditorPreviewScroll(
  editor: MyceliumEditor,
  previewEl: HTMLElement,
  _lineToOffset: (line: number) => number,
): () => void {
  let suppressPreview = false
  let suppressEditor = false

  const onEditorScroll = (info: ScrollInfo) => {
    if (suppressEditor) return
    suppressPreview = true

    const { top, height, clientHeight } = info
    const scrollable = height - clientHeight
    if (scrollable <= 0) return
    const ratio = top / scrollable

    const previewScrollable = previewEl.scrollHeight - previewEl.clientHeight
    previewEl.scrollTop = ratio * previewScrollable

    setTimeout(() => {
      suppressPreview = false
    }, 50)
  }

  const onPreviewScroll = () => {
    if (suppressPreview) return
    suppressEditor = true

    const previewScrollable = previewEl.scrollHeight - previewEl.clientHeight
    if (previewScrollable <= 0) return
    const ratio = previewEl.scrollTop / previewScrollable

    const info = editor.getScrollInfo()
    const editorScrollable = info.height - info.clientHeight
    editor.scrollToLine(0) // placeholder — actual impl uses EditorView.scrollIntoView

    // Directly set scroll position via ratio
    const domScroller = (editor as unknown as { _scrollerEl?: HTMLElement })._scrollerEl
    if (domScroller) {
      domScroller.scrollTop = ratio * editorScrollable
    }

    setTimeout(() => {
      suppressEditor = false
    }, 50)
  }

  const unsubEditorScroll = editor.onScroll(onEditorScroll)
  previewEl.addEventListener('scroll', onPreviewScroll, { passive: true })

  return () => {
    unsubEditorScroll()
    previewEl.removeEventListener('scroll', onPreviewScroll)
  }
}
