import { createRequestContext, domainToChainId, expect, mkAddress, mkBytes32, mkHash } from "@connext/nxtp-utils";
import { createStubInstance, stub } from "sinon";
import { BigNumber, providers } from "ethers";

import * as Mockable from "../../../../src/mockable";
import { getInterfaceMock, processFromRootCtxMock } from "../../../globalTestHook";
import { mock } from "../../../mock";
import {
  GetProcessArgsParams,
  getLatestXLayerSpokeMessage,
  getProcessFromXlayerRootWriteTransaction,
} from "../../../../src/tasks/processFromRoot/helpers";
import { NoHubConnector, NoSpokeConnector } from "../../../../src/tasks/propagate/errors";
import { Interface, LogDescription } from "ethers/lib/utils";
import { NoRootAvailable } from "../../../../src/tasks/processFromRoot/errors";

const requestContext = createRequestContext("test");
const SAMPLE_L1_TO_L2_DEPOSIT = {
  leaf_type: 1,
  orig_net: 0,
  orig_addr: "0xD3B338fcE3238C7353Ef44A628f96cB48B2fa0B5",
  amount: "0",
  dest_net: 3,
  dest_addr: "0xaFb88881e53589f5E6eb1cc27E9207cC7f03023F",
  block_num: "19663311",
  deposit_cnt: "180091",
  network_id: 0,
  tx_hash: "0x43639d12a5dba1b4657bf5ce035087936b21afff75d88e3ec3670e6a96c5fcae",
  claim_tx_hash: "0x4d72a3c5b6d34210a646cbd4265be3493045b0f3f97e9066839748718283dbca",
  metadata: "0x081255c0c695449e795f54b6cbb67180b940823e58c1dd66a65c8f7072df5258",
  ready_for_claim: true,
  global_index: "18446744073709731707",
};
const SAMPLE_L2_TO_L1_DEPOSIT = {
  leaf_type: 1,
  orig_net: 3,
  orig_addr: "0xaFb88881e53589f5E6eb1cc27E9207cC7f03023F",
  amount: "0",
  dest_net: 0,
  dest_addr: "0xD3B338fcE3238C7353Ef44A628f96cB48B2fa0B5",
  block_num: "458309",
  deposit_cnt: "64",
  network_id: 3,
  tx_hash: "0x17cc6904856c1c295379dda735e616753303ba2aa70b5a1e10e9bf715c531e4e",
  claim_tx_hash: "0x170334952ff207f1ac24beae368a33390087912b7476330df8dcfe9211af6bd7",
  metadata: "0x45ac4b595f767af947085f5f8fa136f01f3e89386933843dc3e5bf155980b882",
  ready_for_claim: true,
  global_index: "8589934656",
};
let hubDomain = 6648936; // mainnet
let spokeDomain = 2020368761; // xlayer

describe("Helpers: XLayer ", () => {
  describe("#getLatestXLayerSpokeMessage", () => {
    it("should fail if no spoke connector", async () => {
      processFromRootCtxMock.adapters.contracts.spokeConnector = stub().returns(undefined);
      await expect(getLatestXLayerSpokeMessage(hubDomain, spokeDomain, requestContext)).to.eventually.be.rejectedWith(
        NoSpokeConnector,
      );
    });

    it("should fail if no hub connector", async () => {
      processFromRootCtxMock.adapters.contracts.hubConnector = stub().returns(undefined);
      await expect(getLatestXLayerSpokeMessage(hubDomain, spokeDomain, requestContext)).to.eventually.be.rejectedWith(
        NoHubConnector,
      );
    });

    it("should return undefined if no transaction", async () => {
      processFromRootCtxMock.adapters.chainreader.getTransactionReceipt = stub().resolves(undefined);
      expect(await getLatestXLayerSpokeMessage(hubDomain, spokeDomain, requestContext)).to.be.undefined;
    });

    it("should return undefined if no block", async () => {
      processFromRootCtxMock.adapters.chainreader.getBlock = stub().resolves(undefined);
      expect(await getLatestXLayerSpokeMessage(hubDomain, spokeDomain, requestContext)).to.be.undefined;
    });

    it("should filter out transactions if not ready to claim", async () => {
      stub(Mockable, "axiosGet").resolves([
        {
          ...SAMPLE_L1_TO_L2_DEPOSIT,
          ready_for_claim: false,
        },
      ]);
      expect(await getLatestXLayerSpokeMessage(hubDomain, spokeDomain, requestContext)).to.be.undefined;
    });

    it("should filter out transactions if not to correct dest_net", async () => {
      stub(Mockable, "axiosGet").resolves([
        {
          ...SAMPLE_L2_TO_L1_DEPOSIT,
          ready_for_claim: true,
          claim_tx_hash: "",
        },
      ]);
      expect(await getLatestXLayerSpokeMessage(hubDomain, spokeDomain, requestContext)).to.be.undefined;
    });

    it("should return undefined if the latest tx has claim hash", async () => {
      stub(Mockable, "axiosGet").resolves([
        {
          ...SAMPLE_L1_TO_L2_DEPOSIT,
          ready_for_claim: true,
          claim_tx_hash: mkHash("0xded"),
        },
      ]);
      expect(await getLatestXLayerSpokeMessage(hubDomain, spokeDomain, requestContext)).to.be.undefined;
    });

    it("should work", async () => {
      const latest = {
        ...SAMPLE_L1_TO_L2_DEPOSIT,
        ready_for_claim: true,
        claim_tx_hash: "",
      };
      stub(Mockable, "axiosGet").resolves({ data: { deposits: [latest] } });
      processFromRootCtxMock.adapters.chainreader.getTransactionReceipt = stub().resolves({
        blockNumber: 100,
        logs: [
          {
            address: mkAddress("0xabc"),
          },
        ],
        cumulativeGasUsed: BigNumber.from(0),
        effectiveGasPrice: BigNumber.from(0),
        from: mkAddress("0x123"),
      });
      const interfaceStub = createStubInstance(Interface);
      interfaceStub.parseLog.returns({
        args: {
          data: mkBytes32("0xded"),
        } as unknown as any,
      } as LogDescription);
      getInterfaceMock.returns(interfaceStub);
      const ts = Math.floor(Date.now() / 1000);
      processFromRootCtxMock.adapters.chainreader.getBlock = stub().resolves({
        number: 100,
        timestamp: ts,
      });

      const ret = await getLatestXLayerSpokeMessage(hubDomain, spokeDomain, requestContext);

      expect(Mockable.axiosGet).to.be.calledOnceWithExactly(
        `https://rpc.xlayer.tech/priapi/v1/ob/bridge/bridges/${mkAddress("0xabc")}?limit=100&offset=0`,
      );
      expect(ret).to.deep.eq({
        ...latest,
        id: `${mkBytes32("0xded")}-${spokeDomain}-spoke-claim`, // NOTE: suffix indicates not from subgraph
        spokeDomain: spokeDomain.toString(),
        hubDomain: hubDomain.toString(),
        root: mkBytes32("0xded"),
        caller: mkAddress("0x123"),
        transactionHash: latest.tx_hash.toLowerCase(),
        timestamp: ts,
        gasPrice: "0",
        gasLimit: "0",
        blockNumber: 100,
        processed: false,
        count: 0,
        sentTaskId: undefined,
        sentTimestamp: undefined,
        relayerType: undefined,
      });
    });
  });

  describe("#getProcessFromXlayerRootWriteTransaction", () => {
    it("should fail if no spoke connector", async () => {
      processFromRootCtxMock.adapters.contracts.hubConnector = stub().returns(undefined);
      await expect(
        getProcessFromXlayerRootWriteTransaction({
          spokeChainId: domainToChainId(spokeDomain),
          hubChainId: domainToChainId(hubDomain),
          hubDomainId: hubDomain.toString(),
          spokeDomainId: spokeDomain.toString(),
          _requestContext: requestContext,
          sendHash: SAMPLE_L1_TO_L2_DEPOSIT.tx_hash.toLowerCase(),
          isSpokeClaim: true,
        } as unknown as GetProcessArgsParams),
      ).to.eventually.be.rejectedWith(NoHubConnector);
    });

    it("should fail if no hub connector", async () => {
      processFromRootCtxMock.adapters.contracts.hubConnector = stub().returns(undefined);
      await expect(
        getProcessFromXlayerRootWriteTransaction({
          spokeChainId: domainToChainId(spokeDomain),
          hubChainId: domainToChainId(hubDomain),
          hubDomainId: hubDomain.toString(),
          spokeDomainId: spokeDomain.toString(),
          _requestContext: requestContext,
          sendHash: SAMPLE_L1_TO_L2_DEPOSIT.tx_hash.toLowerCase(),
          isSpokeClaim: true,
        } as unknown as GetProcessArgsParams),
      ).to.eventually.be.rejectedWith(NoHubConnector);
    });

    it("should fail if no claimable deposits", async () => {
      const latest = {
        ...SAMPLE_L1_TO_L2_DEPOSIT,
        ready_for_claim: false,
        claim_tx_hash: "",
      };
      stub(Mockable, "axiosGet").resolves({ data: { deposits: [latest] } });
      await expect(
        getProcessFromXlayerRootWriteTransaction({
          spokeChainId: domainToChainId(spokeDomain),
          hubChainId: domainToChainId(hubDomain),
          hubDomainId: hubDomain.toString(),
          spokeDomainId: spokeDomain.toString(),
          _requestContext: requestContext,
          sendHash: SAMPLE_L1_TO_L2_DEPOSIT.tx_hash.toLowerCase(),
          isSpokeClaim: true,
        } as unknown as GetProcessArgsParams),
      ).to.eventually.be.rejectedWith(NoRootAvailable);
    });

    it("should return undefined if latest is already claimed", async () => {
      const latest = {
        ...SAMPLE_L1_TO_L2_DEPOSIT,
        ready_for_claim: true,
        claim_tx_hash: mkHash("0xded"),
      };
      stub(Mockable, "axiosGet").resolves({ data: { deposits: [latest] } });
      await expect(
        getProcessFromXlayerRootWriteTransaction({
          spokeChainId: domainToChainId(spokeDomain),
          hubChainId: domainToChainId(hubDomain),
          hubDomainId: hubDomain.toString(),
          spokeDomainId: spokeDomain.toString(),
          _requestContext: requestContext,
          sendHash: SAMPLE_L1_TO_L2_DEPOSIT.tx_hash.toLowerCase(),
          isSpokeClaim: true,
        } as unknown as GetProcessArgsParams),
      ).to.eventually.be.undefined;
    });
  });
});
