const createObservable = require("./createObservable.js");

const iterator = (iterable, scheduler) => {
  const { emit, subscribe } = createObservable();

  const it = iterable[Symbol.iterator]();

  const emitNext = () => {
    const next = it.next();

    if (!next.done) {
      emit(next.value);

      scheduler(emitNext);
    }
  };

  scheduler(emitNext);

  return subscribe;
};

module.exports = iterator;
