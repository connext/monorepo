import { createStubInstance, reset, restore, SinonStubbedInstance, stub } from "sinon";
import { expect, mkAddress, XTransferStatus, getRandomBytes32 } from "@connext/nxtp-utils";
import { ChainReader } from "@connext/nxtp-txservice";
import { mock } from "./mock";
import { NxtpSdkUtils } from "../src/sdkUtils";
import { getEnvConfig } from "../src/config";
import { ChainDataUndefined, UriInvalid } from "../src/lib/errors";

import * as ConfigFns from "../src/config";
import * as SharedFns from "../src/lib/helpers/shared";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockDeployments = mock.contracts.deployments();

const chainId = 1337;
describe("SdkUtils", () => {
  let nxtpUtils: NxtpSdkUtils;
  let config;

  let chainReader: SinonStubbedInstance<ChainReader>;

  beforeEach(async () => {
    chainReader = createStubInstance(ChainReader);
    config = getEnvConfig(mockConfig, mockChainData, mockDeployments);
    stub(ConfigFns, "getConfig").resolves(config);

    nxtpUtils = await NxtpSdkUtils.create(mockConfig, undefined, mockChainData);

    (nxtpUtils as any).chainReader = chainReader;

    stub(SharedFns, "getChainIdFromDomain").resolves(chainId);

    stub(SharedFns, "axiosGetRequest").resolves({ data: {} });
  });
  afterEach(() => {
    restore();
    reset();
  });

  describe("#create", () => {
    it("happy: should work", async () => {
      expect(nxtpUtils).to.not.be.undefined;
      expect(nxtpUtils.config).to.not.be.null;
      expect(nxtpUtils.chainData).to.not.be.null;

      expect(nxtpUtils.parseConnextTransactionReceipt).to.be.a("function");
      expect(nxtpUtils.getRoutersData).to.be.a("function");
      expect(nxtpUtils.getTransfersByUser).to.be.a("function");
      expect(nxtpUtils.getTransfers).to.be.a("function");
      expect(nxtpUtils.getTransfersByStatus).to.be.a("function");
      expect(nxtpUtils.getTransfersByRouter).to.be.a("function");
      expect(nxtpUtils.getTransferById).to.be.a("function");
      expect(nxtpUtils.getTransferByTransactionHash).to.be.a("function");
      expect(nxtpUtils.changeSignerAddress).to.be.a("function");
    });

    it("should error if chaindata is undefined", async () => {
      stub(SharedFns, "getChainData").resolves(undefined);
      await expect(NxtpSdkUtils.create(config)).to.be.rejectedWith(ChainDataUndefined);
    });
  });

  describe("#parseConnextTransactionReceipt", () => {
    it("happy: should work", async () => {
      const res = nxtpUtils.parseConnextTransactionReceipt(mock.ethers.receipt());

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
      const res = nxtpUtils.parseConnextTransactionReceipt(transactionReceipt);
      expect(res).to.not.be.undefined;
    });
  });

  describe("#getRoutersData", () => {
    it("should error if validateUri fails", async () => {
      (nxtpUtils as any).config.cartographerUrl = "invalidUrl";

      await expect(nxtpUtils.getRoutersData()).to.be.rejectedWith(UriInvalid);
    });

    it("happy: should work", async () => {
      const res = await nxtpUtils.getRoutersData();

      expect(res.data).to.not.be.undefined;
    });
  });

  describe("#getTransfersByUser", () => {
    it("should error if validateUri fails", async () => {
      (nxtpUtils as any).config.cartographerUrl = "invalidUrl";

      await expect(nxtpUtils.getTransfersByUser({ userAddress: mockConfig.signerAddress! })).to.be.rejectedWith(
        UriInvalid,
      );
    });

    it("happy: should work", async () => {
      const res = await nxtpUtils.getTransfersByUser({
        userAddress: mockConfig.signerAddress!,
        status: XTransferStatus.XCalled,
        range: {
          limit: 100,
          offset: 20,
        },
      });

      expect(res.data).to.not.be.undefined;
    });
  });

  describe("#getTransfers", () => {
    it("should error if validateUri fails", async () => {
      (nxtpUtils as any).config.cartographerUrl = "invalidUrl";

      await expect(nxtpUtils.getTransfers({})).to.be.rejectedWith(UriInvalid);
    });

    it("happy: should work", async () => {
      const res = await nxtpUtils.getTransfers({
        range: {
          limit: 100,
          offset: 20,
        },
      });

      expect(res.data).to.not.be.undefined;
    });
  });

  describe("#getTransfersByStatus", () => {
    it("should error if validateUri fails", async () => {
      (nxtpUtils as any).config.cartographerUrl = "invalidUrl";

      await expect(nxtpUtils.getTransfersByStatus({ status: XTransferStatus.Reconciled })).to.be.rejectedWith(
        UriInvalid,
      );
    });

    it("happy: should work", async () => {
      const res = await nxtpUtils.getTransfersByStatus({
        status: XTransferStatus.Reconciled,
        range: {
          limit: 100,
          offset: 20,
        },
      });

      expect(res.data).to.not.be.undefined;
    });
  });

  describe("#getTransfersByRouter", () => {
    it("should error if validateUri fails", async () => {
      (nxtpUtils as any).config.cartographerUrl = "invalidUrl";

      await expect(nxtpUtils.getTransfersByRouter({ routerAddress: mock.address.router })).to.be.rejectedWith(
        UriInvalid,
      );
    });

    it("happy: should work", async () => {
      const res = await nxtpUtils.getTransfersByRouter({
        routerAddress: mock.address.router,
        status: XTransferStatus.Executed,
        range: {
          limit: 100,
          offset: 20,
        },
      });

      expect(res.data).to.not.be.undefined;
    });
  });

  describe("#getTransferById", () => {
    it("should error if validateUri fails", async () => {
      (nxtpUtils as any).config.cartographerUrl = "invalidUrl";

      await expect(nxtpUtils.getTransferById(getRandomBytes32())).to.be.rejectedWith(UriInvalid);
    });

    it("happy: should work", async () => {
      const res = await nxtpUtils.getTransferById(getRandomBytes32());

      expect(res.data).to.not.be.undefined;
    });
  });

  describe("#getTransferByTransactionHash", () => {
    it("should error if validateUri fails", async () => {
      (nxtpUtils as any).config.cartographerUrl = "invalidUrl";

      await expect(nxtpUtils.getTransferByTransactionHash(getRandomBytes32())).to.be.rejectedWith(UriInvalid);
    });

    it("happy: should work", async () => {
      const res = await nxtpUtils.getTransferByTransactionHash(getRandomBytes32());

      expect(res.data).to.not.be.undefined;
    });
  });

  describe("#changeSignerAddress", () => {
    it("happy: should work", async () => {
      const mockSignerAddress = mkAddress("0xabcdef456");
      await nxtpUtils.changeSignerAddress(mockSignerAddress);
      expect(nxtpUtils.config.signerAddress).to.be.eq(mockSignerAddress);
    });
  });
});
