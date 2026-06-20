import type * as Y from 'yjs'

export interface ScrollInfo {
  top: number
  height: number
  clientHeight: number
}

export interface MyceliumEditorOptions {
  value?: string
  yText?: Y.Text
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  awareness?: any  // y-protocols Awareness instance; typed 'any' to avoid a hard peer-dep
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
