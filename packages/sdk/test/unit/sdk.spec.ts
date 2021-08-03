import {
  mkAddress,
  UserNxtpNatsMessagingService,
  getRandomBytes32,
  InvariantTransactionData,
  VariantTransactionData,
  AuctionBid,
} from "@connext/nxtp-utils";
import { err, ok } from "neverthrow";
import { expect } from "chai";
import { providers, Wallet, constants, utils } from "ethers";
import pino from "pino";
import { createStubInstance, reset, restore, SinonStubbedInstance, stub } from "sinon";

import {
  CrossChainParams,
  NxtpSdk,
  NxtpSdkError,
  NxtpSdkEvents,
  MAX_SLIPPAGE_TOLERANCE,
  getMinExpiryBuffer,
  getMaxExpiryBuffer,
} from "../../src/sdk";

import { Subgraph, ActiveTransaction } from "../../src/subgraph";
import { TransactionManager, TransactionManagerError } from "../../src/transactionManager";
import { TxResponse, EmptyBytes, EmptyCallDataHash } from "../helper";

import * as nxtpUtils from "@connext/nxtp-utils";

const logger = pino({ level: process.env.LOG_LEVEL ?? "silent" });

const { AddressZero } = constants;
const response = "connected";

describe("NxtpSdk", () => {
  let sdk: NxtpSdk;
  let signer: SinonStubbedInstance<Wallet>;
  let messaging: SinonStubbedInstance<UserNxtpNatsMessagingService>;
  let subgraph: SinonStubbedInstance<Subgraph>;
  let transactionManager: SinonStubbedInstance<TransactionManager>;
  let provider1337: SinonStubbedInstance<providers.FallbackProvider>;
  let provider1338: SinonStubbedInstance<providers.FallbackProvider>;
  let signFulfillTransactionPayloadMock: SinonStub;

  let user: string = mkAddress("0xa");
  let router: string = mkAddress("0xb");
  let sendingChainId: number = 1337;
  let receivingChainId: number = 1338;
  let sendingChainTxManagerAddress: string = mkAddress("0xaaa");
  let receivingChainTxManagerAddress: string = mkAddress("0xbbb");

  beforeEach(() => {
    provider1337 = createStubInstance(providers.FallbackProvider);
    (provider1337 as any)._isProvider = true;
    provider1338 = provider1337;
    const chainConfig = {
      [sendingChainId]: {
        provider: provider1337,
        subgraph: "http://example.com",
        transactionManagerAddress: sendingChainTxManagerAddress,
      },
      [receivingChainId]: {
        provider: provider1338,
        subgraph: "http://example.com",
        transactionManagerAddress: receivingChainTxManagerAddress,
      },
    };
    signer = createStubInstance(Wallet);
    messaging = createStubInstance(UserNxtpNatsMessagingService);
    subgraph = createStubInstance(Subgraph);
    transactionManager = createStubInstance(TransactionManager);

    signFulfillTransactionPayloadMock = stub(nxtpUtils, "signFulfillTransactionPayload");

    signer.getAddress.resolves(user);

    sdk = new NxtpSdk(chainConfig, signer, logger, "http://example.com", "http://example.com");

    (sdk as any).transactionManager = transactionManager;
    (sdk as any).subgraph = subgraph;
    (sdk as any).messaging = messaging;

    messaging.connect.resolves(response);
  });

  afterEach(() => {
    restore();
    reset();
  });

  const getTransactionData = async (
    txOverrides: Partial<InvariantTransactionData> = {},
    recordOverrides: Partial<VariantTransactionData> = {},
  ): Promise<{ transaction: InvariantTransactionData; record: VariantTransactionData }> => {
    const transaction = {
      user: user,
      router: router,
      sendingAssetId: mkAddress("0xc"),
      receivingAssetId: mkAddress("0xb"),
      sendingChainFallback: user,
      callTo: AddressZero,
      receivingAddress: mkAddress("0xa"),
      callDataHash: EmptyCallDataHash,
      transactionId: getRandomBytes32(),
      sendingChainId: sendingChainId,
      receivingChainId: receivingChainId,
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

  const getMock = (
    crossChainParamsOverrides: Partial<CrossChainParams> = {},
    auctionBidOverrides: Partial<AuctionBid> = {},
    _bidSignature: string = EmptyCallDataHash,
  ): { crossChainParams: CrossChainParams; auctionBid: AuctionBid; bidSignature: string } => {
    const crossChainParams = {
      callData: EmptyBytes,
      sendingChainId: sendingChainId,
      sendingAssetId: mkAddress("0xc"),
      receivingChainId: receivingChainId,
      receivingAssetId: mkAddress("0xb"),
      callTo: AddressZero,
      receivingAddress: mkAddress("0xa"),
      amount: "100",
      expiry: Math.floor(Date.now() / 1000) + 24 * 3600 * 3,
      transactionId: getRandomBytes32(),
      ...crossChainParamsOverrides,
    };

    const auctionBid = {
      user: user,
      router: router,
      sendingChainId: sendingChainId,
      sendingAssetId: mkAddress("0xa"),
      amount: "100",
      receivingChainId: receivingChainId,
      receivingAssetId: mkAddress("0xb"),
      amountReceived: "100",
      receivingAddress: mkAddress("0xc"),
      transactionId: getRandomBytes32(),
      expiry: Math.floor(Date.now() / 1000) + 24 * 3600 * 3,
      callDataHash: EmptyCallDataHash,
      callTo: AddressZero,
      encryptedCallData: EmptyBytes,
      sendingChainTxManagerAddress: sendingChainTxManagerAddress,
      receivingChainTxManagerAddress: receivingChainTxManagerAddress,
      bidExpiry: Math.floor(Date.now() / 1000) + 24 * 3600 * 3,
      ...auctionBidOverrides,
    };

    const bidSignature = _bidSignature;

    return { crossChainParams, auctionBid, bidSignature };
  };

  describe("#constructor", () => {
    it("should error if transaction manager doesn't exist for chainId", () => {
      const _chainConfig = {
        [sendingChainId]: {
          provider: provider1337,
          subgraph: "http://example.com",
        },
        [receivingChainId]: {
          provider: provider1338,
          subgraph: "http://example.com",
        },
      };
      let error;
      try {
        const instance = new NxtpSdk(_chainConfig, signer, logger, "http://example.com", "http://example.com");
      } catch (e) {
        error = e;
      }
      expect(error).to.be.an("error");
      expect(error.message).to.be.eq(NxtpSdkError.reasons.ConfigError);
    });

    it("should error if subgraph doesn't exist for chainId", () => {
      const _chainConfig = {
        [sendingChainId]: {
          provider: provider1337,
          transactionManagerAddress: sendingChainTxManagerAddress,
        },
        [receivingChainId]: {
          provider: provider1338,
          transactionManagerAddress: receivingChainTxManagerAddress,
        },
      };

      let error;
      try {
        const instance = new NxtpSdk(_chainConfig, signer, logger, "http://example.com", "http://example.com");
      } catch (e) {
        error = e;
      }
      expect(error).to.be.an("error");
      expect(error.message).to.be.eq(NxtpSdkError.reasons.ConfigError);
    });

    it("happy: constructor, get transactionManager address", () => {
      const chainConfig = {
        [4]: {
          provider: provider1337,
          subgraph: "http://example.com",
        },
        [5]: {
          provider: provider1338,
          subgraph: "http://example.com",
        },
      };
      const instance = new NxtpSdk(chainConfig, signer, logger, "http://example.com", "http://example.com");
    });
  });

  describe("#connectMessaging", () => {
    const assertMessaging = async (bearerToken?: string) => {
      const res = await sdk.connectMessaging(bearerToken);
      expect(res).to.be.eq(response);
    };
    it("happy connectMessaging with bearerToken", async () => {
      const bearerToken = "hello";

      await assertMessaging(bearerToken);
    });

    it("happy connectMessaging", async () => {
      await assertMessaging();
    });
  });

  describe("#getActiveTransactions", () => {
    it("happy getActiveTransactions", async () => {
      const { transaction, record } = await getTransactionData();
      const activeTransaction = {
        txData: { ...transaction, ...record },
        status: NxtpSdkEvents.SenderTransactionPrepared,
        bidSignature: EmptyBytes,
        caller: transaction.user,
        encodedBid: EmptyBytes,
        encryptedCallData: EmptyBytes,
      };
      subgraph.getActiveTransactions.resolves([activeTransaction]);
      const res = await sdk.getActiveTransactions();
      expect(res[0]).to.be.eq(activeTransaction);
    });
  });

  describe("#getTransferQuote", () => {
    // TODO: callData encryption

    describe("should error if invalid params", () => {
      const { crossChainParams } = getMock({ callData: "abc" });
      it("invalid callData", async () => {
        let error;
        try {
          await sdk.getTransferQuote(crossChainParams);
        } catch (e) {
          error = e;
        }
        expect(error).to.be.an("error");
        expect(error.message).to.be.eq(NxtpSdkError.reasons.ParamsError);
        expect(error.context.transactionId).to.be.eq(crossChainParams.transactionId);
      });
    });

    describe("should error if invalid config", () => {
      it("unkown sendingChainId", async () => {
        const { crossChainParams } = getMock({ sendingChainId: 1400 });
        let error;
        try {
          await sdk.getTransferQuote(crossChainParams);
        } catch (e) {
          error = e;
        }
        expect(error).to.be.an("error");
        expect(error.message).to.be.eq(NxtpSdkError.reasons.ConfigError);
        expect(error.context.transactionId).to.be.eq(crossChainParams.transactionId);
        expect(error.context.configError).to.include("Not configured for chains");
      });

      it("unkown receivingChainId", async () => {
        const { crossChainParams } = getMock({ receivingChainId: 1400 });
        let error;
        try {
          await sdk.getTransferQuote(crossChainParams);
        } catch (e) {
          error = e;
        }
        expect(error).to.be.an("error");
        expect(error.message).to.be.eq(NxtpSdkError.reasons.ConfigError);
        expect(error.context.transactionId).to.be.eq(crossChainParams.transactionId);
        expect(error.context.configError).to.include("Not configured for chains");
      });
    });

    it("happy: should error if slippageTolerance is higher than Max allowed", async () => {
      const { crossChainParams } = getMock({ slippageTolerance: (parseFloat(MAX_SLIPPAGE_TOLERANCE) + 1).toString() });
      let error;
      try {
        await sdk.getTransferQuote(crossChainParams);
      } catch (e) {
        error = e;
      }
      expect(error).to.be.an("error");
      expect(error.message).to.be.eq(NxtpSdkError.reasons.ParamsError);
      expect(error.context.transactionId).to.be.eq(crossChainParams.transactionId);
    });

    it("happy: should error if expiry is too short", async () => {
      const { crossChainParams } = getMock({ expiry: Math.floor(Date.now() / 1000) + getMinExpiryBuffer() - 1000 });
      let error;
      try {
        await sdk.getTransferQuote(crossChainParams);
      } catch (e) {
        error = e;
      }
      expect(error).to.be.an("error");
      expect(error.message).to.be.eq(NxtpSdkError.reasons.ParamsError);
      expect(error.context.transactionId).to.be.eq(crossChainParams.transactionId);
      expect(error.context.paramsError).to.include("Expiry too short");
    });

    it("happy: should error if expiry is too high", async () => {
      const { crossChainParams } = getMock({ expiry: Math.floor(Date.now() / 1000) + getMaxExpiryBuffer() + 1000 });
      let error;
      try {
        await sdk.getTransferQuote(crossChainParams);
      } catch (e) {
        error = e;
      }
      expect(error).to.be.an("error");
      expect(error.message).to.be.eq(NxtpSdkError.reasons.ParamsError);
      expect(error.context.transactionId).to.be.eq(crossChainParams.transactionId);
      expect(error.context.paramsError).to.include("Expiry too high");
    });

    it.skip("happy: should get a transfer quote", async () => {
      const { crossChainParams, auctionBid, bidSignature } = getMock();

      const prom = await sdk.getTransferQuote(crossChainParams);
      // await delay(1000);
      messaging.subscribeToAuctionResponse.yield({ auctionBid, bidSignature });
    });
  });

  describe("#startTransfer", () => {
    describe("should error if invalid param", () => {
      it("invalid user", async () => {
        const { auctionBid, bidSignature } = getMock({}, { user: "abc" });
        let error;
        try {
          await sdk.startTransfer({ bid: auctionBid, bidSignature });
        } catch (e) {
          error = e;
        }
        expect(error).to.be.an("error");
        expect(error.message).to.be.eq(NxtpSdkError.reasons.ParamsError);
        expect(error.context.transactionId).to.be.eq(auctionBid.transactionId);
      });
    });

    describe("should error if invalid config", () => {
      it("unkown sendingChainId", async () => {
        const { auctionBid, bidSignature } = getMock({}, { sendingChainId: 1400 });
        let error;
        try {
          await sdk.startTransfer({ bid: auctionBid, bidSignature });
        } catch (e) {
          error = e;
        }
        expect(error).to.be.an("error");
        expect(error.message).to.be.eq(NxtpSdkError.reasons.ConfigError);
        expect(error.context.transactionId).to.be.eq(auctionBid.transactionId);
        expect(error.context.configError).to.include("Not configured for chains");
      });

      it("unkown receivingChainId", async () => {
        const { auctionBid, bidSignature } = getMock({}, { receivingChainId: 1400 });
        let error;
        try {
          await sdk.startTransfer({ bid: auctionBid, bidSignature });
        } catch (e) {
          error = e;
        }
        expect(error).to.be.an("error");
        expect(error.message).to.be.eq(NxtpSdkError.reasons.ConfigError);
        expect(error.context.transactionId).to.be.eq(auctionBid.transactionId);
        expect(error.context.configError).to.include("Not configured for chains");
      });
    });

    it("should error if bidSignature undefined", async () => {
      const { auctionBid, bidSignature } = getMock({}, {}, "");

      let error;
      try {
        await sdk.startTransfer({ bid: auctionBid, bidSignature });
      } catch (e) {
        error = e;
      }
      expect(error).to.be.an("error");
      expect(error.message).to.be.eq(NxtpSdkError.reasons.ParamsError);
      expect(error.context.transactionId).to.be.eq(auctionBid.transactionId);
      expect(error.context.paramsError).to.include("bidSignature undefined");
    });

    it.skip("should error if approveTokensIfNeeded transaction fails", async () => {
      const { auctionBid, bidSignature } = getMock();
      const mockMethod = "transfer";
      const mockMethodId = getRandomBytes32();

      transactionManager.approveTokensIfNeeded.resolves(
        err(
          new TransactionManagerError(TransactionManagerError.reasons.TxServiceError, sendingChainId, {
            method: mockMethod,
            methodId: mockMethodId,
          }),
        ),
      );
      let error;
      try {
        await sdk.startTransfer({ bid: auctionBid, bidSignature });
      } catch (e) {
        error = e;
      }
      console.log(error);
      expect(error).to.be.an("error");
      expect(error.message).to.be.eq(TransactionManagerError.reasons.TxServiceError);
      expect(error.context.transactionId).to.be.eq(auctionBid.transactionId);
    });

    it.skip("should error if approve transaction reverts", async () => {
      const { auctionBid, bidSignature } = getMock();
      const mockMethod = "transfer";
      const mockMethodId = getRandomBytes32();
      // transactionManager.approveTokensIfNeeded.resolves(ok(undefined));
      transactionManager.approveTokensIfNeeded.resolves(ok(TxResponse));
      let error;
      try {
        await sdk.startTransfer({ bid: auctionBid, bidSignature });
      } catch (e) {
        error = e;
      }
      console.log(error);
      expect(error).to.be.an("error");
      expect(error.message).to.be.eq(TransactionManagerError.reasons.TxServiceError);
      expect(error.context.transactionId).to.be.eq(auctionBid.transactionId);
    });

    it.skip("happy: start transfer ERC20 Asset", async () => {});
    it.skip("happy: start transfer Native Asset", async () => {});
  });

  describe("#finishTransfer", () => {
    describe("should error if invalid param", () => {
      it("invalid user", async () => {
        const { transaction, record } = await getTransactionData({ user: "abc" });
        let error;
        try {
          await sdk.finishTransfer({
            txData: { ...transaction, ...record },
            caller: transaction.user,
            encryptedCallData: EmptyCallDataHash,
            encodedBid: EmptyCallDataHash,
            bidSignature: EmptyCallDataHash,
          });
        } catch (e) {
          error = e;
        }
        expect(error).to.be.an("error");
        expect(error.message).to.be.eq(NxtpSdkError.reasons.ParamsError);
        expect(error.context.transactionId).to.be.eq(transaction.transactionId);
      });

      it("invalid caller", async () => {
        const { transaction, record } = await getTransactionData();
        let error;
        try {
          await sdk.finishTransfer({
            txData: { ...transaction, ...record },
            caller: "abc",
            encryptedCallData: EmptyCallDataHash,
            encodedBid: EmptyCallDataHash,
            bidSignature: EmptyCallDataHash,
          });
        } catch (e) {
          error = e;
        }
        expect(error).to.be.an("error");
        expect(error.message).to.be.eq(NxtpSdkError.reasons.ParamsError);
        expect(error.context.transactionId).to.be.eq(transaction.transactionId);
      });

      it("invalid encryptedCallData", async () => {
        const { transaction, record } = await getTransactionData();
        let error;
        try {
          await sdk.finishTransfer({
            txData: { ...transaction, ...record },
            caller: transaction.user,
            encryptedCallData: 1 as any,
            encodedBid: EmptyCallDataHash,
            bidSignature: EmptyCallDataHash,
          });
        } catch (e) {
          error = e;
        }
        expect(error).to.be.an("error");
        expect(error.message).to.be.eq(NxtpSdkError.reasons.ParamsError);
        expect(error.context.transactionId).to.be.eq(transaction.transactionId);
      });
    });

    describe("should error if invalid config", () => {
      it("unkown sendingChainId", async () => {
        const { transaction, record } = await getTransactionData({ sendingChainId: 1400 });
        let error;
        try {
          await sdk.finishTransfer({
            txData: { ...transaction, ...record },
            caller: transaction.user,
            encryptedCallData: EmptyCallDataHash,
            encodedBid: EmptyCallDataHash,
            bidSignature: EmptyCallDataHash,
          });
        } catch (e) {
          error = e;
        }
        expect(error).to.be.an("error");
        expect(error.message).to.be.eq(NxtpSdkError.reasons.ConfigError);
        expect(error.context.transactionId).to.be.eq(transaction.transactionId);
        expect(error.context.configError).to.include("Not configured for chains");
      });

      it("unkown receivingChainId", async () => {
        const { transaction, record } = await getTransactionData({ receivingChainId: 1400 });
        let error;
        try {
          await sdk.finishTransfer({
            txData: { ...transaction, ...record },
            caller: transaction.user,
            encryptedCallData: EmptyCallDataHash,
            encodedBid: EmptyCallDataHash,
            bidSignature: EmptyCallDataHash,
          });
        } catch (e) {
          error = e;
        }
        expect(error).to.be.an("error");
        expect(error.message).to.be.eq(NxtpSdkError.reasons.ConfigError);
        expect(error.context.transactionId).to.be.eq(transaction.transactionId);
        expect(error.context.configError).to.include("Not configured for chains");
      });
    });

    it.skip("should error if signFulfillTransactionPayload errors", async () => {
      const { transaction, record } = await getTransactionData();

      signFulfillTransactionPayloadMock.returns(new Error("fail"));
      let error;
      try {
        await sdk.finishTransfer({
          txData: { ...transaction, ...record },
          caller: transaction.user,
          encryptedCallData: EmptyCallDataHash,
          encodedBid: EmptyCallDataHash,
          bidSignature: EmptyCallDataHash,
        });
      } catch (e) {
        error = e;
      }
      expect(error).to.be.an("error");
      expect(error.message).to.be.eq(NxtpSdkError.reasons.SigningError);
      expect(error.context.transactionId).to.be.eq(transaction.transactionId);
    });

    it.skip("happy: finish transfer ERC20 Asset", async () => {});
    it.skip("happy: finish transfer Native Asset", async () => {});
  });

  describe("#cancelExpired", () => {
    describe("should error if invalid param", () => {
      it("invalid user", async () => {
        const { transaction, record } = await getTransactionData({ user: "abc" });
        let error;
        try {
          await sdk.cancelExpired(
            {
              txData: { ...transaction, ...record },
              relayerFee: "",
              signature: "",
            },
            sendingChainId,
          );
        } catch (e) {
          error = e;
        }
        expect(error).to.be.an("error");
        expect(error.message).to.be.eq(NxtpSdkError.reasons.ParamsError);
        expect(error.context.transactionId).to.be.eq(transaction.transactionId);
      });

      it("invalid relayerFee", async () => {
        const { transaction, record } = await getTransactionData({ user: "abc" });
        let error;
        try {
          await sdk.cancelExpired(
            {
              txData: { ...transaction, ...record },
              relayerFee: "",
              signature: EmptyCallDataHash,
            },
            sendingChainId,
          );
        } catch (e) {
          error = e;
        }
        expect(error).to.be.an("error");
        expect(error.message).to.be.eq(NxtpSdkError.reasons.ParamsError);
        expect(error.context.transactionId).to.be.eq(transaction.transactionId);
      });

      it("invalid signature", async () => {
        const { transaction, record } = await getTransactionData({ user: "abc" });
        let error;
        try {
          await sdk.cancelExpired(
            {
              txData: { ...transaction, ...record },
              relayerFee: "1",
              signature: "",
            },
            sendingChainId,
          );
        } catch (e) {
          error = e;
        }
        expect(error).to.be.an("error");
        expect(error.message).to.be.eq(NxtpSdkError.reasons.ParamsError);
        expect(error.context.transactionId).to.be.eq(transaction.transactionId);
      });
    });

    it("should error if transactionManager cancel fails", async () => {
      const mockMethod = "cancel";
      const mockMethodId = getRandomBytes32();
      const { transaction, record } = await getTransactionData();

      transactionManager.cancel.resolves(
        err(
          new TransactionManagerError(TransactionManagerError.reasons.TxServiceError, sendingChainId, {
            method: mockMethod,
            methodId: mockMethodId,
            transactionId: transaction.transactionId,
          }),
        ),
      );
      let error;
      try {
        await sdk.cancelExpired(
          {
            txData: { ...transaction, ...record },
            relayerFee: "1",
            signature: EmptyCallDataHash,
          },
          sendingChainId,
        );
      } catch (e) {
        error = e;
      }
      expect(error).to.be.an("error");
      expect(error.message).to.be.eq(TransactionManagerError.reasons.TxServiceError);
      expect(error.context.transactionId).to.be.eq(transaction.transactionId);
    });

    it("happy: cancel", async () => {
      const mockMethod = "cancel";
      const mockMethodId = getRandomBytes32();
      const { transaction, record } = await getTransactionData();

      transactionManager.cancel.resolves(ok(TxResponse));
      let error;
      let res;
      try {
        res = await sdk.cancelExpired(
          {
            txData: { ...transaction, ...record },
            relayerFee: "1",
            signature: EmptyCallDataHash,
          },
          sendingChainId,
        );
      } catch (e) {
        error = e;
      }
      console.log(error);
      expect(error).to.be.undefined;
      expect(res).to.be.eq(TxResponse);
    });
  });

  it("happy changeInjectedSigner", () => {
    const signer = createStubInstance(Wallet);
    const res = sdk.changeInjectedSigner(signer);
  });

  it("happy removeAllListeners", () => {
    const res = sdk.removeAllListeners();
  });
});
