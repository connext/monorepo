import {
  AuctionResponse,
  delay,
  mkAddress,
  UserNxtpNatsMessagingService,
  getRandomBytes32,
  generateMessagingInbox,
} from "@connext/nxtp-utils";
import { expect } from "chai";
import { providers, Wallet, constants, utils } from "ethers";
import pino from "pino";
import { createStubInstance, SinonStubbedInstance } from "sinon";

import { CrossChainParams, NxtpSdk } from "../../src/sdk";

const logger = pino({ level: process.env.LOG_LEVEL ?? "silent" });

const { AddressZero } = constants;
const EmptyBytes = "0x";
const EmptyCallDataHash = utils.keccak256(EmptyBytes);

describe("NxtpSdk", () => {
  let sdk: NxtpSdk;
  let messaging: SinonStubbedInstance<UserNxtpNatsMessagingService>;

  let user: string = mkAddress("0xuser");
  let router: string = mkAddress("0xrouter");
  let sendingChainId: number = 1337;
  let receivingChainId: number = 1338;
  let sendingChainTxManagerAddress: string = mkAddress("0xaaa");
  let receivingChainTxManagerAddress: string = mkAddress("0xbbb");

  beforeEach(() => {
    const provider1337 = createStubInstance(providers.FallbackProvider);
    (provider1337 as any)._isProvider = true;
    const provider1338 = provider1337;
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
    const signer = createStubInstance(Wallet);
    signer.getAddress.resolves(user);
    messaging = createStubInstance(UserNxtpNatsMessagingService);

    sdk = new NxtpSdk(
      chainConfig,
      signer,
      logger,
      undefined,
      undefined,
      (messaging as unknown) as UserNxtpNatsMessagingService,
    );
  });

  const getAuctionResponse = (
    AuctionResponseOverrides: Partial<AuctionResponse> = {},
  ): { auctionResponse: AuctionResponse } => {
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

    return { auctionResponse };
  };

  it.skip("happy constructor", () => {});
  it.skip("happy connectMessaging", () => {});
  it.skip("happy getActiveTransactions", () => {});

  describe("#getTransferQuote", () => {
    // TODO: callData encryption

    const crossChainParams: CrossChainParams = {
      callData: EmptyBytes,
      sendingChainId: sendingChainId,
      sendingAssetId: mkAddress("0xc"),
      receivingChainId: receivingChainId,
      receivingAssetId: mkAddress("0xb"),
      callTo: AddressZero,
      receivingAddress: mkAddress("0xa"),
      amount: "100",
      expiry: Math.floor(Date.now() / 1000) + 24 * 3600 * 3,
    };

    describe.skip("should error if invalid params", () => {});
    describe.skip("should error if invalid config", () => {});

    it("happy: should error if slippageTolerance is higher than Max allowed", async () => {});

    it("happy: should error if expiry is too short", async () => {});

    it("happy: should error if expiry is too high", async () => {});

    it("happy: should get a transfer quote", async () => {
      const { auctionResponse } = getAuctionResponse();

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
