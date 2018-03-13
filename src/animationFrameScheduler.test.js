const animationFrameScheduler = require("./animationFrameScheduler.js");

describe("animationFrameScheduler()", () => {
  it("invokes done via requestAnimationFrame", () => {
    const done = sinon.spy();

    if ("requestAnimationFrame" in global) {
      sinon.stub(global, "requestAnimationFrame");
    } else {
      global.requestAnimationFrame = sinon.spy();
    }

    try {
      const scheduler = animationFrameScheduler();

      expect(global.requestAnimationFrame.callCount).to.equal(0);

      scheduler(done);

      expect(global.requestAnimationFrame.callCount).to.equal(1);
      expect(global.requestAnimationFrame.args[0][0]).to.be.a("function");

      expect(done.callCount).to.equal(0);

      global.requestAnimationFrame.args[0][0]();

      expect(done.callCount).to.equal(1);
    } finally {
      if ("restore" in global.requestAnimationFrame) {
        global.requestAnimationFrame.restore();
      } else {
        delete global.requestAnimationFrame;
      }
    }
  });
});
