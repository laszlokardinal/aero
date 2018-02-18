const createObservable = require("./createObservable.js");

const invoke = require("./invoke.js");

describe("invoke()", () => {
  it("invokes the callback function with the action", () => {
    const { emit, subscribe } = createObservable();

    const callback = sinon.spy();

    invoke(callback)(subscribe);

    expect(callback.callCount).to.equal(0);

    emit("Sesame snaps pudding brownie");

    expect(callback.callCount).to.equal(1);
    expect(callback.lastCall.args[0]).to.equal("Sesame snaps pudding brownie");

    emit("Chupa chups oat cake");

    expect(callback.callCount).to.equal(2);
    expect(callback.lastCall.args[0]).to.equal("Chupa chups oat cake");

    emit("Chocolate bar tiramisu");

    expect(callback.callCount).to.equal(3);
    expect(callback.lastCall.args[0]).to.equal("Chocolate bar tiramisu");
  });
});
