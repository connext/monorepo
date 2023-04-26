import { expect, mkAddress } from "@connext/nxtp-utils";
import { stub, SinonStub, reset, restore } from "sinon";
import { constants, BigNumber } from "ethers";
import { calculateRouteForSwapAndXCall, prepareSwapAndXCall } from "../../../src/libs";
import * as MockableFns from "../../../src/mockable";

const POLYGON_WETH = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619";
const POLYGON_USDC = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174";
const amountIn = BigNumber.from("1000000000000000");
const fromAsset = POLYGON_WETH;

const mockSwapAndXCallParams = {
  originDomain: "1886350457",
  destinationDomain: "6450786",
  fromAsset, // WETH
  toAsset: POLYGON_USDC, // USDC
  amountIn: amountIn.toString(),
  to: mkAddress("0x123"),
};

describe("Libs:origin", () => {});
