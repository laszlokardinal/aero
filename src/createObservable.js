module.exports = function createObservable() {
  let observers = [];

  const emit = (action) => observers.forEach((observer) => observer(action));

  const subscribe = (observer) => {
    const unsubscribe = () => {
      observers = observers.filter((current) => current !== observer);
    };

    unsubscribe(observer);

    observers = observers.concat(observer);

    return unsubscribe;
  };

  return { emit, subscribe };
};
