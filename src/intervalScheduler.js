const intervalScheduler = (timeInMs) => (done) => setTimeout(done, timeInMs);

module.exports = intervalScheduler;
