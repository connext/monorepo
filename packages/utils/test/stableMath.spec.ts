import { getAmountsOut } from "../src/stableMath";
import { expect } from "chai";

describe("#getAmountsOut", () => {
  it("returns getAmountsOut if A = 1, Token0 = 1_000_000, Token1 = 1_000_000, Swapping Token0 = 1000", () => {
    const amountOut = getAmountsOut(
      "1",
      ["1000000000000000000000000", "1000000000000000000000000"],
      0,
      1,
      "1000000000000000000000"
    );
    const rounded = (Math.round((+amountOut / 1e18) * 10_000 ) / 10_000).toFixed(4);
    expect(rounded).to.be.eq(
      "999.5002",
    );
  });

  it("returns getAmountsOut if A = 10, Token0 = 1_000_000, Token1 = 1_000_000, Swapping Token0 = 1000", () => {
    const amountOut = getAmountsOut(
      "10",
      ["1000000000000000000000000", "1000000000000000000000000"],
      0,
      1,
      "1000000000000000000000"
    );
    const rounded = (Math.round((+amountOut / 1e18) * 10_000 ) / 10_000).toFixed(4);
    expect(rounded).to.be.eq(
      "999.9091",
    );
  });

  it("returns getAmountsOut if A = 50.11872, Token0 = 1_000_000, Token1 = 1_000_000, Swapping Token0 = 1000", () => {
    const amountOut = getAmountsOut(
      "50.11872",
      ["1000000000000000000000000", "1000000000000000000000000"],
      0,
      1,
      "1000000000000000000000"
    );
    const rounded = (Math.round((+amountOut / 1e18) * 100_000 ) / 100_000).toFixed(5);
    expect(rounded).to.be.eq(
      "999.98044",
    );
  });

  it("returns getAmountsOut if A = 794.32823, Token0 = 1_000_000, Token1 = 1_000_000, Swapping Token0 = 1000", () => {
    const amountOut = getAmountsOut(
      "794.32823",
      ["1000000000000000000000000", "1000000000000000000000000"],
      0,
      1,
      "1000000000000000000000"
    );
    const rounded = (Math.round((+amountOut / 1e18) * 100_000 ) / 100_000).toFixed(5);
    expect(rounded).to.be.eq(
      "999.99874",
    );
  });

});
