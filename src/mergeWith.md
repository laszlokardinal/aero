# mergeWith operator

`mergeWith(...sources)(source) -> subscribe function`

Merges the incoming actions of the source and each
argument observable into one stream.

```js
const sequence = require("asura/sequence");
const mergeWith = require("asura/mergeWith");
const log = require("asura/log");

sequence([1, 2, 3])
  |> mergeWith(sequence([10, 20, 30]))
  |> log()

// logs
// 1
// 10
// 2
// 20
// 3
// 30
```