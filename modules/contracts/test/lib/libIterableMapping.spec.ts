import { ethers, waffle } from "hardhat";
// import { Signer } from "ethers";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";

use(solidity);

import { formatBytes32String } from "@ethersproject/strings";

// import types
import { LibIterableMappingTest } from "../../typechain/LibIterableMappingTest";

describe.only("libIterableMapping", function() {
  let libIterableMappingTest: LibIterableMappingTest;

  const fixture = async () => {
    const libIterableMappingTestFactory = await ethers.getContractFactory("LibIterableMappingTest");
    return (await libIterableMappingTestFactory.deploy()) as LibIterableMappingTest;
  };
  beforeEach(async function() {
    libIterableMappingTest = await waffle.loadFixture(fixture);
  });

  it("should deploy", async () => {
    console.log("Address", libIterableMappingTest.address);
    expect(libIterableMappingTest.address).to.be.a("string");
  });

  describe("#digestEqual", () => {
    it.skip("should error if params are wrong", async () => {});
    it.skip("should error if asset is not contract", async () => {});
    it("happy case: should return false", async () => {
      const res = await libIterableMappingTest.digestEqual(formatBytes32String("0"), formatBytes32String("1"));
      console.log(res);
    });

    it("happy case: should return true", async () => {
      const res = await libIterableMappingTest.digestEqual(formatBytes32String("0"), formatBytes32String("0"));
      console.log(res);
    });
  });

  describe("#isEmptyString", () => {
    it.skip("should do something right", async () => {});
  });

  describe("#digestExists", () => {
    it.skip("should do something right", async () => {});
  });

  describe("#length", () => {
    it.skip("should do something right", async () => {});
  });

  describe("#getTransactionByDigest", () => {
    it.skip("should do something right", async () => {});
  });

  describe("#getTransactionByIndex", () => {
    it.skip("should do something right", async () => {});
  });

  describe("#getTransactions", () => {
    it.skip("should do something right", async () => {});
  });

  
  describe("#addTransaction", () => {
    it.skip("should do something right", async () => {});
  });

  describe("#removeTransaction", () => {
    it.skip("should do something right", async () => {});
  });

  
});
