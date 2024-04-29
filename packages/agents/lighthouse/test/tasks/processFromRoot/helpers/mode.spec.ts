import { createRequestContext, expect, mkAddress, mkBytes32, mkHash } from "@connext/nxtp-utils";
import { stub, SinonStub } from "sinon";
import { CrossChainMessage, StateRoot } from "@eth-optimism/sdk";

import * as MockableFns from "../../../../src/mockable";
import { getProcessFromModeRootArgs } from "../../../../src/tasks/processFromRoot/helpers";
import { NoRootAvailable } from "../../../../src/tasks/processFromRoot/errors";
import { BigNumber, constants } from "ethers";

let getMessageStateRootStub: SinonStub;
let getMessagesByTransactionStub: SinonStub;
let toLowLevelMessageStub: SinonStub;
let toCrossChainMessageStub: SinonStub;
let getMessageProofStub: SinonStub;
let getMessageStatusStub: SinonStub;
let getBedrockMessageProofStub: SinonStub;

// TODO: need to import from sdk but not in types
interface BedrockCrossChainMessageProof {
  l2OutputIndex: number;
  outputRootProof: string[];
  withdrawalProof: string[];
}

class MockCrossChainMessenger {
  public getMessageStateRoot = getMessageStateRootStub;
  public getMessagesByTransaction = getMessagesByTransactionStub;
  public getMessageProof = getMessageProofStub;
  public getMessageStatus = getMessageStatusStub;
  public toLowLevelMessage = toLowLevelMessageStub;
  public toCrossChainMessage = toCrossChainMessageStub;
  public getBedrockMessageProof = getBedrockMessageProofStub;
}

const mockStateRoot: StateRoot = {
  stateRoot: mkHash("0x123"),
  stateRootIndexInBatch: 1,
  batch: {
    blockNumber: 1,
    header: {
      batchIndex: BigNumber.from(1),
      batchRoot: mkHash("0x123"),
      batchSize: BigNumber.from(1),
      prevTotalElements: BigNumber.from(1),
      extraData: mkHash("0x123"),
    },
    stateRoots: [mkHash("0x123")],
  },
};

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

const mockCrossChainMessageProof: BedrockCrossChainMessageProof = {
  l2OutputIndex: 1235,
  outputRootProof: [mkBytes32("0xdeaf")],
  withdrawalProof: [mkBytes32("0xddbeef")],
};

describe("Helpers: Mode", () => {
  beforeEach(() => {
    stub(MockableFns, "OptimismCrossChainMessenger").value(MockCrossChainMessenger);
    getMessageStateRootStub = stub().resolves(mockStateRoot);
    getMessagesByTransactionStub = stub().resolves(mockCrossChainMessage);
    getMessageProofStub = stub().resolves(mockCrossChainMessageProof);
  });

  it("should work", async () => {
    stub(MockableFns, "OptimismCrossChainMessenger").value(MockCrossChainMessenger);
    getMessageStateRootStub = stub().resolves(mockStateRoot);
    getMessagesByTransactionStub = stub().resolves([mockCrossChainMessage]);
    getMessageProofStub = stub().resolves(mockCrossChainMessageProof);
    getMessageStatusStub = stub().resolves(3);
    toLowLevelMessageStub = stub().resolves(mockCrossChainMessage);
    toCrossChainMessageStub = stub().resolves(mockCrossChainMessage);
    getBedrockMessageProofStub = stub().resolves(mockCrossChainMessageProof);

    const args = await getProcessFromModeRootArgs({
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
      {
        nonce: mockCrossChainMessage.messageNonce.toString(),
        target: mockCrossChainMessage.target,
        sender: mockCrossChainMessage.sender,
        data: mockCrossChainMessage.message,
        value: mockCrossChainMessage.value,
        gasLimit: mockCrossChainMessage.minGasLimit,
      },
      mockCrossChainMessageProof.l2OutputIndex,
      mockCrossChainMessageProof.outputRootProof,
      mockCrossChainMessageProof.withdrawalProof,
    ]);
  });
});
