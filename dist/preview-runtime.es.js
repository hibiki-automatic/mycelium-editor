function d(e) {
  const n = (t) => {
    const o = t, a = window.getSelection();
    if (!a || a.isCollapsed || !o.clipboardData) return;
    const l = a.getRangeAt(0), u = l.cloneContents(), s = Array.from(u.querySelectorAll(".katex"));
    if (s.length === 0) {
      const c = l.startContainer, r = f(c, e);
      if (!r) return;
      s.push(r);
    }
    const i = [];
    for (const c of s) {
      const r = x(c);
      r !== null && i.push(r);
    }
    if (i.length === 0) return;
    o.preventDefault();
    const p = i.join(" ");
    o.clipboardData.setData("text/plain", p);
  };
  return e.addEventListener("copy", n), () => e.removeEventListener("copy", n);
}
function f(e, n) {
  let t = e;
  for (; t && t !== n; ) {
    if (t.nodeType === Node.ELEMENT_NODE) {
      const o = t;
      if (o.classList.contains("katex")) return o;
    }
    t = t.parentNode;
  }
  return null;
}
function x(e) {
  const n = e.querySelector('annotation[encoding="application/x-tex"]');
  if (!n || !n.textContent) return null;
  const t = n.textContent.trim();
  return e.closest(".katex-display") !== null || e.getAttribute("data-display") === "true" ? `$$${t}$$` : `$${t}$`;
}
export {
  d as enableMathCopyAsTex
};
//# sourceMappingURL=preview-runtime.es.js.map
