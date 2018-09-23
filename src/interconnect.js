const createObservable = require("./createObservable.js");

const interconnect = (operators) => {
  const { emit, subscribe } = createObservable();

  operators.forEach((operator) => operator(subscribe)(emit));

  return (source) => {
    source(emit);

    return subscribe;
  };
};

module.exports = interconnect;
