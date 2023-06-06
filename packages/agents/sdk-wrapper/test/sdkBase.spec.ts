import { reset, restore, stub, SinonStub, createStubInstance, SinonStubbedInstance } from "sinon";
import { expect } from "@connext/nxtp-utils";
import { getConnextInterface, ChainReader } from "@connext/nxtp-txservice";
import { providers, BigNumber, utils, constants } from "ethers";
import { mock } from "./mock";
import { SdkBase } from "../src/sdkBase";
import { SdkUtils } from "../src/sdkUtils";
import { SdkPool } from "../src/sdkPool";

import * as ConfigFns from "@connext/sdk-core/src/config";
import * as SharedFns from "../src/lib/helpers/shared";
import { SdkXCallParams } from "../src/interfaces";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockDeployments = mock.contracts.deployments();

const mockConnextAddress = mockConfig.chains[mock.domain.A].deployments!.connext;
const chainId = +mock.chain.A;

describe("SdkBase", () => {
  let sdkBase: SdkBase;
  let sdkUtils: SdkUtils;
  let sdkPool: SdkPool;
  let config: ConfigFns.SdkConfig;

  let chainreader: SinonStubbedInstance<ChainReader>;

  beforeEach(async () => {
    chainreader = createStubInstance(ChainReader);
    config = ConfigFns.getEnvConfig(mockConfig, mockChainData, mockDeployments);

    stub(ConfigFns, "getConfig").resolves({ nxtpConfig: config, chainData: mockChainData });
    stub(SharedFns, "domainToChainId").returns(chainId);
    stub(SharedFns, "axiosGetRequest").resolves([]);

    sdkBase = await SdkBase.create(mockConfig, undefined, mockChainData);
    sdkUtils = await SdkUtils.create(mockConfig, undefined, mockChainData);
    sdkPool = await SdkPool.create(mockConfig, undefined, mockChainData);
    (sdkBase as any).chainreader = chainreader;
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("#create", () => {
    it("happy: should work", async () => {
      expect(sdkBase).to.not.be.undefined;
      expect(sdkBase.config).to.not.be.null;
      expect(sdkBase.chainData).to.not.be.null;

      expect(sdkBase.xcall).to.be.a("function");
      expect(sdkBase.bumpTransfer).to.be.a("function");
      expect(sdkBase.updateSlippage).to.be.a("function");
      expect(sdkBase.estimateRelayerFee).to.be.a("function");
      expect(sdkBase.calculateAmountReceived).to.be.a("function");
    });
  });

  //   describe("#xcall", () => {
  //     let getConversionRateStub: SinonStub;
  //     let getDecimalsForAssetStub: SinonStub;
  //     let getHardcodedGasLimitsStub: SinonStub;
  //     let relayerFee = BigNumber.from("1");

  //     const mockXCallArgs = mock.entity.xcallArgs();
  //     const standardXCallData: string = getConnextInterface().encodeFunctionData(
  //       "xcall(uint32,address,address,address,uint256,uint256,bytes)",
  //       [
  //         mockXCallArgs.destination,
  //         mockXCallArgs.to,
  //         mockXCallArgs.asset,
  //         mockXCallArgs.delegate,
  //         mockXCallArgs.amount,
  //         mockXCallArgs.slippage,
  //         mockXCallArgs.callData,
  //       ],
  //     );

  //     const mockXCallRequest: providers.TransactionRequest = {
  //       to: mockConnextAddress,
  //       data: standardXCallData,
  //       from: mock.config().signerAddress,
  //       value: relayerFee,
  //       chainId,
  //     };

  //     const origin = mock.entity.callParams().originDomain;
  //     const sdkXCallArgs: SdkXCallParams = {
  //       ...mock.entity.xcallArgs(),
  //       origin,
  //       relayerFee: relayerFee.toString(),
  //       receiveLocal: false,
  //       wrapNativeOnOrigin: false,
  //       unwrapNativeOnDestination: false,
  //     };

  //     beforeEach(() => {
  //       getConversionRateStub = stub(SharedFns, "getConversionRate");
  //       getDecimalsForAssetStub = stub(SharedFns, "getDecimalsForAsset");
  //       getHardcodedGasLimitsStub = stub(SharedFns, "getHardcodedGasLimits");
  //     });

  //     afterEach(() => {
  //       restore();
  //       reset();
  //     });

  //     it("happy: should work if ERC20", async () => {
  //       const res = await sdkBase.xcall(sdkXCallArgs);
  //       expect(res).to.be.deep.eq(mockXCallRequest);
  //     });
  //   });
});
