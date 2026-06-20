import { EditorView } from '@codemirror/view';
import type { MyceliumEditor, MyceliumEditorOptions, ScrollInfo } from './types.js';
export declare function createEditorView(target: HTMLElement, options: MyceliumEditorOptions, onDocChange: (value: string) => void): {
    view: EditorView;
    cleanup: () => void;
};
export declare class MyceliumEditorImpl implements MyceliumEditor {
    private view;
    private cleanup;
    private scrollListeners;
    private domScrollHandler;
    _scrollerEl: HTMLElement | undefined;
    constructor(target: HTMLElement, options: MyceliumEditorOptions, onChange?: (value: string) => void);
    getValue(): string;
    setValue(value: string): void;
    setReadOnly(readOnly: boolean): void;
    destroy(): void;
    getScrollInfo(): ScrollInfo;
    scrollToLine(line: number): void;
    onScroll(callback: (info: ScrollInfo) => void): () => void;
    setTheme(theme: 'light' | 'dark'): void;
}
