const createObservable = require("./createObservable.js");

const throttle = (scheduler) => (source) => {
  const { emit, subscribe } = createObservable();

  let throttling = false;

  const stopThrottling = () => {
    throttling = false;
  };

  source((action) => {
    if (!throttling) {
      emit(action);

      throttling = true;

      scheduler(stopThrottling);
    }
  });

  return subscribe;
};

module.exports = throttle;
