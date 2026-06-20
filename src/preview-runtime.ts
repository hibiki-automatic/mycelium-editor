/**
 * enableMathCopyAsTex — shared math-copy handler for mycelium preview surfaces.
 *
 * When the user copies a selection that contains rendered KaTeX math, the
 * clipboard receives the original LaTeX source (from KaTeX's embedded MathML
 * annotation) instead of KaTeX's fallback plaintext approximation.
 *
 * Usage: call once per preview root element. Call the returned cleanup fn on
 * unmount to remove the event listener.
 */
export function enableMathCopyAsTex(rootEl: HTMLElement): () => void {
  const handler = (e: Event) => {
    const clipboardEvent = e as ClipboardEvent
    const selection = window.getSelection()
    if (!selection || selection.isCollapsed) return
    if (!clipboardEvent.clipboardData) return

    const range = selection.getRangeAt(0)
    const fragment = range.cloneContents()

    // Find all .katex elements in the selection
    const katexEls = Array.from(fragment.querySelectorAll('.katex'))
    if (katexEls.length === 0) {
      // Check if selection is inside a .katex element
      const anchor = range.startContainer
      const anchorKatex = closestKatex(anchor, rootEl)
      if (!anchorKatex) return
      katexEls.push(anchorKatex)
    }

    const parts: string[] = []
    for (const el of katexEls) {
      const tex = extractTex(el as Element)
      if (tex !== null) parts.push(tex)
    }

    if (parts.length === 0) return

    clipboardEvent.preventDefault()
    const text = parts.join(' ')
    clipboardEvent.clipboardData.setData('text/plain', text)
  }

  rootEl.addEventListener('copy', handler)
  return () => rootEl.removeEventListener('copy', handler)
}

function closestKatex(node: Node, root: HTMLElement): Element | null {
  let current: Node | null = node
  while (current && current !== root) {
    if (current.nodeType === Node.ELEMENT_NODE) {
      const el = current as Element
      if (el.classList.contains('katex')) return el
    }
    current = current.parentNode
  }
  return null
}

function extractTex(katexEl: Element): string | null {
  // KaTeX embeds TeX in MathML: <annotation encoding="application/x-tex">…</annotation>
  const annotation = katexEl.querySelector('annotation[encoding="application/x-tex"]')
  if (!annotation || !annotation.textContent) return null

  const tex = annotation.textContent.trim()

  // Determine if display math: look for .katex-display parent or data attribute
  const isDisplay =
    katexEl.closest('.katex-display') !== null ||
    katexEl.getAttribute('data-display') === 'true'

  return isDisplay ? `$$${tex}$$` : `$${tex}$`
}
