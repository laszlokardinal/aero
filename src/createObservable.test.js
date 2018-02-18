const createObservable = require("./createObservable.js");

describe("createObservable()", () => {
  it("returns an object with emit() and subscribe()", () => {
    const returnValue = createObservable();

    expect(typeof returnValue.emit).to.equal("function");
    expect(typeof returnValue.subscribe).to.equal("function");
  });

  it("invokes a single subscribed listener", () => {
    const { emit, subscribe } = createObservable();

    const observer = sinon.spy();
    subscribe(observer);

    const action = {};

    emit(action);
    expect(observer.callCount).to.equal(1);
    expect(observer.args[0][0]).to.equal(action);
  });

  it("does not let a listener multiple times", () => {
    const { emit, subscribe } = createObservable();

    const observer = sinon.spy();
    subscribe(observer);
    subscribe(observer);
    subscribe(observer);

    const action = {};

    emit(action);
    expect(observer.callCount).to.equal(1);
    expect(observer.args[0][0]).to.equal(action);
  });

  it("invokes subscribed listeners", () => {
    const { emit, subscribe } = createObservable();

    const observer1 = sinon.spy();
    const observer2 = sinon.spy();
    const observer3 = sinon.spy();

    subscribe(observer1);

    emit(1);

    expect(observer1.callCount).to.equal(1);
    expect(observer2.callCount).to.equal(0);
    expect(observer3.callCount).to.equal(0);

    subscribe(observer2);

    emit(1);

    expect(observer1.callCount).to.equal(2);
    expect(observer2.callCount).to.equal(1);
    expect(observer3.callCount).to.equal(0);

    subscribe(observer3);

    emit(1);

    expect(observer1.callCount).to.equal(3);
    expect(observer2.callCount).to.equal(2);
    expect(observer3.callCount).to.equal(1);
  });

  it("does not invoke listeners that subscribed while emitting", () => {
    const { emit, subscribe } = createObservable();

    const observer3 = sinon.spy();

    const observer1 = sinon.spy();
    const observer2 = sinon.spy(() => subscribe(observer3));

    subscribe(observer1);
    subscribe(observer2);

    emit(1);

    expect(observer1.callCount).to.equal(1);
    expect(observer2.callCount).to.equal(1);
    expect(observer3.callCount).to.equal(0);

    emit(1);

    expect(observer1.callCount).to.equal(2);
    expect(observer2.callCount).to.equal(2);
    expect(observer3.callCount).to.equal(1);
  });

  it("removes the listeners", () => {
    const { emit, subscribe } = createObservable();

    const observer1 = sinon.spy();
    const observer2 = sinon.spy();
    const observer3 = sinon.spy();

    const unsubscribe1 = subscribe(observer1);
    const unsubscribe2 = subscribe(observer2);
    const unsubscribe3 = subscribe(observer3);

    emit(1);

    expect(observer1.callCount).to.equal(1);
    expect(observer2.callCount).to.equal(1);
    expect(observer3.callCount).to.equal(1);

    unsubscribe1();

    emit(1);

    expect(observer1.callCount).to.equal(1);
    expect(observer2.callCount).to.equal(2);
    expect(observer3.callCount).to.equal(2);

    unsubscribe2();

    emit(1);

    expect(observer1.callCount).to.equal(1);
    expect(observer2.callCount).to.equal(2);
    expect(observer3.callCount).to.equal(3);

    unsubscribe3();

    emit(1);

    expect(observer1.callCount).to.equal(1);
    expect(observer2.callCount).to.equal(2);
    expect(observer3.callCount).to.equal(3);
  });

  it("invokes listeners that unsubscribed while emitting", () => {
    const { emit, subscribe } = createObservable();

    let unsubscribe1;
    let unsubscribe2;
    let unsubscribe3;

    const observer1 = sinon.spy(() => unsubscribe2());
    const observer2 = sinon.spy(() => unsubscribe3());
    const observer3 = sinon.spy(() => unsubscribe1());

    unsubscribe1 = subscribe(observer1);
    unsubscribe2 = subscribe(observer2);
    unsubscribe3 = subscribe(observer3);

    emit(1);

    expect(observer1.callCount).to.equal(1);
    expect(observer2.callCount).to.equal(1);
    expect(observer3.callCount).to.equal(1);

    emit(1);

    expect(observer1.callCount).to.equal(1);
    expect(observer2.callCount).to.equal(1);
    expect(observer3.callCount).to.equal(1);
  });
});
