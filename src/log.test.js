const createObservable = require("./createObservable.js");

const log = require("./log");

describe("log", () => {
  it("logs the action to the console as stringified JSON", () => {
    const { emit, subscribe } = createObservable();

    try {
      sinon.stub(console, "log").callsFake(() => null);

      log()(subscribe);

      expect(console.log.callCount).to.equal(0);

      const action = {
        a: "Topping cookie lemon drops chupa chups sesame snaps",
        b: true,
        c: null,
        d: [1, 2, 3]
      };

      emit(action);

      expect(console.log.callCount).to.equal(1);
      expect(JSON.parse(console.log.lastCall.args[0])).to.deep.equal(action);
    } finally {
      console.log.restore();
    }
  });

  it("logs the action via the serializer function from opts", () => {
    const { emit, subscribe } = createObservable();

    try {
      sinon.stub(console, "log").callsFake(() => null);

      log(null, (value) => value)(subscribe);

      expect(console.log.callCount).to.equal(0);

      const action = {
        a: "Topping cookie lemon drops chupa chups sesame snaps",
        b: true,
        c: null,
        d: [1, 2, 3]
      };

      emit(action);

      expect(console.log.callCount).to.equal(1);
      expect(console.log.lastCall.args[0]).to.equal(action);
    } finally {
      console.log.restore();
    }
  });

  it("logs the action with the prefix from opts", () => {
    const { emit, subscribe } = createObservable();

    try {
      sinon.stub(console, "log").callsFake(() => null);

      log("kalács")(subscribe);

      expect(console.log.callCount).to.equal(0);

      const action = {
        a: "Topping cookie lemon drops chupa chups sesame snaps",
        b: true,
        c: null,
        d: [1, 2, 3]
      };

      emit(action);

      expect(console.log.callCount).to.equal(1);
      expect(console.log.lastCall.args[0]).to.equal("kalács");
      expect(JSON.parse(console.log.lastCall.args[1])).to.deep.equal(action);
    } finally {
      console.log.restore();
    }
  });

  it("transmits actions", () => {
    const { emit, subscribe } = createObservable();
    const observer = sinon.spy();

    try {
      sinon.stub(console, "log").callsFake(() => null);

      log()(subscribe)(observer);

      expect(observer.callCount).to.equal(0);

      emit("kalács");

      expect(observer.callCount).to.equal(1);
      expect(observer.lastCall.args[0]).to.equal("kalács");
    } finally {
      console.log.restore();
    }
  });
});
