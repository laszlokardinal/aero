const createObservable = require("./createObservable.js");

const scan = (callback, accumulator) => (source) => {
  const { subscribe, emit } = createObservable();

  source((action) => {
    if (accumulator === undefined) {
      accumulator = action;
    } else {
      accumulator = callback(accumulator, action);
      emit(accumulator);
    }
  });

  return subscribe;
};

module.exports = scan;
