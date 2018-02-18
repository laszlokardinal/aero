# invoke operator

`invoke(callback)(source) -> void`

Invokes the callback function with the incoming action.

```js
const sequence = require("asura/sequence");
const map = require("asura/map");
const invoke = require("asura/invoke");

sequence([0, 1, 2, 3, 4])
  |> map((value) => `<div>${value}</div>`)
  |> invoke((html) => {
    document.getElementById("numbers").insertAdjacentHTML("beforeend", html);
  });
```
