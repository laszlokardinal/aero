const scan = require("./scan.js");
const createObservable = require("./createObservable.js");

describe("scan()", () => {
  it("scans actions by callback without inital accumulator", () => {
    const { emit, subscribe } = createObservable();
    const observer = sinon.spy();

    scan((acc, val) => acc + val)(subscribe)(observer);

    expect(observer.callCount).to.equal(0);

    emit(1);

    expect(observer.callCount).to.equal(0);

    emit(2);

    expect(observer.callCount).to.equal(1);
    expect(observer.lastCall.args[0]).to.equal(3);

    emit(3);

    expect(observer.callCount).to.equal(2);
    expect(observer.lastCall.args[0]).to.equal(6);

    emit(4);

    expect(observer.callCount).to.equal(3);
    expect(observer.lastCall.args[0]).to.equal(10);

    emit(5);

    expect(observer.callCount).to.equal(4);
    expect(observer.lastCall.args[0]).to.equal(15);
  });

  it("scans actions by callback with inital accumulator", () => {
    const { emit, subscribe } = createObservable();
    const observer = sinon.spy();

    scan((acc, val) => acc + val, 100)(subscribe)(observer);

    expect(observer.callCount).to.equal(0);

    emit(1);

    expect(observer.callCount).to.equal(1);
    expect(observer.lastCall.args[0]).to.equal(101);

    emit(2);

    expect(observer.callCount).to.equal(2);
    expect(observer.lastCall.args[0]).to.equal(103);

    emit(3);

    expect(observer.callCount).to.equal(3);
    expect(observer.lastCall.args[0]).to.equal(106);

    emit(4);

    expect(observer.callCount).to.equal(4);
    expect(observer.lastCall.args[0]).to.equal(110);

    emit(5);

    expect(observer.callCount).to.equal(5);
    expect(observer.lastCall.args[0]).to.equal(115);
  });
});
