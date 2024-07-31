import { expect } from "@connext/nxtp-utils";
import { POSClient } from "@maticnetwork/maticjs";
import { initMatic } from "../../src";

describe("maticjs:client", () => {
  describe("#initMatic", () => {
    type InitMaticTestCase = {
      title: string;
      isMainnet: boolean;
      expectedNetwork: "mainnet";
      expectedVersion: "v1";
    };

    const testCases: InitMaticTestCase[] = [
      {
        title: "should work for mainnet",
        isMainnet: true,
        expectedNetwork: "mainnet",
        expectedVersion: "v1",
      },
    ];
    for (const { isMainnet, expectedNetwork, expectedVersion, title } of testCases) {
      it(title, async () => {
        const MATIC_PROVIDER = "http://matic-eth.com";
        const ETH_PROVIDER = "http://eth.com";
        const client = await initMatic(isMainnet, MATIC_PROVIDER, ETH_PROVIDER);
        expect(client).instanceOf(POSClient);
        expect(client.client.config.network).to.be.eq(expectedNetwork);
        expect(client.client.config.version).to.be.eq(expectedVersion);
        expect(client.client.config.child?.provider).to.be.eq(MATIC_PROVIDER);
        expect(client.client.config.parent?.provider).to.be.eq(ETH_PROVIDER);
      });
    }
  });
});
