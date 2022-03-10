import { mkAddress, Logger, mock as _mock } from "@connext/nxtp-utils";

import { NxtpRouterConfig } from "../src/config";

export const mock = {
  ..._mock,
  router: {
    ..._mock.router,
    context: () => {
      return {
        adapters: {
          wallet: mock.adapter.wallet(),
          subgraph: mock.adapter.subgraph(),
          cache: mock.adapter.cache(),
          txservice: mock.adapter.txservice(),
        },
        config: mock.router.config(),
        chainData: mock.chainData(),
        routerAddress: mock.router.address,
        logger: new Logger({ name: "mock", level: process.env.LOG_LEVEL || "silent" }),
      };
    },
    config: () =>
      ({
        chains: {
          [mock.chain.A]: {
            assets: [
              {
                name: "TEST",
                address: mkAddress("0xbeefbeefbeef"),
              },
            ],
            confirmations: 1,
            providers: ["http://example.com"],
            subgraph: {
              runtime: ["http://example.com"],
              analytics: ["http://example.com"],
              maxLag: 10,
            },
            deployments: {
              transactionManager: mkAddress("0xabcdef123"),
            },
            gasStations: [],
          },
          [mock.chain.B]: {
            assets: [
              {
                name: "TEST",
                address: mkAddress("0xbeefbeefbeef"),
              },
            ],
            confirmations: 1,
            providers: ["http://example.com"],
            subgraph: {
              runtime: ["http://example.com"],
              analytics: ["http://example.com"],
              maxLag: 10,
            },
            deployments: {
              transactionManager: mkAddress("0xabcdef123"),
            },
            gasStations: [],
          },
        },
        mnemonic: "hello world",
        logLevel: "info",
        redisUrl: "redis://localhost:6379",
        sequencerUrl: "http://localhost:8081",
        server: {
          host: "0.0.0.0",
          port: 3000,
          requestLimit: 2000,
          adminToken: "blahblahblah",
        },
        network: "testnet",
        maxSlippage: 0,
        mode: {
          diagnostic: false,
          cleanup: false,
          priceCaching: false,
        },
      } as NxtpRouterConfig),
  },
};
