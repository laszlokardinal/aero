const createObservable = require("./createObservable.js");

const take = (count) => (source) => {
  const { emit, subscribe } = createObservable();

  let actionsCount = 0;

  source((action) => {
    actionsCount++;

    if (actionsCount <= count) {
      emit(action);
    }
  });

  return subscribe;
};

module.exports = take;
