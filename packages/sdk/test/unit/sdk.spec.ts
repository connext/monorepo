import {
  AuctionResponse,
  delay,
  mkAddress,
  UserNxtpNatsMessagingService,
  getRandomBytes32,
  generateMessagingInbox,
  InvariantTransactionData,
  VariantTransactionData,
} from "@connext/nxtp-utils";
import { expect } from "chai";
import { providers, Wallet, constants, utils } from "ethers";
import pino from "pino";
import { createStubInstance, SinonStubbedInstance } from "sinon";

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

const logger = pino({ level: process.env.LOG_LEVEL ?? "silent" });

const { AddressZero } = constants;
const EmptyBytes = "0x";
const EmptyCallDataHash = utils.keccak256(EmptyBytes);
const response = "connected";

describe.only("NxtpSdk", () => {
  let sdk: NxtpSdk;
  let signer: SinonStubbedInstance<Wallet>;
  let messaging: SinonStubbedInstance<UserNxtpNatsMessagingService>;
  let subgraph: SinonStubbedInstance<Subgraph>;
  let provider1337: SinonStubbedInstance<providers.FallbackProvider>;
  let provider1338: SinonStubbedInstance<providers.FallbackProvider>;

  let user: string = mkAddress("0xuser");
  let router: string = mkAddress("0xrouter");
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

    signer.getAddress.resolves(user);
    // sdk = new NxtpSdk(
    //   chainConfig,
    //   signer,
    //   logger,
    //   undefined,
    //   undefined,
    //   (messaging as unknown) as UserNxtpNatsMessagingService,
    // );

    messaging.connect.resolves(response);
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
    AuctionResponseOverrides: Partial<AuctionResponse> = {},
  ): { crossChainParams: CrossChainParams; auctionResponse: AuctionResponse } => {
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

    const auctionResponse = {
      bid: {
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
      },
      bidSignature: undefined,
      ...AuctionResponseOverrides,
    };
    return { crossChainParams, auctionResponse };
  };

  describe("constructor", async () => {
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

    it.only("should error if transaction manager doesn't exist for chainId", () => {
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
      let err;
      try {
        const instance = new NxtpSdk(_chainConfig, signer, logger, "http://example.com", "http://example.com");
      } catch (e) {
        err = e;
        console.log(e);
      }
      expect(err).to.be.an("error");
      expect(err.message).to.be.eq(NxtpSdkError.reasons.ConfigError);
    });

    it.only("should error if subgraph doesn't exist for chainId", () => {
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

      let err;
      try {
        const instance = new NxtpSdk(_chainConfig, signer, logger, "http://example.com", "http://example.com");
      } catch (e) {
        err = e;
        console.log(e);
      }
      expect(err).to.be.an("error");
      expect(err.message).to.be.eq(NxtpSdkError.reasons.ConfigError);
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
      const instance = new NxtpSdk(
        chainConfig,
        signer,
        logger,
        undefined,
        undefined,
        (messaging as unknown) as UserNxtpNatsMessagingService,
      );
    });

    it("happy: constructor, new messaging", () => {
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

  describe("#getActiveTransactions", async () => {
    const { transaction, record } = await getTransactionData();
    const activeTransaction = {
      txData: { ...transaction, ...record },
      status: NxtpSdkEvents.SenderTransactionPrepared,
    };

    subgraph.getActiveTransactions.resolves([]);
    it("happy getActiveTransactions", async () => {});
  });

  describe("#getTransferQuote", () => {
    // TODO: callData encryption

    describe("should error if invalid params", () => {
      const { crossChainParams } = getMock({ callData: "abc" });
      it("invalid callData", async () => {
        let err;
        try {
          await sdk.getTransferQuote(crossChainParams);
        } catch (e) {
          err = e;
        }
        expect(err).to.be.an("error");
        expect(err.message).to.be.eq(NxtpSdkError.reasons.ParamsError);
        expect(err.context.transactionId).to.be.eq(crossChainParams.transactionId);
      });
    });

    describe("should error if invalid config", () => {
      it("unkown sendingChainId", async () => {
        const { crossChainParams } = getMock({ sendingChainId: 1400 });
        let err;
        try {
          await sdk.getTransferQuote(crossChainParams);
        } catch (e) {
          err = e;
        }
        expect(err).to.be.an("error");
        expect(err.message).to.be.eq(NxtpSdkError.reasons.ConfigError);
        expect(err.context.transactionId).to.be.eq(crossChainParams.transactionId);
      });

      it("unkown receivingChainId", async () => {
        const { crossChainParams } = getMock({ sendingChainId: 1400 });
        let err;
        try {
          await sdk.getTransferQuote(crossChainParams);
        } catch (e) {
          err = e;
        }
        expect(err).to.be.an("error");
        expect(err.message).to.be.eq(NxtpSdkError.reasons.ConfigError);
        expect(err.context.transactionId).to.be.eq(crossChainParams.transactionId);
      });
    });

    it("happy: should error if slippageTolerance is higher than Max allowed", async () => {
      const { crossChainParams } = getMock({ slippageTolerance: (parseFloat(MAX_SLIPPAGE_TOLERANCE) + 1).toString() });
      let err;
      try {
        await sdk.getTransferQuote(crossChainParams);
      } catch (e) {
        err = e;
      }
      expect(err).to.be.an("error");
      expect(err.message).to.be.eq(NxtpSdkError.reasons.ParamsError);
      expect(err.context.transactionId).to.be.eq(crossChainParams.transactionId);
    });

    it("happy: should error if expiry is too short", async () => {
      const { crossChainParams } = getMock({ expiry: getMinExpiryBuffer() - 1000 });
      let err;
      try {
        await sdk.getTransferQuote(crossChainParams);
      } catch (e) {
        err = e;
      }
      expect(err).to.be.an("error");
      expect(err.message).to.be.eq(NxtpSdkError.reasons.ParamsError);
      expect(err.context.transactionId).to.be.eq(crossChainParams.transactionId);
    });

    it("happy: should error if expiry is too high", async () => {
      const { crossChainParams } = getMock({ expiry: getMaxExpiryBuffer() + 1000 });
      let err;
      try {
        await sdk.getTransferQuote(crossChainParams);
      } catch (e) {
        err = e;
      }
      expect(err).to.be.an("error");
      expect(err.message).to.be.eq(NxtpSdkError.reasons.ParamsError);
      expect(err.context.transactionId).to.be.eq(crossChainParams.transactionId);
    });

    it("happy: should get a transfer quote", async () => {
      const { crossChainParams, auctionResponse } = getMock();

      const prom = await sdk.getTransferQuote(crossChainParams);
      // await delay(1000);
      messaging.subscribeToAuctionResponse.yield(auctionResponse);
      console.log(prom);
    });
  });

  describe("#startTransfer", () => {
    describe.skip("should error if invalid config", () => {});
    it("should error if bidSignature undefined", async () => {});

    it("should error if approve transaction fails", async () => {});
    it("should error if approve transaction reverts", async () => {});

    it("happy: start transfer ERC20 Asset", async () => {});
    it("happy: start transfer Native Asset", async () => {});
  });
});
