const invokeBefore = require("./invokeBefore.js");
const createObservable = require("./createObservable.js");

describe("invokeBefore()", () => {
  it("invokes the callback function with the action", () => {
    const { emit, subscribe } = createObservable();

    let order = [];

    const callback = sinon.spy((action) => order.push("callback"));
    const observer = sinon.spy((action) => order.push("observer"));

    invokeBefore(callback)(subscribe)(observer);

    expect(callback.callCount).to.equal(0);
    expect(observer.callCount).to.equal(0);

    order = [];

    emit("Sesame snaps pudding brownie");

    expect(callback.callCount).to.equal(1);
    expect(observer.callCount).to.equal(1);
    expect(callback.lastCall.args[0]).to.equal("Sesame snaps pudding brownie");
    expect(observer.lastCall.args[0]).to.equal("Sesame snaps pudding brownie");
    expect(order).to.deep.equal(["callback", "observer"]);

    order = [];

    emit("Chupa chups oat cake");

    expect(callback.callCount).to.equal(2);
    expect(observer.callCount).to.equal(2);
    expect(callback.lastCall.args[0]).to.equal("Chupa chups oat cake");
    expect(observer.lastCall.args[0]).to.equal("Chupa chups oat cake");
    expect(order).to.deep.equal(["callback", "observer"]);

    order = [];

    emit("Chocolate bar tiramisu");

    expect(callback.callCount).to.equal(3);
    expect(observer.callCount).to.equal(3);
    expect(callback.lastCall.args[0]).to.equal("Chocolate bar tiramisu");
    expect(observer.lastCall.args[0]).to.equal("Chocolate bar tiramisu");
    expect(order).to.deep.equal(["callback", "observer"]);
  });
});
