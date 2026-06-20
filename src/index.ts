export { MyceliumEditorImpl as MyceliumEditorClass } from './editor.js'
export { syncEditorPreviewScroll } from './scroll-sync.js'
export { myceliumTheme, myceliumDarkTheme, myceliumCss, myceliumDarkCss } from './theme.js'
export { enableMathCopyAsTex } from './preview-runtime.js'
export type { MyceliumEditor, MyceliumEditorOptions, ScrollInfo } from './types.js'

import { MyceliumEditorImpl } from './editor.js'
import type { MyceliumEditor, MyceliumEditorOptions } from './types.js'

export function createMyceliumEditor(
  target: HTMLElement,
  options: MyceliumEditorOptions = {},
): MyceliumEditor {
  return new MyceliumEditorImpl(target, options, options.onChange)
}
