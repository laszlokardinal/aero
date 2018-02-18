# skip operator

`skip(count)(source) -> subscribe function`

Lets through actions only after the specified
number of incoming actions.

```js
const sequence = require("asura/sequence");
const skip = require("asura/skip");
const log = require("asura/log");

sequence([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  |> skip(4)
  |> log()

// logs:
// 4
// 5
// 6
// 7
// 8
// 9
```