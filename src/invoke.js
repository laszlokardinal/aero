const invoke = (callback) => (source) => source(callback);

module.exports = invoke;
