import { createRequestContext, expect, mkHash } from "@connext/nxtp-utils";
import { stub, SinonStub, createStubInstance, SinonStubbedInstance } from "sinon";
import { L2ToL1MessageReader } from "@arbitrum/sdk";

import * as MockableFns from "../../../../src/mockable";
import { getProcessFromArbitrumRootArgs } from "../../../../src/tasks/processFromRoot/helpers";
import { ConfirmDataDoesNotMatch, NoRootAvailable } from "../../../../src/tasks/processFromRoot/errors";
import { constants } from "ethers";

class MockJsonRpcProvider {
  public getTransactionReceipt = stub().resolves({ hello: "world" });
}

let isDataAvailableStub: SinonStub<any[], any>;
let l2ToL1MessageReader: SinonStubbedInstance<L2ToL1MessageReader>;
class MockL2TransactionReceipt {
  public isDataAvailable = isDataAvailableStub;
  public getL2ToL1Messages = stub().resolves([l2ToL1MessageReader]);
}

class MockEventFetcher {
  public getEvents = stub().resolves([{ event: { nodeNum: constants.One } }]);
}

const mockOutboxFactory = {
  connect: stub().returns({
    calculateMerkleRoot: stub().resolves(mkHash("0x123")),
    calculateItemHash: stub().resolves(mkHash("0x456")),
  }),
};

describe("Helpers: Arbitrum", () => {
  let confirmData: SinonStub<any[], any>;
  beforeEach(() => {
    isDataAvailableStub = stub().resolves(true);
    l2ToL1MessageReader = createStubInstance(L2ToL1MessageReader, {
      getOutboxProof: Promise.resolve(["hello", "world"]),
      getBlockFromNodeLog: Promise.resolve({
        blockNumber: constants.One,
        nodeNum: constants.One,
        sendRoot: mkHash("0x123"),
        hash: mkHash("0x456"),
      } as any),
    } as any);
    (l2ToL1MessageReader as any).event = { position: { nodeNum: constants.One }, ethBlockNum: constants.One };
    stub(MockableFns, "L2TransactionReceipt").value(MockL2TransactionReceipt);
    stub(MockableFns, "JsonRpcProvider").value(MockJsonRpcProvider);
    stub(MockableFns, "EventFetcher").value(MockEventFetcher);
    stub(MockableFns, "Outbox__factory").value(mockOutboxFactory);
    confirmData = stub().returns([
      { confirmData: "0x950ed348e2b49c023a3402410751876c1ea3d07c85b315cec0aae5a46e546b34" },
    ]);
    stub(MockableFns, "RollupUserLogic__factory").value({
      createInterface: stub().returns({
        encodeFunctionData: stub().returns("0x123"),
        decodeFunctionResult: confirmData,
      }),
    });
  });

  it("should throw error if undefined", async () => {
    isDataAvailableStub.resolves(false);
    await expect(
      getProcessFromArbitrumRootArgs({
        spokeChainId: 42161,
        spokeDomainId: "1",
        spokeProvider: "world",
        hubChainId: 1,
        hubDomainId: "2",
        blockNumber: 1,
        hubProvider: "hello",
        sendHash: mkHash("0xbaa"),
        _requestContext: createRequestContext("foo"),
      }),
    ).to.be.rejectedWith(NoRootAvailable);
  });

  it("should throw error if confirm data does not match", async () => {
    confirmData.returns([{ confirmData: "0xfoo" }]);
    await expect(
      getProcessFromArbitrumRootArgs({
        spokeChainId: 42161,
        spokeDomainId: "1",
        spokeProvider: "world",
        hubChainId: 1,
        blockNumber: 1,
        hubDomainId: "2",
        hubProvider: "hello",
        sendHash: mkHash("0xbaa"),
        _requestContext: createRequestContext("foo"),
      }),
    ).to.be.rejectedWith(ConfirmDataDoesNotMatch);
  });

  it("should work", async () => {
    const args = await getProcessFromArbitrumRootArgs({
      spokeChainId: 42161,
      spokeDomainId: "1",
      spokeProvider: "world",
      hubChainId: 1,
      hubDomainId: "2",
      hubProvider: "hello",
      sendHash: mkHash("0xbaa"),
      blockNumber: 1,
      _requestContext: createRequestContext("foo"),
    });
    expect(args).to.be.ok;
  });
});
