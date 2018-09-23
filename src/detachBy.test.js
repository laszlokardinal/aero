const detachBy = require("./detachBy.js");
const createObservable = require("./createObservable.js");

describe("detachBy()", () => {
  it("unsubscribes from both sources if the callback return true", () => {
    const { emit, subscribe } = createObservable();

    const unsubscribeSource = createObservable();

    const observer = sinon.spy();

    const predicate = sinon.spy((action) => action === "DETACH");

    detachBy(unsubscribeSource.subscribe, predicate)(subscribe)(observer);

    expect(observer.callCount).to.equal(0);

    emit(1);

    expect(observer.callCount).to.equal(1);
    expect(observer.lastCall.args[0]).to.equal(1);

    expect(predicate.callCount).to.equal(0);
    unsubscribeSource.emit("noot noot");
    expect(predicate.callCount).to.equal(1);

    expect(observer.callCount).to.equal(1);

    emit(2);

    expect(observer.callCount).to.equal(2);
    expect(observer.lastCall.args[0]).to.equal(2);

    emit(3);

    expect(observer.callCount).to.equal(3);
    expect(observer.lastCall.args[0]).to.equal(3);

    expect(predicate.callCount).to.equal(1);
    unsubscribeSource.emit("DETACH");
    expect(predicate.callCount).to.equal(2);

    expect(observer.callCount).to.equal(3);

    emit(4);

    expect(observer.callCount).to.equal(3);

    emit(5);

    expect(observer.callCount).to.equal(3);
  });
});
