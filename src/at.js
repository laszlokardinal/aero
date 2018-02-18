const createObservable = require("./createObservable.js");

const at = (index) => (source) => {
  const { emit, subscribe } = createObservable();

  let actionCount = 0;

  source((action) => {
    if (actionCount == index) {
      emit(action);
    }

    actionCount++;
  });

  return subscribe;
};

module.exports = at;
