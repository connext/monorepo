import { chainDataToMap, expect, mkAddress } from "@connext/nxtp-utils";
import { stub, SinonStub, restore, reset } from "sinon";
import * as GraphClientFns from "../../../src/lib/helpers/graphclient";
import { create, getNetwork } from "../../../src/lib/helpers/create";
import { mockChainData } from "../../mock";

describe("Helpers:create", () => {
  describe("#getNetwork", () => {
    it("should return the valid value in case of staging", () => {
      expect(getNetwork("Connext_Staging_Rinkeby", "staging")![1]).to.be.eq("Rinkeby");
    });
    it("should return null in case of staging", () => {
      expect(getNetwork("Connext_Rinkeby", "staging")).to.be.eq(null);
    });

    it("should return the valid value in case of production", () => {
      expect(getNetwork("Connext_Staging_Rinkeby", "production")).to.be.eq(null);
    });
    it("should return null in case of staging", () => {
      expect(getNetwork("Connext_Rinkeby", "production")![1]).to.be.eq("Rinkeby");
    });
  });
  describe("#create", () => {
    let getSubgraphNamesStub: SinonStub;
    before(() => {
      getSubgraphNamesStub = stub(GraphClientFns, "getSubgraphNames");
    });
    after(() => {
      restore();
      reset();
    });

    it("happy: create the staging subgraphMap by parsing chainData", async () => {
      getSubgraphNamesStub.resolves(["Connext_Staging_Rinkeby", "Connext_Staging_Goerli"]);
      const subgraphMap = await create(mockChainData, "staging");
      const response = {
        sources: {
          "1111": { domain: "1111", prefix: "stagingrinkeby" },
          "3331": { domain: "3331", prefix: "staginggoerli" },
        },
        supported: { "1111": true, "3331": true, "5555555555555": false },
        assetId: {
          "1111": {
            [mkAddress("0x11")]: { symbol: "DAI", decimals: 18 },
            [mkAddress("0x12")]: { symbol: "USDC", decimals: 6 },
          },
          "3331": {
            [mkAddress("0x11")]: { symbol: "DAI", decimals: 18 },
            [mkAddress("0x12")]: { symbol: "USDC", decimals: 6 },
          },
        },
      };
      expect(subgraphMap).to.be.deep.eq(response);
    });

    it("happy: create the production subgraphMap by parsing chainData", async () => {
      getSubgraphNamesStub.resolves(["Connext_Rinkeby", "Connext_Goerli"]);
      const subgraphMap = await create(mockChainData, "production");
      const response = {
        sources: {
          "1111": { domain: "1111", prefix: "rinkeby" },
          "3331": { domain: "3331", prefix: "goerli" },
        },
        supported: { "1111": true, "3331": true, "5555555555555": false },
        assetId: {
          "1111": {
            [mkAddress("0x11")]: { symbol: "DAI", decimals: 18 },
            [mkAddress("0x12")]: { symbol: "USDC", decimals: 6 },
          },
          "3331": {
            [mkAddress("0x11")]: { symbol: "DAI", decimals: 18 },
            [mkAddress("0x12")]: { symbol: "USDC", decimals: 6 },
          },
        },
      };
      expect(subgraphMap).to.be.deep.eq(response);
    });

    it("happy: create the production subgraphMap by default", async () => {
      getSubgraphNamesStub.resolves(["Connext_Rinkeby", "Connext_Goerli"]);
      const subgraphMap = await create(mockChainData);
      const response = {
        sources: {
          "1111": { domain: "1111", prefix: "rinkeby" },
          "3331": { domain: "3331", prefix: "goerli" },
        },
        supported: { "1111": true, "3331": true, "5555555555555": false },
        assetId: {
          "1111": {
            [mkAddress("0x11")]: { symbol: "DAI", decimals: 18 },
            [mkAddress("0x12")]: { symbol: "USDC", decimals: 6 },
          },
          "3331": {
            [mkAddress("0x11")]: { symbol: "DAI", decimals: 18 },
            [mkAddress("0x12")]: { symbol: "USDC", decimals: 6 },
          },
        },
      };
      expect(subgraphMap).to.be.deep.eq(response);
    });

    it("happy: should support all the domains", async () => {
      getSubgraphNamesStub.resolves(["Connext_Rinkeby", "Connext_Goerli"]);
      const _chainData = chainDataToMap([
        {
          name: "Rinkeby Testnet",
          chainId: 4,
          domainId: "1111",
          network: "rinkeby",
          assetId: {
            [mkAddress("0x11")]: { symbol: "DAI", decimals: 18 },
            [mkAddress("0x12")]: { symbol: "USDC", decimals: 6 },
          },
        },
      ]);
      const subgraphMap = await create(_chainData);
      const response = {
        sources: {
          "1111": { domain: "1111", prefix: "rinkeby" },
        },
        supported: { "1111": true },
        assetId: {
          "1111": {
            [mkAddress("0x11")]: { symbol: "DAI", decimals: 18 },
            [mkAddress("0x12")]: { symbol: "USDC", decimals: 6 },
          },
        },
      };
      expect(subgraphMap).to.be.deep.eq(response);
    });
  });
});
