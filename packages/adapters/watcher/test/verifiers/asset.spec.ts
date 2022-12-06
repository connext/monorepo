import { TransactionService } from "@connext/nxtp-txservice";
import { createRequestContext, expect, Logger, mkAddress, mkBytes32 } from "@connext/nxtp-utils";
import { BigNumber } from "ethers";
import { createStubInstance, SinonStubbedInstance, stub, SinonStub } from "sinon";

import { AssetVerifier } from "../../src/verifiers";
import { AssetInfo, VerifierContext } from "../../src/types";
import { ConnextAbi } from "@connext/nxtp-contracts";

describe("Watcher Adapter: AssetVerifier", () => {
  const canonicalDomain = "1337";
  const connextAddress = mkAddress("0x987654321");

  let readTxResult = "test 123";
  let requestContext = createRequestContext("Watcher Adapter: AssetVerifier tests");
  let domains = [canonicalDomain];
  let targetAsset: AssetInfo;

  let txservice: SinonStubbedInstance<TransactionService>;
  let context: VerifierContext;
  let assetVerifier: AssetVerifier;

  beforeEach(() => {
    const canonicalAssetAddress = mkAddress("0x123123123");
    const canonicalId = mkBytes32(canonicalAssetAddress);

    targetAsset = {
      canonicalId,
      canonicalDomain,
      address: canonicalAssetAddress,
    };

    txservice = createStubInstance(TransactionService);
    txservice.readTx.callsFake(async (): Promise<string> => {
      return readTxResult;
    });
    const logger = createStubInstance(Logger);
    context = {
      domains,
      txservice,
      logger,
      isStaging: true,
    };
    assetVerifier = new AssetVerifier(context, [targetAsset]);

    stub(assetVerifier as any, "getConnextDeployment").returns({
      abi: [...ConnextAbi, "function getCustodiedAmount(bytes32) view returns (uint256)"],
      address: connextAddress,
    });
  });

  // TODO:
  describe("#totalMintedAssets", () => {
    it("should query custodied on-chain", async () => {
      readTxResult = "123";
      const result = await assetVerifier.totalMintedAssets(targetAsset);
      expect(BigNumber.from(readTxResult).eq(result));
    });
  });

  // TODO:
  describe("#totalLockedAssets", () => {
    it("should query custodied on-chain", async () => {
      readTxResult = "1234";
      const result = await assetVerifier.totalLockedAssets(targetAsset);
      expect(BigNumber.from(readTxResult).eq(result));
    });
  });

  describe("#checkInvariant", () => {
    let totalLockedAssetsStub: SinonStub;
    let totalMintedAssetsStub: SinonStub;

    beforeEach(() => {
      totalLockedAssetsStub = stub(assetVerifier, "totalLockedAssets");
      totalMintedAssetsStub = stub(assetVerifier, "totalMintedAssets");
    });

    it("should validate when invariant is passed", async () => {
      // Equal values: should pass.
      totalLockedAssetsStub.resolves(BigNumber.from(10_000));
      totalMintedAssetsStub.resolves(BigNumber.from(10_000));
      let result = await assetVerifier.checkInvariant(requestContext);
      expect(result).to.be.true;
      // NOTE: If we add more target assets to this test, make sure to modify these checks.
      expect(totalLockedAssetsStub).to.have.been.calledOnceWithExactly(targetAsset);
      expect(totalMintedAssetsStub).to.have.been.calledOnceWithExactly(targetAsset);

      // totalMinted is less than totalLocked: should pass.
      totalMintedAssetsStub.resolves(BigNumber.from(8_123));
      result = await assetVerifier.checkInvariant(requestContext);
      expect(result).to.be.true;
    });

    it("should fail when invariant is violated", async () => {
      // Total minted is greater than total locked: should return false.
      totalLockedAssetsStub.resolves(BigNumber.from(10_000));
      totalMintedAssetsStub.resolves(BigNumber.from(20_000));
      const result = await assetVerifier.checkInvariant(requestContext);
      expect(result).to.be.false;
      expect(totalLockedAssetsStub).to.have.been.calledOnceWithExactly(targetAsset);
      expect(totalMintedAssetsStub).to.have.been.calledOnceWithExactly(targetAsset);
    });
  });
});
