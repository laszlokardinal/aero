# detach operator

`detach(callback)(source) -> subscribe function`

Calls the callback function with each action.
If the callback returns `detach.BEFORE`, the operator
unsubscribes from the source without transmitting the action.
If the callback returns `detach.AFTER`, the operator
transmits the action, then unsubscribes from the source. Other return values
are ignored.

Can be used for

Example:

```js
const { fork, detach, log } = require("asura");

actions
  |> fork(action => action.type === "PLAYER_JOINED",
    joinedAction => actions =>
      detach(action.type === "PLAYER_LEFT" && action.payload.playerID
      filterBy(
  )
    action =>

sequence([0, 1, 2, 3, 4])
  |> detach(value => value * 2)
  |> log()

// logs:
// 0
// 2
// 4
// 6
// 8
```
