const debounce = require("./debounce.js");
const createObservable = require("./createObservable.js");

describe("debounce()", () => {
  it("lets through a single action after the specified timeout", () => {
    const { emit, subscribe } = createObservable();
    const observer = sinon.spy();

    const clock = sinon.useFakeTimers();

    try {
      debounce(500)(subscribe)(observer);

      emit(10);

      clock.tick(499);

      expect(observer.callCount).to.equal(0);

      clock.tick(1);

      expect(observer.callCount).to.equal(1);
      expect(observer.lastCall.args[0]).to.equal(10);
    } finally {
      clock.restore();
    }
  });

  it("drops previous actions if on new action in the specified interval", () => {
    const { emit, subscribe } = createObservable();
    const observer = sinon.spy();

    const clock = sinon.useFakeTimers();

    try {
      debounce(500)(subscribe)(observer);

      emit(10);

      clock.tick(100);

      emit(20);

      clock.tick(300);

      emit(30);

      clock.tick(300);

      emit(40);

      expect(observer.callCount).to.equal(0);

      clock.tick(499);

      expect(observer.callCount).to.equal(0);

      clock.tick(1);

      expect(observer.callCount).to.equal(1);
      expect(observer.lastCall.args[0]).to.equal(40);
    } finally {
      clock.restore();
    }
  });
});
