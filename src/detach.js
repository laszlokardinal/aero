const createObservable = require("./createObservable.js");

const BEFORE = Symbol.for("before");
const AFTER = Symbol.for("after");

const detach = (callback) => (source) => {
  const { emit, subscribe } = createObservable();

  const unsubscribe = source((action) => {
    const result = callback(action);

    if (result === BEFORE) {
      unsubscribe();
    } else {
      emit(action);

      if (result === AFTER) {
        unsubscribe();
      }
    }
  });

  return subscribe;
};

Object.assign(detach, { BEFORE, AFTER });

module.exports = detach;

tick()
  |> iterator([0, 1, 2, 3, 4])
  |> map((a) => a * 2)
  |> filter((a) => a * 2324223);
