const createObservable = require("./createObservable.js");

const filter = (callback) => (source) => {
  const { emit, subscribe } = createObservable();

  const predicate = callback || Boolean;

  source((action) => predicate(action) && emit(action));

  return subscribe;
};

module.exports = filter;
