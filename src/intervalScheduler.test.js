const intervalScheduler = require("./intervalScheduler.js");

describe("intervalScheduler()", () => {
  it("invokes done via setTimeout", () => {
    const done = sinon.spy();

    sinon.stub(global, "setTimeout");

    try {
      const scheduler = intervalScheduler(941);

      expect(global.setTimeout.callCount).to.equal(0);

      scheduler(done);

      expect(global.setTimeout.callCount).to.equal(1);
      expect(global.setTimeout.args[0][0]).to.be.a("function");
      expect(global.setTimeout.args[0][1]).to.equal(941);

      expect(done.callCount).to.equal(0);

      global.setTimeout.args[0][0]();

      expect(done.callCount).to.equal(1);
    } finally {
      global.setTimeout.restore();
    }
  });
});
