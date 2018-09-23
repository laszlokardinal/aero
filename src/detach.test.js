const detach = require("./detach.js");
const createObservable = require("./createObservable.js");

describe("detach()", () => {
  it("unsubscribes from the sources if the callback returns detach.BEFORE", () => {
    const { emit, subscribe } = createObservable();

    const observer = sinon.spy();

    detach((action) => action === 3 && detach.BEFORE)(subscribe)(observer);

    expect(observer.callCount).to.equal(0);

    emit(1);

    expect(observer.callCount).to.equal(1);
    expect(observer.lastCall.args[0]).to.equal(1);

    emit(2);

    expect(observer.callCount).to.equal(2);
    expect(observer.lastCall.args[0]).to.equal(2);

    emit(3);

    expect(observer.callCount).to.equal(2);

    emit(4);

    expect(observer.callCount).to.equal(2);

    emit(5);

    expect(observer.callCount).to.equal(2);
  });

  it("unsubscribes from the sources if the callback returns detach.AFTER", () => {
    const { emit, subscribe } = createObservable();

    const observer = sinon.spy();

    detach((action) => action === 3 && detach.AFTER)(subscribe)(observer);

    expect(observer.callCount).to.equal(0);

    emit(1);

    expect(observer.callCount).to.equal(1);
    expect(observer.lastCall.args[0]).to.equal(1);

    emit(2);

    expect(observer.callCount).to.equal(2);
    expect(observer.lastCall.args[0]).to.equal(2);

    emit(3);

    expect(observer.callCount).to.equal(3);
    expect(observer.lastCall.args[0]).to.equal(3);

    emit(4);

    expect(observer.callCount).to.equal(3);

    emit(5);

    expect(observer.callCount).to.equal(3);
  });
});
