const tick = require("./tick.js");
const createObservable = require("./createObservable.js");

describe("tick()", () => {
  describe("if start option does not present", () => {
    const stop = createObservable();

    const scheduler = sinon.spy();
    const observer = sinon.spy();

    tick(scheduler, { stop: stop.subscribe })(observer);

    it("starts automatically if start opt does not present", () => {
      expect(scheduler.callCount).to.equal(1);
      expect(observer.callCount).to.equal(0);
    });

    it("starts emitting nulls on scheduling", () => {
      scheduler.lastCall.args[0]();

      expect(observer.callCount).to.equal(1);
      expect(observer.lastCall.args[0]).to.be.null;

      expect(scheduler.callCount).to.equal(2);
      scheduler.lastCall.args[0]();

      expect(observer.callCount).to.equal(2);
      expect(observer.lastCall.args[0]).to.be.null;

      expect(scheduler.callCount).to.equal(3);
      scheduler.lastCall.args[0]();

      expect(observer.callCount).to.equal(3);
      expect(observer.lastCall.args[0]).to.be.null;

      expect(scheduler.callCount).to.equal(4);
      scheduler.lastCall.args[0]();

      expect(observer.callCount).to.equal(4);
      expect(observer.lastCall.args[0]).to.be.null;

      expect(scheduler.callCount).to.equal(5);
    });

    it("stops on action on stop option observable", () => {
      stop.emit(null);

      scheduler.lastCall.args[0]();

      expect(observer.callCount).to.equal(4);
      expect(scheduler.callCount).to.equal(5);
    });
  });

  describe("if start option presents", () => {
    const start = createObservable();
    const stop = createObservable();

    const scheduler = sinon.spy();
    const observer = sinon.spy();

    tick(scheduler, {
      start: start.subscribe,
      stop: stop.subscribe
    })(observer);

    it("starts on action on start option observable", () => {
      expect(scheduler.callCount).to.equal(0);
      expect(observer.callCount).to.equal(0);

      start.emit(null);

      expect(scheduler.callCount).to.equal(1);
    });

    it("starts emitting nulls on scheduling", () => {
      scheduler.lastCall.args[0]();

      expect(observer.callCount).to.equal(1);
      expect(observer.lastCall.args[0]).to.be.null;

      expect(scheduler.callCount).to.equal(2);
      scheduler.lastCall.args[0]();

      expect(observer.callCount).to.equal(2);
      expect(observer.lastCall.args[0]).to.be.null;

      expect(scheduler.callCount).to.equal(3);
      scheduler.lastCall.args[0]();

      expect(observer.callCount).to.equal(3);
      expect(observer.lastCall.args[0]).to.be.null;

      expect(scheduler.callCount).to.equal(4);
      scheduler.lastCall.args[0]();

      expect(observer.callCount).to.equal(4);
      expect(observer.lastCall.args[0]).to.be.null;

      expect(scheduler.callCount).to.equal(5);
    });

    it("stops on action on stop option observable", () => {
      stop.emit(null);

      scheduler.lastCall.args[0]();

      expect(observer.callCount).to.equal(4);
      expect(scheduler.callCount).to.equal(5);
    });

    it("starts emitting nulls on restart", () => {
      start.emit(null);

      expect(scheduler.callCount).to.equal(6);
      scheduler.lastCall.args[0]();

      expect(observer.callCount).to.equal(5);
      expect(observer.lastCall.args[0]).to.be.null;

      expect(scheduler.callCount).to.equal(7);
      scheduler.lastCall.args[0]();

      expect(observer.callCount).to.equal(6);
      expect(observer.lastCall.args[0]).to.be.null;

      expect(scheduler.callCount).to.equal(8);
    });

    it("does not start multiple loops parallelly", () => {
      stop.emit(null);
      start.emit(null);
      stop.emit(null);
      start.emit(null);
      stop.emit(null);
      start.emit(null);
      stop.emit(null);

      expect(scheduler.callCount).to.equal(8);
      scheduler.lastCall.args[0]();
      expect(observer.callCount).to.equal(6);

      start.emit(null);
      stop.emit(null);
      start.emit(null);
      stop.emit(null);
      start.emit(null);
      stop.emit(null);
      start.emit(null);

      expect(scheduler.callCount).to.equal(9);
      scheduler.lastCall.args[0]();
      expect(observer.callCount).to.equal(7);
    });
  });
});
