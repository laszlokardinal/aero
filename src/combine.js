const createObservable = require("./createObservable.js");

const combine = (...sources) => {
  const { emit, subscribe } = createObservable();

  let values = new Array(sources.length);

  sources.forEach((source, index) =>
    source((action) => {
      values = values.slice();
      values[index] = action;
      emit(values);
    })
  );

  return subscribe;
};

module.exports = combine;
