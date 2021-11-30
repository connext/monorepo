import { expect } from "@connext/nxtp-utils";
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

// TODO: test pass through method calculateGasFeeInReceivingToken?
