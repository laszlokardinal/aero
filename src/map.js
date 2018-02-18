const createObservable = require("./createObservable.js");

const map = (callback) => (source) => {
  const { emit, subscribe } = createObservable();

  source((action) => emit(callback(action)));

  return subscribe;
};

module.exports = map;
