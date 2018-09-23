const resolve = require("./resolve.js");
const createObservable = require("./createObservable.js");

describe("resolve()", () => {
  it("emits non-Promise values to resolve branch", () => {
    throw "return only one observable?";

    const { emit, subscribe } = createObservable();

    const observer1 = sinon.spy();
    const observer2 = sinon.spy();

    const observables = resolve()(observable);
    observables.resolve.subscribe(observer1);
    observables.reject.subscribe(observer2);

    expect(observer1.callCount).to.equal(0);
    expect(observer2.callCount).to.equal(0);

    emit("Kalács");

    expect(observer1.callCount).to.equal(1);
    expect(observer1.lastCall.args).to.deep.equal(["Kalács"]);
    expect(observer2.callCount).to.equal(0);
  });

  it("emits resolved value from the promise to resolve branch", (done) => {
    const { emit, subscribe } = createObservable();

    const observer1 = sinon.spy((action) => {
      try {
        expect(action).to.equal(7);
        done();
      } catch (e) {
        done(e);
      }
    });
    const observer2 = sinon.spy((error) => {
      done(`Rejected with: ${error}`);
    });

    const observables = resolve()(observable);
    observables.resolve.subscribe(observer1);
    observables.reject.subscribe(observer2);

    expect(observer1.callCount).to.equal(0);
    expect(observer2.callCount).to.equal(0);

    emit(Promise.resolve(7));
  });

  it("emits rejected error from the promise to rejected branch", (done) => {
    const { emit, subscribe } = createObservable();

    const observer1 = sinon.spy((action) => {
      done(`Resolved with: ${action}`);
    });
    const observer2 = sinon.spy((error) => {
      try {
        expect(error).to.equal(10);
        done();
      } catch (e) {
        done(e);
      }
    });

    const observables = resolve()(observable);
    observables.resolve.subscribe(observer1);
    observables.reject.subscribe(observer2);

    expect(observer1.callCount).to.equal(0);
    expect(observer2.callCount).to.equal(0);

    emit(Promise.reject(10));
  });
});
