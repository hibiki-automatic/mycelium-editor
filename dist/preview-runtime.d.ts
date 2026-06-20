/**
 * enableMathCopyAsTex — shared math-copy handler for mycelium preview surfaces.
 *
 * When the user copies a selection that contains rendered KaTeX math, the
 * clipboard receives the original LaTeX source (from KaTeX's embedded MathML
 * annotation) instead of KaTeX's fallback plaintext approximation.
 *
 * Usage: call once per preview root element. Call the returned cleanup fn on
 * unmount to remove the event listener.
 */
export declare function enableMathCopyAsTex(rootEl: HTMLElement): () => void;
