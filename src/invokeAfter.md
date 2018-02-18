# invokeAfter operator

`invokeAfter(callback)(source) -> subscribe function`

Invokes the callback function with the action after emitting it to the observers.
Can be used for side effects.

```js
const sequence = require("asura/sequence");
const invokeAfter = require("asura/invokeAfter");
const log = require("asura/log");

sequence([0, 1, 2, 3])
  |> invokeAfter(action => console.log("invoked after", action))
  |> log()

// logs:
// 0
// invoked after 0
// 1
// invoked after 1
// 2
// invoked after 2
// 3
// invoked after 3
```