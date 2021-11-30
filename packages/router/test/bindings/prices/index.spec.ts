import * as NxtpUtilsFns from "@connext/nxtp-utils";
import * as binding from "../../../src/bindings/prices/index";
import * as SharedFns from "../../../src/lib/helpers/shared";
import * as ConfigFns from "../../../src/config";
import { SinonStub, stub } from "sinon";
import { parseEther } from "@ethersproject/units";
import { delay, mkAddress } from "@connext/nxtp-utils";

const MOCK_ETHER_PRICE = "3000"; // 3000 usd
const MOCK_TOKEN_PRICE1 = "150"; // 150 usd
const MOCK_TOKEN_PRICE2 = "200"; // 200 usd
describe("Fetching Price Binding", () => {
  describe("#getPriceLoopInterval", async () => {
    NxtpUtilsFns.expect(binding.getPriceLoopInterval()).to.be.eq(15_000);
  });

  describe("#bindPrices", async () => {
    const interval = 250;

    let getTokenPriceFromOnChainStub: SinonStub;
    let multicallStub: SinonStub;
    let priceOracleStub: SinonStub;
    beforeEach(() => {
      stub(binding, "getPriceLoopInterval").returns(interval);
      priceOracleStub = stub(ConfigFns, "getDeployedPriceOracleContract");
      multicallStub = stub(NxtpUtilsFns, "multicall");
      getTokenPriceFromOnChainStub = stub(SharedFns, "getTokenPriceFromOnChain");
      getTokenPriceFromOnChainStub.onFirstCall().resolves(parseEther(MOCK_TOKEN_PRICE2));
      getTokenPriceFromOnChainStub.onSecondCall().resolves(parseEther(MOCK_ETHER_PRICE));
    });

    it("should error if multicall is failed", async () => {
      multicallStub.throws(new Error("fail"));
      priceOracleStub.returns({ address: mkAddress("0xaaa"), abi: "xxx" });
      await binding.bindPrices();
      await delay(interval + 10);
      NxtpUtilsFns.expect(binding.cachedPriceMap.keys()).to.empty;
    });

    it("should fetch prices using multicall if multicall is configured", async () => {
      priceOracleStub.returns({ address: mkAddress("0xaaa"), abi: "xxx" });
      multicallStub.resolves([parseEther(MOCK_TOKEN_PRICE1), parseEther(MOCK_ETHER_PRICE)]);
      await binding.bindPrices();
      await delay(interval + 10);
      console.log(binding.cachedPriceMap);
      NxtpUtilsFns.expect(binding.cachedPriceMap.keys.length).to.be.greaterThan(0);
    });

    it("should fetch prices using Promise if multicall isn't configured", async () => {
      await binding.bindPrices();
      await delay(interval + 10);
      console.log(binding.cachedPriceMap);
      NxtpUtilsFns.expect(binding.cachedPriceMap.keys.length).to.be.greaterThan(0);
    });
  });
});
