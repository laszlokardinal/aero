const join = (operators) => (source) =>
  operators.reduce((a, b) => b(a), source);

module.exports = join;
