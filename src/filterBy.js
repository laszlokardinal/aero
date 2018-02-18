const createObservable = require("./createObservable.js");

const filter = (key, values) => (source) => {
  const { emit, subscribe } = createObservable();

  values = [].concat(values);

  source((action) => values.includes(action[key]) && emit(action));

  return subscribe;
};

module.exports = filter;
