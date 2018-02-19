const createObservable = require("./createObservable.js");

const defaultSerializer = (input) => JSON.stringify(input, null, 2);

const log = (prefix, serializer = defaultSerializer) => (source) => {
  const { emit, subscribe } = createObservable();

  source((action) => {
    const serializedAction = serializer(action);

    prefix
      ? console.log(prefix, serializedAction)
      : console.log(serializedAction);

    emit(action);
  });

  return subscribe;
};

module.exports = log;
