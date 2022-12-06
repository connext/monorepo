import { ConnextAbi } from "@connext/nxtp-contracts";
import { TransactionService } from "@connext/nxtp-txservice";
import { createRequestContext, expect, Logger, mkAddress, mkHash, mock } from "@connext/nxtp-utils";
import { BigNumber, providers } from "ethers";
import { createStubInstance, SinonStubbedInstance, stub, SinonStub } from "sinon";

import { Pauser } from "../../src/pause";
import { VerifierContext } from "../../src/types";

describe("Watcher Adapter: Pauser", () => {
  const domain = "1337";
  const connextAddress = mkAddress("0x987654321");

  let readTxResult = "0x0000000000000000000000000000000000000000000000000000000000000000"; // false
  let requestContext = createRequestContext("Watcher Adapter: Pauser tests");
  let domains = [domain];

  let txservice: SinonStubbedInstance<TransactionService>;
  let context: VerifierContext;
  let pauser: Pauser;

  beforeEach(() => {
    txservice = createStubInstance(TransactionService, {
      readTx: Promise.resolve(readTxResult),
    });
    const logger = createStubInstance(Logger);
    context = {
      domains,
      txservice,
      logger,
      isStaging: true,
    };
    pauser = new Pauser(context);

    stub(pauser as any, "getConnextDeployment").returns({
      abi: [...ConnextAbi, "function paused() view returns (bool)"],
      address: connextAddress,
    });
  });

  describe("#pause", () => {
    beforeEach(() => {});

    it("should return empty array when domains empty", async () => {
      let result = await pauser.pause("for test", []);
      expect(result).to.be.empty;
    });

    it("should fail if deployment not exist", async () => {
      const result = await pauser.pause("for test", ["112312312312312"]);
      expect(result[0].domain).to.be.equal("112312312312312");
      expect(result[0].paused).to.be.equal(false);
      expect(result[0].relevantTransaction).to.be.equal("");
      expect(result[0].error.toString()).to.be.equal(
        "Error: Cannot find corresponding chainId for domain 112312312312312",
      );
    });

    it("should skip if already paused", async () => {
      txservice.readTx.callsFake(async (): Promise<string> => {
        return "0x0000000000000000000000000000000000000000000000000000000000000001"; // true
      });
      const result = await pauser.pause("for test", domains);
      expect(result[0].domain).to.be.equal(domain);
      expect(result[0].paused).to.be.equal(false);
      expect(result[0].relevantTransaction).to.be.equal("");
      expect(result[0].error.toString()).to.be.equal("Error: Already Paused");
    });

    it("should fail if pause tx failed", async () => {
      txservice.sendTx.throws("send tx failed");

      const result = await pauser.pause("for test", domains);
      expect(result[0].domain).to.be.equal(domain);
      expect(result[0].paused).to.be.equal(false);
      expect(result[0].relevantTransaction).to.be.equal("");
      expect(result[0].error.toString()).to.be.equal("send tx failed");
    });

    it("should success if not paused", async () => {
      txservice.sendTx.callsFake(async (): Promise<providers.TransactionReceipt> => {
        return mock.ethers.receipt({ transactionHash: mkHash("0x1") });
      });

      const result = await pauser.pause("for test", domains);
      expect(result[0].domain).to.be.equal(domain);
      expect(result[0].paused).to.be.equal(true);
      expect(result[0].relevantTransaction).to.be.equal(mkHash("0x1"));
      expect(result[0].error).to.be.null;

      expect(txservice.sendTx).to.have.been.callCount(1);
    });
  });
});
