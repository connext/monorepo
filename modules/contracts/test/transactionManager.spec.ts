import { ethers, waffle } from "hardhat";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
import { InvariantTransactionData, signFulfillTransactionPayload, VariantTransactionData } from "@connext/nxtp-utils";
use(solidity);

import { hexlify, randomBytes } from "ethers/lib/utils";
import { Wallet, BigNumber, BigNumberish, constants, Contract, ContractReceipt } from "ethers";

// import types
import { TransactionManager } from "../typechain/TransactionManager";
import { TestERC20 } from "../typechain/TestERC20";

import { getOnchainBalance } from "./utils";

const { AddressZero } = constants;

const createFixtureLoader = waffle.createFixtureLoader;
describe("TransactionManager", function() {
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
    tokenA = (await testERC20Factory.deploy()) as TestERC20;
    tokenB = (await testERC20Factory.deploy()) as TestERC20;

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

  const getTransactionData = async (
    txOverrides: Partial<InvariantTransactionData> = {},
    recordOverrides: Partial<VariantTransactionData> = {},
  ): Promise<{ transaction: InvariantTransactionData; record: VariantTransactionData }> => {
    const transaction = {
      user: user.address,
      router: router.address,
      sendingAssetId: AddressZero,
      receivingAssetId: AddressZero,
      receivingAddress: receiver.address,
      callData: "0x",
      transactionId: hexlify(randomBytes(32)),
      sendingChainId: 1337,
      receivingChainId: 1338,
      ...txOverrides,
    };

    const record = {
      amount: "10",
      expiry: (Math.floor(Date.now() / 1000) + 5_000).toString(),
      blockNumber: "10",
      ...recordOverrides,
    };

    return { transaction, record };
  };

  const approveTokens = async (amount: BigNumberish, approver: Wallet, token: Contract = tokenA) => {
    const approveTx = await token.connect(approver).approve(transactionManager.address, amount);
    await approveTx.wait();
  };

  const assertObject = (expected: any, returned: any) => {
    const keys = Object.keys(expected);
    keys.map(k => {
      if (typeof expected[k] === "object" && !BigNumber.isBigNumber(expected[k])) {
        expect(typeof returned[k] === "object");
        assertObject(expected[k], returned[k]);
      } else {
        expect(returned[k]).to.be.deep.eq((expected as any)[k]);
      }
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
      assetId !== AddressZero ? expectedBalance : expectedBalance.sub(receipt.cumulativeGasUsed!.mul(tx.gasPrice!)),
    );
  };

  const prepareAndAssert = async (
    txOverrides: Partial<InvariantTransactionData>,
    recordOverrides: Partial<VariantTransactionData> = {},
    preparer: Wallet = user,
  ) => {
    const { transaction, record } = await getTransactionData(txOverrides, recordOverrides);

    // Check if its the user
    const userSending = preparer.address === transaction.user;

    // Get initial balances
    const initialContractAmount = await getOnchainBalance(
      userSending ? transaction.sendingAssetId : transaction.receivingAssetId,
      transactionManager.address,
      ethers.provider,
    );
    const initialPreparerAmount = userSending
      ? await getOnchainBalance(transaction.sendingAssetId, preparer.address, ethers.provider)
      : await transactionManager.routerBalances(preparer.address, transaction.receivingAssetId);

    // Send tx
    const prepareTx = await transactionManager
      .connect(preparer)
      .prepare(
        transaction,
        record.amount,
        record.expiry,
        "0x",
        "0x",
        transaction.sendingAssetId === AddressZero && userSending ? { value: record.amount } : {},
      );
    const receipt = await prepareTx.wait();
    expect(receipt.status).to.be.eq(1);

    // Verify receipt event
    await assertReceiptEvent(receipt, "TransactionPrepared", {
      txData: transaction,
      amount: record.amount,
      expiry: record.expiry,
      blockNumber: receipt.blockNumber,
      caller: preparer.address,
      bidSignature: "0x",
      encodedBid: "0x",
    });

    // Verify amount has been deducted from preparer
    const finalPreparerAmount = userSending
      ? await getOnchainBalance(transaction.sendingAssetId, await user.getAddress(), ethers.provider)
      : await transactionManager.routerBalances(preparer.address, transaction.receivingAssetId);
    const expected = initialPreparerAmount.sub(record.amount);
    expect(finalPreparerAmount).to.be.eq(
      transaction.sendingAssetId === AddressZero && userSending
        ? expected.sub(prepareTx.gasPrice!.mul(receipt.cumulativeGasUsed!))
        : expected,
    );

    // TODO: add `getTransactionsByUser` assertion

    // Verify amount has been added to contract
    if (!userSending) {
      // Router does not send funds
      return;
    }
    const finalContractAmount = await getOnchainBalance(
      transaction.sendingAssetId,
      transactionManager.address,
      ethers.provider,
    );
    expect(finalContractAmount).to.be.eq(initialContractAmount.add(record.amount));
  };

  const fulfillAndAssert = async (
    transaction: InvariantTransactionData,
    record: VariantTransactionData,
    relayerFee: string,
    fulfillingForSender: boolean,
    submitter: Wallet,
  ) => {
    // Get pre-fulfull balance. If fulfilling on sender side, router
    // liquidity of sender asset will increase. If fulfilling on receiving
    // side, user balance of receiving asset will increase + relayer paid
    const initialIncrease = fulfillingForSender
      ? await getOnchainBalance(transaction.receivingAssetId, transaction.receivingAddress, ethers.provider)
      : await transactionManager.routerBalances(router.address, transaction.sendingAssetId);
    const expectedIncrease = initialIncrease.add(record.amount).sub(fulfillingForSender ? relayerFee : 0);

    // Check for relayer balances
    const initialRelayer = await getOnchainBalance(transaction.receivingAssetId, submitter.address, ethers.provider);

    // Check for values that remain flat
    const initialFlat = fulfillingForSender
      ? await transactionManager.routerBalances(router.address, transaction.receivingAssetId)
      : await getOnchainBalance(transaction.sendingAssetId, user.address, ethers.provider);

    // Generate signature from user
    const signature = await signFulfillTransactionPayload(transaction, relayerFee, user);

    // Send tx
    const tx = await transactionManager.connect(submitter).fulfill(transaction, relayerFee, signature);
    const receipt = await tx.wait();
    expect(receipt.status).to.be.eq(1);

    // Assert event
    await assertReceiptEvent(receipt, "TransactionFulfilled", {
      txData: transaction,
      relayerFee,
      signature,
      caller: submitter.address,
    });

    // Verify final balances
    const finalIncreased = fulfillingForSender
      ? await getOnchainBalance(transaction.receivingAssetId, transaction.receivingAddress, ethers.provider)
      : await transactionManager.routerBalances(router.address, transaction.sendingAssetId);

    const finalFlat = fulfillingForSender
      ? await transactionManager.routerBalances(router.address, transaction.receivingAssetId)
      : await getOnchainBalance(transaction.sendingAssetId, user.address, ethers.provider);

    // Assert relayer fee if needed
    if (fulfillingForSender && submitter.address !== user.address) {
      // Assert relayer got fees
      const expectedRelayer = initialRelayer.add(relayerFee);
      const finalRelayer = await getOnchainBalance(transaction.receivingAssetId, submitter.address, ethers.provider);
      expect(finalRelayer).to.be.eq(
        transaction.receivingAssetId === AddressZero
          ? expectedRelayer.sub(tx.gasPrice!.mul(receipt.gasUsed!))
          : expectedRelayer,
      );
    }

    const gas = tx.gasPrice!.mul(receipt.gasUsed!).toString();

    expect(finalIncreased).to.be.eq(
      !fulfillingForSender ||
        user.address !== submitter.address ||
        transaction.receivingAssetId !== AddressZero ||
        user.address !== transaction.receivingAddress
        ? expectedIncrease
        : expectedIncrease.add(relayerFee).sub(gas),
    );
    expect(finalFlat).to.be.eq(initialFlat);
  };

  it("should deploy", async () => {
    expect(transactionManager.address).to.be.a("string");
  });

  it("constructor initialize", async () => {
    expect(await transactionManager.chainId()).to.eq(1337);
    expect(await transactionManager.multisend()).to.eq(AddressZero);
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
      const assetId = tokenA.address;

      await approveTokens(prepareAmount, user);

      await prepareAndAssert(
        {
          sendingAssetId: assetId,
          receivingAssetId: tokenB.address,
        },
        {
          amount: prepareAmount,
        },
      );
    });

    it("happy case: prepare by Bob for Ether/Native token", async () => {
      const prepareAmount = "10";

      await prepareAndAssert(
        {
          sendingAssetId: AddressZero,
          receivingAssetId: tokenB.address,
        },
        {
          amount: prepareAmount,
        },
      );
    });

    it("happy case: prepare by Router for ERC20", async () => {
      const prepareAmount = "100";
      const assetId = tokenA.address;

      await approveTokens(prepareAmount, router, tokenA);
      await addAndAssertLiquidity(prepareAmount, assetId, router);

      await prepareAndAssert(
        {
          sendingAssetId: tokenB.address,
          receivingAssetId: assetId,
          sendingChainId: 1338,
          receivingChainId: 1337,
        },
        { amount: prepareAmount },
        router,
      );
    });

    it("happy case: prepare by Router for Ether/Native token", async () => {
      const prepareAmount = "100";
      const assetId = AddressZero;

      await addAndAssertLiquidity(prepareAmount, assetId, router);

      await prepareAndAssert(
        {
          sendingAssetId: tokenB.address,
          receivingAssetId: assetId,
          sendingChainId: 1338,
          receivingChainId: 1337,
        },
        { amount: prepareAmount },
        router,
      );
    });
  });

  describe("#fulfill", () => {
    // TODO: revert and emit event test cases
    it("happy case: router fulfills in native asset", async () => {
      const prepareAmount = "100";
      const assetId = AddressZero;
      const relayerFee = "10";

      // Add receiving liquidity
      await addAndAssertLiquidity(prepareAmount, assetId, router);

      const { transaction, record } = await getTransactionData(
        {
          sendingAssetId: tokenB.address,
          receivingAssetId: assetId,
        },
        { amount: prepareAmount },
      );

      // User prepares
      await approveTokens(prepareAmount, user, tokenB);
      await prepareAndAssert(transaction, record, user);

      // Router fulfills
      await fulfillAndAssert(transaction, record, relayerFee, false, router);
    });

    it("happy case: router fulfills in ERC20", async () => {
      const prepareAmount = "100";
      const assetId = tokenA.address;
      const relayerFee = "10";

      // Add receiving liquidity
      await approveTokens(prepareAmount, router, tokenA);
      await addAndAssertLiquidity(prepareAmount, assetId, router);

      const { transaction, record } = await getTransactionData(
        {
          sendingAssetId: tokenB.address,
          receivingAssetId: assetId,
        },
        { amount: prepareAmount },
      );

      // User prepares
      await approveTokens(prepareAmount, user, tokenB);
      await prepareAndAssert(transaction, record, user);

      // Router fulfills
      await fulfillAndAssert(transaction, record, relayerFee, false, router);
    });

    it("happy case: user fulfills in native asset", async () => {
      const prepareAmount = "100";
      const assetId = AddressZero;
      const relayerFee = "10";

      // Add receiving liquidity
      await addAndAssertLiquidity(prepareAmount, assetId, router);

      const { transaction, record } = await getTransactionData(
        {
          sendingChainId: 1338,
          receivingChainId: 1337,
          sendingAssetId: tokenB.address,
          receivingAssetId: assetId,
        },
        { amount: prepareAmount },
      );

      // Router prepares
      await prepareAndAssert(transaction, record, router);

      // User fulfills
      await fulfillAndAssert(transaction, record, relayerFee, true, user);
    });

    it("happy case: user fulfills in ERC20", async () => {
      const prepareAmount = "100";
      const assetId = tokenA.address;
      const relayerFee = "10";

      // Add receiving liquidity
      await approveTokens(prepareAmount, router, tokenA);
      await addAndAssertLiquidity(prepareAmount, assetId, router);

      const { transaction, record } = await getTransactionData(
        {
          sendingChainId: 1338,
          receivingChainId: 1337,
          sendingAssetId: tokenB.address,
          receivingAssetId: assetId,
        },
        { amount: prepareAmount },
      );

      // Router prepares
      await prepareAndAssert(transaction, record, router);

      // User fulfills
      await fulfillAndAssert(transaction, record, relayerFee, true, user);
    });
  });

  describe("#cancel", () => {
    it.skip("should do something right", async () => {});
  });
});
