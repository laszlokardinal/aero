const createObservable = require("./createObservable.js");

const sequence = (values, scheduler, opts = {}) => {
  const { emit, subscribe } = createObservable();

  let index = 0;

  const sequenceCallback = () => {
    if (index < values.length) {
      emit(values[index]);

      if (opts.repeat) {
        index = (index + 1) % values.length;
      } else {
        index++;
      }

      scheduler(sequenceCallback);
    }
  };

  scheduler(sequenceCallback);

  return subscribe;
};

module.exports = sequence;
