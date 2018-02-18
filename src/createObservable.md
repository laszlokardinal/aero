# createObservable()

`createObservable() -> { emit, subscribe }`

Returns an object that contains the [subscribe](#subscribe), and the
[emit](#emit) function of the observable.

### subscribe

`subscribe(observer) -> function`

Subscribes the observer to the incoming actions of the observable.
Calling this method with the same observer multiple times makes no additional effect.
Returns the [unsubscribe](#unsubscribe) function for this observer.

### emit

`emit(action) -> void`

Invokes synchronously the previously subscribed
observer functions with the argument action.
Subscribing or unsubscribing while emitting actions
takes effect only after the emitting has been finished.
The order of invocation of the observer methods is not specified,
do not rely on the subscription order.

### unsubscribe

`unsubscribe() -> void`

Removes the previously subscribed observer.

## Example

```js
const createObservable = require("asura/createObservable");

const { subscribe, emit } = createObservable();

subscribe(action => console.log(`A: ${action}`));

const unsubscribe = subscribe(action => console.log(`B: ${action}`));

emit(1);
// logs:
// A: 1
// B: 1

unsubscribe();

emit(2);
// logs:
// A: 2

```
