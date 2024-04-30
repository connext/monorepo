import { Logger, createRequestContext, expect, mkHash } from "@connext/nxtp-utils";
import { stub, SinonStub, createStubInstance, SinonStubbedInstance, spy } from "sinon";
import { L2ToL1MessageReader } from "@arbitrum/sdk";
import { NodeInterface__factory } from "@arbitrum/sdk/dist/lib/abi/factories/NodeInterface__factory";

import * as MockableFns from "../../../../src/mockable";
import { getProcessFromArbitrumRootArgs } from "../../../../src/tasks/processFromRoot/helpers";
import {
  ConfirmDataDoesNotMatch,
  NoRootAvailable,
  RollUpNodeStaked,
} from "../../../../src/tasks/processFromRoot/errors";
import { ArbitrumNodeCreatedEventsNotFound } from "../../../../src/errors/processor";
import { BigNumber, constants } from "ethers";
import { getContext } from "../../../../src/tasks/processFromRoot/processFromRoot";

class MockJsonRpcProvider {
  public getTransactionReceipt = stub().resolves({ hello: "world" });
  public getBlockNumber = stub().resolves(1232132);
}

let isDataAvailableStub: SinonStub<any[], any>;
let l2ToL1MessageReader: SinonStubbedInstance<L2ToL1MessageReader>;
class MockL2TransactionReceipt {
  public isDataAvailable = isDataAvailableStub;
  public getL2ToL1Messages = stub().resolves([l2ToL1MessageReader]);
}
class MockL2TransactionReceiptTemp {
  public isDataAvailable = isDataAvailableStub;
  public getL2ToL1Messages = stub().resolves([{}]);
}

class MockEventFetcher {
  public getEvents = stub().resolves([{ event: { nodeNum: constants.One } }]);
}

class MockEventFetcherError {
  public getEvents = stub().resolves([]);
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
    } as any);
    (l2ToL1MessageReader as any).nitroReader = {
      getBlockFromNodeNum: (...args: any) =>
        Promise.resolve({
          blockNumber: constants.One,
          nodeNum: constants.One,
          sendRoot: mkHash("0x123"),
          sendCount: constants.One,
          hash: mkHash("0x456"),
        } as any),
      getBlockFromNodeLog: (...args: any) =>
        Promise.resolve({
          blockNumber: constants.One,
          nodeNum: constants.One,
          sendRoot: mkHash("0x123"),
          sendCount: constants.One,
          hash: mkHash("0x456"),
        } as any),
      event: { position: constants.One, ethBlockNum: constants.One },
    };
    stub(MockableFns, "L2TransactionReceipt").value(MockL2TransactionReceipt);
    stub(MockableFns, "JsonRpcProvider").value(MockJsonRpcProvider);
    stub(MockableFns, "EventFetcher").value(MockEventFetcher);
    stub(MockableFns, "Outbox__factory").value(mockOutboxFactory);
    stub(NodeInterface__factory, "connect").callsFake((address: string, signerOrProvider) => {
      return { constructOutboxProof: stub().resolves({ proof: ["hello", "world"] }) } as any;
    });
    confirmData = stub().returns([
      {
        confirmData: "0x950ed348e2b49c023a3402410751876c1ea3d07c85b315cec0aae5a46e546b34",
        stakerCount: BigNumber.from(1),
        childStakerCount: BigNumber.from(1),
      },
    ]);
    stub(MockableFns, "RollupUserLogic__factory").value({
      createInterface: stub().returns({
        encodeFunctionData: stub().returns("0x123"),
        decodeFunctionResult: confirmData,
      }),
      getContract: stub().returns({
        connect: stub().returns(undefined),
        calcSrcFees: stub().resolves(constants.One),
      } as any),
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
        message: mkHash("0xaa"),
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
        message: mkHash("0xaa"),
        _requestContext: createRequestContext("foo"),
      }),
    ).to.be.rejectedWith(ConfirmDataDoesNotMatch);
  });

  it("should throw error if stakerCount == 0", async () => {
    confirmData.returns([
      {
        confirmData: "0x950ed348e2b49c023a3402410751876c1ea3d07c85b315cec0aae5a46e546b34",
        stakerCount: BigNumber.from(0),
        childStakerCount: BigNumber.from(1),
      },
    ]);
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
        message: mkHash("0xaa"),
        _requestContext: createRequestContext("foo"),
      }),
    ).to.be.rejectedWith(RollUpNodeStaked);
  });

  it("should throw error if childStakerCount == 0", async () => {
    confirmData.returns([
      {
        confirmData: "0x950ed348e2b49c023a3402410751876c1ea3d07c85b315cec0aae5a46e546b34",
        stakerCount: BigNumber.from(1),
        childStakerCount: BigNumber.from(0),
      },
    ]);
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
        message: mkHash("0xaa"),
        _requestContext: createRequestContext("foo"),
      }),
    ).to.be.rejectedWith(RollUpNodeStaked);
  });

  it("should throw error in case msg event is not present", async () => {
    stub(MockableFns, "L2TransactionReceipt").value(MockL2TransactionReceiptTemp);
    await expect(
      getProcessFromArbitrumRootArgs({
        spokeChainId: 42161,
        spokeDomainId: "1",
        spokeProvider: "world",
        hubChainId: 1,
        hubDomainId: "2",
        hubProvider: "hello",
        sendHash: mkHash("0xbaa"),
        message: mkHash("0xaa"),
        blockNumber: 1,
        _requestContext: createRequestContext("foo"),
      }),
    ).to.be.rejectedWith(`Could not find event for message in ${mkHash("0xbaa")}`);
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
      message: mkHash("0xaa"),
      blockNumber: 1,
      _requestContext: createRequestContext("foo"),
    });
    expect(args).to.be.ok;
  });

  it("should throw error if Event Fetcher fails to retrieve events", async () => {
    stub(MockableFns, "EventFetcher").value(MockEventFetcherError);
    await expect(
      getProcessFromArbitrumRootArgs({
        spokeChainId: 42161,
        spokeDomainId: "1",
        spokeProvider: "world",
        hubChainId: 1,
        hubDomainId: "2",
        hubProvider: "hello",
        sendHash: mkHash("0xbaa"),
        message: mkHash("0xaa"),
        blockNumber: 1,
        _requestContext: createRequestContext("foo"),
      }),
    ).to.be.rejectedWith(ArbitrumNodeCreatedEventsNotFound);
  });

  it("should have warning in getBlockFromNodeLog fails", async () => {
    (l2ToL1MessageReader as any).nitroReader = {
      getBlockFromNodeNum: (...args: any) =>
        Promise.resolve({
          blockNumber: constants.One,
          nodeNum: constants.One,
          sendRoot: mkHash("0x123"),
          sendCount: constants.One,
          hash: mkHash("0x456"),
        } as any),
      getBlockFromNodeLog: (...args: any) =>
        Promise.reject({
          blockNumber: constants.One,
          nodeNum: constants.One,
          sendRoot: mkHash("0x123"),
          sendCount: constants.One,
          hash: mkHash("0x456"),
        } as any),
      event: { position: constants.One, ethBlockNum: constants.One },
    };
    const loggerSpy = spy(getContext().logger, "warn");

    const args = await getProcessFromArbitrumRootArgs({
      spokeChainId: 42161,
      spokeDomainId: "1",
      spokeProvider: "world",
      hubChainId: 1,
      hubDomainId: "2",
      hubProvider: "hello",
      sendHash: mkHash("0xbaa"),
      message: mkHash("0xaa"),
      blockNumber: 1,
      _requestContext: createRequestContext("foo"),
    });

    expect(loggerSpy.calledOnce).to.be.true;
    expect(loggerSpy.firstCall.args[0]).to.include("Failed to get block from node log");
  });
});
