# split operator

`split(choice, length = 2)(source) -> [subscribe function]`

Splits the incoming actions of the stream by the callback result into an array of the specified length.

```js
const sequence = require("asura/sequence");
const split = require("asura/split");
const assign = require("asura/assign");
const log = require("asura/log");

const streams = {};

sequence([-3, -2, -1, 0, 1, 2, 3])
  |> split(value => value ? (value > 0 ? 1 : 2) : 0, 3)
  |> assign(streams, ["zeros", "positives", "negatives"]);

streams.negatives |> log("negative:");

streams.zeros |> log("zero:");

streams.positives |> log("positive:");

// logs
// negative: -3
// negative: -2
// negative: -1
// zero: 0
// positive: 1
// positive: 2
// positive: 3
```

