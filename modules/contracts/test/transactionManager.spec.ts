import { ethers, waffle } from "hardhat";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";

use(solidity);

import { Wallet, BigNumber, BigNumberish, constants } from "ethers";

// import types
import { TransactionManager } from "../typechain/TransactionManager";
import { TestERC20 } from "../typechain/TestERC20";
import { hexlify, randomBytes } from "ethers/lib/utils";

const { AddressZero } = constants;

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

const createFixtureLoader = waffle.createFixtureLoader;
describe.only("TransactionManager", function() {
  const [wallet, router, bob, receiver] = waffle.provider.getWallets();
  let transactionManager: TransactionManager;
  let transactionManagerSenderSide: TransactionManager;
  let transactionManagerReceiverSide: TransactionManager;
  let tokenA: TestERC20;
  let tokenB: TestERC20;

  const fixture = async () => {
    const transactionManagerFactory = await ethers.getContractFactory("TransactionManager");

    const testERC20Factory = await ethers.getContractFactory("TestERC20");

    transactionManager = (await transactionManagerFactory.deploy(AddressZero, 1337)) as TransactionManager;

    transactionManagerSenderSide = (await transactionManagerFactory.deploy(AddressZero, 1337)) as TransactionManager;
    console.log(transactionManagerSenderSide.address);
    transactionManagerReceiverSide = (await transactionManagerFactory.deploy(AddressZero, 1338)) as TransactionManager;
    console.log(transactionManagerReceiverSide.address);
    tokenA = (await testERC20Factory.deploy("10000")) as TestERC20;
    tokenB = (await testERC20Factory.deploy("10000")) as TestERC20;

    return { transactionManager, tokenA, tokenB };
  };

  let loadFixture: ReturnType<typeof createFixtureLoader>;
  before("create fixture loader", async () => {
    loadFixture = createFixtureLoader([wallet, bob, receiver]);
  });

  beforeEach(async function() {
    ({ transactionManager, tokenA, tokenB } = await loadFixture(fixture));

    const liq = "1000";
    await tokenA.connect(wallet).transfer(router.address, liq);
    await tokenB.connect(wallet).transfer(router.address, liq);

    const prepareFunds = "100";
    await tokenA.connect(wallet).transfer(bob.address, prepareFunds);
    await tokenB.connect(wallet).transfer(bob.address, prepareFunds);
  });

  const getTransactionData = async (overrides: Partial<TransactionData> = {}): Promise<TransactionData> => {
    return {
      user: bob.address,
      router: router.address,
      sendingAssetId: AddressZero,
      receivingAssetId: AddressZero,
      receivingAddress: receiver.address,
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

  it("should deploy", async () => {
    console.log("Address", transactionManager.address);
    expect(transactionManager.address).to.be.a("string");
  });

  it("constructor initialize", async () => {
    expect(await transactionManager.chainId()).to.eq(1337);
    expect(await transactionManager.multisend()).to.eq(AddressZero);
  });

  it.skip("happy case: should be able to perform a crosschain transfer", async () => {
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
    // TODO: revert and emit event test cases
    it("happy case: addLiquity ERC20", async () => {
      const amount = "1";
      const assetId = tokenA.address;

      console.log(amount, assetId);
      const approveTx = await tokenA.connect(wallet).approve(transactionManager.address, amount);
      console.log(approveTx);

      const tx = await transactionManager.connect(wallet).addLiquidity(amount, assetId);
      console.log(tx);
    });

    it("happy case: addLiquity Native/Ether token", async () => {
      const amount = "1";
      const assetId = AddressZero;

      console.log(amount, assetId);
      const tx = await transactionManager.connect(wallet).addLiquidity(amount, assetId, { value: amount });
      console.log(tx);
    });
  });

  describe("#removeLiquidity", () => {
    // TODO: revert and emit event test cases
    it("happy case: removeLiquidity Native/Ether token", async () => {
      const amount = "1";
      const assetId = AddressZero;

      console.log(amount, assetId);
      const addLiquidityTx = await transactionManager.connect(wallet).addLiquidity(amount, assetId, { value: amount });
      console.log(addLiquidityTx);

      const removeLiquidityTx = await transactionManager
        .connect(wallet)
        .removeLiquidity(amount, assetId, wallet.address);
      console.log(removeLiquidityTx);
    });
    it("happy case: addLiquity ERC20", async () => {
      const amount = "1";
      const assetId = tokenA.address;

      console.log(amount, assetId);
      const approveTx = await tokenA.connect(wallet).approve(transactionManager.address, amount);
      console.log(approveTx);

      const addLiquidityTx = await transactionManager.connect(wallet).addLiquidity(amount, assetId);
      console.log(addLiquidityTx);

      const removeLiquidityTx = await transactionManager
        .connect(wallet)
        .removeLiquidity(amount, assetId, wallet.address);
      console.log(removeLiquidityTx);
    });
  });

  describe("#prepare", () => {
    // TODO: revert and emit event test cases
    it("happy case: prepare ERC20", async () => {
      const amount = "100";
      const assetId = tokenA.address;

      console.log(amount, assetId);
      const approveTx = await tokenA.connect(router).approve(transactionManager.address, amount);
      console.log(approveTx);

      const addLiquidityTx = await transactionManager.connect(router).addLiquidity(amount, assetId);
      console.log(addLiquidityTx);

      // 2. User prepares transaction on sending chain
      // (2a. Router prepares transaction on receiving chain)
      const prepareAmount = "10";
      const transaction = await getTransactionData({
        sendingAssetId: tokenA.address,
        receivingAssetId: tokenB.address,
        amount: prepareAmount,
      });

      const bobApproveTx = await tokenA.connect(bob).approve(transactionManager.address, prepareAmount);
      console.log(bobApproveTx);

      const prepareTx = await transactionManager.connect(bob).prepare(transaction);
      console.log(prepareTx);
    });

    it("happy case: prepare Ether/Native token", async () => {
      const amount = "100";
      const assetId = AddressZero;

      console.log(amount, assetId);

      const addLiquidityTx = await transactionManager.connect(wallet).addLiquidity(amount, assetId, { value: amount });
      console.log(addLiquidityTx);

      // 2. User prepares transaction on sending chain
      // (2a. Router prepares transaction on receiving chain)
      const prepareAmount = "10";
      const transaction = await getTransactionData({
        amount: prepareAmount,
      });

      const prepareTx = await transactionManager.connect(bob).prepare(transaction, { value: prepareAmount });
      console.log(prepareTx);
    });
  });

  describe("#fulfill", () => {
    it.skip("should do something right", async () => {});
  });

  describe("#cancel", () => {
    it.skip("should do something right", async () => {});
  });
});
