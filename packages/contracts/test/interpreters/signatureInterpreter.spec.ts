import { waffle } from "hardhat";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
import { Wallet } from "ethers";
import { deployContract } from "../utils";
import { SignatureInterpreter } from "../../typechain";
import { signCancelTransactionPayload, signFulfillTransactionPayload, txDataMock } from "@connext/nxtp-utils";
use(solidity);

describe("SignatureInterpreter.sol", () => {
  const createFixtureLoader = waffle.createFixtureLoader;
  const [wallet, other] = waffle.provider.getWallets() as Wallet[];

  let signatureInterpreter: SignatureInterpreter;

  const fixture = async () => {
    signatureInterpreter = await deployContract<SignatureInterpreter>("SignatureInterpreter");
  };

  let loadFixture: ReturnType<typeof createFixtureLoader>;
  before(async () => {
    loadFixture = createFixtureLoader([wallet, other]);
  });

  beforeEach(async () => {
    await loadFixture(fixture);
  });

  describe("shouldFulfill", () => {
    it("should fail if the transaction manager id is not the sending or receiving chainId", async () => {
      const user = Wallet.createRandom();
      const txData = {
        ...txDataMock,
        user: user.address,
      };
      const relayerFee = "0";
      const signature = await signFulfillTransactionPayload(
        txData.transactionId,
        relayerFee,
        txData.receivingChainId,
        txData.receivingChainTxManagerAddress,
        user,
      );
      await expect(signatureInterpreter.shouldFulfill(txData, signature, relayerFee, 1)).revertedWith("#SI:012");
    });

    it("should return true if user signed", async () => {
      const user = Wallet.createRandom();
      const txData = {
        ...txDataMock,
        user: user.address,
      };
      const relayerFee = "0";
      const signature = await signFulfillTransactionPayload(
        txData.transactionId,
        relayerFee,
        txData.receivingChainId,
        txData.receivingChainTxManagerAddress,
        user,
      );
      const result = await signatureInterpreter.shouldFulfill(txData, signature, relayerFee, txData.receivingChainId);
      expect(result).to.be.true;
    });

    it("should work on the sending chain if user signed", async () => {
      const user = Wallet.createRandom();
      const txData = {
        ...txDataMock,
        user: user.address,
      };
      const relayerFee = "0";
      const signature = await signFulfillTransactionPayload(
        txData.transactionId,
        relayerFee,
        txData.receivingChainId,
        txData.receivingChainTxManagerAddress,
        user,
      );
      const result = await signatureInterpreter.shouldFulfill(txData, signature, relayerFee, txData.sendingChainId);
      expect(result).to.be.true;
    });

    it("should return false if user did not sign", async () => {
      const user = Wallet.createRandom();
      const txData = {
        ...txDataMock,
      };
      const relayerFee = "0";
      const signature = await signFulfillTransactionPayload(
        txData.transactionId,
        relayerFee,
        txData.receivingChainId,
        txData.receivingChainTxManagerAddress,
        user,
      );
      const result = await signatureInterpreter.shouldFulfill(txData, signature, relayerFee, txData.receivingChainId);
      expect(result).to.be.false;
    });

    it("should return false if user signed wrong payload", async () => {
      const user = Wallet.createRandom();
      const txData = {
        ...txDataMock,
      };
      const relayerFee = "0";
      const signature = await signCancelTransactionPayload(
        txData.transactionId,
        txData.receivingChainId,
        txData.receivingChainTxManagerAddress,
        user,
      );
      const result = await signatureInterpreter.shouldFulfill(txData, signature, relayerFee, txData.receivingChainId);
      expect(result).to.be.false;
    });
  });

  describe("shouldCancel", () => {
    it("should fail if the transaction manager id is not the sending or receiving chainId", async () => {
      const user = Wallet.createRandom();
      const txData = {
        ...txDataMock,
        user: user.address,
      };
      const signature = await signCancelTransactionPayload(
        txData.transactionId,
        txData.receivingChainId,
        txData.receivingChainTxManagerAddress,
        user,
      );
      await expect(signatureInterpreter.shouldCancel(txData, signature, 1)).revertedWith("#SI:012");
    });

    it("should return true if user signed", async () => {
      const user = Wallet.createRandom();
      const txData = {
        ...txDataMock,
        user: user.address,
      };
      const signature = await signCancelTransactionPayload(
        txData.transactionId,
        txData.receivingChainId,
        txData.receivingChainTxManagerAddress,
        user,
      );
      const result = await signatureInterpreter.shouldCancel(txData, signature, txData.receivingChainId);
      expect(result).to.be.true;
    });

    it("should return true if user signed and submitted on the sending chain", async () => {
      const user = Wallet.createRandom();
      const txData = {
        ...txDataMock,
        user: user.address,
      };
      const signature = await signCancelTransactionPayload(
        txData.transactionId,
        txData.receivingChainId,
        txData.receivingChainTxManagerAddress,
        user,
      );
      const result = await signatureInterpreter.shouldCancel(txData, signature, txData.sendingChainId);
      expect(result).to.be.true;
    });

    it("should return false if user did not sign", async () => {
      const user = Wallet.createRandom();
      const txData = {
        ...txDataMock,
      };
      const signature = await signCancelTransactionPayload(
        txData.transactionId,
        txData.receivingChainId,
        txData.receivingChainTxManagerAddress,
        user,
      );
      const result = await signatureInterpreter.shouldCancel(txData, signature, txData.receivingChainId);
      expect(result).to.be.false;
    });

    it("should return false if user signed the wrong payload", async () => {
      const user = Wallet.createRandom();
      const txData = {
        ...txDataMock,
      };
      const signature = await signFulfillTransactionPayload(
        txData.transactionId,
        "0",
        txData.receivingChainId,
        txData.receivingChainTxManagerAddress,
        user,
      );
      const result = await signatureInterpreter.shouldCancel(txData, signature, txData.receivingChainId);
      expect(result).to.be.false;
    });
  });
});
