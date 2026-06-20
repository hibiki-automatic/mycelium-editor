var Js = Object.defineProperty;
var Xs = (n, t, e) => t in n ? Js(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var Dt = (n, t, e) => Xs(n, typeof t != "symbol" ? t + "" : t, e);
import { E as ln, V as $e, F as Fn, A as Bn, a as Re, R as qs, D as K, W as Ks } from "./index-CUCuSPF_.js";
const R = () => /* @__PURE__ */ new Map(), be = (n) => {
  const t = R();
  return n.forEach((e, s) => {
    t.set(s, e);
  }), t;
}, at = (n, t, e) => {
  let s = n.get(t);
  return s === void 0 && n.set(t, s = e()), s;
}, Ps = (n, t) => {
  const e = [];
  for (const [s, i] of n)
    e.push(t(i, s));
  return e;
}, Zs = (n, t) => {
  for (const [e, s] of n)
    if (t(s, e))
      return !0;
  return !1;
}, st = () => /* @__PURE__ */ new Set(), ae = (n) => n[n.length - 1], Qs = (n, t) => {
  for (let e = 0; e < t.length; e++)
    n.push(t[e]);
}, it = Array.from, Ne = (n, t) => {
  for (let e = 0; e < n.length; e++)
    if (!t(n[e], e, n))
      return !1;
  return !0;
}, Ue = (n, t) => {
  for (let e = 0; e < n.length; e++)
    if (t(n[e], e, n))
      return !0;
  return !1;
}, ti = (n, t) => {
  const e = new Array(n);
  for (let s = 0; s < n; s++)
    e[s] = t(s, e);
  return e;
}, rt = Array.isArray;
class Vn {
  constructor() {
    this._observers = R();
  }
  /**
   * @template {keyof EVENTS & string} NAME
   * @param {NAME} name
   * @param {EVENTS[NAME]} f
   */
  on(t, e) {
    return at(
      this._observers,
      /** @type {string} */
      t,
      st
    ).add(e), e;
  }
  /**
   * @template {keyof EVENTS & string} NAME
   * @param {NAME} name
   * @param {EVENTS[NAME]} f
   */
  once(t, e) {
    const s = (...i) => {
      this.off(
        t,
        /** @type {any} */
        s
      ), e(...i);
    };
    this.on(
      t,
      /** @type {any} */
      s
    );
  }
  /**
   * @template {keyof EVENTS & string} NAME
   * @param {NAME} name
   * @param {EVENTS[NAME]} f
   */
  off(t, e) {
    const s = this._observers.get(t);
    s !== void 0 && (s.delete(e), s.size === 0 && this._observers.delete(t));
  }
  /**
   * Emit a named event. All registered event listeners that listen to the
   * specified name will receive the event.
   *
   * @todo This should catch exceptions
   *
   * @template {keyof EVENTS & string} NAME
   * @param {NAME} name The event name.
   * @param {Parameters<EVENTS[NAME]>} args The arguments that are applied to the event listener.
   */
  emit(t, e) {
    return it((this._observers.get(t) || R()).values()).forEach((s) => s(...e));
  }
  destroy() {
    this._observers = R();
  }
}
const B = Math.floor, $t = Math.abs, Fe = (n, t) => n < t ? n : t, J = (n, t) => n > t ? n : t, ei = (n) => n !== 0 ? n < 0 : 1 / n < 0, cn = 1, hn = 2, ue = 4, de = 8, ni = 32, jn = 64, Bt = 128, si = 31, an = 63, pt = 127, ii = 2147483647, un = Number.MAX_SAFE_INTEGER, dn = Number.MIN_SAFE_INTEGER, ri = Number.isInteger || ((n) => typeof n == "number" && isFinite(n) && B(n) === n), oi = String.fromCharCode, li = (n) => n.toLowerCase(), ci = /^\s*/g, hi = (n) => n.replace(ci, ""), ai = /([A-Z])/g, fn = (n, t) => hi(n.replace(ai, (e) => `${t}${li(e)}`)), ui = (n) => {
  const t = unescape(encodeURIComponent(n)), e = t.length, s = new Uint8Array(e);
  for (let i = 0; i < e; i++)
    s[i] = /** @type {number} */
    t.codePointAt(i);
  return s;
}, mt = (
  /** @type {TextEncoder} */
  typeof TextEncoder < "u" ? new TextEncoder() : null
), di = (n) => mt.encode(n), fi = mt ? di : ui;
let fe = typeof TextDecoder > "u" ? null : new TextDecoder("utf-8", { fatal: !0, ignoreBOM: !0 });
fe && fe.decode(new Uint8Array()).length === 1 && (fe = null);
const gi = (n, t) => ti(t, () => n).join("");
class It {
  constructor() {
    this.cpos = 0, this.cbuf = new Uint8Array(100), this.bufs = [];
  }
}
const Be = () => new It(), pi = (n) => {
  let t = n.cpos;
  for (let e = 0; e < n.bufs.length; e++)
    t += n.bufs[e].length;
  return t;
}, F = (n) => {
  const t = new Uint8Array(pi(n));
  let e = 0;
  for (let s = 0; s < n.bufs.length; s++) {
    const i = n.bufs[s];
    t.set(i, e), e += i.length;
  }
  return t.set(new Uint8Array(n.cbuf.buffer, 0, n.cpos), e), t;
}, wi = (n, t) => {
  const e = n.cbuf.length;
  e - n.cpos < t && (n.bufs.push(new Uint8Array(n.cbuf.buffer, 0, n.cpos)), n.cbuf = new Uint8Array(J(e, t) * 2), n.cpos = 0);
}, E = (n, t) => {
  const e = n.cbuf.length;
  n.cpos === e && (n.bufs.push(n.cbuf), n.cbuf = new Uint8Array(e * 2), n.cpos = 0), n.cbuf[n.cpos++] = t;
}, Se = E, y = (n, t) => {
  for (; t > pt; )
    E(n, Bt | pt & t), t = B(t / 128);
  E(n, pt & t);
}, Ve = (n, t) => {
  const e = ei(t);
  for (e && (t = -t), E(n, (t > an ? Bt : 0) | (e ? jn : 0) | an & t), t = B(t / 64); t > 0; )
    E(n, (t > pt ? Bt : 0) | pt & t), t = B(t / 128);
}, Ee = new Uint8Array(3e4), mi = Ee.length / 3, yi = (n, t) => {
  if (t.length < mi) {
    const e = mt.encodeInto(t, Ee).written || 0;
    y(n, e);
    for (let s = 0; s < e; s++)
      E(n, Ee[s]);
  } else
    M(n, fi(t));
}, _i = (n, t) => {
  const e = unescape(encodeURIComponent(t)), s = e.length;
  y(n, s);
  for (let i = 0; i < s; i++)
    E(
      n,
      /** @type {number} */
      e.codePointAt(i)
    );
}, tt = mt && /** @type {any} */
mt.encodeInto ? yi : _i, je = (n, t) => {
  const e = n.cbuf.length, s = n.cpos, i = Fe(e - s, t.length), r = t.length - i;
  n.cbuf.set(t.subarray(0, i), s), n.cpos += i, r > 0 && (n.bufs.push(n.cbuf), n.cbuf = new Uint8Array(J(e * 2, r)), n.cbuf.set(t.subarray(i)), n.cpos = r);
}, M = (n, t) => {
  y(n, t.byteLength), je(n, t);
}, Ye = (n, t) => {
  wi(n, t);
  const e = new DataView(n.cbuf.buffer, n.cpos, t);
  return n.cpos += t, e;
}, ki = (n, t) => Ye(n, 4).setFloat32(0, t, !1), bi = (n, t) => Ye(n, 8).setFloat64(0, t, !1), Si = (n, t) => (
  /** @type {any} */
  Ye(n, 8).setBigInt64(0, t, !1)
), gn = new DataView(new ArrayBuffer(4)), Ei = (n) => (gn.setFloat32(0, n), gn.getFloat32(0) === n), yt = (n, t) => {
  switch (typeof t) {
    case "string":
      E(n, 119), tt(n, t);
      break;
    case "number":
      ri(t) && $t(t) <= ii ? (E(n, 125), Ve(n, t)) : Ei(t) ? (E(n, 124), ki(n, t)) : (E(n, 123), bi(n, t));
      break;
    case "bigint":
      E(n, 122), Si(n, t);
      break;
    case "object":
      if (t === null)
        E(n, 126);
      else if (rt(t)) {
        E(n, 117), y(n, t.length);
        for (let e = 0; e < t.length; e++)
          yt(n, t[e]);
      } else if (t instanceof Uint8Array)
        E(n, 116), M(n, t);
      else {
        E(n, 118);
        const e = Object.keys(t);
        y(n, e.length);
        for (let s = 0; s < e.length; s++) {
          const i = e[s];
          tt(n, i), yt(n, t[i]);
        }
      }
      break;
    case "boolean":
      E(n, t ? 120 : 121);
      break;
    default:
      E(n, 127);
  }
};
class pn extends It {
  /**
   * @param {function(Encoder, T):void} writer
   */
  constructor(t) {
    super(), this.w = t, this.s = null, this.count = 0;
  }
  /**
   * @param {T} v
   */
  write(t) {
    this.s === t ? this.count++ : (this.count > 0 && y(this, this.count - 1), this.count = 1, this.w(this, t), this.s = t);
  }
}
const wn = (n) => {
  n.count > 0 && (Ve(n.encoder, n.count === 1 ? n.s : -n.s), n.count > 1 && y(n.encoder, n.count - 2));
};
class Rt {
  constructor() {
    this.encoder = new It(), this.s = 0, this.count = 0;
  }
  /**
   * @param {number} v
   */
  write(t) {
    this.s === t ? this.count++ : (wn(this), this.count = 1, this.s = t);
  }
  /**
   * Flush the encoded state and transform this to a Uint8Array.
   *
   * Note that this should only be called once.
   */
  toUint8Array() {
    return wn(this), F(this.encoder);
  }
}
const mn = (n) => {
  if (n.count > 0) {
    const t = n.diff * 2 + (n.count === 1 ? 0 : 1);
    Ve(n.encoder, t), n.count > 1 && y(n.encoder, n.count - 2);
  }
};
class ge {
  constructor() {
    this.encoder = new It(), this.s = 0, this.count = 0, this.diff = 0;
  }
  /**
   * @param {number} v
   */
  write(t) {
    this.diff === t - this.s ? (this.s = t, this.count++) : (mn(this), this.count = 1, this.diff = t - this.s, this.s = t);
  }
  /**
   * Flush the encoded state and transform this to a Uint8Array.
   *
   * Note that this should only be called once.
   */
  toUint8Array() {
    return mn(this), F(this.encoder);
  }
}
class Ci {
  constructor() {
    this.sarr = [], this.s = "", this.lensE = new Rt();
  }
  /**
   * @param {string} string
   */
  write(t) {
    this.s += t, this.s.length > 19 && (this.sarr.push(this.s), this.s = ""), this.lensE.write(t.length);
  }
  toUint8Array() {
    const t = new It();
    return this.sarr.push(this.s), this.s = "", tt(t, this.sarr.join("")), je(t, this.lensE.toUint8Array()), F(t);
  }
}
const W = (n) => new Error(n), v = () => {
  throw W("Method unimplemented");
}, N = () => {
  throw W("Unexpected case");
}, Ai = crypto.getRandomValues.bind(crypto), Yn = () => Ai(new Uint32Array(1))[0], Ii = "10000000-1000-4000-8000" + -1e11, xi = () => Ii.replace(
  /[018]/g,
  /** @param {number} c */
  (n) => (n ^ Yn() & 15 >> n / 4).toString(16)
), Ti = Date.now, yn = (n) => (
  /** @type {Promise<T>} */
  new Promise(n)
);
Promise.all.bind(Promise);
const _n = (n) => n === void 0 ? null : n;
class Di {
  constructor() {
    this.map = /* @__PURE__ */ new Map();
  }
  /**
   * @param {string} key
   * @param {any} newValue
   */
  setItem(t, e) {
    this.map.set(t, e);
  }
  /**
   * @param {string} key
   */
  getItem(t) {
    return this.map.get(t);
  }
}
let zn = new Di(), Oi = !0;
try {
  typeof localStorage < "u" && localStorage && (zn = localStorage, Oi = !1);
} catch {
}
const Mi = zn, _t = Symbol("Equality"), Gn = (n, t) => {
  var e;
  return n === t || !!((e = n == null ? void 0 : n[_t]) != null && e.call(n, t)) || !1;
}, Li = (n) => typeof n == "object", vi = Object.assign, $i = Object.keys, Ri = (n, t) => {
  for (const e in n)
    t(n[e], e);
}, Vt = (n) => $i(n).length, Ni = (n) => {
  for (const t in n)
    return !1;
  return !0;
}, xt = (n, t) => {
  for (const e in n)
    if (!t(n[e], e))
      return !1;
  return !0;
}, ze = (n, t) => Object.prototype.hasOwnProperty.call(n, t), Ui = (n, t) => n === t || Vt(n) === Vt(t) && xt(n, (e, s) => (e !== void 0 || ze(t, s)) && Gn(t[s], e)), Fi = Object.freeze, Hn = (n) => {
  for (const t in n) {
    const e = n[t];
    (typeof e == "object" || typeof e == "function") && Hn(n[t]);
  }
  return Fi(n);
}, Ge = (n, t, e = 0) => {
  try {
    for (; e < n.length; e++)
      n[e](...t);
  } finally {
    e < n.length && Ge(n, t, e + 1);
  }
}, Nt = (n, t) => {
  if (n === t)
    return !0;
  if (n == null || t == null || n.constructor !== t.constructor && (n.constructor || Object) !== (t.constructor || Object))
    return !1;
  if (n[_t] != null)
    return n[_t](t);
  switch (n.constructor) {
    case ArrayBuffer:
      n = new Uint8Array(n), t = new Uint8Array(t);
    // eslint-disable-next-line no-fallthrough
    case Uint8Array: {
      if (n.byteLength !== t.byteLength)
        return !1;
      for (let e = 0; e < n.length; e++)
        if (n[e] !== t[e])
          return !1;
      break;
    }
    case Set: {
      if (n.size !== t.size)
        return !1;
      for (const e of n)
        if (!t.has(e))
          return !1;
      break;
    }
    case Map: {
      if (n.size !== t.size)
        return !1;
      for (const e of n.keys())
        if (!t.has(e) || !Nt(n.get(e), t.get(e)))
          return !1;
      break;
    }
    case void 0:
    case Object:
      if (Vt(n) !== Vt(t))
        return !1;
      for (const e in n)
        if (!ze(n, e) || !Nt(n[e], t[e]))
          return !1;
      break;
    case Array:
      if (n.length !== t.length)
        return !1;
      for (let e = 0; e < n.length; e++)
        if (!Nt(n[e], t[e]))
          return !1;
      break;
    default:
      return !1;
  }
  return !0;
}, Bi = (n, t) => t.includes(n), kt = typeof process < "u" && process.release && /node|io\.js/.test(process.release.name) && Object.prototype.toString.call(typeof process < "u" ? process : 0) === "[object process]";
let $;
const Vi = () => {
  if ($ === void 0)
    if (kt) {
      $ = R();
      const n = process.argv;
      let t = null;
      for (let e = 0; e < n.length; e++) {
        const s = n[e];
        s[0] === "-" ? (t !== null && $.set(t, ""), t = s) : t !== null && ($.set(t, s), t = null);
      }
      t !== null && $.set(t, "");
    } else typeof location == "object" ? ($ = R(), (location.search || "?").slice(1).split("&").forEach((n) => {
      if (n.length !== 0) {
        const [t, e] = n.split("=");
        $.set(`--${fn(t, "-")}`, e), $.set(`-${fn(t, "-")}`, e);
      }
    })) : $ = R();
  return $;
}, Ce = (n) => Vi().has(n), jt = (n) => _n(kt ? process.env[n.toUpperCase().replaceAll("-", "_")] : Mi.getItem(n)), Wn = (n) => Ce("--" + n) || jt(n) !== null, ji = Wn("production"), Yi = kt && Bi(process.env.FORCE_COLOR, ["true", "1", "2"]), zi = Yi || !Ce("--no-colors") && // @todo deprecate --no-colors
!Wn("no-color") && (!kt || process.stdout.isTTY) && (!kt || Ce("--color") || jt("COLORTERM") !== null || (jt("TERM") || "").includes("color"));
class Gi {
  /**
   * @param {L} left
   * @param {R} right
   */
  constructor(t, e) {
    this.left = t, this.right = e;
  }
}
const L = (n, t) => new Gi(n, t), Hi = (n, t) => n.forEach((e) => t(e.left, e.right)), kn = (n) => n.next() >= 0.5, pe = (n, t, e) => B(n.next() * (e + 1 - t) + t), Jn = (n, t, e) => B(n.next() * (e + 1 - t) + t), He = (n, t, e) => Jn(n, t, e), Wi = (n) => oi(He(n, 97, 122)), Ji = (n, t = 0, e = 20) => {
  const s = He(n, t, e);
  let i = "";
  for (let r = 0; r < s; r++)
    i += Wi(n);
  return i;
}, we = (n, t) => t[He(n, 0, t.length - 1)], Xi = Symbol("0schema");
class qi {
  constructor() {
    this._rerrs = [];
  }
  /**
   * @param {string?} path
   * @param {string} expected
   * @param {string} has
   * @param {string?} message
   */
  extend(t, e, s, i = null) {
    this._rerrs.push({ path: t, expected: e, has: s, message: i });
  }
  toString() {
    const t = [];
    for (let e = this._rerrs.length - 1; e > 0; e--) {
      const s = this._rerrs[e];
      t.push(gi(" ", (this._rerrs.length - e) * 2) + `${s.path != null ? `[${s.path}] ` : ""}${s.has} doesn't match ${s.expected}. ${s.message}`);
    }
    return t.join(`
`);
  }
}
const Ae = (n, t) => n === t ? !0 : n == null || t == null || n.constructor !== t.constructor ? !1 : n[_t] ? Gn(n, t) : rt(n) ? Ne(
  n,
  (e) => Ue(t, (s) => Ae(e, s))
) : Li(n) ? xt(
  n,
  (e, s) => Ae(e, t[s])
) : !1;
class D {
  /**
   * @param {Schema<any>} other
   */
  extends(t) {
    let [e, s] = [
      /** @type {any} */
      this.shape,
      /** @type {any} */
      t.shape
    ];
    return (
      /** @type {typeof Schema<any>} */
      this.constructor._dilutes && ([s, e] = [e, s]), Ae(e, s)
    );
  }
  /**
   * Overwrite this when necessary. By default, we only check the `shape` property which every shape
   * should have.
   * @param {Schema<any>} other
   */
  equals(t) {
    return this.constructor === t.constructor && Nt(this.shape, t.shape);
  }
  [Xi]() {
    return !0;
  }
  /**
   * @param {object} other
   */
  [_t](t) {
    return this.equals(
      /** @type {any} */
      t
    );
  }
  /**
   * Use `schema.validate(obj)` with a typed parameter that is already of typed to be an instance of
   * Schema. Validate will check the structure of the parameter and return true iff the instance
   * really is an instance of Schema.
   *
   * @param {T} o
   * @return {boolean}
   */
  validate(t) {
    return this.check(t);
  }
  /* c8 ignore start */
  /**
   * Similar to validate, but this method accepts untyped parameters.
   *
   * @param {any} _o
   * @param {ValidationError} [_err]
   * @return {_o is T}
   */
  check(t, e) {
    v();
  }
  /* c8 ignore stop */
  /**
   * @type {Schema<T?>}
   */
  get nullable() {
    return ut(this, ne);
  }
  /**
   * @type {$Optional<Schema<T>>}
   */
  get optional() {
    return new Kn(
      /** @type {Schema<T>} */
      this
    );
  }
  /**
   * Cast a variable to a specific type. Returns the casted value, or throws an exception otherwise.
   * Use this if you know that the type is of a specific type and you just want to convince the type
   * system.
   *
   * **Do not rely on these error messages!**
   * Performs an assertion check only if not in a production environment.
   *
   * @template OO
   * @param {OO} o
   * @return {Extract<OO, T> extends never ? T : (OO extends Array<never> ? T : Extract<OO,T>)}
   */
  cast(t) {
    return bn(t, this), /** @type {any} */
    t;
  }
  /**
   * EXPECTO PATRONUM!! 🪄
   * This function protects against type errors. Though it may not work in the real world.
   *
   * "After all this time?"
   * "Always." - Snape, talking about type safety
   *
   * Ensures that a variable is a a specific type. Returns the value, or throws an exception if the assertion check failed.
   * Use this if you know that the type is of a specific type and you just want to convince the type
   * system.
   *
   * Can be useful when defining lambdas: `s.lambda(s.$number, s.$void).expect((n) => n + 1)`
   *
   * **Do not rely on these error messages!**
   * Performs an assertion check if not in a production environment.
   *
   * @param {T} o
   * @return {o extends T ? T : never}
   */
  expect(t) {
    return bn(t, this), t;
  }
}
// this.shape must not be defined on Schema. Otherwise typecheck on metatypes (e.g. $$object) won't work as expected anymore
/**
 * If true, the more things are added to the shape the more objects this schema will accept (e.g.
 * union). By default, the more objects are added, the the fewer objects this schema will accept.
 * @protected
 */
Dt(D, "_dilutes", !1);
class We extends D {
  /**
   * @param {C} c
   * @param {((o:Instance<C>)=>boolean)|null} check
   */
  constructor(t, e) {
    super(), this.shape = t, this._c = e;
  }
  /**
   * @param {any} o
   * @param {ValidationError} [err]
   * @return {o is C extends ((...args:any[]) => infer T) ? T : (C extends (new (...args:any[]) => any) ? InstanceType<C> : never)} o
   */
  check(t, e = void 0) {
    const s = (t == null ? void 0 : t.constructor) === this.shape && (this._c == null || this._c(t));
    return !s && (e == null || e.extend(null, this.shape.name, t == null ? void 0 : t.constructor.name, (t == null ? void 0 : t.constructor) !== this.shape ? "Constructor match failed" : "Check failed")), s;
  }
}
const S = (n, t = null) => new We(n, t);
S(We);
class Je extends D {
  /**
   * @param {(o:any) => boolean} check
   */
  constructor(t) {
    super(), this.shape = t;
  }
  /**
   * @param {any} o
   * @param {ValidationError} err
   * @return {o is any}
   */
  check(t, e) {
    const s = this.shape(t);
    return !s && (e == null || e.extend(null, "custom prop", t == null ? void 0 : t.constructor.name, "failed to check custom prop")), s;
  }
}
const I = (n) => new Je(n);
S(Je);
class Zt extends D {
  /**
   * @param {Array<T>} literals
   */
  constructor(t) {
    super(), this.shape = t;
  }
  /**
   *
   * @param {any} o
   * @param {ValidationError} [err]
   * @return {o is T}
   */
  check(t, e) {
    const s = this.shape.some((i) => i === t);
    return !s && (e == null || e.extend(null, this.shape.join(" | "), t.toString())), s;
  }
}
const Qt = (...n) => new Zt(n), Xn = S(Zt), Ki = (
  /** @type {any} */
  RegExp.escape || /** @type {(str:string) => string} */
  ((n) => n.replace(/[().|&,$^[\]]/g, (t) => "\\" + t))
), qn = (n) => {
  if (ot.check(n))
    return [Ki(n)];
  if (Xn.check(n))
    return (
      /** @type {Array<string|number>} */
      n.shape.map((t) => t + "")
    );
  if (rs.check(n))
    return ["[+-]?\\d+.?\\d*"];
  if (os.check(n))
    return [".*"];
  if (zt.check(n))
    return n.shape.map(qn).flat(1);
  N();
};
class Pi extends D {
  /**
   * @param {T} shape
   */
  constructor(t) {
    super(), this.shape = t, this._r = new RegExp("^" + t.map(qn).map((e) => `(${e.join("|")})`).join("") + "$");
  }
  /**
   * @param {any} o
   * @param {ValidationError} [err]
   * @return {o is CastStringTemplateArgsToTemplate<T>}
   */
  check(t, e) {
    const s = this._r.exec(t) != null;
    return !s && (e == null || e.extend(null, this._r.toString(), t.toString(), "String doesn't match string template.")), s;
  }
}
S(Pi);
const Zi = Symbol("optional");
class Kn extends D {
  /**
   * @param {S} shape
   */
  constructor(t) {
    super(), this.shape = t;
  }
  /**
   * @param {any} o
   * @param {ValidationError} [err]
   * @return {o is (Unwrap<S>|undefined)}
   */
  check(t, e) {
    const s = t === void 0 || this.shape.check(t);
    return !s && (e == null || e.extend(null, "undefined (optional)", "()")), s;
  }
  get [Zi]() {
    return !0;
  }
}
const Qi = S(Kn);
class tr extends D {
  /**
   * @param {any} _o
   * @param {ValidationError} [err]
   * @return {_o is never}
   */
  check(t, e) {
    return e == null || e.extend(null, "never", typeof t), !1;
  }
}
S(tr);
const Pt = class Pt extends D {
  /**
   * @param {S} shape
   * @param {boolean} partial
   */
  constructor(t, e = !1) {
    super(), this.shape = t, this._isPartial = e;
  }
  /**
   * @type {Schema<Partial<$ObjectToType<S>>>}
   */
  get partial() {
    return new Pt(this.shape, !0);
  }
  /**
   * @param {any} o
   * @param {ValidationError} err
   * @return {o is $ObjectToType<S>}
   */
  check(t, e) {
    return t == null ? (e == null || e.extend(null, "object", "null"), !1) : xt(this.shape, (s, i) => {
      const r = this._isPartial && !ze(t, i) || s.check(t[i], e);
      return !r && (e == null || e.extend(i.toString(), s.toString(), typeof t[i], "Object property does not match")), r;
    });
  }
};
Dt(Pt, "_dilutes", !0);
let Yt = Pt;
const er = (n) => (
  /** @type {any} */
  new Yt(n)
), nr = S(Yt), sr = I((n) => n != null && (n.constructor === Object || n.constructor == null));
class Pn extends D {
  /**
   * @param {Keys} keys
   * @param {Values} values
   */
  constructor(t, e) {
    super(), this.shape = {
      keys: t,
      values: e
    };
  }
  /**
   * @param {any} o
   * @param {ValidationError} err
   * @return {o is { [key in Unwrap<Keys>]: Unwrap<Values> }}
   */
  check(t, e) {
    return t != null && xt(t, (s, i) => {
      const r = this.shape.keys.check(i, e);
      return !r && (e == null || e.extend(i + "", "Record", typeof t, r ? "Key doesn't match schema" : "Value doesn't match value")), r && this.shape.values.check(s, e);
    });
  }
}
const Zn = (n, t) => new Pn(n, t), ir = S(Pn);
class Qn extends D {
  /**
   * @param {S} shape
   */
  constructor(t) {
    super(), this.shape = t;
  }
  /**
   * @param {any} o
   * @param {ValidationError} err
   * @return {o is { [K in keyof S]: S[K] extends Schema<infer Type> ? Type : never }}
   */
  check(t, e) {
    return t != null && xt(this.shape, (s, i) => {
      const r = (
        /** @type {Schema<any>} */
        s.check(t[i], e)
      );
      return !r && (e == null || e.extend(i.toString(), "Tuple", typeof s)), r;
    });
  }
}
const rr = (...n) => new Qn(n);
S(Qn);
class ts extends D {
  /**
   * @param {Array<S>} v
   */
  constructor(t) {
    super(), this.shape = t.length === 1 ? t[0] : new te(t);
  }
  /**
   * @param {any} o
   * @param {ValidationError} [err]
   * @return {o is Array<S extends Schema<infer T> ? T : never>} o
   */
  check(t, e) {
    const s = rt(t) && Ne(t, (i) => this.shape.check(i));
    return !s && (e == null || e.extend(null, "Array", "")), s;
  }
}
const es = (...n) => new ts(n), or = S(ts), lr = I((n) => rt(n));
class ns extends D {
  /**
   * @param {new (...args:any) => T} constructor
   * @param {((o:T) => boolean)|null} check
   */
  constructor(t, e) {
    super(), this.shape = t, this._c = e;
  }
  /**
   * @param {any} o
   * @param {ValidationError} err
   * @return {o is T}
   */
  check(t, e) {
    const s = t instanceof this.shape && (this._c == null || this._c(t));
    return !s && (e == null || e.extend(null, this.shape.name, t == null ? void 0 : t.constructor.name)), s;
  }
}
const cr = (n, t = null) => new ns(n, t);
S(ns);
const hr = cr(D);
class ar extends D {
  /**
   * @param {Args} args
   */
  constructor(t) {
    super(), this.len = t.length - 1, this.args = rr(...t.slice(-1)), this.res = t[this.len];
  }
  /**
   * @param {any} f
   * @param {ValidationError} err
   * @return {f is _LArgsToLambdaDef<Args>}
   */
  check(t, e) {
    const s = t.constructor === Function && t.length <= this.len;
    return !s && (e == null || e.extend(null, "function", typeof t)), s;
  }
}
const ur = S(ar), dr = I((n) => typeof n == "function");
class fr extends D {
  /**
   * @param {T} v
   */
  constructor(t) {
    super(), this.shape = t;
  }
  /**
   * @param {any} o
   * @param {ValidationError} [err]
   * @return {o is Intersect<UnwrapArray<T>>}
   */
  check(t, e) {
    const s = Ne(this.shape, (i) => i.check(t, e));
    return !s && (e == null || e.extend(null, "Intersectinon", typeof t)), s;
  }
}
S(fr, (n) => n.shape.length > 0);
class te extends D {
  /**
   * @param {Array<Schema<S>>} v
   */
  constructor(t) {
    super(), this.shape = t;
  }
  /**
   * @param {any} o
   * @param {ValidationError} [err]
   * @return {o is S}
   */
  check(t, e) {
    const s = Ue(this.shape, (i) => i.check(t, e));
    return e == null || e.extend(null, "Union", typeof t), s;
  }
}
Dt(te, "_dilutes", !0);
const ut = (...n) => n.findIndex((t) => zt.check(t)) >= 0 ? ut(...n.map((t) => bt(t)).map((t) => zt.check(t) ? t.shape : [t]).flat(1)) : n.length === 1 ? n[0] : new te(n), zt = (
  /** @type {Schema<$Union<any>>} */
  S(te)
), ss = () => !0, Gt = I(ss), gr = (
  /** @type {Schema<Schema<any>>} */
  S(Je, (n) => n.shape === ss)
), Xe = I((n) => typeof n == "bigint"), pr = (
  /** @type {Schema<Schema<BigInt>>} */
  I((n) => n === Xe)
), is = I((n) => typeof n == "symbol");
I((n) => n === is);
const et = I((n) => typeof n == "number"), rs = (
  /** @type {Schema<Schema<number>>} */
  I((n) => n === et)
), ot = I((n) => typeof n == "string"), os = (
  /** @type {Schema<Schema<string>>} */
  I((n) => n === ot)
), ee = I((n) => typeof n == "boolean"), wr = (
  /** @type {Schema<Schema<Boolean>>} */
  I((n) => n === ee)
), ls = Qt(void 0);
S(Zt, (n) => n.shape.length === 1 && n.shape[0] === void 0);
Qt(void 0);
const ne = Qt(null), mr = (
  /** @type {Schema<Schema<null>>} */
  S(Zt, (n) => n.shape.length === 1 && n.shape[0] === null)
);
S(Uint8Array);
S(We, (n) => n.shape === Uint8Array);
const yr = ut(et, ot, ne, ls, Xe, ee, is);
(() => {
  const n = (
    /** @type {$Array<$any>} */
    es(Gt)
  ), t = (
    /** @type {$Record<$string,$any>} */
    Zn(ot, Gt)
  ), e = ut(et, ot, ne, ee, n, t);
  return n.shape = e, t.shape.values = e, e;
})();
const bt = (n) => {
  if (hr.check(n))
    return (
      /** @type {any} */
      n
    );
  if (sr.check(n)) {
    const t = {};
    for (const e in n)
      t[e] = bt(n[e]);
    return (
      /** @type {any} */
      er(t)
    );
  } else {
    if (lr.check(n))
      return (
        /** @type {any} */
        ut(...n.map(bt))
      );
    if (yr.check(n))
      return (
        /** @type {any} */
        Qt(n)
      );
    if (dr.check(n))
      return (
        /** @type {any} */
        S(
          /** @type {any} */
          n
        )
      );
  }
  N();
}, bn = ji ? () => {
} : (n, t) => {
  const e = new qi();
  if (!t.check(n, e))
    throw W(`Expected value to be of type ${t.constructor.name}.
${e.toString()}`);
};
class _r {
  /**
   * @param {Schema<State>} [$state]
   */
  constructor(t) {
    this.patterns = [], this.$state = t;
  }
  /**
   * @template P
   * @template R
   * @param {P} pattern
   * @param {(o:NoInfer<Unwrap<ReadSchema<P>>>,s:State)=>R} handler
   * @return {PatternMatcher<State,Patterns|Pattern<Unwrap<ReadSchema<P>>,R>>}
   */
  if(t, e) {
    return this.patterns.push({ if: bt(t), h: e }), this;
  }
  /**
   * @template R
   * @param {(o:any,s:State)=>R} h
   */
  else(t) {
    return this.if(Gt, t);
  }
  /**
   * @return {State extends undefined
   *   ? <In extends Unwrap<Patterns['if']>>(o:In,state?:undefined)=>PatternMatchResult<Patterns,In>
   *   : <In extends Unwrap<Patterns['if']>>(o:In,state:State)=>PatternMatchResult<Patterns,In>}
   */
  done() {
    return (
      /** @type {any} */
      (t, e) => {
        for (let s = 0; s < this.patterns.length; s++) {
          const i = this.patterns[s];
          if (i.if.check(t))
            return i.h(t, e);
        }
        throw W("Unhandled pattern");
      }
    );
  }
}
const kr = (n) => new _r(
  /** @type {any} */
  n
), cs = (
  /** @type {any} */
  kr(
    /** @type {Schema<prng.PRNG>} */
    Gt
  ).if(rs, (n, t) => pe(t, dn, un)).if(os, (n, t) => Ji(t)).if(wr, (n, t) => kn(t)).if(pr, (n, t) => BigInt(pe(t, dn, un))).if(zt, (n, t) => P(t, we(t, n.shape))).if(nr, (n, t) => {
    const e = {};
    for (const s in n.shape) {
      let i = n.shape[s];
      if (Qi.check(i)) {
        if (kn(t))
          continue;
        i = i.shape;
      }
      e[s] = cs(i, t);
    }
    return e;
  }).if(or, (n, t) => {
    const e = [], s = Jn(t, 0, 42);
    for (let i = 0; i < s; i++)
      e.push(P(t, n.shape));
    return e;
  }).if(Xn, (n, t) => we(t, n.shape)).if(mr, (n, t) => null).if(ur, (n, t) => {
    const e = P(t, n.res);
    return () => e;
  }).if(gr, (n, t) => P(t, we(t, [
    et,
    ot,
    ne,
    ls,
    Xe,
    ee,
    es(et),
    Zn(ut("a", "b", "c"), et)
  ]))).if(ir, (n, t) => {
    const e = {}, s = pe(t, 0, 3);
    for (let i = 0; i < s; i++) {
      const r = P(t, n.shape.keys), o = P(t, n.shape.values);
      e[r] = o;
    }
    return e;
  }).done()
), P = (n, t) => (
  /** @type {any} */
  cs(bt(t), n)
), U = (
  /** @type {Document} */
  typeof document < "u" ? document : {}
), br = (n) => U.createElement(n), Sr = () => U.createDocumentFragment();
I((n) => n.nodeType === Mr);
const Er = (n) => U.createTextNode(n);
typeof DOMParser < "u" && new DOMParser();
const Cr = (n, t) => (Hi(t, (e, s) => {
  s === !1 ? n.removeAttribute(e) : s === !0 ? n.setAttribute(e, "") : n.setAttribute(e, s);
}), n), Ar = (n) => {
  const t = Sr();
  for (let e = 0; e < n.length; e++)
    hs(t, n[e]);
  return t;
}, Ir = (n, t) => (hs(n, Ar(t)), n), me = (n, t = [], e = []) => Ir(Cr(br(n), t), e);
I((n) => n.nodeType === Tr);
const Ot = Er;
I((n) => n.nodeType === Dr);
const xr = (n) => Ps(n, (t, e) => `${e}:${t};`).join(""), hs = (n, t) => n.appendChild(t), Tr = U.ELEMENT_NODE, Dr = U.TEXT_NODE;
U.CDATA_SECTION_NODE;
U.COMMENT_NODE;
const Or = U.DOCUMENT_NODE;
U.DOCUMENT_TYPE_NODE;
const Mr = U.DOCUMENT_FRAGMENT_NODE;
I((n) => n.nodeType === Or);
const Y = Symbol, as = Y(), us = Y(), Lr = Y(), vr = Y(), $r = Y(), ds = Y(), Rr = Y(), qe = Y(), Nr = Y(), Ur = (n) => {
  var i;
  n.length === 1 && ((i = n[0]) == null ? void 0 : i.constructor) === Function && (n = /** @type {Array<string|Symbol|Object|number>} */
  /** @type {[function]} */
  n[0]());
  const t = [], e = [];
  let s = 0;
  for (; s < n.length; s++) {
    const r = n[s];
    if (r === void 0)
      break;
    if (r.constructor === String || r.constructor === Number)
      t.push(r);
    else if (r.constructor === Object)
      break;
  }
  for (s > 0 && e.push(t.join("")); s < n.length; s++) {
    const r = n[s];
    r instanceof Symbol || e.push(r);
  }
  return e;
}, Fr = {
  [as]: L("font-weight", "bold"),
  [us]: L("font-weight", "normal"),
  [Lr]: L("color", "blue"),
  [$r]: L("color", "green"),
  [vr]: L("color", "grey"),
  [ds]: L("color", "red"),
  [Rr]: L("color", "purple"),
  [qe]: L("color", "orange"),
  // not well supported in chrome when debugging node with inspector - TODO: deprecate
  [Nr]: L("color", "black")
}, Br = (n) => {
  var o;
  n.length === 1 && ((o = n[0]) == null ? void 0 : o.constructor) === Function && (n = /** @type {Array<string|Symbol|Object|number>} */
  /** @type {[function]} */
  n[0]());
  const t = [], e = [], s = R();
  let i = [], r = 0;
  for (; r < n.length; r++) {
    const l = n[r], c = Fr[l];
    if (c !== void 0)
      s.set(c.left, c.right);
    else {
      if (l === void 0)
        break;
      if (l.constructor === String || l.constructor === Number) {
        const h = xr(s);
        r > 0 || h.length > 0 ? (t.push("%c" + l), e.push(h)) : t.push(l);
      } else
        break;
    }
  }
  for (r > 0 && (i = e, i.unshift(t.join(""))); r < n.length; r++) {
    const l = n[r];
    l instanceof Symbol || i.push(l);
  }
  return i;
}, fs = zi ? Br : Ur, Vr = (...n) => {
  console.log(...fs(n)), ps.forEach((t) => t.print(n));
}, gs = (...n) => {
  console.warn(...fs(n)), n.unshift(qe), ps.forEach((t) => t.print(n));
}, ps = st(), ws = (n) => ({
  /**
   * @return {IterableIterator<T>}
   */
  [Symbol.iterator]() {
    return this;
  },
  // @ts-ignore
  next: n
}), jr = (n, t) => ws(() => {
  let e;
  do
    e = n.next();
  while (!e.done && !t(e.value));
  return e;
}), ye = (n, t) => ws(() => {
  const { done: e, value: s } = n.next();
  return { done: e, value: e ? void 0 : t(s) };
});
class ms {
  /**
   * @param {number} clock
   * @param {number} len
   */
  constructor(t, e) {
    this.clock = t, this.len = e;
  }
}
class Ke {
  constructor() {
    this.clients = /* @__PURE__ */ new Map();
  }
}
const lt = (n, t, e) => t.clients.forEach((s, i) => {
  const r = (
    /** @type {Array<GC|Item>} */
    n.doc.store.clients.get(i)
  );
  if (r != null) {
    const o = r[r.length - 1], l = o.id.clock + o.length;
    for (let c = 0, h = s[c]; c < s.length && h.clock < l; h = s[++c])
      Es(n, r, h.clock, h.len, e);
  }
}), Yr = (n, t) => {
  let e = 0, s = n.length - 1;
  for (; e <= s; ) {
    const i = B((e + s) / 2), r = n[i], o = r.clock;
    if (o <= t) {
      if (t < o + r.len)
        return i;
      e = i + 1;
    } else
      s = i - 1;
  }
  return null;
}, Tt = (n, t) => {
  const e = n.clients.get(t.client);
  return e !== void 0 && Yr(e, t.clock) !== null;
}, Pe = (n) => {
  n.clients.forEach((t) => {
    t.sort((i, r) => i.clock - r.clock);
    let e, s;
    for (e = 1, s = 1; e < t.length; e++) {
      const i = t[s - 1], r = t[e];
      i.clock + i.len >= r.clock ? t[s - 1] = new ms(i.clock, J(i.len, r.clock + r.len - i.clock)) : (s < e && (t[s] = r), s++);
    }
    t.length = s;
  });
}, Sn = (n) => {
  const t = new Ke();
  for (let e = 0; e < n.length; e++)
    n[e].clients.forEach((s, i) => {
      if (!t.clients.has(i)) {
        const r = s.slice();
        for (let o = e + 1; o < n.length; o++)
          Qs(r, n[o].clients.get(i) || []);
        t.clients.set(i, r);
      }
    });
  return Pe(t), t;
}, Ze = (n, t, e, s) => {
  at(n.clients, t, () => (
    /** @type {Array<DeleteItem>} */
    []
  )).push(new ms(e, s));
}, zr = (n, t) => {
  y(n.restEncoder, t.clients.size), it(t.clients.entries()).sort((e, s) => s[0] - e[0]).forEach(([e, s]) => {
    n.resetDsCurVal(), y(n.restEncoder, e);
    const i = s.length;
    y(n.restEncoder, i);
    for (let r = 0; r < i; r++) {
      const o = s[r];
      n.writeDsClock(o.clock), n.writeDsLen(o.len);
    }
  });
}, ys = Yn;
class dt extends Vn {
  /**
   * @param {DocOpts} opts configuration
   */
  constructor({ guid: t = xi(), collectionid: e = null, gc: s = !0, gcFilter: i = () => !0, meta: r = null, autoLoad: o = !1, shouldLoad: l = !0 } = {}) {
    super(), this.gc = s, this.gcFilter = i, this.clientID = ys(), this.guid = t, this.collectionid = e, this.share = /* @__PURE__ */ new Map(), this.store = new eo(), this._transaction = null, this._transactionCleanups = [], this.subdocs = /* @__PURE__ */ new Set(), this._item = null, this.shouldLoad = l, this.autoLoad = o, this.meta = r, this.isLoaded = !1, this.isSynced = !1, this.isDestroyed = !1, this.whenLoaded = yn((h) => {
      this.on("load", () => {
        this.isLoaded = !0, h(this);
      });
    });
    const c = () => yn((h) => {
      const u = (a) => {
        (a === void 0 || a === !0) && (this.off("sync", u), h());
      };
      this.on("sync", u);
    });
    this.on("sync", (h) => {
      h === !1 && this.isSynced && (this.whenSynced = c()), this.isSynced = h === void 0 || h === !0, this.isSynced && !this.isLoaded && this.emit("load", [this]);
    }), this.whenSynced = c();
  }
  /**
   * Notify the parent document that you request to load data into this subdocument (if it is a subdocument).
   *
   * `load()` might be used in the future to request any provider to load the most current data.
   *
   * It is safe to call `load()` multiple times.
   */
  load() {
    const t = this._item;
    t !== null && !this.shouldLoad && _(
      /** @type {any} */
      t.parent.doc,
      (e) => {
        e.subdocsLoaded.add(this);
      },
      null,
      !0
    ), this.shouldLoad = !0;
  }
  getSubdocs() {
    return this.subdocs;
  }
  getSubdocGuids() {
    return new Set(it(this.subdocs).map((t) => t.guid));
  }
  /**
   * Changes that happen inside of a transaction are bundled. This means that
   * the observer fires _after_ the transaction is finished and that all changes
   * that happened inside of the transaction are sent as one message to the
   * other peers.
   *
   * @template T
   * @param {function(Transaction):T} f The function that should be executed as a transaction
   * @param {any} [origin] Origin of who started the transaction. Will be stored on transaction.origin
   * @return T
   *
   * @public
   */
  transact(t, e = null) {
    return _(this, t, e);
  }
  /**
   * Define a shared data type.
   *
   * Multiple calls of `ydoc.get(name, TypeConstructor)` yield the same result
   * and do not overwrite each other. I.e.
   * `ydoc.get(name, Y.Array) === ydoc.get(name, Y.Array)`
   *
   * After this method is called, the type is also available on `ydoc.share.get(name)`.
   *
   * *Best Practices:*
   * Define all types right after the Y.Doc instance is created and store them in a separate object.
   * Also use the typed methods `getText(name)`, `getArray(name)`, ..
   *
   * @template {typeof AbstractType<any>} Type
   * @example
   *   const ydoc = new Y.Doc(..)
   *   const appState = {
   *     document: ydoc.getText('document')
   *     comments: ydoc.getArray('comments')
   *   }
   *
   * @param {string} name
   * @param {Type} TypeConstructor The constructor of the type definition. E.g. Y.Text, Y.Array, Y.Map, ...
   * @return {InstanceType<Type>} The created type. Constructed with TypeConstructor
   *
   * @public
   */
  get(t, e = (
    /** @type {any} */
    C
  )) {
    const s = at(this.share, t, () => {
      const r = new e();
      return r._integrate(this, null), r;
    }), i = s.constructor;
    if (e !== C && i !== e)
      if (i === C) {
        const r = new e();
        r._map = s._map, s._map.forEach(
          /** @param {Item?} n */
          (o) => {
            for (; o !== null; o = o.left)
              o.parent = r;
          }
        ), r._start = s._start;
        for (let o = r._start; o !== null; o = o.right)
          o.parent = r;
        return r._length = s._length, this.share.set(t, r), r._integrate(this, null), /** @type {InstanceType<Type>} */
        r;
      } else
        throw new Error(`Type with the name ${t} has already been defined with a different constructor`);
    return (
      /** @type {InstanceType<Type>} */
      s
    );
  }
  /**
   * @template T
   * @param {string} [name]
   * @return {YArray<T>}
   *
   * @public
   */
  getArray(t = "") {
    return (
      /** @type {YArray<T>} */
      this.get(t, wt)
    );
  }
  /**
   * @param {string} [name]
   * @return {YText}
   *
   * @public
   */
  getText(t = "") {
    return this.get(t, qt);
  }
  /**
   * @template T
   * @param {string} [name]
   * @return {YMap<T>}
   *
   * @public
   */
  getMap(t = "") {
    return (
      /** @type {YMap<T>} */
      this.get(t, Xt)
    );
  }
  /**
   * @param {string} [name]
   * @return {YXmlElement}
   *
   * @public
   */
  getXmlElement(t = "") {
    return (
      /** @type {YXmlElement<{[key:string]:string}>} */
      this.get(t, At)
    );
  }
  /**
   * @param {string} [name]
   * @return {YXmlFragment}
   *
   * @public
   */
  getXmlFragment(t = "") {
    return this.get(t, ct);
  }
  /**
   * Converts the entire document into a js object, recursively traversing each yjs type
   * Doesn't log types that have not been defined (using ydoc.getType(..)).
   *
   * @deprecated Do not use this method and rather call toJSON directly on the shared types.
   *
   * @return {Object<string, any>}
   */
  toJSON() {
    const t = {};
    return this.share.forEach((e, s) => {
      t[s] = e.toJSON();
    }), t;
  }
  /**
   * Emit `destroy` event and unregister all event handlers.
   */
  destroy() {
    this.isDestroyed = !0, it(this.subdocs).forEach((e) => e.destroy());
    const t = this._item;
    if (t !== null) {
      this._item = null;
      const e = (
        /** @type {ContentDoc} */
        t.content
      );
      e.doc = new dt({ guid: this.guid, ...e.opts, shouldLoad: !1 }), e.doc._item = t, _(
        /** @type {any} */
        t.parent.doc,
        (s) => {
          const i = e.doc;
          t.deleted || s.subdocsAdded.add(i), s.subdocsRemoved.add(this);
        },
        null,
        !0
      );
    }
    this.emit("destroyed", [!0]), this.emit("destroy", [this]), super.destroy();
  }
}
class Gr {
  constructor() {
    this.restEncoder = Be();
  }
  toUint8Array() {
    return F(this.restEncoder);
  }
  resetDsCurVal() {
  }
  /**
   * @param {number} clock
   */
  writeDsClock(t) {
    y(this.restEncoder, t);
  }
  /**
   * @param {number} len
   */
  writeDsLen(t) {
    y(this.restEncoder, t);
  }
}
class Hr extends Gr {
  /**
   * @param {ID} id
   */
  writeLeftID(t) {
    y(this.restEncoder, t.client), y(this.restEncoder, t.clock);
  }
  /**
   * @param {ID} id
   */
  writeRightID(t) {
    y(this.restEncoder, t.client), y(this.restEncoder, t.clock);
  }
  /**
   * Use writeClient and writeClock instead of writeID if possible.
   * @param {number} client
   */
  writeClient(t) {
    y(this.restEncoder, t);
  }
  /**
   * @param {number} info An unsigned 8-bit integer
   */
  writeInfo(t) {
    Se(this.restEncoder, t);
  }
  /**
   * @param {string} s
   */
  writeString(t) {
    tt(this.restEncoder, t);
  }
  /**
   * @param {boolean} isYKey
   */
  writeParentInfo(t) {
    y(this.restEncoder, t ? 1 : 0);
  }
  /**
   * @param {number} info An unsigned 8-bit integer
   */
  writeTypeRef(t) {
    y(this.restEncoder, t);
  }
  /**
   * Write len of a struct - well suited for Opt RLE encoder.
   *
   * @param {number} len
   */
  writeLen(t) {
    y(this.restEncoder, t);
  }
  /**
   * @param {any} any
   */
  writeAny(t) {
    yt(this.restEncoder, t);
  }
  /**
   * @param {Uint8Array} buf
   */
  writeBuf(t) {
    M(this.restEncoder, t);
  }
  /**
   * @param {any} embed
   */
  writeJSON(t) {
    tt(this.restEncoder, JSON.stringify(t));
  }
  /**
   * @param {string} key
   */
  writeKey(t) {
    tt(this.restEncoder, t);
  }
}
class Wr {
  constructor() {
    this.restEncoder = Be(), this.dsCurrVal = 0;
  }
  toUint8Array() {
    return F(this.restEncoder);
  }
  resetDsCurVal() {
    this.dsCurrVal = 0;
  }
  /**
   * @param {number} clock
   */
  writeDsClock(t) {
    const e = t - this.dsCurrVal;
    this.dsCurrVal = t, y(this.restEncoder, e);
  }
  /**
   * @param {number} len
   */
  writeDsLen(t) {
    t === 0 && N(), y(this.restEncoder, t - 1), this.dsCurrVal += t;
  }
}
class Jr extends Wr {
  constructor() {
    super(), this.keyMap = /* @__PURE__ */ new Map(), this.keyClock = 0, this.keyClockEncoder = new ge(), this.clientEncoder = new Rt(), this.leftClockEncoder = new ge(), this.rightClockEncoder = new ge(), this.infoEncoder = new pn(Se), this.stringEncoder = new Ci(), this.parentInfoEncoder = new pn(Se), this.typeRefEncoder = new Rt(), this.lenEncoder = new Rt();
  }
  toUint8Array() {
    const t = Be();
    return y(t, 0), M(t, this.keyClockEncoder.toUint8Array()), M(t, this.clientEncoder.toUint8Array()), M(t, this.leftClockEncoder.toUint8Array()), M(t, this.rightClockEncoder.toUint8Array()), M(t, F(this.infoEncoder)), M(t, this.stringEncoder.toUint8Array()), M(t, F(this.parentInfoEncoder)), M(t, this.typeRefEncoder.toUint8Array()), M(t, this.lenEncoder.toUint8Array()), je(t, F(this.restEncoder)), F(t);
  }
  /**
   * @param {ID} id
   */
  writeLeftID(t) {
    this.clientEncoder.write(t.client), this.leftClockEncoder.write(t.clock);
  }
  /**
   * @param {ID} id
   */
  writeRightID(t) {
    this.clientEncoder.write(t.client), this.rightClockEncoder.write(t.clock);
  }
  /**
   * @param {number} client
   */
  writeClient(t) {
    this.clientEncoder.write(t);
  }
  /**
   * @param {number} info An unsigned 8-bit integer
   */
  writeInfo(t) {
    this.infoEncoder.write(t);
  }
  /**
   * @param {string} s
   */
  writeString(t) {
    this.stringEncoder.write(t);
  }
  /**
   * @param {boolean} isYKey
   */
  writeParentInfo(t) {
    this.parentInfoEncoder.write(t ? 1 : 0);
  }
  /**
   * @param {number} info An unsigned 8-bit integer
   */
  writeTypeRef(t) {
    this.typeRefEncoder.write(t);
  }
  /**
   * Write len of a struct - well suited for Opt RLE encoder.
   *
   * @param {number} len
   */
  writeLen(t) {
    this.lenEncoder.write(t);
  }
  /**
   * @param {any} any
   */
  writeAny(t) {
    yt(this.restEncoder, t);
  }
  /**
   * @param {Uint8Array} buf
   */
  writeBuf(t) {
    M(this.restEncoder, t);
  }
  /**
   * This is mainly here for legacy purposes.
   *
   * Initial we incoded objects using JSON. Now we use the much faster lib0/any-encoder. This method mainly exists for legacy purposes for the v1 encoder.
   *
   * @param {any} embed
   */
  writeJSON(t) {
    yt(this.restEncoder, t);
  }
  /**
   * Property keys are often reused. For example, in y-prosemirror the key `bold` might
   * occur very often. For a 3d application, the key `position` might occur very often.
   *
   * We cache these keys in a Map and refer to them via a unique number.
   *
   * @param {string} key
   */
  writeKey(t) {
    const e = this.keyMap.get(t);
    e === void 0 ? (this.keyClockEncoder.write(this.keyClock++), this.stringEncoder.write(t)) : this.keyClockEncoder.write(e);
  }
}
const Xr = (n, t, e, s) => {
  s = J(s, t[0].id.clock);
  const i = V(t, s);
  y(n.restEncoder, t.length - i), n.writeClient(e), y(n.restEncoder, s);
  const r = t[i];
  r.write(n, s - r.id.clock);
  for (let o = i + 1; o < t.length; o++)
    t[o].write(n, 0);
}, qr = (n, t, e) => {
  const s = /* @__PURE__ */ new Map();
  e.forEach((i, r) => {
    x(t, r) > i && s.set(r, i);
  }), Qe(t).forEach((i, r) => {
    e.has(r) || s.set(r, 0);
  }), y(n.restEncoder, s.size), it(s.entries()).sort((i, r) => r[0] - i[0]).forEach(([i, r]) => {
    Xr(
      n,
      /** @type {Array<GC|Item>} */
      t.clients.get(i),
      i,
      r
    );
  });
}, Kr = (n, t) => qr(n, t.doc.store, t.beforeState);
class Pr {
  constructor() {
    this.l = [];
  }
}
const En = () => new Pr(), Cn = (n, t) => n.l.push(t), An = (n, t) => {
  const e = n.l, s = e.length;
  n.l = e.filter((i) => t !== i), s === n.l.length && console.error("[yjs] Tried to remove event handler that doesn't exist.");
}, _s = (n, t, e) => Ge(n.l, [t, e]);
class Ut {
  /**
   * @param {number} client client id
   * @param {number} clock unique per client id, continuous number
   */
  constructor(t, e) {
    this.client = t, this.clock = e;
  }
}
const Q = (n, t) => n === t || n !== null && t !== null && n.client === t.client && n.clock === t.clock, w = (n, t) => new Ut(n, t), ks = (n) => {
  for (const [t, e] of n.doc.share.entries())
    if (e === n)
      return t;
  throw N();
}, Ht = (n, t) => {
  for (; t !== null; ) {
    if (t.parent === n)
      return !0;
    t = /** @type {AbstractType<any>} */
    t.parent._item;
  }
  return !1;
};
class bs {
  /**
   * @param {ID|null} type
   * @param {string|null} tname
   * @param {ID|null} item
   * @param {number} assoc
   */
  constructor(t, e, s, i = 0) {
    this.type = t, this.tname = e, this.item = s, this.assoc = i;
  }
}
const In = (n) => {
  const t = {};
  return n.type && (t.type = n.type), n.tname && (t.tname = n.tname), n.item && (t.item = n.item), n.assoc != null && (t.assoc = n.assoc), t;
}, St = (n) => new bs(n.type == null ? null : w(n.type.client, n.type.clock), n.tname ?? null, n.item == null ? null : w(n.item.client, n.item.clock), n.assoc == null ? 0 : n.assoc);
class Zr {
  /**
   * @param {AbstractType<any>} type
   * @param {number} index
   * @param {number} [assoc]
   */
  constructor(t, e, s = 0) {
    this.type = t, this.index = e, this.assoc = s;
  }
}
const Qr = (n, t, e = 0) => new Zr(n, t, e), Mt = (n, t, e) => {
  let s = null, i = null;
  return n._item === null ? i = ks(n) : s = w(n._item.id.client, n._item.id.clock), new bs(s, i, t, e);
}, Ie = (n, t, e = 0) => {
  let s = n._start;
  if (e < 0) {
    if (t === 0)
      return Mt(n, null, e);
    t--;
  }
  for (; s !== null; ) {
    if (!s.deleted && s.countable) {
      if (s.length > t)
        return Mt(n, w(s.id.client, s.id.clock + t), e);
      t -= s.length;
    }
    if (s.right === null && e < 0)
      return Mt(n, s.lastId, e);
    s = s.right;
  }
  return Mt(n, null, e);
}, to = (n, t) => {
  const e = nt(n, t), s = t.clock - e.id.clock;
  return {
    item: e,
    diff: s
  };
}, xe = (n, t, e = !0) => {
  const s = t.store, i = n.item, r = n.type, o = n.tname, l = n.assoc;
  let c = null, h = 0;
  if (i !== null) {
    if (x(s, i.client) <= i.clock)
      return null;
    const u = e ? Me(s, i) : to(s, i), a = u.item;
    if (!(a instanceof k))
      return null;
    if (c = /** @type {AbstractType<any>} */
    a.parent, c._item === null || !c._item.deleted) {
      h = a.deleted || !a.countable ? 0 : u.diff + (l >= 0 ? 0 : 1);
      let f = a.left;
      for (; f !== null; )
        !f.deleted && f.countable && (h += f.length), f = f.left;
    }
  } else {
    if (o !== null)
      c = t.get(o);
    else if (r !== null) {
      if (x(s, r.client) <= r.clock)
        return null;
      const { item: u } = e ? Me(s, r) : { item: nt(s, r) };
      if (u instanceof k && u.content instanceof z)
        c = u.content.type;
      else
        return null;
    } else
      throw N();
    l >= 0 ? h = c._length : h = 0;
  }
  return Qr(c, h, n.assoc);
}, xn = (n, t) => n === t || n !== null && t !== null && n.tname === t.tname && Q(n.item, t.item) && Q(n.type, t.type) && n.assoc === t.assoc, Z = (n, t) => t === void 0 ? !n.deleted : t.sv.has(n.id.client) && (t.sv.get(n.id.client) || 0) > n.id.clock && !Tt(t.ds, n.id), Te = (n, t) => {
  const e = at(n.meta, Te, st), s = n.doc.store;
  e.has(t) || (t.sv.forEach((i, r) => {
    i < x(s, r) && O(n, w(r, i));
  }), lt(n, t.ds, (i) => {
  }), e.add(t));
};
class eo {
  constructor() {
    this.clients = /* @__PURE__ */ new Map(), this.pendingStructs = null, this.pendingDs = null;
  }
}
const Qe = (n) => {
  const t = /* @__PURE__ */ new Map();
  return n.clients.forEach((e, s) => {
    const i = e[e.length - 1];
    t.set(s, i.id.clock + i.length);
  }), t;
}, x = (n, t) => {
  const e = n.clients.get(t);
  if (e === void 0)
    return 0;
  const s = e[e.length - 1];
  return s.id.clock + s.length;
}, Ss = (n, t) => {
  let e = n.clients.get(t.id.client);
  if (e === void 0)
    e = [], n.clients.set(t.id.client, e);
  else {
    const s = e[e.length - 1];
    if (s.id.clock + s.length !== t.id.clock)
      throw N();
  }
  e.push(t);
}, V = (n, t) => {
  let e = 0, s = n.length - 1, i = n[s], r = i.id.clock;
  if (r === t)
    return s;
  let o = B(t / (r + i.length - 1) * s);
  for (; e <= s; ) {
    if (i = n[o], r = i.id.clock, r <= t) {
      if (t < r + i.length)
        return o;
      e = o + 1;
    } else
      s = o - 1;
    o = B((e + s) / 2);
  }
  throw N();
}, no = (n, t) => {
  const e = n.clients.get(t.client);
  return e[V(e, t.clock)];
}, nt = (
  /** @type {function(StructStore,ID):Item} */
  no
), De = (n, t, e) => {
  const s = V(t, e), i = t[s];
  return i.id.clock < e && i instanceof k ? (t.splice(s + 1, 0, Ys(n, i, e - i.id.clock)), s + 1) : s;
}, O = (n, t) => {
  const e = (
    /** @type {Array<Item>} */
    n.doc.store.clients.get(t.client)
  );
  return e[De(n, e, t.clock)];
}, Tn = (n, t, e) => {
  const s = t.clients.get(e.client), i = V(s, e.clock), r = s[i];
  return e.clock !== r.id.clock + r.length - 1 && r.constructor !== G && s.splice(i + 1, 0, Ys(n, r, e.clock - r.id.clock + 1)), r;
}, so = (n, t, e) => {
  const s = (
    /** @type {Array<GC|Item>} */
    n.clients.get(t.id.client)
  );
  s[V(s, t.id.clock)] = e;
}, Es = (n, t, e, s, i) => {
  if (s === 0)
    return;
  const r = e + s;
  let o = De(n, t, e), l;
  do
    l = t[o++], r < l.id.clock + l.length && De(n, t, r), i(l);
  while (o < t.length && t[o].id.clock < r);
};
class io {
  /**
   * @param {Doc} doc
   * @param {any} origin
   * @param {boolean} local
   */
  constructor(t, e, s) {
    this.doc = t, this.deleteSet = new Ke(), this.beforeState = Qe(t.store), this.afterState = /* @__PURE__ */ new Map(), this.changed = /* @__PURE__ */ new Map(), this.changedParentTypes = /* @__PURE__ */ new Map(), this._mergeStructs = [], this.origin = e, this.meta = /* @__PURE__ */ new Map(), this.local = s, this.subdocsAdded = /* @__PURE__ */ new Set(), this.subdocsRemoved = /* @__PURE__ */ new Set(), this.subdocsLoaded = /* @__PURE__ */ new Set(), this._needFormattingCleanup = !1;
  }
}
const Dn = (n, t) => t.deleteSet.clients.size === 0 && !Zs(t.afterState, (e, s) => t.beforeState.get(s) !== e) ? !1 : (Pe(t.deleteSet), Kr(n, t), zr(n, t.deleteSet), !0), On = (n, t, e) => {
  const s = t._item;
  (s === null || s.id.clock < (n.beforeState.get(s.id.client) || 0) && !s.deleted) && at(n.changed, t, st).add(e);
}, Ft = (n, t) => {
  let e = n[t], s = n[t - 1], i = t;
  for (; i > 0; e = s, s = n[--i - 1]) {
    if (s.deleted === e.deleted && s.constructor === e.constructor && s.mergeWith(e)) {
      e instanceof k && e.parentSub !== null && /** @type {AbstractType<any>} */
      e.parent._map.get(e.parentSub) === e && e.parent._map.set(
        e.parentSub,
        /** @type {Item} */
        s
      );
      continue;
    }
    break;
  }
  const r = t - i;
  return r && n.splice(t + 1 - r, r), r;
}, ro = (n, t, e) => {
  for (const [s, i] of n.clients.entries()) {
    const r = (
      /** @type {Array<GC|Item>} */
      t.clients.get(s)
    );
    for (let o = i.length - 1; o >= 0; o--) {
      const l = i[o], c = l.clock + l.len;
      for (let h = V(r, l.clock), u = r[h]; h < r.length && u.id.clock < c; u = r[++h]) {
        const a = r[h];
        if (l.clock + l.len <= a.id.clock)
          break;
        a instanceof k && a.deleted && !a.keep && e(a) && a.gc(t, !1);
      }
    }
  }
}, oo = (n, t) => {
  n.clients.forEach((e, s) => {
    const i = (
      /** @type {Array<GC|Item>} */
      t.clients.get(s)
    );
    for (let r = e.length - 1; r >= 0; r--) {
      const o = e[r], l = Fe(i.length - 1, 1 + V(i, o.clock + o.len - 1));
      for (let c = l, h = i[c]; c > 0 && h.id.clock >= o.clock; h = i[c])
        c -= 1 + Ft(i, c);
    }
  });
}, Cs = (n, t) => {
  if (t < n.length) {
    const e = n[t], s = e.doc, i = s.store, r = e.deleteSet, o = e._mergeStructs;
    try {
      Pe(r), e.afterState = Qe(e.doc.store), s.emit("beforeObserverCalls", [e, s]);
      const l = [];
      e.changed.forEach(
        (c, h) => l.push(() => {
          (h._item === null || !h._item.deleted) && h._callObserver(e, c);
        })
      ), l.push(() => {
        e.changedParentTypes.forEach((c, h) => {
          h._dEH.l.length > 0 && (h._item === null || !h._item.deleted) && (c = c.filter(
            (u) => u.target._item === null || !u.target._item.deleted
          ), c.forEach((u) => {
            u.currentTarget = h, u._path = null;
          }), c.sort((u, a) => u.path.length - a.path.length), l.push(() => {
            _s(h._dEH, c, e);
          }));
        }), l.push(() => s.emit("afterTransaction", [e, s])), l.push(() => {
          e._needFormattingCleanup && ko(e);
        });
      }), Ge(l, []);
    } finally {
      s.gc && ro(r, i, s.gcFilter), oo(r, i), e.afterState.forEach((u, a) => {
        const f = e.beforeState.get(a) || 0;
        if (f !== u) {
          const d = (
            /** @type {Array<GC|Item>} */
            i.clients.get(a)
          ), g = J(V(d, f), 1);
          for (let p = d.length - 1; p >= g; )
            p -= 1 + Ft(d, p);
        }
      });
      for (let u = o.length - 1; u >= 0; u--) {
        const { client: a, clock: f } = o[u].id, d = (
          /** @type {Array<GC|Item>} */
          i.clients.get(a)
        ), g = V(d, f);
        g + 1 < d.length && Ft(d, g + 1) > 1 || g > 0 && Ft(d, g);
      }
      if (!e.local && e.afterState.get(s.clientID) !== e.beforeState.get(s.clientID) && (Vr(qe, as, "[yjs] ", us, ds, "Changed the client-id because another client seems to be using it."), s.clientID = ys()), s.emit("afterTransactionCleanup", [e, s]), s._observers.has("update")) {
        const u = new Hr();
        Dn(u, e) && s.emit("update", [u.toUint8Array(), e.origin, s, e]);
      }
      if (s._observers.has("updateV2")) {
        const u = new Jr();
        Dn(u, e) && s.emit("updateV2", [u.toUint8Array(), e.origin, s, e]);
      }
      const { subdocsAdded: l, subdocsLoaded: c, subdocsRemoved: h } = e;
      (l.size > 0 || h.size > 0 || c.size > 0) && (l.forEach((u) => {
        u.clientID = s.clientID, u.collectionid == null && (u.collectionid = s.collectionid), s.subdocs.add(u);
      }), h.forEach((u) => s.subdocs.delete(u)), s.emit("subdocs", [{ loaded: c, added: l, removed: h }, s, e]), h.forEach((u) => u.destroy())), n.length <= t + 1 ? (s._transactionCleanups = [], s.emit("afterAllTransactions", [s, n])) : Cs(n, t + 1);
    }
  }
}, _ = (n, t, e = null, s = !0) => {
  const i = n._transactionCleanups;
  let r = !1, o = null;
  n._transaction === null && (r = !0, n._transaction = new io(n, e, s), i.push(n._transaction), i.length === 1 && n.emit("beforeAllTransactions", [n]), n.emit("beforeTransaction", [n._transaction, n]));
  try {
    o = t(n._transaction);
  } finally {
    if (r) {
      const l = n._transaction === i[0];
      n._transaction = null, l && Cs(i, 0);
    }
  }
  return o;
};
class lo {
  /**
   * @param {DeleteSet} deletions
   * @param {DeleteSet} insertions
   */
  constructor(t, e) {
    this.insertions = e, this.deletions = t, this.meta = /* @__PURE__ */ new Map();
  }
}
const Mn = (n, t, e) => {
  lt(n, e.deletions, (s) => {
    s instanceof k && t.scope.some((i) => i === n.doc || Ht(
      /** @type {AbstractType<any>} */
      i,
      s
    )) && sn(s, !1);
  });
}, Ln = (n, t, e) => {
  let s = null;
  const i = n.doc, r = n.scope;
  _(i, (l) => {
    for (; t.length > 0 && n.currStackItem === null; ) {
      const c = i.store, h = (
        /** @type {StackItem} */
        t.pop()
      ), u = /* @__PURE__ */ new Set(), a = [];
      let f = !1;
      lt(l, h.insertions, (d) => {
        if (d instanceof k) {
          if (d.redone !== null) {
            let { item: g, diff: p } = Me(c, d.id);
            p > 0 && (g = O(l, w(g.id.client, g.id.clock + p))), d = g;
          }
          !d.deleted && r.some((g) => g === l.doc || Ht(
            /** @type {AbstractType<any>} */
            g,
            /** @type {Item} */
            d
          )) && a.push(d);
        }
      }), lt(l, h.deletions, (d) => {
        d instanceof k && r.some((g) => g === l.doc || Ht(
          /** @type {AbstractType<any>} */
          g,
          d
        )) && // Never redo structs in stackItem.insertions because they were created and deleted in the same capture interval.
        !Tt(h.insertions, d.id) && u.add(d);
      }), u.forEach((d) => {
        f = zs(l, d, u, h.insertions, n.ignoreRemoteMapChanges, n) !== null || f;
      });
      for (let d = a.length - 1; d >= 0; d--) {
        const g = a[d];
        n.deleteFilter(g) && (g.delete(l), f = !0);
      }
      n.currStackItem = f ? h : null;
    }
    l.changed.forEach((c, h) => {
      c.has(null) && h._searchMarker && (h._searchMarker.length = 0);
    }), s = l;
  }, n);
  const o = n.currStackItem;
  if (o != null) {
    const l = s.changedParentTypes;
    n.emit("stack-item-popped", [{ stackItem: o, type: e, changedParentTypes: l, origin: n }, n]), n.currStackItem = null;
  }
  return o;
};
class As extends Vn {
  /**
   * @param {Doc|AbstractType<any>|Array<AbstractType<any>>} typeScope Limits the scope of the UndoManager. If this is set to a ydoc instance, all changes on that ydoc will be undone. If set to a specific type, only changes on that type or its children will be undone. Also accepts an array of types.
   * @param {UndoManagerOptions} options
   */
  constructor(t, {
    captureTimeout: e = 500,
    captureTransaction: s = (c) => !0,
    deleteFilter: i = () => !0,
    trackedOrigins: r = /* @__PURE__ */ new Set([null]),
    ignoreRemoteMapChanges: o = !1,
    doc: l = (
      /** @type {Doc} */
      rt(t) ? t[0].doc : t instanceof dt ? t : t.doc
    )
  } = {}) {
    super(), this.scope = [], this.doc = l, this.addToScope(t), this.deleteFilter = i, r.add(this), this.trackedOrigins = r, this.captureTransaction = s, this.undoStack = [], this.redoStack = [], this.undoing = !1, this.redoing = !1, this.currStackItem = null, this.lastChange = 0, this.ignoreRemoteMapChanges = o, this.captureTimeout = e, this.afterTransactionHandler = (c) => {
      if (!this.captureTransaction(c) || !this.scope.some((b) => c.changedParentTypes.has(
        /** @type {AbstractType<any>} */
        b
      ) || b === this.doc) || !this.trackedOrigins.has(c.origin) && (!c.origin || !this.trackedOrigins.has(c.origin.constructor)))
        return;
      const h = this.undoing, u = this.redoing, a = h ? this.redoStack : this.undoStack;
      h ? this.stopCapturing() : u || this.clear(!1, !0);
      const f = new Ke();
      c.afterState.forEach((b, m) => {
        const X = c.beforeState.get(m) || 0, q = b - X;
        q > 0 && Ze(f, m, X, q);
      });
      const d = Ti();
      let g = !1;
      if (this.lastChange > 0 && d - this.lastChange < this.captureTimeout && a.length > 0 && !h && !u) {
        const b = a[a.length - 1];
        b.deletions = Sn([b.deletions, c.deleteSet]), b.insertions = Sn([b.insertions, f]);
      } else
        a.push(new lo(c.deleteSet, f)), g = !0;
      !h && !u && (this.lastChange = d), lt(
        c,
        c.deleteSet,
        /** @param {Item|GC} item */
        (b) => {
          b instanceof k && this.scope.some((m) => m === c.doc || Ht(
            /** @type {AbstractType<any>} */
            m,
            b
          )) && sn(b, !0);
        }
      );
      const p = [{ stackItem: a[a.length - 1], origin: c.origin, type: h ? "redo" : "undo", changedParentTypes: c.changedParentTypes }, this];
      g ? this.emit("stack-item-added", p) : this.emit("stack-item-updated", p);
    }, this.doc.on("afterTransaction", this.afterTransactionHandler), this.doc.on("destroy", () => {
      this.destroy();
    });
  }
  /**
   * Extend the scope.
   *
   * @param {Array<AbstractType<any> | Doc> | AbstractType<any> | Doc} ytypes
   */
  addToScope(t) {
    const e = new Set(this.scope);
    t = rt(t) ? t : [t], t.forEach((s) => {
      e.has(s) || (e.add(s), (s instanceof C ? s.doc !== this.doc : s !== this.doc) && gs("[yjs#509] Not same Y.Doc"), this.scope.push(s));
    });
  }
  /**
   * @param {any} origin
   */
  addTrackedOrigin(t) {
    this.trackedOrigins.add(t);
  }
  /**
   * @param {any} origin
   */
  removeTrackedOrigin(t) {
    this.trackedOrigins.delete(t);
  }
  clear(t = !0, e = !0) {
    (t && this.canUndo() || e && this.canRedo()) && this.doc.transact((s) => {
      t && (this.undoStack.forEach((i) => Mn(s, this, i)), this.undoStack = []), e && (this.redoStack.forEach((i) => Mn(s, this, i)), this.redoStack = []), this.emit("stack-cleared", [{ undoStackCleared: t, redoStackCleared: e }]);
    });
  }
  /**
   * UndoManager merges Undo-StackItem if they are created within time-gap
   * smaller than `options.captureTimeout`. Call `um.stopCapturing()` so that the next
   * StackItem won't be merged.
   *
   *
   * @example
   *     // without stopCapturing
   *     ytext.insert(0, 'a')
   *     ytext.insert(1, 'b')
   *     um.undo()
   *     ytext.toString() // => '' (note that 'ab' was removed)
   *     // with stopCapturing
   *     ytext.insert(0, 'a')
   *     um.stopCapturing()
   *     ytext.insert(0, 'b')
   *     um.undo()
   *     ytext.toString() // => 'a' (note that only 'b' was removed)
   *
   */
  stopCapturing() {
    this.lastChange = 0;
  }
  /**
   * Undo last changes on type.
   *
   * @return {StackItem?} Returns StackItem if a change was applied
   */
  undo() {
    this.undoing = !0;
    let t;
    try {
      t = Ln(this, this.undoStack, "undo");
    } finally {
      this.undoing = !1;
    }
    return t;
  }
  /**
   * Redo last undo operation.
   *
   * @return {StackItem?} Returns StackItem if a change was applied
   */
  redo() {
    this.redoing = !0;
    let t;
    try {
      t = Ln(this, this.redoStack, "redo");
    } finally {
      this.redoing = !1;
    }
    return t;
  }
  /**
   * Are undo steps available?
   *
   * @return {boolean} `true` if undo is possible
   */
  canUndo() {
    return this.undoStack.length > 0;
  }
  /**
   * Are redo steps available?
   *
   * @return {boolean} `true` if redo is possible
   */
  canRedo() {
    return this.redoStack.length > 0;
  }
  destroy() {
    this.trackedOrigins.delete(this), this.doc.off("afterTransaction", this.afterTransactionHandler), super.destroy();
  }
}
const vn = "You must not compute changes after the event-handler fired.";
class se {
  /**
   * @param {T} target The changed type.
   * @param {Transaction} transaction
   */
  constructor(t, e) {
    this.target = t, this.currentTarget = t, this.transaction = e, this._changes = null, this._keys = null, this._delta = null, this._path = null;
  }
  /**
   * Computes the path from `y` to the changed type.
   *
   * @todo v14 should standardize on path: Array<{parent, index}> because that is easier to work with.
   *
   * The following property holds:
   * @example
   *   let type = y
   *   event.path.forEach(dir => {
   *     type = type.get(dir)
   *   })
   *   type === event.target // => true
   */
  get path() {
    return this._path || (this._path = co(this.currentTarget, this.target));
  }
  /**
   * Check if a struct is deleted by this event.
   *
   * In contrast to change.deleted, this method also returns true if the struct was added and then deleted.
   *
   * @param {AbstractStruct} struct
   * @return {boolean}
   */
  deletes(t) {
    return Tt(this.transaction.deleteSet, t.id);
  }
  /**
   * @type {Map<string, { action: 'add' | 'update' | 'delete', oldValue: any }>}
   */
  get keys() {
    if (this._keys === null) {
      if (this.transaction.doc._transactionCleanups.length === 0)
        throw W(vn);
      const t = /* @__PURE__ */ new Map(), e = this.target;
      /** @type Set<string|null> */
      this.transaction.changed.get(e).forEach((i) => {
        if (i !== null) {
          const r = (
            /** @type {Item} */
            e._map.get(i)
          );
          let o, l;
          if (this.adds(r)) {
            let c = r.left;
            for (; c !== null && this.adds(c); )
              c = c.left;
            if (this.deletes(r))
              if (c !== null && this.deletes(c))
                o = "delete", l = ae(c.content.getContent());
              else
                return;
            else
              c !== null && this.deletes(c) ? (o = "update", l = ae(c.content.getContent())) : (o = "add", l = void 0);
          } else if (this.deletes(r))
            o = "delete", l = ae(
              /** @type {Item} */
              r.content.getContent()
            );
          else
            return;
          t.set(i, { action: o, oldValue: l });
        }
      }), this._keys = t;
    }
    return this._keys;
  }
  /**
   * This is a computed property. Note that this can only be safely computed during the
   * event call. Computing this property after other changes happened might result in
   * unexpected behavior (incorrect computation of deltas). A safe way to collect changes
   * is to store the `changes` or the `delta` object. Avoid storing the `transaction` object.
   *
   * @type {Array<{insert?: string | Array<any> | object | AbstractType<any>, retain?: number, delete?: number, attributes?: Object<string, any>}>}
   */
  get delta() {
    return this.changes.delta;
  }
  /**
   * Check if a struct is added by this event.
   *
   * In contrast to change.deleted, this method also returns true if the struct was added and then deleted.
   *
   * @param {AbstractStruct} struct
   * @return {boolean}
   */
  adds(t) {
    return t.id.clock >= (this.transaction.beforeState.get(t.id.client) || 0);
  }
  /**
   * This is a computed property. Note that this can only be safely computed during the
   * event call. Computing this property after other changes happened might result in
   * unexpected behavior (incorrect computation of deltas). A safe way to collect changes
   * is to store the `changes` or the `delta` object. Avoid storing the `transaction` object.
   *
   * @type {{added:Set<Item>,deleted:Set<Item>,keys:Map<string,{action:'add'|'update'|'delete',oldValue:any}>,delta:Array<{insert?:Array<any>|string, delete?:number, retain?:number}>}}
   */
  get changes() {
    let t = this._changes;
    if (t === null) {
      if (this.transaction.doc._transactionCleanups.length === 0)
        throw W(vn);
      const e = this.target, s = st(), i = st(), r = [];
      if (t = {
        added: s,
        deleted: i,
        delta: r,
        keys: this.keys
      }, /** @type Set<string|null> */
      this.transaction.changed.get(e).has(null)) {
        let l = null;
        const c = () => {
          l && r.push(l);
        };
        for (let h = e._start; h !== null; h = h.right)
          h.deleted ? this.deletes(h) && !this.adds(h) && ((l === null || l.delete === void 0) && (c(), l = { delete: 0 }), l.delete += h.length, i.add(h)) : this.adds(h) ? ((l === null || l.insert === void 0) && (c(), l = { insert: [] }), l.insert = l.insert.concat(h.content.getContent()), s.add(h)) : ((l === null || l.retain === void 0) && (c(), l = { retain: 0 }), l.retain += h.length);
        l !== null && l.retain === void 0 && c();
      }
      this._changes = t;
    }
    return (
      /** @type {any} */
      t
    );
  }
}
const co = (n, t) => {
  const e = [];
  for (; t._item !== null && t !== n; ) {
    if (t._item.parentSub !== null)
      e.unshift(t._item.parentSub);
    else {
      let s = 0, i = (
        /** @type {AbstractType<any>} */
        t._item.parent._start
      );
      for (; i !== t._item && i !== null; )
        !i.deleted && i.countable && (s += i.length), i = i.right;
      e.unshift(s);
    }
    t = /** @type {AbstractType<any>} */
    t._item.parent;
  }
  return e;
}, T = () => {
  gs("Invalid access: Add Yjs type to a document before reading data.");
}, Is = 80;
let tn = 0;
class ho {
  /**
   * @param {Item} p
   * @param {number} index
   */
  constructor(t, e) {
    t.marker = !0, this.p = t, this.index = e, this.timestamp = tn++;
  }
}
const ao = (n) => {
  n.timestamp = tn++;
}, xs = (n, t, e) => {
  n.p.marker = !1, n.p = t, t.marker = !0, n.index = e, n.timestamp = tn++;
}, uo = (n, t, e) => {
  if (n.length >= Is) {
    const s = n.reduce((i, r) => i.timestamp < r.timestamp ? i : r);
    return xs(s, t, e), s;
  } else {
    const s = new ho(t, e);
    return n.push(s), s;
  }
}, ie = (n, t) => {
  if (n._start === null || t === 0 || n._searchMarker === null)
    return null;
  const e = n._searchMarker.length === 0 ? null : n._searchMarker.reduce((r, o) => $t(t - r.index) < $t(t - o.index) ? r : o);
  let s = n._start, i = 0;
  for (e !== null && (s = e.p, i = e.index, ao(e)); s.right !== null && i < t; ) {
    if (!s.deleted && s.countable) {
      if (t < i + s.length)
        break;
      i += s.length;
    }
    s = s.right;
  }
  for (; s.left !== null && i > t; )
    s = s.left, !s.deleted && s.countable && (i -= s.length);
  for (; s.left !== null && s.left.id.client === s.id.client && s.left.id.clock + s.left.length === s.id.clock; )
    s = s.left, !s.deleted && s.countable && (i -= s.length);
  return e !== null && $t(e.index - i) < /** @type {YText|YArray<any>} */
  s.parent.length / Is ? (xs(e, s, i), e) : uo(n._searchMarker, s, i);
}, Et = (n, t, e) => {
  for (let s = n.length - 1; s >= 0; s--) {
    const i = n[s];
    if (e > 0) {
      let r = i.p;
      for (r.marker = !1; r && (r.deleted || !r.countable); )
        r = r.left, r && !r.deleted && r.countable && (i.index -= r.length);
      if (r === null || r.marker === !0) {
        n.splice(s, 1);
        continue;
      }
      i.p = r, r.marker = !0;
    }
    (t < i.index || e > 0 && t === i.index) && (i.index = J(t, i.index + e));
  }
}, re = (n, t, e) => {
  const s = n, i = t.changedParentTypes;
  for (; at(i, n, () => []).push(e), n._item !== null; )
    n = /** @type {AbstractType<any>} */
    n._item.parent;
  _s(s._eH, e, t);
};
class C {
  constructor() {
    this._item = null, this._map = /* @__PURE__ */ new Map(), this._start = null, this.doc = null, this._length = 0, this._eH = En(), this._dEH = En(), this._searchMarker = null;
  }
  /**
   * @return {AbstractType<any>|null}
   */
  get parent() {
    return this._item ? (
      /** @type {AbstractType<any>} */
      this._item.parent
    ) : null;
  }
  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item|null} item
   */
  _integrate(t, e) {
    this.doc = t, this._item = e;
  }
  /**
   * @return {AbstractType<EventType>}
   */
  _copy() {
    throw v();
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {AbstractType<EventType>}
   */
  clone() {
    throw v();
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} _encoder
   */
  _write(t) {
  }
  /**
   * The first non-deleted item
   */
  get _first() {
    let t = this._start;
    for (; t !== null && t.deleted; )
      t = t.right;
    return t;
  }
  /**
   * Creates YEvent and calls all type observers.
   * Must be implemented by each type.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} _parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver(t, e) {
    !t.local && this._searchMarker && (this._searchMarker.length = 0);
  }
  /**
   * Observe all events that are created on this type.
   *
   * @param {function(EventType, Transaction):void} f Observer function
   */
  observe(t) {
    Cn(this._eH, t);
  }
  /**
   * Observe all events that are created by this type and its children.
   *
   * @param {function(Array<YEvent<any>>,Transaction):void} f Observer function
   */
  observeDeep(t) {
    Cn(this._dEH, t);
  }
  /**
   * Unregister an observer function.
   *
   * @param {function(EventType,Transaction):void} f Observer function
   */
  unobserve(t) {
    An(this._eH, t);
  }
  /**
   * Unregister an observer function.
   *
   * @param {function(Array<YEvent<any>>,Transaction):void} f Observer function
   */
  unobserveDeep(t) {
    An(this._dEH, t);
  }
  /**
   * @abstract
   * @return {any}
   */
  toJSON() {
  }
}
const Ts = (n, t, e) => {
  n.doc ?? T(), t < 0 && (t = n._length + t), e < 0 && (e = n._length + e);
  let s = e - t;
  const i = [];
  let r = n._start;
  for (; r !== null && s > 0; ) {
    if (r.countable && !r.deleted) {
      const o = r.content.getContent();
      if (o.length <= t)
        t -= o.length;
      else {
        for (let l = t; l < o.length && s > 0; l++)
          i.push(o[l]), s--;
        t = 0;
      }
    }
    r = r.right;
  }
  return i;
}, Ds = (n) => {
  n.doc ?? T();
  const t = [];
  let e = n._start;
  for (; e !== null; ) {
    if (e.countable && !e.deleted) {
      const s = e.content.getContent();
      for (let i = 0; i < s.length; i++)
        t.push(s[i]);
    }
    e = e.right;
  }
  return t;
}, Ct = (n, t) => {
  let e = 0, s = n._start;
  for (n.doc ?? T(); s !== null; ) {
    if (s.countable && !s.deleted) {
      const i = s.content.getContent();
      for (let r = 0; r < i.length; r++)
        t(i[r], e++, n);
    }
    s = s.right;
  }
}, Os = (n, t) => {
  const e = [];
  return Ct(n, (s, i) => {
    e.push(t(s, i, n));
  }), e;
}, fo = (n) => {
  let t = n._start, e = null, s = 0;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next: () => {
      if (e === null) {
        for (; t !== null && t.deleted; )
          t = t.right;
        if (t === null)
          return {
            done: !0,
            value: void 0
          };
        e = t.content.getContent(), s = 0, t = t.right;
      }
      const i = e[s++];
      return e.length <= s && (e = null), {
        done: !1,
        value: i
      };
    }
  };
}, Ms = (n, t) => {
  n.doc ?? T();
  const e = ie(n, t);
  let s = n._start;
  for (e !== null && (s = e.p, t -= e.index); s !== null; s = s.right)
    if (!s.deleted && s.countable) {
      if (t < s.length)
        return s.content.getContent()[t];
      t -= s.length;
    }
}, Wt = (n, t, e, s) => {
  let i = e;
  const r = n.doc, o = r.clientID, l = r.store, c = e === null ? t._start : e.right;
  let h = [];
  const u = () => {
    h.length > 0 && (i = new k(w(o, x(l, o)), i, i && i.lastId, c, c && c.id, t, null, new ht(h)), i.integrate(n, 0), h = []);
  };
  s.forEach((a) => {
    if (a === null)
      h.push(a);
    else
      switch (a.constructor) {
        case Number:
        case Object:
        case Boolean:
        case Array:
        case String:
          h.push(a);
          break;
        default:
          switch (u(), a.constructor) {
            case Uint8Array:
            case ArrayBuffer:
              i = new k(w(o, x(l, o)), i, i && i.lastId, c, c && c.id, t, null, new oe(new Uint8Array(
                /** @type {Uint8Array} */
                a
              ))), i.integrate(n, 0);
              break;
            case dt:
              i = new k(w(o, x(l, o)), i, i && i.lastId, c, c && c.id, t, null, new le(
                /** @type {Doc} */
                a
              )), i.integrate(n, 0);
              break;
            default:
              if (a instanceof C)
                i = new k(w(o, x(l, o)), i, i && i.lastId, c, c && c.id, t, null, new z(a)), i.integrate(n, 0);
              else
                throw new Error("Unexpected content type in insert operation");
          }
      }
  }), u();
}, Ls = () => W("Length exceeded!"), vs = (n, t, e, s) => {
  if (e > t._length)
    throw Ls();
  if (e === 0)
    return t._searchMarker && Et(t._searchMarker, e, s.length), Wt(n, t, null, s);
  const i = e, r = ie(t, e);
  let o = t._start;
  for (r !== null && (o = r.p, e -= r.index, e === 0 && (o = o.prev, e += o && o.countable && !o.deleted ? o.length : 0)); o !== null; o = o.right)
    if (!o.deleted && o.countable) {
      if (e <= o.length) {
        e < o.length && O(n, w(o.id.client, o.id.clock + e));
        break;
      }
      e -= o.length;
    }
  return t._searchMarker && Et(t._searchMarker, i, s.length), Wt(n, t, o, s);
}, go = (n, t, e) => {
  let i = (t._searchMarker || []).reduce((r, o) => o.index > r.index ? o : r, { index: 0, p: t._start }).p;
  if (i)
    for (; i.right; )
      i = i.right;
  return Wt(n, t, i, e);
}, $s = (n, t, e, s) => {
  if (s === 0)
    return;
  const i = e, r = s, o = ie(t, e);
  let l = t._start;
  for (o !== null && (l = o.p, e -= o.index); l !== null && e > 0; l = l.right)
    !l.deleted && l.countable && (e < l.length && O(n, w(l.id.client, l.id.clock + e)), e -= l.length);
  for (; s > 0 && l !== null; )
    l.deleted || (s < l.length && O(n, w(l.id.client, l.id.clock + s)), l.delete(n), s -= l.length), l = l.right;
  if (s > 0)
    throw Ls();
  t._searchMarker && Et(
    t._searchMarker,
    i,
    -r + s
    /* in case we remove the above exception */
  );
}, Jt = (n, t, e) => {
  const s = t._map.get(e);
  s !== void 0 && s.delete(n);
}, en = (n, t, e, s) => {
  const i = t._map.get(e) || null, r = n.doc, o = r.clientID;
  let l;
  if (s == null)
    l = new ht([s]);
  else
    switch (s.constructor) {
      case Number:
      case Object:
      case Boolean:
      case Array:
      case String:
      case Date:
      case BigInt:
        l = new ht([s]);
        break;
      case Uint8Array:
        l = new oe(
          /** @type {Uint8Array} */
          s
        );
        break;
      case dt:
        l = new le(
          /** @type {Doc} */
          s
        );
        break;
      default:
        if (s instanceof C)
          l = new z(s);
        else
          throw new Error("Unexpected content type");
    }
  new k(w(o, x(r.store, o)), i, i && i.lastId, null, null, t, e, l).integrate(n, 0);
}, nn = (n, t) => {
  n.doc ?? T();
  const e = n._map.get(t);
  return e !== void 0 && !e.deleted ? e.content.getContent()[e.length - 1] : void 0;
}, Rs = (n) => {
  const t = {};
  return n.doc ?? T(), n._map.forEach((e, s) => {
    e.deleted || (t[s] = e.content.getContent()[e.length - 1]);
  }), t;
}, Ns = (n, t) => {
  n.doc ?? T();
  const e = n._map.get(t);
  return e !== void 0 && !e.deleted;
}, po = (n, t) => {
  const e = {};
  return n._map.forEach((s, i) => {
    let r = s;
    for (; r !== null && (!t.sv.has(r.id.client) || r.id.clock >= (t.sv.get(r.id.client) || 0)); )
      r = r.left;
    r !== null && Z(r, t) && (e[i] = r.content.getContent()[r.length - 1]);
  }), e;
}, Lt = (n) => (n.doc ?? T(), jr(
  n._map.entries(),
  /** @param {any} entry */
  (t) => !t[1].deleted
));
class wo extends se {
}
class wt extends C {
  constructor() {
    super(), this._prelimContent = [], this._searchMarker = [];
  }
  /**
   * Construct a new YArray containing the specified items.
   * @template {Object<string,any>|Array<any>|number|null|string|Uint8Array} T
   * @param {Array<T>} items
   * @return {YArray<T>}
   */
  static from(t) {
    const e = new wt();
    return e.push(t), e;
  }
  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate(t, e) {
    super._integrate(t, e), this.insert(
      0,
      /** @type {Array<any>} */
      this._prelimContent
    ), this._prelimContent = null;
  }
  /**
   * @return {YArray<T>}
   */
  _copy() {
    return new wt();
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YArray<T>}
   */
  clone() {
    const t = new wt();
    return t.insert(0, this.toArray().map(
      (e) => e instanceof C ? (
        /** @type {typeof el} */
        e.clone()
      ) : e
    )), t;
  }
  get length() {
    return this.doc ?? T(), this._length;
  }
  /**
   * Creates YArrayEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver(t, e) {
    super._callObserver(t, e), re(this, t, new wo(this, t));
  }
  /**
   * Inserts new content at an index.
   *
   * Important: This function expects an array of content. Not just a content
   * object. The reason for this "weirdness" is that inserting several elements
   * is very efficient when it is done as a single operation.
   *
   * @example
   *  // Insert character 'a' at position 0
   *  yarray.insert(0, ['a'])
   *  // Insert numbers 1, 2 at position 1
   *  yarray.insert(1, [1, 2])
   *
   * @param {number} index The index to insert content at.
   * @param {Array<T>} content The array of content
   */
  insert(t, e) {
    this.doc !== null ? _(this.doc, (s) => {
      vs(
        s,
        this,
        t,
        /** @type {any} */
        e
      );
    }) : this._prelimContent.splice(t, 0, ...e);
  }
  /**
   * Appends content to this YArray.
   *
   * @param {Array<T>} content Array of content to append.
   *
   * @todo Use the following implementation in all types.
   */
  push(t) {
    this.doc !== null ? _(this.doc, (e) => {
      go(
        e,
        this,
        /** @type {any} */
        t
      );
    }) : this._prelimContent.push(...t);
  }
  /**
   * Prepends content to this YArray.
   *
   * @param {Array<T>} content Array of content to prepend.
   */
  unshift(t) {
    this.insert(0, t);
  }
  /**
   * Deletes elements starting from an index.
   *
   * @param {number} index Index at which to start deleting elements
   * @param {number} length The number of elements to remove. Defaults to 1.
   */
  delete(t, e = 1) {
    this.doc !== null ? _(this.doc, (s) => {
      $s(s, this, t, e);
    }) : this._prelimContent.splice(t, e);
  }
  /**
   * Returns the i-th element from a YArray.
   *
   * @param {number} index The index of the element to return from the YArray
   * @return {T}
   */
  get(t) {
    return Ms(this, t);
  }
  /**
   * Transforms this YArray to a JavaScript Array.
   *
   * @return {Array<T>}
   */
  toArray() {
    return Ds(this);
  }
  /**
   * Returns a portion of this YArray into a JavaScript Array selected
   * from start to end (end not included).
   *
   * @param {number} [start]
   * @param {number} [end]
   * @return {Array<T>}
   */
  slice(t = 0, e = this.length) {
    return Ts(this, t, e);
  }
  /**
   * Transforms this Shared Type to a JSON object.
   *
   * @return {Array<any>}
   */
  toJSON() {
    return this.map((t) => t instanceof C ? t.toJSON() : t);
  }
  /**
   * Returns an Array with the result of calling a provided function on every
   * element of this YArray.
   *
   * @template M
   * @param {function(T,number,YArray<T>):M} f Function that produces an element of the new Array
   * @return {Array<M>} A new array with each element being the result of the
   *                 callback function
   */
  map(t) {
    return Os(
      this,
      /** @type {any} */
      t
    );
  }
  /**
   * Executes a provided function once on every element of this YArray.
   *
   * @param {function(T,number,YArray<T>):void} f A function to execute on every element of this YArray.
   */
  forEach(t) {
    Ct(this, t);
  }
  /**
   * @return {IterableIterator<T>}
   */
  [Symbol.iterator]() {
    return fo(this);
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */
  _write(t) {
    t.writeTypeRef(Io);
  }
}
class mo extends se {
  /**
   * @param {YMap<T>} ymap The YArray that changed.
   * @param {Transaction} transaction
   * @param {Set<any>} subs The keys that changed.
   */
  constructor(t, e, s) {
    super(t, e), this.keysChanged = s;
  }
}
class Xt extends C {
  /**
   *
   * @param {Iterable<readonly [string, any]>=} entries - an optional iterable to initialize the YMap
   */
  constructor(t) {
    super(), this._prelimContent = null, t === void 0 ? this._prelimContent = /* @__PURE__ */ new Map() : this._prelimContent = new Map(t);
  }
  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate(t, e) {
    super._integrate(t, e), this._prelimContent.forEach((s, i) => {
      this.set(i, s);
    }), this._prelimContent = null;
  }
  /**
   * @return {YMap<MapType>}
   */
  _copy() {
    return new Xt();
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YMap<MapType>}
   */
  clone() {
    const t = new Xt();
    return this.forEach((e, s) => {
      t.set(s, e instanceof C ? (
        /** @type {typeof value} */
        e.clone()
      ) : e);
    }), t;
  }
  /**
   * Creates YMapEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver(t, e) {
    re(this, t, new mo(this, t, e));
  }
  /**
   * Transforms this Shared Type to a JSON object.
   *
   * @return {Object<string,any>}
   */
  toJSON() {
    this.doc ?? T();
    const t = {};
    return this._map.forEach((e, s) => {
      if (!e.deleted) {
        const i = e.content.getContent()[e.length - 1];
        t[s] = i instanceof C ? i.toJSON() : i;
      }
    }), t;
  }
  /**
   * Returns the size of the YMap (count of key/value pairs)
   *
   * @return {number}
   */
  get size() {
    return [...Lt(this)].length;
  }
  /**
   * Returns the keys for each element in the YMap Type.
   *
   * @return {IterableIterator<string>}
   */
  keys() {
    return ye(
      Lt(this),
      /** @param {any} v */
      (t) => t[0]
    );
  }
  /**
   * Returns the values for each element in the YMap Type.
   *
   * @return {IterableIterator<MapType>}
   */
  values() {
    return ye(
      Lt(this),
      /** @param {any} v */
      (t) => t[1].content.getContent()[t[1].length - 1]
    );
  }
  /**
   * Returns an Iterator of [key, value] pairs
   *
   * @return {IterableIterator<[string, MapType]>}
   */
  entries() {
    return ye(
      Lt(this),
      /** @param {any} v */
      (t) => (
        /** @type {any} */
        [t[0], t[1].content.getContent()[t[1].length - 1]]
      )
    );
  }
  /**
   * Executes a provided function on once on every key-value pair.
   *
   * @param {function(MapType,string,YMap<MapType>):void} f A function to execute on every element of this YArray.
   */
  forEach(t) {
    this.doc ?? T(), this._map.forEach((e, s) => {
      e.deleted || t(e.content.getContent()[e.length - 1], s, this);
    });
  }
  /**
   * Returns an Iterator of [key, value] pairs
   *
   * @return {IterableIterator<[string, MapType]>}
   */
  [Symbol.iterator]() {
    return this.entries();
  }
  /**
   * Remove a specified element from this YMap.
   *
   * @param {string} key The key of the element to remove.
   */
  delete(t) {
    this.doc !== null ? _(this.doc, (e) => {
      Jt(e, this, t);
    }) : this._prelimContent.delete(t);
  }
  /**
   * Adds or updates an element with a specified key and value.
   * @template {MapType} VAL
   *
   * @param {string} key The key of the element to add to this YMap
   * @param {VAL} value The value of the element to add
   * @return {VAL}
   */
  set(t, e) {
    return this.doc !== null ? _(this.doc, (s) => {
      en(
        s,
        this,
        t,
        /** @type {any} */
        e
      );
    }) : this._prelimContent.set(t, e), e;
  }
  /**
   * Returns a specified element from this YMap.
   *
   * @param {string} key
   * @return {MapType|undefined}
   */
  get(t) {
    return (
      /** @type {any} */
      nn(this, t)
    );
  }
  /**
   * Returns a boolean indicating whether the specified key exists or not.
   *
   * @param {string} key The key to test.
   * @return {boolean}
   */
  has(t) {
    return Ns(this, t);
  }
  /**
   * Removes all elements from this YMap.
   */
  clear() {
    this.doc !== null ? _(this.doc, (t) => {
      this.forEach(function(e, s, i) {
        Jt(t, i, s);
      });
    }) : this._prelimContent.clear();
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */
  _write(t) {
    t.writeTypeRef(xo);
  }
}
const H = (n, t) => n === t || typeof n == "object" && typeof t == "object" && n && t && Ui(n, t);
class Oe {
  /**
   * @param {Item|null} left
   * @param {Item|null} right
   * @param {number} index
   * @param {Map<string,any>} currentAttributes
   */
  constructor(t, e, s, i) {
    this.left = t, this.right = e, this.index = s, this.currentAttributes = i;
  }
  /**
   * Only call this if you know that this.right is defined
   */
  forward() {
    switch (this.right === null && N(), this.right.content.constructor) {
      case A:
        this.right.deleted || ft(
          this.currentAttributes,
          /** @type {ContentFormat} */
          this.right.content
        );
        break;
      default:
        this.right.deleted || (this.index += this.right.length);
        break;
    }
    this.left = this.right, this.right = this.right.right;
  }
}
const $n = (n, t, e) => {
  for (; t.right !== null && e > 0; ) {
    switch (t.right.content.constructor) {
      case A:
        t.right.deleted || ft(
          t.currentAttributes,
          /** @type {ContentFormat} */
          t.right.content
        );
        break;
      default:
        t.right.deleted || (e < t.right.length && O(n, w(t.right.id.client, t.right.id.clock + e)), t.index += t.right.length, e -= t.right.length);
        break;
    }
    t.left = t.right, t.right = t.right.right;
  }
  return t;
}, vt = (n, t, e, s) => {
  const i = /* @__PURE__ */ new Map(), r = s ? ie(t, e) : null;
  if (r) {
    const o = new Oe(r.p.left, r.p, r.index, i);
    return $n(n, o, e - r.index);
  } else {
    const o = new Oe(null, t._start, 0, i);
    return $n(n, o, e);
  }
}, Us = (n, t, e, s) => {
  for (; e.right !== null && (e.right.deleted === !0 || e.right.content.constructor === A && H(
    s.get(
      /** @type {ContentFormat} */
      e.right.content.key
    ),
    /** @type {ContentFormat} */
    e.right.content.value
  )); )
    e.right.deleted || s.delete(
      /** @type {ContentFormat} */
      e.right.content.key
    ), e.forward();
  const i = n.doc, r = i.clientID;
  s.forEach((o, l) => {
    const c = e.left, h = e.right, u = new k(w(r, x(i.store, r)), c, c && c.lastId, h, h && h.id, t, null, new A(l, o));
    u.integrate(n, 0), e.right = u, e.forward();
  });
}, ft = (n, t) => {
  const { key: e, value: s } = t;
  s === null ? n.delete(e) : n.set(e, s);
}, Fs = (n, t) => {
  for (; n.right !== null; ) {
    if (!(n.right.deleted || n.right.content.constructor === A && H(
      t[
        /** @type {ContentFormat} */
        n.right.content.key
      ] ?? null,
      /** @type {ContentFormat} */
      n.right.content.value
    ))) break;
    n.forward();
  }
}, Bs = (n, t, e, s) => {
  const i = n.doc, r = i.clientID, o = /* @__PURE__ */ new Map();
  for (const l in s) {
    const c = s[l], h = e.currentAttributes.get(l) ?? null;
    if (!H(h, c)) {
      o.set(l, h);
      const { left: u, right: a } = e;
      e.right = new k(w(r, x(i.store, r)), u, u && u.lastId, a, a && a.id, t, null, new A(l, c)), e.right.integrate(n, 0), e.forward();
    }
  }
  return o;
}, _e = (n, t, e, s, i) => {
  e.currentAttributes.forEach((f, d) => {
    i[d] === void 0 && (i[d] = null);
  });
  const r = n.doc, o = r.clientID;
  Fs(e, i);
  const l = Bs(n, t, e, i), c = s.constructor === String ? new j(
    /** @type {string} */
    s
  ) : s instanceof C ? new z(s) : new gt(s);
  let { left: h, right: u, index: a } = e;
  t._searchMarker && Et(t._searchMarker, e.index, c.getLength()), u = new k(w(o, x(r.store, o)), h, h && h.lastId, u, u && u.id, t, null, c), u.integrate(n, 0), e.right = u, e.index = a, e.forward(), Us(n, t, e, l);
}, Rn = (n, t, e, s, i) => {
  const r = n.doc, o = r.clientID;
  Fs(e, i);
  const l = Bs(n, t, e, i);
  t: for (; e.right !== null && (s > 0 || l.size > 0 && (e.right.deleted || e.right.content.constructor === A)); ) {
    if (!e.right.deleted)
      switch (e.right.content.constructor) {
        case A: {
          const { key: c, value: h } = (
            /** @type {ContentFormat} */
            e.right.content
          ), u = i[c];
          if (u !== void 0) {
            if (H(u, h))
              l.delete(c);
            else {
              if (s === 0)
                break t;
              l.set(c, h);
            }
            e.right.delete(n);
          } else
            e.currentAttributes.set(c, h);
          break;
        }
        default:
          s < e.right.length && O(n, w(e.right.id.client, e.right.id.clock + s)), s -= e.right.length;
          break;
      }
    e.forward();
  }
  if (s > 0) {
    let c = "";
    for (; s > 0; s--)
      c += `
`;
    e.right = new k(w(o, x(r.store, o)), e.left, e.left && e.left.lastId, e.right, e.right && e.right.id, t, null, new j(c)), e.right.integrate(n, 0), e.forward();
  }
  Us(n, t, e, l);
}, Vs = (n, t, e, s, i) => {
  let r = t;
  const o = R();
  for (; r && (!r.countable || r.deleted); ) {
    if (!r.deleted && r.content.constructor === A) {
      const h = (
        /** @type {ContentFormat} */
        r.content
      );
      o.set(h.key, h);
    }
    r = r.right;
  }
  let l = 0, c = !1;
  for (; t !== r; ) {
    if (e === t && (c = !0), !t.deleted) {
      const h = t.content;
      switch (h.constructor) {
        case A: {
          const { key: u, value: a } = (
            /** @type {ContentFormat} */
            h
          ), f = s.get(u) ?? null;
          (o.get(u) !== h || f === a) && (t.delete(n), l++, !c && (i.get(u) ?? null) === a && f !== a && (f === null ? i.delete(u) : i.set(u, f))), !c && !t.deleted && ft(
            i,
            /** @type {ContentFormat} */
            h
          );
          break;
        }
      }
    }
    t = /** @type {Item} */
    t.right;
  }
  return l;
}, yo = (n, t) => {
  for (; t && t.right && (t.right.deleted || !t.right.countable); )
    t = t.right;
  const e = /* @__PURE__ */ new Set();
  for (; t && (t.deleted || !t.countable); ) {
    if (!t.deleted && t.content.constructor === A) {
      const s = (
        /** @type {ContentFormat} */
        t.content.key
      );
      e.has(s) ? t.delete(n) : e.add(s);
    }
    t = t.left;
  }
}, _o = (n) => {
  let t = 0;
  return _(
    /** @type {Doc} */
    n.doc,
    (e) => {
      let s = (
        /** @type {Item} */
        n._start
      ), i = n._start, r = R();
      const o = be(r);
      for (; i; ) {
        if (i.deleted === !1)
          switch (i.content.constructor) {
            case A:
              ft(
                o,
                /** @type {ContentFormat} */
                i.content
              );
              break;
            default:
              t += Vs(e, s, i, r, o), r = be(o), s = i;
              break;
          }
        i = i.right;
      }
    }
  ), t;
}, ko = (n) => {
  const t = /* @__PURE__ */ new Set(), e = n.doc;
  for (const [s, i] of n.afterState.entries()) {
    const r = n.beforeState.get(s) || 0;
    i !== r && Es(
      n,
      /** @type {Array<Item|GC>} */
      e.store.clients.get(s),
      r,
      i,
      (o) => {
        !o.deleted && /** @type {Item} */
        o.content.constructor === A && o.constructor !== G && t.add(
          /** @type {any} */
          o.parent
        );
      }
    );
  }
  _(e, (s) => {
    lt(n, n.deleteSet, (i) => {
      if (i instanceof G || !/** @type {YText} */
      i.parent._hasFormatting || t.has(
        /** @type {YText} */
        i.parent
      ))
        return;
      const r = (
        /** @type {YText} */
        i.parent
      );
      i.content.constructor === A ? t.add(r) : yo(s, i);
    });
    for (const i of t)
      _o(i);
  });
}, Nn = (n, t, e) => {
  const s = e, i = be(t.currentAttributes), r = t.right;
  for (; e > 0 && t.right !== null; ) {
    if (t.right.deleted === !1)
      switch (t.right.content.constructor) {
        case z:
        case gt:
        case j:
          e < t.right.length && O(n, w(t.right.id.client, t.right.id.clock + e)), e -= t.right.length, t.right.delete(n);
          break;
      }
    t.forward();
  }
  r && Vs(n, r, t.right, i, t.currentAttributes);
  const o = (
    /** @type {AbstractType<any>} */
    /** @type {Item} */
    (t.left || t.right).parent
  );
  return o._searchMarker && Et(o._searchMarker, t.index, -s + e), t;
};
class bo extends se {
  /**
   * @param {YText} ytext
   * @param {Transaction} transaction
   * @param {Set<any>} subs The keys that changed
   */
  constructor(t, e, s) {
    super(t, e), this.childListChanged = !1, this.keysChanged = /* @__PURE__ */ new Set(), s.forEach((i) => {
      i === null ? this.childListChanged = !0 : this.keysChanged.add(i);
    });
  }
  /**
   * @type {{added:Set<Item>,deleted:Set<Item>,keys:Map<string,{action:'add'|'update'|'delete',oldValue:any}>,delta:Array<{insert?:Array<any>|string, delete?:number, retain?:number}>}}
   */
  get changes() {
    if (this._changes === null) {
      const t = {
        keys: this.keys,
        delta: this.delta,
        added: /* @__PURE__ */ new Set(),
        deleted: /* @__PURE__ */ new Set()
      };
      this._changes = t;
    }
    return (
      /** @type {any} */
      this._changes
    );
  }
  /**
   * Compute the changes in the delta format.
   * A {@link https://quilljs.com/docs/delta/|Quill Delta}) that represents the changes on the document.
   *
   * @type {Array<{insert?:string|object|AbstractType<any>, delete?:number, retain?:number, attributes?: Object<string,any>}>}
   *
   * @public
   */
  get delta() {
    if (this._delta === null) {
      const t = (
        /** @type {Doc} */
        this.target.doc
      ), e = [];
      _(t, (s) => {
        const i = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
        let o = this.target._start, l = null;
        const c = {};
        let h = "", u = 0, a = 0;
        const f = () => {
          if (l !== null) {
            let d = null;
            switch (l) {
              case "delete":
                a > 0 && (d = { delete: a }), a = 0;
                break;
              case "insert":
                (typeof h == "object" || h.length > 0) && (d = { insert: h }, i.size > 0 && (d.attributes = {}, i.forEach((g, p) => {
                  g !== null && (d.attributes[p] = g);
                }))), h = "";
                break;
              case "retain":
                u > 0 && (d = { retain: u }, Ni(c) || (d.attributes = vi({}, c))), u = 0;
                break;
            }
            d && e.push(d), l = null;
          }
        };
        for (; o !== null; ) {
          switch (o.content.constructor) {
            case z:
            case gt:
              this.adds(o) ? this.deletes(o) || (f(), l = "insert", h = o.content.getContent()[0], f()) : this.deletes(o) ? (l !== "delete" && (f(), l = "delete"), a += 1) : o.deleted || (l !== "retain" && (f(), l = "retain"), u += 1);
              break;
            case j:
              this.adds(o) ? this.deletes(o) || (l !== "insert" && (f(), l = "insert"), h += /** @type {ContentString} */
              o.content.str) : this.deletes(o) ? (l !== "delete" && (f(), l = "delete"), a += o.length) : o.deleted || (l !== "retain" && (f(), l = "retain"), u += o.length);
              break;
            case A: {
              const { key: d, value: g } = (
                /** @type {ContentFormat} */
                o.content
              );
              if (this.adds(o)) {
                if (!this.deletes(o)) {
                  const p = i.get(d) ?? null;
                  H(p, g) ? g !== null && o.delete(s) : (l === "retain" && f(), H(g, r.get(d) ?? null) ? delete c[d] : c[d] = g);
                }
              } else if (this.deletes(o)) {
                r.set(d, g);
                const p = i.get(d) ?? null;
                H(p, g) || (l === "retain" && f(), c[d] = p);
              } else if (!o.deleted) {
                r.set(d, g);
                const p = c[d];
                p !== void 0 && (H(p, g) ? p !== null && o.delete(s) : (l === "retain" && f(), g === null ? delete c[d] : c[d] = g));
              }
              o.deleted || (l === "insert" && f(), ft(
                i,
                /** @type {ContentFormat} */
                o.content
              ));
              break;
            }
          }
          o = o.right;
        }
        for (f(); e.length > 0; ) {
          const d = e[e.length - 1];
          if (d.retain !== void 0 && d.attributes === void 0)
            e.pop();
          else
            break;
        }
      }), this._delta = e;
    }
    return (
      /** @type {any} */
      this._delta
    );
  }
}
class qt extends C {
  /**
   * @param {String} [string] The initial value of the YText.
   */
  constructor(t) {
    super(), this._pending = t !== void 0 ? [() => this.insert(0, t)] : [], this._searchMarker = [], this._hasFormatting = !1;
  }
  /**
   * Number of characters of this text type.
   *
   * @type {number}
   */
  get length() {
    return this.doc ?? T(), this._length;
  }
  /**
   * @param {Doc} y
   * @param {Item} item
   */
  _integrate(t, e) {
    super._integrate(t, e);
    try {
      this._pending.forEach((s) => s());
    } catch (s) {
      console.error(s);
    }
    this._pending = null;
  }
  _copy() {
    return new qt();
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YText}
   */
  clone() {
    const t = new qt();
    return t.applyDelta(this.toDelta()), t;
  }
  /**
   * Creates YTextEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver(t, e) {
    super._callObserver(t, e);
    const s = new bo(this, t, e);
    re(this, t, s), !t.local && this._hasFormatting && (t._needFormattingCleanup = !0);
  }
  /**
   * Returns the unformatted string representation of this YText type.
   *
   * @public
   */
  toString() {
    this.doc ?? T();
    let t = "", e = this._start;
    for (; e !== null; )
      !e.deleted && e.countable && e.content.constructor === j && (t += /** @type {ContentString} */
      e.content.str), e = e.right;
    return t;
  }
  /**
   * Returns the unformatted string representation of this YText type.
   *
   * @return {string}
   * @public
   */
  toJSON() {
    return this.toString();
  }
  /**
   * Apply a {@link Delta} on this shared YText type.
   *
   * @param {Array<any>} delta The changes to apply on this element.
   * @param {object}  opts
   * @param {boolean} [opts.sanitize] Sanitize input delta. Removes ending newlines if set to true.
   *
   *
   * @public
   */
  applyDelta(t, { sanitize: e = !0 } = {}) {
    this.doc !== null ? _(this.doc, (s) => {
      const i = new Oe(null, this._start, 0, /* @__PURE__ */ new Map());
      for (let r = 0; r < t.length; r++) {
        const o = t[r];
        if (o.insert !== void 0) {
          const l = !e && typeof o.insert == "string" && r === t.length - 1 && i.right === null && o.insert.slice(-1) === `
` ? o.insert.slice(0, -1) : o.insert;
          (typeof l != "string" || l.length > 0) && _e(s, this, i, l, o.attributes || {});
        } else o.retain !== void 0 ? Rn(s, this, i, o.retain, o.attributes || {}) : o.delete !== void 0 && Nn(s, i, o.delete);
      }
    }) : this._pending.push(() => this.applyDelta(t));
  }
  /**
   * Returns the Delta representation of this YText type.
   *
   * @param {Snapshot} [snapshot]
   * @param {Snapshot} [prevSnapshot]
   * @param {function('removed' | 'added', ID):any} [computeYChange]
   * @return {any} The Delta representation of this type.
   *
   * @public
   */
  toDelta(t, e, s) {
    this.doc ?? T();
    const i = [], r = /* @__PURE__ */ new Map(), o = (
      /** @type {Doc} */
      this.doc
    );
    let l = "", c = this._start;
    function h() {
      if (l.length > 0) {
        const a = {};
        let f = !1;
        r.forEach((g, p) => {
          f = !0, a[p] = g;
        });
        const d = { insert: l };
        f && (d.attributes = a), i.push(d), l = "";
      }
    }
    const u = () => {
      for (; c !== null; ) {
        if (Z(c, t) || e !== void 0 && Z(c, e))
          switch (c.content.constructor) {
            case j: {
              const a = r.get("ychange");
              t !== void 0 && !Z(c, t) ? (a === void 0 || a.user !== c.id.client || a.type !== "removed") && (h(), r.set("ychange", s ? s("removed", c.id) : { type: "removed" })) : e !== void 0 && !Z(c, e) ? (a === void 0 || a.user !== c.id.client || a.type !== "added") && (h(), r.set("ychange", s ? s("added", c.id) : { type: "added" })) : a !== void 0 && (h(), r.delete("ychange")), l += /** @type {ContentString} */
              c.content.str;
              break;
            }
            case z:
            case gt: {
              h();
              const a = {
                insert: c.content.getContent()[0]
              };
              if (r.size > 0) {
                const f = (
                  /** @type {Object<string,any>} */
                  {}
                );
                a.attributes = f, r.forEach((d, g) => {
                  f[g] = d;
                });
              }
              i.push(a);
              break;
            }
            case A:
              Z(c, t) && (h(), ft(
                r,
                /** @type {ContentFormat} */
                c.content
              ));
              break;
          }
        c = c.right;
      }
      h();
    };
    return t || e ? _(o, (a) => {
      t && Te(a, t), e && Te(a, e), u();
    }, "cleanup") : u(), i;
  }
  /**
   * Insert text at a given index.
   *
   * @param {number} index The index at which to start inserting.
   * @param {String} text The text to insert at the specified position.
   * @param {TextAttributes} [attributes] Optionally define some formatting
   *                                    information to apply on the inserted
   *                                    Text.
   * @public
   */
  insert(t, e, s) {
    if (e.length <= 0)
      return;
    const i = this.doc;
    i !== null ? _(i, (r) => {
      const o = vt(r, this, t, !s);
      s || (s = {}, o.currentAttributes.forEach((l, c) => {
        s[c] = l;
      })), _e(r, this, o, e, s);
    }) : this._pending.push(() => this.insert(t, e, s));
  }
  /**
   * Inserts an embed at a index.
   *
   * @param {number} index The index to insert the embed at.
   * @param {Object | AbstractType<any>} embed The Object that represents the embed.
   * @param {TextAttributes} [attributes] Attribute information to apply on the
   *                                    embed
   *
   * @public
   */
  insertEmbed(t, e, s) {
    const i = this.doc;
    i !== null ? _(i, (r) => {
      const o = vt(r, this, t, !s);
      _e(r, this, o, e, s || {});
    }) : this._pending.push(() => this.insertEmbed(t, e, s || {}));
  }
  /**
   * Deletes text starting from an index.
   *
   * @param {number} index Index at which to start deleting.
   * @param {number} length The number of characters to remove. Defaults to 1.
   *
   * @public
   */
  delete(t, e) {
    if (e === 0)
      return;
    const s = this.doc;
    s !== null ? _(s, (i) => {
      Nn(i, vt(i, this, t, !0), e);
    }) : this._pending.push(() => this.delete(t, e));
  }
  /**
   * Assigns properties to a range of text.
   *
   * @param {number} index The position where to start formatting.
   * @param {number} length The amount of characters to assign properties to.
   * @param {TextAttributes} attributes Attribute information to apply on the
   *                                    text.
   *
   * @public
   */
  format(t, e, s) {
    if (e === 0)
      return;
    const i = this.doc;
    i !== null ? _(i, (r) => {
      const o = vt(r, this, t, !1);
      o.right !== null && Rn(r, this, o, e, s);
    }) : this._pending.push(() => this.format(t, e, s));
  }
  /**
   * Removes an attribute.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @param {String} attributeName The attribute name that is to be removed.
   *
   * @public
   */
  removeAttribute(t) {
    this.doc !== null ? _(this.doc, (e) => {
      Jt(e, this, t);
    }) : this._pending.push(() => this.removeAttribute(t));
  }
  /**
   * Sets or updates an attribute.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @param {String} attributeName The attribute name that is to be set.
   * @param {any} attributeValue The attribute value that is to be set.
   *
   * @public
   */
  setAttribute(t, e) {
    this.doc !== null ? _(this.doc, (s) => {
      en(s, this, t, e);
    }) : this._pending.push(() => this.setAttribute(t, e));
  }
  /**
   * Returns an attribute value that belongs to the attribute name.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @param {String} attributeName The attribute name that identifies the
   *                               queried value.
   * @return {any} The queried attribute value.
   *
   * @public
   */
  getAttribute(t) {
    return (
      /** @type {any} */
      nn(this, t)
    );
  }
  /**
   * Returns all attribute name/value pairs in a JSON Object.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @return {Object<string, any>} A JSON Object that describes the attributes.
   *
   * @public
   */
  getAttributes() {
    return Rs(this);
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */
  _write(t) {
    t.writeTypeRef(To);
  }
}
class ke {
  /**
   * @param {YXmlFragment | YXmlElement} root
   * @param {function(AbstractType<any>):boolean} [f]
   */
  constructor(t, e = () => !0) {
    this._filter = e, this._root = t, this._currentNode = /** @type {Item} */
    t._start, this._firstCall = !0, t.doc ?? T();
  }
  [Symbol.iterator]() {
    return this;
  }
  /**
   * Get the next node.
   *
   * @return {IteratorResult<YXmlElement|YXmlText|YXmlHook>} The next node.
   *
   * @public
   */
  next() {
    let t = this._currentNode, e = t && t.content && /** @type {any} */
    t.content.type;
    if (t !== null && (!this._firstCall || t.deleted || !this._filter(e)))
      do
        if (e = /** @type {any} */
        t.content.type, !t.deleted && (e.constructor === At || e.constructor === ct) && e._start !== null)
          t = e._start;
        else
          for (; t !== null; ) {
            const s = t.next;
            if (s !== null) {
              t = s;
              break;
            } else t.parent === this._root ? t = null : t = /** @type {AbstractType<any>} */
            t.parent._item;
          }
      while (t !== null && (t.deleted || !this._filter(
        /** @type {ContentType} */
        t.content.type
      )));
    return this._firstCall = !1, t === null ? { value: void 0, done: !0 } : (this._currentNode = t, { value: (
      /** @type {any} */
      t.content.type
    ), done: !1 });
  }
}
class ct extends C {
  constructor() {
    super(), this._prelimContent = [];
  }
  /**
   * @type {YXmlElement|YXmlText|null}
   */
  get firstChild() {
    const t = this._first;
    return t ? t.content.getContent()[0] : null;
  }
  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate(t, e) {
    super._integrate(t, e), this.insert(
      0,
      /** @type {Array<any>} */
      this._prelimContent
    ), this._prelimContent = null;
  }
  _copy() {
    return new ct();
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YXmlFragment}
   */
  clone() {
    const t = new ct();
    return t.insert(0, this.toArray().map((e) => e instanceof C ? e.clone() : e)), t;
  }
  get length() {
    return this.doc ?? T(), this._prelimContent === null ? this._length : this._prelimContent.length;
  }
  /**
   * Create a subtree of childNodes.
   *
   * @example
   * const walker = elem.createTreeWalker(dom => dom.nodeName === 'div')
   * for (let node in walker) {
   *   // `node` is a div node
   *   nop(node)
   * }
   *
   * @param {function(AbstractType<any>):boolean} filter Function that is called on each child element and
   *                          returns a Boolean indicating whether the child
   *                          is to be included in the subtree.
   * @return {YXmlTreeWalker} A subtree and a position within it.
   *
   * @public
   */
  createTreeWalker(t) {
    return new ke(this, t);
  }
  /**
   * Returns the first YXmlElement that matches the query.
   * Similar to DOM's {@link querySelector}.
   *
   * Query support:
   *   - tagname
   * TODO:
   *   - id
   *   - attribute
   *
   * @param {CSS_Selector} query The query on the children.
   * @return {YXmlElement|YXmlText|YXmlHook|null} The first element that matches the query or null.
   *
   * @public
   */
  querySelector(t) {
    t = t.toUpperCase();
    const s = new ke(this, (i) => i.nodeName && i.nodeName.toUpperCase() === t).next();
    return s.done ? null : s.value;
  }
  /**
   * Returns all YXmlElements that match the query.
   * Similar to Dom's {@link querySelectorAll}.
   *
   * @todo Does not yet support all queries. Currently only query by tagName.
   *
   * @param {CSS_Selector} query The query on the children
   * @return {Array<YXmlElement|YXmlText|YXmlHook|null>} The elements that match this query.
   *
   * @public
   */
  querySelectorAll(t) {
    return t = t.toUpperCase(), it(new ke(this, (e) => e.nodeName && e.nodeName.toUpperCase() === t));
  }
  /**
   * Creates YXmlEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver(t, e) {
    re(this, t, new So(this, e, t));
  }
  /**
   * Get the string representation of all the children of this YXmlFragment.
   *
   * @return {string} The string representation of all children.
   */
  toString() {
    return Os(this, (t) => t.toString()).join("");
  }
  /**
   * @return {string}
   */
  toJSON() {
    return this.toString();
  }
  /**
   * Creates a Dom Element that mirrors this YXmlElement.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object<string, any>} [hooks={}] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type.
   * @return {Node} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDOM(t = document, e = {}, s) {
    const i = t.createDocumentFragment();
    return s !== void 0 && s._createAssociation(i, this), Ct(this, (r) => {
      i.insertBefore(r.toDOM(t, e, s), null);
    }), i;
  }
  /**
   * Inserts new content at an index.
   *
   * @example
   *  // Insert character 'a' at position 0
   *  xml.insert(0, [new Y.XmlText('text')])
   *
   * @param {number} index The index to insert content at
   * @param {Array<YXmlElement|YXmlText>} content The array of content
   */
  insert(t, e) {
    this.doc !== null ? _(this.doc, (s) => {
      vs(s, this, t, e);
    }) : this._prelimContent.splice(t, 0, ...e);
  }
  /**
   * Inserts new content at an index.
   *
   * @example
   *  // Insert character 'a' at position 0
   *  xml.insert(0, [new Y.XmlText('text')])
   *
   * @param {null|Item|YXmlElement|YXmlText} ref The index to insert content at
   * @param {Array<YXmlElement|YXmlText>} content The array of content
   */
  insertAfter(t, e) {
    if (this.doc !== null)
      _(this.doc, (s) => {
        const i = t && t instanceof C ? t._item : t;
        Wt(s, this, i, e);
      });
    else {
      const s = (
        /** @type {Array<any>} */
        this._prelimContent
      ), i = t === null ? 0 : s.findIndex((r) => r === t) + 1;
      if (i === 0 && t !== null)
        throw W("Reference item not found");
      s.splice(i, 0, ...e);
    }
  }
  /**
   * Deletes elements starting from an index.
   *
   * @param {number} index Index at which to start deleting elements
   * @param {number} [length=1] The number of elements to remove. Defaults to 1.
   */
  delete(t, e = 1) {
    this.doc !== null ? _(this.doc, (s) => {
      $s(s, this, t, e);
    }) : this._prelimContent.splice(t, e);
  }
  /**
   * Transforms this YArray to a JavaScript Array.
   *
   * @return {Array<YXmlElement|YXmlText|YXmlHook>}
   */
  toArray() {
    return Ds(this);
  }
  /**
   * Appends content to this YArray.
   *
   * @param {Array<YXmlElement|YXmlText>} content Array of content to append.
   */
  push(t) {
    this.insert(this.length, t);
  }
  /**
   * Prepends content to this YArray.
   *
   * @param {Array<YXmlElement|YXmlText>} content Array of content to prepend.
   */
  unshift(t) {
    this.insert(0, t);
  }
  /**
   * Returns the i-th element from a YArray.
   *
   * @param {number} index The index of the element to return from the YArray
   * @return {YXmlElement|YXmlText}
   */
  get(t) {
    return Ms(this, t);
  }
  /**
   * Returns a portion of this YXmlFragment into a JavaScript Array selected
   * from start to end (end not included).
   *
   * @param {number} [start]
   * @param {number} [end]
   * @return {Array<YXmlElement|YXmlText>}
   */
  slice(t = 0, e = this.length) {
    return Ts(this, t, e);
  }
  /**
   * Executes a provided function on once on every child element.
   *
   * @param {function(YXmlElement|YXmlText,number, typeof self):void} f A function to execute on every element of this YArray.
   */
  forEach(t) {
    Ct(this, t);
  }
  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   */
  _write(t) {
    t.writeTypeRef(Oo);
  }
}
class At extends ct {
  constructor(t = "UNDEFINED") {
    super(), this.nodeName = t, this._prelimAttrs = /* @__PURE__ */ new Map();
  }
  /**
   * @type {YXmlElement|YXmlText|null}
   */
  get nextSibling() {
    const t = this._item ? this._item.next : null;
    return t ? (
      /** @type {YXmlElement|YXmlText} */
      /** @type {ContentType} */
      t.content.type
    ) : null;
  }
  /**
   * @type {YXmlElement|YXmlText|null}
   */
  get prevSibling() {
    const t = this._item ? this._item.prev : null;
    return t ? (
      /** @type {YXmlElement|YXmlText} */
      /** @type {ContentType} */
      t.content.type
    ) : null;
  }
  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate(t, e) {
    super._integrate(t, e), /** @type {Map<string, any>} */
    this._prelimAttrs.forEach((s, i) => {
      this.setAttribute(i, s);
    }), this._prelimAttrs = null;
  }
  /**
   * Creates an Item with the same effect as this Item (without position effect)
   *
   * @return {YXmlElement}
   */
  _copy() {
    return new At(this.nodeName);
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YXmlElement<KV>}
   */
  clone() {
    const t = new At(this.nodeName), e = this.getAttributes();
    return Ri(e, (s, i) => {
      t.setAttribute(
        i,
        /** @type {any} */
        s
      );
    }), t.insert(0, this.toArray().map((s) => s instanceof C ? s.clone() : s)), t;
  }
  /**
   * Returns the XML serialization of this YXmlElement.
   * The attributes are ordered by attribute-name, so you can easily use this
   * method to compare YXmlElements
   *
   * @return {string} The string representation of this type.
   *
   * @public
   */
  toString() {
    const t = this.getAttributes(), e = [], s = [];
    for (const l in t)
      s.push(l);
    s.sort();
    const i = s.length;
    for (let l = 0; l < i; l++) {
      const c = s[l];
      e.push(c + '="' + t[c] + '"');
    }
    const r = this.nodeName.toLocaleLowerCase(), o = e.length > 0 ? " " + e.join(" ") : "";
    return `<${r}${o}>${super.toString()}</${r}>`;
  }
  /**
   * Removes an attribute from this YXmlElement.
   *
   * @param {string} attributeName The attribute name that is to be removed.
   *
   * @public
   */
  removeAttribute(t) {
    this.doc !== null ? _(this.doc, (e) => {
      Jt(e, this, t);
    }) : this._prelimAttrs.delete(t);
  }
  /**
   * Sets or updates an attribute.
   *
   * @template {keyof KV & string} KEY
   *
   * @param {KEY} attributeName The attribute name that is to be set.
   * @param {KV[KEY]} attributeValue The attribute value that is to be set.
   *
   * @public
   */
  setAttribute(t, e) {
    this.doc !== null ? _(this.doc, (s) => {
      en(s, this, t, e);
    }) : this._prelimAttrs.set(t, e);
  }
  /**
   * Returns an attribute value that belongs to the attribute name.
   *
   * @template {keyof KV & string} KEY
   *
   * @param {KEY} attributeName The attribute name that identifies the
   *                               queried value.
   * @return {KV[KEY]|undefined} The queried attribute value.
   *
   * @public
   */
  getAttribute(t) {
    return (
      /** @type {any} */
      nn(this, t)
    );
  }
  /**
   * Returns whether an attribute exists
   *
   * @param {string} attributeName The attribute name to check for existence.
   * @return {boolean} whether the attribute exists.
   *
   * @public
   */
  hasAttribute(t) {
    return (
      /** @type {any} */
      Ns(this, t)
    );
  }
  /**
   * Returns all attribute name/value pairs in a JSON Object.
   *
   * @param {Snapshot} [snapshot]
   * @return {{ [Key in Extract<keyof KV,string>]?: KV[Key]}} A JSON Object that describes the attributes.
   *
   * @public
   */
  getAttributes(t) {
    return (
      /** @type {any} */
      t ? po(this, t) : Rs(this)
    );
  }
  /**
   * Creates a Dom Element that mirrors this YXmlElement.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object<string, any>} [hooks={}] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type.
   * @return {Node} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDOM(t = document, e = {}, s) {
    const i = t.createElement(this.nodeName), r = this.getAttributes();
    for (const o in r) {
      const l = r[o];
      typeof l == "string" && i.setAttribute(o, l);
    }
    return Ct(this, (o) => {
      i.appendChild(o.toDOM(t, e, s));
    }), s !== void 0 && s._createAssociation(i, this), i;
  }
  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   */
  _write(t) {
    t.writeTypeRef(Do), t.writeKey(this.nodeName);
  }
}
class So extends se {
  /**
   * @param {YXmlElement|YXmlText|YXmlFragment} target The target on which the event is created.
   * @param {Set<string|null>} subs The set of changed attributes. `null` is included if the
   *                   child list changed.
   * @param {Transaction} transaction The transaction instance with which the
   *                                  change was created.
   */
  constructor(t, e, s) {
    super(t, s), this.childListChanged = !1, this.attributesChanged = /* @__PURE__ */ new Set(), e.forEach((i) => {
      i === null ? this.childListChanged = !0 : this.attributesChanged.add(i);
    });
  }
}
class js {
  /**
   * @param {ID} id
   * @param {number} length
   */
  constructor(t, e) {
    this.id = t, this.length = e;
  }
  /**
   * @type {boolean}
   */
  get deleted() {
    throw v();
  }
  /**
   * Merge this struct with the item to the right.
   * This method is already assuming that `this.id.clock + this.length === this.id.clock`.
   * Also this method does *not* remove right from StructStore!
   * @param {AbstractStruct} right
   * @return {boolean} whether this merged with right
   */
  mergeWith(t) {
    return !1;
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   * @param {number} offset
   * @param {number} encodingRef
   */
  write(t, e, s) {
    throw v();
  }
  /**
   * @param {Transaction} transaction
   * @param {number} offset
   */
  integrate(t, e) {
    throw v();
  }
}
const Eo = 0;
class G extends js {
  get deleted() {
    return !0;
  }
  delete() {
  }
  /**
   * @param {GC} right
   * @return {boolean}
   */
  mergeWith(t) {
    return this.constructor !== t.constructor ? !1 : (this.length += t.length, !0);
  }
  /**
   * @param {Transaction} transaction
   * @param {number} offset
   */
  integrate(t, e) {
    e > 0 && (this.id.clock += e, this.length -= e), Ss(t.doc.store, this);
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, e) {
    t.writeInfo(Eo), t.writeLen(this.length - e);
  }
  /**
   * @param {Transaction} transaction
   * @param {StructStore} store
   * @return {null | number}
   */
  getMissing(t, e) {
    return null;
  }
}
class oe {
  /**
   * @param {Uint8Array} content
   */
  constructor(t) {
    this.content = t;
  }
  /**
   * @return {number}
   */
  getLength() {
    return 1;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [this.content];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !0;
  }
  /**
   * @return {ContentBinary}
   */
  copy() {
    return new oe(this.content);
  }
  /**
   * @param {number} offset
   * @return {ContentBinary}
   */
  splice(t) {
    throw v();
  }
  /**
   * @param {ContentBinary} right
   * @return {boolean}
   */
  mergeWith(t) {
    return !1;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(t, e) {
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, e) {
    t.writeBuf(this.content);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 3;
  }
}
class Kt {
  /**
   * @param {number} len
   */
  constructor(t) {
    this.len = t;
  }
  /**
   * @return {number}
   */
  getLength() {
    return this.len;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !1;
  }
  /**
   * @return {ContentDeleted}
   */
  copy() {
    return new Kt(this.len);
  }
  /**
   * @param {number} offset
   * @return {ContentDeleted}
   */
  splice(t) {
    const e = new Kt(this.len - t);
    return this.len = t, e;
  }
  /**
   * @param {ContentDeleted} right
   * @return {boolean}
   */
  mergeWith(t) {
    return this.len += t.len, !0;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(t, e) {
    Ze(t.deleteSet, e.id.client, e.id.clock, this.len), e.markDeleted();
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, e) {
    t.writeLen(this.len - e);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 1;
  }
}
const Co = (n, t) => new dt({ guid: n, ...t, shouldLoad: t.shouldLoad || t.autoLoad || !1 });
class le {
  /**
   * @param {Doc} doc
   */
  constructor(t) {
    t._item && console.error("This document was already integrated as a sub-document. You should create a second instance instead with the same guid."), this.doc = t;
    const e = {};
    this.opts = e, t.gc || (e.gc = !1), t.autoLoad && (e.autoLoad = !0), t.meta !== null && (e.meta = t.meta);
  }
  /**
   * @return {number}
   */
  getLength() {
    return 1;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [this.doc];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !0;
  }
  /**
   * @return {ContentDoc}
   */
  copy() {
    return new le(Co(this.doc.guid, this.opts));
  }
  /**
   * @param {number} offset
   * @return {ContentDoc}
   */
  splice(t) {
    throw v();
  }
  /**
   * @param {ContentDoc} right
   * @return {boolean}
   */
  mergeWith(t) {
    return !1;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(t, e) {
    this.doc._item = e, t.subdocsAdded.add(this.doc), this.doc.shouldLoad && t.subdocsLoaded.add(this.doc);
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
    t.subdocsAdded.has(this.doc) ? t.subdocsAdded.delete(this.doc) : t.subdocsRemoved.add(this.doc);
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, e) {
    t.writeString(this.doc.guid), t.writeAny(this.opts);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 9;
  }
}
class gt {
  /**
   * @param {Object} embed
   */
  constructor(t) {
    this.embed = t;
  }
  /**
   * @return {number}
   */
  getLength() {
    return 1;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [this.embed];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !0;
  }
  /**
   * @return {ContentEmbed}
   */
  copy() {
    return new gt(this.embed);
  }
  /**
   * @param {number} offset
   * @return {ContentEmbed}
   */
  splice(t) {
    throw v();
  }
  /**
   * @param {ContentEmbed} right
   * @return {boolean}
   */
  mergeWith(t) {
    return !1;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(t, e) {
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, e) {
    t.writeJSON(this.embed);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 5;
  }
}
class A {
  /**
   * @param {string} key
   * @param {Object} value
   */
  constructor(t, e) {
    this.key = t, this.value = e;
  }
  /**
   * @return {number}
   */
  getLength() {
    return 1;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !1;
  }
  /**
   * @return {ContentFormat}
   */
  copy() {
    return new A(this.key, this.value);
  }
  /**
   * @param {number} _offset
   * @return {ContentFormat}
   */
  splice(t) {
    throw v();
  }
  /**
   * @param {ContentFormat} _right
   * @return {boolean}
   */
  mergeWith(t) {
    return !1;
  }
  /**
   * @param {Transaction} _transaction
   * @param {Item} item
   */
  integrate(t, e) {
    const s = (
      /** @type {YText} */
      e.parent
    );
    s._searchMarker = null, s._hasFormatting = !0;
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, e) {
    t.writeKey(this.key), t.writeJSON(this.value);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 6;
  }
}
const Ao = jt("node_env") === "development";
class ht {
  /**
   * @param {Array<any>} arr
   */
  constructor(t) {
    this.arr = t, Ao && Hn(t);
  }
  /**
   * @return {number}
   */
  getLength() {
    return this.arr.length;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return this.arr;
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !0;
  }
  /**
   * @return {ContentAny}
   */
  copy() {
    return new ht(this.arr);
  }
  /**
   * @param {number} offset
   * @return {ContentAny}
   */
  splice(t) {
    const e = new ht(this.arr.slice(t));
    return this.arr = this.arr.slice(0, t), e;
  }
  /**
   * @param {ContentAny} right
   * @return {boolean}
   */
  mergeWith(t) {
    return this.arr = this.arr.concat(t.arr), !0;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(t, e) {
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, e) {
    const s = this.arr.length;
    t.writeLen(s - e);
    for (let i = e; i < s; i++) {
      const r = this.arr[i];
      t.writeAny(r);
    }
  }
  /**
   * @return {number}
   */
  getRef() {
    return 8;
  }
}
class j {
  /**
   * @param {string} str
   */
  constructor(t) {
    this.str = t;
  }
  /**
   * @return {number}
   */
  getLength() {
    return this.str.length;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return this.str.split("");
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !0;
  }
  /**
   * @return {ContentString}
   */
  copy() {
    return new j(this.str);
  }
  /**
   * @param {number} offset
   * @return {ContentString}
   */
  splice(t) {
    const e = new j(this.str.slice(t));
    this.str = this.str.slice(0, t);
    const s = this.str.charCodeAt(t - 1);
    return s >= 55296 && s <= 56319 && (this.str = this.str.slice(0, t - 1) + "�", e.str = "�" + e.str.slice(1)), e;
  }
  /**
   * @param {ContentString} right
   * @return {boolean}
   */
  mergeWith(t) {
    return this.str += t.str, !0;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(t, e) {
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, e) {
    t.writeString(e === 0 ? this.str : this.str.slice(e));
  }
  /**
   * @return {number}
   */
  getRef() {
    return 4;
  }
}
const Io = 0, xo = 1, To = 2, Do = 3, Oo = 4;
class z {
  /**
   * @param {AbstractType<any>} type
   */
  constructor(t) {
    this.type = t;
  }
  /**
   * @return {number}
   */
  getLength() {
    return 1;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [this.type];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !0;
  }
  /**
   * @return {ContentType}
   */
  copy() {
    return new z(this.type._copy());
  }
  /**
   * @param {number} offset
   * @return {ContentType}
   */
  splice(t) {
    throw v();
  }
  /**
   * @param {ContentType} right
   * @return {boolean}
   */
  mergeWith(t) {
    return !1;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(t, e) {
    this.type._integrate(t.doc, e);
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
    let e = this.type._start;
    for (; e !== null; )
      e.deleted ? e.id.clock < (t.beforeState.get(e.id.client) || 0) && t._mergeStructs.push(e) : e.delete(t), e = e.right;
    this.type._map.forEach((s) => {
      s.deleted ? s.id.clock < (t.beforeState.get(s.id.client) || 0) && t._mergeStructs.push(s) : s.delete(t);
    }), t.changed.delete(this.type);
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
    let e = this.type._start;
    for (; e !== null; )
      e.gc(t, !0), e = e.right;
    this.type._start = null, this.type._map.forEach(
      /** @param {Item | null} item */
      (s) => {
        for (; s !== null; )
          s.gc(t, !0), s = s.left;
      }
    ), this.type._map = /* @__PURE__ */ new Map();
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, e) {
    this.type._write(t);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 7;
  }
}
const Me = (n, t) => {
  let e = t, s = 0, i;
  do
    s > 0 && (e = w(e.client, e.clock + s)), i = nt(n, e), s = e.clock - i.id.clock, e = i.redone;
  while (e !== null && i instanceof k);
  return {
    item: i,
    diff: s
  };
}, sn = (n, t) => {
  for (; n !== null && n.keep !== t; )
    n.keep = t, n = /** @type {AbstractType<any>} */
    n.parent._item;
}, Ys = (n, t, e) => {
  const { client: s, clock: i } = t.id, r = new k(
    w(s, i + e),
    t,
    w(s, i + e - 1),
    t.right,
    t.rightOrigin,
    t.parent,
    t.parentSub,
    t.content.splice(e)
  );
  return t.deleted && r.markDeleted(), t.keep && (r.keep = !0), t.redone !== null && (r.redone = w(t.redone.client, t.redone.clock + e)), t.right = r, r.right !== null && (r.right.left = r), n._mergeStructs.push(r), r.parentSub !== null && r.right === null && r.parent._map.set(r.parentSub, r), t.length = e, r;
}, Un = (n, t) => Ue(
  n,
  /** @param {StackItem} s */
  (e) => Tt(e.deletions, t)
), zs = (n, t, e, s, i, r) => {
  const o = n.doc, l = o.store, c = o.clientID, h = t.redone;
  if (h !== null)
    return O(n, h);
  let u = (
    /** @type {AbstractType<any>} */
    t.parent._item
  ), a = null, f;
  if (u !== null && u.deleted === !0) {
    if (u.redone === null && (!e.has(u) || zs(n, u, e, s, i, r) === null))
      return null;
    for (; u.redone !== null; )
      u = O(n, u.redone);
  }
  const d = u === null ? (
    /** @type {AbstractType<any>} */
    t.parent
  ) : (
    /** @type {ContentType} */
    u.content.type
  );
  if (t.parentSub === null) {
    for (a = t.left, f = t; a !== null; ) {
      let m = a;
      for (; m !== null && /** @type {AbstractType<any>} */
      m.parent._item !== u; )
        m = m.redone === null ? null : O(n, m.redone);
      if (m !== null && /** @type {AbstractType<any>} */
      m.parent._item === u) {
        a = m;
        break;
      }
      a = a.left;
    }
    for (; f !== null; ) {
      let m = f;
      for (; m !== null && /** @type {AbstractType<any>} */
      m.parent._item !== u; )
        m = m.redone === null ? null : O(n, m.redone);
      if (m !== null && /** @type {AbstractType<any>} */
      m.parent._item === u) {
        f = m;
        break;
      }
      f = f.right;
    }
  } else {
    if (f = null, t.right && !i) {
      for (a = t; a !== null && a.right !== null && (a.right.redone || Tt(s, a.right.id) || Un(r.undoStack, a.right.id) || Un(r.redoStack, a.right.id)); )
        for (a = a.right; a.redone; ) a = O(n, a.redone);
      if (a && a.right !== null)
        return null;
    } else
      a = d._map.get(t.parentSub) || null;
    a !== null && /** @type {AbstractType<any>} */
    a.parent._item !== u && (a = d._map.get(t.parentSub) || null);
  }
  const g = x(l, c), p = w(c, g), b = new k(
    p,
    a,
    a && a.lastId,
    f,
    f && f.id,
    d,
    t.parentSub,
    t.content.copy()
  );
  return t.redone = p, sn(b, !0), b.integrate(n, 0), b;
};
class k extends js {
  /**
   * @param {ID} id
   * @param {Item | null} left
   * @param {ID | null} origin
   * @param {Item | null} right
   * @param {ID | null} rightOrigin
   * @param {AbstractType<any>|ID|null} parent Is a type if integrated, is null if it is possible to copy parent from left or right, is ID before integration to search for it.
   * @param {string | null} parentSub
   * @param {AbstractContent} content
   */
  constructor(t, e, s, i, r, o, l, c) {
    super(t, c.getLength()), this.origin = s, this.left = e, this.right = i, this.rightOrigin = r, this.parent = o, this.parentSub = l, this.redone = null, this.content = c, this.info = this.content.isCountable() ? hn : 0;
  }
  /**
   * This is used to mark the item as an indexed fast-search marker
   *
   * @type {boolean}
   */
  set marker(t) {
    (this.info & de) > 0 !== t && (this.info ^= de);
  }
  get marker() {
    return (this.info & de) > 0;
  }
  /**
   * If true, do not garbage collect this Item.
   */
  get keep() {
    return (this.info & cn) > 0;
  }
  set keep(t) {
    this.keep !== t && (this.info ^= cn);
  }
  get countable() {
    return (this.info & hn) > 0;
  }
  /**
   * Whether this item was deleted or not.
   * @type {Boolean}
   */
  get deleted() {
    return (this.info & ue) > 0;
  }
  set deleted(t) {
    this.deleted !== t && (this.info ^= ue);
  }
  markDeleted() {
    this.info |= ue;
  }
  /**
   * Return the creator clientID of the missing op or define missing items and return null.
   *
   * @param {Transaction} transaction
   * @param {StructStore} store
   * @return {null | number}
   */
  getMissing(t, e) {
    if (this.origin && this.origin.client !== this.id.client && this.origin.clock >= x(e, this.origin.client))
      return this.origin.client;
    if (this.rightOrigin && this.rightOrigin.client !== this.id.client && this.rightOrigin.clock >= x(e, this.rightOrigin.client))
      return this.rightOrigin.client;
    if (this.parent && this.parent.constructor === Ut && this.id.client !== this.parent.client && this.parent.clock >= x(e, this.parent.client))
      return this.parent.client;
    if (this.origin && (this.left = Tn(t, e, this.origin), this.origin = this.left.lastId), this.rightOrigin && (this.right = O(t, this.rightOrigin), this.rightOrigin = this.right.id), this.left && this.left.constructor === G || this.right && this.right.constructor === G)
      this.parent = null;
    else if (!this.parent)
      this.left && this.left.constructor === k ? (this.parent = this.left.parent, this.parentSub = this.left.parentSub) : this.right && this.right.constructor === k && (this.parent = this.right.parent, this.parentSub = this.right.parentSub);
    else if (this.parent.constructor === Ut) {
      const s = nt(e, this.parent);
      s.constructor === G ? this.parent = null : this.parent = /** @type {ContentType} */
      s.content.type;
    }
    return null;
  }
  /**
   * @param {Transaction} transaction
   * @param {number} offset
   */
  integrate(t, e) {
    if (e > 0 && (this.id.clock += e, this.left = Tn(t, t.doc.store, w(this.id.client, this.id.clock - 1)), this.origin = this.left.lastId, this.content = this.content.splice(e), this.length -= e), this.parent) {
      if (!this.left && (!this.right || this.right.left !== null) || this.left && this.left.right !== this.right) {
        let s = this.left, i;
        if (s !== null)
          i = s.right;
        else if (this.parentSub !== null)
          for (i = /** @type {AbstractType<any>} */
          this.parent._map.get(this.parentSub) || null; i !== null && i.left !== null; )
            i = i.left;
        else
          i = /** @type {AbstractType<any>} */
          this.parent._start;
        const r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set();
        for (; i !== null && i !== this.right; ) {
          if (o.add(i), r.add(i), Q(this.origin, i.origin)) {
            if (i.id.client < this.id.client)
              s = i, r.clear();
            else if (Q(this.rightOrigin, i.rightOrigin))
              break;
          } else if (i.origin !== null && o.has(nt(t.doc.store, i.origin)))
            r.has(nt(t.doc.store, i.origin)) || (s = i, r.clear());
          else
            break;
          i = i.right;
        }
        this.left = s;
      }
      if (this.left !== null) {
        const s = this.left.right;
        this.right = s, this.left.right = this;
      } else {
        let s;
        if (this.parentSub !== null)
          for (s = /** @type {AbstractType<any>} */
          this.parent._map.get(this.parentSub) || null; s !== null && s.left !== null; )
            s = s.left;
        else
          s = /** @type {AbstractType<any>} */
          this.parent._start, this.parent._start = this;
        this.right = s;
      }
      this.right !== null ? this.right.left = this : this.parentSub !== null && (this.parent._map.set(this.parentSub, this), this.left !== null && this.left.delete(t)), this.parentSub === null && this.countable && !this.deleted && (this.parent._length += this.length), Ss(t.doc.store, this), this.content.integrate(t, this), On(
        t,
        /** @type {AbstractType<any>} */
        this.parent,
        this.parentSub
      ), /** @type {AbstractType<any>} */
      (this.parent._item !== null && /** @type {AbstractType<any>} */
      this.parent._item.deleted || this.parentSub !== null && this.right !== null) && this.delete(t);
    } else
      new G(this.id, this.length).integrate(t, 0);
  }
  /**
   * Returns the next non-deleted item
   */
  get next() {
    let t = this.right;
    for (; t !== null && t.deleted; )
      t = t.right;
    return t;
  }
  /**
   * Returns the previous non-deleted item
   */
  get prev() {
    let t = this.left;
    for (; t !== null && t.deleted; )
      t = t.left;
    return t;
  }
  /**
   * Computes the last content address of this Item.
   */
  get lastId() {
    return this.length === 1 ? this.id : w(this.id.client, this.id.clock + this.length - 1);
  }
  /**
   * Try to merge two items
   *
   * @param {Item} right
   * @return {boolean}
   */
  mergeWith(t) {
    if (this.constructor === t.constructor && Q(t.origin, this.lastId) && this.right === t && Q(this.rightOrigin, t.rightOrigin) && this.id.client === t.id.client && this.id.clock + this.length === t.id.clock && this.deleted === t.deleted && this.redone === null && t.redone === null && this.content.constructor === t.content.constructor && this.content.mergeWith(t.content)) {
      const e = (
        /** @type {AbstractType<any>} */
        this.parent._searchMarker
      );
      return e && e.forEach((s) => {
        s.p === t && (s.p = this, !this.deleted && this.countable && (s.index -= this.length));
      }), t.keep && (this.keep = !0), this.right = t.right, this.right !== null && (this.right.left = this), this.length += t.length, !0;
    }
    return !1;
  }
  /**
   * Mark this Item as deleted.
   *
   * @param {Transaction} transaction
   */
  delete(t) {
    if (!this.deleted) {
      const e = (
        /** @type {AbstractType<any>} */
        this.parent
      );
      this.countable && this.parentSub === null && (e._length -= this.length), this.markDeleted(), Ze(t.deleteSet, this.id.client, this.id.clock, this.length), On(t, e, this.parentSub), this.content.delete(t);
    }
  }
  /**
   * @param {StructStore} store
   * @param {boolean} parentGCd
   */
  gc(t, e) {
    if (!this.deleted)
      throw N();
    this.content.gc(t), e ? so(t, this, new G(this.id, this.length)) : this.content = new Kt(this.length);
  }
  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   * @param {number} offset
   */
  write(t, e) {
    const s = e > 0 ? w(this.id.client, this.id.clock + e - 1) : this.origin, i = this.rightOrigin, r = this.parentSub, o = this.content.getRef() & si | (s === null ? 0 : Bt) | // origin is defined
    (i === null ? 0 : jn) | // right origin is defined
    (r === null ? 0 : ni);
    if (t.writeInfo(o), s !== null && t.writeLeftID(s), i !== null && t.writeRightID(i), s === null && i === null) {
      const l = (
        /** @type {AbstractType<any>} */
        this.parent
      );
      if (l._item !== void 0) {
        const c = l._item;
        if (c === null) {
          const h = ks(l);
          t.writeParentInfo(!0), t.writeString(h);
        } else
          t.writeParentInfo(!1), t.writeLeftID(c.id);
      } else l.constructor === String ? (t.writeParentInfo(!0), t.writeString(l)) : l.constructor === Ut ? (t.writeParentInfo(!1), t.writeLeftID(l)) : N();
      r !== null && t.writeString(r);
    }
    this.content.write(t, e);
  }
}
const Gs = (
  /** @type {any} */
  typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : {}
), Hs = "__ $YJS$ __";
Gs[Hs] === !0 && console.error("Yjs was already imported. This breaks constructor checks and will lead to issues! - https://github.com/yjs/yjs/issues/438");
Gs[Hs] = !0;
class rn {
  /**
   * @param {Y.RelativePosition} yanchor
   * @param {Y.RelativePosition} yhead
   */
  constructor(t, e) {
    this.yanchor = t, this.yhead = e;
  }
  /**
   * @returns {any}
   */
  toJSON() {
    return {
      yanchor: In(this.yanchor),
      yhead: In(this.yhead)
    };
  }
  /**
   * @param {any} json
   * @return {YRange}
   */
  static fromJSON(t) {
    return new rn(St(t.yanchor), St(t.yhead));
  }
}
class Mo {
  constructor(t, e) {
    this.ytext = t, this.awareness = e, this.undoManager = new As(t);
  }
  /**
   * Helper function to transform an absolute index position to a Yjs-based relative position
   * (https://docs.yjs.dev/api/relative-positions).
   *
   * A relative position can be transformed back to an absolute position even after the document has changed. The position is
   * automatically adapted. This does not require any position transformations. Relative positions are computed based on
   * the internal Yjs document model. Peers that share content through Yjs are guaranteed that their positions will always
   * synced up when using relatve positions.
   *
   * ```js
   * import { ySyncFacet } from 'y-codemirror'
   *
   * ..
   * const ysync = view.state.facet(ySyncFacet)
   * // transform an absolute index position to a ypos
   * const ypos = ysync.getYPos(3)
   * // transform the ypos back to an absolute position
   * ysync.fromYPos(ypos) // => 3
   * ```
   *
   * It cannot be guaranteed that absolute index positions can be synced up between peers.
   * This might lead to undesired behavior when implementing features that require that all peers see the
   * same marked range (e.g. a comment plugin).
   *
   * @param {number} pos
   * @param {number} [assoc]
   */
  toYPos(t, e = 0) {
    return Ie(this.ytext, t, e);
  }
  /**
   * @param {Y.RelativePosition | Object} rpos
   */
  fromYPos(t) {
    const e = xe(St(t), this.ytext.doc);
    if (e == null || e.type !== this.ytext)
      throw new Error("[y-codemirror] The position you want to retrieve was created by a different document");
    return {
      pos: e.index,
      assoc: e.assoc
    };
  }
  /**
   * @param {cmState.SelectionRange} range
   * @return {YRange}
   */
  toYRange(t) {
    const e = t.assoc, s = this.toYPos(t.anchor, e), i = this.toYPos(t.head, e);
    return new rn(s, i);
  }
  /**
   * @param {YRange} yrange
   */
  fromYRange(t) {
    const e = this.fromYPos(t.yanchor), s = this.fromYPos(t.yhead);
    return e.pos === s.pos ? ln.cursor(s.pos, s.assoc) : ln.range(e.pos, s.pos);
  }
}
const ce = Fn.define({
  combine(n) {
    return n[n.length - 1];
  }
}), Le = Bn.define();
class Lo {
  /**
   * @param {cmView.EditorView} view
   */
  constructor(t) {
    this.view = t, this.conf = t.state.facet(ce), this._observer = (e, s) => {
      if (s.origin !== this.conf) {
        const i = e.delta, r = [];
        let o = 0;
        for (let l = 0; l < i.length; l++) {
          const c = i[l];
          c.insert != null ? r.push({ from: o, to: o, insert: c.insert }) : c.delete != null ? (r.push({ from: o, to: o + c.delete, insert: "" }), o += c.delete) : o += c.retain;
        }
        t.dispatch({ changes: r, annotations: [Le.of(this.conf)] });
      }
    }, this._ytext = this.conf.ytext, this._ytext.observe(this._observer);
  }
  /**
   * @param {cmView.ViewUpdate} update
   */
  update(t) {
    if (!t.docChanged || t.transactions.length > 0 && t.transactions[0].annotation(Le) === this.conf)
      return;
    const e = this.conf.ytext;
    e.doc.transact(() => {
      let s = 0;
      t.changes.iterChanges((i, r, o, l, c) => {
        const h = c.sliceString(0, c.length, `
`);
        i !== r && e.delete(i + s, r - i), h.length > 0 && e.insert(i + s, h), s += h.length - (r - i);
      });
    }, this.conf);
  }
  destroy() {
    this._ytext.unobserve(this._observer);
  }
}
const vo = $e.fromClass(Lo), $o = Re.baseTheme({
  ".cm-ySelection": {},
  ".cm-yLineSelection": {
    padding: 0,
    margin: "0px 2px 0px 4px"
  },
  ".cm-ySelectionCaret": {
    position: "relative",
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
    marginLeft: "-1px",
    marginRight: "-1px",
    boxSizing: "border-box",
    display: "inline"
  },
  ".cm-ySelectionCaretDot": {
    borderRadius: "50%",
    position: "absolute",
    width: ".4em",
    height: ".4em",
    top: "-.2em",
    left: "-.2em",
    backgroundColor: "inherit",
    transition: "transform .3s ease-in-out",
    boxSizing: "border-box"
  },
  ".cm-ySelectionCaret:hover > .cm-ySelectionCaretDot": {
    transformOrigin: "bottom center",
    transform: "scale(0)"
  },
  ".cm-ySelectionInfo": {
    position: "absolute",
    top: "-1.05em",
    left: "-1px",
    fontSize: ".75em",
    fontFamily: "serif",
    fontStyle: "normal",
    fontWeight: "normal",
    lineHeight: "normal",
    userSelect: "none",
    color: "white",
    paddingLeft: "2px",
    paddingRight: "2px",
    zIndex: 101,
    transition: "opacity .3s ease-in-out",
    backgroundColor: "inherit",
    // these should be separate
    opacity: 0,
    transitionDelay: "0s",
    whiteSpace: "nowrap"
  },
  ".cm-ySelectionCaret:hover > .cm-ySelectionInfo": {
    opacity: 1,
    transitionDelay: "0s"
  }
}), Ro = Bn.define();
class No extends Ks {
  /**
   * @param {string} color
   * @param {string} name
   */
  constructor(t, e) {
    super(), this.color = t, this.name = e;
  }
  toDOM() {
    return (
      /** @type {HTMLElement} */
      me("span", [L("class", "cm-ySelectionCaret"), L("style", `background-color: ${this.color}; border-color: ${this.color}`)], [
        Ot("⁠"),
        me("div", [
          L("class", "cm-ySelectionCaretDot")
        ]),
        Ot("⁠"),
        me("div", [
          L("class", "cm-ySelectionInfo")
        ], [
          Ot(this.name)
        ]),
        Ot("⁠")
      ])
    );
  }
  eq(t) {
    return t.color === this.color;
  }
  compare(t) {
    return t.color === this.color;
  }
  updateDOM() {
    return !1;
  }
  get estimatedHeight() {
    return -1;
  }
  ignoreEvent() {
    return !0;
  }
}
class Uo {
  /**
   * @param {cmView.EditorView} view
   */
  constructor(t) {
    this.conf = t.state.facet(ce), this._listener = ({ added: e, updated: s, removed: i }, r, o) => {
      e.concat(s).concat(i).findIndex((c) => c !== this.conf.awareness.doc.clientID) >= 0 && t.dispatch({ annotations: [Ro.of([])] });
    }, this._awareness = this.conf.awareness, this._awareness.on("change", this._listener), this.decorations = qs.of([]);
  }
  destroy() {
    this._awareness.off("change", this._listener);
  }
  /**
   * @param {cmView.ViewUpdate} update
   */
  update(t) {
    const e = this.conf.ytext, s = (
      /** @type {Y.Doc} */
      e.doc
    ), i = this.conf.awareness, r = [], o = this.conf.awareness.getLocalState();
    if (o != null) {
      const l = t.view.hasFocus && t.view.dom.ownerDocument.hasFocus(), c = l ? t.state.selection.main : null, h = o.cursor == null ? null : St(o.cursor.anchor), u = o.cursor == null ? null : St(o.cursor.head);
      if (c != null) {
        const a = Ie(e, c.anchor), f = Ie(e, c.head);
        (o.cursor == null || !xn(h, a) || !xn(u, f)) && i.setLocalStateField("cursor", {
          anchor: a,
          head: f
        });
      } else o.cursor != null && l && i.setLocalStateField("cursor", null);
    }
    i.getStates().forEach((l, c) => {
      if (c === i.doc.clientID)
        return;
      const h = l.cursor;
      if (h == null || h.anchor == null || h.head == null)
        return;
      const u = xe(h.anchor, s), a = xe(h.head, s);
      if (u == null || a == null || u.type !== e || a.type !== e)
        return;
      const { color: f = "#30bced", name: d = "Anonymous" } = l.user || {}, g = l.user && l.user.colorLight || f + "33", p = Fe(u.index, a.index), b = J(u.index, a.index), m = t.view.state.doc.lineAt(p), X = t.view.state.doc.lineAt(b);
      if (m.number === X.number)
        r.push({
          from: p,
          to: b,
          value: K.mark({
            attributes: { style: `background-color: ${g}` },
            class: "cm-ySelection"
          })
        });
      else {
        r.push({
          from: p,
          to: m.from + m.length,
          value: K.mark({
            attributes: { style: `background-color: ${g}` },
            class: "cm-ySelection"
          })
        }), r.push({
          from: X.from,
          to: b,
          value: K.mark({
            attributes: { style: `background-color: ${g}` },
            class: "cm-ySelection"
          })
        });
        for (let q = m.number + 1; q < X.number; q++) {
          const on = t.view.state.doc.line(q).from;
          r.push({
            from: on,
            to: on,
            value: K.line({
              attributes: { style: `background-color: ${g}`, class: "cm-yLineSelection" }
            })
          });
        }
      }
      r.push({
        from: a.index,
        to: a.index,
        value: K.widget({
          side: a.index - u.index > 0 ? -1 : 1,
          // the local cursor should be rendered outside the remote selection
          block: !1,
          widget: new No(f, d)
        })
      });
    }), this.decorations = K.set(r, !0);
  }
}
const Fo = $e.fromClass(Uo, {
  decorations: (n) => n.decorations
}), Bo = () => {
  let n = !0;
  return (t, e) => {
    if (n) {
      n = !1;
      try {
        t();
      } finally {
        n = !0;
      }
    } else e !== void 0 && e();
  };
};
class Vo {
  /**
   * @param {Y.UndoManager} undoManager
   */
  constructor(t) {
    this.undoManager = t;
  }
  /**
   * @param {any} origin
   */
  addTrackedOrigin(t) {
    this.undoManager.addTrackedOrigin(t);
  }
  /**
   * @param {any} origin
   */
  removeTrackedOrigin(t) {
    this.undoManager.removeTrackedOrigin(t);
  }
  /**
   * @return {boolean} Whether a change was undone.
   */
  undo() {
    return this.undoManager.undo() != null;
  }
  /**
   * @return {boolean} Whether a change was redone.
   */
  redo() {
    return this.undoManager.redo() != null;
  }
}
const he = Fn.define({
  combine(n) {
    return n[n.length - 1];
  }
});
class jo {
  /**
   * @param {cmView.EditorView} view
   */
  constructor(t) {
    this.view = t, this.conf = t.state.facet(he), this._undoManager = this.conf.undoManager, this.syncConf = t.state.facet(ce), this._beforeChangeSelection = null, this._mux = Bo(), this._onStackItemAdded = ({ stackItem: e, changedParentTypes: s }) => {
      s.has(this.syncConf.ytext) && this._beforeChangeSelection && !e.meta.has(this) && e.meta.set(this, this._beforeChangeSelection);
    }, this._onStackItemPopped = ({ stackItem: e }) => {
      const s = e.meta.get(this);
      if (s) {
        const i = this.syncConf.fromYRange(s);
        t.dispatch(t.state.update({
          selection: i,
          effects: [Re.scrollIntoView(i)]
        })), this._storeSelection();
      }
    }, this._storeSelection = () => {
      this._beforeChangeSelection = this.syncConf.toYRange(this.view.state.selection.main);
    }, this._undoManager.on("stack-item-added", this._onStackItemAdded), this._undoManager.on("stack-item-popped", this._onStackItemPopped), this._undoManager.addTrackedOrigin(this.syncConf);
  }
  /**
   * @param {cmView.ViewUpdate} update
   */
  update(t) {
    t.selectionSet && (t.transactions.length === 0 || t.transactions[0].annotation(Le) !== this.syncConf) && this._storeSelection();
  }
  destroy() {
    this._undoManager.off("stack-item-added", this._onStackItemAdded), this._undoManager.off("stack-item-popped", this._onStackItemPopped), this._undoManager.removeTrackedOrigin(this.syncConf);
  }
}
const Yo = $e.fromClass(jo), Ws = ({ state: n, dispatch: t }) => n.facet(he).undo() || !0, ve = ({ state: n, dispatch: t }) => n.facet(he).redo() || !0, Ho = [
  { key: "Mod-z", run: Ws, preventDefault: !0 },
  { key: "Mod-y", mac: "Mod-Shift-z", run: ve, preventDefault: !0 },
  { key: "Mod-Shift-z", run: ve, preventDefault: !0 }
], Wo = (n, t, { undoManager: e = new As(n) } = {}) => {
  const s = new Mo(n, t), i = [
    ce.of(s),
    vo
  ];
  return t && i.push(
    $o,
    Fo
  ), e !== !1 && i.push(
    he.of(new Vo(e)),
    Yo,
    Re.domEventHandlers({
      beforeinput(r, o) {
        return r.inputType === "historyUndo" ? Ws(o) : r.inputType === "historyRedo" ? ve(o) : !1;
      }
    })
  ), i;
};
export {
  rn as YRange,
  Mo as YSyncConfig,
  Wo as yCollab,
  Fo as yRemoteSelections,
  $o as yRemoteSelectionsTheme,
  vo as ySync,
  ce as ySyncFacet,
  Ho as yUndoManagerKeymap
};
//# sourceMappingURL=index-CX3OD3Gj.js.map
