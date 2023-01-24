import { ConnextAbi } from "@connext/smart-contracts";
import { TransactionService } from "@connext/nxtp-txservice";
import { createRequestContext, expect, Logger, mkAddress, mkHash, mock } from "@connext/nxtp-utils";
import { BigNumber, providers } from "ethers";
import { createStubInstance, SinonStubbedInstance, stub } from "sinon";

import { Pauser } from "../../src/pause";
import { VerifierContext } from "../../src/types";

describe("Watcher Adapter: Pauser", () => {
  const domain = "133712";
  const connextAddress = mkAddress("0x987654321");

  let readTxResult = "0x0000000000000000000000000000000000000000000000000000000000000000"; // false
  let requestContext = createRequestContext("Watcher Adapter: Pauser tests");
  let domains = [domain];

  let txservice: SinonStubbedInstance<TransactionService>;
  let context: VerifierContext;
  let pauser: Pauser;
  let logger: Logger;

  beforeEach(() => {
    txservice = createStubInstance(TransactionService, {
      readTx: Promise.resolve(readTxResult),
    });
    logger = createStubInstance(Logger);
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
    beforeEach(() => {
      txservice.getGasPrice.resolves(BigNumber.from(1000));
    });

    it("should return empty array when domains empty", async () => {
      let result = await pauser.pause(requestContext, "for test", []);
      expect(result).to.be.empty;
    });

    it("should fail if deployment not exist", async () => {
      const result = await pauser.pause(requestContext, "for test", ["112312312312312"]);
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
      const result = await pauser.pause(requestContext, "for test", domains);
      expect(result[0].domain).to.be.equal(domain);
      expect(result[0].paused).to.be.equal(false);
      expect(result[0].relevantTransaction).to.be.equal("");
      expect(result[0].error.toString()).to.be.equal("Error: Already Paused");
    });

    it("should fail if getGasPrice fails", async () => {
      txservice.getGasPrice.throws("failure");
      const result = await pauser.pause(requestContext, "for test", domains);
      expect(result[0].domain).to.be.equal(domain);
      expect(result[0].paused).to.be.equal(false);
      expect(result[0].relevantTransaction).to.be.equal("");
      expect(result[0].error.toString()).to.be.equal("failure");
    });

    it("should fail if pause tx failed", async () => {
      txservice.sendTx.throws("send tx failed");

      const result = await pauser.pause(requestContext, "for test", domains);
      expect(result[0].domain).to.be.equal(domain);
      expect(result[0].paused).to.be.equal(false);
      expect(result[0].relevantTransaction).to.be.equal("");
      expect(result[0].error.toString()).to.be.equal("send tx failed");
    });

    it("should success if not paused", async () => {
      txservice.sendTx.callsFake(async (): Promise<providers.TransactionReceipt> => {
        return mock.ethers.receipt({ transactionHash: mkHash("0x1") });
      });

      const result = await pauser.pause(requestContext, "for test", domains);
      expect(result[0].domain).to.be.equal(domain);
      expect(result[0].paused).to.be.equal(true);
      expect(result[0].relevantTransaction).to.be.equal(mkHash("0x1"));
      expect(result[0].error).to.be.null;

      expect(txservice.sendTx).to.have.been.callCount(1);
    });

    it("should handle a single domain failing", async () => {
      domains.push("1236565");
      txservice.sendTx.callsFake(async (): Promise<providers.TransactionReceipt> => {
        return mock.ethers.receipt({ transactionHash: mkHash("0x1") });
      });
      const result = await pauser.pause(requestContext, "test", domains);
      expect(result[0].domain).to.be.equal(domains[0]);
      expect(result[0].paused).to.be.equal(true);
      expect(result[0].relevantTransaction).to.be.equal(mkHash("0x1"));
      expect(result[0].error).to.be.null;
      expect(result[1].domain).to.be.equal(domains[1]);
      expect(result[1].paused).to.be.equal(false);
      expect(result[1].relevantTransaction).to.be.equal("");
      expect(result[1].error.toString()).to.be.equal(
        "Error: Cannot find corresponding chainId for domain " + domains[1],
      );
    });
  });
});
