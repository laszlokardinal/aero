# interconnect operator

`interconnect(operators)(source) -> subscribe function`

Interconnect takes an array of operators as the first argument
and connects their input and output to a single observable.
The result operator's input is emitted to this observable,
and the actions of this observable is emitted as the output of
the result operator.

```

              ┌────────────────────┐
              ▼   ┌───▶ op0 ────┐  │
  source ────▶●───┼───▶ op1 ────┼──┘
              │   ├───▶ ... ────┤
              │   └───▶ opN ────┘
              ▼
          destination

```

Example:

```js
const { interconnect, map, sequence } = require("asura");

const transformNumbers = interconnect([
  (source) =>
    source
      |> filter((number) => number < 3)
      |> map((number) => number + 1),
  (source) =>
    source
      |> filter((number) => number < 3)
      |> map((number) => number * 10)
]);

sequence([1, 2, 3])
  |> transformNumbers
  |> log();

// logs:

// 1
// 10
// 2
// 20
// 3
// 30

// 2
// 20
// 3
// 30

// 3
```
