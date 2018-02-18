const take = require("./take.js");
const createObservable = require("./createObservable.js");

describe("take()", () => {
  it("lets through the specified number of actions", () => {
    const { emit, subscribe } = createObservable();
    const observer = sinon.spy();

    take(4)(subscribe)(observer);

    expect(observer.callCount).to.equal(0);

    emit(10);

    expect(observer.callCount).to.equal(1);
    expect(observer.lastCall.args[0]).to.equal(10);

    emit(20);

    expect(observer.callCount).to.equal(2);
    expect(observer.lastCall.args[0]).to.equal(20);

    emit(30);

    expect(observer.callCount).to.equal(3);
    expect(observer.lastCall.args[0]).to.equal(30);

    emit(40);

    expect(observer.callCount).to.equal(4);
    expect(observer.lastCall.args[0]).to.equal(40);

    emit(50);

    expect(observer.callCount).to.equal(4);

    emit(60);

    expect(observer.callCount).to.equal(4);

    emit(70);

    expect(observer.callCount).to.equal(4);
  });
});
