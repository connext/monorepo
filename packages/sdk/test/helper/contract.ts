import { ethers } from "hardhat";
import { expect } from "chai";
import { InvariantTransactionData, VariantTransactionData } from "@connext/nxtp-utils";
import { PrepareParams, getInvariantTransactionDigest, getVariantTransactionDigest } from "@connext/nxtp-utils";
import { Wallet, utils, BigNumber, constants, ContractReceipt } from "ethers";

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

import { TransactionManager } from "../../src/transactionManager/transactionManager";
import { getOnchainBalance } from "./util";

const { AddressZero } = constants;
const EmptyBytes = "0x";

export const setBlockTime = async (desiredTimestamp: number) => {
  await ethers.provider.send("evm_setNextBlockTimestamp", [desiredTimestamp]);
};

export const fixture = async (deployer: Wallet, sendingChainId, receivingChainId) => {
  const transactionManagerFactory = await ethers.getContractFactory(
    TransactionManagerArtifact.abi,
    TransactionManagerArtifact.bytecode,
    deployer,
  );
  const counterFactory = await ethers.getContractFactory(CounterArtifact.abi, CounterArtifact.bytecode, deployer);
  const testERC20Factory = await ethers.getContractFactory(TestERC20Artifact.abi, TestERC20Artifact.bytecode, deployer);
  const interpreterFactory = await ethers.getContractFactory(
    FulfillInterpreterArtifact.abi,
    FulfillInterpreterArtifact.bytecode,
    deployer,
  );

  const interpreter = (await interpreterFactory.deploy()) as FulfillInterpreter;

  const transactionManager = (await transactionManagerFactory.deploy(
    sendingChainId,
    interpreter.address,
  )) as TransactionManagerTypechain;

  const transactionManagerReceiverSide = (await transactionManagerFactory.deploy(
    receivingChainId,
    interpreter.address,
  )) as TransactionManagerTypechain;

  const tokenA = (await testERC20Factory.deploy()) as TestERC20;
  const tokenB = (await testERC20Factory.deploy()) as TestERC20;

  const counter = (await counterFactory.deploy()) as Counter;

  return { transactionManager, transactionManagerReceiverSide, counter, tokenA, tokenB };
};

export const addPrivileges = async (
  tm: TransactionManagerTypechain,
  routers: string[],
  assets: string[],
  conditions: string[],
) => {
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

  for (const condition of conditions) {
    const tx = await tm.addCondition(condition);
    await tx.wait();
    expect(await tm.approvedConditions(condition)).to.be.true;
  }
};

export const assertObject = (expected: any, returned: any) => {
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

export const assertReceiptEvent = async (receipt: ContractReceipt, eventName: string, expected: any) => {
  expect(receipt.status).to.be.eq(1);
  const idx = receipt.events?.findIndex((e) => e.event === eventName) ?? -1;
  expect(idx).to.not.be.eq(-1);
  const decoded = receipt.events![idx].decode!(receipt.events![idx].data, receipt.events![idx].topics);
  assertObject(expected, decoded);
};

export const prepareAndAssert = async (
  transaction: InvariantTransactionData,
  record: VariantTransactionData,
  preparer: Wallet,
  instance: TransactionManagerTypechain,
  transactionManagerObj: TransactionManager,
  encryptedCallData: string = EmptyBytes,
) => {
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
  await expect(instance.variantTransactionData(invariantDigest)).to.eventually.be.eq(utils.formatBytes32String(""));
  // Send tx
  const prepareParams: PrepareParams = {
    txData: transaction,
    amount: record.amount,
    expiry: record.expiry,
    encryptedCallData: encryptedCallData,
    encodedBid: EmptyBytes,
    bidSignature: EmptyBytes,
  };

  const prepareReq = await transactionManagerObj.prepare(transaction.sendingChainId, prepareParams);
  const receipt = await (await preparer.sendTransaction(prepareReq)).wait();
  expect(receipt.status).to.be.eq(1);

  const variantDigest = getVariantTransactionDigest({
    amount: record.amount,
    expiry: record.expiry,
    preparedBlockNumber: receipt.blockNumber,
  });
  await expect(instance.variantTransactionData(invariantDigest)).to.eventually.be.eq(variantDigest);
  // Verify receipt event
  // const txData = { ...transaction, ...record, preparedBlockNumber: receipt.blockNumber };
  // await assertReceiptEvent(receipt, "TransactionPrepared", {
  //   user: transaction.user,
  //   router: transaction.router,
  //   transactionId: transaction.transactionId,
  //   txData,
  //   caller: preparer.address,
  //   args: {
  //     invariantData: prepareParams.txData,
  //     amount: prepareParams.amount,
  //     expiry: prepareParams.expiry,
  //     encryptedCallData,
  //     bidSignature: EmptyBytes,
  //     encodedBid: EmptyBytes,
  //     encodedMeta: EmptyBytes,
  //   },
  // });

  // Verify amount has been deducted from preparer
  const finalPreparerAmount = userSending
    ? await getOnchainBalance(transaction.sendingAssetId, preparer.address, ethers.provider)
    : await instance.routerBalances(transaction.router, transaction.receivingAssetId);
  const expected = initialPreparerAmount.sub(record.amount);
  expect(finalPreparerAmount).to.be.eq(
    transaction.sendingAssetId === AddressZero && userSending
      ? expected.sub(res.gasPrice!.mul(receipt.cumulativeGasUsed!))
      : expected,
  );

  // Verify amount has been added to contract
  if (!userSending) {
    // Router does not send funds
    return receipt;
  }
  const finalContractAmount = await getOnchainBalance(transaction.sendingAssetId, instance.address, ethers.provider);
  expect(finalContractAmount).to.be.eq(initialContractAmount.add(record.amount));

  return receipt;
};
