const createObservable = require("./createObservable.js");

const divide = (length = 2) => (source) => {
  const observables = new Array(length)
    .fill(null)
    .map(() => createObservable());

  source((action) => {
    for (let i = 0; i < length; ++i) {
      observables[i].emit(action[i]);
    }
  });

  return observables.map(({ subscribe }) => subscribe);
};

module.exports = divide;
