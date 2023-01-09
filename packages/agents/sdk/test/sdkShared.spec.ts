import {
  createStubInstance,
  reset,
  restore,
  SinonStubbedInstance,
  stub,
  spy,
  SinonStub,
  promise,
  SinonMock,
  mock as sinonMock,
} from "sinon";
import { expect, mkAddress, Logger } from "@connext/nxtp-utils";
import { ChainReader, getErc20Interface, getConnextInterface } from "@connext/nxtp-txservice";
import { constants, providers, BigNumber, utils, Contract } from "ethers";
import { mock } from "./mock";
import { NxtpSdkShared } from "../src/sdkShared";
import { getEnvConfig } from "../src/config";
import { ChainDataUndefined, SignerAddressMissing } from "../src/lib/errors";
import { Connext__factory, Connext, IERC20__factory, IERC20, TestERC20__factory } from "@connext/nxtp-contracts";

import * as ConfigFns from "../src/config";
import * as SharedFns from "../src/lib/helpers/shared";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockDeployments = mock.contracts.deployments();

const mockConnextAddresss = mockConfig.chains[mock.domain.A].deployments!.connext;
const mockAssetId = mock.asset.A.address;

const chainId = 1337;

describe("SdkShared", () => {
  let nxtpSdkShared: NxtpSdkShared;
  let config: ConfigFns.NxtpSdkConfig;
  let logger: SinonStubbedInstance<Logger>;

  beforeEach(async () => {
    logger = createStubInstance(Logger);
    config = getEnvConfig(mockConfig, mockChainData, mockDeployments);

    stub(ConfigFns, "getConfig").resolves(config);
    stub(SharedFns, "getChainIdFromDomain").resolves(chainId);

    nxtpSdkShared = new NxtpSdkShared(mockConfig, logger, mockChainData);
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("#instance", () => {
    it("happy: should work", async () => {
      expect(nxtpSdkShared).to.not.be.undefined;
      expect(nxtpSdkShared.config).to.not.be.null;
      expect(nxtpSdkShared.chainData).to.not.be.null;

      expect(nxtpSdkShared.getConnext).to.be.a("function");
      expect(nxtpSdkShared.getERC20).to.be.a("function");
      expect(nxtpSdkShared.approveIfNeeded).to.be.a("function");
      expect(nxtpSdkShared.getAssetsData).to.be.a("function");
      expect(nxtpSdkShared.getAssetsDataByDomainAndKey).to.be.a("function");
      expect(nxtpSdkShared.isNextAsset).to.be.a("function");
      expect(nxtpSdkShared.changeSignerAddress).to.be.a("function");
      expect(nxtpSdkShared.parseConnextTransactionReceipt).to.be.a("function");
      expect(nxtpSdkShared.calculateCanonicalKey).to.be.a("function");
      expect(nxtpSdkShared.getCanonicalTokenId).to.be.a("function");
    });
  });

  describe("#getConnext", () => {
    it("happy: should work", async () => {
      const connext = nxtpSdkShared.getConnext(mock.domain.A);
      expect(connext).to.not.be.undefined;
    });
  });

  describe("#getERC20", () => {
    it("happy: should work", async () => {
      const erc20 = nxtpSdkShared.getERC20(mock.domain.A, mock.asset.A.address);
      expect(erc20).to.not.be.undefined;
    });
  });

  describe("#approveIfNeeded", () => {
    const mockParams = {
      connext: mock.contracts.deployments().connext(Number(mock.chain.A)),
      tokenAddress: mock.asset.A.address,
    };
    let connextContract;
    let erc20Contract;
    const provider = providers.getDefaultProvider();

    beforeEach(async () => {
      connextContract = new Contract(mockParams.connext!.address, mockParams.connext!.abi, provider);
    });

    it("happy: should work for Native", async () => {
      const res = await nxtpSdkShared.approveIfNeeded(mock.domain.A, constants.AddressZero, "1");
      expect(res).to.be.undefined;
    });

    it("happy: should work for ERC20 when allowance sufficient", async () => {
      const mockERC20 = {
        allowance: function () {
          return 1;
        },
      };

      stub(nxtpSdkShared, "getConnext").resolves(connextContract);
      stub(nxtpSdkShared, "getERC20").resolves(mockERC20 as any);

      const res = await nxtpSdkShared.approveIfNeeded(mock.domain.A, mock.asset.A.address, "1");
      expect(res).to.be.undefined;
    });

    it("happy: should work for ERC20 when allowance insufficient", async () => {
      const mockERC20 = {
        allowance: function (): number {
          return 0;
        },
        populateTransaction: {
          approve(spender: string, amount: number, overrides?): { data: string; to: string } {
            return {
              data: "0x",
              to: connextContract.address,
            };
          },
        },
      };

      stub(nxtpSdkShared, "getConnext").resolves(connextContract);
      stub(nxtpSdkShared, "getERC20").resolves(mockERC20 as any);

      const approve = spy(mockERC20.populateTransaction, "approve");
      const res = await nxtpSdkShared.approveIfNeeded(mock.domain.A, mockAssetId, "1");
      expect(approve).calledOnce;
    });

    it("should error if signerAddress is undefined", async () => {
      nxtpSdkShared.config.signerAddress = undefined;
      await expect(nxtpSdkShared.approveIfNeeded(mock.domain.A, mock.asset.A.address, "1")).to.be.rejectedWith(
        SignerAddressMissing,
      );
    });
  });

  describe("#changeSignerAddress", () => {
    it("happy: should work", async () => {
      const mockSignerAddress = mkAddress("0xabcdef456");
      await nxtpSdkShared.changeSignerAddress(mockSignerAddress);
      expect(nxtpSdkShared.config.signerAddress).to.be.eq(mockSignerAddress);
    });
  });

  describe("#parseConnextTransactionReceipt", () => {
    it("happy: should work", async () => {
      const res = nxtpSdkShared.parseConnextTransactionReceipt(mock.ethers.receipt());

      expect(res).to.not.be.undefined;
    });

    it("happy: should work with original logs", async () => {
      stub(SharedFns, "parseConnextLog").returns("OK");
      const transactionReceipt = mock.ethers.receipt({
        logs: [
          {
            transactionIndex: 32,
            blockNumber: 10771144,
            transactionHash: "0xa6006c58f3ac55c04afc9eb4fe8338525ce71bf35399e7bf8ec1cf034ff76554",
            address: "0x2307Ed9f152FA9b3DcDfe2385d279D8C2A9DF2b0",
            topics: [
              "0x7f9a44468cd4a3c9115f4484cc70939547e8d807c832f32b8c049302f9813001",
              "0x0b7a810f9ac0f240337bce82fe42f3c9d31147aa1477fb8cad52618e5ca514d7",
            ],
            data: "0x00000000000000000000000000000000000000000000000000000000000001000000000000000000000000003ffc03f05d1869f493c7dbf913e636c6280e0ff900000000000000000000000000000000000000000000001b1ae4d6e2ef50000000000000000000000000000000000000000000000000001b1ae4d6e2ef5000000000000000000000000000003ffc03f05d1869f493c7dbf913e636c6280e0ff90000000000000000000000000000000000000000000000000000000000006c6100000000000000000000000000000000000000000000000000000000000002c0000000000000000000000000d9aa57f44857cd3e6b0406d8b530ef4f98e2ec2900000000000000000000000000000000000000000000000000000000000000800000000000000000000000003ffc03f05d1869f493c7dbf913e636c6280e0ff900000000000000000000000000000000000000000000001b1ae4d6e2ef5000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d9aa57f44857cd3e6b0406d8b530ef4f98e2ec29000000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000004570000000000000000000000000000000000000000000000000000000000000d03000000000000000000000000d9aa57f44857cd3e6b0406d8b530ef4f98e2ec290000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a5000008ad0000000000000000000000003ffc03f05d1869f493c7dbf913e636c6280e0ff903000000000000000000000000d9aa57f44857cd3e6b0406d8b530ef4f98e2ec2900000000000000000000000000000000000000000000001b1ae4d6e2ef50000020b4b2eeb4ea213a5e7d1e1d2a3a1a437fbe7c8b3490898b0474b0fe66dda70a0b7a810f9ac0f240337bce82fe42f3c9d31147aa1477fb8cad52618e5ca514d7000000000000000000000000000000000000000000000000000000",
            logIndex: 62,
            blockHash: "0x964a3c385444cc0fd0b258d67ccb37d249d431914fe767e86f40fba4d0ecc0e7",
            removed: false,
          },
        ],
      });
      const res = nxtpSdkShared.parseConnextTransactionReceipt(transactionReceipt);
      expect(res).to.not.be.undefined;
    });
  });
});
