import { TransactionService } from "@connext/nxtp-txservice";
import { createRequestContext, expect, Logger, mkAddress, mkBytes32 } from "@connext/nxtp-utils";
import { BigNumber } from "ethers";
import { createStubInstance, SinonStubbedInstance, stub, SinonStub } from "sinon";

import { Pauser } from "../../src/pause";
import { VerifierContext } from "../../src/types";

describe("Watcher Adapter: Pauser", () => {
  const canonicalDomain = "1337";

  let readTxResult = "test 123";
  let requestContext = createRequestContext("Watcher Adapter: Pauser tests");
  let domains = [canonicalDomain];

  let txservice: SinonStubbedInstance<TransactionService>;
  let context: VerifierContext;
  let pauser: Pauser;

  beforeEach(() => {
    txservice = createStubInstance(TransactionService, { readTx: Promise.resolve(readTxResult) });
    const logger = createStubInstance(Logger);
    context = {
      domains,
      txservice,
      logger,
      isStaging: true,
    };
    pauser = new Pauser(context);
  });

  describe("#pause", () => {
    beforeEach(() => {});

    it("should return empty array when domains empty", async () => {
      let result = await pauser.pause("for test", []);
      expect(result).to.be.empty;
    });

    it("should fail if deployment not exist", async () => {
      expect(await pauser.pause("for test", ["112312312312312"])).to.be.deep.equal([false]);
    });
  });
});
