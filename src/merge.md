# merge

`merge(...sources) -> subscribe function`

Merges the incoming actions of the argument observables into one stream.

```js
const sequence = require("asura/sequence");
const merge = require("asura/merge");
const log = require("asura/log");

merge(
  sequence([1, 2, 3]),
  sequence([10, 20, 30])
) |> log()

// logs
// 1
// 10
// 2
// 20
// 3
// 30
```