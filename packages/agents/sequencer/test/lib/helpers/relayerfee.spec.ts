import { expect, OriginTransfer } from "@connext/nxtp-utils";
import { BigNumber } from "ethers";
import { stub, restore, reset, SinonStub } from "sinon";

import { mock } from "../../mock";

import * as MockableFns from "../../../src/mockable";
import { canSubmitToRelayer } from "../../../src/lib/helpers/relayerfee";

describe("Helpers:RelayerFee", () => {
  describe("#canSubmitToRelayer", () => {
    let calculateRelayerFeeStub: SinonStub;
    beforeEach(() => {
      calculateRelayerFeeStub = stub(MockableFns, "calculateRelayerFee");
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

    it("should return true if relayerFee is enough", async () => {
      const transfer = mock.entity.xtransfer({ relayerFee: "80" }) as OriginTransfer;
      calculateRelayerFeeStub.resolves(BigNumber.from("100"));
      const res = await canSubmitToRelayer(transfer);
      expect(res).to.be.deep.eq({ canSubmit: true, needed: "80" });
    });

    it("should return false if relayerFee isn't enough", async () => {
      const transfer = mock.entity.xtransfer({ relayerFee: "79" }) as OriginTransfer;
      calculateRelayerFeeStub.resolves(BigNumber.from("100"));
      const res = await canSubmitToRelayer(transfer);
      expect(res).to.be.deep.eq({ canSubmit: false, needed: "80" });
    });
  });
});
