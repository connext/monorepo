import { ethers, waffle } from "hardhat";
import { expect } from "chai";
import { getRandomBytes32, InvariantTransactionData, VariantTransactionData } from "@connext/nxtp-utils";
import {
  mkAddress,
  PrepareParams,
  FulfillParams,
  getInvariantTransactionDigest,
  getVariantTransactionDigest,
  signCancelTransactionPayload,
  signFulfillTransactionPayload,
} from "@connext/nxtp-utils";
import { Wallet, utils, BigNumber, constants, providers, ContractReceipt } from "ethers";

import {
  FulfillInterpreter,
  Counter,
  TransactionManager as TransactionManagerTypechain,
  TestERC20,
} from "@connext/nxtp-contracts/typechain";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import FulfillInterpreterArtifact from "@connext/nxtp-contracts/artifacts/contracts/interpreters/FulfillInterpreter.sol/FulfillInterpreter.json";
import CounterArtifact from "@connext/nxtp-contracts/artifacts/contracts/test/Counter.sol/Counter.json";
import TestERC20Artifact from "@connext/nxtp-contracts/artifacts/contracts/test/TestERC20.sol/TestERC20.json";

import pino, { BaseLogger } from "pino";
import { getDeployedTransactionManagerContractAddress, TransactionManager, TransactionManagerError } from "../src";
import { approveTokens, getOnchainBalance } from "./helper";

const { AddressZero } = constants;
const logger: BaseLogger = pino();
const EmptyBytes = "0x";
const EmptyCallDataHash = utils.keccak256(EmptyBytes);

const setBlockTime = async (desiredTimestamp: number) => {
  await ethers.provider.send("evm_setNextBlockTimestamp", [desiredTimestamp]);
};

const createFixtureLoader = waffle.createFixtureLoader;
describe("Transaction Manager", function () {
  const [wallet, router, user, receiver] = waffle.provider.getWallets();

  const sendingChainId = 1337;
  const receivingChainId = 1338;
  const routerFunds = "1000";
  const userFunds = "100";

  let userTransactionManager: TransactionManager;
  let routerTransactionManager: TransactionManager;
  let transactionManager: TransactionManagerTypechain;
  let transactionManagerReceiverSide: TransactionManagerTypechain;
  let counter: Counter;
  let tokenA: TestERC20;
  let tokenB: TestERC20;

  const getTransactionData = async (
    txOverrides: Partial<InvariantTransactionData> = {},
    recordOverrides: Partial<VariantTransactionData> = {},
  ): Promise<{ transaction: InvariantTransactionData; record: VariantTransactionData }> => {
    const transaction = {
      user: user.address,
      router: router.address,
      sendingAssetId: tokenA.address,
      receivingAssetId: tokenB.address,
      sendingChainFallback: user.address,
      callTo: AddressZero,
      receivingAddress: receiver.address,
      callDataHash: EmptyCallDataHash,
      transactionId: getRandomBytes32(),
      sendingChainId: (await transactionManager.chainId()).toNumber(),
      receivingChainId: (await transactionManagerReceiverSide.chainId()).toNumber(),
      ...txOverrides,
    };

    const day = 24 * 60 * 60;
    const record = {
      amount: "10",
      expiry: Math.floor(Date.now() / 1000) + day + 5_000,
      preparedBlockNumber: 10,
      ...recordOverrides,
    };

    return { transaction, record };
  };
  const fixture = async () => {
    const transactionManagerFactory = await ethers.getContractFactory(
      TransactionManagerArtifact.abi,
      TransactionManagerArtifact.bytecode,
      wallet,
    );
    const counterFactory = await ethers.getContractFactory(CounterArtifact.abi, CounterArtifact.bytecode, wallet);
    const testERC20Factory = await ethers.getContractFactory(TestERC20Artifact.abi, TestERC20Artifact.bytecode, wallet);
    const interpreterFactory = await ethers.getContractFactory(
      FulfillInterpreterArtifact.abi,
      FulfillInterpreterArtifact.bytecode,
      wallet,
    );

    const interpreter = (await interpreterFactory.deploy()) as FulfillInterpreter;

    transactionManager = (await transactionManagerFactory.deploy(
      sendingChainId,
      interpreter.address,
    )) as TransactionManagerTypechain;
    transactionManagerReceiverSide = (await transactionManagerFactory.deploy(
      receivingChainId,
      interpreter.address,
    )) as TransactionManagerTypechain;

    tokenA = (await testERC20Factory.deploy()) as TestERC20;
    tokenB = (await testERC20Factory.deploy()) as TestERC20;

    counter = (await counterFactory.deploy()) as Counter;

    return { transactionManager, transactionManagerReceiverSide, tokenA, tokenB };
  };

  let loadFixture: ReturnType<typeof createFixtureLoader>;

  const addPrivileges = async (tm: TransactionManagerTypechain, routers: string[], assets: string[]) => {
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

  before("create fixture loader", async () => {
    loadFixture = createFixtureLoader([wallet, user, receiver]);
  });

  beforeEach(async function () {
    ({ transactionManager, transactionManagerReceiverSide, tokenA, tokenB } = await loadFixture(fixture));

    await addPrivileges(transactionManager, [router.address], [AddressZero, tokenA.address, tokenB.address]);

    await addPrivileges(
      transactionManagerReceiverSide,
      [router.address],
      [AddressZero, tokenA.address, tokenB.address],
    );

    await tokenB.connect(wallet).transfer(router.address, routerFunds);

    await tokenA.connect(wallet).transfer(user.address, userFunds);

    await approveTokens(transactionManagerReceiverSide.address, routerFunds, router, tokenB);
    const tx = await transactionManagerReceiverSide
      .connect(router)
      .addLiquidity(routerFunds, tokenB.address, router.address);
    await tx.wait();

    userTransactionManager = new TransactionManager(
      user,
      {
        [sendingChainId]: {
          provider: user,
          transactionManagerAddress: transactionManager.address,
        },
        [receivingChainId]: {
          provider: user,
          transactionManagerAddress: transactionManagerReceiverSide.address,
        },
      },
      logger,
    );

    routerTransactionManager = new TransactionManager(
      router,
      {
        [sendingChainId]: {
          provider: router,
          transactionManagerAddress: transactionManager.address,
        },
        [receivingChainId]: {
          provider: router,
          transactionManagerAddress: transactionManagerReceiverSide.address,
        },
      },
      logger,
    );
  });

  it("should deploy", async () => {
    expect(transactionManager.address).to.be.a("string");
    expect(tokenA.address).to.be.a("string");
    expect(tokenB.address).to.be.a("string");
  });

  describe("class TransactionManagerError", () => {
    it("happy: constructor", async () => {
      const methodId = getRandomBytes32();
      const method = "test";
      const err = new TransactionManagerError(
        TransactionManagerError.reasons.NoTransactionManagerAddress,
        sendingChainId,
        {
          methodId,
          method,
        },
      );

      expect(err.msg).to.be.eq(TransactionManagerError.reasons.NoTransactionManagerAddress);
      expect(err.chainId).to.be.eq(sendingChainId);
      expect(err.context.method).to.be.eq(method);
      expect(err.context.methodId).to.be.eq(methodId);
    });
  });

  describe("getDeployedTransactionManagerContractAddress", () => {
    it("happy case: returns undefined", async () => {
      const chainId = sendingChainId;
      const res = getDeployedTransactionManagerContractAddress(chainId);
      expect(res).to.be.undefined;
    });
    it("happy case", async () => {
      const chainId = 5;
      const res = getDeployedTransactionManagerContractAddress(chainId);
      expect(res).to.be.a("string");
    });
  });

  describe("class TransactionManager", () => {
    it("happy: constructor", async () => {
      expect(userTransactionManager.getTransactionManagerAddress(sendingChainId)).to.be.eq(transactionManager.address);
      expect(userTransactionManager.getTransactionManagerAddress(receivingChainId)).to.be.eq(
        transactionManagerReceiverSide.address,
      );
    });

    it("happy: getTransactionManagerAddress", async () => {
      expect(userTransactionManager.getTransactionManagerAddress(sendingChainId)).to.be.eq(transactionManager.address);
      expect(userTransactionManager.getTransactionManagerAddress(receivingChainId)).to.be.eq(
        transactionManagerReceiverSide.address,
      );
    });

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

    const prepareAndAssert = async (
      txOverrides: Partial<InvariantTransactionData>,
      recordOverrides: Partial<VariantTransactionData> = {},
      preparer: Wallet = user,
      instance: TransactionManagerTypechain = transactionManager,
      encryptedCallData: string = EmptyBytes,
    ) => {
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
        : await instance.routerBalances(transaction.router, transaction.receivingAssetId);

      const invariantDigest = getInvariantTransactionDigest(transaction);

      expect(await instance.variantTransactionData(invariantDigest)).to.be.eq(utils.formatBytes32String(""));
      // Send tx
      const prepareParams: PrepareParams = {
        txData: transaction,
        amount: record.amount,
        expiry: record.expiry,
        encryptedCallData: encryptedCallData,
        encodedBid: EmptyBytes,
        bidSignature: EmptyBytes,
      };

      const res = await userTransactionManager.prepare(transaction.sendingChainId, prepareParams);

      expect(res.isOk()).to.be.true;

      const receipt = await res.value.wait();
      expect(receipt.status).to.be.eq(1);

      const variantDigest = getVariantTransactionDigest({
        amount: record.amount,
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
        caller: preparer.address,
        encryptedCallData: encryptedCallData,
        bidSignature: EmptyBytes,
        encodedBid: EmptyBytes,
      });

      // Verify amount has been deducted from preparer
      const finalPreparerAmount = userSending
        ? await getOnchainBalance(transaction.sendingAssetId, preparer.address, ethers.provider)
        : await instance.routerBalances(transaction.router, transaction.receivingAssetId);
      const expected = initialPreparerAmount.sub(record.amount);
      expect(finalPreparerAmount).to.be.eq(
        transaction.sendingAssetId === AddressZero && userSending
          ? expected.sub(res.value.gasPrice!.mul(receipt.cumulativeGasUsed!))
          : expected,
      );

      // TODO: add `getTransactionsByUser` assertion

      // Verify amount has been added to contract
      if (!userSending) {
        // Router does not send funds
        return receipt;
      }
      const finalContractAmount = await getOnchainBalance(
        transaction.sendingAssetId,
        instance.address,
        ethers.provider,
      );
      expect(finalContractAmount).to.be.eq(initialContractAmount.add(record.amount));

      return receipt;
    };

    describe("prepare", () => {
      it("should error if unfamiliar chainId", async () => {
        const { transaction, record } = await getTransactionData();
        const InvalidChainId = 123;

        const prepareParams: PrepareParams = {
          txData: transaction,
          amount: record.amount,
          expiry: record.expiry,
          encryptedCallData: EmptyBytes,
          encodedBid: EmptyBytes,
          bidSignature: EmptyBytes,
        };

        const res = await userTransactionManager.prepare(InvalidChainId, prepareParams);

        expect(res.isOk()).to.be.false;
        expect(res.isErr()).to.be.true;

        expect(res.error.message).to.be.eq(TransactionManagerError.reasons.NoTransactionManagerAddress);
      });

      it("should error if transaction fails", async () => {
        const { transaction, record } = await getTransactionData();

        const prepareParams: PrepareParams = {
          txData: transaction,
          amount: record.amount,
          expiry: record.expiry,
          encryptedCallData: EmptyBytes,
          encodedBid: EmptyBytes,
          bidSignature: EmptyBytes,
        };

        const res = await userTransactionManager.prepare(transaction.sendingChainId, prepareParams);

        expect(res.isOk()).to.be.false;
        expect(res.isErr()).to.be.true;

        expect(res.error.message).to.be.eq(TransactionManagerError.reasons.TxServiceError);
      });

      it("happy case", async () => {
        const { transaction, record } = await getTransactionData();
        await approveTokens(transactionManager.address, record.amount, user, tokenA);
        await prepareAndAssert(transaction, record, user, transactionManager);
      });
    });

    describe("cancel", () => {
      const relayerFee = "1";

      it("should error if unfamiliar chainId", async () => {
        const { transaction, record } = await getTransactionData();
        const InvalidChainId = 123;

        await approveTokens(transactionManager.address, record.amount, user, tokenA);
        const { blockNumber } = await prepareAndAssert(transaction, record, user, transactionManager);

        const signature = await signCancelTransactionPayload(transaction.transactionId, relayerFee.toString(), user);

        const cancelParams = {
          txData: { ...transaction, ...record, preparedBlockNumber: blockNumber },
          relayerFee: relayerFee,
          signature: signature,
        };

        await setBlockTime(+record.expiry + 1_000);

        const res = await userTransactionManager.cancel(InvalidChainId, cancelParams);

        expect(res.isOk()).to.be.false;
        expect(res.isErr()).to.be.true;

        expect(res.error.message).to.be.eq(TransactionManagerError.reasons.NoTransactionManagerAddress);
      });

      it("should error if transaction fails", async () => {
        const { transaction, record } = await getTransactionData();

        await approveTokens(transactionManager.address, record.amount, user, tokenA);
        const { blockNumber } = await prepareAndAssert(transaction, record, user, transactionManager);

        const signature = await signCancelTransactionPayload(transaction.transactionId, relayerFee.toString(), user);

        const cancelParams = {
          txData: { ...transaction, ...record, preparedBlockNumber: blockNumber },
          relayerFee: relayerFee,
          signature: signature,
        };

        const res = await userTransactionManager.cancel(transaction.sendingChainId, cancelParams);

        expect(res.isOk()).to.be.false;
        expect(res.isErr()).to.be.true;

        expect(res.error.message).to.be.eq(TransactionManagerError.reasons.TxServiceError);
      });

      it("happy case", async () => {
        const { transaction, record } = await getTransactionData();

        await approveTokens(transactionManager.address, record.amount, user, tokenA);
        const { blockNumber } = await prepareAndAssert(transaction, record, user, transactionManager);

        const signature = await signCancelTransactionPayload(transaction.transactionId, relayerFee.toString(), user);

        const cancelParams = {
          txData: { ...transaction, ...record, preparedBlockNumber: blockNumber },
          relayerFee: relayerFee,
          signature: signature,
        };

        await setBlockTime(+record.expiry + 1_000);

        const res = await userTransactionManager.cancel(transaction.sendingChainId, cancelParams);
        expect(res.isOk()).to.be.true;

        const receipt = await res.value.wait();

        expect(receipt.status).to.be.eq(1);
      });
    });

    describe("fulfill", () => {
      const relayerFee = "1";

      it("should error if unfamiliar chainId", async () => {
        const { transaction, record } = await getTransactionData();
        const InvalidChainId = 123;

        await approveTokens(transactionManager.address, record.amount, user, tokenA);
        const { blockNumber } = await prepareAndAssert(transaction, record, user, transactionManager);

        const signature = await signFulfillTransactionPayload(transaction.transactionId, relayerFee.toString(), user);

        const fulfillParams: FulfillParams = {
          txData: { ...transaction, ...record, preparedBlockNumber: blockNumber },
          relayerFee: relayerFee,
          signature: signature,
          callData: EmptyBytes,
        };

        const res = await routerTransactionManager.fulfill(InvalidChainId, fulfillParams);

        expect(res.isOk()).to.be.false;
        expect(res.isErr()).to.be.true;

        expect(res.error.message).to.be.eq(TransactionManagerError.reasons.NoTransactionManagerAddress);
      });

      it("should error if transaction fails", async () => {
        const { transaction, record } = await getTransactionData();

        await approveTokens(transactionManager.address, record.amount, user, tokenA);
        const { blockNumber } = await prepareAndAssert(transaction, record, user, transactionManager);

        const signature = await signFulfillTransactionPayload(transaction.transactionId, relayerFee.toString(), user);

        const fulfillParams: FulfillParams = {
          txData: { ...transaction, ...record, preparedBlockNumber: 0 },
          relayerFee: relayerFee,
          signature: signature,
          callData: EmptyBytes,
        };

        const res = await routerTransactionManager.fulfill(transaction.sendingChainId, fulfillParams);

        expect(res.isOk()).to.be.false;
        expect(res.isErr()).to.be.true;

        expect(res.error.message).to.be.eq(TransactionManagerError.reasons.TxServiceError);
      });

      it("happy case", async () => {
        const { transaction, record } = await getTransactionData();

        await approveTokens(transactionManager.address, record.amount, user, tokenA);
        const { blockNumber } = await prepareAndAssert(transaction, record, user, transactionManager);

        const signature = await signFulfillTransactionPayload(transaction.transactionId, relayerFee.toString(), user);

        const fulfillParams: FulfillParams = {
          txData: { ...transaction, ...record, preparedBlockNumber: blockNumber },
          relayerFee: relayerFee,
          signature: signature,
          callData: EmptyBytes,
        };

        const res = await routerTransactionManager.fulfill(transaction.sendingChainId, fulfillParams);

        expect(res.isOk()).to.be.true;

        const receipt = await res.value.wait();
        expect(receipt.status).to.be.eq(1);
      });
    });

    describe("approveTokensIfNeeded", () => {
      it("should error if unfamiliar chainId", async () => {
        const InvalidChainId = 123;
        const res = await userTransactionManager.approveTokensIfNeeded(InvalidChainId, tokenA.address, "1");

        expect(res.isOk()).to.be.false;
        expect(res.isErr()).to.be.true;

        expect(res.error.message).to.be.eq(TransactionManagerError.reasons.NoTransactionManagerAddress);
      });

      it("happy case", async () => {
        const res = await userTransactionManager.approveTokensIfNeeded(sendingChainId, tokenA.address, "1");
        expect(res.isOk()).to.be.true;

        const receipt = await res.value.wait();
        expect(receipt.status).to.be.eq(1);
      });
    });

    describe.skip("establishListeners", () => {
      it("happy case", async () => {});
    });

    describe.skip("removeAllListeners", () => {
      it.skip("happy case", async () => {});
    });

    describe("getLiquidity", () => {
      it("should error if unfamiliar chainId", async () => {
        const InvalidChainId = 123;
        const res = await routerTransactionManager.getLiquidity(InvalidChainId, router.address, tokenB.address);

        expect(res.isOk()).to.be.false;
        expect(res.isErr()).to.be.true;

        expect(res.error.message).to.be.eq(TransactionManagerError.reasons.NoTransactionManagerAddress);
      });

      it("should error if txService error", async () => {
        const res = await routerTransactionManager.getLiquidity(sendingChainId, router.address, "0x");

        expect(res.isOk()).to.be.false;
        expect(res.isErr()).to.be.true;

        expect(res.error.message).to.be.eq(TransactionManagerError.reasons.TxServiceError);
      });

      it("happy case", async () => {
        const res = await routerTransactionManager.getLiquidity(receivingChainId, router.address, tokenB.address);

        expect(res.isOk()).to.be.true;
        expect(res.value.toString()).to.be.eq(routerFunds);
      });
    });
  });
});
