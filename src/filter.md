# filter operator

`filter(callback)(source) -> subscribe function`

Calls the callback function with the action,
and emits it to the subscribers if the callbacks returns true.

```js
const sequence = require("asura/sequence");
const filter = require("asura/filter");
const log = require("asura/log");

sequence([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  |> filter(value => value % 2)
  |> log()

// logs:
// 1
// 3
// 5
// 7
// 9
```
