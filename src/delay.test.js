const delay = require("./delay.js");
const createObservable = require("./createObservable.js");

describe("delay()", () => {
  it("lets through actions after the specified timeout", () => {
    const { emit, subscribe } = createObservable();
    const observer = sinon.spy();

    const clock = sinon.useFakeTimers();

    try {
      delay(500)(subscribe)(observer);

      emit(10);

      clock.tick(100);

      emit(20);

      clock.tick(50);

      emit(30);

      clock.tick(349);

      expect(observer.callCount).to.equal(0);

      clock.tick(1);

      expect(observer.callCount).to.equal(1);
      expect(observer.lastCall.args[0]).to.equal(10);

      clock.tick(99);

      expect(observer.callCount).to.equal(1);

      clock.tick(1);

      expect(observer.callCount).to.equal(2);
      expect(observer.lastCall.args[0]).to.equal(20);

      clock.tick(49);

      expect(observer.callCount).to.equal(2);

      clock.tick(1);

      expect(observer.callCount).to.equal(3);
      expect(observer.lastCall.args[0]).to.equal(30);
    } finally {
      clock.restore();
    }
  });
});
