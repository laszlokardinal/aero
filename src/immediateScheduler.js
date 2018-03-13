require("setimmediate");

const immediateScheduler = () => (done) => setImmediate(done);

module.exports = immediateScheduler;
