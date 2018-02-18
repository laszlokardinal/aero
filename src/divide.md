# divide operator

`divide(length = 2)(source) -> [observable]`

Splits the action array and emits them to the observables with the same index.

```js
const sequence = require("asura/sequence");
const divide = require("asura/divide");
const assign = require("asura/assign");
const log = require("asura/log");

const streams = {};

sequence([
  [47.49801, 19.03991],
  [48.1, 20.78333],
  [47.53333, 21.63333]
])
  |> divide()
  |> assign(streams, ["latitudes", "longitudes"]);

streams.latitudes |> log("latitude:");

streams.longitudes |> log("longitude:");

// logs
// latitude: 47.49801
// longitude: 19.03991
// latitude: 48.1
// longitude: 20.78333
// latitude: 47.53333
// longitude: 21.63333
```
