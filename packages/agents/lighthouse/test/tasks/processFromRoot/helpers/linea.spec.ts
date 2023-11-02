import { createRequestContext, expect, mkAddress, mkHash } from "@connext/nxtp-utils";
import { stub, SinonStub } from "sinon";
import { BigNumber } from "ethers";

import * as MockableFns from "../../../../src/mockable";
import { getProcessFromLineaRootArgs } from "../../../../src/tasks/processFromRoot/helpers";
import { AlreadyProcessed, NoRootAvailable } from "../../../../src/tasks/processFromRoot/errors";

let getL1Contract: SinonStub;
let getL2Contract: SinonStub;

class MockLineaSDK {
  public getL1Contract = getL1Contract;
  public getL2Contract = getL2Contract;
}

describe("Helpers: Linea", () => {
  beforeEach(() => {
    stub(MockableFns, "LineaSDK").value(MockLineaSDK);
  });

  it("should throw error if no messages", async () => {
    getL2Contract = stub().returns({
      getMessagesByTransactionHash: stub().resolves([]),
    } as any);
    await expect(
      getProcessFromLineaRootArgs({
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

  it("should throw error if already processed", async () => {
    getL2Contract = stub().returns({
      getMessagesByTransactionHash: stub().resolves([
        {
          messageSender: mkAddress("a"),
          destination: mkAddress("b"),
          fee: BigNumber.from(0),
          value: BigNumber.from(0),
          messageNonce: BigNumber.from(1),
          calldata: "0x",
          messageHash: mkHash("0xa"),
        },
      ]),
    } as any);
    getL1Contract = stub().returns({
      getMessageStatus: stub().resolves("CLAIMED"),
    });
    await expect(
      getProcessFromLineaRootArgs({
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

  it("should throw error if unknown status", async () => {
    getL2Contract = stub().returns({
      getMessagesByTransactionHash: stub().resolves([
        {
          messageSender: mkAddress("a"),
          destination: mkAddress("b"),
          fee: BigNumber.from(0),
          value: BigNumber.from(0),
          messageNonce: BigNumber.from(1),
          calldata: "0x",
          messageHash: mkHash("0xa"),
        },
      ]),
    } as any);
    getL1Contract = stub().returns({
      getMessageStatus: stub().resolves("UNKNOWN"),
    });
    await expect(
      getProcessFromLineaRootArgs({
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
    getL2Contract = stub().returns({
      getMessagesByTransactionHash: stub().resolves([
        {
          messageSender: mkAddress("a"),
          destination: mkAddress("b"),
          fee: BigNumber.from(0),
          value: BigNumber.from(0),
          messageNonce: BigNumber.from(1),
          calldata: mkHash("0xa"),
          messageHash: mkHash("0xb"),
        },
      ]),
    } as any);
    getL1Contract = stub().returns({
      getMessageStatus: stub().resolves("CLAIMABLE"),
    });
    const args = await getProcessFromLineaRootArgs({
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

    expect(args).to.deep.eq([BigNumber.from(1), mkHash("0xa")]);
  });
});
