const createObservable = require("./createObservable.js");

const fork = (predicate, forkCallback) => (source) => {
  const { emit, subscribe } = createObservable();

  source((action) => {
    if (predicate(action)) {
      forkCallback(action)(source)(emit);
    }
  });

  return subscribe;
};

module.exports = fork;

actions
  |> fork(
    (action) => action.type === "USER__JOINED",
    (initialAction) => (actions) => {
      const { userId } = initialAction.payload;

      return (
        actions
        |> detach((action) => {
          if (
            action.type === "USER__LEFT" &&
            action.payload.userId === userId
          ) {
            return detach.BEFORE;
          }
        })
        |> filter((action) => action.type === "USER__MESSAGE")
        |> filter((action) => action.payload.userId === userId)
        |> throttle(intervalScheduler(250))
      );
    }
  );
