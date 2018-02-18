const skip = require("./skip.js");
const createObservable = require("./createObservable.js");

describe("skip()", () => {
  it("lets through actions after the specified number of actions", () => {
    const { emit, subscribe } = createObservable();
    const observer = sinon.spy();

    skip(4)(subscribe)(observer);

    expect(observer.callCount).to.equal(0);

    emit(10);

    expect(observer.callCount).to.equal(0);

    emit(20);

    expect(observer.callCount).to.equal(0);

    emit(30);

    expect(observer.callCount).to.equal(0);

    emit(40);

    expect(observer.callCount).to.equal(0);

    emit(50);

    expect(observer.callCount).to.equal(1);
    expect(observer.lastCall.args[0]).to.equal(50);

    emit(60);

    expect(observer.callCount).to.equal(2);
    expect(observer.lastCall.args[0]).to.equal(60);

    emit(70);

    expect(observer.callCount).to.equal(3);
    expect(observer.lastCall.args[0]).to.equal(70);
  });
});
