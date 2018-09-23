const createObservable = require("./createObservable.js");

const resolve = () => (source) => {
  const resolve = createObservable();
  const reject = createObservable();

  source((action) => {
    if (typeof action.then === "function") {
      Promise.resolve(action).then(resolve.emit, reject.emit);
    } else {
      resolve.emit(action);
    }
  });

  return {
    resolve: resolve.subscribe,
    reject: reject.subscribe
  };
};

module.exports = resolve;
