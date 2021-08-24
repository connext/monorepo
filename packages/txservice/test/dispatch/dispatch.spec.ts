import { expect } from "@connext/nxtp-utils/src/expect";
import { Wallet } from "ethers";
import { okAsync } from "neverthrow";
import pino from "pino";
import { createStubInstance, SinonStub, SinonStubbedInstance, stub } from "sinon";

import { ChainConfig, DEFAULT_CONFIG } from "../../src/config";
import { TransactionDispatch } from "../../src/dispatch";
import { TransactionBuffer } from "../../src/dispatch/buffer";
import { TEST_SENDER_CHAIN_ID, TEST_TX_RESPONSE } from "../constants";

const logger = pino({ level: process.env.LOG_LEVEL ?? "silent", name: "DispatchTest" });

describe("Dispatch", () => {
  let signer: SinonStubbedInstance<Wallet>;
  let txDispatch: TransactionDispatch;
  let txBuffer: SinonStubbedInstance<TransactionBuffer>;
  let backfillStub = stub().resolves(undefined);
  let bufferPending: SinonStub;

  beforeEach(async () => {
    signer = createStubInstance(Wallet);
    signer.sendTransaction.resolves(TEST_TX_RESPONSE);
    signer.getTransactionCount.resolves(TEST_TX_RESPONSE.nonce);
    signer.connect.returns(signer);

    const chainConfig: ChainConfig = {
      providers: [
        {
          url: "https://-------------",
        },
      ],
      confirmations: 1,
      confirmationTimeout: 10_000,
    };

    txBuffer = createStubInstance(TransactionBuffer);
    txBuffer.pending.returns([undefined, undefined, undefined]);
    txDispatch = new TransactionDispatch(logger, signer, TEST_SENDER_CHAIN_ID, chainConfig, DEFAULT_CONFIG, false);
    (txDispatch as any).buffer = txBuffer;
    (txDispatch as any).backfill = backfillStub;
    txDispatch.getTransactionCount = stub().returns(okAsync(TEST_TX_RESPONSE.nonce));
  });

  describe("#monitor", async () => {
    it("should backfill tx if txDispatch.getTransactionCount === txBuffer.getLastNonce", async () => {
      txBuffer.getLastNonce.resolves(TEST_TX_RESPONSE.nonce);
      await txDispatch.monitor();
      expect(backfillStub).to.be.calledOnceWithExactly(TEST_TX_RESPONSE.nonce, undefined, "NOT_FOUND");
    });
  });
});
