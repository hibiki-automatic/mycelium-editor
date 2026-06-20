import { ViewPlugin, ViewUpdate, DecorationSet } from '@codemirror/view';
export declare const markdownDecorations: ViewPlugin<{
    decorations: DecorationSet;
    update(update: ViewUpdate): void;
}, undefined>;
