import { use, expect } from "chai";
import { ethers, waffle } from "hardhat";
import { solidity } from "ethereum-waffle";
import { StableSwap } from "../typechain";

use(solidity);

import { constants, providers, BigNumber, Wallet } from "ethers";
import { parseEther, parseUnits } from "@ethersproject/units";
import { deployContract } from "./utils";

const createFixtureLoader = waffle.createFixtureLoader;
describe("StableSwap.sol", () => {
  const [wallet, other] = waffle.provider.getWallets() as Wallet[];
  let stableSwap: StableSwap;
  const amount30 = parseEther("30");
  const amount60 = parseEther("60");
  const amount90 = parseEther("90");
  const amount95 = parseEther("95");
  const amount99 = parseEther("99");
  let balances = [parseEther("100"), parseEther("100")];

  const fixture = async () => {
    stableSwap = await deployContract<StableSwap>("StableSwap", parseUnits("2500", 0));
  };

  let loadFixture: ReturnType<typeof createFixtureLoader>;
  before("create fixture loader", async () => {
    loadFixture = createFixtureLoader([wallet, other]);
  });

  beforeEach(async () => {
    await loadFixture(fixture);
  });

  describe("amplificationParameter", () => {
    it("should work", async () => {
      const expectAmplification = BigNumber.from("2500");
      expect(await stableSwap.amplificationParameter()).to.be.eq(expectAmplification);
    });
  });

  describe("getAmplificationParameter", () => {
    it("should work", async () => {
      const expectAmplification = BigNumber.from("2500");
      expect(await stableSwap.getAmplificationParameter()).to.be.eq(expectAmplification);
    });
  });

  describe("onSwapGivenIn", () => {
    it("happy: run onSwapGivenIn 30", async () => {
      expect(stableSwap.address).to.be.a("string");
      const res = await stableSwap.onSwapGivenIn(amount30, balances, 0, 1);
      console.log(res);
    });
    it("happy: run onSwapGivenIn 60", async () => {
      expect(stableSwap.address).to.be.a("string");
      const res = await stableSwap.onSwapGivenIn(amount60, balances, 0, 1);
      console.log(res);
    });
    it("happy: run onSwapGivenIn 90", async () => {
      expect(stableSwap.address).to.be.a("string");
      const res = await stableSwap.onSwapGivenIn(amount90, balances, 0, 1);
      console.log(res);
    });
    it("happy: run onSwapGivenIn 95", async () => {
      expect(stableSwap.address).to.be.a("string");
      const res = await stableSwap.onSwapGivenIn(amount95, balances, 0, 1);
      console.log(res);
    });
    it("happy: run onSwapGivenIn 99", async () => {
      expect(stableSwap.address).to.be.a("string");
      const res = await stableSwap.onSwapGivenIn(amount99, balances, 0, 1);
      console.log(res);
    });
  });

  describe("onSwapGivenOut", () => {
    it("happy: run onSwapGivenOut 30", async () => {
      expect(stableSwap.address).to.be.a("string");
      const res = await stableSwap.onSwapGivenOut(amount30, balances, 0, 1);
      console.log(res);
    });
    it("happy: run onSwapGivenOut 60", async () => {
      expect(stableSwap.address).to.be.a("string");
      const res = await stableSwap.onSwapGivenOut(amount60, balances, 0, 1);
      console.log(res);
    });
    it("happy: run onSwapGivenOut 90", async () => {
      expect(stableSwap.address).to.be.a("string");
      const res = await stableSwap.onSwapGivenOut(amount90, balances, 0, 1);
      console.log(res);
    });
    it("happy: run onSwapGivenOut 95", async () => {
      expect(stableSwap.address).to.be.a("string");
      const res = await stableSwap.onSwapGivenOut(amount95, balances, 0, 1);
      console.log(res);
    });
    it("happy: run onSwapGivenOut 99", async () => {
      expect(stableSwap.address).to.be.a("string");
      const res = await stableSwap.onSwapGivenOut(amount99, balances, 0, 1);
      console.log(res);
    });
  });
});
