# join operator

`join(operators)(source) -> subscribe function`

Join takes an array of operators as the first argument
and concatenates them

```

  source ──▶ op0 ──▶ op1 ──▶ ... ──▶ opN ──▶ destination

```


```js
const { join, map, sequence } = require("asura");

const transformNumbers = join([
  map(number => number * 2),
  map(number => number * 3),
  map(number => number * 5)
]);

sequence([1, 2, 3])
  |> transformNumbers
  |> log();

// logs:
// 30
// 60
// 90
```
