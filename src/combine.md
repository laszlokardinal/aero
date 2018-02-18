# combine operator

`combine(...sources) -> subscribe function`

Combines the latest values of each argument source into an array,
and emits it when any of them gets updated.

```js
const sequence = require("asura/sequence");
const combine = require("asura/combine");
const log = require("asura/log");

combine(
  sequence([1, 2, 3]),
  sequence([10, 20, 30])
) |> log()

// logs
// [1, undefined]
// [1, 10]
// [2, 10]
// [2, 20]
// [3, 20]
// [3, 30]
```
