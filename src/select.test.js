const select = require("./select.js");
const createObservable = require("./createObservable.js");

describe("select()", () => {
  describe("on existing target", () => {
    it("selects target value by a single key", () => {
      const { emit, subscribe } = createObservable();
      const observer = sinon.spy();

      select("property")(subscribe)(observer);

      expect(observer.callCount).to.equal(0);

      emit({ property: "value" });

      expect(observer.callCount).to.equal(1);
      expect(observer.lastCall.args[0]).to.equal("value");
    });

    it("selects target value by dot notation path", () => {
      const { emit, subscribe } = createObservable();
      const observer = sinon.spy();

      select("nested.dot.path")(subscribe)(observer);

      expect(observer.callCount).to.equal(0);

      emit({
        nested: {
          dot: {
            path: "value"
          }
        }
      });

      expect(observer.callCount).to.equal(1);
      expect(observer.lastCall.args[0]).to.equal("value");
    });

    it("selects target value by bracket notation path", () => {
      const { emit, subscribe } = createObservable();
      const observer = sinon.spy();

      select("[2][0][1]")(subscribe)(observer);

      expect(observer.callCount).to.equal(0);

      emit([
        [[10, 11, 12], [20, 21, 22], [30, 31, 32]],
        [[40, 41, 42], [50, 51, 52], [60, 61, 62]],
        [[70, 71, 72], [80, 81, 82], [90, 91, 92]]
      ]);

      expect(observer.callCount).to.equal(1);
      expect(observer.lastCall.args[0]).to.equal(71);
    });

    it("selects target value by mixed notation path", () => {
      const { emit, subscribe } = createObservable();
      const observer = sinon.spy();

      select("nested.dot[0].path[1]")(subscribe)(observer);

      expect(observer.callCount).to.equal(0);

      emit({
        nested: {
          dot: [
            { path: [10, 11, 12] },
            { path: [20, 21, 22] },
            { path: [30, 31, 32] }
          ]
        }
      });

      expect(observer.callCount).to.equal(1);
      expect(observer.lastCall.args[0]).to.equal(11);
    });
  });

  describe("on non-existing target", () => {
    it("emits undefined by a single key", () => {
      const { emit, subscribe } = createObservable();
      const observer = sinon.spy();

      select("property")(subscribe)(observer);

      expect(observer.callCount).to.equal(0);

      emit({});

      expect(observer.callCount).to.equal(1);
      expect(observer.lastCall.args[0]).be.undefined;
    });

    it("emits undefined by dot notation path", () => {
      const { emit, subscribe } = createObservable();
      const observer = sinon.spy();

      select("nested.dot.path")(subscribe)(observer);

      expect(observer.callCount).to.equal(0);

      emit({ nested: {} });

      expect(observer.callCount).to.equal(1);
      expect(observer.lastCall.args[0]).be.undefined;
    });

    it("emits undefined by bracket notation path", () => {
      const { emit, subscribe } = createObservable();
      const observer = sinon.spy();

      select("[2][0][1]")(subscribe)(observer);

      expect(observer.callCount).to.equal(0);

      emit([[[10], [20], [30]], [[40], [50], [60]], [[70], [80], [90]]]);

      expect(observer.callCount).to.equal(1);
      expect(observer.lastCall.args[0]).to.be.undefined;
    });

    it("emits undefined by mixed notation path", () => {
      const { emit, subscribe } = createObservable();
      const observer = sinon.spy();

      select("nested.dot[0].path[1]")(subscribe)(observer);

      expect(observer.callCount).to.equal(0);

      emit({
        nested: {
          dot: [{}, {}, {}]
        }
      });

      expect(observer.callCount).to.equal(1);
      expect(observer.lastCall.args[0]).to.be.undefined;
    });
  });
});
