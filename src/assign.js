const assign = (target, mapOrKey) => (value) => {
  switch (typeof mapOrKey) {
    case "object":
      Object.keys(value).forEach((key) => (target[mapOrKey[key]] = value[key]));
      break;

    case "function":
      Object.keys(value).forEach((key) => (target[mapOrKey(key)] = value[key]));
      break;

    case "number":
    case "string":
      target[mapOrKey] = value;
      break;

    case "undefined":
      Object.assign(target, value);
      break;
  }
};

module.exports = assign;
