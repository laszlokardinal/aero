const filter = require("./filter.js");
const createObservable = require("./createObservable.js");

describe("filter()", () => {
  it("lets through actions when the callback returns truthy value on them", () => {
    const { emit, subscribe } = createObservable();
    const observer = sinon.spy();

    filter((x) => x % 2)(subscribe)(observer);

    expect(observer.callCount).to.equal(0);

    emit(0);

    expect(observer.callCount).to.equal(0);

    emit(1);

    expect(observer.callCount).to.equal(1);
    expect(observer.lastCall.args[0]).to.equal(1);

    emit(2);

    expect(observer.callCount).to.equal(1);

    emit(3);

    expect(observer.callCount).to.equal(2);
    expect(observer.lastCall.args[0]).to.equal(3);

    emit(4);

    expect(observer.callCount).to.equal(2);

    emit(5);

    expect(observer.callCount).to.equal(3);
    expect(observer.lastCall.args[0]).to.equal(5);

    emit(6);

    expect(observer.callCount).to.equal(3);

    emit(7);

    expect(observer.callCount).to.equal(4);
    expect(observer.lastCall.args[0]).to.equal(7);
  });

  it("lets through only truthy actions when the callback is not defined", () => {
    const { emit, subscribe } = createObservable();
    const observer = sinon.spy();

    filter()(subscribe)(observer);

    expect(observer.callCount).to.equal(0);

    emit(0);

    expect(observer.callCount).to.equal(0);

    emit(1);

    expect(observer.callCount).to.equal(1);
    expect(observer.lastCall.args[0]).to.equal(1);

    emit(null);

    expect(observer.callCount).to.equal(1);

    emit("3");

    expect(observer.callCount).to.equal(2);
    expect(observer.lastCall.args[0]).to.equal("3");

    emit(false);

    expect(observer.callCount).to.equal(2);

    const obj = {};

    emit(obj);

    expect(observer.callCount).to.equal(3);
    expect(observer.lastCall.args[0]).to.equal(obj);

    emit(true);

    expect(observer.callCount).to.equal(4);
    expect(observer.lastCall.args[0]).to.equal(true);
  });
});
