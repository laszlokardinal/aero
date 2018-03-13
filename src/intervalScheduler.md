# intervalScheduler

`intervalScheduler(timeInMs) -> scheduler`

Creates a scheduler that uses
[setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout).

```js
const tick = require("asura/tick");
const intervalScheduler = require("asura/intervalScheduler");
const map = require("asura/map");
const scan = require("asura/scan");
const log = require("asura/log");

tick(intervalScheduler(1000))
  |> map(_ => 1)
  |> scan((count, value) => count + value, 0)
  |> log("elapsed seconds");
```