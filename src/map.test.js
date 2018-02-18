const map = require("./map.js");
const createObservable = require("./createObservable.js");

describe("map()", () => {
  it("transmits actions mapped by the callback function", () => {
    const { emit, subscribe } = createObservable();
    const observer = sinon.spy();

    map((x) => x * 3)(subscribe)(observer);

    expect(observer.callCount).to.equal(0);

    emit(1);

    expect(observer.callCount).to.equal(1);
    expect(observer.lastCall.args[0]).to.equal(3);

    emit(2);

    expect(observer.callCount).to.equal(2);
    expect(observer.lastCall.args[0]).to.equal(6);

    emit(3);

    expect(observer.callCount).to.equal(3);
    expect(observer.lastCall.args[0]).to.equal(9);

    emit(4);

    expect(observer.callCount).to.equal(4);
    expect(observer.lastCall.args[0]).to.equal(12);

    emit(5);

    expect(observer.callCount).to.equal(5);
    expect(observer.lastCall.args[0]).to.equal(15);
  });
});
