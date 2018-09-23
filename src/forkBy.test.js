const forkBy = require("./forkBy.js");
const createObservable = require("./createObservable.js");

describe("forkBy()", () => {
  it("forks with forkCallback on action from forkSource", () => {
    const { emit, subscribe } = createObservable();

    const forkSource = createObservable();

    const observer = sinon.spy();

    forkBy(forkSource.subscribe, (forkAction) => (source) => {
      const op = createObservable();

      source((action) => {
        if (typeof action === "number") {
          op.emit(forkAction + action);
        }
      });

      return op.subscribe;
    })(subscribe)(observer);

    emit(1);

    expect(observer.callCount).to.equal(0);
    observer.resetHistory();

    forkSource.emit("A");

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

    forkSource.emit("B");

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

    forkSource.emit("C");

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
