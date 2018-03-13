const immediateScheduler = require("./immediateScheduler.js");

describe("immediateScheduler()", () => {
  it("invokes done via setImmediate", () => {
    const done = sinon.spy();

    sinon.stub(global, "setImmediate");

    try {
      const scheduler = immediateScheduler();

      expect(global.setImmediate.callCount).to.equal(0);

      scheduler(done);

      expect(global.setImmediate.callCount).to.equal(1);
      expect(global.setImmediate.args[0][0]).to.be.a("function");

      expect(done.callCount).to.equal(0);

      global.setImmediate.args[0][0]();

      expect(done.callCount).to.equal(1);
    } finally {
      global.setImmediate.restore();
    }
  });
});
