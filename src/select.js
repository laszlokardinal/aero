const createObservable = require("./createObservable.js");

const select = (path) => (source) => {
  const { emit, subscribe } = createObservable();

  const keys = path
    .replace(/\[(.*?)\]/g, ".$1")
    .replace(/^\./, "")
    .split(".");

  source((action) => {
    const value = keys.reduce((object, key) => object && object[key], action);

    emit(value);
  });

  return subscribe;
};

module.exports = select;
