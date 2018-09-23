const createObservable = require("./createObservable.js");

const detachBy = (detachSource, callback) => (source) => {
  const { emit, subscribe } = createObservable();

  const unsubscribe = source(emit);

  const detachUnsubscribe = detachSource((action) => {
    if (callback(action)) {
      unsubscribe();
      detachUnsubscribe();
    }
  });

  return subscribe;
};

module.exports = detachBy;
