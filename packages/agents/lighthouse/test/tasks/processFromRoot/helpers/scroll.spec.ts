import { createRequestContext, expect, mkAddress, mkBytes32, mkHash } from "@connext/nxtp-utils";
import { stub, SinonStub } from "sinon";
import { BigNumber } from "ethers";

import * as MockableFns from "../../../../src/mockable";
import { getProcessFromScrollRootArgs } from "../../../../src/tasks/processFromRoot/helpers";
import { AlreadyProcessed, NoRootAvailable } from "../../../../src/tasks/processFromRoot/errors";

let axiosGetStub: SinonStub;
let mockData = {
  hash: mkHash("0xaaa"),
  amount: "",
  to: "",
  isL1: false,
  l1Token: "",
  l2Token: "",
  blockNumber: 748,
  blockTimestamp: null,
  finalizeTx: {
    hash: "",
    amount: "",
    to: "",
    isL1: false,
    blockNumber: 0,
    blockTimestamp: null,
  },
  claimInfo: {
    from: mkAddress("0xa"),
    to: mkAddress("0xb"),
    value: "0",
    nonce: "9",
    batch_hash: mkHash("0xa"),
    message: "",
    proof: mkBytes32("0xaa"),
    batch_index: "93",
  },
  createdTime: null,
};

describe("Helpers: Scroll", () => {
  beforeEach(() => {
    axiosGetStub = stub(MockableFns, "axiosGet");
  });

  it("should throw error if no claimable data", async () => {
    axiosGetStub.resolves({
      data: {
        errcode: 1,
      },
    });
    await expect(
      getProcessFromScrollRootArgs({
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

  it("should throw error if no claimable data result", async () => {
    axiosGetStub.resolves({
      data: {
        errcode: 0,
        data: {
          result: [],
        },
      },
    });
    await expect(
      getProcessFromScrollRootArgs({
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

  it("should throw error if send tx is not in result", async () => {
    axiosGetStub.resolves({
      data: {
        errcode: 0,
        data: {
          result: [{ ...mockData, hash: mkHash("0xaaa") }],
        },
      },
    });
    await expect(
      getProcessFromScrollRootArgs({
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

  it("should throw error if already finialized", async () => {
    axiosGetStub.resolves({
      data: {
        errcode: 0,
        data: {
          result: [
            {
              ...mockData,
              hash: mkHash("0xbaa"),
              finalizeTx: {
                hash: mkHash("0xaa"),
                amount: "",
                to: "",
                isL1: false,
                blockNumber: 0,
                blockTimestamp: null,
              },
            },
          ],
        },
      },
    });
    await expect(
      getProcessFromScrollRootArgs({
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
    ).to.be.rejectedWith(AlreadyProcessed);
  });

  it("should work", async () => {
    axiosGetStub.resolves({
      data: {
        errcode: 0,
        data: {
          result: [
            {
              ...mockData,
              hash: mkHash("0xbaa"),
            },
          ],
        },
      },
    });
    const args = await getProcessFromScrollRootArgs({
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
    });
    let claimInfo = mockData.claimInfo;
    expect(args).to.deep.eq([
      claimInfo.from,
      claimInfo.to,
      BigNumber.from(claimInfo.value),
      BigNumber.from(claimInfo.nonce),
      claimInfo.message,
      { batchIndex: BigNumber.from(claimInfo.batch_index), merkleProof: claimInfo.proof },
    ]);
  });
});
