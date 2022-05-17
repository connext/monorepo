import { chainDataToMap } from "@connext/nxtp-utils";
import { stub, SinonStub, restore, reset } from "sinon";
import { SubgraphMap } from "../src/lib/entities";
import * as Reader from "../src/reader";

export const mockChainData = chainDataToMap([
  {
    name: "Rinkeby Testnet",
    chainId: 4,
    domainId: "1111",
    network: "rinkeby",
  },
  {
    name: "Kovan Testnet",
    chainId: 42,
    domainId: "2221",
    network: "kovan",
  },
  {
    name: "Local Testnet",
    chainId: 65555,
    domainId: "5555555555555",
    network: "localtest",
  },
]);
export const mockResponse: Map<string, any[]> = new Map();
mockResponse.set("1337", ["happy1337"]);
mockResponse.set("1338", ["happy1338"]);

const defaultContext: { config: SubgraphMap } = {
  config: {
    sources: {
      "1111": { domain: "1111", prefix: "rinkeby" },
      "2221": { domain: "2221", prefix: "kovan" },
    },
    supported: { "1111": true, "2221": true, "5555555555555": false },
  },
};
export let mockContext: any;
export let getContextStub: SinonStub;
// Stub getContext to return the mock context above.
export const stubContext = (_context?: { config: SubgraphMap }) => {
  mockContext = _context ?? defaultContext;
  try {
    getContextStub.restore();
  } catch (e) {}
  try {
    getContextStub = stub(Reader, "getContext").callsFake(() => {
      return mockContext;
    });
  } catch (e) {}
  return mockContext;
};
