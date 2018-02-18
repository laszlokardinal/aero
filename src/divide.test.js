const divide = require("./divide.js");
const createObservable = require("./createObservable.js");

describe("divide()", () => {
  it("emits the items of the action to multiple observables", () => {
    const { emit, subscribe } = createObservable();

    const observer1 = sinon.spy();
    const observer2 = sinon.spy();
    const observer3 = sinon.spy();

    const [observable1, observable2, observable3] = divide(3)(subscribe);

    observable1(observer1);
    observable2(observer2);
    observable3(observer3);

    expect(observer1.callCount).to.equal(0);
    expect(observer2.callCount).to.equal(0);
    expect(observer3.callCount).to.equal(0);

    emit([3, 6, 9]);

    expect(observer1.callCount).to.equal(1);
    expect(observer1.lastCall.args[0]).to.equal(3);
    expect(observer2.callCount).to.equal(1);
    expect(observer2.lastCall.args[0]).to.equal(6);
    expect(observer3.callCount).to.equal(1);
    expect(observer3.lastCall.args[0]).to.equal(9);

    emit([10, 20]);

    expect(observer1.callCount).to.equal(2);
    expect(observer1.lastCall.args[0]).to.equal(10);
    expect(observer2.callCount).to.equal(2);
    expect(observer2.lastCall.args[0]).to.equal(20);
    expect(observer3.callCount).to.equal(2);
    expect(observer3.lastCall.args[0]).to.be.undefined;
  });
});
