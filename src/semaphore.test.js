const semaphore = require("./semaphore.js");
const createObservable = require("./createObservable.js");

module.exports = describe("semaphore()", () => {
  it("has length of 1, operates as fifo, without priority by default");
  it("uses the length from opts");
  it("uses prioritySelector from opts");
  it("can be set to work as lifo by opts");
});
