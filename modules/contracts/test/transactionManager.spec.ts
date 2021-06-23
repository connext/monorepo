import { ethers, waffle } from "hardhat";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
import { encodeTxData, TransactionData } from "@connext/nxtp-utils";
use(solidity);

import { hexlify, keccak256, randomBytes } from "ethers/lib/utils";
import { Wallet, BigNumber, BigNumberish, constants, Contract, ContractReceipt } from "ethers";

// import types
import { TransactionManager } from "../typechain/TransactionManager";
import { TestERC20 } from "../typechain/TestERC20";
import { getOnchainBalance } from "./utils";

const { AddressZero } = constants;

const createFixtureLoader = waffle.createFixtureLoader;
describe.only("TransactionManager", function() {
  const [wallet, router, user, receiver] = waffle.provider.getWallets();
  let transactionManager: TransactionManager;
  let transactionManagerReceiverSide: TransactionManager;
  let tokenA: TestERC20;
  let tokenB: TestERC20;

  const fixture = async () => {
    const transactionManagerFactory = await ethers.getContractFactory("TransactionManager");

    const testERC20Factory = await ethers.getContractFactory("TestERC20");

    transactionManager = (await transactionManagerFactory.deploy(AddressZero, 1337)) as TransactionManager;

    transactionManagerReceiverSide = (await transactionManagerFactory.deploy(AddressZero, 1338)) as TransactionManager;
    tokenA = (await testERC20Factory.deploy("10000")) as TestERC20;
    tokenB = (await testERC20Factory.deploy("10000")) as TestERC20;

    return { transactionManager, transactionManagerReceiverSide, tokenA, tokenB };
  };

  let loadFixture: ReturnType<typeof createFixtureLoader>;
  before("create fixture loader", async () => {
    loadFixture = createFixtureLoader([wallet, user, receiver]);
  });

  beforeEach(async function() {
    ({ transactionManager, transactionManagerReceiverSide, tokenA, tokenB } = await loadFixture(fixture));

    const liq = "1000";
    await tokenA.connect(wallet).transfer(router.address, liq);
    await tokenB.connect(wallet).transfer(router.address, liq);

    const prepareFunds = "100";
    await tokenA.connect(wallet).transfer(user.address, prepareFunds);
    await tokenB.connect(wallet).transfer(user.address, prepareFunds);
  });

  const getTransactionData = async (overrides: Partial<TransactionData> = {}): Promise<TransactionData> => {
    return {
      user: user.address,
      router: router.address,
      sendingAssetId: AddressZero,
      receivingAssetId: AddressZero,
      receivingAddress: receiver.address,
      callData: "0x",
      transactionId: hexlify(randomBytes(32)),
      sendingChainId: 1337,
      receivingChainId: 1338,
      amount: "10",
      expiry: (Math.floor(Date.now() / 1000) + 5_000).toString(),
      blockNumber: "10",
      ...overrides,
    };
  };

  const approveTokens = async (amount: BigNumberish, approver: Wallet, token: Contract = tokenA) => {
    const approveTx = await token.connect(approver).approve(transactionManager.address, amount);
    await approveTx.wait();
  };

  const assertObject = (expected: any, returned: any) => {
    const keys = Object.keys(expected);
    keys.map(k => {
      expect(returned[k]).to.be.deep.eq((expected as any)[k]);
    });
  };

  const assertReceiptEvent = async (receipt: ContractReceipt, eventName: string, expected: any) => {
    expect(receipt.status).to.be.eq(1);
    const idx = receipt.events?.findIndex(e => e.event === eventName) ?? -1;
    expect(idx).to.not.be.eq(-1);
    const decoded = receipt.events![idx].decode!(receipt.events![idx].data, receipt.events![idx].topics);
    assertObject(expected, decoded);
  };

  const addAndAssertLiquidity = async (amount: BigNumberish, assetId: string = AddressZero, _router?: Wallet) => {
    const router = _router ?? transactionManager.signer;
    transactionManager.on("LiquidityAdded", data => {
      console.log("got liquidity added event", data);
    });
    // TODO: debug event emission wtf
    // const event = new Promise(resolve => {
    //   transactionManager.once("LiquidityAdded", data => {
    //     return resolve(data);
    //   });
    // });
    const tx = await transactionManager
      .connect(router)
      .addLiquidity(amount, assetId, assetId === AddressZero ? { value: BigNumber.from(amount) } : {});

    const receipt = await tx.wait();
    // const [receipt, payload] = await Promise.all([tx.wait(), event]);
    // expect(payload).to.be.ok;

    // Verify receipt + attached events
    expect(receipt.status).to.be.eq(1);
    await assertReceiptEvent(receipt, "LiquidityAdded", { router: await router.getAddress(), assetId, amount });

    // Check liquidity
    const liquidity = await transactionManager.routerBalances(await router.getAddress(), assetId);
    expect(liquidity).to.be.eq(amount);
  };

  const removeAndAssertLiquidity = async (amount: BigNumberish, assetId: string = AddressZero, _router?: Wallet) => {
    const router = _router ?? transactionManager.signer;

    // Get starting + expected  balance
    const startingBalance = await getOnchainBalance(assetId, await router.getAddress(), ethers.provider);
    const expectedBalance = startingBalance.add(amount);

    const startingLiquidity = await transactionManager.routerBalances(await router.getAddress(), assetId);
    const expectedLiquidity = startingLiquidity.sub(amount);

    // TODO: debug event emission wtf
    // const event = new Promise(resolve => {
    //   transactionManager.once("LiquidityRemoved", data => resolve(data));
    // });
    const tx = await transactionManager.connect(router).removeLiquidity(amount, assetId, await router.getAddress());

    const receipt = await tx.wait();
    expect(receipt.status).to.be.eq(1);
    // const [receipt, payload] = await Promise.all([tx.wait(), event]);
    // expect(payload).to.be.ok;

    // Verify receipt events
    const routerAddress = await router.getAddress();
    await assertReceiptEvent(receipt, "LiquidityRemoved", {
      router: routerAddress,
      assetId,
      amount,
      recipient: routerAddress,
    });

    // Check liquidity
    const liquidity = await transactionManager.routerBalances(await router.getAddress(), assetId);
    expect(liquidity).to.be.eq(expectedLiquidity);

    // Check balance
    const finalBalance = await getOnchainBalance(assetId, await router.getAddress(), ethers.provider);
    expect(finalBalance).to.be.eq(
      assetId !== AddressZero ? expectedBalance : expectedBalance.sub(receipt.cumulativeGasUsed.mul(tx.gasPrice)),
    );
  };

  it("should deploy", async () => {
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
      await approveTokens(amount, router);
      await addAndAssertLiquidity(amount, assetId, router);
    });

    it("happy case: addLiquity Native/Ether token", async () => {
      const amount = "1";
      const assetId = AddressZero;
      await addAndAssertLiquidity(amount, assetId, router);
    });
  });

  describe("#removeLiquidity", () => {
    // TODO: revert and emit event test cases
    it("happy case: removeLiquidity Native/Ether token", async () => {
      const amount = "1";
      const assetId = AddressZero;

      await addAndAssertLiquidity(amount, assetId, router);

      await removeAndAssertLiquidity(amount, assetId, router);
    });

    it("happy case: addLiquity ERC20", async () => {
      const amount = "1";
      const assetId = tokenA.address;
      await approveTokens(amount, router);
      await addAndAssertLiquidity(amount, assetId, router);

      await removeAndAssertLiquidity(amount, assetId, router);
    });
  });

  describe("#prepare", () => {
    // TODO: revert and emit event test cases
    it("happy case: prepare by Bob for ERC20", async () => {
      const prepareAmount = "10";
      const transaction = await getTransactionData({
        sendingAssetId: tokenA.address,
        receivingAssetId: tokenB.address,
        amount: prepareAmount,
      });

      const bobApproveTx = await tokenA.connect(user).approve(transactionManager.address, prepareAmount);
      console.log(bobApproveTx);

      const prepareTx = await transactionManager.connect(user).prepare(transaction);
      console.log(prepareTx);
    });

    it("happy case: prepare by Bob for Ether/Native token", async () => {
      const prepareAmount = "10";
      const transaction = await getTransactionData({
        amount: prepareAmount,
      });

      const prepareTx = await transactionManager.connect(user).prepare(transaction, { value: prepareAmount });
      console.log(prepareTx);
    });

    it("happy case: prepare by Router for ERC20", async () => {
      const amount = "100";
      const assetId = tokenB.address;

      console.log(amount, assetId);
      const approveTx = await tokenB.connect(router).approve(transactionManagerReceiverSide.address, amount);
      console.log(approveTx);

      const addLiquidityTx = await transactionManagerReceiverSide.connect(router).addLiquidity(amount, assetId);
      console.log(addLiquidityTx);

      const routerPrepareAmount = "10";
      const transaction = await getTransactionData({
        sendingAssetId: tokenA.address,
        receivingAssetId: tokenB.address,
        amount: routerPrepareAmount,
      });

      const routerApproveTx = await tokenA
        .connect(router)
        .approve(transactionManagerReceiverSide.address, routerPrepareAmount);
      console.log(routerApproveTx);

      const prepareTx = await transactionManagerReceiverSide.connect(router).prepare(transaction);
      console.log(prepareTx);
    });

    it("happy case: prepare by Router for Ether/Native token", async () => {
      const amount = "100";
      const assetId = AddressZero;

      console.log(amount, assetId);
      const addLiquidityTx = await transactionManagerReceiverSide
        .connect(router)
        .addLiquidity(amount, assetId, { value: amount });
      console.log(addLiquidityTx);

      const routerPrepareAmount = "10";
      const transaction = await getTransactionData({
        sendingAssetId: AddressZero,
        receivingAssetId: AddressZero,
        amount: routerPrepareAmount,
      });

      const prepareTx = await transactionManagerReceiverSide
        .connect(router)
        .prepare(transaction, { value: routerPrepareAmount });
      console.log(prepareTx);
    });
  });

  describe("#fulfill", () => {
    // TODO: revert and emit event test cases
    it.skip("should do something right", async () => {});

    it("happy case: fulfill sender-side", async () => {
      const prepareAmount = "10";
      const transaction = await getTransactionData({
        amount: prepareAmount,
      });

      const prepareTx = await transactionManager.connect(user).prepare(transaction, { value: prepareAmount });
      console.log(prepareTx);

      const digest = keccak256(encodeTxData(transaction));
      console.log(digest);
    });
  });

  describe("#cancel", () => {
    it.skip("should do something right", async () => {});
  });
});
