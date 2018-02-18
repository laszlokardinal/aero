const createObservable = require("./createObservable.js");

const split = (callback, length = 2) => (source) => {
  const observables = new Array(length)
    .fill(null)
    .map(() => createObservable());

  source((action) => {
    observables[+callback(action)].emit(action);
  });

  return observables.map(({ subscribe }) => subscribe);
};

module.exports = split;
