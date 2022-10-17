import { createRequestContext, expect, mkAddress, mkBytes32, mkHash } from "@connext/nxtp-utils";
import { stub, SinonStub } from "sinon";
import { CrossChainMessage, CrossChainMessageProof } from "@eth-optimism/sdk";

import * as MockableFns from "../../../../src/mockable";
import { getProcessFromOptimismRootArgs } from "../../../../src/tasks/processFromRoot/helpers";
import { NoRootAvailable } from "../../../../src/tasks/processFromRoot/errors";
import { BigNumber, constants } from "ethers";

let getMessageStateRootStub: SinonStub;
let getMessagesByTransactionStub: SinonStub;
let getMessageProofStub: SinonStub;

class MockCrossChainMessenger {
  public getMessageStateRoot = getMessageStateRootStub;
  public getMessagesByTransaction = getMessagesByTransactionStub;
  public getMessageProof = getMessageProofStub;
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

const mockCrossChainMessageProof: CrossChainMessageProof = {
  stateRoot: mkBytes32("0xdeadbeef"),
  stateRootBatchHeader: {
    batchIndex: constants.One,
    batchRoot: mkBytes32("0xbbb"),
    batchSize: constants.Two,
    extraData: "0xfee",
    prevTotalElements: constants.Zero,
  },
  stateRootProof: { index: 42, siblings: [] },
  stateTrieWitness: mkAddress("0xdeaf"),
  storageTrieWitness: mkAddress("0xddbeef"),
};

describe("Helpers: Optimism", () => {
  beforeEach(() => {
    stub(MockableFns, "CrossChainMessenger").value(MockCrossChainMessenger);
    getMessageStateRootStub = stub().resolves(mkHash("0xdeadbeef"));
    getMessagesByTransactionStub = stub().resolves([mockCrossChainMessage]);
    getMessageProofStub = stub().resolves(mockCrossChainMessageProof);
  });

  it("should throw error if undefined", async () => {
    getMessageStateRootStub.resolves(undefined);
    await expect(
      getProcessFromOptimismRootArgs({
        spokeChainId: 1,
        spokeDomainId: "1",
        spokeProvider: "world",
        hubChainId: 2,
        hubDomainId: "2",
        hubProvider: "hello",
        sendHash: mkHash("0xbaa"),
        _requestContext: createRequestContext("foo"),
      }),
    ).to.be.rejectedWith(NoRootAvailable);
  });

  it("should work", async () => {
    const args = await getProcessFromOptimismRootArgs({
      spokeChainId: 1,
      spokeDomainId: "1",
      spokeProvider: "world",
      hubChainId: 2,
      hubDomainId: "2",
      hubProvider: "hello",
      sendHash: mkHash("0xbaa"),
      _requestContext: createRequestContext("foo"),
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
