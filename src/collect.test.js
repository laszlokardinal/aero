const createObservable = require("./createObservable.js");

const collect = require("./collect.js");

describe("collect()", () => {
  it("transmits incoming observable's actions", () => {
    const { emit, subscribe } = createObservable();

    const observer = sinon.spy();

    const sources = {
      a: createObservable(),
      b: createObservable(),
      c: createObservable()
    };

    collect()(subscribe)(observer);

    expect(observer.callCount).to.equal(0);

    emit(sources.a.subscribe);

    expect(observer.callCount).to.equal(0);

    sources.a.emit(1);

    expect(observer.callCount).to.equal(1);
    expect(observer.lastCall.args[0]).to.equal(1);

    sources.a.emit(2);

    expect(observer.callCount).to.equal(2);
    expect(observer.lastCall.args[0]).to.equal(2);

    emit(sources.b.subscribe);

    expect(observer.callCount).to.equal(2);

    sources.a.emit(3);

    expect(observer.callCount).to.equal(3);
    expect(observer.lastCall.args[0]).to.equal(3);

    sources.b.emit(4);

    expect(observer.callCount).to.equal(4);
    expect(observer.lastCall.args[0]).to.equal(4);

    emit(sources.c.subscribe);

    expect(observer.callCount).to.equal(4);

    expect(observer.callCount).to.equal(4);

    sources.c.emit(5);

    expect(observer.callCount).to.equal(5);
    expect(observer.lastCall.args[0]).to.equal(5);

    sources.b.emit(6);

    expect(observer.callCount).to.equal(6);
    expect(observer.lastCall.args[0]).to.equal(6);

    sources.a.emit(7);

    expect(observer.callCount).to.equal(7);
    expect(observer.lastCall.args[0]).to.equal(7);
  });
});
