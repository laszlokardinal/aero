# scan operator

`scan(callback, accumulator?)(source) -> subscribe function`

Calls the callback with the accumulator (result of previous callback),
and the current action. The result accumulator will be emitted to the subscribers.

If the accumulator is not defined, the first action will take it's place,
and the callback will be invoked only on the second action.

Example:

```js
const sequence = require("asura/sequence");
const scan = require("asura/scan");
const log = require("asura/log");

sequence([0, 1, 2, 3, 4])
  |> scan((accumulator, action) => accumulator + action, 100)
  |> log()

// logs:
// 100
// 101
// 103
// 106
// 110
```
