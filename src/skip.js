const createObservable = require("./createObservable.js");

const skip = (count) => (source) => {
  const { emit, subscribe } = createObservable();

  let actionCount = 0;

  source((action) => {
    actionCount++;

    if (actionCount > count) {
      emit(action);
    }
  });

  return subscribe;
};

module.exports = skip;
