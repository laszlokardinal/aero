# tick source

`tick(scheduler, { start, stop }) -> subscribe function`

Emits nulls on scheduling.

Can be started and stopped by the option observables.
If start option does not present, it starts emitting
immediately.

```js
const createObservable = require("asura/createObservable");
const tick = require("asura/tick");
const intervalScheduler = require("asura/intervalScheduler");
const map = require("asura/map");
const scan = require("asura/scan");
const invoke = require("asura/invoke");

const startObservable = createObservable();

document
  .getElementById("start-button")
  .addEventListener("click", startObservable.emit);

const stopObservable = createObservable();

document
  .getElementById("stop-button")
  .addEventListener("click", stopObservable.emit);

tick(intervalScheduler(1000), {
  start: startObservable.subscribe,
  stop: stopObservable.subscribe
})
  |> map(_ => 1)
  |> scan((count, value) => count + value, 0)
  |> invoke((count) => {
    document.getElementById("counter").innerHTML = count;
  });

```