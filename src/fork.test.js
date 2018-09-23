const fork = require("./fork.js");
const createObservable = require("./createObservable.js");

describe("fork()", () => {
  it("forks with forkCallback if predicate returns true on action", () => {
    const { emit, subscribe } = createObservable();

    const observer = sinon.spy();

    fork(
      (action) => typeof action === "string",
      (forkAction) => (source) => {
        const op = createObservable();

        source((action) => {
          if (typeof action === "number") {
            op.emit(forkAction + action);
          }
        });

        return op.subscribe;
      }
    )(subscribe)(observer);

    emit(1);

    expect(observer.callCount).to.equal(0);
    observer.resetHistory();

    emit("A");

    expect(observer.callCount).to.equal(0);
    observer.resetHistory();

    emit(1);

    expect(observer.callCount).to.equal(1);
    expect(observer.calledWith("A1")).to.be.ok;
    observer.resetHistory();

    emit(2);

    expect(observer.callCount).to.equal(1);
    expect(observer.calledWith("A2")).to.be.ok;
    observer.resetHistory();

    emit("B");

    expect(observer.callCount).to.equal(0);
    observer.resetHistory();

    emit(1);

    expect(observer.callCount).to.equal(2);
    expect(observer.calledWith("A1")).to.be.ok;
    expect(observer.calledWith("B1")).to.be.ok;
    observer.resetHistory();

    emit(2);

    expect(observer.callCount).to.equal(2);
    expect(observer.calledWith("A2")).to.be.ok;
    expect(observer.calledWith("B2")).to.be.ok;
    observer.resetHistory();

    emit("C");

    expect(observer.callCount).to.equal(0);
    observer.resetHistory();

    emit(1);

    expect(observer.callCount).to.equal(3);
    expect(observer.calledWith("A1")).to.be.ok;
    expect(observer.calledWith("B1")).to.be.ok;
    expect(observer.calledWith("C1")).to.be.ok;
    observer.resetHistory();

    emit(2);

    expect(observer.callCount).to.equal(3);
    expect(observer.calledWith("A2")).to.be.ok;
    expect(observer.calledWith("B2")).to.be.ok;
    expect(observer.calledWith("C2")).to.be.ok;
    observer.resetHistory();
  });
});
