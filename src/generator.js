const createObservable = require("./createObservable.js");

const generator = (gen) => (source) => {
  const { emit, subscribe } = createObservable();

  source((action) => {
    const result = gen.next(action);

    if (!result.done) {
      emit(result.value);
    }
  });

  return subscribe;
};

module.exports = generator;
