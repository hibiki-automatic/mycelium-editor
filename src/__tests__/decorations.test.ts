import { describe, it, expect } from 'vitest'

// Test the regex patterns used by decorations without needing a DOM/EditorView
// (The full decoration plugin requires a mounted EditorView which needs a DOM.)

function matchHeading(text: string): number | null {
  const m = /^(#{1,6})\s/.exec(text)
  if (!m) return null
  return m[1].length
}

function matchBold(text: string): RegExpExecArray[] {
  const re = /(\*\*|__)(.+?)\1/g
  const results: RegExpExecArray[] = []
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) results.push(m)
  return results
}

function matchEmphasis(text: string): RegExpExecArray[] {
  const re = /\*(?!\*)([^*]+)\*(?!\*)|(?<![_\w])_(?!_)([^_]+)_(?![_\w])/g
  const results: RegExpExecArray[] = []
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) results.push(m)
  return results
}

function matchCode(text: string): RegExpExecArray[] {
  const re = /`([^`\n]+)`/g
  const results: RegExpExecArray[] = []
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) results.push(m)
  return results
}

function matchLink(text: string): RegExpExecArray[] {
  const re = /\[([^\]\n]+)\]\(([^)\n]+)\)/g
  const results: RegExpExecArray[] = []
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) results.push(m)
  return results
}

describe('heading detection', () => {
  it('detects h1–h6', () => {
    expect(matchHeading('# Hello')).toBe(1)
    expect(matchHeading('## Hello')).toBe(2)
    expect(matchHeading('###### Hello')).toBe(6)
  })
  it('ignores heading without space', () => {
    expect(matchHeading('#Hello')).toBeNull()
  })
  it('ignores non-heading', () => {
    expect(matchHeading('plain text')).toBeNull()
  })
})

describe('bold detection', () => {
  it('detects **bold**', () => {
    const m = matchBold('this is **bold** text')
    expect(m).toHaveLength(1)
    expect(m[0][0]).toBe('**bold**')
  })
  it('detects __bold__', () => {
    const m = matchBold('__bold__')
    expect(m).toHaveLength(1)
  })
  it('detects multiple bold spans', () => {
    const m = matchBold('**a** and **b**')
    expect(m).toHaveLength(2)
  })
})

describe('emphasis detection', () => {
  it('detects *italic*', () => {
    const m = matchEmphasis('this is *italic* text')
    expect(m).toHaveLength(1)
  })
  it('does not match **bold** as italic', () => {
    // Bold should not trigger the single-star italic pattern
    const m = matchEmphasis('**bold**')
    expect(m).toHaveLength(0)
  })
})

describe('inline code detection', () => {
  it('detects `code`', () => {
    const m = matchCode('use `console.log()` here')
    expect(m).toHaveLength(1)
    expect(m[0][1]).toBe('console.log()')
  })
  it('detects multiple code spans', () => {
    const m = matchCode('`a` and `b`')
    expect(m).toHaveLength(2)
  })
})

describe('link detection', () => {
  it('detects [text](url)', () => {
    const m = matchLink('see [docs](https://example.com) for details')
    expect(m).toHaveLength(1)
    expect(m[0][1]).toBe('docs')
    expect(m[0][2]).toBe('https://example.com')
  })
  it('detects multiple links', () => {
    const m = matchLink('[a](url1) and [b](url2)')
    expect(m).toHaveLength(2)
  })
})
