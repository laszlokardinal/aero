# immediateScheduler

`immediateScheduler() -> scheduler`

Creates a scheduler that uses [setImmediate](https://developer.mozilla.org/en-US/docs/Web/API/Window/setImmediate),
and imports a [polyfill](https://github.com/YuzuJS/setImmediate) for that.

```js
const sequence = require("asura/sequence");
const immediateScheduler = require("asura/immediateScheduler");
const log = require("asura/log");

sequence([0, 1, 2, 3, 4], immediateScheduler())
  |> log()
```