import { ethers, waffle } from "hardhat";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
import {
  InvariantTransactionData,
  signCancelTransactionPayload,
  signFulfillTransactionPayload,
  VariantTransactionData,
  getInvariantTransactionDigest,
  getVariantTransactionDigest,
} from "@connext/nxtp-utils";
use(solidity);

import { hexlify, keccak256, randomBytes } from "ethers/lib/utils";
import { Wallet, BigNumber, BigNumberish, constants, Contract, ContractReceipt, utils } from "ethers";

// import types
import { FulfillInterpreter, Counter, TransactionManager, RevertableERC20, ERC20 } from "../typechain";
import { getOnchainBalance } from "./utils";
import { getContractError } from "../src/errors";

const { AddressZero } = constants;
const EmptyBytes = "0x";
const EmptyCallDataHash = keccak256(EmptyBytes);

const setBlockTime = async (desiredTimestamp: number) => {
  await ethers.provider.send("evm_setNextBlockTimestamp", [desiredTimestamp]);
};

const createFixtureLoader = waffle.createFixtureLoader;
describe("TransactionManager", function () {
  const [wallet, router, user, receiver, other] = waffle.provider.getWallets() as Wallet[];
  let transactionManager: TransactionManager;
  let transactionManagerReceiverSide: TransactionManager;
  let fulfillInterpreter: FulfillInterpreter;
  let counter: Counter;
  let tokenA: RevertableERC20;
  let tokenB: RevertableERC20;
  const sendingChainId = 1337;
  const receivingChainId = 1338;

  const fixture = async () => {
    const transactionManagerFactory = await ethers.getContractFactory("TransactionManager");
    const counterFactory = await ethers.getContractFactory("Counter");
    const RevertableERC20Factory = await ethers.getContractFactory("RevertableERC20");
    const interpreterFactory = await ethers.getContractFactory("FulfillInterpreter");

    fulfillInterpreter = (await interpreterFactory.deploy()) as FulfillInterpreter;

    transactionManager = (await transactionManagerFactory.deploy(
      sendingChainId,
      fulfillInterpreter.address,
    )) as TransactionManager;
    transactionManagerReceiverSide = (await transactionManagerFactory.deploy(
      receivingChainId,
      fulfillInterpreter.address,
    )) as TransactionManager;

    tokenA = (await RevertableERC20Factory.deploy()) as RevertableERC20;
    tokenB = (await RevertableERC20Factory.deploy()) as RevertableERC20;

    counter = (await counterFactory.deploy()) as Counter;

    return { transactionManager, transactionManagerReceiverSide, tokenA, tokenB };
  };

  const addPrivileges = async (tm: TransactionManager, routers: string[], assets: string[]) => {
    for (const router of routers) {
      const tx = await tm.addRouter(router);
      await tx.wait();
      expect(await tm.approvedRouters(router)).to.be.true;
    }

    for (const assetId of assets) {
      const tx = await tm.addAssetId(assetId);
      await tx.wait();
      expect(await tm.approvedAssets(assetId)).to.be.true;
    }
  };

  let loadFixture: ReturnType<typeof createFixtureLoader>;
  before("create fixture loader", async () => {
    loadFixture = createFixtureLoader([wallet, router, user, receiver, other]);
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

    // Prep contracts with router and assets
    await addPrivileges(transactionManager, [router.address], [AddressZero, tokenA.address, tokenB.address]);

    await addPrivileges(
      transactionManagerReceiverSide,
      [router.address],
      [AddressZero, tokenA.address, tokenB.address],
    );
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
      sendingChainFallback: user.address,
      callTo: AddressZero,
      receivingAddress: receiver.address,
      callDataHash: EmptyCallDataHash,
      transactionId: hexlify(randomBytes(32)),
      sendingChainId: (await transactionManager.chainId()).toNumber(),
      receivingChainId: (await transactionManagerReceiverSide.chainId()).toNumber(),
      ...txOverrides,
    };

    const day = 24 * 60 * 60;
    const record = {
      shares: "10",
      expiry: Math.floor(Date.now() / 1000) + day + 5_000,
      preparedBlockNumber: 10,
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
    const routerAddr = _router.address;
    const startingBalance = await getOnchainBalance(assetId, routerAddr, ethers.provider);
    const expectedBalance = startingBalance.sub(amount);

    const startingLiquidity = await instance.getRouterBalance(routerAddr, assetId);
    const expectedLiquidity = startingLiquidity.add(amount);

    const tx = await instance
      .connect(_router)
      .addLiquidity(amount, assetId, routerAddr, assetId === AddressZero ? { value: BigNumber.from(amount) } : {});

    const receipt = await tx.wait();
    // const [receipt, payload] = await Promise.all([tx.wait(), event]);
    // expect(payload).to.be.ok;

    // Verify receipt + attached events
    expect(receipt.status).to.be.eq(1);
    await assertReceiptEvent(receipt, "LiquidityAdded", {
      router: routerAddr,
      assetId,
      amount,
      caller: receipt.from,
    });

    // Check liquidity
    const liquidity = await instance.getRouterBalance(routerAddr, assetId);
    expect(liquidity).to.be.eq(expectedLiquidity);

    // Check balances
    const balance = await getOnchainBalance(assetId, routerAddr, ethers.provider);
    expect(balance).to.be.eq(expectedBalance.sub(assetId === AddressZero ? tx.gasPrice.mul(receipt.gasUsed) : 0));
  };

  const removeAndAssertLiquidity = async (
    shares: BigNumberish,
    assetId: string = AddressZero,
    _router?: Wallet,
    instance: Contract = transactionManagerReceiverSide,
  ) => {
    const router = _router ?? instance.signer;
    const routerAddress = await router.getAddress();

    // Get starting + expected  balance
    const startingBalance = await getOnchainBalance(assetId, routerAddress, ethers.provider);
    const expectedBalance = startingBalance.add(shares);

    const startingLiquidity = await instance.getRouterBalance(routerAddress, assetId);
    const expectedLiquidity = startingLiquidity.sub(shares);

    const tx = await instance.connect(router).removeLiquidity(shares, assetId, routerAddress);

    const receipt = await tx.wait();
    expect(receipt.status).to.be.eq(1);

    // Verify receipt events
    await assertReceiptEvent(receipt, "LiquidityRemoved", {
      router: routerAddress,
      assetId,
      shares,
      recipient: routerAddress,
    });

    // Check liquidity
    const liquidity = await instance.getRouterBalance(await router.getAddress(), assetId);
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
    instance: TransactionManager = transactionManager,
    encryptedCallData: string = EmptyBytes,
  ): Promise<ContractReceipt> => {
    const { transaction, record } = await getTransactionData(txOverrides, recordOverrides);

    // Check if its the user
    const userSending = preparer.address !== transaction.router;

    // Get initial balances
    const initialContractAmount = await getOnchainBalance(
      userSending ? transaction.sendingAssetId : transaction.receivingAssetId,
      instance.address,
      ethers.provider,
    );
    const initialPreparerAmount = userSending
      ? await getOnchainBalance(transaction.sendingAssetId, preparer.address, ethers.provider)
      : await instance.getRouterBalance(transaction.router, transaction.receivingAssetId);

    const invariantDigest = getInvariantTransactionDigest(transaction);

    // Get initial user shares
    const initialUserShares = await instance.issuedShares(transaction.user, transaction.sendingAssetId);

    // Get initial router shares
    const initialRouterShares = await instance.issuedShares(transaction.router, transaction.receivingAssetId);

    // Get initial outstanding shares
    const initialOutstanding = (await instance.chainId()).eq(transaction.receivingChainId)
      ? await instance.outstandingShares(transaction.receivingAssetId)
      : await instance.outstandingShares(transaction.sendingAssetId);

    expect(await instance.variantTransactionData(invariantDigest)).to.be.eq(utils.formatBytes32String(""));
    // Send tx
    const prepareTx = await instance
      .connect(preparer)
      .prepare(
        transaction,
        record.shares,
        record.expiry,
        encryptedCallData,
        EmptyBytes,
        EmptyBytes,
        transaction.sendingAssetId === AddressZero && preparer.address !== transaction.router
          ? { value: record.shares }
          : {},
      );
    const receipt = await prepareTx.wait();
    expect(receipt.status).to.be.eq(1);

    const variantDigest = getVariantTransactionDigest({
      shares: record.shares,
      expiry: record.expiry,
      preparedBlockNumber: receipt.blockNumber,
    });

    expect(await instance.variantTransactionData(invariantDigest)).to.be.eq(variantDigest);

    // Verify receipt event
    const txData = { ...transaction, ...record, preparedBlockNumber: receipt.blockNumber };
    await assertReceiptEvent(receipt, "TransactionPrepared", {
      user: transaction.user,
      router: transaction.router,
      transactionId: transaction.transactionId,
      txData,
      amount: record.shares,
      caller: preparer.address,
      encryptedCallData: encryptedCallData,
      encodedBid: EmptyBytes,
      bidSignature: EmptyBytes,
    });

    // Verify amount has been deducted from preparer
    const finalPreparerAmount = userSending
      ? await getOnchainBalance(transaction.sendingAssetId, preparer.address, ethers.provider)
      : await instance.getRouterBalance(transaction.router, transaction.receivingAssetId);
    const expected = initialPreparerAmount.sub(record.shares);
    expect(finalPreparerAmount).to.be.eq(
      transaction.sendingAssetId === AddressZero && userSending
        ? expected.sub(prepareTx.gasPrice!.mul(receipt.cumulativeGasUsed!))
        : expected,
    );

    // Verify amount has been added to contract
    const finalContractAmount = await getOnchainBalance(
      userSending ? transaction.sendingAssetId : transaction.receivingAssetId,
      instance.address,
      ethers.provider,
    );
    expect(finalContractAmount).to.be.eq(initialContractAmount.add(userSending ? record.shares : 0));

    // Verify user shares have incremented on sending chain
    const finalUserShares = await instance.issuedShares(transaction.user, transaction.sendingAssetId);
    expect(finalUserShares).to.be.eq(
      initialUserShares.add((await instance.chainId()).eq(transaction.sendingChainId) ? record.shares : 0),
    );

    // Verify router shares decreased on receiving chain
    const finalRouterShares = await instance.issuedShares(transaction.router, transaction.receivingAssetId);
    expect(finalRouterShares).to.be.eq(
      initialRouterShares.sub((await instance.chainId()).eq(transaction.receivingChainId) ? record.shares : 0),
    );

    // Verify outstanding shares
    const finalOutstanding = await instance.outstandingShares(
      (await instance.chainId()).eq(transaction.receivingChainId)
        ? transaction.receivingAssetId
        : transaction.sendingAssetId,
    );
    expect(finalOutstanding).to.be.eq(
      initialOutstanding.add((await instance.chainId()).eq(transaction.receivingChainId) ? 0 : record.shares),
    );

    return receipt;
  };

  const fulfillAndAssert = async (
    transaction: InvariantTransactionData,
    record: VariantTransactionData,
    relayerFee: string,
    fulfillingForSender: boolean,
    submitter: Wallet,
    instance: TransactionManager,
    callData: string = EmptyBytes,
  ) => {
    // Get pre-fulfull balance. If fulfilling on sender side, router
    // liquidity of sender asset will increase. If fulfilling on receiving
    // side, user balance of receiving asset will increase + relayer paid
    const initialIncrease = fulfillingForSender
      ? await getOnchainBalance(transaction.receivingAssetId, transaction.receivingAddress, ethers.provider)
      : await instance.getRouterBalance(router.address, transaction.sendingAssetId);
    const expectedIncrease = initialIncrease.add(record.shares).sub(fulfillingForSender ? relayerFee : 0);

    // Check for relayer balances
    const initialRelayer = await getOnchainBalance(transaction.receivingAssetId, submitter.address, ethers.provider);

    // Check for values that remain flat
    const initialFlat = fulfillingForSender
      ? await instance.getRouterBalance(router.address, transaction.receivingAssetId)
      : await getOnchainBalance(transaction.sendingAssetId, user.address, ethers.provider);

    // Get initial shares for user, router, and outstanding
    const userShares = await instance.issuedShares(
      transaction.user,
      fulfillingForSender ? transaction.receivingAssetId : transaction.sendingAssetId,
    );
    const routerShares = await instance.issuedShares(
      transaction.router,
      fulfillingForSender ? transaction.receivingAssetId : transaction.sendingAssetId,
    );
    const outstandingShares = await instance.outstandingShares(
      fulfillingForSender ? transaction.receivingAssetId : transaction.sendingAssetId,
    );

    // Generate signature from user
    const signature = await signFulfillTransactionPayload(transaction.transactionId, relayerFee, user);

    const invariantDigest = getInvariantTransactionDigest(transaction);
    const variantDigestBeforeFulfill = getVariantTransactionDigest({
      shares: record.shares,
      expiry: record.expiry,
      preparedBlockNumber: record.preparedBlockNumber,
    });

    expect(await instance.variantTransactionData(invariantDigest)).to.be.eq(variantDigestBeforeFulfill);
    // Send tx
    const tx = await instance.connect(submitter).fulfill(
      {
        ...transaction,
        ...record,
      },
      relayerFee,
      signature,
      callData,
    );
    const receipt = await tx.wait();
    expect(receipt.status).to.be.eq(1);

    const variantDigest = getVariantTransactionDigest({
      shares: record.shares,
      expiry: record.expiry,
      preparedBlockNumber: 0,
    });

    expect(await instance.variantTransactionData(invariantDigest)).to.be.eq(variantDigest);
    // Assert event
    await assertReceiptEvent(receipt, "TransactionFulfilled", {
      user: transaction.user,
      router: transaction.router,
      transactionId: transaction.transactionId,
      txData: { ...transaction, ...record },
      relayerFee,
      signature,
      caller: submitter.address,
    });

    // Verify final balances
    const finalIncreased = fulfillingForSender
      ? await getOnchainBalance(transaction.receivingAssetId, transaction.receivingAddress, ethers.provider)
      : await instance.getRouterBalance(router.address, transaction.sendingAssetId);

    const finalFlat = fulfillingForSender
      ? await instance.getRouterBalance(router.address, transaction.receivingAssetId)
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

    if (callData == EmptyBytes) {
      expect(finalIncreased).to.be.eq(
        !fulfillingForSender ||
          user.address !== submitter.address ||
          transaction.receivingAssetId !== AddressZero ||
          user.address !== transaction.receivingAddress
          ? expectedIncrease
          : expectedIncrease.add(relayerFee).sub(gas),
      );
    }
    expect(finalFlat).to.be.eq(initialFlat);

    // Get final shares for user, router, and outstanding
    const finalUserShares = await instance.issuedShares(
      transaction.user,
      fulfillingForSender ? transaction.receivingAssetId : transaction.sendingAssetId,
    );
    const finalRouterShares = await instance.issuedShares(
      transaction.router,
      fulfillingForSender ? transaction.receivingAssetId : transaction.sendingAssetId,
    );
    const finalOutstandingShares = await instance.outstandingShares(
      fulfillingForSender ? transaction.receivingAssetId : transaction.sendingAssetId,
    );

    // Verify user shares:
    // if on sending: should decrease
    // if on receiving: should be constant
    expect(finalUserShares).to.be.eq(fulfillingForSender ? userShares : userShares.sub(record.shares));

    // Verify router shares:
    // if on sending: should increase
    // if on receiving: should be constant
    expect(finalRouterShares).to.be.eq(fulfillingForSender ? routerShares : routerShares.add(record.shares));

    // Verify outstanding shares
    // if on sending: should be constant
    // if on receiving: should decrease
    expect(finalOutstandingShares).to.be.eq(
      fulfillingForSender ? outstandingShares.sub(record.shares) : outstandingShares,
    );
  };

  const cancelAndAssert = async (
    transaction: InvariantTransactionData,
    record: VariantTransactionData,
    canceller: Wallet,
    instance: Contract,
    relayerFee: BigNumber = constants.Zero,
    _signature?: string,
  ): Promise<void> => {
    const sendingSideCancel = (await instance.chainId()).toNumber() === transaction.sendingChainId;

    const startingBalance = !sendingSideCancel
      ? await instance.getRouterBalance(transaction.router, transaction.receivingAssetId)
      : await getOnchainBalance(transaction.sendingAssetId, transaction.user, ethers.provider);
    const expectedBalance =
      canceller == user || (await instance.chainId()).toNumber() == transaction.receivingChainId
        ? startingBalance.add(record.shares)
        : startingBalance.add(record.shares).sub(relayerFee);

    // Get initial shares for user, router, and outstanding
    const userShares = await instance.issuedShares(
      transaction.user,
      sendingSideCancel ? transaction.sendingAssetId : transaction.receivingAssetId,
    );
    const routerShares = await instance.issuedShares(
      transaction.router,
      sendingSideCancel ? transaction.sendingAssetId : transaction.receivingAssetId,
    );
    const outstandingShares = await instance.outstandingShares(
      sendingSideCancel ? transaction.sendingAssetId : transaction.receivingAssetId,
    );

    const signature =
      _signature ?? (await signCancelTransactionPayload(transaction.transactionId, relayerFee.toString(), user));
    const tx = await instance.connect(canceller).cancel({ ...transaction, ...record }, relayerFee, signature);
    const receipt = await tx.wait();
    await assertReceiptEvent(receipt, "TransactionCancelled", {
      user: transaction.user,
      router: transaction.router,
      transactionId: transaction.transactionId,
      txData: { ...transaction, ...record },
      caller: canceller.address,
    });

    const balance = !sendingSideCancel
      ? await instance.getRouterBalance(transaction.router, transaction.receivingAssetId)
      : await getOnchainBalance(transaction.sendingAssetId, transaction.user, ethers.provider);
    expect(balance).to.be.eq(expectedBalance);

    // Get final shares for user, router, and outstanding
    const finalUserShares = await instance.issuedShares(
      transaction.user,
      sendingSideCancel ? transaction.sendingAssetId : transaction.receivingAssetId,
    );
    const finalRouterShares = await instance.issuedShares(
      transaction.router,
      sendingSideCancel ? transaction.sendingAssetId : transaction.receivingAssetId,
    );
    const finalOutstandingShares = await instance.outstandingShares(
      sendingSideCancel ? transaction.sendingAssetId : transaction.receivingAssetId,
    );

    // Verify user shares
    // - if sending chain cancel, should decrease
    // - if receiving chain cancel, should be constant
    expect(finalUserShares).to.be.eq(sendingSideCancel ? userShares.sub(record.shares) : userShares);

    // Verify router shares
    // - if sending chain cancel, should be constant
    // - if receiving chain cancel, should increase
    expect(finalRouterShares).to.be.eq(sendingSideCancel ? routerShares : routerShares.add(record.shares));

    // Verify outstanding shares:
    // - if sending chain cancel, should decrease
    // - if receiving chain cancel, should be constant
    expect(finalOutstandingShares).to.be.eq(
      sendingSideCancel ? outstandingShares.sub(record.shares) : outstandingShares,
    );
  };

  describe("constructor", async () => {
    it("should deploy", async () => {
      expect(transactionManager.address).to.be.a("string");
    });

    it("should set chainId", async () => {
      expect(await transactionManager.chainId()).to.eq(1337);
    });

    it("should set renounced", async () => {
      expect(await transactionManager.renounced()).to.be.false;
    });
  });

  describe("getAmountFromShares", () => {
    it("should work for 0 shares", async () => {
      await addAndAssertLiquidity(1000, AddressZero, router, transactionManager);

      expect(await transactionManager.getAmountFromShares(AddressZero, 0)).to.be.eq(0);
    });

    it("should work for 0 shares of 0 value contract", async () => {
      expect(await transactionManager.getAmountFromShares(AddressZero, 0)).to.be.eq(0);
    });

    it("should work for partial shares of 0 value contract", async () => {
      expect(await transactionManager.getAmountFromShares(AddressZero, 10000)).to.be.eq(0);
    });

    it("should work for 100% of shares", async () => {
      const shares = 1000;
      await addAndAssertLiquidity(shares, AddressZero, router, transactionManager);

      expect(await transactionManager.getAmountFromShares(AddressZero, shares)).to.be.eq(shares);
    });

    it("should work for partial shares", async () => {
      const shares = 1000;
      await addAndAssertLiquidity(shares, AddressZero, router, transactionManager);

      expect(await transactionManager.getAmountFromShares(AddressZero, shares / 2)).to.be.eq(shares / 2);
    });
  });

  describe("renounce", () => {
    it("should fail if not called by owner", async () => {
      await expect(transactionManager.connect(other).renounce()).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("should work and allow unregistered assets + revert onlyOwner functions", async () => {
      const tx = await transactionManager.renounce();
      await tx.wait();
      expect(await transactionManager.renounced()).to.be.true;
      await addAndAssertLiquidity(1, AddressZero, router, transactionManager);
      // make sure `onlyOwner` functions fail
      await expect(transactionManager.addRouter(Wallet.createRandom().address)).to.be.revertedWith(
        "Ownable: caller is not the owner",
      );
    });
  });

  describe("addRouter", () => {
    it("should fail if not called by owner", async () => {
      const toAdd = Wallet.createRandom().address;
      await expect(transactionManager.connect(other).addRouter(toAdd)).to.be.revertedWith(
        "Ownable: caller is not the owner",
      );
    });

    it("should work", async () => {
      const toAdd = Wallet.createRandom().address;
      const tx = await transactionManager.addRouter(toAdd);
      await tx.wait();
      expect(await transactionManager.approvedRouters(toAdd)).to.be.true;
    });
  });

  describe("removeRouter", () => {
    it("should fail if not called by owner", async () => {
      const toAdd = Wallet.createRandom().address;
      await expect(transactionManager.connect(other).removeRouter(toAdd)).to.be.revertedWith(
        "Ownable: caller is not the owner",
      );
    });

    it("should work", async () => {
      const tx = await transactionManager.removeRouter(router.address);
      await tx.wait();
      expect(await transactionManager.approvedRouters(router.address)).to.be.false;
    });
  });

  describe("addAssetId", () => {
    it("should fail if not called by owner", async () => {
      await expect(transactionManager.connect(other).addAssetId(Wallet.createRandom().address)).to.be.revertedWith(
        "Ownable: caller is not the owner",
      );
    });

    it("should work", async () => {
      const assetId = Wallet.createRandom().address;
      const tx = await transactionManager.addAssetId(assetId);
      await tx.wait();
      expect(await transactionManager.approvedAssets(assetId)).to.be.true;
    });
  });

  describe("removeAssetId", () => {
    it("should fail if not called by owner", async () => {
      await expect(transactionManager.connect(other).removeAssetId(Wallet.createRandom().address)).to.be.revertedWith(
        "Ownable: caller is not the owner",
      );
    });

    it("should work", async () => {
      const assetId = AddressZero;
      const tx = await transactionManager.removeAssetId(assetId);
      await tx.wait();
      expect(await transactionManager.approvedAssets(assetId)).to.be.false;
    });
  });

  describe("addLiquidity", () => {
    // TODO:
    // - reentrant cases
    // - rebasing/inflationary/deflationary cases
    it("should revert if router address is empty", async () => {
      const amount = "1";
      const assetId = AddressZero;

      await expect(transactionManager.connect(router).addLiquidity(amount, assetId, AddressZero)).to.be.revertedWith(
        getContractError("addLiquidity: ROUTER_EMPTY"),
      );
      expect(await transactionManager.getRouterBalance(router.address, assetId)).to.eq(BigNumber.from(0));
    });

    it("should fail if amount is 0", async () => {
      const amount = "0";
      const assetId = AddressZero;

      await expect(transactionManager.connect(router).addLiquidity(amount, assetId, router.address)).to.be.revertedWith(
        getContractError("addLiquidity: AMOUNT_IS_ZERO"),
      );
    });

    it("should fail if it is an unapproved router && ownership isnt renounced", async () => {
      const amount = "10";
      const assetId = AddressZero;

      // Remove router
      const remove = await transactionManager.removeRouter(router.address);
      await remove.wait();
      expect(await transactionManager.approvedRouters(router.address)).to.be.false;

      await expect(transactionManager.addLiquidity(amount, assetId, router.address)).to.be.revertedWith(
        getContractError("addLiquidity: BAD_ROUTER"),
      );
    });

    it("should fail if its an unapproved asset && ownership isnt renounced", async () => {
      const amount = "10";
      const assetId = AddressZero;

      // Remove asset
      const remove = await transactionManager.removeAssetId(assetId);
      await remove.wait();
      expect(await transactionManager.approvedAssets(assetId)).to.be.false;

      await expect(transactionManager.connect(router).addLiquidity(amount, assetId, router.address)).to.be.revertedWith(
        getContractError("addLiquidity: BAD_ASSET"),
      );
    });

    it("should fail if if msg.value == 0 for native asset", async () => {
      const amount = "1";
      const assetId = AddressZero;

      await expect(transactionManager.connect(router).addLiquidity(amount, assetId, router.address)).to.be.revertedWith(
        getContractError("addLiquidity: VALUE_MISMATCH"),
      );
      expect(await transactionManager.getRouterBalance(router.address, assetId)).to.eq(BigNumber.from(0));
    });

    it("should fail if msg.value != amount for native asset", async () => {
      const amount = "1";
      const falseValue = "2";
      const assetId = AddressZero;

      await expect(
        transactionManager.connect(router).addLiquidity(amount, assetId, router.address, { value: falseValue }),
      ).to.be.revertedWith(getContractError("addLiquidity: VALUE_MISMATCH"));
      expect(await transactionManager.getRouterBalance(router.address, assetId)).to.eq(BigNumber.from(0));
    });

    it("should fail if msg.value != 0 for ERC20 token", async () => {
      // addLiquidity: ETH_WITH_ERC_TRANSFER;
      const amount = "1";
      const assetId = tokenA.address;
      await expect(
        transactionManager.connect(router).addLiquidity(amount, assetId, router.address, { value: amount }),
      ).to.be.revertedWith(getContractError("addLiquidity: ETH_WITH_ERC_TRANSFER"));
      expect(await transactionManager.getRouterBalance(router.address, assetId)).to.eq(BigNumber.from(0));
    });

    it("should fail if transferFromERC20 fails", async () => {
      const amount = "1";
      const assetId = tokenA.address;
      await expect(transactionManager.connect(router).addLiquidity(amount, assetId, router.address)).to.be.revertedWith(
        "ERC20: transfer amount exceeds allowance",
      );
      expect(await transactionManager.getRouterBalance(router.address, assetId)).to.eq(BigNumber.from(0));
    });

    it("should work if it is renounced && using an unapproved router", async () => {
      const amount = "1";
      const assetId = AddressZero;

      // Remove asset
      const remove = await transactionManager.removeRouter(router.address);
      await remove.wait();
      expect(await transactionManager.approvedRouters(router.address)).to.be.false;

      // Renounce ownership
      const renounce = await transactionManager.renounce();
      await renounce.wait();
      expect(await transactionManager.renounced()).to.be.true;

      await addAndAssertLiquidity(amount, assetId, router);
    });

    it("should work if it is renounced && using an unapproved assetId", async () => {
      const amount = "1";
      const assetId = AddressZero;

      // Remove asset
      const remove = await transactionManager.removeAssetId(assetId);
      await remove.wait();
      expect(await transactionManager.approvedAssets(assetId)).to.be.false;

      // Renounce ownership
      const renounce = await transactionManager.renounce();
      await renounce.wait();
      expect(await transactionManager.renounced()).to.be.true;

      await addAndAssertLiquidity(amount, assetId);
    });

    it("should work for an approved router in approved native asset", async () => {
      const amount = "1";
      const assetId = AddressZero;
      await addAndAssertLiquidity(amount, assetId);
    });

    it("should work for an approved router in approved erc20", async () => {
      const amount = "1";
      const assetId = tokenA.address;
      await approveTokens(amount, router, transactionManagerReceiverSide.address, tokenA);
      await addAndAssertLiquidity(amount, assetId);
    });
  });

  describe("removeLiquidity", () => {
    // TODO:
    // - reentrant cases
    // - rebasing/inflationary/deflationary cases
    it("should revert if param recipient address is empty", async () => {
      const amount = "1";
      const assetId = AddressZero;

      await expect(transactionManager.connect(router).removeLiquidity(amount, assetId, AddressZero)).to.be.revertedWith(
        getContractError("removeLiquidity: RECIPIENT_EMPTY"),
      );
    });

    it("should revert if amount is 0", async () => {
      const amount = "0";
      const assetId = AddressZero;

      await addAndAssertLiquidity("10", assetId);

      await expect(
        transactionManager.connect(router).removeLiquidity(amount, assetId, router.address),
      ).to.be.revertedWith(getContractError("removeLiquidity: ZERO_SHARES"));
    });

    it("should revert if router balance is lower than amount", async () => {
      const amount = "1";
      const assetId = AddressZero;

      await expect(
        transactionManager.connect(router).removeLiquidity(amount, assetId, router.address),
      ).to.be.revertedWith(getContractError("removeLiquidity: INSUFFICIENT_LIQUIDITY"));
    });

    it("happy case: removeLiquidity native token", async () => {
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

  describe("prepare", () => {
    // TODO: revert and emit event test cases
    // - reentrant cases
    // - rebasing test cases
    it("should revert if invariantData.user is AddressZero", async () => {
      const { transaction, record } = await getTransactionData({ user: AddressZero });
      await expect(
        transactionManager
          .connect(user)
          .prepare(transaction, record.shares, record.expiry, EmptyBytes, EmptyBytes, EmptyBytes, {
            value: record.shares,
          }),
      ).to.be.revertedWith(getContractError("prepare: USER_EMPTY"));
    });

    it("should revert if invariantData.router is AddressZero", async () => {
      const { transaction, record } = await getTransactionData({ router: AddressZero });
      await expect(
        transactionManager
          .connect(user)
          .prepare(transaction, record.shares, record.expiry, EmptyBytes, EmptyBytes, EmptyBytes, {
            value: record.shares,
          }),
      ).to.be.revertedWith(getContractError("prepare: ROUTER_EMPTY"));
    });

    it("should fail if it hasnt been renounced && using an unapproved router", async () => {
      const { transaction, record } = await getTransactionData({ router: Wallet.createRandom().address });
      await expect(
        transactionManager
          .connect(user)
          .prepare(transaction, record.shares, record.expiry, EmptyBytes, EmptyBytes, EmptyBytes, {
            value: record.shares,
          }),
      ).to.be.revertedWith(getContractError("prepare: BAD_ROUTER"));
    });

    it("should revert if invariantData.sendingChainFallback is AddressZero", async () => {
      const { transaction, record } = await getTransactionData({ sendingChainFallback: AddressZero });
      await expect(
        transactionManager
          .connect(user)
          .prepare(transaction, record.shares, record.expiry, EmptyBytes, EmptyBytes, EmptyBytes, {
            value: record.shares,
          }),
      ).to.be.revertedWith(getContractError("prepare: SENDING_CHAIN_FALLBACK_EMPTY"));
    });

    it("should revert if invariantData.receivingAddress is AddressZero", async () => {
      const { transaction, record } = await getTransactionData({ receivingAddress: AddressZero });
      await expect(
        transactionManager
          .connect(user)
          .prepare(transaction, record.shares, record.expiry, EmptyBytes, EmptyBytes, EmptyBytes, {
            value: record.shares,
          }),
      ).to.be.revertedWith(getContractError("prepare: RECEIVING_ADDRESS_EMPTY"));
    });

    it("should revert if invariantData.sendingChainId == invariantData.receivingChainId", async () => {
      const { transaction, record } = await getTransactionData({ sendingChainId: 1337, receivingChainId: 1337 });
      await expect(
        transactionManager
          .connect(user)
          .prepare(transaction, record.shares, record.expiry, EmptyBytes, EmptyBytes, EmptyBytes, {
            value: record.shares,
          }),
      ).to.be.revertedWith(getContractError("prepare: SAME_CHAINIDS"));
    });

    it("should revert if invariantData.sendingChainId != transactionManager.chainId && invariantData.receivingChainId != transactionManager.chainId", async () => {
      const { transaction, record } = await getTransactionData({ sendingChainId: 1340, receivingChainId: 1341 });
      await expect(
        transactionManager
          .connect(user)
          .prepare(transaction, record.shares, record.expiry, EmptyBytes, EmptyBytes, EmptyBytes, {
            value: record.shares,
          }),
      ).to.be.revertedWith(getContractError("prepare: INVALID_CHAINIDS"));
    });

    it("should revert if invariantData.expiry - block.timestamp < MIN_TIMEOUT", async () => {
      const { transaction, record } = await getTransactionData();
      const hours12 = 12 * 60 * 60;
      const expiry = (Math.floor(Date.now() / 1000) + hours12 + 5_000).toString();
      await expect(
        transactionManager
          .connect(user)
          .prepare(transaction, record.shares, expiry, EmptyBytes, EmptyBytes, EmptyBytes, {
            value: record.shares,
          }),
      ).to.be.revertedWith(getContractError("prepare: TIMEOUT_TOO_LOW"));
    });

    it("should revert if invariantData.expiry - block.timestamp > MAX_TIMEOUT", async () => {
      const { transaction, record } = await getTransactionData();
      const days31 = 31 * 24 * 60 * 60;
      const expiry = (Math.floor(Date.now() / 1000) + days31 + 5_000).toString();
      await expect(
        transactionManager
          .connect(user)
          .prepare(transaction, record.shares, expiry, EmptyBytes, EmptyBytes, EmptyBytes, {
            value: record.shares,
          }),
      ).to.be.revertedWith(getContractError("prepare: TIMEOUT_TOO_HIGH"));
    });

    it("should revert if digest already exist", async () => {
      const { transaction, record } = await getTransactionData();

      await prepareAndAssert(transaction, record, user, transactionManager);

      await expect(
        transactionManager
          .connect(user)
          .prepare(transaction, record.shares, record.expiry, EmptyBytes, EmptyBytes, EmptyBytes, {
            value: record.shares,
          }),
      ).to.be.revertedWith(getContractError("prepare: DIGEST_EXISTS"));
    });

    describe("failures when preparing on the sender chain", () => {
      it("should fail if amount is 0", async () => {
        const { transaction, record } = await getTransactionData({}, { shares: "0" });
        await expect(
          transactionManager
            .connect(user)
            .prepare(transaction, record.shares, record.expiry, EmptyBytes, EmptyBytes, EmptyBytes, {
              value: record.shares,
            }),
        ).to.be.revertedWith(getContractError("prepare: AMOUNT_IS_ZERO"));
      });

      it("should fail if its not renounced && invariantData.sendingAssetId != an approved asset", async () => {
        const { transaction, record } = await getTransactionData({ sendingAssetId: Wallet.createRandom().address });
        await expect(
          transactionManager
            .connect(user)
            .prepare(transaction, record.shares, record.expiry, EmptyBytes, EmptyBytes, EmptyBytes, {
              value: record.shares,
            }),
        ).to.be.revertedWith(getContractError("prepare: BAD_ASSET"));
      });

      it("should revert if msg.value == 0 && invariantData.sendingAssetId == native token", async () => {
        const { transaction, record } = await getTransactionData();

        await expect(
          transactionManager
            .connect(user)
            .prepare(transaction, record.shares, record.expiry, EmptyBytes, EmptyBytes, EmptyBytes),
        ).to.be.revertedWith(getContractError("prepare: VALUE_MISMATCH"));
      });

      it("should revert if msg.value != amount && invariantData.sendingAssetId == native token", async () => {
        const { transaction, record } = await getTransactionData();
        const falseAmount = "20";
        await expect(
          transactionManager
            .connect(user)
            .prepare(transaction, record.shares, record.expiry, EmptyBytes, EmptyBytes, EmptyBytes, {
              value: falseAmount,
            }),
        ).to.be.revertedWith(getContractError("prepare: VALUE_MISMATCH"));
      });

      it("should revert if msg.value != 0 && invariantData.sendingAssetId != native token", async () => {
        const { transaction, record } = await getTransactionData({ sendingAssetId: tokenA.address });

        await expect(
          transactionManager
            .connect(user)
            .prepare(transaction, record.shares, record.expiry, EmptyBytes, EmptyBytes, EmptyBytes, {
              value: record.shares,
            }),
        ).to.be.revertedWith(getContractError("prepare: ETH_WITH_ERC_TRANSFER"));
      });

      it("should revert if ERC20.transferFrom fails", async () => {
        const { transaction, record } = await getTransactionData({ sendingAssetId: tokenA.address });

        await expect(
          transactionManager
            .connect(user)
            .prepare(transaction, record.shares, record.expiry, EmptyBytes, EmptyBytes, EmptyBytes),
        ).to.be.revertedWith("ERC20: transfer amount exceeds allowance");
      });
    });

    describe("failures when preparing on the receiving chain", () => {
      it("should fail if msg.sender != invariantData.router", async () => {
        const { transaction, record } = await getTransactionData();

        await expect(
          transactionManagerReceiverSide
            .connect(user)
            .prepare(transaction, record.shares, record.expiry, EmptyBytes, EmptyBytes, EmptyBytes),
        ).to.be.revertedWith(getContractError("prepare: ROUTER_MISMATCH"));
      });

      it("should fail if msg.value != 0", async () => {
        const { transaction, record } = await getTransactionData();

        await expect(
          transactionManagerReceiverSide
            .connect(router)
            .prepare(transaction, record.shares, record.expiry, EmptyBytes, EmptyBytes, EmptyBytes, {
              value: record.shares,
            }),
        ).to.be.revertedWith(getContractError("prepare: ETH_WITH_ROUTER_PREPARE"));
      });

      it("should fail if the contract isnt holding at least the amount in receiving assetId", async () => {
        const { transaction, record } = await getTransactionData({}, { shares: "1000000" });

        await expect(
          transactionManagerReceiverSide
            .connect(router)
            .prepare(transaction, record.shares, record.expiry, EmptyBytes, EmptyBytes, EmptyBytes),
        ).to.be.revertedWith(getContractError("prepare: INSUFFICIENT_FUNDS"));
      });

      it("should fail if router liquidity is lower than amount", async () => {
        const { transaction, record } = await getTransactionData({ router: receiver.address }, { shares: "1000000" });

        await (await transactionManagerReceiverSide.renounce()).wait();

        // Another router adds liquidity
        await addAndAssertLiquidity(
          record.shares,
          transaction.receivingAssetId,
          router,
          transactionManagerReceiverSide,
        );

        await expect(
          transactionManagerReceiverSide
            .connect(receiver)
            .prepare(transaction, record.shares, record.expiry, EmptyBytes, EmptyBytes, EmptyBytes),
        ).to.be.revertedWith(getContractError("prepare: INSUFFICIENT_LIQUIDITY"));
      });
    });

    it("should work for 0-valued transactions on receiving chain", async () => {
      const prepareAmount = "0";
      const assetId = AddressZero;

      await addAndAssertLiquidity("100", assetId, router, transactionManagerReceiverSide);

      await prepareAndAssert(
        {
          sendingAssetId: assetId,
          receivingAssetId: assetId,
          sendingChainId: 1337,
          receivingChainId: 1338,
        },
        { shares: prepareAmount },
        router,
        transactionManagerReceiverSide,
      );
    });

    it("should work if the contract has been renounced and using unapproved router", async () => {
      const prepareAmount = "10";

      // Remove router
      const remove = await transactionManager.removeRouter(router.address);
      await remove.wait();
      expect(await transactionManager.approvedRouters(router.address)).to.be.false;

      // Renounce ownership
      const renounce = await transactionManager.renounce();
      await renounce.wait();
      expect(await transactionManager.renounced()).to.be.true;

      // Prepare
      await prepareAndAssert(
        {
          sendingAssetId: AddressZero,
          receivingAssetId: tokenB.address,
        },
        {
          shares: prepareAmount,
        },
      );
    });

    it("should work if the contract has been renounced and using unapproved asset", async () => {
      const prepareAmount = "10";
      const assetId = AddressZero;

      // Remove asset
      const remove = await transactionManager.removeAssetId(assetId);
      await remove.wait();
      expect(await transactionManager.approvedAssets(assetId)).to.be.false;

      // Renounce ownership
      const renounce = await transactionManager.renounce();
      await renounce.wait();
      expect(await transactionManager.renounced()).to.be.true;

      // Prepare
      await prepareAndAssert(
        {
          sendingAssetId: assetId,
          receivingAssetId: tokenB.address,
        },
        {
          shares: prepareAmount,
        },
      );
    });

    it("happy case: prepare by Bob for ERC20 with CallData", async () => {
      const prepareAmount = "10";
      const assetId = tokenA.address;

      // Get calldata
      const callData = counter.interface.encodeFunctionData("incrementAndSend", [
        assetId,
        other.address,
        prepareAmount,
      ]);
      const callDataHash = utils.keccak256(callData);

      const { transaction } = await getTransactionData({
        sendingAssetId: assetId,
        receivingAssetId: tokenB.address,
        callTo: counter.address,
        callDataHash: callDataHash,
      });
      await approveTokens(prepareAmount, user, transactionManager.address);

      await prepareAndAssert(
        transaction,
        {
          shares: prepareAmount,
        },
        user,
        transactionManager,
        callData,
      );
    });

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
          shares: prepareAmount,
        },
        user,
        transactionManager,
      );
    });

    it("happy case: prepare by Bob for native token", async () => {
      const prepareAmount = "10";

      await prepareAndAssert(
        {
          sendingAssetId: AddressZero,
          receivingAssetId: tokenB.address,
        },
        {
          shares: prepareAmount,
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
        { shares: prepareAmount },
        router,
      );
    });

    it("happy case: prepare by Router for native token", async () => {
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
        { shares: prepareAmount },
        router,
        transactionManagerReceiverSide,
      );
    });

    it("happy case: prepare by Bob, sent by relayer", async () => {
      const prepareAmount = "10";
      const assetId = AddressZero;

      const { transaction, record } = await getTransactionData(
        { sendingAssetId: assetId, receivingAssetId: tokenB.address },
        { shares: prepareAmount },
      );

      await prepareAndAssert(transaction, record, other, transactionManager);
    });
  });

  describe("fulfill", () => {
    // TODO:
    // - reentrant cases
    // - rebasing/inflationary/deflationary cases
    it("should revert if the variant data is not stored (has not been prepared)", async () => {
      const { transaction, record } = await getTransactionData();
      const relayerFee = "10";

      const invariantDigest = getInvariantTransactionDigest(transaction);
      expect(await transactionManager.variantTransactionData(invariantDigest)).to.be.eq(utils.formatBytes32String(""));

      const signature = await signFulfillTransactionPayload(transaction.transactionId, relayerFee, user);
      await expect(
        transactionManager.connect(router).fulfill(
          {
            ...transaction,
            ...record,
          },
          relayerFee,
          signature,
          EmptyBytes,
        ),
      ).to.be.revertedWith(getContractError("fulfill: INVALID_VARIANT_DATA"));
    });

    it("should revert if transaction has expired", async () => {
      const { transaction, record } = await getTransactionData();

      const relayerFee = "10";

      const { blockNumber } = await prepareAndAssert(transaction, record, user, transactionManager);

      const invariantDigest = getInvariantTransactionDigest(transaction);
      const variant = {
        shares: record.shares,
        expiry: record.expiry,
        preparedBlockNumber: blockNumber,
      };
      const variantDigestBeforeFulfill = getVariantTransactionDigest(variant);

      expect(await transactionManager.variantTransactionData(invariantDigest)).to.be.eq(variantDigestBeforeFulfill);

      await setBlockTime(+record.expiry + 1_000);

      const signature = await signFulfillTransactionPayload(transaction.transactionId, relayerFee, user);

      await expect(
        transactionManager.connect(router).fulfill(
          {
            ...transaction,
            ...variant,
          },
          relayerFee,
          signature,
          EmptyBytes,
        ),
      ).to.be.revertedWith(getContractError("fulfill: EXPIRED"));
    });

    it("should revert if transaction is already fulfilled (txData.preparedBlockNumber == 0)", async () => {
      const { transaction, record } = await getTransactionData();
      const relayerFee = "1";
      const { blockNumber } = await prepareAndAssert(transaction, record, user, transactionManager);
      const signature = await signFulfillTransactionPayload(transaction.transactionId, relayerFee, user);

      // User fulfills
      await fulfillAndAssert(
        transaction,
        { ...record, preparedBlockNumber: blockNumber },
        relayerFee,
        false,
        router,
        transactionManager,
      );

      await expect(
        transactionManager.connect(router).fulfill(
          {
            ...transaction,
            shares: record.shares,
            expiry: record.expiry,
            preparedBlockNumber: 0,
          },
          relayerFee,
          signature,
          EmptyBytes,
        ),
      ).to.be.revertedWith(getContractError("fulfill: ALREADY_COMPLETED"));
    });

    it("should revert if param user didn't sign the signature", async () => {
      const { transaction, record } = await getTransactionData();
      const relayerFee = "10";
      const { blockNumber } = await prepareAndAssert(transaction, record, user, transactionManager);

      const variant = {
        shares: record.shares,
        expiry: record.expiry,
        preparedBlockNumber: blockNumber,
      };

      const signature = await signFulfillTransactionPayload(
        transaction.transactionId,
        relayerFee,
        Wallet.createRandom(),
      );

      await expect(
        transactionManager.connect(router).fulfill(
          {
            ...transaction,
            ...variant,
          },
          relayerFee,
          signature,
          EmptyBytes,
        ),
      ).to.be.revertedWith(getContractError("fulfill: INVALID_SIGNATURE"));
    });

    it("should revert if the hash of callData != txData.callDataHash", async () => {
      const prepareAmount = "10";
      const assetId = tokenA.address;
      const relayerFee = "2";

      // Get calldata
      const callData = counter.interface.encodeFunctionData("incrementAndSend", [
        assetId,
        other.address,
        prepareAmount,
      ]);
      const callDataHash = utils.keccak256(callData);
      const { transaction, record } = await getTransactionData(
        {
          sendingAssetId: assetId,
          receivingAssetId: tokenB.address,
          callTo: counter.address,
          callDataHash: callDataHash,
        },
        { shares: prepareAmount },
      );
      await approveTokens(prepareAmount, user, transactionManager.address);

      const { blockNumber } = await prepareAndAssert(transaction, record, user, transactionManager, callData);

      const signature = await signFulfillTransactionPayload(transaction.transactionId, relayerFee, user);

      await expect(
        transactionManager
          .connect(router)
          .fulfill(
            { ...transaction, ...record, preparedBlockNumber: blockNumber },
            relayerFee,
            signature,
            keccak256(EmptyBytes),
          ),
      ).to.be.revertedWith(getContractError("fulfill: INVALID_CALL_DATA"));
    });

    describe("sender chain (router) fulfill", () => {
      it("should revert if msg.sender != txData.router", async () => {
        const { transaction, record } = await getTransactionData();
        const relayerFee = "1";
        const { blockNumber } = await prepareAndAssert(transaction, record, user, transactionManager);

        const variant = {
          shares: record.shares,
          expiry: record.expiry,
          preparedBlockNumber: blockNumber,
        };

        const signature = await signFulfillTransactionPayload(transaction.transactionId, relayerFee, user);

        await expect(
          transactionManager.connect(user).fulfill(
            {
              ...transaction,
              ...variant,
            },
            relayerFee,
            signature,
            EmptyBytes,
          ),
        ).to.be.revertedWith(getContractError("fulfill: ROUTER_MISMATCH"));
      });
    });

    describe("receiver chain (user) fulfill", () => {
      it("should revert if the relayerFee > txData.shares", async () => {
        const prepareAmount = "100";
        const assetId = tokenA.address;
        const relayerFee = "100000";

        // Add receiving liquidity
        await approveTokens(prepareAmount, router, transactionManagerReceiverSide.address, tokenA);
        await addAndAssertLiquidity(prepareAmount, assetId, router, transactionManagerReceiverSide);

        const { transaction, record } = await getTransactionData(
          {
            sendingAssetId: AddressZero,
            receivingAssetId: assetId,
            sendingChainId: (await transactionManager.chainId()).toNumber(),
            receivingChainId: (await transactionManagerReceiverSide.chainId()).toNumber(),
          },
          { shares: prepareAmount },
        );

        // User prepares
        await approveTokens(prepareAmount, user, transactionManagerReceiverSide.address, tokenA);
        const { blockNumber } = await prepareAndAssert(transaction, record, router, transactionManagerReceiverSide);

        const signature = await signFulfillTransactionPayload(transaction.transactionId, relayerFee, user);

        await expect(
          transactionManagerReceiverSide.connect(router).fulfill(
            {
              ...transaction,
              ...record,
              preparedBlockNumber: blockNumber,
            },
            relayerFee,
            signature,
            EmptyBytes,
          ),
        ).to.be.revertedWith(getContractError("fulfill: INVALID_RELAYER_FEE"));
      });

      it("should revert if the relayerFee > 0 and transferAsset fails", async () => {
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
            sendingChainId: (await transactionManager.chainId()).toNumber(),
            receivingChainId: (await transactionManagerReceiverSide.chainId()).toNumber(),
          },
          { shares: prepareAmount },
        );

        // User prepares
        await approveTokens(prepareAmount, user, transactionManagerReceiverSide.address, tokenA);
        const { blockNumber } = await prepareAndAssert(transaction, record, router, transactionManagerReceiverSide);

        const signature = await signFulfillTransactionPayload(transaction.transactionId, relayerFee, user);

        // Set token to revert
        (await tokenA.setShouldRevert(true)).wait();
        expect(await tokenA.shouldRevert()).to.be.true;

        await expect(
          transactionManagerReceiverSide.connect(router).fulfill(
            {
              ...transaction,
              ...record,
              preparedBlockNumber: blockNumber,
            },
            relayerFee,
            signature,
            EmptyBytes,
          ),
        ).revertedWith("transfer: SHOULD_REVERT");
      });

      it("should revert if txData.callTo == address(0) && toSend > 0 && transferAsset fails", async () => {
        const prepareAmount = "100";
        const assetId = tokenA.address;
        const relayerFee = "0";

        // Add receiving liquidity
        await approveTokens(prepareAmount, router, transactionManagerReceiverSide.address, tokenA);
        await addAndAssertLiquidity(prepareAmount, assetId, router, transactionManagerReceiverSide);

        const { transaction, record } = await getTransactionData(
          {
            sendingAssetId: AddressZero,
            receivingAssetId: assetId,
            sendingChainId: (await transactionManager.chainId()).toNumber(),
            receivingChainId: (await transactionManagerReceiverSide.chainId()).toNumber(),
            callTo: AddressZero,
          },
          { shares: prepareAmount },
        );

        // User prepares
        await approveTokens(prepareAmount, user, transactionManagerReceiverSide.address, tokenA);
        const { blockNumber } = await prepareAndAssert(transaction, record, router, transactionManagerReceiverSide);

        const signature = await signFulfillTransactionPayload(transaction.transactionId, relayerFee, user);

        // Set token to revert
        (await tokenA.setShouldRevert(true)).wait();
        expect(await tokenA.shouldRevert()).to.be.true;

        await expect(
          transactionManagerReceiverSide.connect(router).fulfill(
            {
              ...transaction,
              ...record,
              preparedBlockNumber: blockNumber,
            },
            relayerFee,
            signature,
            EmptyBytes,
          ),
        ).revertedWith("transfer: SHOULD_REVERT");
      });

      it("should revert if txData.callTo != address(0) && txData.receivingAssetId != address(0) && toSend > 0 && transferAsset (to interpreter) fails", async () => {
        const prepareAmount = "100";
        const assetId = tokenA.address;
        const relayerFee = "0";

        // Add receiving liquidity
        await approveTokens(prepareAmount, router, transactionManagerReceiverSide.address, tokenA);
        await addAndAssertLiquidity(prepareAmount, assetId, router, transactionManagerReceiverSide);

        const { transaction, record } = await getTransactionData(
          {
            sendingAssetId: AddressZero,
            receivingAssetId: assetId,
            sendingChainId: (await transactionManager.chainId()).toNumber(),
            receivingChainId: (await transactionManagerReceiverSide.chainId()).toNumber(),
            callTo: Wallet.createRandom().address,
          },
          { shares: prepareAmount },
        );

        // User prepares
        await approveTokens(prepareAmount, user, transactionManagerReceiverSide.address, tokenA);
        const { blockNumber } = await prepareAndAssert(transaction, record, router, transactionManagerReceiverSide);

        const signature = await signFulfillTransactionPayload(transaction.transactionId, relayerFee, user);

        // Set token to revert
        (await tokenA.setShouldRevert(true)).wait();
        expect(await tokenA.shouldRevert()).to.be.true;

        await expect(
          transactionManagerReceiverSide.connect(router).fulfill(
            {
              ...transaction,
              ...record,
              preparedBlockNumber: blockNumber,
            },
            relayerFee,
            signature,
            EmptyBytes,
          ),
        ).revertedWith("transfer: SHOULD_REVERT");
      });
    });

    it("happy case: user fulfills relayerFee-valued tx", async () => {
      const prepareAmount = "10";
      const assetId = AddressZero;
      const relayerFee = prepareAmount;

      // Add receiving liquidity
      await addAndAssertLiquidity(prepareAmount, assetId, router, transactionManagerReceiverSide);

      const { transaction, record } = await getTransactionData(
        {
          sendingChainId: (await transactionManager.chainId()).toNumber(),
          receivingChainId: (await transactionManagerReceiverSide.chainId()).toNumber(),
          sendingAssetId: assetId,
          receivingAssetId: assetId,
        },
        { shares: prepareAmount },
      );

      // Router prepares
      const { blockNumber } = await prepareAndAssert(transaction, record, router, transactionManagerReceiverSide);

      // User fulfills
      await fulfillAndAssert(
        transaction,
        { ...record, preparedBlockNumber: blockNumber },
        relayerFee,
        true,
        user,
        transactionManagerReceiverSide,
      );
    });

    it("happy case: user fulfills 0-valued tx", async () => {
      const prepareAmount = "0";
      const assetId = AddressZero;

      const { transaction, record } = await getTransactionData(
        {
          sendingChainId: (await transactionManager.chainId()).toNumber(),
          receivingChainId: (await transactionManagerReceiverSide.chainId()).toNumber(),
          sendingAssetId: assetId,
          receivingAssetId: assetId,
        },
        { shares: prepareAmount },
      );

      // Router prepares
      const { blockNumber } = await prepareAndAssert(transaction, record, router, transactionManagerReceiverSide);

      // User fulfills
      await fulfillAndAssert(
        transaction,
        { ...record, preparedBlockNumber: blockNumber },
        "0",
        true,
        user,
        transactionManagerReceiverSide,
      );
    });

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
        { shares: prepareAmount },
      );

      // User prepares
      const { blockNumber } = await prepareAndAssert(transaction, record, user);

      // Router fulfills
      await fulfillAndAssert(
        transaction,
        { ...record, preparedBlockNumber: blockNumber },
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
        { shares: prepareAmount },
      );

      // User prepares
      await approveTokens(prepareAmount, user, transactionManagerReceiverSide.address, tokenB);
      const { blockNumber } = await prepareAndAssert(transaction, record, user);

      // Router fulfills
      await fulfillAndAssert(
        transaction,
        { ...record, preparedBlockNumber: blockNumber },
        relayerFee,
        false,
        router,
        transactionManager,
      );
    });

    it("happy case: user fulfills in native asset with a relayer fee and no external call", async () => {
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
        { shares: prepareAmount },
      );

      // Router prepares
      const { blockNumber } = await prepareAndAssert(transaction, record, router, transactionManagerReceiverSide);

      // User fulfills
      await fulfillAndAssert(
        transaction,
        { ...record, preparedBlockNumber: blockNumber },
        relayerFee,
        true,
        user,
        transactionManagerReceiverSide,
      );
    });

    it("happy case: user fulfills in ERC20 with a relayer fee", async () => {
      const prepareAmount = "100";
      const assetId = tokenB.address;
      const relayerFee = "10";

      // Add receiving liquidity
      await approveTokens(prepareAmount, router, transactionManagerReceiverSide.address, tokenB);
      await addAndAssertLiquidity(prepareAmount, assetId);

      const { transaction, record } = await getTransactionData(
        {
          sendingChainId: (await transactionManager.chainId()).toNumber(),
          receivingChainId: (await transactionManagerReceiverSide.chainId()).toNumber(),
          sendingAssetId: tokenA.address,
          receivingAssetId: assetId,
        },
        { shares: prepareAmount },
      );

      // Router prepares
      const { blockNumber } = await prepareAndAssert(transaction, record, router, transactionManagerReceiverSide);

      // User fulfills
      await fulfillAndAssert(
        transaction,
        { ...record, preparedBlockNumber: blockNumber },
        relayerFee,
        true,
        user,
        transactionManagerReceiverSide,
      );
    });

    it("happy case: user fulfills in ERC20 with a successful external call", async () => {
      const prepareAmount = "100";
      const assetId = tokenB.address;
      const relayerFee = "10";
      const counterAmount = BigNumber.from(prepareAmount).sub(relayerFee);

      // Get calldata
      const callData = counter.interface.encodeFunctionData("incrementAndSend", [
        assetId,
        other.address,
        counterAmount.toString(),
      ]);
      const callDataHash = utils.keccak256(callData);

      // Add receiving liquidity
      await approveTokens(prepareAmount, router, transactionManagerReceiverSide.address, tokenB);
      await addAndAssertLiquidity(prepareAmount, assetId);

      const { transaction, record } = await getTransactionData(
        {
          sendingAssetId: tokenA.address,
          receivingAssetId: assetId,
          callDataHash,
          callTo: counter.address,
        },
        { shares: prepareAmount },
      );

      // Router prepares
      const { blockNumber } = await prepareAndAssert(transaction, record, router, transactionManagerReceiverSide);

      const preExecute = await counter.count();
      const balance = await getOnchainBalance(assetId, other.address, other.provider);

      // User fulfills
      await fulfillAndAssert(
        transaction,
        { ...record, preparedBlockNumber: blockNumber },
        relayerFee,
        true,
        user,
        transactionManagerReceiverSide,
        callData,
      );

      expect(await counter.count()).to.be.eq(preExecute.add(1));
      expect(await getOnchainBalance(assetId, other.address, other.provider)).to.be.eq(balance.add(counterAmount));
    });

    it("happy case: user fulfills in native asset with a successful external call", async () => {
      const prepareAmount = "10";
      const relayerFee = "1";
      const counterAmount = BigNumber.from(prepareAmount).sub(relayerFee);

      // Get calldata
      const callData = counter.interface.encodeFunctionData("incrementAndSend", [
        AddressZero,
        other.address,
        counterAmount.toString(),
      ]);
      const callDataHash = utils.keccak256(callData);

      const { transaction, record } = await getTransactionData(
        {
          sendingAssetId: AddressZero,
          receivingAssetId: AddressZero,
          callTo: counter.address,
          callDataHash: callDataHash,
        },
        { shares: prepareAmount },
      );

      await addAndAssertLiquidity(prepareAmount, transaction.receivingAssetId, router, transactionManagerReceiverSide);
      const { blockNumber } = await prepareAndAssert(transaction, record, router, transactionManagerReceiverSide);

      const preExecute = await counter.count();
      const balance = await other.getBalance();

      await fulfillAndAssert(
        transaction,
        { ...record, preparedBlockNumber: blockNumber },
        relayerFee,
        true,
        user,
        transactionManagerReceiverSide,
        callData,
      );

      expect(await counter.count()).to.be.eq(preExecute.add(1));
      expect(await other.getBalance()).to.be.eq(balance.add(counterAmount));
    });

    it("happy case: user fulfills in ERC20 with an unsuccessful external call (sends to fallback address)", async () => {
      const prepareAmount = "100";
      const assetId = tokenB.address;
      const relayerFee = "10";
      const counterAmount = BigNumber.from(prepareAmount).sub(relayerFee);

      // Set to revert
      const revert = await counter.setShouldRevert(true);
      await revert.wait();
      expect(await counter.shouldRevert()).to.be.true;

      // Get calldata
      const callData = counter.interface.encodeFunctionData("incrementAndSend", [
        assetId,
        other.address,
        counterAmount.toString(),
      ]);
      const callDataHash = utils.keccak256(callData);

      // Add receiving liquidity
      await approveTokens(prepareAmount, router, transactionManagerReceiverSide.address, tokenB);
      await addAndAssertLiquidity(prepareAmount, assetId);

      const { transaction, record } = await getTransactionData(
        {
          sendingAssetId: tokenA.address,
          receivingAssetId: assetId,
          callDataHash,
          callTo: counter.address,
        },
        { shares: prepareAmount },
      );

      // Router prepares
      const { blockNumber } = await prepareAndAssert(transaction, record, router, transactionManagerReceiverSide);

      const preExecute = await counter.count();
      const otherBalance = await getOnchainBalance(assetId, other.address, other.provider);
      const fallbackBalance = await getOnchainBalance(assetId, transaction.receivingAddress, other.provider);

      // User fulfills
      await fulfillAndAssert(
        transaction,
        { ...record, preparedBlockNumber: blockNumber },
        relayerFee,
        true,
        user,
        transactionManagerReceiverSide,
        callData,
      );

      expect(await counter.count()).to.be.eq(preExecute);
      expect(await getOnchainBalance(assetId, other.address, other.provider)).to.be.eq(otherBalance);
      expect(await getOnchainBalance(assetId, transaction.receivingAddress, other.provider)).to.be.eq(
        fallbackBalance.add(counterAmount),
      );
    });

    it("happy case: user fulfills in native asset with an unsuccessful external call (sends to fallback address)", async () => {
      const prepareAmount = "10";
      const relayerFee = "1";
      const counterAmount = BigNumber.from(prepareAmount).sub(relayerFee);

      // Set to revert
      const revert = await counter.setShouldRevert(true);
      await revert.wait();
      expect(await counter.shouldRevert()).to.be.true;

      // Get calldata
      const callData = counter.interface.encodeFunctionData("incrementAndSend", [
        AddressZero,
        other.address,
        counterAmount.toString(),
      ]);
      const callDataHash = utils.keccak256(callData);

      const fallback = Wallet.createRandom().connect(ethers.provider);

      const { transaction, record } = await getTransactionData(
        {
          sendingAssetId: AddressZero,
          receivingAssetId: AddressZero,
          callTo: counter.address,
          callDataHash: callDataHash,
          receivingAddress: fallback.address,
        },
        { shares: prepareAmount },
      );

      await addAndAssertLiquidity(prepareAmount, transaction.receivingAssetId, router, transactionManagerReceiverSide);
      const { blockNumber } = await prepareAndAssert(transaction, record, router, transactionManagerReceiverSide);

      const preExecute = await counter.count();
      const fallbackBalance = await fallback.getBalance();
      const otherBalance = await other.getBalance();

      await fulfillAndAssert(
        transaction,
        { ...record, preparedBlockNumber: blockNumber },
        relayerFee,
        true,
        user,
        transactionManagerReceiverSide,
        callData,
      );

      expect(await counter.count()).to.be.eq(preExecute);
      expect(await other.getBalance()).to.be.eq(otherBalance);
      expect(await fallback.getBalance()).to.be.eq(fallbackBalance.add(counterAmount));
    });
  });

  describe("cancel", () => {
    it("should error if invalid txData", async () => {
      const prepareAmount = "10";
      const assetId = AddressZero;
      const relayerFee = constants.Zero;

      // Add receiving liquidity
      await addAndAssertLiquidity(prepareAmount, assetId, router, transactionManagerReceiverSide);

      const { transaction, record } = await getTransactionData({}, { shares: prepareAmount });

      const { blockNumber } = await prepareAndAssert(transaction, record, router, transactionManagerReceiverSide);

      const signature = await signCancelTransactionPayload(transaction.transactionId, relayerFee.toString(), user);
      await expect(
        transactionManagerReceiverSide
          .connect(user)
          .cancel(
            { ...transaction, shares: record.shares, expiry: record.expiry, preparedBlockNumber: 0 },
            relayerFee,
            signature,
          ),
      ).to.be.revertedWith(getContractError("cancel: INVALID_VARIANT_DATA"));
    });

    it("should error if txData.preparedBlockNumber > 0 is (already fulfilled/cancelled)", async () => {
      const prepareAmount = "10";
      const assetId = AddressZero;
      const relayerFee = constants.Zero;

      // Add receiving liquidity
      await addAndAssertLiquidity(prepareAmount, assetId, router, transactionManagerReceiverSide);

      const { transaction, record } = await getTransactionData({}, { shares: prepareAmount });

      const { blockNumber } = await prepareAndAssert(transaction, record, router, transactionManagerReceiverSide);
      // User fulfills
      await fulfillAndAssert(
        transaction,
        { ...record, preparedBlockNumber: blockNumber },
        relayerFee.toString(),
        true,
        user,
        transactionManagerReceiverSide,
      );

      const signature = await signCancelTransactionPayload(transaction.transactionId, relayerFee.toString(), user);
      await expect(
        transactionManagerReceiverSide
          .connect(user)
          .cancel(
            { ...transaction, shares: record.shares, expiry: record.expiry, preparedBlockNumber: 0 },
            relayerFee,
            signature,
          ),
      ).to.be.revertedWith(getContractError("cancel: ALREADY_COMPLETED"));
    });

    describe("sending chain reverts (returns funds to user)", () => {
      it("should fail if expiry didn't pass yet & msg.sender != router", async () => {
        const relayerFee = constants.Zero;
        const prepareAmount = "10";

        const { transaction, record } = await getTransactionData(
          {
            sendingAssetId: AddressZero,
            receivingAssetId: tokenB.address,
          },
          {
            shares: prepareAmount,
          },
        );

        const { blockNumber } = await prepareAndAssert(transaction, record, user, transactionManager);

        const signature = await signCancelTransactionPayload(transaction.transactionId, relayerFee.toString(), user);
        await expect(
          transactionManager
            .connect(receiver)
            .cancel(
              { ...transaction, shares: record.shares, expiry: record.expiry, preparedBlockNumber: blockNumber },
              relayerFee,
              signature,
            ),
        ).to.be.revertedWith(getContractError("cancel: ROUTER_MUST_CANCEL"));
      });

      it("should fail if expiry didn't pass yet & msg.sender == router & transferAsset fails", async () => {
        const relayerFee = constants.Zero;
        const prepareAmount = "10";

        const { transaction, record } = await getTransactionData(
          {
            sendingAssetId: tokenA.address,
            receivingAssetId: tokenB.address,
          },
          {
            shares: prepareAmount,
          },
        );

        await approveTokens(prepareAmount, user, transactionManager.address);

        const { blockNumber } = await prepareAndAssert(transaction, record, user, transactionManager);

        // Set should revert to true on sending asset
        await (await tokenA.setShouldRevert(true)).wait();
        expect(await tokenA.shouldRevert()).to.be.true;

        const signature = await signCancelTransactionPayload(transaction.transactionId, relayerFee.toString(), user);
        await expect(
          transactionManager
            .connect(router)
            .cancel({ ...transaction, ...record, preparedBlockNumber: blockNumber }, relayerFee, signature),
        ).to.be.revertedWith("transfer: SHOULD_REVERT");
      });

      it("should fail if is expired & relayerFee > txData.shares", async () => {
        const relayerFee = BigNumber.from(100);
        const prepareAmount = "10";

        const { transaction, record } = await getTransactionData(
          {
            sendingAssetId: AddressZero,
            receivingAssetId: tokenB.address,
          },
          {
            shares: prepareAmount,
          },
        );

        const { blockNumber } = await prepareAndAssert(transaction, record, user, transactionManager);

        await setBlockTime(+record.expiry + 1_000);
        const signature = await signCancelTransactionPayload(
          transaction.transactionId,
          relayerFee.toString(),
          receiver,
        );
        await expect(
          transactionManager
            .connect(user)
            .cancel(
              { ...transaction, shares: record.shares, expiry: record.expiry, preparedBlockNumber: blockNumber },
              relayerFee,
              signature,
            ),
        ).to.be.revertedWith(getContractError("cancel: INVALID_RELAYER_FEE"));
      });

      it("should error if is expired & relayerFee != 0 & signature is invalid & user is not sending", async () => {
        const relayerFee = BigNumber.from(1);
        const prepareAmount = "10";

        const { transaction, record } = await getTransactionData(
          {
            sendingAssetId: AddressZero,
            receivingAssetId: tokenB.address,
          },
          {
            shares: prepareAmount,
          },
        );

        const { blockNumber } = await prepareAndAssert(transaction, record, user, transactionManager);

        await setBlockTime(+record.expiry + 1_000);
        const signature = await signCancelTransactionPayload(
          transaction.transactionId,
          relayerFee.toString(),
          receiver,
        );
        await expect(
          transactionManager
            .connect(receiver)
            .cancel(
              { ...transaction, shares: record.shares, expiry: record.expiry, preparedBlockNumber: blockNumber },
              relayerFee,
              signature,
            ),
        ).to.be.revertedWith(getContractError("cancel: INVALID_SIGNATURE"));
      });

      it("should error if is expired & relayerFee != 0 & user is sending & transfer to relayer fails", async () => {
        const relayerFee = BigNumber.from(1);
        const prepareAmount = "10";

        const { transaction, record } = await getTransactionData(
          {
            sendingAssetId: tokenA.address,
            receivingAssetId: tokenB.address,
          },
          {
            shares: prepareAmount,
          },
        );

        await approveTokens(prepareAmount, user, transactionManager.address);

        const { blockNumber } = await prepareAndAssert(transaction, record, user, transactionManager);

        await (await tokenA.setShouldRevert(true)).wait();
        expect(await tokenA.shouldRevert()).to.be.true;

        await setBlockTime(+record.expiry + 1_000);
        const signature = await signCancelTransactionPayload(transaction.transactionId, relayerFee.toString(), user);
        await expect(
          transactionManager
            .connect(user)
            .cancel({ ...transaction, ...record, preparedBlockNumber: blockNumber }, relayerFee, signature),
        ).to.be.revertedWith("transfer: SHOULD_REVERT");
      });

      it("should fail if is expured & relayerFee == 0 & user is sending & transfer to user fails", async () => {
        const relayerFee = "0";
        const prepareAmount = "10";

        const { transaction, record } = await getTransactionData(
          {
            sendingAssetId: tokenA.address,
            receivingAssetId: tokenB.address,
          },
          {
            shares: prepareAmount,
          },
        );

        await approveTokens(prepareAmount, user, transactionManager.address);

        const { blockNumber } = await prepareAndAssert(transaction, record, user, transactionManager);

        await (await tokenA.setShouldRevert(true)).wait();
        expect(await tokenA.shouldRevert()).to.be.true;

        await setBlockTime(+record.expiry + 1_000);
        const signature = await signCancelTransactionPayload(transaction.transactionId, relayerFee.toString(), user);
        await expect(
          transactionManager
            .connect(user)
            .cancel({ ...transaction, ...record, preparedBlockNumber: blockNumber }, relayerFee, signature),
        ).to.be.revertedWith("transfer: SHOULD_REVERT");
      });
    });

    describe("receiving chain cancels (funds sent back to router)", () => {
      it("should error if within expiry & signature is invalid && user did not send", async () => {
        const relayerFee = BigNumber.from(1);
        const prepareAmount = "10";
        const assetId = AddressZero;

        // Add receiving liquidity
        await addAndAssertLiquidity(prepareAmount, assetId, router, transactionManagerReceiverSide);

        const { transaction, record } = await getTransactionData({}, { shares: prepareAmount });

        const { blockNumber } = await prepareAndAssert(transaction, record, router, transactionManagerReceiverSide);

        const signature = await signCancelTransactionPayload(
          transaction.transactionId,
          relayerFee.toString(),
          receiver,
        );
        await expect(
          transactionManagerReceiverSide
            .connect(receiver)
            .cancel(
              { ...transaction, shares: record.shares, expiry: record.expiry, preparedBlockNumber: blockNumber },
              relayerFee,
              signature,
            ),
        ).to.be.revertedWith(getContractError("cancel: INVALID_SIGNATURE"));
      });
    });

    it("happy case: user cancelling expired sender transfer with only relayerFee in value", async () => {
      const prepareAmount = "10";
      const relayerFee = BigNumber.from(prepareAmount);

      const { transaction, record } = await getTransactionData(
        {
          sendingAssetId: AddressZero,
        },
        { shares: prepareAmount },
      );

      const { blockNumber } = await prepareAndAssert(transaction, record, user, transactionManager);

      await setBlockTime(+record.expiry + 1_000);

      await cancelAndAssert(
        transaction,
        { ...record, preparedBlockNumber: blockNumber },
        other,
        transactionManager,
        relayerFee,
        await signCancelTransactionPayload(transaction.transactionId, relayerFee.toString(), user),
      );
    });

    it("happy case: user cancelling expired sender chain transfer without relayer && they are sending (signature invalid)", async () => {
      const prepareAmount = "10";
      const assetId = AddressZero;
      const relayerFee = constants.Zero;

      // Add receiving liquidity
      await addAndAssertLiquidity(prepareAmount, assetId, router, transactionManagerReceiverSide);

      const { transaction, record } = await getTransactionData({}, { shares: prepareAmount });

      const { blockNumber } = await prepareAndAssert(transaction, record, router, transactionManagerReceiverSide);

      await setBlockTime(+record.expiry + 1_000);

      await cancelAndAssert(
        transaction,
        { ...record, preparedBlockNumber: blockNumber },
        user,
        transactionManagerReceiverSide,
        relayerFee,
        await signCancelTransactionPayload(transaction.transactionId, relayerFee.toString(), receiver),
      );
    });

    it("happy case: user can cancel receiving chain transfer themselves with invalid signature", async () => {
      const relayerFee = BigNumber.from(1);
      const prepareAmount = "10";
      const assetId = AddressZero;

      // Add receiving liquidity
      await addAndAssertLiquidity(prepareAmount, assetId, router, transactionManagerReceiverSide);

      const { transaction, record } = await getTransactionData({}, { shares: prepareAmount });

      const { blockNumber } = await prepareAndAssert(transaction, record, router, transactionManagerReceiverSide);

      const signature = await signCancelTransactionPayload(transaction.transactionId, relayerFee.toString(), receiver);

      await cancelAndAssert(
        transaction,
        { ...record, preparedBlockNumber: blockNumber },
        user, // To avoid balance checks for eth
        transactionManagerReceiverSide,
        undefined,
        signature,
      );
    });

    it("happy case: user cancels ETH before expiry on receiving chain", async () => {
      const prepareAmount = "10";
      const assetId = AddressZero;

      // Add receiving liquidity
      await addAndAssertLiquidity(prepareAmount, assetId, router, transactionManagerReceiverSide);

      const { transaction, record } = await getTransactionData({}, { shares: prepareAmount });

      const { blockNumber } = await prepareAndAssert(transaction, record, router, transactionManagerReceiverSide);

      await cancelAndAssert(
        transaction,
        { ...record, preparedBlockNumber: blockNumber },
        user, // To avoid balance checks for eth
        transactionManagerReceiverSide,
      );
    });

    it("happy case: user cancels ERC20 before expiry on receiving chain", async () => {
      const prepareAmount = "10";

      // Add receiving liquidity
      await approveTokens(prepareAmount, router, transactionManagerReceiverSide.address, tokenB);
      await addAndAssertLiquidity(prepareAmount, tokenB.address, router, transactionManagerReceiverSide);

      const { transaction, record } = await getTransactionData(
        {
          sendingAssetId: tokenA.address,
          receivingAssetId: tokenB.address,
        },
        { shares: prepareAmount },
      );

      const { blockNumber } = await prepareAndAssert(transaction, record, router, transactionManagerReceiverSide);

      await cancelAndAssert(
        transaction,
        { ...record, preparedBlockNumber: blockNumber },
        user, // To avoid balance checks for eth
        transactionManagerReceiverSide,
      );
    });

    it("happy case: router cancels ETH before expiry on sending chain", async () => {
      const prepareAmount = "10";

      const { transaction, record } = await getTransactionData(
        {
          sendingAssetId: AddressZero,
          receivingAssetId: tokenB.address,
        },
        {
          shares: prepareAmount,
        },
      );

      const { blockNumber } = await prepareAndAssert(transaction, record, user, transactionManager);

      await cancelAndAssert(
        transaction,
        { ...record, preparedBlockNumber: blockNumber },
        router, // To avoid balance checks for eth
        transactionManager,
      );
    });

    it("happy case: router cancels ERC20 before expiry on sending chain", async () => {
      const prepareAmount = "10";

      const { transaction, record } = await getTransactionData(
        {
          sendingAssetId: tokenA.address,
          receivingAssetId: tokenB.address,
        },
        {
          shares: prepareAmount,
        },
      );

      await approveTokens(prepareAmount, user, transactionManager.address, tokenA);
      const { blockNumber } = await prepareAndAssert(transaction, record, user, transactionManager);

      await cancelAndAssert(transaction, { ...record, preparedBlockNumber: blockNumber }, router, transactionManager);
    });

    it("happy case: user cancels ETH after expiry on sending chain", async () => {
      const prepareAmount = "10";
      const assetId = AddressZero;
      const relayerFee = BigNumber.from(1);

      // Add receiving liquidity
      await addAndAssertLiquidity(prepareAmount, assetId, router, transactionManagerReceiverSide);

      const { transaction, record } = await getTransactionData({}, { shares: prepareAmount });

      const { blockNumber } = await prepareAndAssert(transaction, record, router, transactionManagerReceiverSide);

      await setBlockTime(+record.expiry + 1_000);

      await cancelAndAssert(
        transaction,
        { ...record, preparedBlockNumber: blockNumber },
        user,
        transactionManagerReceiverSide,
        relayerFee,
      );
    });

    it("happy case: user cancels ERC20 after expiry on sending chain", async () => {
      const prepareAmount = "10";
      const relayerFee = BigNumber.from(1);

      // Add receiving liquidity
      await approveTokens(prepareAmount, router, transactionManagerReceiverSide.address, tokenB);
      await addAndAssertLiquidity(prepareAmount, tokenB.address, router, transactionManagerReceiverSide);

      const { transaction, record } = await getTransactionData(
        {
          sendingAssetId: tokenA.address,
          receivingAssetId: tokenB.address,
        },
        { shares: prepareAmount },
      );

      const { blockNumber } = await prepareAndAssert(transaction, record, router, transactionManagerReceiverSide);

      await setBlockTime(+record.expiry + 1_000);
      await cancelAndAssert(
        transaction,
        { ...record, preparedBlockNumber: blockNumber },
        user,
        transactionManagerReceiverSide,
        relayerFee,
      );
    });

    it("happy case: router cancels ETH after expiry", async () => {
      const prepareAmount = "10";
      const relayerFee = BigNumber.from(1);

      const { transaction, record } = await getTransactionData(
        {
          sendingAssetId: AddressZero,
          receivingAssetId: tokenB.address,
        },
        {
          shares: prepareAmount,
        },
      );

      const { blockNumber } = await prepareAndAssert(transaction, record, user, transactionManager);

      await setBlockTime(+record.expiry + 1_000);
      await cancelAndAssert(
        transaction,
        { ...record, preparedBlockNumber: blockNumber },
        router,
        transactionManager,
        relayerFee,
      );
    });

    it("happy case: router cancels ERC20 after expiry", async () => {
      const prepareAmount = "10";
      const relayerFee = BigNumber.from(1);

      const { transaction, record } = await getTransactionData(
        {
          sendingAssetId: tokenA.address,
          receivingAssetId: tokenB.address,
        },
        {
          shares: prepareAmount,
        },
      );

      await approveTokens(prepareAmount, user, transactionManager.address, tokenA);
      const { blockNumber } = await prepareAndAssert(transaction, record, user, transactionManager);

      await setBlockTime(+record.expiry + 1_000);
      await cancelAndAssert(
        transaction,
        { ...record, preparedBlockNumber: blockNumber },
        router,
        transactionManager,
        relayerFee,
      );
    });

    it("happy case: relayer cancels at sender-side ETH after expiry", async () => {
      const prepareAmount = "10";
      const relayerFee = BigNumber.from(1);

      const { transaction, record } = await getTransactionData(
        {
          sendingAssetId: AddressZero,
          receivingAssetId: tokenB.address,
        },
        {
          shares: prepareAmount,
        },
      );

      const { blockNumber } = await prepareAndAssert(transaction, record, user, transactionManager);

      await setBlockTime(+record.expiry + 1_000);
      await cancelAndAssert(
        transaction,
        { ...record, preparedBlockNumber: blockNumber },
        other,
        transactionManager,
        relayerFee,
      );
    });

    it("happy case: relayer cancels at receiver-side ETH after expiry", async () => {
      const prepareAmount = "10";
      const assetId = AddressZero;
      const relayerFee = BigNumber.from(1);

      // Add receiving liquidity
      await addAndAssertLiquidity(prepareAmount, assetId, router, transactionManagerReceiverSide);

      const { transaction, record } = await getTransactionData({}, { shares: prepareAmount });

      const { blockNumber } = await prepareAndAssert(transaction, record, router, transactionManagerReceiverSide);

      await setBlockTime(+record.expiry + 1_000);

      await cancelAndAssert(
        transaction,
        { ...record, preparedBlockNumber: blockNumber },
        other,
        transactionManagerReceiverSide,
        relayerFee,
      );
    });
  });
});
