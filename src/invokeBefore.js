const createObservable = require("./createObservable.js");

const invokeBefore = (callback) => (source) => {
  const { emit, subscribe } = createObservable();

  source((action) => {
    callback(action);
    emit(action);
  });

  return subscribe;
};

module.exports = invokeBefore;
