# invokeBefore operator

`invokeBefore(callback)(source) -> subscribe function`

Invokes the callback function with the action before emitting it to the observers.
Can be used for side effects.

```js
const sequence = require("asura/sequence");
const invokeBefore = require("asura/invokeBefore");
const log = require("asura/log");

sequence([0, 1, 2, 3])
  |> invokeBefore(action => console.log("invoked before", action))
  |> log()

// logs:
// invoked before 0
// 0
// invoked before 1
// 1
// invoked before 2
// 2
// invoked before 3
// 3
```