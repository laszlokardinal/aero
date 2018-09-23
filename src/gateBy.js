const createObservable = require("./createObservable.js");

const gateBy = (onSource, offSource, initialState = false) => (source) => {
  const { emit, subscribe } = createObservable();

  let state = !!initialState;

  onSource(() => {
    state = true;
  });

  offSource(() => {
    state = false;
  });

  source((action) => {
    if (state) {
      emit(action);
    }
  });

  return subscribe;
};

module.exports = gateBy;
