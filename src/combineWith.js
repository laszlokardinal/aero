const createObservable = require("./createObservable.js");

const combineWith = (...sources) => (source) => {
  const { emit, subscribe } = createObservable();

  const finalSources = [source].concat(sources);

  let values = new Array(finalSources.length);

  finalSources.forEach((source, index) =>
    source((action) => {
      values = values.slice();
      values[index] = action;
      emit(values);
    })
  );

  return subscribe;
};

module.exports = combineWith;
