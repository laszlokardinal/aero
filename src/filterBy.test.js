const filterBy = require("./filterBy.js");
const createObservable = require("./createObservable.js");

describe("filterBy()", () => {
  it("lets through actions when the action's property at the given key is the value", () => {
    const { emit, subscribe } = createObservable();
    const observer = sinon.spy();

    filterBy("type", "SET_FIELD")(subscribe)(observer);

    expect(observer.callCount).to.equal(0);

    emit({});

    expect(observer.callCount).to.equal(0);

    const action1 = { type: "SET_FIELD", key: "email", value: "a@b.c" };
    emit(action1);

    expect(observer.callCount).to.equal(1);
    expect(observer.lastCall.args[0]).to.equal(action1);

    emit({ type: "INCREASE" });

    expect(observer.callCount).to.equal(1);

    const action2 = { type: "SET_FIELD", key: "password", value: "secret" };
    emit(action2);

    expect(observer.callCount).to.equal(2);
    expect(observer.lastCall.args[0]).to.equal(action2);

    emit({ type: "DECREASE" });

    expect(observer.callCount).to.equal(2);
  });

  it("lets through actions when the action's property at the given key is included in values", () => {
    const { emit, subscribe } = createObservable();
    const observer = sinon.spy();

    filterBy("type", ["INCREASE", "DECREASE"])(subscribe)(observer);

    expect(observer.callCount).to.equal(0);

    emit({});

    expect(observer.callCount).to.equal(0);

    const action1 = { type: "INCREASE" };
    emit(action1);

    expect(observer.callCount).to.equal(1);
    expect(observer.lastCall.args[0]).to.equal(action1);

    emit({ type: "SET_FIELD", key: "email", value: "a@b.c" });

    expect(observer.callCount).to.equal(1);

    const action2 = { type: "DECREASE" };
    emit(action2);

    expect(observer.callCount).to.equal(2);
    expect(observer.lastCall.args[0]).to.equal(action2);

    emit({ type: "SET_FIELD", key: "password", value: "secret" });

    expect(observer.callCount).to.equal(2);
  });
});
