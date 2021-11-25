import { ethers, waffle } from "hardhat";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";

use(solidity);

import { hexlify, keccak256, randomBytes } from "ethers/lib/utils";
import { Wallet, BigNumberish, constants } from "ethers";
import { RevertableERC20, TransactionManager, ERC20 } from "@connext/nxtp-contracts";

import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import RevertableERC20Artifact from "@connext/nxtp-contracts/artifacts/contracts/test/RevertableERC20.sol/RevertableERC20.json";

import {
  InvariantTransactionData,
  signCancelTransactionPayload,
  signFulfillTransactionPayload,
  VariantTransactionData,
  signRemoveLiquidityTransactionPayload,
  signRouterCancelTransactionPayload,
  signRouterFulfillTransactionPayload,
  signRouterPrepareTransactionPayload,
} from "@connext/nxtp-utils";
import { deployContract, MAX_FEE_PER_GAS } from "./utils";

// import types
import { Router } from "../typechain";

const convertToPrepareArgs = (transaction: InvariantTransactionData, record: VariantTransactionData) => {
  const args = {
    invariantData: transaction,
    amount: record.amount,
    expiry: record.expiry,
    encryptedCallData: EmptyBytes,
    encodedBid: EmptyBytes,
    bidSignature: EmptyBytes,
    encodedMeta: EmptyBytes,
  };
  return args;
};

const convertToFulfillArgs = (
  transaction: InvariantTransactionData,
  record: VariantTransactionData,
  relayerFee: string,
  signature: string,
  callData: string = EmptyBytes,
) => {
  const args = {
    txData: {
      ...transaction,
      ...record,
    },
    relayerFee,
    signature,
    callData,
    encodedMeta: EmptyBytes,
  };
  return args;
};

const convertToCancelArgs = (
  transaction: InvariantTransactionData,
  record: VariantTransactionData,
  signature: string,
) => {
  const args = {
    txData: {
      ...transaction,
      ...record,
    },
    signature,
    encodedMeta: EmptyBytes,
  };
  return args;
};

const { AddressZero } = constants;
const EmptyBytes = "0x";
const EmptyCallDataHash = keccak256(EmptyBytes);

const createFixtureLoader = waffle.createFixtureLoader;
describe("Router Contract", function () {
  const [wallet, router, routerReceipient, user, receiver, gelato, other] = waffle.provider.getWallets() as Wallet[];
  let routerContract: Router;
  let transactionManagerReceiverSide: TransactionManager;
  let token: RevertableERC20;
  const sendingChainId = 1337;
  const receivingChainId = 1338;

  const fixture = async () => {
    transactionManagerReceiverSide = await deployContract<TransactionManager>(
      TransactionManagerArtifact,
      receivingChainId,
    );

    routerContract = await deployContract<Router>(
      "Router",
      transactionManagerReceiverSide.address,
      router.address,
      routerReceipient.address,
      router.address,
      receivingChainId,
    );

    token = await deployContract<RevertableERC20>(RevertableERC20Artifact);

    return {
      routerContract,
      transactionManagerReceiverSide,
      token,
    };
  };

  const addPrivileges = async (tm: TransactionManager, routers: string[], assets: string[]) => {
    for (const router of routers) {
      const tx = await tm.addRouter(router, { maxFeePerGas: MAX_FEE_PER_GAS });
      await tx.wait();
      expect(await tm.approvedRouters(router)).to.be.true;
    }

    for (const assetId of assets) {
      const tx = await tm.addAssetId(assetId, {
        maxFeePerGas: MAX_FEE_PER_GAS,
      });
      await tx.wait();
      expect(await tm.approvedAssets(assetId)).to.be.true;
    }
  };

  const approveTokens = async (amount: BigNumberish, approver: Wallet, spender: string, asset: ERC20 = token) => {
    const approveTx = await asset.connect(approver).approve(spender, amount);
    await approveTx.wait();
    const allowance = await asset.allowance(approver.address, spender);
    expect(allowance).to.be.at.least(amount);
  };

  let loadFixture: ReturnType<typeof createFixtureLoader>;
  before("create fixture loader", async () => {
    loadFixture = createFixtureLoader([wallet, router, user, receiver, other]);
  });

  beforeEach(async function () {
    ({ transactionManagerReceiverSide, token } = await loadFixture(fixture));

    // Prep contracts with router and assets
    await addPrivileges(transactionManagerReceiverSide, [routerContract.address], [AddressZero, token.address]);

    const liq = "10000";
    let tx = await token.connect(wallet).transfer(router.address, liq);
    await tx.wait();

    await approveTokens(liq, router, transactionManagerReceiverSide.address);
    let addLiquidityTx = await transactionManagerReceiverSide
      .connect(router)
      .addLiquidityFor(liq, token.address, routerContract.address);
    await addLiquidityTx.wait();
  });

  const getTransactionData = async (
    txOverrides: Partial<InvariantTransactionData> = {},
    recordOverrides: Partial<VariantTransactionData> = {},
  ): Promise<{
    transaction: InvariantTransactionData;
    record: VariantTransactionData;
  }> => {
    const transaction = {
      receivingChainTxManagerAddress: transactionManagerReceiverSide.address,
      user: user.address,
      router: routerContract.address,
      initiator: user.address,
      sendingAssetId: AddressZero,
      receivingAssetId: token.address,
      sendingChainFallback: user.address,
      callTo: AddressZero,
      receivingAddress: receiver.address,
      callDataHash: EmptyCallDataHash,
      transactionId: hexlify(randomBytes(32)),
      sendingChainId: sendingChainId,
      receivingChainId: receivingChainId,
      ...txOverrides,
    };

    const day = 24 * 60 * 60;
    const block = await ethers.provider.getBlock("latest");
    const record = {
      amount: "10",
      expiry: block.timestamp + day + 5_000,
      preparedBlockNumber: 10,
      ...recordOverrides,
    };

    return { transaction, record };
  };

  describe("constructor", async () => {
    it("should deploy", async () => {
      expect(routerContract.address).to.be.a("string");
    });

    it("should set transactionManagerAddress", async () => {
      expect(await routerContract.transactionManager()).to.eq(transactionManagerReceiverSide.address);
    });

    // it("should set routerSigner", async () => {
    //   expect(await routerContract.signer()).to.eq(router.address);
    // });

    it("should set recipient", async () => {
      expect(await routerContract.recipient()).to.eq(routerReceipient.address);
    });
  });

  describe("removeLiquidity", () => {
    it("should remove liquidity", async () => {
      const amount = "100";
      const assetId = token.address;
      const signature = await signRemoveLiquidityTransactionPayload(
        amount,
        assetId,
        receivingChainId,
        router.address,
        router,
      );
      const tx = await routerContract.removeLiquidity(amount, assetId, signature);
      const receipt = await tx.wait();
      expect(receipt.status).to.eq(1);
    });
  });

  const prepare = async (transaction: InvariantTransactionData, record: VariantTransactionData) => {
    const args = convertToPrepareArgs(transaction, record);

    const signature = await signRouterPrepareTransactionPayload(
      transaction,
      args.amount,
      args.expiry,
      args.encryptedCallData,
      args.encodedBid,
      args.bidSignature,
      args.encodedMeta,
      router,
    );
    const prepareTx = await routerContract.connect(gelato).prepare(args, signature);

    const receipt = await prepareTx.wait();
    expect(receipt.status).to.be.eq(1);
    return receipt;
  };

  describe("prepare", () => {
    it("should fail to prepare a bad sig", async () => {
      const { transaction, record } = await getTransactionData();

      const args = convertToPrepareArgs(transaction, record);
      const signature = await signRouterPrepareTransactionPayload(
        transaction,
        args.amount,
        args.expiry,
        args.encryptedCallData,
        args.encodedBid,
        args.bidSignature,
        args.encodedMeta,
        other, // bad signer
      );

      await expect(routerContract.connect(gelato).prepare(args, signature)).to.be.revertedWith(
        "Router signature is not valid",
      );
    });

    it("should prepare with a different sender", async () => {
      const { transaction, record } = await getTransactionData();

      await prepare(transaction, record);
    });

    it("should prepare with the signer and no sig", async () => {
      const { transaction, record } = await getTransactionData();

      const args = convertToPrepareArgs(transaction, record);

      const prepareTx = await routerContract.connect(router).prepare(args, "0x");

      const receipt = await prepareTx.wait();
      expect(receipt.status).to.be.eq(1);
      return receipt;
    });
  });

  describe("fulfill", () => {
    it("should fail to fulfill a bad sig", async () => {
      const { transaction, record } = await getTransactionData();

      await prepare(transaction, record);

      // Generate signature from user
      const fulfillSignature = await signFulfillTransactionPayload(
        transaction.transactionId,
        "0",
        transaction.receivingChainId,
        transaction.receivingChainTxManagerAddress,
        user,
      );

      const args = convertToFulfillArgs(transaction, record, "0", fulfillSignature);
      const signature = await signRouterFulfillTransactionPayload(
        args.txData,
        fulfillSignature,
        args.callData,
        args.encodedMeta,
        other, // bad signer
      );

      await expect(routerContract.connect(gelato).fulfill(args, signature)).to.be.revertedWith(
        "Router signature is not valid",
      );
    });

    it("should fulfill with a different sender", async () => {
      const { transaction, record } = await getTransactionData();

      await prepare(transaction, record);

      // Generate signature from user
      const fulfillSignature = await signFulfillTransactionPayload(
        transaction.transactionId,
        "0",
        transaction.receivingChainId,
        transaction.receivingChainTxManagerAddress,
        user,
      );

      const args = convertToFulfillArgs(transaction, record, "0", fulfillSignature);
      const signature = await signRouterFulfillTransactionPayload(
        args.txData,
        args.signature,
        args.callData,
        args.encodedMeta,
        router,
      );
      const fulfillTx = await routerContract.connect(gelato).fulfill(args, signature);

      const receipt = await fulfillTx.wait();
      expect(receipt.status).to.be.eq(1);
      return receipt;
    });

    it("should fulfill with the signer and no sig", async () => {
      const { transaction, record } = await getTransactionData();

      await prepare(transaction, record);

      // Generate signature from user
      const fulfillSignature = await signFulfillTransactionPayload(
        transaction.transactionId,
        "0",
        transaction.receivingChainId,
        transaction.receivingChainTxManagerAddress,
        user,
      );

      const args = convertToFulfillArgs(transaction, record, "0", fulfillSignature);
      const fulfillTx = await routerContract.connect(router).fulfill(args, "0x");

      const receipt = await fulfillTx.wait();
      expect(receipt.status).to.be.eq(1);
      return receipt;
    });
  });

  describe("cancel", () => {
    it("should fail to cancel a bad sig", async () => {
      const { transaction, record } = await getTransactionData();

      await prepare(transaction, record);

      // Generate signature from user
      const cancelSignature = await signCancelTransactionPayload(
        transaction.transactionId,
        transaction.receivingChainId,
        transaction.receivingChainTxManagerAddress,
        user,
      );

      const args = convertToCancelArgs(transaction, record, cancelSignature);
      const signature = await signRouterCancelTransactionPayload(
        args.txData,
        cancelSignature,
        args.encodedMeta,
        other, // bad signer
      );

      await expect(routerContract.connect(gelato).cancel(args, signature)).to.be.revertedWith(
        "Router signature is not valid",
      );
    });

    it("should cancel with a different sender", async () => {
      const { transaction, record } = await getTransactionData();

      await prepare(transaction, record);

      // Generate signature from user
      const cancelSignature = await signCancelTransactionPayload(
        transaction.transactionId,
        transaction.receivingChainId,
        transaction.receivingChainTxManagerAddress,
        user,
      );

      const args = convertToCancelArgs(transaction, record, cancelSignature);
      const signature = await signRouterCancelTransactionPayload(
        args.txData,
        cancelSignature,
        args.encodedMeta,
        router,
      );
      const cancelTx = await routerContract.connect(gelato).cancel(args, signature);

      const receipt = await cancelTx.wait();
      expect(receipt.status).to.be.eq(1);
      return receipt;
    });

    it("should cancel with the signer and no sig", async () => {
      const { transaction, record } = await getTransactionData();

      await prepare(transaction, record);

      // Generate signature from user
      const cancelSignature = await signCancelTransactionPayload(
        transaction.transactionId,
        transaction.receivingChainId,
        transaction.receivingChainTxManagerAddress,
        user,
      );

      const args = convertToCancelArgs(transaction, record, cancelSignature);
      const cancelTx = await routerContract.connect(router).cancel(args, "0x");

      const receipt = await cancelTx.wait();
      expect(receipt.status).to.be.eq(1);
      return receipt;
    });
  });
});
