const createObservable = require("./createObservable.js");

const merge = (...sources) => (source) => {
  const { emit, subscribe } = createObservable();

  source(emit);

  sources.forEach((currentSource) => currentSource(emit));

  return subscribe;
};

module.exports = merge;
