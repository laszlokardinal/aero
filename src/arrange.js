const createObservable = require("./createObservable.js");

const arrange = (operators) => (source) => {
  const inputObservable = createObservable();
  const outputObservable = createObservable();

  source(inputObservable.emit);

  operators.forEach((operator) =>
    operator(inputObservable.subscribe)(outputObservable.emit)
  );

  return outputObservable.subscribe;
};

module.exports = arrange;
