# map operator

`map(callback)(scan) -> subscribe function`

Applies the callback function on each action then
emits the result.

Example:

```js
const sequence = require("asura/sequence");
const map = require("asura/map");
const log = require("asura/log");

sequence([0, 1, 2, 3, 4])
  |> map(value => value * 2)
  |> log()

// logs:
// 0
// 2
// 4
// 6
// 8
```
