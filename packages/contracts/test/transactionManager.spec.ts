import { ethers, waffle } from "hardhat";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
import {
  InvariantTransactionData,
  signCancelTransactionPayload,
  signFulfillTransactionPayload,
} from "@connext/nxtp-utils";
use(solidity);

import { hexlify, randomBytes } from "ethers/lib/utils";
import { Wallet, BigNumber, BigNumberish, constants, Contract, ContractReceipt } from "ethers";

// import types
import { TransactionManager } from "../typechain/TransactionManager";
import { TestERC20 } from "../typechain/TestERC20";
import { ERC20 } from "../typechain/ERC20";

import { getOnchainBalance } from "./utils";

const { AddressZero } = constants;

type VariantTransactionData = {
  amount: string;
  blockNumber: BigNumberish;
  expiry: string;
};

const createFixtureLoader = waffle.createFixtureLoader;
describe("TransactionManager", function () {
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

  beforeEach(async function () {
    ({ transactionManager, transactionManagerReceiverSide, tokenA, tokenB } = await loadFixture(fixture));

    const liq = "10000";
    let tx = await tokenA.connect(wallet).transfer(router.address, liq);
    await tx.wait();
    tx = await tokenB.connect(wallet).transfer(router.address, liq);
    await tx.wait();

    const prepareFunds = "10000";
    tx = await tokenA.connect(wallet).transfer(user.address, prepareFunds);
    await tx.wait();
    tx = await tokenB.connect(wallet).transfer(user.address, prepareFunds);
    await tx.wait();
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

    const day = 24 * 60 * 60;
    const record = {
      amount: "10",
      expiry: (Math.floor(Date.now() / 1000) + day + 5_000).toString(),
      blockNumber: "10",
      ...recordOverrides,
    };

    return { transaction, record };
  };

  const approveTokens = async (amount: BigNumberish, approver: Wallet, spender: string, token: ERC20 = tokenA) => {
    const approveTx = await token.connect(approver).approve(spender, amount);
    await approveTx.wait();
    const allowance = await token.allowance(approver.address, spender);
    expect(allowance).to.be.at.least(amount);
  };

  const assertObject = (expected: any, returned: any) => {
    const keys = Object.keys(expected);
    keys.map((k) => {
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
    const idx = receipt.events?.findIndex((e) => e.event === eventName) ?? -1;
    expect(idx).to.not.be.eq(-1);
    const decoded = receipt.events![idx].decode!(receipt.events![idx].data, receipt.events![idx].topics);
    assertObject(expected, decoded);
  };

  const addAndAssertLiquidity = async (
    amount: BigNumberish,
    assetId: string = AddressZero,
    _router: Wallet = router,
    instance: Contract = transactionManagerReceiverSide,
  ) => {
    // Get starting + expected  balance
    const routerAddr = router.address;
    const startingBalance = await getOnchainBalance(assetId, routerAddr, ethers.provider);
    const expectedBalance = startingBalance.sub(amount);

    const startingLiquidity = await instance.routerBalances(routerAddr, assetId);
    const expectedLiquidity = startingLiquidity.add(amount);

    const tx = await instance
      .connect(_router)
      .addLiquidity(amount, assetId, assetId === AddressZero ? { value: BigNumber.from(amount) } : {});

    const receipt = await tx.wait();
    // const [receipt, payload] = await Promise.all([tx.wait(), event]);
    // expect(payload).to.be.ok;

    // Verify receipt + attached events
    expect(receipt.status).to.be.eq(1);
    await assertReceiptEvent(receipt, "LiquidityAdded", { router: routerAddr, assetId, amount });

    // Check liquidity
    const liquidity = await instance.routerBalances(routerAddr, assetId);
    expect(liquidity).to.be.eq(expectedLiquidity);

    // Check balances
    const balance = await getOnchainBalance(assetId, routerAddr, ethers.provider);
    expect(balance).to.be.eq(expectedBalance.sub(assetId === AddressZero ? tx.gasPrice.mul(receipt.gasUsed) : 0));
  };

  const removeAndAssertLiquidity = async (
    amount: BigNumberish,
    assetId: string = AddressZero,
    _router?: Wallet,
    instance: Contract = transactionManagerReceiverSide,
  ) => {
    const router = _router ?? instance.signer;

    // Get starting + expected  balance
    const startingBalance = await getOnchainBalance(assetId, await router.getAddress(), ethers.provider);
    const expectedBalance = startingBalance.add(amount);

    const startingLiquidity = await instance.routerBalances(await router.getAddress(), assetId);
    const expectedLiquidity = startingLiquidity.sub(amount);

    // TODO: debug event emission wtf
    // const event = new Promise(resolve => {
    //   transactionManager.once("LiquidityRemoved", data => resolve(data));
    // });
    const tx = await instance.connect(router).removeLiquidity(amount, assetId, await router.getAddress());

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
    const liquidity = await instance.routerBalances(await router.getAddress(), assetId);
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
    instance: Contract = transactionManager,
  ): Promise<ContractReceipt> => {
    const { transaction, record } = await getTransactionData(txOverrides, recordOverrides);

    // Check if its the user
    const userSending = preparer.address === transaction.user;

    // Get initial balances
    const initialContractAmount = await getOnchainBalance(
      userSending ? transaction.sendingAssetId : transaction.receivingAssetId,
      instance.address,
      ethers.provider,
    );
    const initialPreparerAmount = userSending
      ? await getOnchainBalance(transaction.sendingAssetId, preparer.address, ethers.provider)
      : await instance.routerBalances(preparer.address, transaction.receivingAssetId);

    // Send tx
    const prepareTx = await instance
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
      txData: { ...transaction, amount: record.amount, expiry: record.expiry, blockNumber: receipt.blockNumber },
      caller: preparer.address,
      bidSignature: "0x",
      encodedBid: "0x",
    });

    // Verify amount has been deducted from preparer
    const finalPreparerAmount = userSending
      ? await getOnchainBalance(transaction.sendingAssetId, await user.getAddress(), ethers.provider)
      : await instance.routerBalances(preparer.address, transaction.receivingAssetId);
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
      return receipt;
    }
    const finalContractAmount = await getOnchainBalance(transaction.sendingAssetId, instance.address, ethers.provider);
    expect(finalContractAmount).to.be.eq(initialContractAmount.add(record.amount));

    return receipt;
  };

  const fulfillAndAssert = async (
    transaction: InvariantTransactionData,
    record: VariantTransactionData,
    relayerFee: string,
    fulfillingForSender: boolean,
    submitter: Wallet,
    instance: TransactionManager,
  ) => {
    // Get pre-fulfull balance. If fulfilling on sender side, router
    // liquidity of sender asset will increase. If fulfilling on receiving
    // side, user balance of receiving asset will increase + relayer paid
    const initialIncrease = fulfillingForSender
      ? await getOnchainBalance(transaction.receivingAssetId, transaction.receivingAddress, ethers.provider)
      : await instance.routerBalances(router.address, transaction.sendingAssetId);
    const expectedIncrease = initialIncrease.add(record.amount).sub(fulfillingForSender ? relayerFee : 0);

    // Check for relayer balances
    const initialRelayer = await getOnchainBalance(transaction.receivingAssetId, submitter.address, ethers.provider);

    // Check for values that remain flat
    const initialFlat = fulfillingForSender
      ? await instance.routerBalances(router.address, transaction.receivingAssetId)
      : await getOnchainBalance(transaction.sendingAssetId, user.address, ethers.provider);

    // Generate signature from user
    const signature = await signFulfillTransactionPayload(transaction, relayerFee, user);

    // Send tx
    const tx = await instance
      .connect(submitter)
      .fulfill(
        { ...transaction, amount: record.amount, expiry: record.expiry, blockNumber: record.blockNumber },
        relayerFee,
        signature,
      );
    const receipt = await tx.wait();
    expect(receipt.status).to.be.eq(1);

    // Assert event
    await assertReceiptEvent(receipt, "TransactionFulfilled", {
      txData: { ...transaction, amount: record.amount, expiry: record.expiry, blockNumber: record.blockNumber },
      relayerFee,
      signature,
      caller: submitter.address,
    });

    // Verify final balances
    const finalIncreased = fulfillingForSender
      ? await getOnchainBalance(transaction.receivingAssetId, transaction.receivingAddress, ethers.provider)
      : await instance.routerBalances(router.address, transaction.sendingAssetId);

    const finalFlat = fulfillingForSender
      ? await instance.routerBalances(router.address, transaction.receivingAssetId)
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

  const cancelAndAssert = async (
    transaction: InvariantTransactionData,
    record: VariantTransactionData,
    canceller: Wallet,
    instance: Contract,
  ): Promise<void> => {
    const sendingSideCancel = (await instance.chainId()).toNumber() === transaction.sendingChainId;

    const startingBalance = !sendingSideCancel
      ? await instance.routerBalances(transaction.router, transaction.receivingAssetId)
      : await getOnchainBalance(transaction.sendingAssetId, transaction.user, ethers.provider);
    const expectedBalance = startingBalance.add(record.amount);

    const signature = await signCancelTransactionPayload(transaction, user);
    const tx = await transactionManagerReceiverSide
      .connect(canceller)
      .cancel(
        { ...transaction, amount: record.amount, expiry: record.expiry, blockNumber: record.blockNumber },
        signature,
      );
    const receipt = await tx.wait();
    await assertReceiptEvent(receipt, "TransactionCancelled", {
      txData: { ...transaction, ...record },
      caller: canceller.address,
    });

    const balance = !sendingSideCancel
      ? await instance.routerBalances(transaction.router, transaction.receivingAssetId)
      : await getOnchainBalance(transaction.sendingAssetId, transaction.user, ethers.provider);
    expect(balance).to.be.eq(expectedBalance);
  };

  it("should deploy", async () => {
    expect(transactionManager.address).to.be.a("string");
  });

  it("constructor initialize", async () => {
    expect(await transactionManager.chainId()).to.eq(1337);
    expect(await transactionManager.iMultisend()).to.eq(AddressZero);
  });

  describe("#routerBalances", () => {
    // TODO: revert and emit event test cases
    it.skip("should return null if router address doesn't have funds", async () => {});
    it.skip("should return null if router address for respective address doesn't have funds", async () => {});
    it.skip("should return null if router address for respective address doesn't have funds", async () => {});
  });

  describe("#activeTransactionBlocks", () => {
    // TODO: revert and emit event test cases
    it.skip("should return activeTransactionBlocks if user creates prepare", async () => {});
  });

  describe("#transactionStatus", () => {
    it.skip("should return status empty", async () => {});
    it.skip("should return status pending", async () => {});
    it.skip("should return status completed", async () => {});
  });

  describe("#transactionStatus", () => {
    it.skip("should return status empty", async () => {});
    it.skip("should return status pending", async () => {});
    it.skip("should return status completed", async () => {});
  });

  describe("#addLiquidity", () => {
    // TODO: reentrant cases
    it("should error if value is not present for Ether/Native token", async () => {
      // addLiquidity: VALUE_MISMATCH
      const amount = "1";
      const assetId = AddressZero;

      await expect(transactionManager.connect(router).addLiquidity(amount, assetId)).to.be.revertedWith(
        "addLiquidity: VALUE_MISMATCH",
      );
      expect(await transactionManager.routerBalances(router.address, assetId)).to.eq(BigNumber.from(0));
    });

    it("should error if value is not equal to amount param for Ether/Native token", async () => {
      // addLiquidity: VALUE_MISMATCH
      const amount = "1";
      const falseValue = "2";
      const assetId = AddressZero;

      await expect(
        transactionManager.connect(router).addLiquidity(amount, assetId, { value: falseValue }),
      ).to.be.revertedWith("addLiquidity: VALUE_MISMATCH");
      expect(await transactionManager.routerBalances(router.address, assetId)).to.eq(BigNumber.from(0));
    });

    it("should error if value is non-zero for ERC20 token", async () => {
      // addLiquidity: ETH_WITH_ERC_TRANSFER;
      const amount = "1";
      const assetId = tokenA.address;
      await expect(
        transactionManager.connect(router).addLiquidity(amount, assetId, { value: amount }),
      ).to.be.revertedWith("addLiquidity: ETH_WITH_ERC_TRANSFER");
      expect(await transactionManager.routerBalances(router.address, assetId)).to.eq(BigNumber.from(0));
    });

    it("should error if transaction manager isn't approve for respective amount if ERC20", async () => {
      const amount = "1";
      const assetId = tokenA.address;
      await expect(transactionManager.connect(router).addLiquidity(amount, assetId)).to.be.revertedWith(
        "ERC20: transfer amount exceeds allowance",
      );
      expect(await transactionManager.routerBalances(router.address, assetId)).to.eq(BigNumber.from(0));
    });

    it("happy case: addLiquity Native/Ether token", async () => {
      const amount = "1";
      const assetId = AddressZero;
      await addAndAssertLiquidity(amount, assetId);
    });

    it("happy case: addLiquity ERC20", async () => {
      const amount = "1";
      const assetId = tokenA.address;
      await approveTokens(amount, router, transactionManagerReceiverSide.address, tokenA);
      await addAndAssertLiquidity(amount, assetId);
    });
  });

  describe("#removeLiquidity", () => {
    // TODO: reentrant cases
    it("should error if router Balance is lower than amount", async () => {
      const amount = "1";
      const assetId = AddressZero;

      await expect(
        transactionManager.connect(router).removeLiquidity(amount, assetId, router.address),
      ).to.be.revertedWith("removeLiquidity: INSUFFICIENT_FUNDS");
    });

    it.skip("should error if transfer fails", async () => {});

    it("happy case: removeLiquidity Native/Ether token", async () => {
      const amount = "1";
      const assetId = AddressZero;

      await addAndAssertLiquidity(amount, assetId);

      await removeAndAssertLiquidity(amount, assetId, router);
    });

    it("happy case: removeLiquidity ERC20", async () => {
      const amount = "1";
      const assetId = tokenA.address;
      await approveTokens(amount, router, transactionManagerReceiverSide.address);
      await addAndAssertLiquidity(amount, assetId);

      await removeAndAssertLiquidity(amount, assetId, router);
    });
  });

  describe("#prepare", () => {
    // TODO: revert and emit event test cases
    // reentrant cases
    it("should revert if expiry is lower than min_timeout", async () => {
      const { transaction, record } = await getTransactionData();
      const hours12 = 12 * 60 * 60;
      const expiry = (Math.floor(Date.now() / 1000) + hours12 + 5_000).toString();
      await expect(
        transactionManager
          .connect(user)
          .prepare(transaction, record.amount, expiry, "0x", "0x", { value: record.amount }),
      ).to.be.revertedWith("prepare: TIMEOUT_TOO_LOW");
    });

    it("should revert if param sending and receiving chainId are same", async () => {
      const { transaction, record } = await getTransactionData({ sendingChainId: 1337, receivingChainId: 1337 });
      await expect(
        transactionManager
          .connect(user)
          .prepare(transaction, record.amount, record.expiry, "0x", "0x", { value: record.amount }),
      ).to.be.revertedWith("prepare: SAME_CHAINIDS");
    });

    it("should revert if param sending or receiving chainId doesn't match chainId variable", async () => {});

    it.skip("should revert if params receiving address is addressZero", async () => {});
    it.skip("should revert if digest already exist", async () => {});
    it.skip("should revert if value is not present for Ether/Native token", async () => {});
    it.skip("should revert if value is not equal to amount param for Ether/Native token", async () => {});
    it.skip("should revert if value is non-zero for ERC20 token", async () => {});
    it.skip("should revert if transaction manager isn't approve for respective amount", async () => {});

    it.skip("should revert iff senderChainId not equal to chainId and sender is diff from router", async () => {});
    it.skip("should revert iff senderChainId not equal to chainId and router liquidity is lower than amount", async () => {});
    it.skip("should revert iff senderChainId not equal to chainId and msg.value is non-zero", async () => {});

    it("happy case: prepare by Bob for ERC20", async () => {
      const prepareAmount = "10";
      const assetId = tokenA.address;

      await approveTokens(prepareAmount, user, transactionManager.address);

      await prepareAndAssert(
        {
          sendingAssetId: assetId,
          receivingAssetId: tokenB.address,
        },
        {
          amount: prepareAmount,
        },
        user,
        transactionManager,
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

      await approveTokens(prepareAmount, router, transactionManager.address, tokenA);
      await addAndAssertLiquidity(prepareAmount, assetId, router, transactionManager);

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

      await addAndAssertLiquidity(prepareAmount, assetId, router, transactionManagerReceiverSide);

      await prepareAndAssert(
        {
          sendingAssetId: assetId,
          receivingAssetId: assetId,
          sendingChainId: 1337,
          receivingChainId: 1338,
        },
        { amount: prepareAmount },
        router,
        transactionManagerReceiverSide,
      );
    });
  });

  describe("#fulfill", () => {
    // TODO: revert and emit event test cases
    // reentrant cases
    it.skip("should revert if transactionStatus for respective digest isn't pending", async () => {});
    it.skip("should revert if expiry of transaction is behind current blockstamp", async () => {});
    it.skip("should revert if param user didn't sign the signature", async () => {});
    it.skip("should revert if relayer fee is higher than amount", async () => {});

    it.skip("should revert iff it's receiving chain and relayer fee is non zero and transfer failed", async () => {});
    it.skip("should revert iff it's receiving chain and calldata is non zero bytes and transfer failed", async () => {});
    it.skip("should revert iff it's receiving chain and calldata is zero bytes and MultisendInterpreter failed", async () => {});
    it.skip("should revert iff it's receiving chain and calldata is zero bytes and Interpreter isn't approved for respective amount when asset ERC20", async () => {});

    it("happy case: router fulfills in native asset", async () => {
      const prepareAmount = "100";
      const assetId = AddressZero;
      const relayerFee = "10";

      // Add receiving liquidity
      await addAndAssertLiquidity(prepareAmount, assetId, router, transactionManagerReceiverSide);

      const { transaction, record } = await getTransactionData(
        {
          sendingAssetId: assetId,
          receivingAssetId: assetId,
        },
        { amount: prepareAmount },
      );

      // User prepares
      await approveTokens(prepareAmount, user, transactionManagerReceiverSide.address, tokenB);
      const { blockNumber } = await prepareAndAssert(transaction, record, user);

      // Router fulfills
      await fulfillAndAssert(
        transaction,
        { ...record, blockNumber: blockNumber.toString() },
        relayerFee,
        false,
        router,
        transactionManager,
      );
    });

    it("happy case: router fulfills in ERC20", async () => {
      const prepareAmount = "100";
      const assetId = tokenA.address;
      const relayerFee = "10";

      // Add receiving liquidity
      await approveTokens(prepareAmount, router, transactionManagerReceiverSide.address, tokenA);
      await addAndAssertLiquidity(prepareAmount, assetId, router, transactionManagerReceiverSide);

      const { transaction, record } = await getTransactionData(
        {
          sendingAssetId: AddressZero,
          receivingAssetId: assetId,
        },
        { amount: prepareAmount },
      );

      // User prepares
      await approveTokens(prepareAmount, user, transactionManagerReceiverSide.address, tokenB);
      const { blockNumber } = await prepareAndAssert(transaction, record, user);

      // Router fulfills
      await fulfillAndAssert(
        transaction,
        { ...record, blockNumber: blockNumber.toString() },
        relayerFee,
        false,
        router,
        transactionManager,
      );
    });

    it("happy case: user fulfills in native asset", async () => {
      const prepareAmount = "100";
      const assetId = AddressZero;
      const relayerFee = "10";

      // Add receiving liquidity
      await addAndAssertLiquidity(prepareAmount, assetId, router, transactionManagerReceiverSide);

      const { transaction, record } = await getTransactionData(
        {
          sendingChainId: (await transactionManager.chainId()).toNumber(),
          receivingChainId: (await transactionManagerReceiverSide.chainId()).toNumber(),
          sendingAssetId: assetId,
          receivingAssetId: assetId,
        },
        { amount: prepareAmount },
      );

      // Router prepares
      const { blockNumber } = await prepareAndAssert(transaction, record, router, transactionManagerReceiverSide);

      // User fulfills
      await fulfillAndAssert(
        transaction,
        { ...record, blockNumber: blockNumber.toString() },
        relayerFee,
        true,
        user,
        transactionManagerReceiverSide,
      );
    });

    it("happy case: user fulfills in ERC20", async () => {
      const prepareAmount = "100";
      const assetId = tokenA.address;
      const relayerFee = "10";

      // Add receiving liquidity
      await approveTokens(prepareAmount, router, transactionManagerReceiverSide.address, tokenA);
      await addAndAssertLiquidity(prepareAmount, assetId);

      const { transaction, record } = await getTransactionData(
        {
          sendingChainId: (await transactionManager.chainId()).toNumber(),
          receivingChainId: (await transactionManagerReceiverSide.chainId()).toNumber(),
          sendingAssetId: tokenB.address,
          receivingAssetId: assetId,
        },
        { amount: prepareAmount },
      );

      // Router prepares
      const { blockNumber } = await prepareAndAssert(transaction, record, router, transactionManagerReceiverSide);

      // User fulfills
      await fulfillAndAssert(
        transaction,
        { ...record, blockNumber: blockNumber.toString() },
        relayerFee,
        true,
        user,
        transactionManagerReceiverSide,
      );
    });
  });

  describe("#cancel", () => {
    it("happy case: user cancels ETH before expiry", async () => {
      const prepareAmount = "10";
      const ms = Date.now() - 10_000;
      const expiry = Math.floor(ms / 100);
      const assetId = AddressZero;

      // Add receiving liquidity
      await addAndAssertLiquidity(prepareAmount, assetId, router, transactionManagerReceiverSide);

      const { transaction, record } = await getTransactionData(
        {
          sendingChainId: (await transactionManager.chainId()).toNumber(),
          receivingChainId: (await transactionManagerReceiverSide.chainId()).toNumber(),
          sendingAssetId: assetId,
          receivingAssetId: assetId,
        },
        { amount: prepareAmount, expiry: expiry.toString() },
      );

      const { blockNumber } = await prepareAndAssert(transaction, record, router, transactionManagerReceiverSide);

      await cancelAndAssert(
        transaction,
        { ...record, blockNumber: blockNumber.toString() },
        receiver, // To avoid balance checks for eth
        transactionManagerReceiverSide,
      );
    });

    it.skip("happy case: user cancels ERC20 before expiry", async () => {});
    it.skip("happy case: router cancels ETH before expiry", async () => {});
    it.skip("happy case: router cancels ERC20 before expiry", async () => {});
    it.skip("happy case: user cancels ETH after expiry", async () => {});
    it.skip("happy case: user cancels ERC20 after expiry", async () => {});
    it.skip("happy case: router cancels ETH after expiry", async () => {});
    it.skip("happy case: router cancels ERC20 after expiry", async () => {});
  });
});
