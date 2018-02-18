const split = require("./split.js");
const createObservable = require("./createObservable.js");

describe("split()", () => {
  it("splits source actions to an array of 2 by default", () => {
    const { emit, subscribe } = createObservable();

    const stringsObserver = sinon.spy();
    const othersObserver = sinon.spy();

    const [othersObservable, stringsObservable] = split(
      (action) => typeof action === "string"
    )(subscribe);

    othersObservable(othersObserver);
    stringsObservable(stringsObserver);

    expect(stringsObserver.callCount).to.equal(0);
    expect(othersObserver.callCount).to.equal(0);

    emit("Croissant cookie halvah");

    expect(stringsObserver.callCount).to.equal(1);
    expect(othersObserver.callCount).to.equal(0);
    expect(stringsObserver.lastCall.args[0]).to.equal(
      "Croissant cookie halvah"
    );

    emit(true);

    expect(stringsObserver.callCount).to.equal(1);
    expect(othersObserver.callCount).to.equal(1);
    expect(othersObserver.lastCall.args[0]).to.equal(true);

    emit("Topping cookie lemon drops chupa chups sesame snaps");

    expect(stringsObserver.callCount).to.equal(2);
    expect(othersObserver.callCount).to.equal(1);
    expect(stringsObserver.lastCall.args[0]).to.equal(
      "Topping cookie lemon drops chupa chups sesame snaps"
    );

    emit(false);

    expect(stringsObserver.callCount).to.equal(2);
    expect(othersObserver.callCount).to.equal(2);
    expect(othersObserver.lastCall.args[0]).to.equal(false);

    emit(9);

    expect(stringsObserver.callCount).to.equal(2);
    expect(othersObserver.callCount).to.equal(3);
    expect(othersObserver.lastCall.args[0]).to.equal(9);

    emit("Fruitcake candy chupa chups oat cake");

    expect(stringsObserver.callCount).to.equal(3);
    expect(othersObserver.callCount).to.equal(3);
    expect(stringsObserver.lastCall.args[0]).to.equal(
      "Fruitcake candy chupa chups oat cake"
    );

    emit("Powder tart caramels tart sesame snaps pudding brownie");

    expect(stringsObserver.callCount).to.equal(4);
    expect(othersObserver.callCount).to.equal(3);
    expect(stringsObserver.lastCall.args[0]).to.equal(
      "Powder tart caramels tart sesame snaps pudding brownie"
    );

    emit(11);

    expect(stringsObserver.callCount).to.equal(4);
    expect(othersObserver.callCount).to.equal(4);
    expect(othersObserver.lastCall.args[0]).to.equal(11);
  });

  it("splits source actions to an array of observables", () => {
    const { emit, subscribe } = createObservable();

    const cObserver = sinon.spy();
    const tObserver = sinon.spy();
    const sObserver = sinon.spy();

    const [cObservable, tObservable, sObservable] = split(
      (action) => ["C", "T", "S"].indexOf(action[0]),
      3
    )(subscribe);

    cObservable(cObserver);
    tObservable(tObserver);
    sObservable(sObserver);

    expect(cObserver.callCount).to.equal(0);
    expect(tObserver.callCount).to.equal(0);
    expect(sObserver.callCount).to.equal(0);

    emit("Croissant cookie halvah");

    expect(cObserver.callCount).to.equal(1);
    expect(tObserver.callCount).to.equal(0);
    expect(sObserver.callCount).to.equal(0);
    expect(cObserver.lastCall.args[0]).to.equal("Croissant cookie halvah");

    emit("Topping cookie lemon drops chupa chups sesame snaps");

    expect(cObserver.callCount).to.equal(1);
    expect(tObserver.callCount).to.equal(1);
    expect(sObserver.callCount).to.equal(0);
    expect(tObserver.lastCall.args[0]).to.equal(
      "Topping cookie lemon drops chupa chups sesame snaps"
    );

    emit("Tiramisu chocolate bar tiramisu icing liquorice");

    expect(cObserver.callCount).to.equal(1);
    expect(tObserver.callCount).to.equal(2);
    expect(sObserver.callCount).to.equal(0);
    expect(tObserver.lastCall.args[0]).to.equal(
      "Tiramisu chocolate bar tiramisu icing liquorice"
    );

    emit("Sugar plum macaroon lollipop caramels carrot cake");

    expect(cObserver.callCount).to.equal(1);
    expect(tObserver.callCount).to.equal(2);
    expect(sObserver.callCount).to.equal(1);
    expect(sObserver.lastCall.args[0]).to.equal(
      "Sugar plum macaroon lollipop caramels carrot cake"
    );

    emit("Candy canes cake tart carrot cake icing topping dessert");

    expect(cObserver.callCount).to.equal(2);
    expect(tObserver.callCount).to.equal(2);
    expect(sObserver.callCount).to.equal(1);
    expect(cObserver.lastCall.args[0]).to.equal(
      "Candy canes cake tart carrot cake icing topping dessert"
    );

    emit("Candy cotton candy jelly");

    expect(cObserver.callCount).to.equal(3);
    expect(tObserver.callCount).to.equal(2);
    expect(sObserver.callCount).to.equal(1);
    expect(cObserver.lastCall.args[0]).to.equal("Candy cotton candy jelly");

    emit("Sesame snaps cotton candy croissant");

    expect(cObserver.callCount).to.equal(3);
    expect(tObserver.callCount).to.equal(2);
    expect(sObserver.callCount).to.equal(2);
    expect(sObserver.lastCall.args[0]).to.equal(
      "Sesame snaps cotton candy croissant"
    );
  });
});
