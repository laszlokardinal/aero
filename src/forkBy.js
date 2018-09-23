const createObservable = require("./createObservable.js");

const forkBy = (forkSource, forkCallback) => (source) => {
  const { emit, subscribe } = createObservable();

  forkSource((forkAction) => {
    forkCallback(forkAction)(source)(emit);
  });

  return subscribe;
};

module.exports = forkBy;
