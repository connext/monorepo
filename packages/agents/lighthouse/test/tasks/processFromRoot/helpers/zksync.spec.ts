import { createRequestContext, expect, mkAddress, mkHash } from "@connext/nxtp-utils";
import { stub, SinonStub } from "sinon";

import * as MockableFns from "../../../../src/mockable";
import { getProcessFromZkSyncRootArgs } from "../../../../src/tasks/processFromRoot/helpers";
import { NoRootAvailable } from "../../../../src/tasks/processFromRoot/errors";
import { BigNumber, utils } from "ethers";

let getTransactionReceiptStub: SinonStub;
let getLogProofStub: SinonStub;
let getMainContractAddressStub: SinonStub;
let getContractStub: SinonStub;

class MockZkWeb3Provider {
  public getTransactionReceipt = getTransactionReceiptStub;
  public getLogProof = getLogProofStub;
  public getMainContractAddress = getMainContractAddressStub;
}

describe("Helpers: ZkSync", () => {
  beforeEach(() => {
    const l1BatchNumber = 100000;
    stub(MockableFns, "ZkSyncWeb3Provider").value(MockZkWeb3Provider);
    getTransactionReceiptStub = stub().resolves({
      l2ToL1Logs: [{ transactionHash: mkHash("0xdeadbeef"), logIndex: 0, key: utils.zeroPad(mkAddress("0xaabb"), 32) }],
      l1BatchNumber,
      l1BatchTxIndex: 1,
    });
    getLogProofStub = stub().resolves({
      id: 0,
      proof: [mkHash("0x111")],
      root: mkHash("0xdada"),
    });
    getMainContractAddressStub = stub().returns(mkAddress("0xaaaa"));

    getContractStub = stub(MockableFns, "getContract").returns({
      proveL2MessageInclusion: stub().resolves(true),
      getTotalBatchesExecuted: stub().resolves(l1BatchNumber),
    } as any);
  });

  it("should throw error if no logs", async () => {
    getTransactionReceiptStub.resolves({
      l2ToL1Logs: [],
      l1BatchNumber: 100000,
      l1BatchTxIndex: 1,
    });
    await expect(
      getProcessFromZkSyncRootArgs({
        spokeChainId: 1,
        spokeDomainId: "1",
        spokeProvider: "world",
        hubChainId: 2,
        hubDomainId: "2",
        hubProvider: "hello",
        sendHash: mkHash("0xbaa"),
        blockNumber: 123,
        message: mkHash("0xbbbb"),
        _requestContext: createRequestContext("foo"),
      }),
    ).to.be.rejectedWith(NoRootAvailable);
  });

  it("should throw error if undefined", async () => {
    getTransactionReceiptStub.resolves(undefined);
    await expect(
      getProcessFromZkSyncRootArgs({
        spokeChainId: 1,
        spokeDomainId: "1",
        spokeProvider: "world",
        hubChainId: 2,
        hubDomainId: "2",
        hubProvider: "hello",
        sendHash: mkHash("0xbaa"),
        blockNumber: 123,
        message: mkHash("0xbbbb"),
        _requestContext: createRequestContext("foo"),
      }),
    ).to.be.rejectedWith(NoRootAvailable);
  });

  it("should throw error if not inclusion", async () => {
    getContractStub.returns({
      proveL2MessageInclusion: stub().resolves(false),
    } as any);
    await expect(
      getProcessFromZkSyncRootArgs({
        spokeChainId: 1,
        spokeDomainId: "1",
        spokeProvider: "world",
        hubChainId: 2,
        hubDomainId: "2",
        hubProvider: "hello",
        sendHash: mkHash("0xbaa"),
        blockNumber: 123,
        message: mkHash("0xbbbb"),
        _requestContext: createRequestContext("foo"),
      }),
    ).to.be.rejectedWith(NoRootAvailable);
  });

  it("should work", async () => {
    const args = await getProcessFromZkSyncRootArgs({
      spokeChainId: 1,
      spokeDomainId: "1",
      spokeProvider: "world",
      hubChainId: 2,
      hubDomainId: "2",
      hubProvider: "hello",
      sendHash: mkHash("0xdeadbeef"),
      blockNumber: 123,
      message: mkHash("0xbbbb"),
      _requestContext: createRequestContext("foo"),
    });

    expect(args).to.deep.eq([
      BigNumber.from(100000),
      BigNumber.from(0),
      BigNumber.from(1),
      mkHash("0xbbbb"),
      [mkHash("0x111")],
    ]);
  });
});
