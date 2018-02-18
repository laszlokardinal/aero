# take operator

`take(count)(source) -> subscribe function`

Lets through only the specified number of actions.

```js
const sequence = require("asura/sequence");
const take = require("asura/take");
const log = require("asura/log");

sequence([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  |> take(4)
  |> log()

// logs:
// 0
// 1
// 2
// 3
```
