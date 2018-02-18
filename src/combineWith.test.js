const combineWith = require("./combineWith.js");
const createObservable = require("./createObservable.js");

describe("combineWith()", () => {
  it("combines source actions to an array of observables", () => {
    const source1 = createObservable();
    const source2 = createObservable();
    const source3 = createObservable();
    const source4 = createObservable();

    const observer = sinon.spy();

    combineWith(source2.subscribe, source3.subscribe, source4.subscribe)(
      source1.subscribe
    )(observer);

    expect(observer.callCount).to.equal(0);

    source2.emit(7);

    expect(observer.callCount).to.equal(1);
    expect(observer.args[0][0]).to.deep.equal([
      undefined,
      7,
      undefined,
      undefined
    ]);

    source4.emit(2);

    expect(observer.callCount).to.equal(2);
    expect(observer.args[1][0]).to.deep.equal([undefined, 7, undefined, 2]);
    expect(observer.args[1][0]).to.not.equal(observer.args[0][0]);

    source3.emit(1);

    expect(observer.callCount).to.equal(3);
    expect(observer.args[2][0]).to.deep.equal([undefined, 7, 1, 2]);
    expect(observer.args[2][0]).to.not.equal(observer.args[1][0]);

    source1.emit(2);

    expect(observer.callCount).to.equal(4);
    expect(observer.args[3][0]).to.deep.equal([2, 7, 1, 2]);
    expect(observer.args[3][0]).to.not.equal(observer.args[2][0]);

    source4.emit(3);

    expect(observer.callCount).to.equal(5);
    expect(observer.args[4][0]).to.deep.equal([2, 7, 1, 3]);
    expect(observer.args[4][0]).to.not.equal(observer.args[3][0]);

    source1.emit(1);

    expect(observer.callCount).to.equal(6);
    expect(observer.args[5][0]).to.deep.equal([1, 7, 1, 3]);
    expect(observer.args[5][0]).to.not.equal(observer.args[4][0]);

    source1.emit(1);

    expect(observer.callCount).to.equal(7);
    expect(observer.args[6][0]).to.deep.equal([1, 7, 1, 3]);
    expect(observer.args[6][0]).to.not.equal(observer.args[5][0]);

    source3.emit(undefined);

    expect(observer.callCount).to.equal(8);
    expect(observer.args[7][0]).to.deep.equal([1, 7, undefined, 3]);
    expect(observer.args[7][0]).to.not.equal(observer.args[6][0]);

    source3.emit(9);

    expect(observer.callCount).to.equal(9);
    expect(observer.args[8][0]).to.deep.equal([1, 7, 9, 3]);
    expect(observer.args[8][0]).to.not.equal(observer.args[7][0]);
  });
});
