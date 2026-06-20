/**
 * Headless browser verification for mycelium-editor
 * Uses Playwright Chromium to test the demo page
 */

import { chromium } from 'playwright'
import { createServer } from 'http'
import { readFileSync, existsSync } from 'fs'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// --- Static server ---
const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.map': 'application/json',
}

function startServer(root, port = 0) {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let urlPath = req.url.split('?')[0]
      if (urlPath === '/') urlPath = '/demo/index.html'
      const filePath = join(root, urlPath)
      if (existsSync(filePath)) {
        const ext = extname(filePath)
        const ct = MIME[ext] || 'application/octet-stream'
        res.writeHead(200, { 'Content-Type': ct })
        res.end(readFileSync(filePath))
      } else {
        res.writeHead(404)
        res.end('not found')
      }
    })
    server.listen(port, '127.0.0.1', () => {
      resolve({ server, port: server.address().port })
    })
  })
}

// --- Main ---
async function main() {
  const { server, port } = await startServer(__dirname)
  const base = `http://127.0.0.1:${port}`

  console.log(`Static server at ${base}`)

  const browser = await chromium.launch({ headless: true })
  const ctx = await browser.newContext()
  const page = await ctx.newPage()

  const consoleErrors = []
  const consoleMessages = []
  page.on('console', msg => {
    const text = `[${msg.type()}] ${msg.text()}`
    consoleMessages.push(text)
    if (msg.type() === 'error') consoleErrors.push(text)
  })
  page.on('pageerror', err => {
    consoleErrors.push(`[pageerror] ${err.message}`)
  })

  // ---- CHECK 0: Load page, no uncaught errors ----
  console.log('\n=== CHECK 0: Load page ===')
  await page.goto(`${base}/demo/index.html`, { waitUntil: 'networkidle', timeout: 30000 })
  // Wait for CM6 to mount
  await page.waitForSelector('.cm-editor', { timeout: 10000 })
  // Wait a bit for any async operations
  await page.waitForTimeout(1500)

  console.log('Console errors on load:', consoleErrors.length === 0 ? 'NONE' : consoleErrors.join('\n'))
  console.log('Console messages:')
  consoleMessages.forEach(m => console.log(' ', m))

  // Screenshot
  await page.screenshot({ path: '/tmp/mycelium-load.png', fullPage: true })
  console.log('Screenshot saved to /tmp/mycelium-load.png')

  // ---- CHECK 1: In-source decorations ----
  console.log('\n=== CHECK 1: In-source decorations ===')

  // Check heading decoration
  const h1Line = await page.$('.cm-md-h1')
  console.log('H1 decoration present (.cm-md-h1):', h1Line ? 'YES' : 'NO')

  // Verify raw markers are still in the text (no chars added/removed)
  const editorText = await page.evaluate(() => {
    const lines = document.querySelectorAll('.cm-line')
    return Array.from(lines).map(l => l.textContent || '').join('\n')
  })
  const hasRawHash = editorText.includes('# Welcome to Mycelium Editor')
  const hasBoldMarkers = editorText.includes('**EasyMDE-style**') || editorText.includes('**bold**')
  const hasEmMarkers = editorText.includes('*italic*') || editorText.includes('*visible*')
  const hasCodeMarkers = editorText.includes('`#`') || editorText.includes('`code`') || editorText.includes('`console.log()')
  console.log('Raw # heading marker in editor text:', hasRawHash ? 'YES' : 'NO')
  console.log('Raw ** bold markers in editor text:', hasBoldMarkers ? 'YES' : 'NO')
  console.log('Raw * em markers in editor text:', hasEmMarkers ? 'YES' : 'NO')
  console.log('Raw ` code markers in editor text:', hasCodeMarkers ? 'YES' : 'NO')

  const boldDeco = await page.$('.cm-md-strong')
  const emDeco = await page.$('.cm-md-em')
  const codeDeco = await page.$('.cm-md-code')
  const linkDeco = await page.$('.cm-md-link')
  console.log('Bold decoration (.cm-md-strong):', boldDeco ? 'YES' : 'NO')
  console.log('Em decoration (.cm-md-em):', emDeco ? 'YES' : 'NO')
  console.log('Code decoration (.cm-md-code):', codeDeco ? 'YES' : 'NO')
  console.log('Link decoration (.cm-md-link):', linkDeco ? 'YES' : 'NO')

  // Check font-size of h1 line vs plain line (decorations should make heading larger)
  const fontSizes = await page.evaluate(() => {
    const h1El = document.querySelector('.cm-md-h1 .cm-line') || document.querySelector('.cm-md-h1')
    const plainLines = document.querySelectorAll('.cm-line')
    const plainEl = Array.from(plainLines).find(l => !l.closest('.cm-md-h1'))
    return {
      h1FontSize: h1El ? getComputedStyle(h1El).fontSize : null,
      plainFontSize: plainEl ? getComputedStyle(plainEl).fontSize : null,
    }
  })
  console.log('H1 font size:', fontSizes.h1FontSize, '  Plain line font size:', fontSizes.plainFontSize)
  const h1Larger = fontSizes.h1FontSize && fontSizes.plainFontSize &&
    parseFloat(fontSizes.h1FontSize) > parseFloat(fontSizes.plainFontSize)
  console.log('H1 visually larger than plain text:', h1Larger ? 'YES' : 'NO (check values above)')

  // ---- CHECK 2: enableMathCopyAsTex ----
  console.log('\n=== CHECK 2: enableMathCopyAsTex ===')

  // Inject a synthetic KaTeX element into the preview to test math-copy without CDN
  // This simulates what KaTeX renders: a .katex span with embedded MathML annotation
  const mathCopyResult = await page.evaluate(() => {
    const previewEl = document.getElementById('preview-content')
    if (!previewEl) return { error: 'no preview element' }

    // Create a synthetic KaTeX structure (mirrors real KaTeX output)
    const katexSpan = document.createElement('span')
    katexSpan.className = 'katex'

    const mathEl = document.createElementNS('http://www.w3.org/1998/Math/MathML', 'math')
    const annotation = document.createElementNS('http://www.w3.org/1998/Math/MathML', 'annotation')
    annotation.setAttribute('encoding', 'application/x-tex')
    annotation.textContent = 'E = mc^2'
    mathEl.appendChild(annotation)
    katexSpan.appendChild(mathEl)

    // Add a text node before (to simulate surrounding text in preview)
    const para = document.createElement('p')
    para.textContent = 'Einstein: '
    para.appendChild(katexSpan)
    previewEl.appendChild(para)

    // Select the katex element
    const range = document.createRange()
    range.selectNode(katexSpan)
    const sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)

    // Dispatch a synthetic copy event with writable clipboardData
    const clipData = {}
    const fakeEvent = new ClipboardEvent('copy', { bubbles: true, cancelable: true })
    Object.defineProperty(fakeEvent, 'clipboardData', {
      get() {
        return {
          setData(type, data) { clipData[type] = data },
          getData(type) { return clipData[type] || '' },
        }
      }
    })
    let defaultPrevented = false
    const origPD = fakeEvent.preventDefault.bind(fakeEvent)
    fakeEvent.preventDefault = () => { defaultPrevented = true; origPD() }

    previewEl.dispatchEvent(fakeEvent)

    return {
      capturedText: clipData['text/plain'] || null,
      defaultPrevented,
      expectedFormat: '$E = mc^2$',
    }
  })

  console.log('Math copy test (synthetic inline KaTeX):', JSON.stringify(mathCopyResult, null, 2))
  const mathCopyOk = mathCopyResult.capturedText === mathCopyResult.expectedFormat
  console.log('Math copy clipboard text:', mathCopyResult.capturedText)
  console.log('Expected:', mathCopyResult.expectedFormat)
  console.log('Math copy CORRECT:', mathCopyOk ? 'YES (PASS)' : 'NO (FAIL)')

  // Test display math as well
  const displayMathResult = await page.evaluate(() => {
    const previewEl = document.getElementById('preview-content')

    // Create display math structure
    const displayWrapper = document.createElement('span')
    displayWrapper.className = 'katex-display'

    const katexSpan = document.createElement('span')
    katexSpan.className = 'katex'
    katexSpan.setAttribute('data-display', 'true')

    const mathEl = document.createElementNS('http://www.w3.org/1998/Math/MathML', 'math')
    const annotation = document.createElementNS('http://www.w3.org/1998/Math/MathML', 'annotation')
    annotation.setAttribute('encoding', 'application/x-tex')
    annotation.textContent = '\\int_0^\\infty e^{-x^2}\\,dx'
    mathEl.appendChild(annotation)
    katexSpan.appendChild(mathEl)
    displayWrapper.appendChild(katexSpan)
    previewEl.appendChild(displayWrapper)

    // Select the display wrapper
    const range = document.createRange()
    range.selectNode(displayWrapper)
    const sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)

    const clipData = {}
    const fakeEvent = new ClipboardEvent('copy', { bubbles: true, cancelable: true })
    Object.defineProperty(fakeEvent, 'clipboardData', {
      get() {
        return {
          setData(type, data) { clipData[type] = data },
          getData(type) { return clipData[type] || '' },
        }
      }
    })
    fakeEvent.preventDefault = () => {}
    previewEl.dispatchEvent(fakeEvent)

    return {
      capturedText: clipData['text/plain'] || null,
      expected: '$$\\int_0^\\infty e^{-x^2}\\,dx$$',
    }
  })
  console.log('Display math copy:', displayMathResult.capturedText)
  console.log('Expected:', displayMathResult.expected)
  console.log('Display math copy CORRECT:', displayMathResult.capturedText === displayMathResult.expected ? 'YES (PASS)' : 'NO (FAIL)')

  // ---- CHECK 3: Scroll-sync ----
  console.log('\n=== CHECK 3: Scroll sync ===')

  const scrollInfo = await page.evaluate(() => {
    const scroller = document.querySelector('.cm-scroller')
    const previewPane = document.getElementById('preview-pane')
    return {
      scrollerScrollable: scroller ? scroller.scrollHeight - scroller.clientHeight : 0,
      previewPaneScrollable: previewPane ? previewPane.scrollHeight - previewPane.clientHeight : 0,
    }
  })
  console.log('Editor scrollable:', scrollInfo.scrollerScrollable, 'px')
  console.log('Preview pane scrollable:', scrollInfo.previewPaneScrollable, 'px')

  // Reset scroll positions first
  await page.evaluate(() => {
    const scroller = document.querySelector('.cm-scroller')
    const previewPane = document.getElementById('preview-pane')
    if (scroller) scroller.scrollTop = 0
    if (previewPane) previewPane.scrollTop = 0
  })
  await page.waitForTimeout(100)

  const previewScrollBefore = await page.evaluate(() => {
    const previewPane = document.getElementById('preview-pane')
    return previewPane ? previewPane.scrollTop : -1
  })

  // Scroll the CM editor scroller (which should trigger onScroll -> sync -> move preview)
  await page.evaluate(() => {
    const scroller = document.querySelector('.cm-scroller')
    if (scroller) {
      scroller.scrollTop = 400
      scroller.dispatchEvent(new Event('scroll', { bubbles: false }))
    }
  })

  await page.waitForTimeout(300)

  const previewScrollAfter = await page.evaluate(() => {
    const previewPane = document.getElementById('preview-pane')
    return previewPane ? previewPane.scrollTop : -1
  })

  console.log(`Preview pane scroll before: ${previewScrollBefore}`)
  console.log(`Preview pane scroll after editor scroll: ${previewScrollAfter}`)
  console.log(`Scroll sync moved preview: ${previewScrollAfter > previewScrollBefore ? 'YES (PASS)' : 'NO (FAIL)'}`)

  // Screenshot after scroll
  await page.screenshot({ path: '/tmp/mycelium-scroll.png', fullPage: false })
  console.log('Scroll screenshot saved to /tmp/mycelium-scroll.png')

  // ---- SUMMARY ----
  console.log('\n========== FINAL SUMMARY ==========')
  const noErrors = consoleErrors.length === 0
  const decoOk = h1Line && boldDeco && emDeco && codeDeco && linkDeco && hasRawHash && hasBoldMarkers
  const scrollOk = previewScrollAfter > previewScrollBefore
  const mathOk = mathCopyOk && displayMathResult.capturedText === displayMathResult.expected

  console.log('CHECK 0 (no console errors):', noErrors ? 'PASS' : 'FAIL - ' + consoleErrors.join('; '))
  console.log('CHECK 1 (in-source decorations):', decoOk ? 'PASS' : 'FAIL')
  console.log('CHECK 2 (math copy as TeX):', mathOk ? 'PASS' : 'FAIL')
  console.log('CHECK 3 (scroll sync):', scrollOk ? 'PASS' : 'FAIL')

  await browser.close()
  server.close()
}

main().catch(err => {
  console.error('Verification script error:', err)
  process.exit(1)
})
