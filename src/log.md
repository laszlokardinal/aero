# log helper

`log(prefix?, serializer?)(source) -> void`

Logs the incoming action to the console. Made for debugging purposes.

Prefix can be added as the first parameter to
differentiatet the logs.
It uses JSON.stringify as the default serializer.

```js
sequence([0, 1, 2, 3, 4]) |> log()

// logs:
// 0
// 1
// 2
// 3
// 4
```


```js
sequence([0, 1, 2, 3, 4])
  |> log("transmits:")
  |> log("serializes to binary:", value => value.toString(2))

// logs:
// transmits: 0
// serializes to binary: 0
// transmits: 1
// serializes to binary: 1
// transmits: 2
// serializes to binary: 10
// transmits: 3
// serializes to binary: 11
// transmits: 4
// serializes to binary: 100
```
