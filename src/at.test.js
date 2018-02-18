const at = require("./at.js");
const createObservable = require("./createObservable.js");

describe("at()", () => {
  it("lets through action at the specified index", () => {
    const { emit, subscribe } = createObservable();
    const observer = sinon.spy();

    at(3)(subscribe)(observer);

    expect(observer.callCount).to.equal(0);

    emit(10);

    expect(observer.callCount).to.equal(0);

    emit(20);

    expect(observer.callCount).to.equal(0);

    emit(30);

    expect(observer.callCount).to.equal(0);

    emit(40);

    expect(observer.callCount).to.equal(1);
    expect(observer.lastCall.args[0]).to.equal(40);

    emit(50);

    expect(observer.callCount).to.equal(1);

    emit(60);

    expect(observer.callCount).to.equal(1);

    emit(70);

    expect(observer.callCount).to.equal(1);
  });
});
