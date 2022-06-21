import { createStubInstance, reset, restore, SinonStub, SinonStubbedInstance, stub } from "sinon";
import { expect, mkAddress, XTransferStatus, getRandomBytes32 } from "@connext/nxtp-utils";
import { ChainReader, getErc20Interface, getConnextInterface } from "@connext/nxtp-txservice";
import { constants, providers, BigNumber, utils } from "ethers";
import { mock } from "./mock";
import { NxtpSdkPool } from "../src/sdkPool";
import { getEnvConfig, NxtpSdkConfig } from "../src/config";

import * as ConfigFns from "../src/config";
import * as SharedFns from "../src/lib/helpers/shared";
import { Logger } from "@connext/nxtp-utils";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockDeployments = mock.contracts.deployments();

describe("NxtpSdkPool", () => {
  let config: NxtpSdkConfig;
  let logger = createStubInstance(Logger);
  let chainReader: ChainReader;
  let nxtpPool: NxtpSdkPool;

  beforeEach(async () => {
    config = getEnvConfig(mockConfig, mockChainData, mockDeployments);
    chainReader = new ChainReader(logger, mockConfig);
    nxtpPool = await NxtpSdkPool.create(mockConfig, undefined, mockChainData, chainReader);

    stub(ConfigFns, "getConfig").resolves(config);
  });
  afterEach(() => {
    restore();
    reset();
  });

  describe("#create", () => {
    it("happy: should work", async () => {
      expect(nxtpPool).to.not.be.undefined;
      expect(nxtpPool.config).to.not.be.null;
      expect(nxtpPool.chainData).to.not.be.null;

      expect(nxtpPool.getCanonicalFromLocal).to.be.a("function");
      expect(nxtpPool.getTokenIndex).to.be.a("function");
      expect(nxtpPool.calculateTokenAmount).to.be.a("function");
      expect(nxtpPool.calculateRemoveSwapLiquidity).to.be.a("function");
      expect(nxtpPool.calculateSwap).to.be.a("function");
      expect(nxtpPool.addLiquidity).to.be.a("function");
      expect(nxtpPool.removeLiquidity).to.be.a("function");
      expect(nxtpPool.swap).to.be.a("function");
      expect(nxtpPool.getPools).to.be.a("function");
      expect(nxtpPool.getBalance).to.be.a("function");
    });
  });

  describe("#addLiquidity", () => {
    const mockParams = {
      domainId: mock.domain.A,
      canonicalId: utils.formatBytes32String("0x0"),
      amounts: ["100", "100"],
      deadline: 1700000000,
      minToMint: "100",
      connextAddress: mockConfig.chains[mock.chain.A].deployments.connext,
    };

    it("happy: should work", async () => {
      const data = getConnextInterface().encodeFunctionData("addSwapLiquidity", [
        mockParams.canonicalId,
        mockParams.amounts,
        mockParams.minToMint,
        mockParams.deadline,
      ]);

      const mockRequest: providers.TransactionRequest = {
        to: mockParams.connextAddress,
        data,
        from: mock.config().signerAddress,
        value: 0,
      };

      stub(nxtpPool, "calculateTokenAmount").resolves("100");

      const res = await nxtpPool.addLiquidity(
        mockParams.domainId,
        mockParams.canonicalId,
        mockParams.amounts,
        mockParams.deadline,
      );
      expect(res).to.be.deep.eq(mockRequest);
    });
  });

  describe("#removeLiquidity", () => {
    const mockParams = {
      domainId: mock.domain.A,
      canonicalId: utils.formatBytes32String("0x0"),
      amount: "100",
      deadline: 1700000000,
      minAmounts: ["100", "100"],
      connextAddress: mockConfig.chains[mock.chain.A].deployments.connext,
    };

    it("happy: should work", async () => {
      const data = getConnextInterface().encodeFunctionData("removeSwapLiquidity", [
        mockParams.canonicalId,
        mockParams.amount,
        mockParams.minAmounts,
        mockParams.deadline,
      ]);

      const mockRequest: providers.TransactionRequest = {
        to: mockParams.connextAddress,
        data,
        from: mock.config().signerAddress,
        value: 0,
      };

      stub(nxtpPool, "calculateRemoveSwapLiquidity").resolves(["100", "100"]);

      const res = await nxtpPool.removeLiquidity(
        mockParams.domainId,
        mockParams.canonicalId,
        mockParams.amount,
        mockParams.deadline,
      );
      expect(res).to.be.deep.eq(mockRequest);
    });
  });

  describe("#swap", () => {
    const mockParams = {
      domainId: mock.domain.A,
      canonicalId: utils.formatBytes32String("0x0"),
      from: "0x0",
      to: "0x0",
      amount: "100",
      minDy: 100,
      deadline: 170000000,
      connextAddress: mockConfig.chains[mock.chain.A].deployments.connext,
    };

    it("happy: should work", async () => {
      const data = getConnextInterface().encodeFunctionData("swap", [
        mockParams.canonicalId,
        0,
        1,
        mockParams.amount,
        mockParams.minDy,
        mockParams.deadline,
      ]);

      const mockRequest: providers.TransactionRequest = {
        to: mockParams.connextAddress,
        data,
        from: mock.config().signerAddress,
        value: 0,
      };

      stub(nxtpPool, "getCanonicalFromLocal").resolves({ domain: "1337", id: "0x0" });
      stub(nxtpPool, "getTokenIndex").onCall(0).resolves(0).onCall(1).resolves(1);
      stub(nxtpPool, "calculateSwap").resolves(mockParams.minDy);

      const res = await nxtpPool.swap(
        mockParams.domainId,
        mockParams.canonicalId,
        mockParams.from,
        mockParams.to,
        mockParams.amount,
        mockParams.deadline,
      );
      expect(res).to.be.deep.eq(mockRequest);
    });
  });
});
