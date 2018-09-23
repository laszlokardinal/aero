const gateBy = require("./gateBy");
const createObservable = require("./createObservable.js");

describe("gateBy()", () => {
  it("switches on callback instructions", () => {
    const source = createObservable();
    const onSource = createObservable();
    const offSource = createObservable();
    const observer = sinon.spy();

    gateBy(onSource.subscribe, offSource.subscribe)(source.subscribe)(observer);

    expect(observer.callCount).to.equal(0);

    source.emit(1);

    expect(observer.callCount).to.equal(0);

    offSource.emit(null);

    expect(observer.callCount).to.equal(0);

    source.emit(2);

    expect(observer.callCount).to.equal(0);

    onSource.emit(null);

    expect(observer.callCount).to.equal(0);

    source.emit(3);

    expect(observer.callCount).to.equal(1);
    expect(observer.lastCall.args[0]).to.equal(3);

    onSource.emit(null);

    expect(observer.callCount).to.equal(1);

    source.emit(4);

    expect(observer.callCount).to.equal(2);
    expect(observer.lastCall.args[0]).to.equal(4);

    offSource.emit(null);

    expect(observer.callCount).to.equal(2);

    source.emit(5);

    expect(observer.callCount).to.equal(2);

    offSource.emit(null);

    expect(observer.callCount).to.equal(2);

    source.emit(6);

    expect(observer.callCount).to.equal(2);
  });
});
