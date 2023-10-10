import { Wallet } from "ethers";
import { createStubInstance } from "sinon";
import { OpModeMonitor, WatcherAdapter } from "@connext/nxtp-adapters-watcher";
import { Logger, mkHash, mock as _mock, mockSequencer } from "@connext/nxtp-utils";
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
          checkInvariants: Promise.resolve({ needsPause: true }),
          pause: Promise.resolve([
            { domain: mock.domain.A, error: "foo", paused: true, relevantTransaction: mkHash("0x1") },
            { domain: mock.domain.B, error: "bar", paused: true, relevantTransaction: mkHash("0x1") },
          ]),
          alert: Promise.resolve(),
        }),
        monitor: createStubInstance(OpModeMonitor, {
          validateProposal: Promise.resolve({ needsSwitch: false, reason: "" }),
          switch: Promise.resolve(),
          alert: Promise.resolve(),
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
