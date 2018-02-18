const createObservable = require("./createObservable.js");

const merge = (...sources) => {
  const { emit, subscribe } = createObservable();

  sources.forEach((source) => source(emit));

  return subscribe;
};

module.exports = merge;
