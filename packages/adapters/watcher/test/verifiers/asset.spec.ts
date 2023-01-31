import { TransactionService } from "@connext/nxtp-txservice";
import { createRequestContext, expect, Logger, mkAddress, mkBytes32 } from "@connext/nxtp-utils";
import { BigNumber, constants } from "ethers";
import { createStubInstance, SinonStubbedInstance, stub, SinonStub } from "sinon";
import { ConnextAbi } from "@connext/smart-contracts";

import * as MockableFns from "../../src/mockable";
import { AssetVerifier } from "../../src/verifiers";
import { AssetInfo, VerifierContext } from "../../src/types";

describe("Watcher Adapter: AssetVerifier", () => {
  const canonicalDomain = "133712";
  const connextAddress = mkAddress("0x987654321");

  let readTxResult = "test 123";
  let requestContext = createRequestContext("Watcher Adapter: AssetVerifier tests");
  let domains: string[];
  let targetAsset: AssetInfo;

  let txservice: SinonStubbedInstance<TransactionService>;
  let context: VerifierContext;
  let assetVerifier: AssetVerifier;

  let connextEncodeFunctionData: SinonStub<any[], any>;
  let connextDecodeFunctionResult: SinonStub<any[], any>;
  let erc20EncodeFunctionData: SinonStub<any[], any>;
  let erc20DecodeFunctionResult: SinonStub<any[], any>;

  beforeEach(() => {
    const canonicalAssetAddress = mkAddress("0x123123123");
    const canonicalId = mkBytes32(canonicalAssetAddress);
    domains = [canonicalDomain];

    targetAsset = {
      canonicalId,
      canonicalDomain,
      address: canonicalAssetAddress,
      symbol: "TEST",
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

    connextEncodeFunctionData = stub().returns("0x123");
    connextDecodeFunctionResult = stub().returns(["123"]);

    stub(MockableFns, "ConnextInterface").value({
      encodeFunctionData: connextEncodeFunctionData,
      decodeFunctionResult: connextDecodeFunctionResult,
    });

    erc20EncodeFunctionData = stub().returns("0x123");
    erc20DecodeFunctionResult = stub().returns(["123"]);

    stub(MockableFns, "getErc20Interface").value(() => ({
      encodeFunctionData: erc20EncodeFunctionData,
      decodeFunctionResult: erc20DecodeFunctionResult,
    }));
  });

  describe("#totalMintedAssets", () => {
    it("should skip the canonical domain", async () => {
      const result = await assetVerifier.totalMintedAssets(targetAsset, requestContext);
      expect(result.isZero()).to.be.true;
      expect(txservice.readTx.callCount).to.be.eq(0);
    });

    it("should skip addresses with empty representations", async () => {
      domains.push("133812");
      stub(MockableFns, "ConnextInterface").value({
        encodeFunctionData: connextEncodeFunctionData,
        decodeFunctionResult: stub().returns([constants.AddressZero]),
      });

      const result = await assetVerifier.totalMintedAssets(targetAsset, requestContext);
      expect(result.isZero()).to.be.true;
      expect(txservice.readTx.callCount).to.be.eq(1);
    });

    it("should fail if decoding supply fails", async () => {
      domains.push("133812");
      const error = "error you are testing silly goose";
      stub(MockableFns, "getErc20Interface").value(() => ({
        encodeFunctionData: erc20EncodeFunctionData,
        decodeFunctionResult: stub().throws(error),
      }));

      await expect(assetVerifier.totalMintedAssets(targetAsset, requestContext)).to.be.rejectedWith(
        `Failed to convert totalSupply response to BigNumber. token: 123, Received: test 123; Error: ` + error,
      );
    });

    it("should work", async () => {
      readTxResult = "123";
      txservice.readTx.callsFake(async (): Promise<string> => {
        return readTxResult;
      });
      domains.push("133812");

      const result = await assetVerifier.totalMintedAssets(targetAsset, requestContext);
      expect(result.toString()).to.be.eq(readTxResult);
      expect(txservice.readTx.callCount).to.be.eq(2);
      // call to get representation asset
      expect(txservice.readTx.args[0][0]).to.containSubset({ domain: +domains[1], to: connextAddress, data: "0x123" });
      // call to get total supply
      expect(txservice.readTx.args[1][0]).to.containSubset({ domain: +domains[1], to: "123", data: "0x123" });
    });
  });

  describe("#totalLockedAssets", () => {
    it("should fail if decoding fails", async () => {
      const error = "error you are testing silly goose";
      stub(MockableFns, "ConnextInterface").value({
        encodeFunctionData: connextEncodeFunctionData,
        decodeFunctionResult: stub().throws(error),
      });

      await expect(assetVerifier.totalLockedAssets(targetAsset, requestContext)).to.be.rejectedWith(
        `Failed to convert getCustodiedAmount response to BigNumber. Received: 123; Error: ` + error,
      );
    });

    it("should query custodied on-chain", async () => {
      const result = await assetVerifier.totalLockedAssets(targetAsset, requestContext);
      expect(result.toString()).to.be.eq("123");
      expect(
        txservice.readTx.calledOnceWith({
          domain: +canonicalDomain,
          to: connextAddress,
          data: "0x123",
        }),
      );
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
      expect(result.needsPause).to.be.false;
      // NOTE: If we add more target assets to this test, make sure to modify these checks.
      expect(totalLockedAssetsStub).to.have.been.calledOnceWithExactly(targetAsset, requestContext);
      expect(totalMintedAssetsStub).to.have.been.calledOnceWithExactly(targetAsset, requestContext);

      // totalMinted is less than totalLocked: should pass.
      totalMintedAssetsStub.resolves(BigNumber.from(8_123));
      result = await assetVerifier.checkInvariant(requestContext);
      expect(result.needsPause).to.be.false;
    });

    it("should fail when invariant is violated", async () => {
      // Total minted is greater than total locked: should return false.
      totalLockedAssetsStub.resolves(BigNumber.from(10_000));
      totalMintedAssetsStub.resolves(BigNumber.from(20_000));
      const result = await assetVerifier.checkInvariant(requestContext);
      expect(result.needsPause).to.be.true;
      expect(totalLockedAssetsStub).to.have.been.calledOnceWithExactly(targetAsset, requestContext);
      expect(totalMintedAssetsStub).to.have.been.calledOnceWithExactly(targetAsset, requestContext);
    });
  });
});
