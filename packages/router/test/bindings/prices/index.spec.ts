import { reset, restore, SinonStub, stub } from "sinon";
import { parseEther } from "@ethersproject/units";
import { delay, expect, mkAddress } from "@connext/nxtp-utils";

import * as binding from "../../../src/bindings/prices/index";
import * as SharedFns from "../../../src/lib/helpers/shared";
import * as ConfigFns from "../../../src/config";

import { configMock } from "../../utils";

const MOCK_ETHER_PRICE = "3000"; // 3000 usd
const MOCK_TOKEN_PRICE1 = "150"; // 150 usd
const MOCK_TOKEN_PRICE2 = "200"; // 200 usd
describe("Fetching Price Binding", () => {
  describe("#getPriceLoopInterval", async () => {
    expect(binding.getPriceLoopInterval()).to.be.eq(15_000);
  });

  describe("#bindPrices", async () => {
    const interval = 250;

    let getTokenPriceFromOnChainStub: SinonStub;
    let multicallStub: SinonStub;
    let priceOracleStub: SinonStub;
    beforeEach(() => {
      stub(binding, "getPriceLoopInterval").returns(interval);
      priceOracleStub = stub(ConfigFns, "getDeployedPriceOracleContract");
      priceOracleStub.returns({ address: mkAddress("0xaaa"), abi: "xxx" });
      multicallStub = stub(SharedFns, "multicall");
      getTokenPriceFromOnChainStub = stub(SharedFns, "getTokenPriceFromOnChain");
    });

    afterEach(() => {
      restore();
      reset();
    });

    it("should error if multicall is failed", async () => {
      multicallStub.throws(new Error("fail"));
      await binding.bindPrices();
      await delay(interval + 10);
      expect(multicallStub).callCount(1);
    });

    it("should fetch prices using multicall if multicall is configured", async () => {
      multicallStub.resolves([parseEther(MOCK_TOKEN_PRICE1), parseEther(MOCK_ETHER_PRICE)]);
      binding.cachedPriceMap.clear();
      await binding.bindPrices();
      await delay(interval + 10);
      expect(multicallStub.callCount).to.be.gt(0);
      expect(getTokenPriceFromOnChainStub).callCount(0);
    });

    it("should fetch prices using Promise if multicall isn't configured", async () => {
      configMock.chainConfig["1337"].multicallAddress = null;
      configMock.chainConfig["1338"].multicallAddress = null;
      getTokenPriceFromOnChainStub.resolves(parseEther(MOCK_TOKEN_PRICE2));
      binding.cachedPriceMap.clear();
      await binding.bindPrices();
      await delay(interval + 10);
      expect(multicallStub).callCount(0);
      expect(getTokenPriceFromOnChainStub.callCount).to.be.gt(0);
    });
  });
});
