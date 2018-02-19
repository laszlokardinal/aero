const createObservable = require("./createObservable.js");

const tick = (scheduler, opts) => {
  const { emit, subscribe } = createObservable();

  let running = false;
  let schedulerRunning = false;

  const tick = () => {
    schedulerRunning = false;

    if (running) {
      emit(null);

      schedulerRunning = true;
      scheduler(tick);
    }
  };

  const start = () => {
    running = true;

    if (!schedulerRunning) {
      schedulerRunning = true;
      scheduler(tick);
    }
  };

  const stop = () => {
    running = false;
  };

  if (opts.stop) {
    opts.stop(stop);
  }

  if (opts.start) {
    opts.start(start);
  } else {
    start();
  }

  return subscribe;
};

module.exports = tick;
