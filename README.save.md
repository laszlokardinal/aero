# aero



#### inject operator

`inject(actions)(source) -> subscribe function`

Emits the argument actions before transmitting source actions.

### Transformation operators

#### transform operator

`transform(callback, accumulator?)(source) -> subscribe function`

callback signature:

`(state, action) => ({ state, actions })`

Calls the callback function with the
actual state, and the incoming
action. Sets the state and emits the
actions from the return value.

### Filtering operators

#### gate operator

`gate(callback, initialState = false)(source)`

`callback(action) -> boolean`

Transmits events depending on the
internal state. Calls the predicate
with the state, and current action,
and sets the state with the return
value.

#### gateBy operator

`gate(switchSource, predicate, initialState = false)(source)`

### Dynamic topological operators

#### fork operator

`fork(testCallback, forkCallback)(source) -> subscribe function`

#### forkBy operator

`forkBy(forkSource, testCallback, forkCallback)(source) -> subscribe function`

#### detach operator

`detach(testCallback)(source) -> subscribe function`

Unsubscribes from the source if the testCallback argument function
returns true on an incoming action.

#### detachBy operator

`detachBy(unsubscribeSource, testCallback)(source) -> subscribe function`

Unsubscribes from both sources if the testCallback argument function
returns true on an action coming from unsubscribeSource.

#### flatten operator

collects

Transmits the incoming observable's actions.

#### ??? operator

`???(source) -> subscribe function`

replaces

Transmits the latest incoming observable's actions.

### Timing operators

#### sample operator

`sample(time|scheduler|observable)(source) -> subscribe function`

Emits the latest action on scheduling

#### delay operator

`delay(time)(source) -> subscribe function`

Delays the emitting of the incoming actions

#### debounce operator

`debounce(time)(source) -> subscribe function`

#### throttle operator

`throttle(time|scheduler|observable)(source) -> subscribe function`

Emits the latest action once on scheduling, drops the actions that occur meanwhile.

<!--
#### collect operator

`collect(time|scheduler|observable)(source) -> subscribe function`

Collects the actions, emits all of them on scheduling.
-->

#### buffer operator

`buffer(time|scheduler|observable)(source) -> subscribe function`

Collects the actions, emits one of them on scheduling.

emit all or length option?

#### smooth operator

`smooth(time|scheduler|observable, selector)(source) -> subscribe function`

Interpolates the numeric values of the actions between occurrences.

#### semaphore / queue operator

`semaphore(done, {length = 1, prioritySelector = ()=>0, fifo = false})(source) -> subscribe function`

Only lets through a maximum number of actions.
An incoming action on the done source decreases the
current limit and emits one action from tbe queue.

priority selector?

### sources

#### sequence source

`sequence(values, time|scheduler|observable = 0, { start, stop }) -> subscribe function`

Emits the items of the values argument as seperate actions
scheduled by the second argument.

If the second argument is a number, the scheduler will be a timeoutScheduler,
with th

repeat opt

#### empty? operator

`empty() -> subscribe function`

Creates an observable that emits nothing.

### Asynchronous operators

#### resolve operator

`resolve(source, selector = action => action) -> { resolve: observable, reject: observable }`

Resolves the incoming promise actions.
The result of the then branch will be emitted on the resolve branch, while the
result of the catch branch will be emitted on the reject branch.

```js
actions
  |> filter(action => action.type === "USER_LOAD")
  |> map(action =>
    fetch(`/users/${action.userId}`)
      .then(res => res.json())
      .then(data => ({ ...action, data }))
  )
  |> resolve(action => action.xhr)
  |> assign(streams, { resolve: "userLoaded", reject: "userError" });
```

<!--


`process(generatorFunction)(source) -> subscribe function`

stateMachine - scan?

###

aero-fs
  read/fire
  write/flush
  watch

numeric diff/integrate
string diff/merge
nested object diff/merge

### numeric
 - differentiate({selector})
 - integrate(c, {selector})
 - clip()

### string
 - stringDiff()
 - stringPatch(latest$)

### nested data
 - deepDiff()
 - deepPatch(latest$)

### interfaces (separate modules)

#### socket operator

`socket(opts)(source) -> subscribe function`

#### websocket operator

`websocket(opts)(source) -> subscribe function`

#### redis operator

#### worker operator

`worker(codeString|evalSource)(source) -> subscribe function`

#### message queue operator

#### express operator

web worker / spawn process

#### redux operator

applyOperator(
  todosRoute,
  todoRoute
)

const middleware = ({ /*state,*/ dispatch }) => (actions) => {
  actions
    |> filterBy("type", "ROUTER_ENTER")
    |> map(matchPath("/todos/:todoId"))
    |> filter()
    |> invoke(({ todoId }) => dispatch({
         type: "API_GET",
         path: `/todos/${todoId}`
       }));

  actions
    |> filterBy("type", "ROUTER_LEAVE")
    |> filter(matchPath("/users/:userId"))
    |> invoke(() => dispatch({
         type: "TODO/UNLOAD"
       }));

  return actions;
}

dispatch("INITIALIZE");

-->