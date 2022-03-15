import axios from "axios";
import { SinonStub, stub } from "sinon";
import { expect, formatUrl } from "@connext/nxtp-utils";

import { getOperations } from "../../../src/lib/operations";
import { SequencerResponseInvalid } from "../../../src/lib/errors";
import { mock, stubContext } from "../../mock";

const { sendBid } = getOperations();

describe("Operations:Sequencer", () => {
  const mockContext = stubContext();
  const mockSequencerUrl = "http://mockUrl:1234";

  describe("#sendBid", () => {
    let axiosPostStub: SinonStub;
    const mockBid = mock.entity.bid();
    beforeEach(() => {
      mockContext.config.sequencerUrl = mockSequencerUrl;
      axiosPostStub = stub(axios, "post").resolves({ data: "ok" });
    });

    it("happy", async () => {
      const result = await sendBid(mockBid);
      expect(axiosPostStub).to.have.been.calledOnceWithExactly(formatUrl(mockSequencerUrl, "bid"), {
        bid: mockBid,
      });
      expect(result).to.equal("ok");
    });

    it("throws if no response", async () => {
      axiosPostStub.resolves();
      await expect(sendBid(mockBid)).to.be.rejectedWith(SequencerResponseInvalid);
    });

    it("throws SequencerResponseInvalid if no response.data", async () => {
      axiosPostStub.resolves({ data: undefined });
      await expect(sendBid(mockBid)).to.be.rejectedWith(SequencerResponseInvalid);
    });
  });
});
