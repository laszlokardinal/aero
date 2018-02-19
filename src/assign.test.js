const assign = require("./assign");

describe("assign", () => {
  it("assign values to target mapped by the argument function", () => {
    const target = { krumpli_leves: 3, krumpli_lángos: 4 };

    values = { főzelék: 1, lángos: 2 };

    values |> assign(target, (key) => "krumpli_" + key);

    expect(target).to.deep.equal({
      krumpli_főzelék: 1,
      krumpli_lángos: 2,
      krumpli_leves: 3
    });
  });

  it("assign values to target mapped by the argument object", () => {
    const target = { kalács: 4, pizza: 3 };

    values = { főzelék: 1, lángos: 2 };

    values |> assign(target, { főzelék: "kenyér", lángos: "kalács" });

    expect(target).to.deep.equal({
      kenyér: 1,
      kalács: 2,
      pizza: 3
    });
  });

  it("assign values to target mapped by the argument array", () => {
    const target = { kalács: 4, pizza: 3 };

    values = [1, 2];

    values |> assign(target, ["kenyér", "kalács"]);

    expect(target).to.deep.equal({
      kenyér: 1,
      kalács: 2,
      pizza: 3
    });
  });

  it("assign value to target as the argument key string", () => {
    const target = { kenyérlángos: 1, nokedli: 2 };

    value = 2;

    value |> assign(target, "kenyérlángos");

    expect(target).to.deep.equal({
      kenyérlángos: 2,
      nokedli: 2
    });
  });

  it("assigns value to target as the argument index number", () => {
    const target = [0, 10, 20, 30];

    value = 200;

    value |> assign(target, 2);

    expect(target).to.deep.equal([0, 10, 200, 30]);
  });

  it("assign values without mapping", () => {
    const target = { lángos: 4, pizza: 3 };

    values = { főzelék: 1, lángos: 2 };

    values |> assign(target);

    expect(target).to.deep.equal({
      főzelék: 1,
      lángos: 2,
      pizza: 3
    });
  });
});
