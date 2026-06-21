/**
 * enableMathCopyAsTex — shared math-copy handler for mycelium preview surfaces.
 *
 * When the user copies a selection that contains rendered KaTeX math, the
 * clipboard receives the original LaTeX source (from KaTeX's embedded MathML
 * annotation) instead of KaTeX's fallback plaintext approximation. Surrounding
 * prose text is preserved in the reconstructed clipboard string.
 *
 * Partial-formula rule: if only part of a .katex element falls within the
 * selection boundary, the full TeX source for that formula is used. This is the
 * only sane choice because TeX source is indivisible — slicing it mid-token
 * yields invalid LaTeX. The partial inclusion is silently promoted to the full
 * formula.
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

    // Check whether the selection contains any .katex elements.
    // We also handle the edge case where the selection range is entirely
    // *inside* a single .katex element (fragment has no .katex child but the
    // range start container is inside one).
    const hasKatexInFragment = fragment.querySelector('.katex') !== null
    const anchorInsideKatex =
      !hasKatexInFragment && closestKatex(range.startContainer, rootEl) !== null

    if (!hasKatexInFragment && !anchorInsideKatex) {
      // Pure prose — leave default browser copy behavior untouched.
      return
    }

    if (anchorInsideKatex) {
      // Selection is entirely within one formula — extract just that TeX.
      const katexEl = closestKatex(range.startContainer, rootEl)!
      const tex = extractTex(katexEl)
      if (tex === null) return
      clipboardEvent.preventDefault()
      clipboardEvent.clipboardData.setData('text/plain', tex)
      return
    }

    // Mixed or multi-formula selection: walk the fragment tree in order,
    // collecting text from text nodes and TeX from .katex elements.
    const result = collectText(fragment)
    if (result === null) return // no valid TeX found — shouldn't happen but guard

    clipboardEvent.preventDefault()
    clipboardEvent.clipboardData.setData('text/plain', result)
  }

  rootEl.addEventListener('copy', handler)
  return () => rootEl.removeEventListener('copy', handler)
}

/**
 * Walk a DocumentFragment (or any Node) depth-first, in source order.
 * - Text nodes → emit their text content.
 * - .katex elements → emit their TeX source; do NOT recurse into them
 *   (they contain MathML / aria noise we don't want).
 * - Other element nodes → recurse into children.
 *
 * Returns the joined string, or null if we encountered .katex elements but
 * none had extractable TeX (annotation missing).
 */
function collectText(node: Node): string | null {
  let out = ''
  let hasKatex = false
  let allKatexExtracted = true

  function walk(n: Node): void {
    if (n.nodeType === Node.TEXT_NODE) {
      out += n.textContent ?? ''
      return
    }

    if (n.nodeType === Node.ELEMENT_NODE) {
      const el = n as Element
      if (el.classList.contains('katex')) {
        hasKatex = true
        const tex = extractTex(el)
        if (tex !== null) {
          out += tex
        } else {
          allKatexExtracted = false
        }
        // Do not recurse — skip MathML internals and katex-html rendering.
        return
      }
    }

    // Recurse into children for ELEMENT_NODE (1), DOCUMENT_FRAGMENT_NODE (11),
    // and any other container nodes. Skip leaf-only nodes like TEXT (already
    // handled above), COMMENT (8), PROCESSING_INSTRUCTION (7), etc.
    if (
      n.nodeType === Node.ELEMENT_NODE ||
      n.nodeType === Node.DOCUMENT_FRAGMENT_NODE
    ) {
      for (const child of Array.from(n.childNodes)) {
        walk(child)
      }
    }
  }

  walk(node)

  if (hasKatex && !allKatexExtracted) return null
  return out
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
