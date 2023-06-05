import { reset, restore, stub, SinonStub, createStubInstance, SinonStubbedInstance } from "sinon";
import { expect, Logger } from "@connext/nxtp-utils";
import { ChainReader } from "@connext/nxtp-txservice";
import { mock } from "./mock";
import { SdkShared } from "../src/sdkShared";
import { getEnvConfig } from "../src/config";

import * as ConfigFns from "../src/config";
import * as SharedFns from "../src/lib/helpers/shared";
import * as MockableFns from "./mockable";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockDeployments = mock.contracts.deployments();

describe("#SDK Shared", () => {
  let sdkShared: SdkShared;
  let config: ConfigFns.SdkConfig;

  let chainreader: SinonStubbedInstance<ChainReader>;
  beforeEach(async () => {
    chainreader = createStubInstance(ChainReader);
    config = getEnvConfig(mockConfig, mockChainData, mockDeployments);

    stub(ConfigFns, "getConfig").resolves({ nxtpConfig: config, chainData: mockChainData });
    stub(SharedFns, "axiosGetRequest").resolves([]);

    sdkShared = new SdkShared(mockConfig, new Logger({ name: "SDK shared" }), mockChainData);
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("#getConversionRate", async () => {
    let axiosGetStub: SinonStub;
    beforeEach(() => {
      axiosGetStub = stub(MockableFns, "axiosGet");
    });
    afterEach(() => {
      restore();
      reset();
    });
    it("Happy: should work", async () => {
      const mockChainID = 10;
      axiosGetStub.resolves({ data: 122334 });
      const conversionRate = await sdkShared.getConversionRate(mockChainID);
      expect(conversionRate).to.be.eq(122334);
    });
  });
});
