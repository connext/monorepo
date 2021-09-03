import { ethers, waffle } from "hardhat";
import {
  PrepareParams,
  FulfillParams,
  signCancelTransactionPayload,
  signFulfillTransactionPayload,
  getRandomBytes32,
  InvariantTransactionData,
  VariantTransactionData,
} from "@connext/nxtp-utils";
import { expect } from "@connext/nxtp-utils/src/expect";
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
import { approveTokens, addPrivileges, prepareAndAssert } from "../helper";
import { TransactionManager, getDeployedTransactionManagerContract } from "../../src/transactionManager";
import { ChainNotConfigured } from "../../src/error";

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

  const supportedChains = [sendingChainId.toString(), receivingChainId.toString()];

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
      receivingChainTxManagerAddress: transactionManagerReceiverSide.address,
      user: user.address,
      router: router.address,
      sendingAssetId: tokenA.address,
      receivingAssetId: tokenB.address,
      sendingChainFallback: user.address,
      callTo: AddressZero,
      receivingAddress: receiver.address,
      callDataHash: EmptyCallDataHash,
      transactionId: getRandomBytes32(),
      sendingChainId: (await transactionManager.getChainId()).toNumber(),
      receivingChainId: (await transactionManagerReceiverSide.getChainId()).toNumber(),
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
      .addLiquidityFor(routerFunds, tokenB.address, router.address);
    await tx.wait();

    userTransactionManager = new TransactionManager(
      user,
      {
        [sendingChainId]: {
          provider: user.provider,
          transactionManagerAddress: transactionManager.address,
        },
        [receivingChainId]: {
          provider: user.provider,
          transactionManagerAddress: transactionManagerReceiverSide.address,
        },
      },
      logger,
    );

    routerTransactionManager = new TransactionManager(
      router,
      {
        [sendingChainId]: {
          provider: router.provider,
          transactionManagerAddress: transactionManager.address,
        },
        [receivingChainId]: {
          provider: router.provider,
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

  describe("#getDeployedTransactionManagerContract", () => {
    it("should undefined if no transaction manager", () => {
      const res = getDeployedTransactionManagerContract(0);
      expect(res).to.be.undefined;
    });

    it("happy func", () => {
      const res = getDeployedTransactionManagerContract(4);
      expect(res).to.be.ok;
    });
  });

  describe("getDeployedTransactionManagerContract", () => {
    it("happy case: returns undefined", async () => {
      const chainId = sendingChainId;
      const res = getDeployedTransactionManagerContract(chainId);
      expect(res).to.be.undefined;
    });
    it("happy case", async () => {
      const chainId = 5;
      const res = getDeployedTransactionManagerContract(chainId);
      expect(res.address).to.be.a("string");
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

        await expect(userTransactionManager.prepare(InvalidChainId, prepareParams)).to.be.rejectedWith(
          ChainNotConfigured.getMessage(InvalidChainId, supportedChains),
        );
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

        await expect(userTransactionManager.prepare(transaction.sendingChainId, prepareParams)).to.be.rejectedWith(
          "cannot estimate gas",
        );
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

        const signature = await signCancelTransactionPayload(
          transaction.transactionId,
          transaction.receivingChainId,
          transaction.receivingChainTxManagerAddress,
          user,
        );

        const cancelParams = {
          txData: { ...transaction, ...record, preparedBlockNumber: blockNumber },
          relayerFee: relayerFee,
          signature: signature,
        };

        await setBlockTime(+record.expiry + 1_000);

        await expect(userTransactionManager.cancel(InvalidChainId, cancelParams)).to.be.rejectedWith(
          ChainNotConfigured.getMessage(InvalidChainId, supportedChains),
        );
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

        const signature = await signCancelTransactionPayload(
          transaction.transactionId,
          transaction.receivingChainId,
          transaction.receivingChainTxManagerAddress,
          user,
        );

        const cancelParams = {
          txData: { ...transaction, ...record, preparedBlockNumber: blockNumber },
          relayerFee: relayerFee,
          signature: signature,
        };

        await expect(userTransactionManager.cancel(transaction.sendingChainId, cancelParams)).to.be.rejectedWith(
          "cannot estimate gas",
        );
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

        const signature = await signCancelTransactionPayload(
          transaction.transactionId,
          transaction.receivingChainId,
          transaction.receivingChainTxManagerAddress,
          user,
        );

        const cancelParams = {
          txData: { ...transaction, ...record, preparedBlockNumber: blockNumber },
          relayerFee: relayerFee,
          signature: signature,
        };

        await setBlockTime(+record.expiry + 1_000);

        const res = await userTransactionManager.cancel(transaction.sendingChainId, cancelParams);

        const receipt = await res.wait();

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

        const signature = await signFulfillTransactionPayload(
          transaction.transactionId,
          relayerFee.toString(),
          transaction.receivingChainId,
          transaction.receivingChainTxManagerAddress,
          user,
        );

        const fulfillParams: FulfillParams = {
          txData: { ...transaction, ...record, preparedBlockNumber: blockNumber },
          relayerFee: relayerFee,
          signature: signature,
          callData: EmptyBytes,
        };

        await expect(routerTransactionManager.fulfill(InvalidChainId, fulfillParams)).to.be.rejectedWith(
          ChainNotConfigured.getMessage(InvalidChainId, supportedChains),
        );
      });

      it("should error if transaction fails", async () => {
        const { transaction, record } = await getTransactionData();

        await approveTokens(transactionManager.address, record.amount, user, tokenA);
        await prepareAndAssert(transaction, record, user, transactionManager, userTransactionManager);

        const signature = await signFulfillTransactionPayload(
          transaction.transactionId,
          relayerFee.toString(),
          transaction.receivingChainId,
          transaction.receivingChainTxManagerAddress,
          user,
        );

        const fulfillParams: FulfillParams = {
          txData: { ...transaction, ...record, preparedBlockNumber: 0 },
          relayerFee: relayerFee,
          signature: signature,
          callData: EmptyBytes,
        };

        await expect(routerTransactionManager.fulfill(transaction.sendingChainId, fulfillParams)).to.be.rejectedWith(
          "cannot estimate gas",
        );
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

        const signature = await signFulfillTransactionPayload(
          transaction.transactionId,
          relayerFee.toString(),
          transaction.receivingChainId,
          transaction.receivingChainTxManagerAddress,
          user,
        );

        const fulfillParams: FulfillParams = {
          txData: { ...transaction, ...record, preparedBlockNumber: blockNumber },
          relayerFee: relayerFee,
          signature: signature,
          callData: EmptyBytes,
        };

        const res = await routerTransactionManager.fulfill(transaction.sendingChainId, fulfillParams);

        const receipt = await res.wait();
        expect(receipt.status).to.be.eq(1);
      });
    });

    describe("approveTokensIfNeeded", () => {
      it("should error if unfamiliar chainId", async () => {
        const InvalidChainId = 123;
        await expect(
          userTransactionManager.approveTokensIfNeeded(InvalidChainId, tokenA.address, "1"),
        ).to.be.rejectedWith(ChainNotConfigured.getMessage(InvalidChainId, supportedChains));
      });

      it("happy case", async () => {
        const res = await userTransactionManager.approveTokensIfNeeded(sendingChainId, tokenA.address, "1");

        const receipt = await res.wait();
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
        await expect(
          routerTransactionManager.getRouterLiquidity(InvalidChainId, router.address, tokenB.address),
        ).to.be.rejectedWith(ChainNotConfigured.getMessage(InvalidChainId, supportedChains));
      });

      it("should error if txService error", async () => {
        await expect(
          routerTransactionManager.getRouterLiquidity(sendingChainId, router.address, "0x"),
        ).to.be.rejectedWith("invalid address");
      });

      it("happy case", async () => {
        const res = await routerTransactionManager.getRouterLiquidity(receivingChainId, router.address, tokenB.address);
        expect(res.toString()).to.be.eq(routerFunds);
      });
    });
  });
});
