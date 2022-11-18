import { stub, restore, reset } from "sinon";
import { Logger } from "@connext/nxtp-utils";

import { CartographerConfig } from "../src/config";
import { AppContext } from "../src/shared";
import * as shared from "../src/shared";
import { mockDatabase } from "../../../../adapters/database/test/mock";

import { mockChainData, mockConfig } from "./mock";
import { mockSubgraph } from "@connext/nxtp-adapters-subgraph/test/mock";

export let mockContext: AppContext;

export const mochaHooks = {
  async beforeEach() {
    mockContext = {
      logger: new Logger({
        level: "silent",
        name: "MockBackend",
      }),
      adapters: {
        subgraph: mockSubgraph(),
        database: mockDatabase(),
      },
      config: mockConfig as CartographerConfig,
      chainData: mockChainData,
      domains: ["1337", "1338"],
    };
    stub(shared, "getContext").returns(mockContext);
  },
  afterEach() {
    restore();
    reset();
  },
};
