import { ConnextAbi } from "@connext/smart-contracts";
import { TransactionService } from "@connext/nxtp-txservice";
import { createRequestContext, expect, Logger, mkAddress, mkHash, mock } from "@connext/nxtp-utils";
import { BigNumber, providers } from "ethers";
import { createStubInstance, SinonStubbedInstance, SinonStub, stub } from "sinon";

import { Switcher } from "../../src/switch";
import { VerifierContext } from "../../src/types";

describe("Monitor Adapter: Switcher", () => {
  const connextAddress = mkAddress("0x987654321");
  const RANDOM_TEST_REASON = "Testing";

  let readTxResult = "0x0000000000000000000000000000000000000000000000000000000000000000"; // false
  let requestContext = createRequestContext("Monitor Adapter: Switcher tests");
  let hubDomain = "1735353714"; // goerli

  let txservice: SinonStubbedInstance<TransactionService>;
  let context: VerifierContext;
  let switcher: Switcher;
  let logger: Logger;
  let checkIfInOptimisticModeStub: SinonStub<any[], any>;

  beforeEach(() => {
    txservice = createStubInstance(TransactionService, {
      readTx: Promise.resolve(readTxResult),
    });
    logger = createStubInstance(Logger);
    context = {
      domains: [hubDomain],
      txservice,
      logger,
      isStaging: true,
    };
    switcher = new Switcher(context);

    checkIfInOptimisticModeStub = stub(switcher, <any>"checkIfInOptimisticMode");

    stub(switcher as any, "getConnextDeployment").returns({
      abi: [...ConnextAbi],
      address: connextAddress,
    });
  });

  describe("#switch", () => {
    beforeEach(() => {
      txservice.getGasPrice.resolves(BigNumber.from(1000));
    });

    it("should not do anything if we are in slow mode ", async () => {
      // Mock behavior of internal functions
      checkIfInOptimisticModeStub.resolves(false);

      // Call function
      const result = await switcher.switch(requestContext, RANDOM_TEST_REASON, +hubDomain);

      // Expectations
      const expectedResult = {
        domain: +hubDomain,
        switched: false,
        error: new Error("Already In Slow Mode"),
        relevantTransaction: "",
      };

      expect(result).to.deep.equal(expectedResult);
    });

    it("should switch if we are in optimistic mode", async () => {
      // Declare variables
      const transactionHash = mkHash("0x1");

      // Mock behavior of internal functions
      checkIfInOptimisticModeStub.resolves(true);

      txservice.sendTx.callsFake(async (): Promise<providers.TransactionReceipt> => {
        return mock.ethers.receipt({ transactionHash, status: 1 });
      });

      // Call function
      const result = await switcher.switch(requestContext, RANDOM_TEST_REASON, +hubDomain);

      // Expectations
      const expectedResult = {
        domain: +hubDomain,
        switched: true,
        error: "",
        relevantTransaction: transactionHash,
      };

      expect(result).to.deep.equal(expectedResult);
      expect(txservice.sendTx).to.have.been.callCount(1);
    });

    it("should fail if switch tx failed", async () => {
      // Declare variables
      const transactionHash = mkHash("0x1");

      // Mock behavior of internal functions
      checkIfInOptimisticModeStub.resolves(true);

      txservice.sendTx.callsFake(async (): Promise<providers.TransactionReceipt> => {
        return mock.ethers.receipt({ transactionHash, status: 0 });
      });

      // Call function
      const result = await switcher.switch(requestContext, RANDOM_TEST_REASON, +hubDomain);

      // Expectations
      const expectedResult = {
        domain: +hubDomain,
        switched: false,
        error: "Transaction reverted",
        relevantTransaction: transactionHash,
      };

      expect(result).to.deep.equal(expectedResult);
      expect(txservice.sendTx).to.have.been.callCount(1);
    });

    it("should fail if getGasPrice fails", async () => {
      // Mock behavior of internal functions
      checkIfInOptimisticModeStub.resolves(true);
      txservice.getGasPrice.throws(new Error("Failure getting gasPrice"));

      // Call function
      const result = await switcher.switch(requestContext, RANDOM_TEST_REASON, +hubDomain);

      // Expectations
      const expectedResult = {
        domain: +hubDomain,
        switched: false,
        error: "Failure getting gasPrice",
        relevantTransaction: "",
      };

      expect(result).to.deep.equal(expectedResult);
    });
  });
});
