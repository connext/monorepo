import { NatsNxtpMessagingService } from "@connext/nxtp-utils";
import TransactionService from "@connext/nxtp-txservice";
import { expect } from "chai";
import { describe } from "mocha";
import { createStubInstance, reset, restore, SinonStubbedInstance, stub } from "sinon";
import { SenderPrepareData, SubgraphTransactionManagerListener } from "../transactionManagerListener";
import pino from "pino";
import { Signer } from "ethers";

import { Handler } from "../handler";

const logger = pino();

describe("Handler", () => {
  let handler: Handler;
  beforeEach(() => {
    const messaging = createStubInstance(NatsNxtpMessagingService);
    const subgraph = createStubInstance(SubgraphTransactionManagerListener);
    const signer = createStubInstance(Signer);
    const txService = createStubInstance(TransactionService);
    handler = new Handler(messaging, subgraph, signer, txService as any, logger);
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("handleSenderPrepare", () => {
    it("should send prepare for receiving chain with ETH asset", async () => {
      const data: SenderPrepareData = {
        /// todo
      };
      stub(handler, "mutatePrepareData").returns(data); // use returns for sync functions, resolve for async
      expect(true).to.be.true;
    });
    it("should send prepare for receiving chain with token asset", async () => {});
  });
});
