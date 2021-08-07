import {
  mkAddress,
  txDataMock,
  prepareParamsMock,
  fulfillParamsMock,
  cancelParamsMock,
  fakeTxReceipt,
  requestContextMock,
  getRandomBytes32,
} from "@connext/nxtp-utils";
import { TransactionService } from "@connext/nxtp-txservice";
import pino from "pino";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { createStubInstance, reset, restore, SinonStubbedInstance, stub } from "sinon";
import { TransactionManager, TransactionManagerError } from "../src/contract";

import { fakeConfig } from "../test/utils";

const logger = pino({ level: process.env.LOG_LEVEL ?? "silent" });

describe("Contract", () => {
  let transactionManager: TransactionManager;
  let transactionService: SinonStubbedInstance<TransactionService>;

  let user: string = mkAddress("0xa");

  beforeEach(() => {
    transactionService = createStubInstance(TransactionService);

    transactionManager = new TransactionManager(
      transactionService as any as TransactionService,
      user,
      logger,
      fakeConfig,
    );
  });

  afterEach(() => {
    restore();
    reset();
  });

  it("happy: constructor with optional config param", () => {
    let res;
    let error;

    try {
      res = new TransactionManager(transactionService as any as TransactionService, user, logger, fakeConfig);
    } catch (e) {
      error = e;
    }

    expect(error).to.be.undefined;
  });

  describe("prepare", () => {
    it("should error if chainId is not supported in config", async () => {
      const chainId = 1400;
      const res = await transactionManager.prepare(chainId, prepareParamsMock, requestContextMock);

      expect(res.isOk()).to.be.false;
      expect(res.isErr()).to.be.true;
      if (res.isErr()) {
        expect(res.error.message).to.be.eq(TransactionManagerError.reasons.NoTransactionManagerAddress);
        expect(res.error.context.chainId).to.be.eq(chainId);
        expect(res.error.context.configError).to.include("No contract exists for chain");
      }
    });

    describe("should error if function encoding fails", () => {
      it("invalid user", async () => {
        const chainId = txDataMock.sendingChainId;
        const paramsMock = JSON.parse(JSON.stringify(prepareParamsMock));
        paramsMock.txData.user = "abc";
        const res = await transactionManager.prepare(chainId, paramsMock, requestContextMock);

        expect(res.isOk()).to.be.false;
        expect(res.isErr()).to.be.true;
        if (res.isErr()) {
          expect(res.error.message).to.be.eq(TransactionManagerError.reasons.EncodingError);
          expect(res.error.context.chainId).to.be.eq(chainId);
          expect(res.error.context.encodingError.message).to.include("invalid address");
        }
      });
    });

    it("should error if transaction fails", async () => {
      const errorMessage = "fails";
      transactionService.sendTx.rejects(new Error(errorMessage));

      const chainId = txDataMock.sendingChainId;

      const res = await transactionManager.prepare(chainId, prepareParamsMock, requestContextMock);

      expect(res.isOk()).to.be.false;
      expect(res.isErr()).to.be.true;
      if (res.isErr()) {
        expect(res.error.message).to.be.eq(TransactionManagerError.reasons.TxServiceError);
        expect(res.error.context.chainId).to.be.eq(chainId);
        expect(res.error.context.txServiceError.message).to.be.eq(errorMessage);
      }
    });

    it("happy case: prepare", async () => {
      transactionService.sendTx.resolves(fakeTxReceipt);

      const chainId = txDataMock.sendingChainId;

      const res = await transactionManager.prepare(chainId, prepareParamsMock, requestContextMock);

      expect(res.isOk()).to.be.true;
      expect(res.isErr()).to.be.false;
      if (res.isOk()) {
        expect(res.value).to.be.eq(fakeTxReceipt);
      }
    });
  });

  describe("fulfill", () => {
    it("should error if chainId is not supported in config", async () => {
      const chainId = 1400;
      const res = await transactionManager.fulfill(chainId, fulfillParamsMock, requestContextMock);

      expect(res.isOk()).to.be.false;
      expect(res.isErr()).to.be.true;
      if (res.isErr()) {
        expect(res.error.message).to.be.eq(TransactionManagerError.reasons.NoTransactionManagerAddress);
        expect(res.error.context.chainId).to.be.eq(chainId);
        expect(res.error.context.configError).to.include("No contract exists for chain");
      }
    });
    describe("should error if function encoding fails", () => {
      it("invalid user", async () => {
        const chainId = txDataMock.sendingChainId;
        const paramsMock = JSON.parse(JSON.stringify(fulfillParamsMock));
        paramsMock.txData.user = "abc";
        const res = await transactionManager.fulfill(chainId, paramsMock, requestContextMock);

        expect(res.isOk()).to.be.false;
        expect(res.isErr()).to.be.true;
        if (res.isErr()) {
          expect(res.error.message).to.be.eq(TransactionManagerError.reasons.EncodingError);
          expect(res.error.context.chainId).to.be.eq(chainId);
          expect(res.error.context.encodingError.message).to.include("invalid address");
        }
      });
    });

    it("should error if transaction fails", async () => {
      const errorMessage = "fails";
      transactionService.sendTx.rejects(new Error(errorMessage));

      const chainId = txDataMock.sendingChainId;

      const res = await transactionManager.fulfill(chainId, fulfillParamsMock, requestContextMock);

      expect(res.isOk()).to.be.false;
      expect(res.isErr()).to.be.true;
      if (res.isErr()) {
        expect(res.error.message).to.be.eq(TransactionManagerError.reasons.TxServiceError);
        expect(res.error.context.chainId).to.be.eq(chainId);
        expect(res.error.context.txServiceError.message).to.be.eq(errorMessage);
      }
    });

    it("happy case: fulfill", async () => {
      transactionService.sendTx.resolves(fakeTxReceipt);

      const chainId = txDataMock.sendingChainId;

      const res = await transactionManager.fulfill(chainId, fulfillParamsMock, requestContextMock);

      expect(res.isOk()).to.be.true;
      expect(res.isErr()).to.be.false;
      if (res.isOk()) {
        expect(res.value).to.be.eq(fakeTxReceipt);
      }
    });
  });

  describe("cancel", () => {
    const chainId = txDataMock.sendingChainId;
    it("should error if chainId is not supported in config", async () => {
      const chainId = 1400;
      const res = await transactionManager.cancel(chainId, cancelParamsMock, requestContextMock);

      expect(res.isOk()).to.be.false;
      expect(res.isErr()).to.be.true;
      if (res.isErr()) {
        expect(res.error.message).to.be.eq(TransactionManagerError.reasons.NoTransactionManagerAddress);
        expect(res.error.context.chainId).to.be.eq(chainId);
        expect(res.error.context.configError).to.include("No contract exists for chain");
      }
    });
    describe("should error if function encoding fails", () => {
      it("invalid user", async () => {
        const paramsMock = JSON.parse(JSON.stringify(cancelParamsMock));
        paramsMock.txData.user = "abc";
        const res = await transactionManager.cancel(chainId, paramsMock, requestContextMock);

        expect(res.isOk()).to.be.false;
        expect(res.isErr()).to.be.true;
        if (res.isErr()) {
          expect(res.error.message).to.be.eq(TransactionManagerError.reasons.EncodingError);
          expect(res.error.context.chainId).to.be.eq(chainId);
          expect(res.error.context.encodingError.message).to.include("invalid address");
        }
      });
    });

    it("should error if transaction fails", async () => {
      const errorMessage = "fails";
      transactionService.sendTx.rejects(new Error(errorMessage));

      const res = await transactionManager.cancel(chainId, cancelParamsMock, requestContextMock);

      expect(res.isOk()).to.be.false;
      expect(res.isErr()).to.be.true;
      if (res.isErr()) {
        expect(res.error.message).to.be.eq(TransactionManagerError.reasons.TxServiceError);
        expect(res.error.context.chainId).to.be.eq(chainId);
        expect(res.error.context.txServiceError.message).to.be.eq(errorMessage);
      }
    });

    it("happy case: cancel", async () => {
      transactionService.sendTx.resolves(fakeTxReceipt);

      const res = await transactionManager.cancel(chainId, cancelParamsMock, requestContextMock);

      expect(res.isOk()).to.be.true;
      expect(res.isErr()).to.be.false;
      if (res.isOk()) {
        expect(res.value).to.be.eq(fakeTxReceipt);
      }
    });
  });

  describe("removeLiquidity", () => {
    const chainId = txDataMock.sendingChainId;
    const amount = txDataMock.amount;
    const assetId = txDataMock.sendingAssetId;
    const recipientAddress = txDataMock.receivingAddress;
    it("should error if chainId is not supported in config", async () => {
      const chainId = 1400;

      const res = await transactionManager.removeLiquidity(
        chainId,
        amount,
        assetId,
        recipientAddress,
        requestContextMock,
      );

      expect(res.isOk()).to.be.false;
      expect(res.isErr()).to.be.true;
      if (res.isErr()) {
        expect(res.error.message).to.be.eq(TransactionManagerError.reasons.NoTransactionManagerAddress);
        expect(res.error.context.chainId).to.be.eq(chainId);
        expect(res.error.context.configError).to.include("No contract exists for chain");
      }
    });
    describe("should error if function encoding fails", () => {
      it("invalid assetId", async () => {
        const res = await transactionManager.removeLiquidity(
          chainId,
          amount,
          "abc" as any,
          recipientAddress,
          requestContextMock,
        );

        expect(res.isOk()).to.be.false;
        expect(res.isErr()).to.be.true;
        if (res.isErr()) {
          expect(res.error.message).to.be.eq(TransactionManagerError.reasons.EncodingError);
          expect(res.error.context.chainId).to.be.eq(chainId);
          expect(res.error.context.encodingError.message).to.include("invalid address");
        }
      });
    });

    it("should error if transaction fails", async () => {
      const errorMessage = "fails";
      transactionService.sendTx.rejects(new Error(errorMessage));

      const res = await transactionManager.removeLiquidity(
        chainId,
        amount,
        assetId,
        recipientAddress,
        requestContextMock,
      );

      expect(res.isOk()).to.be.false;
      expect(res.isErr()).to.be.true;
      if (res.isErr()) {
        expect(res.error.message).to.be.eq(TransactionManagerError.reasons.TxServiceError);
        expect(res.error.context.chainId).to.be.eq(chainId);
        expect(res.error.context.txServiceError.message).to.be.eq(errorMessage);
      }
    });

    it("happy case: removeLiquidity", async () => {
      transactionService.sendTx.resolves(fakeTxReceipt);

      const res = await transactionManager.removeLiquidity(
        chainId,
        amount,
        assetId,
        recipientAddress,
        requestContextMock,
      );

      expect(res.isOk()).to.be.true;
      expect(res.isErr()).to.be.false;
      if (res.isOk()) {
        expect(res.value).to.be.eq(fakeTxReceipt);
      }
    });

    it("happy case: removeLiquidity when receipient address is undefined", async () => {
      transactionService.sendTx.resolves(fakeTxReceipt);

      const res = await transactionManager.removeLiquidity(chainId, amount, assetId, undefined, requestContextMock);

      expect(res.isOk()).to.be.true;
      expect(res.isErr()).to.be.false;
      if (res.isOk()) {
        expect(res.value).to.be.eq(fakeTxReceipt);
      }
    });
  });

  describe("getRouterBalance", () => {
    const chainId = txDataMock.sendingChainId;
    const assetId = txDataMock.sendingAssetId;
    it("should error if chainId is not supported in config", async () => {
      const chainId = 1400;

      const res = await transactionManager.getRouterBalance(chainId, assetId);

      expect(res.isOk()).to.be.false;
      expect(res.isErr()).to.be.true;
      if (res.isErr()) {
        expect(res.error.message).to.be.eq(TransactionManagerError.reasons.NoTransactionManagerAddress);
        expect(res.error.context.chainId).to.be.eq(chainId);
        expect(res.error.context.configError).to.include("No contract exists for chain");
      }
    });

    describe("should error if function encoding fails", () => {
      it("invalid assetId", async () => {
        const res = await transactionManager.getRouterBalance(chainId, "abc" as any);

        expect(res.isOk()).to.be.false;
        expect(res.isErr()).to.be.true;
        if (res.isErr()) {
          expect(res.error.message).to.be.eq(TransactionManagerError.reasons.EncodingError);
          expect(res.error.context.chainId).to.be.eq(chainId);
          expect(res.error.context.encodingError.message).to.include("invalid address");
        }
      });
    });

    it("should error if read transaction fails", async () => {
      const errorMessage = "fails";
      transactionService.readTx.rejects(new Error(errorMessage));

      const res = await transactionManager.getRouterBalance(chainId, assetId);

      expect(res.isOk()).to.be.false;
      expect(res.isErr()).to.be.true;
      if (res.isErr()) {
        expect(res.error.message).to.be.eq(TransactionManagerError.reasons.TxServiceError);
        expect(res.error.context.chainId).to.be.eq(chainId);
        expect(res.error.context.txServiceError.message).to.be.eq(errorMessage);
      }
    });

    it("happy case: getRouterBalance", async () => {
      const fakeData = getRandomBytes32();
      transactionService.readTx.resolves(fakeData);

      const res = await transactionManager.getRouterBalance(chainId, assetId);

      expect(res.isOk()).to.be.true;
      expect(res.isErr()).to.be.false;

      if (res.isOk()) {
        expect(res.value.toString()).to.be.eq(BigNumber.from(fakeData).toString());
      }
    });
  });
});
