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

  const createUnsignedTransactionDataMock = (params: { amount?: number; expiry?: number; digest?: string }) => {
    return {
      amount: params.amount ?? 1,
      expiry: params.expiry ?? 10,
      digest: params.digest ?? formatBytes32String("a"),
    };
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
    it("happy case: should return false", async () => {
      const res = await libIterableMappingTest.isEmptyString(formatBytes32String("1"));
      console.log(res);
    });

    it("happy case: should return true", async () => {
      const res = await libIterableMappingTest.isEmptyString(formatBytes32String("0"));
      console.log(res);
    });
  });

  describe("#digestExists", () => {
    it("happy case: should return false", async () => {
      const res = await libIterableMappingTest.digestExists(formatBytes32String("1"));
      console.log(res);
    });

    it("happy case: should return true", async () => {
      const res = await libIterableMappingTest.digestExists(formatBytes32String("1"));
      console.log(res);
    });
  });

  describe("#length", () => {
    it("happy case: length", async () => {
      const res = await libIterableMappingTest.length();
      console.log(res);
    });
  });

  describe("#getTransactionByDigest", () => {
    it.skip("happy case: getTransactionByDigest", async () => {
      const res = await libIterableMappingTest.getTransactionByDigest(formatBytes32String("1"));
      console.log(res);
    });
  });

  describe("#getTransactionByIndex", () => {
    it.skip("happy case: getTransactionByIndex", async () => {
      const res = await libIterableMappingTest.getTransactionByIndex("1");
      console.log(res);
    });
  });

  describe("#getTransactions", () => {
    it.skip("happy case: getTransactions", async () => {
      const res = await libIterableMappingTest.getTransactions();
      console.log(res);
    });
  });

  describe("#addTransaction", () => {
    it("should revert if empty string", async () => {
      const mockTestParam = createUnsignedTransactionDataMock({ digest: formatBytes32String("0") });
      await expect(libIterableMappingTest.addTransaction(mockTestParam)).to.be.revertedWith(
        "LibIterableMapping: EMPTY_DIGEST",
      );
    });

    it("should revert if digest already exist", async () => {
      const mockTestParam = createUnsignedTransactionDataMock({});
      const res = await libIterableMappingTest.addTransaction(mockTestParam);
      console.log(res);

      await expect(libIterableMappingTest.addTransaction(mockTestParam)).to.be.revertedWith(
        "LibIterableMapping: DIGEST_ALREADY_ADDED",
      );
    });

    it("happy case: addTransaction", async () => {
      const mockTestParam = createUnsignedTransactionDataMock({});
      const res = await libIterableMappingTest.addTransaction(mockTestParam);
      console.log(res);
    });
  });

  describe("#removeTransaction", () => {
    it("should revert if empty string", async () => {
      await expect(libIterableMappingTest.removeTransaction(formatBytes32String("0"))).to.be.revertedWith(
        "LibIterableMapping: EMPTY_DIGEST",
      );
    });

    it("should revert if digest don't exist string", async () => {
      await expect(libIterableMappingTest.removeTransaction(formatBytes32String("1"))).to.be.revertedWith(
        "LibIterableMapping: DIGEST_NOT_FOUND",
      );
    });

    it("happy case: removeTransaction", async () => {
      const mockTestParam = createUnsignedTransactionDataMock({});
      const resAddTransaction = await libIterableMappingTest.addTransaction(mockTestParam);
      console.log(resAddTransaction);

      const res = await libIterableMappingTest.removeTransaction(formatBytes32String("a"));
      console.log(res);
    });
  });
});
