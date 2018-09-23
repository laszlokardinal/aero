# select operator

`select(path)(source) -> subscribe function`

Selects values from deeply nested action objects or array by the argument path.
Emits undefined on missing target value.

Example:

```js
const sequence = require("asura/sequence");
const select = require("asura/select");
const log = require("asura/log");

sequence([
  { items: [{ id: 10 }, { id: 11 }, { id: 12 }] },
  { items: [{ id: 20 }, { id: 21 }, { id: 22 }] },
  { items: [{ id: 30 }, { id: 31 }, { id: 32 }] },
  { items: [] }
])
  |> select("items[0].id")
  |> log();

// logs:
// 10
// 20
// 30
// undefined
```
