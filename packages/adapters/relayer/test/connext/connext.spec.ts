import { stub, SinonStub, SinonStubbedInstance } from "sinon";
import { mkAddress, expect, mock, Logger, RelayerApiPostTaskRequestParams, NxtpError } from "@connext/nxtp-utils";
import { ChainReader } from "@connext/nxtp-txservice";
import { mockChainReader } from "@connext/nxtp-txservice/test/mock";
import axios from "axios";
import { constants } from "ethers";

import { connextRelayerSend } from "../../src/connext/connext";
import * as RelayerFns from "../../src/connext/connext";
import * as RelayerIndexFns from "../../src/connext/index";

const loggingContext = mock.loggingContext("RELAYER-TEST");
const logger = new Logger({ name: "test", level: process.env.LOG_LEVEL || "silent" });
describe("Connext Relayer", () => {
  let axiosPostStub: SinonStub;
  let chainReaderMock: SinonStubbedInstance<ChainReader>;

  beforeEach(() => {
    axiosPostStub = stub(axios, "post");
    chainReaderMock = mockChainReader() as any;
    stub(RelayerIndexFns, "url").value("http://example.com");
  });

  describe("#connextRelayerSend", () => {
    beforeEach(() => {
      stub(RelayerFns, "getRelayerAddress").resolves(mkAddress("0xaaa"));
    });

    it("happy: should post data successfully", async () => {
      axiosPostStub.resolves({ data: { taskId: "foo" } });
      const params: RelayerApiPostTaskRequestParams = {
        to: mkAddress(),
        data: "0xbeed",
        fee: {
          amount: "0",
          chain: Number(mock.chain.A),
          token: constants.AddressZero,
        },
      };
      const res = await connextRelayerSend(
        Number(mock.chain.A),
        mock.domain.A,
        params.to,
        params.data,
        "foo",
        chainReaderMock,
        logger,
        loggingContext.requestContext,
      );
      expect(axiosPostStub).to.have.been.calledOnceWithExactly(
        `http://example.com/relays/${Number(mock.chain.A)}`,
        params,
      );
      expect(res).to.be.deep.eq("foo");
    });

    it("should throw if post fails", async () => {
      axiosPostStub.throws(new Error("Request failed!"));
      await expect(
        connextRelayerSend(
          Number(mock.chain.A),
          mock.domain.A,
          mkAddress(),
          "0xbeed",
          "foo",
          chainReaderMock,
          logger,
          loggingContext.requestContext,
        ),
      ).to.be.rejectedWith(NxtpError);
    });
  });
});
