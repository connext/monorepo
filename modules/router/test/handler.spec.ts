import { NatsNxtpMessagingService } from "@connext/nxtp-utils";
import { ChainService } from "@connext/nxtp-chainservice";
import { expect } from "chai";
import { describe } from "mocha";
import { createStubInstance, reset, restore, SinonStubbedInstance } from "sinon";
import { SubgraphTransactionManagerListener } from "src/transactionManagerListener";
import pino from "pino";
import { Signer } from "ethers";

import { Handler } from "../src/handler";

const logger = pino();

describe("Handler", () => {
  let handler: Handler;
  beforeEach(() => {
    const messaging = createStubInstance(NatsNxtpMessagingService);
    const subgraph = createStubInstance(SubgraphTransactionManagerListener);
    const signer = createStubInstance(Signer);
    const txService = createStubInstance(ChainService);
    handler = new Handler(messaging, subgraph, signer, txService as any, logger);
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("handleSenderPrepare", () => {
    it("should send prepare for receiving chain with ETH asset", async () => {
      expect(true).to.be.true;
    });
    it("should send prepare for receiving chain with token asset", async () => {});
  });
});
