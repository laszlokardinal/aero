# distinct operator

`distinct({ selector?, comparator? }?)(source) -> subscribe function`

Emits the first action, then compares the following actions with
the previous event via the selector method.

The default selector is the identity function. Custom selector can be used by
providing it in the options argument object.

Distinct uses strict equality to compare two elements. Custom comparator can be
used by providing it in the options argument object.

```js
const sequence = require("asura/sequence");
const distinct = require("asura/distinct");
const log = require("asura/log");

sequence([1, 2, 2, 3, 3, 3, 4, 4, 4, 4])
  |> distinct()
  |> log()

// logs:
// 1
// 2
// 3
// 4
```
