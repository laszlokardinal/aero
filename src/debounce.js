const createObservable = require("./createObservable.js");

const debounce = (interval) => (source) => {
  const { emit, subscribe } = createObservable();

  let timeoutId = null;
  let latestAction = null;

  const emitLatestAction = () => {
    timeoutId = null;
    emit(latestAction);
  };

  source((action) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    latestAction = action;
    timeoutId = setTimeout(emitLatestAction, interval);
  });

  return subscribe;
};

module.exports = debounce;
