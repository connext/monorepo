import { createRequestContext, expect, mkAddress, mkBytes32, mkHash } from "@connext/nxtp-utils";
import { stub, SinonStub } from "sinon";
import { CrossChainMessage, MessageStatus } from "@eth-optimism/sdk";

import * as MockableFns from "../../../../src/mockable";
import { getProcessFromBaseRootArgs } from "../../../../src/tasks/processFromRoot/helpers";
import { NoRootAvailable } from "../../../../src/tasks/processFromRoot/errors";
import { BigNumber, constants } from "ethers";

let getMessageStatusStub: SinonStub;
let toCrosschainMessageStub: SinonStub;
let toLowLevelMessageStub: SinonStub;
let getBedrockMessageProofStub: SinonStub;

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

const mockCrossChainMessageProof: BedrockCrossChainMessageProof = {
  l2OutputIndex: 1235,
  outputRootProof: [mkBytes32("0xdeaf")],
  withdrawalProof: [mkBytes32("0xddbeef")],
};

describe("Helpers: Base", () => {
  beforeEach(() => {
    stub(MockableFns, "OptimismCrossChainMessenger").value(MockCrossChainMessenger);
    getMessageStatusStub = stub().resolves(MessageStatus.READY_TO_PROVE);
    toCrosschainMessageStub = stub().resolves(mockCrossChainMessage);
    toLowLevelMessageStub = stub().resolves(mockCrossChainMessage);
    getBedrockMessageProofStub = stub().resolves(mockCrossChainMessageProof);
  });

  it("should throw error if status is in changing period", async () => {
    getMessageStatusStub.resolves(MessageStatus.IN_CHALLENGE_PERIOD);
    await expect(
      getProcessFromBaseRootArgs({
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
    ).to.be.rejectedWith(`Optimism message status is not ready to prove: ${MessageStatus.IN_CHALLENGE_PERIOD}`);
  });

  it("should throw error if status is not ready to prove", async () => {
    getMessageStatusStub.resolves(MessageStatus.STATE_ROOT_NOT_PUBLISHED);
    await expect(
      getProcessFromBaseRootArgs({
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
    ).to.be.rejectedWith(`Optimism message status is not ready to prove: ${MessageStatus.STATE_ROOT_NOT_PUBLISHED}`);
  });

  it("should throw error if no proof found", async () => {
    getBedrockMessageProofStub.resolves(undefined);
    await expect(
      getProcessFromBaseRootArgs({
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
    const args = await getProcessFromBaseRootArgs({
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
