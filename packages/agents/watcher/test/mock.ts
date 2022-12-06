import { Wallet } from "ethers";
import { createStubInstance } from "sinon";
import { WatcherAdapter } from "@connext/nxtp-adapters-watcher";
import { Logger, mock as _mock, mockSequencer } from "@connext/nxtp-utils";
import { mockSubgraph } from "@connext/nxtp-adapters-subgraph/test/mock";

import { WatcherConfig } from "../src/config";
import { WatcherContext } from "../src/context";

export const mock = {
  ..._mock,
  context: (): WatcherContext => {
    return {
      adapters: {
        subgraph: mockSubgraph(),
        wallet: createStubInstance(Wallet, { getAddress: Promise.resolve(mockSequencer) }),
        watcher: createStubInstance(WatcherAdapter, {
          checkInvariants: Promise.resolve(true),
          pause: Promise.resolve([true]),
        }),
      },
      config: mock.config(),
      chainData: mock.chainData(),
      logger: new Logger({ name: "mock", level: process.env.LOG_LEVEL || "silent" }),
    };
  },
  config: (): WatcherConfig => ({
    chains: {
      [mock.domain.A]: {
        providers: ["http://example.com"],
        assets: [{ name: "TEST", address: mock.asset.A.address }],
      },
      [mock.domain.B]: {
        providers: ["http://example.com"],
        assets: [{ name: "TEST", address: mock.asset.B.address }],
      },
    },
    logLevel: "info",
    server: {
      adminToken: "foo",
      port: 8080,
      host: "0.0.0.0",
    },
    environment: "staging",
    hubDomain: mock.domain.A,
    interval: 1000,
  }),
};
