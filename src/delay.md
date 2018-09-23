# delay operator

`delay(timeInMs)(source) -> subscribe function`

Delays emitting of the incoming actions to the source
by the argument timeout.

```js
const sequence = require("asura/sequence");
const delay = require("asura/delay");
const log = require("asura/log");

const startTimeStamp = Date.now();

sequence([1, 2, 3])
  |> delay(500)
  |> map(
  |> log()

// logs
// [1, undefined]
// [1, 10]
// [2, 10]
// [2, 20]
// [3, 20]
// [3, 30]
```
