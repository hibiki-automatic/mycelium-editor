import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { enableMathCopyAsTex } from '../preview-runtime.js'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Build a .katex span (with embedded MathML annotation) the way KaTeX does.
 * If `display` is true the .katex span gets data-display="true" AND is wrapped
 * in a .katex-display span (matching real KaTeX output).
 *
 * Returns the outermost wrapper (either the .katex-display span or the .katex
 * span itself for inline).
 */
function makeKatexEl(tex: string, display = false): HTMLElement {
  const katex = document.createElement('span')
  katex.className = 'katex'
  if (display) katex.setAttribute('data-display', 'true')

  const math = document.createElementNS('http://www.w3.org/1998/Math/MathML', 'math')
  const annotation = document.createElementNS(
    'http://www.w3.org/1998/Math/MathML',
    'annotation',
  )
  annotation.setAttribute('encoding', 'application/x-tex')
  annotation.textContent = tex
  math.appendChild(annotation)
  katex.appendChild(math)

  if (display) {
    const wrapper = document.createElement('span')
    wrapper.className = 'katex-display'
    wrapper.appendChild(katex)
    return wrapper
  }

  return katex
}

/** Fire a synthetic copy event and return what was set on the clipboard. */
function fireCopy(
  root: HTMLElement,
  range: Range,
): { plain: string | undefined; prevented: boolean } {
  const clipboardData: Record<string, string> = {}
  const fakeEvent = new Event('copy') as ClipboardEvent
  Object.defineProperty(fakeEvent, 'clipboardData', {
    value: {
      setData: (type: string, data: string) => { clipboardData[type] = data },
      getData: (type: string) => clipboardData[type] ?? '',
    },
  })

  const prevented = { value: false }
  fakeEvent.preventDefault = () => { prevented.value = true }

  vi.spyOn(window, 'getSelection').mockReturnValue({
    isCollapsed: false,
    getRangeAt: () => range,
    rangeCount: 1,
  } as unknown as Selection)

  root.dispatchEvent(fakeEvent)

  return { plain: clipboardData['text/plain'], prevented: prevented.value }
}

// ---------------------------------------------------------------------------
// Suite
// ---------------------------------------------------------------------------

describe('enableMathCopyAsTex', () => {
  let root: HTMLElement
  let cleanup: () => void

  beforeEach(() => {
    root = document.createElement('div')
    document.body.appendChild(root)
    cleanup = enableMathCopyAsTex(root)
  })

  afterEach(() => {
    cleanup()
    root.remove()
    vi.restoreAllMocks()
  })

  // -------------------------------------------------------------------------
  // Basic API
  // -------------------------------------------------------------------------

  it('returns a cleanup function', () => {
    expect(typeof cleanup).toBe('function')
  })

  // -------------------------------------------------------------------------
  // Formula-only selection (existing behaviour must be preserved)
  // -------------------------------------------------------------------------

  it('extracts inline TeX from a katex element in selection', () => {
    const katexEl = makeKatexEl('x^2 + y^2 = z^2', false)
    root.appendChild(katexEl)

    const range = document.createRange()
    range.selectNode(katexEl)

    const { plain, prevented } = fireCopy(root, range)
    expect(prevented).toBe(true)
    expect(plain).toBe('$x^2 + y^2 = z^2$')
  })

  it('wraps display math with $$…$$', () => {
    const displayWrapper = makeKatexEl('\\int_0^1 f(x)\\,dx', true)
    root.appendChild(displayWrapper)

    const range = document.createRange()
    range.selectNode(displayWrapper)

    const { plain } = fireCopy(root, range)
    expect(plain).toBe('$$\\int_0^1 f(x)\\,dx$$')
  })

  // -------------------------------------------------------------------------
  // Prose-only selection — must NOT override clipboard
  // -------------------------------------------------------------------------

  it('does nothing when selection has no katex elements (prose-only)', () => {
    const para = document.createElement('p')
    para.textContent = 'plain text'
    root.appendChild(para)

    const range = document.createRange()
    range.selectNode(para)

    const { plain, prevented } = fireCopy(root, range)
    expect(prevented).toBe(false)
    expect(plain).toBeUndefined()
  })

  // -------------------------------------------------------------------------
  // Mixed prose + inline math (the bug that was fixed)
  // -------------------------------------------------------------------------

  it('preserves prose before inline math (the reported bug)', () => {
    // Construct: "Mass Energy Equivalence: " followed by an inline katex
    const prose = document.createTextNode('Mass Energy Equivalence: ')
    const katexEl = makeKatexEl('e=mc^2', false)
    root.appendChild(prose)
    root.appendChild(katexEl)

    const range = document.createRange()
    // Select from start of prose text node to end of katexEl
    range.setStartBefore(prose)
    range.setEndAfter(katexEl)

    const { plain, prevented } = fireCopy(root, range)
    expect(prevented).toBe(true)
    expect(plain).toBe('Mass Energy Equivalence: $e=mc^2$')
  })

  it('preserves prose after inline math', () => {
    const katexEl = makeKatexEl('e=mc^2', false)
    const prose = document.createTextNode(' is famous.')
    root.appendChild(katexEl)
    root.appendChild(prose)

    const range = document.createRange()
    range.setStartBefore(katexEl)
    range.setEndAfter(prose)

    const { plain } = fireCopy(root, range)
    expect(plain).toBe('$e=mc^2$ is famous.')
  })

  it('preserves prose surrounding inline math', () => {
    const before = document.createTextNode('See ')
    const katexEl = makeKatexEl('\\alpha', false)
    const after = document.createTextNode(' for details.')
    root.appendChild(before)
    root.appendChild(katexEl)
    root.appendChild(after)

    const range = document.createRange()
    range.setStartBefore(before)
    range.setEndAfter(after)

    const { plain } = fireCopy(root, range)
    expect(plain).toBe('See $\\alpha$ for details.')
  })

  // -------------------------------------------------------------------------
  // Multiple formulas in one selection
  // -------------------------------------------------------------------------

  it('handles multiple inline formulas in selection', () => {
    const k1 = makeKatexEl('a+b', false)
    const sep = document.createTextNode(' and ')
    const k2 = makeKatexEl('c+d', false)
    root.appendChild(k1)
    root.appendChild(sep)
    root.appendChild(k2)

    const range = document.createRange()
    range.setStartBefore(k1)
    range.setEndAfter(k2)

    const { plain } = fireCopy(root, range)
    expect(plain).toBe('$a+b$ and $c+d$')
  })

  it('handles mixed inline and display formulas', () => {
    const prose1 = document.createTextNode('Inline: ')
    const inline = makeKatexEl('x^2', false)
    const prose2 = document.createTextNode(', display: ')
    const display = makeKatexEl('E=mc^2', true)
    root.appendChild(prose1)
    root.appendChild(inline)
    root.appendChild(prose2)
    root.appendChild(display)

    const range = document.createRange()
    range.setStartBefore(prose1)
    range.setEndAfter(display)

    const { plain } = fireCopy(root, range)
    expect(plain).toBe('Inline: $x^2$, display: $$E=mc^2$$')
  })

  // -------------------------------------------------------------------------
  // Partial-selection (selection entirely inside a formula)
  // -------------------------------------------------------------------------

  it('uses full TeX when selection is entirely inside a katex element', () => {
    // Simulate: the user drag-selected only part of the rendered glyph nodes
    // inside a .katex span. The range startContainer is a deep text node
    // inside .katex.
    const katexEl = makeKatexEl('\\sqrt{x}', false)
    root.appendChild(katexEl)

    // Point the range at a deep child text node inside the katex span
    // (simulating a partial drag through glyph elements)
    const innerText = document.createTextNode('√') // fake rendered text inside katex
    katexEl.appendChild(innerText)

    const range = document.createRange()
    range.setStart(innerText, 0)
    range.setEnd(innerText, 1)

    const { plain, prevented } = fireCopy(root, range)
    expect(prevented).toBe(true)
    expect(plain).toBe('$\\sqrt{x}$')
  })
})
