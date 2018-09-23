const createObservable = require("./createObservable.js");

const collect = (callback) => (source) => {
  const { emit, subscribe } = createObservable();

  source((action) => action(emit));

  return subscribe;
};

module.exports = collect;
