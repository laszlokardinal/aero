# combineWith operator

`combineWith(...sources)(source) -> subscribe function`

Combines the latest values of the source and each argument observable
into an array, and emits it when any of them gets updated.

```js
const sequence = require("asura/sequence");
const combineWith = require("asura/combineWith");
const log = require("asura/log");

sequence([1, 2, 3])
  |> combineWith(sequence([10, 20, 30]))
  |> log()

// logs
// [1, undefined]
// [1, 10]
// [2, 10]
// [2, 20]
// [3, 20]
// [3, 30]
```