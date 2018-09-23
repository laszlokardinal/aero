# arrange operator

`arrange(operators)(source) -> subscribe function`

Arrange takes an array of operators as the first argument.
The result operator's input is emitted to each of the argument
operators, and their output is merged to the output of the
result operator.

```

                ┌───▶ op0 ────┐
  source ───▶●──┼───▶ op1 ────┼──▶●───▶ destination
                ├───▶ ... ────┤
                └───▶ opN ────┘

```

Example:

```js
const { arrange, map, sequence } = require("asura");

const transformNumbers = arrange([
  map(number => number * 2),
  map(number => number * 3),
  map(number => number * 5)
]);

sequence([1, 2, 3])
  |> transformNumbers
  |> log();

// logs:

// 2
// 3
// 5

// 4
// 6
// 10

// 6
// 9
// 15
```
