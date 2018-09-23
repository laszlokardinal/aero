const createObservable = require("./createObservable.js");

const CLOSE_AFTER = Symbol.for("close-after");
const CLOSE_BEFORE = Symbol.for("close-before");
const OPEN_BEFORE = Symbol.for("open-before");
const OPEN_AFTER = Symbol.for("open-after");

const gate = (callback, initialState = false) => (source) => {
  const { emit, subscribe } = createObservable();

  let state = !!initialState;

  source((action) => {
    const result = callback(action);

    if (state) {
      if (result === CLOSE_AFTER) {
        emit(action);
        state = false;
      } else {
        if (result === CLOSE_BEFORE) {
          state = false;
        } else {
          emit(action);
        }
      }
    } else {
      if (result === OPEN_BEFORE) {
        emit(action);
        state = true;
      } else {
        if (result === OPEN_AFTER) {
          state = true;
        }
      }
    }
  });

  return subscribe;
};

Object.assign(gate, {
  CLOSE_AFTER,
  CLOSE_BEFORE,
  OPEN_BEFORE,
  OPEN_AFTER
});

module.exports = gate;
