import { ethers, waffle } from "hardhat";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";

use(solidity);

import { hexlify, keccak256, randomBytes, defaultAbiCoder } from "ethers/lib/utils";
import { Wallet, BigNumberish, constants, providers, Contract } from "ethers";
import { RevertableERC20, TransactionManager, ERC20, RouterFactory } from "@connext/nxtp-contracts";

import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import RouterArtifact from "@connext/nxtp-contracts/artifacts/contracts/Router.sol/Router.json";
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
  InvariantTransactionDataEncoding,
  tidy,
} from "@connext/nxtp-utils";
import { deployContract, MAX_FEE_PER_GAS, getOnchainBalance } from "./utils";
import { getContractError } from "../src";

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
describe.only("Router Contract", function () {
  const [wallet, routerSigner, routerReceipient, user, receiver, gelato, other] =
    waffle.provider.getWallets() as Wallet[];
  let routerFactory: RouterFactory;
  let transactionManagerReceiverSide: TransactionManager;
  let token: RevertableERC20;
  let computedRouterAddress: string;
  let routerContract: Router;

  const sendingChainId = 1337;
  const receivingChainId = 1338;

  const fixture = async () => {
    transactionManagerReceiverSide = await deployContract<TransactionManager>(
      TransactionManagerArtifact,
      receivingChainId,
    );

    routerFactory = await deployContract<RouterFactory>("RouterFactory", wallet.address);
    const initTx = await routerFactory.init(transactionManagerReceiverSide.address);
    await initTx.wait();

    token = await deployContract<RevertableERC20>(RevertableERC20Artifact);

    return {
      routerFactory,
      transactionManagerReceiverSide,
      token,
    };
  };

  const addPrivileges = async (tm: TransactionManager, routers: string[], assets: string[]) => {
    for (const routerSigner of routers) {
      const tx = await tm.addRouter(routerSigner, { maxFeePerGas: MAX_FEE_PER_GAS });
      await tx.wait();
      expect(await tm.approvedRouters(routerSigner)).to.be.true;
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
    loadFixture = createFixtureLoader([wallet, routerSigner, user, receiver, other]);
  });

  beforeEach(async function () {
    ({ routerFactory, transactionManagerReceiverSide, token } = await loadFixture(fixture));

    const createTx: providers.TransactionResponse = await routerFactory
      .connect(routerSigner)
      .createRouter(routerSigner.address, routerReceipient.address);

    const receipt = await createTx.wait();
    expect(receipt.status).to.be.eq(1);

    computedRouterAddress = await routerFactory.getRouterAddress(routerSigner.address);
    routerContract = new Contract(computedRouterAddress, RouterArtifact.abi, ethers.provider) as Router;

    // Prep contracts with routerSigner and assets
    await addPrivileges(transactionManagerReceiverSide, [computedRouterAddress], [AddressZero, token.address]);

    const liq = "10000";
    let tx = await token.connect(wallet).transfer(routerSigner.address, liq);
    await tx.wait();

    await token.connect(wallet).transfer(computedRouterAddress, liq);

    await approveTokens(liq, routerSigner, transactionManagerReceiverSide.address);
    let addLiquidityTx = await transactionManagerReceiverSide
      .connect(routerSigner)
      .addLiquidityFor(liq, token.address, computedRouterAddress);
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
      router: computedRouterAddress,
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
      expect(computedRouterAddress).to.be.a("string");
    });

    it("should get transactionManagerAddress", async () => {
      expect(await routerContract.transactionManager()).to.eq(transactionManagerReceiverSide.address);
    });

    it("should get routerSigner", async () => {
      expect(await routerContract.routerSigner()).to.eq(routerSigner.address);
    });

    it("should get recipient", async () => {
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
        routerSigner.address,
        routerSigner,
      );
      const tx = await routerContract.connect(gelato).removeLiquidity(amount, assetId, signature);
      const receipt = await tx.wait();
      expect(receipt.status).to.eq(1);
    });
  });

  const prepare = async (
    transaction: InvariantTransactionData,
    record: VariantTransactionData,
    routerRelayerFeeAsset = token.address,
    routerRelayerFee = "0",
  ) => {
    const args = convertToPrepareArgs(transaction, record);

    const balance = await getOnchainBalance(token.address, computedRouterAddress, ethers.provider);
    console.log(balance.toString());

    const signature = await signRouterPrepareTransactionPayload(
      transaction,
      args.amount,
      args.expiry,
      args.encryptedCallData,
      args.encodedBid,
      args.bidSignature,
      args.encodedMeta,
      routerRelayerFeeAsset,
      routerRelayerFee,
      routerSigner,
    );
    const prepareTx = await routerContract
      .connect(gelato)
      .prepare(args, routerRelayerFeeAsset, routerRelayerFee, signature);

    const receipt = await prepareTx.wait();
    expect(receipt.status).to.be.eq(1);
    return receipt;
  };

  describe("prepare", () => {
    it("should fail to prepare a bad sig", async () => {
      const { transaction, record } = await getTransactionData();
      const routerRelayerFeeAsset = token.address;
      const routerRelayerFee = "1";

      const args = convertToPrepareArgs(transaction, record);
      const signature = await signRouterPrepareTransactionPayload(
        transaction,
        args.amount,
        args.expiry,
        args.encryptedCallData,
        args.encodedBid,
        args.bidSignature,
        args.encodedMeta,
        routerRelayerFeeAsset,
        routerRelayerFee,
        other, // bad signer
      );

      await expect(
        routerContract.connect(gelato).prepare(args, routerRelayerFeeAsset, routerRelayerFee, signature),
      ).to.be.revertedWith(getContractError("routerContract_prepare: INVALID_ROUTER_SIGNATURE"));
    });

    it("should prepare with a different sender", async () => {
      const { transaction, record } = await getTransactionData();

      await prepare(transaction, record);
    });

    it("should prepare with the signer and no sig", async () => {
      const { transaction, record } = await getTransactionData();

      const routerRelayerFeeAsset = token.address;
      const routerRelayerFee = "1";

      const args = convertToPrepareArgs(transaction, record);

      const prepareTx = await routerContract
        .connect(routerSigner)
        .prepare(args, routerRelayerFeeAsset, routerRelayerFee, "0x");

      const receipt = await prepareTx.wait();
      expect(receipt.status).to.be.eq(1);
      return receipt;
    });
  });

  describe("fulfill", () => {
    it("should fail to fulfill a bad sig", async () => {
      const { transaction, record } = await getTransactionData();
      const routerRelayerFeeAsset = token.address;
      const routerRelayerFee = "1";
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
        routerRelayerFeeAsset,
        routerRelayerFee,
        other, // bad signer
      );

      await expect(
        routerContract.connect(gelato).fulfill(args, routerRelayerFeeAsset, routerRelayerFee, signature),
      ).to.be.revertedWith("Router signature is not valid");
    });

    it("should fulfill with a different sender", async () => {
      const { transaction, record } = await getTransactionData();
      const routerRelayerFeeAsset = token.address;
      const routerRelayerFee = "1";

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
        routerRelayerFeeAsset,
        routerRelayerFee,
        routerSigner,
      );
      const fulfillTx = await routerContract
        .connect(gelato)
        .fulfill(args, routerRelayerFeeAsset, routerRelayerFee, signature);

      const receipt = await fulfillTx.wait();
      expect(receipt.status).to.be.eq(1);
      return receipt;
    });

    it("should fulfill with the signer and no sig", async () => {
      const { transaction, record } = await getTransactionData();
      const routerRelayerFeeAsset = token.address;
      const routerRelayerFee = "1";

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
      const fulfillTx = await routerContract
        .connect(routerSigner)
        .fulfill(args, routerRelayerFeeAsset, routerRelayerFee, "0x");

      const receipt = await fulfillTx.wait();
      expect(receipt.status).to.be.eq(1);
      return receipt;
    });
  });

  describe("cancel", () => {
    it("should fail to cancel a bad sig", async () => {
      const { transaction, record } = await getTransactionData();
      const routerRelayerFeeAsset = token.address;
      const routerRelayerFee = "1";

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
        routerRelayerFeeAsset,
        routerRelayerFee,
        other, // bad signer
      );

      await expect(
        routerContract.connect(gelato).cancel(args, routerRelayerFeeAsset, routerRelayerFee, signature),
      ).to.be.revertedWith("Router signature is not valid");
    });

    it("should cancel with a different sender", async () => {
      const { transaction, record } = await getTransactionData();
      const routerRelayerFeeAsset = token.address;
      const routerRelayerFee = "1";

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
        routerRelayerFeeAsset,
        routerRelayerFee,
        routerSigner,
      );
      const cancelTx = await routerContract
        .connect(gelato)
        .cancel(args, routerRelayerFeeAsset, routerRelayerFee, signature);

      const receipt = await cancelTx.wait();
      expect(receipt.status).to.be.eq(1);
      return receipt;
    });

    it("should cancel with the signer and no sig", async () => {
      const { transaction, record } = await getTransactionData();
      const routerRelayerFeeAsset = token.address;
      const routerRelayerFee = "1";

      await prepare(transaction, record);

      // Generate signature from user
      const cancelSignature = await signCancelTransactionPayload(
        transaction.transactionId,
        transaction.receivingChainId,
        transaction.receivingChainTxManagerAddress,
        user,
      );

      const args = convertToCancelArgs(transaction, record, cancelSignature);
      const cancelTx = await routerContract
        .connect(routerSigner)
        .cancel(args, routerRelayerFeeAsset, routerRelayerFee, "0x");

      const receipt = await cancelTx.wait();
      expect(receipt.status).to.be.eq(1);
      return receipt;
    });
  });
});
