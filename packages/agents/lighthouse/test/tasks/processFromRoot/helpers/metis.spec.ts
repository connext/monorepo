import { createRequestContext, expect, mkAddress, mkBytes32, mkHash } from "@connext/nxtp-utils";
import { stub, SinonStub } from "sinon";
import { CrossChainMessage, MessageStatus, StateRootBatchHeader, StateRootBatch, StateRoot } from "@eth-optimism/sdk";

import * as MockableFns from "../../../../src/mockable";
import { getProcessFromMetisRootArgs } from "../../../../src/tasks/processFromRoot/helpers/metis/index";
import { NoRootAvailable } from "../../../../src/tasks/processFromRoot/errors";
import { BigNumber, constants } from "ethers";
import * as UtilsFns from "../../../../src/tasks/processFromRoot/helpers/metis/utils";

let getMessageStatusStub: SinonStub;
let toCrosschainMessageStub: SinonStub;
let toLowLevelMessageStub: SinonStub;
let getBedrockMessageProofStub: SinonStub;
let getMessageStateRootStub: SinonStub;
let getMessagesByTransactionStub: SinonStub;
let getMessageProofStub: SinonStub;

// TODO: need to import from sdk but not in types
interface BedrockCrossChainMessageProof {
  l2OutputIndex: number;
  outputRootProof: string[];
  withdrawalProof: string[];
}

class MockCrossChainMessenger {
  public getMessageStatus = getMessageStatusStub;
  public toCrossChainMessage = toCrosschainMessageStub;
  public getBedrockMessageProof = getBedrockMessageProofStub;
  public toLowLevelMessage = toLowLevelMessageStub;
}

const mockCrossChainMessage: CrossChainMessage = {
  blockNumber: 1,
  direction: 1,
  logIndex: 42,
  message: mkHash("0xdeadbeef"),
  messageNonce: constants.One,
  minGasLimit: BigNumber.from(100000),
  sender: mkAddress("0xdead"),
  target: mkAddress("0xbeef"),
  transactionHash: mkBytes32("0xeeed"),
  value: constants.Two,
};

// Mocking a StateRootBatchHeader
const mockStateRootBatchHeader: StateRootBatchHeader = {
  batchIndex: BigNumber.from(1),
  batchRoot: "0x123abc",
  batchSize: BigNumber.from(5),
  prevTotalElements: BigNumber.from(10),
  extraData: "Batch information",
};

// Mocking an array of StateRoots
const mockStateRoots: string[] = ["0xabc123", "0xdef456", "0xghi789", "0xjkl012", "0xmnq345"];

// Mocking a StateRootBatch
const mockStateRootBatch: StateRootBatch = {
  blockNumber: 12345,
  header: mockStateRootBatchHeader,
  stateRoots: mockStateRoots,
};

// Mocking a StateRoot
const mockStateRoot: StateRoot = {
  stateRoot: "0xabc123",
  stateRootIndexInBatch: 0,
  batch: mockStateRootBatch,
};

const mockCrossChainMessageProof: BedrockCrossChainMessageProof = {
  l2OutputIndex: 1235,
  outputRootProof: [mkBytes32("0xdeaf")],
  withdrawalProof: [mkBytes32("0xddbeef")],
};

describe("Helpers: Metis", () => {
  beforeEach(() => {
    stub(MockableFns, "OptimismCrossChainMessenger").value(MockCrossChainMessenger);
    getMessageStatusStub = stub().resolves(MessageStatus.READY_TO_PROVE);
    toCrosschainMessageStub = stub().resolves(mockCrossChainMessage);
    toLowLevelMessageStub = stub().resolves(mockCrossChainMessage);
    getBedrockMessageProofStub = stub().resolves(mockCrossChainMessageProof);
    getMessageStateRootStub = stub(UtilsFns, "getMessageStateRoot");
    getMessagesByTransactionStub = stub(UtilsFns, "getMessagesByTransaction");
    getMessageProofStub = stub(UtilsFns, "getMessageProof");
  });

  it("should throw error if no proof found", async () => {
    getMessageStateRootStub.resolves(undefined);
    await expect(
      getProcessFromMetisRootArgs({
        spokeChainId: 1,
        spokeDomainId: "1",
        spokeProvider: "world",
        hubChainId: 2,
        hubDomainId: "2",
        hubProvider: "hello",
        sendHash: mkHash("0xbaa"),
        _requestContext: createRequestContext("foo"),
        message: "0xbabababababa",
        blockNumber: 1,
      }),
    ).to.be.rejectedWith(NoRootAvailable);
  });

  it("should work", async () => {
    getMessageStateRootStub.resolves(mockStateRoot);
    getMessagesByTransactionStub.resolves([mockCrossChainMessage]);
    getMessageProofStub.resolves(mockCrossChainMessageProof);
    const args = await getProcessFromMetisRootArgs({
      spokeChainId: 1,
      spokeDomainId: "1",
      spokeProvider: "world",
      hubChainId: 2,
      hubDomainId: "2",
      hubProvider: "hello",
      sendHash: mkHash("0xbaa"),
      _requestContext: createRequestContext("foo"),
      message: "0xbabababababa",
      blockNumber: 1,
    });
    expect(args).to.deep.eq([
      mockCrossChainMessage.target,
      mockCrossChainMessage.sender,
      mockCrossChainMessage.message,
      mockCrossChainMessage.messageNonce,
      mockCrossChainMessageProof,
    ]);
  });
});
