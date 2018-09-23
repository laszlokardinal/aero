const arrange = require("./arrange.js");
const createObservable = require("./createObservable.js");

describe("arrange()", () => {
  it("transmits incoming actions to the operators", () => {
    const source = createObservable();

    const observer1 = sinon.spy();
    const operator1 = (source) => {
      source(observer1);
      return () => null;
    };

    const observer2 = sinon.spy();
    const operator2 = (source) => {
      source(observer2);
      return () => null;
    };

    const observer3 = sinon.spy();
    const operator3 = (source) => {
      source(observer3);
      return () => null;
    };

    arrange([operator1, operator2, operator3])(source.subscribe);

    source.emit(142);
    expect(observer1.callCount).to.equal(1);
    expect(observer1.lastCall.args[0]).to.equal(142);
    expect(observer2.callCount).to.equal(1);
    expect(observer2.lastCall.args[0]).to.equal(142);
    expect(observer3.callCount).to.equal(1);
    expect(observer3.lastCall.args[0]).to.equal(142);

    source.emit(97);
    expect(observer1.callCount).to.equal(2);
    expect(observer1.lastCall.args[0]).to.equal(97);
    expect(observer2.callCount).to.equal(2);
    expect(observer2.lastCall.args[0]).to.equal(97);
    expect(observer3.callCount).to.equal(2);
    expect(observer3.lastCall.args[0]).to.equal(97);

    source.emit(192);
    expect(observer1.callCount).to.equal(3);
    expect(observer1.lastCall.args[0]).to.equal(192);
    expect(observer2.callCount).to.equal(3);
    expect(observer2.lastCall.args[0]).to.equal(192);
    expect(observer3.callCount).to.equal(3);
    expect(observer3.lastCall.args[0]).to.equal(192);
  });

  it("transmits actions from operators to the destination", () => {
    const observer = sinon.spy();

    const observable1 = createObservable();
    const operator1 = () => observable1.subscribe;

    const observable2 = createObservable();
    const operator2 = () => observable2.subscribe;

    const observable3 = createObservable();
    const operator3 = () => observable3.subscribe;

    arrange([operator1, operator2, operator3])(() => null)(observer);

    observable1.emit(142);
    expect(observer.callCount).to.equal(1);
    expect(observer.lastCall.args[0]).to.equal(142);

    observable2.emit(97);
    expect(observer.callCount).to.equal(2);
    expect(observer.lastCall.args[0]).to.equal(97);

    observable3.emit(192);
    expect(observer.callCount).to.equal(3);
    expect(observer.lastCall.args[0]).to.equal(192);
  });
});
