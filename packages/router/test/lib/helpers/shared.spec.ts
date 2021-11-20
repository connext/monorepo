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
    const result = await shared.getMainnetEquivalent(constants.AddressZero, 100);
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

  it("should work if output decimals are different than mainnet equivalent decimals", async () => {
    const getMainnetEquivalentStub = stub(shared, "getMainnetEquivalent");
    const getMainnetDecimalsStub = stub(shared, "getMainnetDecimals");
    const tokenStub = stub(shared, "getTokenPrice");
    const gasStub = stub(shared, "getGasPrice");

    getMainnetEquivalentStub.resolves(mkAddress("0x0"));
    getMainnetDecimalsStub.resolves(18);
    tokenStub.onFirstCall().resolves(BigNumber.from(1));
    tokenStub.onSecondCall().resolves(BigNumber.from(2));
    gasStub.resolves(BigNumber.from(5));

    const extraL1 = BigNumber.from(5).mul(GAS_ESTIMATES.prepareL1).mul(1);
    const baseL2 = BigNumber.from(5).mul(GAS_ESTIMATES.prepare).mul(1).add(extraL1);
    const totalGas = extraL1.add(baseL2);
    const expectedMainnetDecimal = totalGas.div(2);
    const expected = expectedMainnetDecimal.div(BigNumber.from(10).pow(12));

    const result = await shared.calculateGasFeeInReceivingToken(
      mkAddress("0x0"),
      1337,
      mkAddress("0x2"),
      10,
      6,
      createRequestContext("test"),
    );
    expect(result.toString()).to.be.eq(expected.toString());
  });
});
