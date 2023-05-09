import { canonizeId, ChainData, expect, Logger, mkAddress, OriginTransfer } from "@connext/nxtp-utils";
import { BigNumber, constants } from "ethers";
import { stub, restore, reset, SinonStub } from "sinon";

import { ctxMock } from "../../globalTestHook";
import { mock } from "../../mock";

import * as MockableFns from "../../../src/mockable";
import { canSubmitToRelayer } from "../../../src/lib/helpers/relayerfee";
import { Provider } from "@ethersproject/abstract-provider";

describe("Helpers:RelayerFee", () => {
  describe("#canSubmitToRelayer", () => {
    let adoptedAsset: string;
    let localAsset: string;
    let safeCalculateRelayerFeeStub: SinonStub;
    let safeGetConversionRateStub: SinonStub<
      [_chainId: number, to?: string | undefined, logger?: Logger | undefined],
      Promise<number>
    >;
    let getDecimalsForAssetStub: SinonStub<
      [
        assetId: string,
        chainId: number,
        provider?: Provider | undefined,
        chainData?: Map<string, ChainData> | undefined,
      ],
      Promise<number>
    >;
    beforeEach(() => {
      localAsset = mkAddress("0xccc");
      adoptedAsset = mkAddress("0xddd");
      safeCalculateRelayerFeeStub = stub(MockableFns, "calculateRelayerFee");
      safeGetConversionRateStub = stub(MockableFns, "safeGetConversionRate").resolves(1000);
      getDecimalsForAssetStub = stub(MockableFns, "getDecimalsForAsset").resolves(6);
      (ctxMock.adapters.subgraph as any).getAssets.resolves([
        {
          adoptedAsset,
          localAsset,
          canonicalId: canonizeId(localAsset),
          canonicalDomain: 133712,
        },
      ]);
    });

    afterEach(() => {
      restore();
      reset();
    });

    it("should return false & 0 value if relayerFee field is null", async () => {
      const _transfer = mock.entity.xtransfer() as OriginTransfer;
      const transfer = { ..._transfer, origin: undefined };

      const res = await canSubmitToRelayer(transfer);
      expect(res).to.be.deep.eq({ canSubmit: false, needed: "0" });
    });

    it("should return true if relayer fee is enough native only, native > USD", async () => {
      const transfer = mock.entity.xtransfer({ relayerFees: { [constants.AddressZero]: "80" } }) as OriginTransfer;
      safeCalculateRelayerFeeStub.resolves(BigNumber.from("100"));
      const res = await canSubmitToRelayer(transfer);
      expect(res).to.be.deep.eq({ canSubmit: true, needed: "80" });
    });

    it("should return true if relayer fee is enough native only, native < USD", async () => {
      safeGetConversionRateStub.resolves(0.001);
      const transfer = mock.entity.xtransfer({
        relayerFees: { [constants.AddressZero]: "80000000" },
      }) as OriginTransfer;
      safeCalculateRelayerFeeStub.resolves(BigNumber.from("100"));
      const res = await canSubmitToRelayer(transfer);
      expect(res).to.be.deep.eq({ canSubmit: true, needed: "80" });
    });

    it("should return true if relayer fee is enough USD only, 6 decimals, local asset", async () => {
      const transfer = mock.entity.xtransfer({
        relayerFees: { [localAsset]: "1" },
        asset: localAsset,
      }) as OriginTransfer;
      safeCalculateRelayerFeeStub.resolves(BigNumber.from("1000000000000"));
      const res = await canSubmitToRelayer(transfer);
      expect(res).to.be.deep.eq({ canSubmit: true, needed: "800000000000" });
    });

    it("should return true if relayer fee is enough USD only, 6 decimals, adopted asset", async () => {
      const transfer = mock.entity.xtransfer({
        relayerFees: { [adoptedAsset]: "1" },
        asset: adoptedAsset,
      }) as OriginTransfer;
      safeCalculateRelayerFeeStub.resolves(BigNumber.from("1000000000000"));
      const res = await canSubmitToRelayer(transfer);
      expect(res).to.be.deep.eq({ canSubmit: true, needed: "800000000000" });
    });

    it("should return true if relayer fee is enough both native and usd", async () => {
      // scenario: transfering weth on xdai
      getDecimalsForAssetStub.resolves(18);
      safeGetConversionRateStub.onCall(0).resolves(0.9992302253800343); // 1 XDAI = 1 USD
      safeGetConversionRateStub.onCall(1).resolves(0.0005429445181187423); // $1 = 0.0054 ETH ($1,840.35)
      const transfer = mock.entity.xtransfer({
        relayerFees: { [constants.AddressZero]: "184095455962097", [adoptedAsset]: "525094043977850" },
        asset: adoptedAsset,
      }) as OriginTransfer;
      safeCalculateRelayerFeeStub.resolves(BigNumber.from("163985699539200000"));
      const res = await canSubmitToRelayer(transfer);
      expect(res).to.be.deep.eq({ canSubmit: true, needed: "131188559631360000" });
    });

    it("should return false if relayerFee isn't enough USD", async () => {
      getDecimalsForAssetStub.resolves(18);
      const transfer = mock.entity.xtransfer({ relayerFees: { [adoptedAsset]: "79" } }) as OriginTransfer;
      safeCalculateRelayerFeeStub.resolves(BigNumber.from("100"));
      const res = await canSubmitToRelayer(transfer);
      expect(res).to.be.deep.eq({ canSubmit: false, needed: "80" });
    });

    it("should return false if relayerFee isn't enough native", async () => {
      const transfer = mock.entity.xtransfer({ relayerFees: { [constants.AddressZero]: "79" } }) as OriginTransfer;
      safeCalculateRelayerFeeStub.resolves(BigNumber.from("100000"));
      const res = await canSubmitToRelayer(transfer);
      expect(res).to.be.deep.eq({ canSubmit: false, needed: "80000" });
    });

    it("should return false if relayerFee isn't enough both", async () => {
      const transfer = mock.entity.xtransfer({
        relayerFees: { [constants.AddressZero]: "3", [localAsset]: "8" },
      }) as OriginTransfer;
      safeCalculateRelayerFeeStub.resolves(BigNumber.from("10000000004004"));
      const res = await canSubmitToRelayer(transfer);
      expect(res).to.be.deep.eq({ canSubmit: false, needed: "8000000003203" });
    });
  });
});
