import { ethers, waffle } from "hardhat";
// import { Signer } from "ethers";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";

use(solidity);

import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { Zero } from "@ethersproject/constants";
import { formatBytes32String } from "@ethersproject/strings";
import { randomBytes } from "@ethersproject/random";
import { hexlify } from "@ethersproject/bytes";

// import types
import { LibIterableMappingTest } from "../../typechain/LibIterableMappingTest";

type VariableTransactionData = {
  user: string;
  amount: BigNumberish;
  expiry: BigNumberish;
  blockNumber: BigNumberish;
  digest: string;
};

describe.only("LibIterableMapping.sol", function() {
  let libIterableMappingTest: LibIterableMappingTest;

  const fixture = async () => {
    const libIterableMappingTestFactory = await ethers.getContractFactory("LibIterableMappingTest");
    return (await libIterableMappingTestFactory.deploy()) as LibIterableMappingTest;
  };

  const createVariableTransactionDataMock = (
    params: Partial<VariableTransactionData> = {},
  ): VariableTransactionData => {
    return {
      user: params.user ?? ethers.Wallet.createRandom().address,
      amount: params.amount ?? 1,
      expiry: params.expiry ?? 10,
      digest: params.digest ?? hexlify(randomBytes(32)),
      blockNumber: params.blockNumber ?? 10,
    };
  };

  // Helper function to load data into registry
  const loadMapping = async (entries = 5): Promise<VariableTransactionData[]> => {
    // Load some data into the library
    const values = Array(entries)
      .fill(0)
      .map(_ => {
        return createVariableTransactionDataMock();
      });
    for (const transaction of values) {
      const tx = await libIterableMappingTest.addTransaction(transaction);
      await tx.wait();
    }
    return values;
  };

  // Helper function to remove data from registry
  const unloadMapping = async (entries: VariableTransactionData[]): Promise<void> => {
    for (const transaction of entries) {
      const tx = await libIterableMappingTest.removeTransaction(transaction.digest);
      await tx.wait();
    }
  };

  // Helper to assert digest from returned chain value
  const assertDigest = (expected: VariableTransactionData, returned: any) => {
    const keys = Object.keys(expected);
    keys.map(k => {
      expect(returned[k]).to.be.deep.eq((expected as any)[k]);
    });
  };

  beforeEach(async function() {
    libIterableMappingTest = await waffle.loadFixture(fixture);
  });

  it("should deploy", async () => {
    expect(libIterableMappingTest.address).to.be.a("string");
  });

  describe("#digestEqual", () => {
    it("should return false", async () => {
      const res = await libIterableMappingTest.digestEqual(formatBytes32String("0"), formatBytes32String("1"));
      expect(res).to.be.false;
    });

    it("should return true", async () => {
      const res = await libIterableMappingTest.digestEqual(formatBytes32String("0"), formatBytes32String("0"));
      expect(res).to.be.true;
    });
  });

  describe("#isEmptyString", () => {
    it("should return false", async () => {
      const res = await libIterableMappingTest.isEmptyString(formatBytes32String("1"));
      expect(res).to.be.false;
    });

    it("should return true", async () => {
      const res = await libIterableMappingTest.isEmptyString(formatBytes32String(""));
      expect(res).to.be.true;
    });
  });

  describe("#digestExists", () => {
    let transactions: VariableTransactionData[];
    beforeEach(async () => {
      transactions = await loadMapping();
    });

    it("should return false", async () => {
      const res = await libIterableMappingTest.digestExists(formatBytes32String("1"));
      expect(res).to.be.false;
    });

    it("should return true", async () => {
      const res = await libIterableMappingTest.digestExists(transactions[0].digest);
      expect(res).to.be.true;
    });

    it("should return false if it is an empty string", async () => {
      const res = await libIterableMappingTest.digestExists(formatBytes32String(""));
      expect(res).to.be.false;
    });

    it("should return false if the mapping is empty", async () => {
      await unloadMapping(transactions);
      const res = await libIterableMappingTest.digestExists(transactions[0].digest);
      expect(res).to.be.false;
    });
  });

  describe("#length", () => {
    it("should work when empty", async () => {
      const res = await libIterableMappingTest.length();
      expect(res).to.be.eq(Zero);
    });

    it("should work when loaded", async () => {
      await loadMapping(3);
      const res = await libIterableMappingTest.length();
      expect(res).to.be.eq(BigNumber.from(3));
    });
  });

  describe("#getTransactionByDigest", () => {
    let transactions: VariableTransactionData[];

    beforeEach(async () => {
      transactions = await loadMapping();
    });

    it("should work", async () => {
      const res = await libIterableMappingTest.getTransactionByDigest(transactions[0].digest);
      assertDigest(transactions[0], res);
    });

    it("should fail if the difest does not exist", async () => {
      const digest = formatBytes32String("1");
      const registered = transactions.map(t => t.digest);
      expect(registered.includes(digest)).to.be.false;
      await expect(libIterableMappingTest.getTransactionByDigest(digest)).revertedWith(
        "LibIterableMapping: DIGEST_NOT_FOUND",
      );
    });
  });

  describe("#getTransactionByIndex", () => {
    let transactions: VariableTransactionData[];

    beforeEach(async () => {
      transactions = await loadMapping();
    });

    it("should work", async () => {
      const res = await libIterableMappingTest.getTransactionByIndex(Zero);
      assertDigest(transactions[0], res);
    });

    it("should fail if the index does not exist", async () => {
      const idx = transactions.length;
      await expect(libIterableMappingTest.getTransactionByIndex(idx)).revertedWith("LibIterableMapping: INVALID_INDEX");
    });
  });

  describe("#getTransactionsByUser", () => {
    let transactions: VariableTransactionData[];

    beforeEach(async () => {
      transactions = await loadMapping();
    });

    it("should work when there is one transaction for user", async () => {
      const res = await libIterableMappingTest.getTransactionsByUser(transactions[0].user);
      expect(res.length).to.be.eq(1);
      [transactions[0]].map((t, idx) => assertDigest(t, res[idx]));
    });

    it("should work when there are multiple transactions for user", async () => {
      const toLoad: VariableTransactionData = { ...transactions[0], digest: hexlify(randomBytes(32)) };
      const tx = await libIterableMappingTest.addTransaction(toLoad);
      await tx.wait();
      const res = await libIterableMappingTest.getTransactionsByUser(transactions[0].user);
      expect(res.length).to.be.eq(2);
      [transactions[0], toLoad].map((t, idx) => assertDigest(t, res[idx]));
    });

    it("should work when there are no transactions for user", async () => {
      const res = await libIterableMappingTest.getTransactionsByUser(ethers.Wallet.createRandom().address);
      expect(res).to.be.deep.eq([]);
    });
  });

  describe("#getTransactions", () => {
    let transactions: VariableTransactionData[];

    beforeEach(async () => {
      transactions = await loadMapping();
    });

    it("should work", async () => {
      const res = await libIterableMappingTest.getTransactions();
      expect(res.length).to.be.eq(transactions.length);
      transactions.map((t, idx) => assertDigest(t, res[idx]));
    });
  });

  describe("#addTransaction", () => {
    it("should revert if empty string", async () => {
      const mockTestParam = createVariableTransactionDataMock({ digest: formatBytes32String("0") });
      await expect(libIterableMappingTest.addTransaction(mockTestParam)).to.be.revertedWith(
        "LibIterableMapping: EMPTY_DIGEST",
      );
    });

    it("should revert if digest already exist", async () => {
      const mockTestParam = createVariableTransactionDataMock();
      const res = await libIterableMappingTest.addTransaction(mockTestParam);
      console.log(res);

      await expect(libIterableMappingTest.addTransaction(mockTestParam)).to.be.revertedWith(
        "LibIterableMapping: DIGEST_ALREADY_ADDED",
      );
    });

    it("addTransaction", async () => {
      const mockTestParam = createVariableTransactionDataMock();
      const res = await libIterableMappingTest.addTransaction(mockTestParam);
      console.log(res);
    });
  });

  describe("#removeTransaction", () => {
    it("should revert if empty string", async () => {
      await expect(libIterableMappingTest.removeTransaction(formatBytes32String(""))).to.be.revertedWith(
        "LibIterableMapping: EMPTY_DIGEST",
      );
    });

    it("should revert if digest don't exist string", async () => {
      await expect(libIterableMappingTest.removeTransaction(formatBytes32String("1"))).to.be.revertedWith(
        "LibIterableMapping: DIGEST_NOT_FOUND",
      );
    });

    it("removeTransaction", async () => {
      const mockTestParam = createVariableTransactionDataMock();
      const resAddTransaction = await libIterableMappingTest.addTransaction(mockTestParam);
      console.log(resAddTransaction);

      const res = await libIterableMappingTest.removeTransaction(formatBytes32String("a"));
      console.log(res);
    });
  });
});
