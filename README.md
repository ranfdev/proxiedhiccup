# proxiedhiccup
Create an HTML document with a Javascript DSL adapted from Clojure's Hiccup


# Example
## Basic
```js
import {h, hToHTML} from "./hiccup"

const doc = h.div(
    h.h1("Hello world"),
    h.p("Pretty nice")
)

console.log(hToHTML(doc))
```

output

```html
<div>
    <h1>Hello world</h1>
    <p>Pretty nice</p>
</div>
```

## Attributes
```js
h.form({action: "/email", method: "post"}, 
    h.input({type: "text", name: "username", placeholder: "username..."}),
    h.input({type: "text", name: "password", placeholder: "password..."}),
)
```

## Css classes shorthand
```js
// all of these are equivalent
let ex1 = h.h1.heading("Big text");
let ex2 = h.h1["heading"]("Big text");
let ex3 = h.h1({class: "heading"}, "Big text");
```

## Components
Use a function to organize the code and improve readability:
```js
function header({title, subtitle}) {
    return h.header(
        h.h1["big-title-class another-class red"](title),
        h.h2(subtitle)
    )
}

function home() {
    return h.div(
        header({title: "News", subtitle: "Hottest news refreshed hourly"}),
        h.ul(
            h.li("News 1"),
            h.li("News 2"),
        )
    )
}
```

## Tailwind
```js

function button(label) {
    return h.button[`rounded font-bold bg-blue-500 shadow-lg`](label);
}

function page() {
    return h.div(
        h.h1["text-lg font-bold"]("Do you want to subscribe?"),
        button("Subscribe")
    )
}
```

# Security
The text isn't escaped automatically, only provide trusted values. It can be automated easily if necessary.
This code was just a proof of concept.