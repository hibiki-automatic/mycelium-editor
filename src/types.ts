import type * as Y from 'yjs'

export interface ScrollInfo {
  top: number
  height: number
  clientHeight: number
}

export interface MyceliumEditorOptions {
  value?: string
  yText?: Y.Text
  readOnly?: boolean
  theme?: 'light' | 'dark'
  onChange?: (value: string) => void
}

export interface MyceliumEditor {
  getValue(): string
  setValue(value: string): void
  setReadOnly(readOnly: boolean): void
  destroy(): void
  getScrollInfo(): ScrollInfo
  scrollToLine(line: number): void
  onScroll(callback: (info: ScrollInfo) => void): () => void
}
