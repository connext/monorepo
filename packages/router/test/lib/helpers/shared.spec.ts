import { createRequestContext, expect, mkAddress, GAS_ESTIMATES } from "@connext/nxtp-utils";
import { BigNumber } from "@ethersproject/bignumber";
import { stub } from "sinon";
import { getNtpTimeSeconds } from "../../../src/lib/helpers";
import * as shared from "../../../src/lib/helpers/shared";
import { txServiceMock } from "../../globalTestHook";

import * as ContractHelperFns from "../../../src/adapters/contract/contract";
import { constants } from "ethers";

describe("getNtpTimeSeconds", () => {
  it("should work", async () => {
    const result = await getNtpTimeSeconds();
    expect(result).to.be.eq(Math.floor(Date.now() / 1000));
  });
});

describe("getTokenPrice", () => {
  beforeEach(() => {
    stub(ContractHelperFns, "getOracleContractAddress").returns("0xaaa");
  });

  it("should work", async () => {
    txServiceMock.readTx.resolves("1");
    const result = await shared.getTokenPrice(4, constants.AddressZero, null);
    expect(result.toString()).to.be.eq("1");
  });
});

describe("getTokenPriceFromOnChain", () => {
  beforeEach(() => {
    stub(ContractHelperFns, "getOracleContractAddress").returns("0xaaa");
  });

  it("should work", async () => {
    txServiceMock.readTx.resolves("1");
    const result = await shared.getTokenPriceFromOnChain(4, constants.AddressZero, null);
    expect(result.toString()).to.be.eq("1");
  });
});

describe("getGasPrice", () => {
  it("should work", async () => {
    txServiceMock.getGasPrice.resolves(BigNumber.from("1"));
    const result = await shared.getGasPrice(4, null);
    expect(result.toString()).to.be.eq("1");
  });
});

describe("getChainIdsForGasFee", () => {
  it("should work", () => {
    const result = shared.getChainIdForGasFee();
    expect(result).to.be.includes(4);
    expect(result).to.be.includes(56);
    expect(result).to.be.includes(42161);
  });
});

describe("getMainnetEquivalent", () => {
  it("should work", async () => {
    const result = await shared.getMainnetEquivalent(mkAddress("0xc"), 1337);
    expect(result).to.be.eq(mkAddress("0xd"));
  });
});

describe("getMainnetEquivalentFromChainData", () => {
  it("should work", async () => {
    const result = await shared.getMainnetEquivalentFromChainData(constants.AddressZero, 100);
    expect(result).to.be.eq("0x6B175474E89094C44Da98b954EedeAC495271d0F");
  });
});

describe("calculateGasFeeInReceivingToken", () => {
  it("should return 0 for local chains", async () => {
    const result = await shared.calculateGasFeeInReceivingToken(
      mkAddress("0x1"),
      1337,
      mkAddress("0x2"),
      1338,
      18,
      createRequestContext("test"),
    );
    expect(result.toNumber()).to.be.eq(0);
  });

  it("should only calculate sending chain if receiving chain is not included", async () => {
    const tokenStub = stub(shared, "getTokenPrice");
    const gasStub = stub(shared, "getGasPrice");
    tokenStub.onFirstCall().resolves(BigNumber.from(1));
    tokenStub.onSecondCall().resolves(BigNumber.from(2));
    gasStub.onFirstCall().resolves(BigNumber.from(5));
    const result = await shared.calculateGasFeeInReceivingToken(
      mkAddress("0x0"),
      1,
      mkAddress("0x2"),
      1338,
      18,
      createRequestContext("test"),
    );
    expect(result.toNumber()).to.be.eq((5 * parseInt(GAS_ESTIMATES.fulfill) * 1) / 2);
  });

  it("should only calculate sending chain if receiving chain is not included and add l1gas for optimism", async () => {
    const tokenStub = stub(shared, "getTokenPrice");
    const gasStub = stub(shared, "getGasPrice");
    tokenStub.onFirstCall().resolves(BigNumber.from(1));
    tokenStub.onSecondCall().resolves(BigNumber.from(2));
    gasStub.onFirstCall().resolves(BigNumber.from(5));
    gasStub.onSecondCall().resolves(BigNumber.from(5));
    const result = await shared.calculateGasFeeInReceivingToken(
      mkAddress("0x0"),
      10,
      mkAddress("0x2"),
      1338,
      18,
      createRequestContext("test"),
    );
    expect(result.toNumber()).to.be.eq(
      (5 * (parseInt(GAS_ESTIMATES.fulfill) + parseInt(GAS_ESTIMATES.fulfillL1)) * 1) / 2,
    );
  });

  it("should only calculate receiving chain if sending chain is not included", async () => {
    const tokenStub = stub(shared, "getTokenPrice");
    const gasStub = stub(shared, "getGasPrice");
    tokenStub.onFirstCall().resolves(BigNumber.from(1));
    tokenStub.onSecondCall().resolves(BigNumber.from(2));
    gasStub.onFirstCall().resolves(BigNumber.from(5));
    const result = await shared.calculateGasFeeInReceivingToken(
      mkAddress("0x0"),
      1338,
      mkAddress("0x2"),
      1,
      18,
      createRequestContext("test"),
    );
    expect(result.toNumber()).to.be.eq((5 * parseInt(GAS_ESTIMATES.prepare) * 1) / 2);
  });

  it("should only calculate receiving chain if sending chain is not included and add l1gas for optimism", async () => {
    const tokenStub = stub(shared, "getTokenPrice");
    const gasStub = stub(shared, "getGasPrice");
    tokenStub.onFirstCall().resolves(BigNumber.from(1));
    tokenStub.onSecondCall().resolves(BigNumber.from(2));
    gasStub.onFirstCall().resolves(BigNumber.from(5));
    gasStub.onSecondCall().resolves(BigNumber.from(5));
    const result = await shared.calculateGasFeeInReceivingToken(
      mkAddress("0x0"),
      1338,
      mkAddress("0x2"),
      10,
      18,
      createRequestContext("test"),
    );
    expect(result.toNumber()).to.be.eq(
      (5 * (parseInt(GAS_ESTIMATES.prepare) + parseInt(GAS_ESTIMATES.prepareL1)) * 1) / 2,
    );
  });
});

describe("calculateGasFeeInReceivingTokenForFulfill", () => {
  it("should return 0 for local chains", async () => {
    const result = await shared.calculateGasFeeInReceivingTokenForFulfill(
      mkAddress("0x1"),
      1337,
      18,
      createRequestContext("test"),
    );
    expect(result.toNumber()).to.be.eq(0);
  });

  it("should work", async () => {
    const tokenStub = stub(shared, "getTokenPrice");
    const gasStub = stub(shared, "getGasPrice");
    tokenStub.onFirstCall().resolves(BigNumber.from(1));
    tokenStub.onSecondCall().resolves(BigNumber.from(2));
    gasStub.onFirstCall().resolves(BigNumber.from(5));
    const result = await shared.calculateGasFeeInReceivingTokenForFulfill(
      mkAddress("0x0"),
      1,
      18,
      createRequestContext("test"),
    );
    expect(result.toNumber()).to.be.eq((5 * parseInt(GAS_ESTIMATES.fulfill) * 1) / 2);
  });

  it("should add l1Gas for optimism", async () => {
    const tokenStub = stub(shared, "getTokenPrice");
    const gasStub = stub(shared, "getGasPrice");
    tokenStub.onFirstCall().resolves(BigNumber.from(1));
    tokenStub.onSecondCall().resolves(BigNumber.from(2));
    gasStub.onFirstCall().resolves(BigNumber.from(5));
    gasStub.onSecondCall().resolves(BigNumber.from(5));
    const result = await shared.calculateGasFeeInReceivingTokenForFulfill(
      mkAddress("0x0"),
      10,
      18,
      createRequestContext("test"),
    );
    expect(result.toNumber()).to.be.eq(
      (5 * (parseInt(GAS_ESTIMATES.fulfill) + parseInt(GAS_ESTIMATES.prepareL1)) * 1) / 2,
    );
  });
});
