# animationFrameScheduler

`animationFrameScheduler() -> scheduler`

Creates a scheduler that uses
[requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame).

```js
const tick = require("asura/tick");
const animationFrameScheduler = require("asura/animationFrameScheduler");
const map = require("asura/map");
const scan = require("asura/scan");
const invoke = require("asura/invoke");

tick(animationFrameScheduler())
  |> map((_) => Date.now())
  |> scan(
    ({ previousTime }, currentTime) => ({
      dt: currentTime - previousTime,
      previousTime: currentTime
    }),
    { previousTime: Date.now() }
  )
  |> map(({ dt }) => dt)
  |> scan((degree, dt) => degree + dt * 0.1, 0)
  |> invoke((degree) => {
    document.getElementById("spinner").style.transform = `rotate(${degree}deg)`;
  });
```