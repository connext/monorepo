import { utils, BigNumber, Wallet } from "ethers";
import { createStubInstance, SinonStubbedInstance, stub } from "sinon";
import { AuctionsCache, RoutersCache, StoreManager } from "@connext/nxtp-adapters-cache";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { ChainReader, ConnextContractInterfaces } from "@connext/nxtp-txservice";
import { mkAddress, Logger, mock as _mock, mockSequencer, RelayerType } from "@connext/nxtp-utils";
import { ConnextInterface } from "@connext/smart-contracts/typechain-types/Connext";
import { ConnextPriceOracleInterface } from "@connext/smart-contracts/typechain-types/ConnextPriceOracle";
import { StableSwapInterface } from "@connext/smart-contracts/typechain-types/StableSwap";

import { SequencerConfig } from "../src/lib/entities";
import { AppContext } from "../src/lib/entities/context";
import { mockRelayer } from "@connext/nxtp-adapters-relayer/test/mock";
import { mockDatabase } from "@connext/nxtp-adapters-database/test/mock";

export const mockExcludeAddress = mkAddress("0xmockExcludeAddr");
export const mock = {
  ..._mock,
  context: (): AppContext => {
    return {
      adapters: {
        subgraph: mock.adapters.subgraph(),
        cache: mock.adapters.cache(),
        chainreader: mock.adapters.chainreader(),
        contracts: mock.adapters.contracts(),
        relayers: mock.adapters.relayers(),
        mqClient: mock.adapters.mqClient() as any,
        wallet: createStubInstance(Wallet, { getAddress: Promise.resolve(mockSequencer) }),
        database: mockDatabase(),
      },
      config: mock.config(),
      chainData: mock.chainData(),
      logger: new Logger({ name: "mock", level: process.env.LOG_LEVEL || "silent" }),
    };
  },
  config: (): SequencerConfig => ({
    chains: {
      [mock.domain.A]: {
        confirmations: 1,
        providers: ["http://example.com"],
        deployments: {
          connext: mkAddress("0xabcdef123"),
          relayerProxy: mkAddress("0xabcdef124"),
        },
        excludeListFromRelayerFee: [mockExcludeAddress],
      },
      [mock.domain.B]: {
        confirmations: 1,
        providers: ["http://example.com"],
        deployments: {
          connext: mkAddress("0xabcdef123"),
          relayerProxy: mkAddress("0xabcdef124"),
        },
        excludeListFromRelayerFee: [mockExcludeAddress],
      },
    },
    logLevel: "info",
    redis: { host: "localhost", port: 6379 },
    server: {
      adminToken: "foo",
      pub: {
        port: 3001,
        host: "0.0.0.0",
      },
      sub: {
        port: 3000,
        host: "0.0.0.0",
      },
      http: {
        port: 3002,
        host: "0.0.0.0",
      },
    },
    network: "testnet",
    auctionWaitTime: 1_000,
    executionWaitTime: 300_000,
    auctionRoundDepth: 4,
    mode: {
      cleanup: false,
    },
    supportedVersion: "0.0.1",
    environment: "staging",
    messageQueue: {
      connection: {
        uri: "amqp://guest:guest@localhost:5672",
      },
      exchanges: [{ name: "sequencerX", type: "direct", publishTimeout: 1000, persistent: true, durable: true }],
      queues: [{ name: mock.chain.A, limit: 5, queueLimit: 10000, subscribe: true }],
      bindings: [{ exchange: "sequencerX", target: mock.chain.A, keys: [mock.chain.A] }],
      executerTimeout: 300000,
      publisher: "sequencerX",
      subscriber: mock.chain.A,
    },
    relayers: [
      {
        type: "Connext",
        apiKey: "foo",
        url: "http://example.com",
      },
    ],
    relayerFeeTolerance: 20,
    database: {
      url: "http://example.com",
    },
    executer: {
      batchSize: 100,
      maxChildCount: 5,
      waitPeriod: 3000,
    },
  }),
  adapters: {
    cache: (): SinonStubbedInstance<StoreManager> => {
      const cache = createStubInstance(StoreManager);
      const auctions = createStubInstance(AuctionsCache);
      const routers = createStubInstance(RoutersCache);
      // NOTE: if this override doesn't work, we should resort to just making a mock object with
      // these caches as properties.
      (cache as any).auctions = auctions;
      (cache as any).routers = routers;
      return cache;
    },
    subgraph: (): SinonStubbedInstance<SubgraphReader> => {
      const subgraph = createStubInstance(SubgraphReader);
      subgraph.getDestinationXCalls.resolves([]);
      return subgraph;
    },
    chainreader: (): SinonStubbedInstance<ChainReader> => {
      const chainreader = createStubInstance(ChainReader);
      chainreader.getBalance.resolves(utils.parseEther("1"));

      chainreader.getDecimalsForAsset.resolves(18);
      chainreader.getBlockTime.resolves(Math.floor(Date.now() / 1000));
      chainreader.getTokenPrice.resolves(BigNumber.from(1));
      chainreader.getGasEstimate.resolves(BigNumber.from(24001));

      const mockReceipt = mock.ethers.receipt();
      chainreader.getTransactionReceipt.resolves(mockReceipt);
      return chainreader;
    },
    contracts: (): SinonStubbedInstance<ConnextContractInterfaces> => {
      const encodedDataMock = "0xabcde";

      const connext = createStubInstance(utils.Interface);
      connext.encodeFunctionData.returns(encodedDataMock);
      connext.decodeFunctionResult.returns([BigNumber.from(1000)]);
      connext.decodeFunctionData.returns([BigNumber.from(1000)]);

      const genericStubInterface = createStubInstance(utils.Interface);
      genericStubInterface.encodeFunctionData.returns(encodedDataMock);
      genericStubInterface.decodeFunctionResult.returns([BigNumber.from(1000)]);

      return {
        connext: connext as unknown as ConnextInterface,
        erc20: genericStubInterface as any,
        priceOracle: genericStubInterface as unknown as ConnextPriceOracleInterface,
        stableSwap: genericStubInterface as unknown as StableSwapInterface,
        rootManager: genericStubInterface as any,
        relayerProxy: genericStubInterface as any,
        relayerProxyHub: genericStubInterface as any,
        spokeConnector: genericStubInterface as any,
        multisend: genericStubInterface as any,
        unwrapper: genericStubInterface as any,
      };
    },
    relayers: () => [
      {
        instance: mockRelayer(),
        apiKey: "foo",
        url: "http://localhost:8080",
        type: RelayerType.Connext,
      },
    ],
    database: () => mockDatabase(),
    mqClient: () => {
      return {
        close: stub() as any,
        createChannel: () => {
          return {
            assertExchange: stub(),
            publish: stub(),
            prefetch: stub(),
            close: stub(),
          };
        },
      };
    },
  },
  helpers: {
    relayer: {
      gelatoSend: stub(),
      isChainSupportedByGelato: stub(),
    },
    auctions: {
      encodeExecuteFromBids: stub(),
      getDestinationLocalAsset: stub(),
    },
  },
  operations: {
    auctions: {
      storeFastPathData: stub(),
      executeFastPathData: stub(),
    },
    relayer: {
      sendExecuteFastToRelayer: stub(),
    },
  },
};
