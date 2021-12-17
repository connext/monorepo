import { randomInt } from "crypto";
import { SinonStub, stub } from "sinon";
import { expect } from "@connext/nxtp-utils";

import { RpcError, SyncProvider, TransactionReverted } from "../../src/shared";
import { TEST_ERROR, TEST_SENDER_CHAIN_ID } from "../utils";

describe("SyncProvider", () => {
  const testStallTimeout = 100;
  let provider: SyncProvider;

  beforeEach(() => {
    provider = new SyncProvider(
      {
        url: "http://------------------",
      },
      TEST_SENDER_CHAIN_ID,
      testStallTimeout,
      process.env.LOG_LEVEL === "debug",
    );
  });

  it("has correct default values", () => {
    // Expected default values.
    expect(provider.synced).to.be.true;
    expect(provider.syncedBlockNumber).to.be.eq(-1);
    expect(provider.lag).to.be.eq(0);
    expect(provider.priority).to.be.eq(0);
    expect(provider.cps).to.be.eq(0);
    expect(provider.latency).to.be.eq(0);
    expect(provider.reliability).to.be.eq(1);
  });

  describe("#sync", () => {
    let testBlockNumber = randomInt(999999999999);
    let getBlockNumberStub: SinonStub;
    beforeEach(() => {
      getBlockNumberStub = stub(provider, "getBlockNumber");
      getBlockNumberStub.resolves(testBlockNumber);
    });

    it("should retrieve current block number", async () => {
      await provider.sync();
      expect(getBlockNumberStub.calledOnce).to.be.true;
      expect(provider.syncedBlockNumber).to.be.equal(testBlockNumber);
    });

    it("should throw if getBlockNumber throws", async () => {
      getBlockNumberStub.rejects(TEST_ERROR);
      await expect(provider.sync()).to.be.rejectedWith(TEST_ERROR);
    });
  });

  describe("#send", () => {
    const testMethod = "testMethod";
    const testParams = ["testParam1", "testParam2"];
    const expectedSendResult = "test send result";

    let superSendStub: SinonStub;
    let updateMetricsStub: SinonStub;
    beforeEach(() => {
      updateMetricsStub = stub(provider as any, "updateMetrics");
      // This will stub StaticJsonRpcProvider (super class) send method. Only needs to be done once.
      try {
        superSendStub = stub((provider as any).__proto__, "send").resolves(expectedSendResult);
      } catch (error) {
        // TypeError: Attempted to wrap send which is already wrapped
        // This happens when we've already stubbed the proto method. Should be ignored.
        if (!(error instanceof TypeError)) {
          throw error;
        }
      }
    });

    it("should intercept rpc send call", async () => {
      const result = await provider.send(testMethod, testParams);
      expect(superSendStub.calledOnce).to.be.true;
      expect(superSendStub.calledWith(testMethod, testParams)).to.be.true;
      // TODO: For some reason this stub is not being called.
      // expect(updateMetricsStub.calledOnce).to.be.true;
      expect(result).to.be.eq(expectedSendResult);
    });

    it("if attempt fails due to non-RpcError, throws", async () => {
      superSendStub.rejects(TEST_ERROR);
      await expect(provider.send(testMethod, testParams)).to.be.rejectedWith(TEST_ERROR);
      // expect(updateMetricsStub.calledOnce).to.be.true;
    });

    it("if every attempt fails due to RpcError, throws RpcError", async () => {
      const rpcError = new RpcError(RpcError.reasons.ConnectionReset);
      superSendStub.rejects(rpcError);
      await expect(provider.send(testMethod, testParams)).to.be.rejectedWith(RpcError);
      // expect(updateMetricsStub.callCount).to.be.eq(5);
    });
  });

  describe("#updateMetrics", () => {
    const startingReliability = 0.2;
    beforeEach(() => {
      provider.reliability = startingReliability;
    });

    it("success: should update its internal metrics correctly", async () => {
      (provider as any).updateMetrics(true, Date.now() - 1000, 12, "testMethodName", ["testParam1", "testParam2"]);
      expect(provider.reliability).to.be.gt(startingReliability);
      expect(provider.latency).to.be.gt(0);
      expect((provider as any).latencies.length).to.be.eq(1);
    });

    it("RPC failure: should update its internal metrics correctly", async () => {
      (provider as any).updateMetrics(false, Date.now() - 1000, 12, "testMethodName", ["testParam1", "testParam2"], {
        type: RpcError.type,
        context: {},
      });
      expect(provider.reliability).to.be.lt(startingReliability);
      expect(provider.latency).to.be.gt(0);
      expect((provider as any).latencies.length).to.be.eq(1);
    });

    it("non-RPC failure: should update its internal metrics correctly", async () => {
      (provider as any).updateMetrics(false, Date.now() - 1000, 12, "testMethodName", ["testParam1", "testParam2"], {
        type: TransactionReverted.type,
        context: {},
      });
      // Reliability should be unchanged.
      expect(provider.reliability).to.be.eq(startingReliability);
      expect(provider.latency).to.be.gt(0);
      expect((provider as any).latencies.length).to.be.eq(1);
    });
  });
});
