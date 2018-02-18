# filterBy operator

`filterBy(key, value|values)(source) -> subscribe function`

Emits the incoming action to the subscribers if its property
under the key argument is the value, or inclued in the array of values.

```js
const sequence = require("asura/sequence");
const filterBy = require("asura/filterBy");
const log = require("asura/log");

sequence([
  { type: "ADD", value: 1 },
  { type: "SUBTRACT", value: 2 },
  { type: "SUBTRACT", value: 3 },
  { type: "ADD", value: 4 }
])
  |> filterBy("type", "ADD")
  |> log();

// logs:
// { type: "ADD", value: 1 }
// { type: "ADD", value: 4 }
```

```js
const sequence = require("asura/sequence");
const filterBy = require("asura/filterBy");
const log = require("asura/log");

sequence([
  { type: "ADD", value: 1 },
  { type: "MULTIPLY", value: 2 },
  { type: "SUBTRACT", value: 3 },
  { type: "DIVIDE", value: 4 }
])
  |> filterBy("type", ["ADD", "SUBTRACT"])
  |> log();

// logs:
// { type: "ADD", value: 1 }
// { type: "SUBTRACT", value: 3 }
```
