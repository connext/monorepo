import { ChainData, expect, Logger, mkAddress, OriginTransfer } from "@connext/nxtp-utils";
import { BigNumber, constants } from "ethers";
import { stub, restore, reset, SinonStub } from "sinon";

import { mock } from "../../mock";

import * as MockableFns from "../../../src/mockable";
import { canSubmitToRelayer } from "../../../src/lib/helpers/relayerfee";
import { Provider } from "@ethersproject/abstract-provider";

describe("Helpers:RelayerFee", () => {
  describe("#canSubmitToRelayer", () => {
    let calculateRelayerFeeStub: SinonStub;
    let getConversionRateStub: SinonStub<
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
      calculateRelayerFeeStub = stub(MockableFns, "calculateRelayerFee");
      getConversionRateStub = stub(MockableFns, "getConversionRate").resolves(1000);
      getDecimalsForAssetStub = stub(MockableFns, "getDecimalsForAsset").resolves(6);
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
      calculateRelayerFeeStub.resolves(BigNumber.from("100"));
      const res = await canSubmitToRelayer(transfer);
      expect(res).to.be.deep.eq({ canSubmit: true, needed: "80" });
    });

    it("should return true if relayer fee is enough native only, native < USD", async () => {
      getConversionRateStub.resolves(0.001);
      const transfer = mock.entity.xtransfer({
        relayerFees: { [constants.AddressZero]: "80000000" },
      }) as OriginTransfer;
      calculateRelayerFeeStub.resolves(BigNumber.from("100"));
      const res = await canSubmitToRelayer(transfer);
      expect(res).to.be.deep.eq({ canSubmit: true, needed: "80" });
    });

    it("should return true if relayer fee is enough USD only, 6 decimals", async () => {
      const transactingAsset = mkAddress("0xaaa");
      const transfer = mock.entity.xtransfer({
        relayerFees: { [transactingAsset]: "1" },
        asset: transactingAsset,
      }) as OriginTransfer;
      calculateRelayerFeeStub.resolves(BigNumber.from("1000000000000"));
      const res = await canSubmitToRelayer(transfer);
      expect(res).to.be.deep.eq({ canSubmit: true, needed: "800000000000" });
    });

    it("should return true if relayer fee is enough both native and usd", async () => {
      getConversionRateStub.resolves(100);
      const transactingAsset = mkAddress("0xaaa");
      const transfer = mock.entity.xtransfer({
        relayerFees: { [constants.AddressZero]: "1", [transactingAsset]: "60" },
        asset: transactingAsset,
      }) as OriginTransfer;
      calculateRelayerFeeStub.resolves(BigNumber.from("60000000000100"));
      const res = await canSubmitToRelayer(transfer);
      expect(res).to.be.deep.eq({ canSubmit: true, needed: "48000000000080" });
    });

    it("should return false if relayerFee isn't enough USD", async () => {
      getDecimalsForAssetStub.resolves(18);
      const transfer = mock.entity.xtransfer({ relayerFees: { [mkAddress("0xaaa")]: "79" } }) as OriginTransfer;
      calculateRelayerFeeStub.resolves(BigNumber.from("100"));
      const res = await canSubmitToRelayer(transfer);
      expect(res).to.be.deep.eq({ canSubmit: false, needed: "80" });
    });

    it("should return false if relayerFee isn't enough native", async () => {
      const transfer = mock.entity.xtransfer({ relayerFees: { [constants.AddressZero]: "79" } }) as OriginTransfer;
      calculateRelayerFeeStub.resolves(BigNumber.from("100000"));
      const res = await canSubmitToRelayer(transfer);
      expect(res).to.be.deep.eq({ canSubmit: false, needed: "80000" });
    });

    it("should return false if relayerFee isn't enough both", async () => {
      const transfer = mock.entity.xtransfer({
        relayerFees: { [constants.AddressZero]: "3", [mkAddress("0xaaa")]: "8" },
      }) as OriginTransfer;
      calculateRelayerFeeStub.resolves(BigNumber.from("10000000004004"));
      const res = await canSubmitToRelayer(transfer);
      expect(res).to.be.deep.eq({ canSubmit: false, needed: "8000000003203" });
    });
  });
});
