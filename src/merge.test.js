const merge = require("./merge.js");
const createObservable = require("./createObservable.js");

describe("merge()", () => {
  it("merges source actions", () => {
    const source1 = createObservable();
    const source2 = createObservable();
    const source3 = createObservable();
    const source4 = createObservable();

    const observer = sinon.spy();

    merge(
      source1.subscribe,
      source2.subscribe,
      source3.subscribe,
      source4.subscribe
    )(observer);

    expect(observer.callCount).to.equal(0);

    source1.emit("Croissant cookie halvah");
    expect(observer.callCount).to.equal(1);
    expect(observer.lastCall.args[0]).to.equal("Croissant cookie halvah");

    source2.emit("Topping cookie lemon drops chupa chups sesame snaps");
    expect(observer.callCount).to.equal(2);
    expect(observer.lastCall.args[0]).to.equal(
      "Topping cookie lemon drops chupa chups sesame snaps"
    );

    source2.emit("Fruitcake candy chupa chups oat cake");
    expect(observer.callCount).to.equal(3);
    expect(observer.lastCall.args[0]).to.equal(
      "Fruitcake candy chupa chups oat cake"
    );

    source4.emit("Powder tart caramels tart sesame snaps pudding brownie");
    expect(observer.callCount).to.equal(4);
    expect(observer.lastCall.args[0]).to.equal(
      "Powder tart caramels tart sesame snaps pudding brownie"
    );

    source3.emit("Tiramisu chocolate bar tiramisu icing liquorice");
    expect(observer.callCount).to.equal(5);
    expect(observer.lastCall.args[0]).to.equal(
      "Tiramisu chocolate bar tiramisu icing liquorice"
    );

    source1.emit("Apple pie danish cookie soufflé dessert");
    expect(observer.callCount).to.equal(6);
    expect(observer.lastCall.args[0]).to.equal(
      "Apple pie danish cookie soufflé dessert"
    );

    source4.emit("Gingerbread dessert fruitcake jelly beans");
    expect(observer.callCount).to.equal(7);
    expect(observer.lastCall.args[0]).to.equal(
      "Gingerbread dessert fruitcake jelly beans"
    );
  });
});
