import { describe, it, expect, vi, beforeEach } from 'vitest'
import { enableMathCopyAsTex } from '../preview-runtime.js'

function makeKatexEl(tex: string, display = false): HTMLElement {
  const outer = document.createElement('span')
  outer.className = display ? 'katex-display' : ''

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
  outer.appendChild(katex)
  return outer
}

describe('enableMathCopyAsTex', () => {
  let root: HTMLElement
  let cleanup: () => void

  beforeEach(() => {
    root = document.createElement('div')
    document.body.appendChild(root)
    cleanup = enableMathCopyAsTex(root)
  })

  it('returns a cleanup function', () => {
    expect(typeof cleanup).toBe('function')
    cleanup()
  })

  it('extracts inline TeX from a katex element in selection', () => {
    const katexEl = makeKatexEl('x^2 + y^2 = z^2', false)
    root.appendChild(katexEl)

    const clipboardData: Record<string, string> = {}
    const fakeEvent = new Event('copy') as ClipboardEvent
    Object.defineProperty(fakeEvent, 'clipboardData', {
      value: {
        setData: (type: string, data: string) => { clipboardData[type] = data },
        getData: (type: string) => clipboardData[type] ?? '',
      },
    })

    // Mock selection to contain the katex element
    const range = document.createRange()
    range.selectNode(katexEl)
    const mockSelection = {
      isCollapsed: false,
      getRangeAt: () => range,
      rangeCount: 1,
    }
    vi.spyOn(window, 'getSelection').mockReturnValue(mockSelection as unknown as Selection)

    fakeEvent.preventDefault = vi.fn()
    root.dispatchEvent(fakeEvent)

    expect(clipboardData['text/plain']).toBe('$x^2 + y^2 = z^2$')
    cleanup()
  })

  it('wraps display math with $$…$$', () => {
    const katexEl = makeKatexEl('\\int_0^1 f(x)\\,dx', true)
    const display = document.createElement('span')
    display.className = 'katex-display'
    display.appendChild(katexEl.firstChild!)
    root.appendChild(display)

    const clipboardData: Record<string, string> = {}
    const fakeEvent = new Event('copy') as ClipboardEvent
    Object.defineProperty(fakeEvent, 'clipboardData', {
      value: {
        setData: (type: string, data: string) => { clipboardData[type] = data },
        getData: (type: string) => clipboardData[type] ?? '',
      },
    })

    const range = document.createRange()
    range.selectNode(display)
    vi.spyOn(window, 'getSelection').mockReturnValue({
      isCollapsed: false,
      getRangeAt: () => range,
      rangeCount: 1,
    } as unknown as Selection)

    fakeEvent.preventDefault = vi.fn()
    root.dispatchEvent(fakeEvent)

    expect(clipboardData['text/plain']).toBe('$$\\int_0^1 f(x)\\,dx$$')
    cleanup()
  })

  it('does nothing when selection has no katex elements', () => {
    const para = document.createElement('p')
    para.textContent = 'plain text'
    root.appendChild(para)

    const clipboardData: Record<string, string> = {}
    const fakeEvent = new Event('copy') as ClipboardEvent
    Object.defineProperty(fakeEvent, 'clipboardData', {
      value: {
        setData: (type: string, data: string) => { clipboardData[type] = data },
      },
    })

    const range = document.createRange()
    range.selectNode(para)
    vi.spyOn(window, 'getSelection').mockReturnValue({
      isCollapsed: false,
      getRangeAt: () => range,
      rangeCount: 1,
    } as unknown as Selection)

    const prevented = vi.fn()
    fakeEvent.preventDefault = prevented
    root.dispatchEvent(fakeEvent)

    expect(prevented).not.toHaveBeenCalled()
    expect(clipboardData['text/plain']).toBeUndefined()
    cleanup()
  })
})
