# assign helper

`assign(target, mapOrKey?)(values) -> void`

Assign values to the argument target object.

mapOrKey can be:
  - __object__: properties of the value will be assigned to the
    target object with their keys mapped through the argument object
  - __array__: items of the value will be assigned to the
    target object with the index mapped through the argument array
  - __function__: properties of the value will be assigned to the
    target object with their keys mapped through the argument function
  - __number__: the value will be assigned to the argument
    index of the target object
  - __string__: the value will be assigned to the argument
    key of the target object
  - __undefined__: the value object will be merged to the target object

```js
const handleActions = actions => {
  const streams = {};

  actions
    |> split(action => action.type === "THROTTLE_THIS")
    |> assign(streams, ["others", "throttleThis"])

  streams.throttleThis
    |> throttle(intervalScheduler(200))
    |> mergeWith(streams.others)
    |> assign(streams, "output");

  return streams.output;
}
```
