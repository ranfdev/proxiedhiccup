const selfClosing = new Set([
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
  ]);
  
  export const h = new Proxy({}, {
    get(_obj, prop) {
      let res = {
        tag: "",
        attrs: {},
        children: [],
        classes: [],
        [Symbol.for("hiccup")]: true
      };
      function parseArgs(...children) {
        let attrs = {};
        if (children.length > 0 && typeof children[0] == "object" && !isHiccup(children[0])) {
          attrs = children.shift()
        }
        res.tag = prop;
        if (res.classes.length > 0) {
          if (!attrs["class"]) {
            attrs["class"] = ""
          }
          attrs["class"] += res.classes.join(" ")
        }
        res.attrs = attrs;
        res.children = children;
        return res;
      }
      let proxied = new Proxy(parseArgs, {
        get(_obj, prop) {
          console.log("pushing", res, prop)
          res.classes.push(prop)
          return proxied
        }
      });
      return proxied;
    }
  });
  
  
  export function isHiccup(obj) {
    return typeof obj[Symbol.for("hiccup")] == "boolean"
  }
  
  function canonicalizeAttrKey(k) {
    return k.replace("_", "-")
  }
  function hAttrsToHTML(attrs) {
    if (attrs) {
      return Object.entries(attrs).map(([k, v]) => `${canonicalizeAttrKey(k)}="${v}"`).join(" ")
    }
  
    return ""
  }
  export function hToHTML(h) {
    if (typeof h == "string") return h
    if (Array.isArray(h)) return h.map(h => hToHTML(h)).join("\n")
    if (typeof h == "object" && selfClosing.has(h.tag)) {
      return `<${h.tag} ${hAttrsToHTML(h.attrs)}/>`
    }
    if (typeof h == "object") {
      return `<${h.tag} ${hAttrsToHTML(h.attrs)}>${hToHTML(h.children)}</${h.tag}>`
    }
    throw new Error(`Invalid hiccup: ${h}`)
  }