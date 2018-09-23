const gate = require("./gate");
const createObservable = require("./createObservable.js");

describe("gate()", () => {
  it("switches on callback instructions", () => {
    const { emit, subscribe } = createObservable();
    const observer = sinon.spy();

    gate((x) => {
      switch (x) {
        case 3:
          return gate.OPEN_BEFORE;
        case 5:
          return gate.CLOSE_AFTER;
        case 8:
          return gate.OPEN_AFTER;
        case 11:
          return gate.CLOSE_BEFORE;
      }
    })(subscribe)(observer);

    expect(observer.callCount).to.equal(0);

    emit(0);

    expect(observer.callCount).to.equal(0);

    emit(1);

    expect(observer.callCount).to.equal(0);

    emit(2);

    expect(observer.callCount).to.equal(0);

    emit(3);

    expect(observer.callCount).to.equal(1);
    expect(observer.lastCall.args[0]).to.equal(3);

    emit(4);

    expect(observer.callCount).to.equal(2);
    expect(observer.lastCall.args[0]).to.equal(4);

    emit(5);

    expect(observer.callCount).to.equal(3);
    expect(observer.lastCall.args[0]).to.equal(5);

    emit(6);

    expect(observer.callCount).to.equal(3);

    emit(7);

    expect(observer.callCount).to.equal(3);

    emit(8);

    expect(observer.callCount).to.equal(3);

    emit(9);

    expect(observer.callCount).to.equal(4);
    expect(observer.lastCall.args[0]).to.equal(9);

    emit(10);

    expect(observer.callCount).to.equal(5);
    expect(observer.lastCall.args[0]).to.equal(10);

    emit(11);

    expect(observer.callCount).to.equal(5);

    emit(12);

    expect(observer.callCount).to.equal(5);

    emit(13);

    expect(observer.callCount).to.equal(5);
  });
});
