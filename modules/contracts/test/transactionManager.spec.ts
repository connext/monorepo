import { ethers, waffle } from "hardhat";
// import { Signer } from "ethers";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";

use(solidity);

import { AddressZero } from "@ethersproject/constants";

// import types
import { TransactionManager } from "../typechain/TransactionManager";

describe("TransactionManager", function() {
  let transactionManager: TransactionManager;

  const fixture = async () => {
    const transactionManagerFactory = await ethers.getContractFactory("TransactionManager");
    return (await transactionManagerFactory.deploy(AddressZero, 1337)) as TransactionManager;
  };
  beforeEach(async function() {
    transactionManager = await waffle.loadFixture(fixture);
  });

  it("should deploy", async () => {
    console.log("Address", transactionManager.address);
    expect(transactionManager.address).to.be.a("string");
  });

  it("constructor initialize", async () => {
    expect(await transactionManager.chainId()).to.eq(1337);
    expect(await transactionManager.multisend()).to.eq(AddressZero);
  });

  describe("#addLiquidity", () => {
    it("should do something right", async () => {});
  });

  describe("#removeLiquidity", () => {
    it("should do something right", async () => {});
  });

  describe("#prepare", () => {
    it("should do something right", async () => {});
  });

  describe("#fulfill", () => {
    it("should do something right", async () => {});
  });

  describe("#cancel", () => {
    it("should do something right", async () => {});
  });
});
