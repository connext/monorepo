import { stub, SinonStub, restore, reset } from "sinon";
import { SubgraphMap } from "../src/lib/entities";
import * as Reader from "../src/reader";

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
