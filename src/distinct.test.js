const distinct = require("./distinct.js");
const createObservable = require("./createObservable.js");

describe("distinct()", () => {
  it("lets through actions if is distinct from the last one", () => {
    const { emit, subscribe } = createObservable();
    const observer = sinon.spy();

    distinct()(subscribe)(observer);

    expect(observer.callCount).to.equal(0);

    emit(0);
    expect(observer.callCount).to.equal(1);
    expect(observer.lastCall.args[0]).to.equal(0);
    emit(0);
    emit(0);
    expect(observer.callCount).to.equal(1);

    emit(1);
    expect(observer.callCount).to.equal(2);
    expect(observer.lastCall.args[0]).to.equal(1);
    emit(1);
    emit(1);
    emit(1);
    expect(observer.callCount).to.equal(2);

    emit(2);
    expect(observer.callCount).to.equal(3);
    expect(observer.lastCall.args[0]).to.equal(2);

    emit(3);
    expect(observer.callCount).to.equal(4);
    expect(observer.lastCall.args[0]).to.equal(3);
    emit(3);
    emit(3);
    emit(3);
    expect(observer.callCount).to.equal(4);
  });

  it("lets through actions if it is distinct from the last one via the selector", () => {
    const { emit, subscribe } = createObservable();
    const observer = sinon.spy();

    distinct({ selector: (action) => action.value })(subscribe)(observer);

    expect(observer.callCount).to.equal(0);

    emit({ type: "ACTION", value: 0 });
    expect(observer.callCount).to.equal(1);
    expect(observer.lastCall.args[0]).to.deep.equal({
      type: "ACTION",
      value: 0
    });
    emit({ type: "ACTION", value: 0 });
    emit({ type: "ACTION", value: 0 });
    expect(observer.callCount).to.equal(1);

    emit({ type: "ACTION", value: 1 });
    expect(observer.callCount).to.equal(2);
    expect(observer.lastCall.args[0]).to.deep.equal({
      type: "ACTION",
      value: 1
    });
    emit({ type: "ACTION", value: 1 });
    emit({ type: "ACTION", value: 1 });
    emit({ type: "ACTION", value: 1 });
    expect(observer.callCount).to.equal(2);

    emit({ type: "ACTION", value: 2 });
    expect(observer.callCount).to.equal(3);
    expect(observer.lastCall.args[0]).to.deep.equal({
      type: "ACTION",
      value: 2
    });

    emit({ type: "ACTION", value: 3 });
    expect(observer.callCount).to.equal(4);
    expect(observer.lastCall.args[0]).to.deep.equal({
      type: "ACTION",
      value: 3
    });
    emit({ type: "ACTION", value: 3 });
    emit({ type: "ACTION", value: 3 });
    emit({ type: "ACTION", value: 3 });
    expect(observer.callCount).to.equal(4);
  });

  it("lets through actions if is distinct from the last one via comparator", () => {
    const { emit, subscribe } = createObservable();
    const observer = sinon.spy();

    distinct({ comparator: (a, b) => Math.floor(a) === Math.floor(b) })(
      subscribe
    )(observer);

    expect(observer.callCount).to.equal(0);

    emit(0);
    expect(observer.callCount).to.equal(1);
    expect(observer.lastCall.args[0]).to.equal(0);
    emit(0.3);
    emit(0.6);
    expect(observer.callCount).to.equal(1);

    emit(1);
    expect(observer.callCount).to.equal(2);
    expect(observer.lastCall.args[0]).to.equal(1);
    emit(1.4);
    emit(1.2);
    emit(1);
    expect(observer.callCount).to.equal(2);

    emit(2);
    expect(observer.callCount).to.equal(3);
    expect(observer.lastCall.args[0]).to.equal(2);

    emit(3);
    expect(observer.callCount).to.equal(4);
    expect(observer.lastCall.args[0]).to.equal(3);
    emit(3.7);
    emit(3.2);
    emit(3.2);
    expect(observer.callCount).to.equal(4);
  });
});
