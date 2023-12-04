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

describe("Libs:origin", () => {
  let axiosGetStub: SinonStub;
  beforeEach(() => {
    axiosGetStub = stub(MockableFns, "axiosGet");
  });
  afterEach(() => {
    restore();
    reset();
  });
  describe("#calculateRouteForSwapAndXCall", () => {
    it("should throw if swapper config doesn't exist", async () => {
      await expect(
        calculateRouteForSwapAndXCall("1337", constants.AddressZero, constants.AddressZero, "100", mkAddress("0x1"), {
          apiKey: "12345",
        }),
      ).to.be.rejectedWith("Swapper config not found for domain: 1337");
    });
    it("should work", async () => {
      axiosGetStub.resolves({ data: { tx: { data: "0xaaa" } } });
      const BNB_USDC = "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d";
      const calculatedRoute = await calculateRouteForSwapAndXCall(
        "6450786",
        constants.AddressZero,
        BNB_USDC,
        "100000",
        mkAddress("0x1"),
        { apiKey: "12345" },
      );

      expect(calculatedRoute).to.be.deep.eq({
        swapper: "0x1111111254EEB25477B68fb85Ed929f73A960582",
        swapData: "0xaaa",
      });
    });
  });
  describe("#prepareSwapAndXCall", () => {
    it("should throw if SwapAndXCall contract not deployed", async () => {
      const swapParams = { ...mockSwapAndXCallParams, originDomain: "1337" };
      const res = await prepareSwapAndXCall(swapParams, mkAddress("0x123"));
      expect(res).to.be.undefined;
    });
    it("should throw if encodeFunctionData fails", async () => {
      const swapParams = { ...mockSwapAndXCallParams, slippage: "aaa" };
      const res = await prepareSwapAndXCall(swapParams, mkAddress("0x123"));
      expect(res).to.be.undefined;
    });
    it("happy-1: should work with default params", async () => {
      axiosGetStub.resolves({ data: { tx: { data: "0x1a1a1a" } } });
      const res = await prepareSwapAndXCall(mockSwapAndXCallParams, mkAddress("0x123"), { apiKey: "12345" });
      expect(res).to.be.deep.eq({
        to: "0x6e92344d08F8443a9C704452ac66bEFB90D32E12",
        value: BigNumber.from(0),
        data: "0x2bb679640000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f6190000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa8417400000000000000000000000000000000000000000000000000038d7ea4c680000000000000000000000000001111111254eeb25477b68fb85ed929f73a96058200000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000000626e6200000000000000000000000012300000000000000000000000000000000000000000000000000000000000001230000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000012c000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000000031a1a1a00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        from: "0x1230000000000000000000000000000000000000",
        chainId: 137,
      });
    });
    it("happy-2: should work", async () => {
      const swapAndXCallParams = {
        ...mockSwapAndXCallParams,
        delegate: mkAddress("0xaaa"),
        slippage: "300",
        route: { swapper: "0x1111111254EEB25477B68fb85Ed929f73A960582", swapData: "0x1a1a1a" },
        callData: "0x",
        relayerFeeInNativeAsset: "1000",
        relayerFeeInTransactingAsset: "1000",
      };
      const res = await prepareSwapAndXCall(swapAndXCallParams, mkAddress("0x123"));
      expect(res).to.be.deep.eq({
        to: "0x6e92344d08F8443a9C704452ac66bEFB90D32E12",
        value: BigNumber.from(1000),
        data: "0x0c949d490000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f6190000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa8417400000000000000000000000000000000000000000000000000038d7ea4c680000000000000000000000000001111111254eeb25477b68fb85ed929f73a96058200000000000000000000000000000000000000000000000000000000000001600000000000000000000000000000000000000000000000000000000000626e620000000000000000000000001230000000000000000000000000000000000000000000000000000000000000aaa0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000012c00000000000000000000000000000000000000000000000000000000000001a000000000000000000000000000000000000000000000000000000000000003e800000000000000000000000000000000000000000000000000000000000000031a1a1a00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        from: "0x1230000000000000000000000000000000000000",
        chainId: 137,
      });
    });
  });
});
