const createObservable = require("./createObservable.js");

module.exports = function semaphore(done, opts) {
  return (source) => {
    const { emit, subscribe } = createObservable();

    const length = opts.length || 1;
    const prioritySelector = opts.prioritySelector || (() => 1);
    const lifo = opts.lifo || false;

    let queue = [];
    let active = 0;

    source((action) => {
      if (active < length) {
        active++;
        emit(action);
      } else {
        const item = { action, priority: prioritySelector(action) };

        if (lifo) {
          queue.push(item);
        } else {
          queue.unshift(item);
        }

        for (let i = 0; i < queue.length; ++i) {
          queue[i].index = i;
        }

        queue.sort((a, b) => {
          if (a.priority < b.priority) return 1;
          if (a.priority > b.priority) return -1;
          if (a.index < b.index) return -1;
          if (a.index > b.index) return 1;
          return 0;
        });
      }
    });

    done((action) => {
      active--;

      if (queue.length) {
        emit(queue.pop().action);
      }
    });

    return subscribe;
  };
};
