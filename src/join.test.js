const join = require("./join.js");
const createObservable = require("./createObservable.js");

const concat = (id) => (source) => {
  const { emit, subscribe } = createObservable();

  source((action) => emit(action.concat(id)));

  return subscribe;
};

describe("join()", () => {
  it("joins operators", () => {
    const { emit, subscribe } = createObservable();
    const observer = sinon.spy();

    join([concat(1), concat(2), concat(3)])(subscribe)(observer);

    expect(observer.callCount).to.equal(0);

    emit([192]);

    expect(observer.callCount).to.equal(1);
    expect(observer.args[0][0]).to.deep.equal([192, 1, 2, 3]);

    emit([17]);

    expect(observer.callCount).to.equal(2);
    expect(observer.args[1][0]).to.deep.equal([17, 1, 2, 3]);

    emit([255]);

    expect(observer.callCount).to.equal(3);

    expect(observer.args[2][0]).to.deep.equal([255, 1, 2, 3]);
  });
});
