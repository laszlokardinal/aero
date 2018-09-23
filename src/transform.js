const createObservable = require("./createObservable.js");

const transform = (callback, initialState) => (source) => {
  const { observable, emit } = createObservable();

  let state = initialState;

  source((action) => {
    const result = callback(state, action);

    state = result.state;

    result.actions && result.actions.forEach(emit);
  });

  return subscribe;
};

module.exports = transform;
