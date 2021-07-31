import { ethers, waffle } from "hardhat";
import { expect } from "chai";
import { getRandomBytes32, InvariantTransactionData, VariantTransactionData } from "@connext/nxtp-utils";
import {
  PrepareParams,
  FulfillParams,
  signCancelTransactionPayload,
  signFulfillTransactionPayload,
} from "@connext/nxtp-utils";
import { utils, constants } from "ethers";

import {
  Counter,
  TransactionManager as TransactionManagerTypechain,
  TestERC20,
} from "@connext/nxtp-contracts/typechain";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import CounterArtifact from "@connext/nxtp-contracts/artifacts/contracts/test/Counter.sol/Counter.json";
import TestERC20Artifact from "@connext/nxtp-contracts/artifacts/contracts/test/TestERC20.sol/TestERC20.json";

import pino, { BaseLogger } from "pino";
import { getDeployedTransactionManagerContractAddress, TransactionManager, TransactionManagerError } from "../../src";
import { approveTokens, addPrivileges, prepareAndAssert } from "../helper";

const { AddressZero } = constants;
const logger: BaseLogger = pino({ level: process.env.LOG_LEVEL ?? "silent" });
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

    transactionManager = (await transactionManagerFactory.deploy(sendingChainId)) as TransactionManagerTypechain;
    transactionManagerReceiverSide = (await transactionManagerFactory.deploy(
      receivingChainId,
    )) as TransactionManagerTypechain;

    tokenA = (await testERC20Factory.deploy()) as TestERC20;
    tokenB = (await testERC20Factory.deploy()) as TestERC20;

    counter = (await counterFactory.deploy()) as Counter;

    return { transactionManager, transactionManagerReceiverSide, tokenA, tokenB };
  };

  let loadFixture: ReturnType<typeof createFixtureLoader>;

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

        expect((res as any).error.message).to.be.eq(TransactionManagerError.reasons.NoTransactionManagerAddress);
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

        expect((res as any).error.message).to.be.eq(TransactionManagerError.reasons.TxServiceError);
      });

      it("happy case", async () => {
        const { transaction, record } = await getTransactionData();
        await approveTokens(transactionManager.address, record.amount, user, tokenA);
        await prepareAndAssert(transaction, record, user, transactionManager, userTransactionManager);
      });
    });

    describe("cancel", () => {
      const relayerFee = "1";

      it("should error if unfamiliar chainId", async () => {
        const { transaction, record } = await getTransactionData();
        const InvalidChainId = 123;

        await approveTokens(transactionManager.address, record.amount, user, tokenA);
        const { blockNumber } = await prepareAndAssert(
          transaction,
          record,
          user,
          transactionManager,
          userTransactionManager,
        );

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

        expect((res as any).error.message).to.be.eq(TransactionManagerError.reasons.NoTransactionManagerAddress);
      });

      it("should error if transaction fails", async () => {
        const { transaction, record } = await getTransactionData();

        await approveTokens(transactionManager.address, record.amount, user, tokenA);
        const { blockNumber } = await prepareAndAssert(
          transaction,
          record,
          user,
          transactionManager,
          userTransactionManager,
        );

        const signature = await signCancelTransactionPayload(transaction.transactionId, relayerFee.toString(), user);

        const cancelParams = {
          txData: { ...transaction, ...record, preparedBlockNumber: blockNumber },
          relayerFee: relayerFee,
          signature: signature,
        };

        const res = await userTransactionManager.cancel(transaction.sendingChainId, cancelParams);

        expect(res.isOk()).to.be.false;
        expect(res.isErr()).to.be.true;

        expect((res as any).error.message).to.be.eq(TransactionManagerError.reasons.TxServiceError);
      });

      it("happy case", async () => {
        const { transaction, record } = await getTransactionData();

        await approveTokens(transactionManager.address, record.amount, user, tokenA);
        const { blockNumber } = await prepareAndAssert(
          transaction,
          record,
          user,
          transactionManager,
          userTransactionManager,
        );

        const signature = await signCancelTransactionPayload(transaction.transactionId, relayerFee.toString(), user);

        const cancelParams = {
          txData: { ...transaction, ...record, preparedBlockNumber: blockNumber },
          relayerFee: relayerFee,
          signature: signature,
        };

        await setBlockTime(+record.expiry + 1_000);

        const res = await userTransactionManager.cancel(transaction.sendingChainId, cancelParams);
        expect(res.isOk()).to.be.true;

        const receipt = await (res as any).value.wait();

        expect(receipt.status).to.be.eq(1);
      });
    });

    describe("fulfill", () => {
      const relayerFee = "1";

      it("should error if unfamiliar chainId", async () => {
        const { transaction, record } = await getTransactionData();
        const InvalidChainId = 123;

        await approveTokens(transactionManager.address, record.amount, user, tokenA);
        const { blockNumber } = await prepareAndAssert(
          transaction,
          record,
          user,
          transactionManager,
          userTransactionManager,
        );

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

        expect((res as any).error.message).to.be.eq(TransactionManagerError.reasons.NoTransactionManagerAddress);
      });

      it("should error if transaction fails", async () => {
        const { transaction, record } = await getTransactionData();

        await approveTokens(transactionManager.address, record.amount, user, tokenA);
        const { blockNumber } = await prepareAndAssert(
          transaction,
          record,
          user,
          transactionManager,
          userTransactionManager,
        );

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

        expect((res as any).error.message).to.be.eq(TransactionManagerError.reasons.TxServiceError);
      });

      it("happy case", async () => {
        const { transaction, record } = await getTransactionData();

        await approveTokens(transactionManager.address, record.amount, user, tokenA);
        const { blockNumber } = await prepareAndAssert(
          transaction,
          record,
          user,
          transactionManager,
          userTransactionManager,
        );

        const signature = await signFulfillTransactionPayload(transaction.transactionId, relayerFee.toString(), user);

        const fulfillParams: FulfillParams = {
          txData: { ...transaction, ...record, preparedBlockNumber: blockNumber },
          relayerFee: relayerFee,
          signature: signature,
          callData: EmptyBytes,
        };

        const res = await routerTransactionManager.fulfill(transaction.sendingChainId, fulfillParams);

        expect(res.isOk()).to.be.true;

        const receipt = await (res as any).value.wait();
        expect(receipt.status).to.be.eq(1);
      });
    });

    describe("approveTokensIfNeeded", () => {
      it("should error if unfamiliar chainId", async () => {
        const InvalidChainId = 123;
        const res = await userTransactionManager.approveTokensIfNeeded(InvalidChainId, tokenA.address, "1");

        expect(res.isOk()).to.be.false;
        expect(res.isErr()).to.be.true;

        expect((res as any).error.message).to.be.eq(TransactionManagerError.reasons.NoTransactionManagerAddress);
      });

      it("happy case", async () => {
        const res = await userTransactionManager.approveTokensIfNeeded(sendingChainId, tokenA.address, "1");
        expect(res.isOk()).to.be.true;

        const receipt = await (res as any).value.wait();
        expect(receipt.status).to.be.eq(1);
      });
    });

    describe.skip("establishListeners", () => {
      it("happy case", async () => {});
    });

    describe.skip("removeAllListeners", () => {
      it.skip("happy case", async () => {});
    });

    describe("getRouterLiquidity", () => {
      it("should error if unfamiliar chainId", async () => {
        const InvalidChainId = 123;
        const res = await routerTransactionManager.getRouterLiquidity(InvalidChainId, router.address, tokenB.address);

        expect(res.isOk()).to.be.false;
        expect(res.isErr()).to.be.true;

        expect((res as any).error.message).to.be.eq(TransactionManagerError.reasons.NoTransactionManagerAddress);
      });

      it("should error if txService error", async () => {
        const res = await routerTransactionManager.getRouterLiquidity(sendingChainId, router.address, "0x");

        expect(res.isOk()).to.be.false;
        expect(res.isErr()).to.be.true;

        expect((res as any).error.message).to.be.eq(TransactionManagerError.reasons.TxServiceError);
      });

      it("happy case", async () => {
        const res = await routerTransactionManager.getRouterLiquidity(receivingChainId, router.address, tokenB.address);

        expect(res.isOk()).to.be.true;
        expect((res as any).value.toString()).to.be.eq(routerFunds);
      });
    });
  });
});
