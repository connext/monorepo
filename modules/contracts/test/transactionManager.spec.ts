import { ethers, getNamedAccounts, getUnnamedAccounts, waffle } from "hardhat";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";

use(solidity);

import { Wallet } from "@ethersproject/wallet";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { AddressZero } from "@ethersproject/constants";

// import types
import { TransactionManager } from "../typechain/TransactionManager";
import { hexlify, randomBytes } from "ethers/lib/utils";

type TransactionData = {
  user: string;
  router: string;
  sendingAssetId: string;
  receivingAssetId: string;
  receivingAddress: string;
  callData: string;
  transactionId: string;
  sendingChainId: BigNumberish;
  receivingChainId: BigNumberish;
  amount: BigNumberish;
  expiry: BigNumberish;
  blockNumber: BigNumberish;
};

describe("TransactionManager", function() {
  let transactionManager: TransactionManager;

  const fixture = async () => {
    const transactionManagerFactory = await ethers.getContractFactory("TransactionManager");
    return (await transactionManagerFactory.deploy(AddressZero, 1337)) as TransactionManager;
  };

  const getTransactionData = async (overrides: Partial<TransactionData> = {}): Promise<TransactionData> => {
    return {
      user: (await getNamedAccounts()).bob,
      router: await transactionManager.signer.getAddress(),
      sendingAssetId: AddressZero,
      receivingAssetId: AddressZero,
      receivingAddress: (await getNamedAccounts()).rando,
      callData: "0x",
      transactionId: hexlify(randomBytes(32)),
      sendingChainId: 1337,
      receivingChainId: 1338,
      amount: 10,
      expiry: Math.floor(Date.now() / 1000) + 5_000,
      blockNumber: 10,
      ...overrides,
    };
  };

  const addAndAssertLiquidity = async (amount: BigNumberish, assetId: string = AddressZero, _router?: Wallet) => {
    const router = await (_router ?? transactionManager.signer).getAddress();
    const event = new Promise(resolve => {
      transactionManager.once("LiquidityAdded", data => resolve(data));
    });
    const tx = await transactionManager.addLiquidity(amount, assetId, { value: BigNumber.from(amount) });

    const [receipt, payload] = await Promise.all([tx.wait(), event]);
    // TODO: stronger event assertions
    expect(payload).to.be.ok;
    expect(receipt.status).to.be.ok;
    // expect(receipt.events).to.be.deep.eq([payload]);

    // Check liquidity
    const liquidity = await transactionManager.routerBalances(router, assetId);
    expect(liquidity).to.be.eq(amount);
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

  it.only("happy case: should be able to perform a crosschain transfer", async () => {
    // TODO: make this crosschain
    // 1. Add router liquidity
    await addAndAssertLiquidity(10);

    // 2. User prepares transaction on sending chain
    // (2a. Router prepares transaction on receiving chain)
    const transaction = await getTransactionData();
    const prepareTx = await transactionManager.prepare(transaction);
    await prepareTx.wait();
    // TODO: event assertions

    // 3. User generates signature
    // (3b. User fulfills transaction on receiving chain)

    // 4. Router fulfills transaction on sending chain

    // 5. Remove router liquidity receiving chain
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
