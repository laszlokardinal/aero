const createObservable = require("./createObservable.js");

const identity = (action) => action;

const strictEquality = (a, b) => a === b;

const distinct = (opts = {}) => (source) => {
  const { emit, subscribe } = createObservable();

  let selector = opts.selector || identity;
  let comparator = opts.comparator || strictEquality;

  let isFirst = true;
  let lastAction;

  source((action) => {
    if (isFirst) {
      emit(action);
      lastAction = action;
      isFirst = false;
    } else {
      if (!comparator(selector(action), selector(lastAction))) {
        lastAction = action;
        emit(action);
      }
    }
  });

  return subscribe;
};

module.exports = distinct;
