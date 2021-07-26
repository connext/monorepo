import { ethers, waffle } from "hardhat";
import { expect } from "chai";
import { getRandomBytes32, InvariantTransactionData, VariantTransactionData } from "@connext/nxtp-utils";
import { utils, constants, Wallet, ContractReceipt } from "ethers";

import {
  Counter,
  TransactionManager as TransactionManagerTypechain,
  TestERC20,
} from "@connext/nxtp-contracts/typechain";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import CounterArtifact from "@connext/nxtp-contracts/artifacts/contracts/test/Counter.sol/Counter.json";
import TestERC20Artifact from "@connext/nxtp-contracts/artifacts/contracts/test/TestERC20.sol/TestERC20.json";

import pino from "pino";
import { TransactionManagerListener, TransactionManagerEvents } from "../src";
import { approveTokens, addPrivileges, assertReceiptEvent } from "./helper";

const { AddressZero } = constants;
const logger = pino({ level: process.env.LOG_LEVEL ?? "silent" });
const EmptyBytes = "0x";
const EmptyCallDataHash = utils.keccak256(EmptyBytes);

const createFixtureLoader = waffle.createFixtureLoader;
describe("Transaction Manager", function () {
  const [wallet, router, user, receiver] = waffle.provider.getWallets();

  const sendingChainId = 1337;
  const receivingChainId = 1338;
  const routerFunds = "1000";
  const userFunds = "100";

  let sendingSideTransactionManagerListener: TransactionManagerListener;
  let routerTransactionManagerListener: TransactionManagerListener;

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
      shares: "10",
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

    sendingSideTransactionManagerListener = new TransactionManagerListener(transactionManager, sendingChainId, logger);

    routerTransactionManagerListener = new TransactionManagerListener(
      transactionManagerReceiverSide,
      receivingChainId,
      logger,
    );
  });

  it("should deploy", async () => {
    expect(transactionManager.address).to.be.a("string");
    expect(tokenA.address).to.be.a("string");
    expect(tokenB.address).to.be.a("string");
  });

  const prepare = async (
    txOverrides: Partial<InvariantTransactionData>,
    recordOverrides: Partial<VariantTransactionData> = {},
    instance: TransactionManagerTypechain,
    preparer: Wallet,
    encryptedCallData: string = EmptyBytes,
  ): Promise<ContractReceipt> => {
    const { transaction, record } = await getTransactionData(txOverrides, recordOverrides);
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
    return receipt;
  };

  describe("class TransactionManagerListener", () => {
    it("happy case: already established listener", async () => {
      const res = sendingSideTransactionManagerListener.establishListeners();
      expect(res).to.be.undefined;
    });

    it("happy case: transaction prepared", async () => {
      const { transaction, record } = await getTransactionData();
      sendingSideTransactionManagerListener = new TransactionManagerListener(
        transactionManager,
        sendingChainId,
        logger,
      );
      sendingSideTransactionManagerListener.attach(TransactionManagerEvents.TransactionPrepared, (data) => {});
      await approveTokens(transactionManager.address, record.shares, user, tokenA);
      const { blockNumber } = await prepare(transaction, record, transactionManager, user);
    });
  });
});
