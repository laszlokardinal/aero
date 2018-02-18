# at operator

`at(index)(source) -> subscribe function`

Only lets through the action at the
index specified in the argument.

```js
const sequence = require("asura/sequence");
const at = require("asura/at");
const log = require("asura/log");

sequence([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  |> at(4)
  |> log()

// logs:
// 4
```