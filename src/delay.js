const createObservable = require("./createObservable.js");

const delay = (delayTime) => (source) => {
  const { emit, subscribe } = createObservable();

  source((action) => setTimeout(() => emit(action), delayTime));

  return subscribe;
};

module.exports = delay;
