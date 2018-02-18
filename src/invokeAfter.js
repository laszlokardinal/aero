const createObservable = require("./createObservable.js");

const invokeAfter = (callback) => (source) => {
  const { emit, subscribe } = createObservable();

  source((action) => {
    emit(action);
    callback(action);
  });

  return subscribe;
};

module.exports = invokeAfter;
