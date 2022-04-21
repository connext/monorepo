import { utils, BigNumber } from "ethers";
import { createStubInstance, SinonStubbedInstance, stub } from "sinon";
import { AuctionsCache, StoreManager, TransfersCache } from "@connext/nxtp-adapters-cache";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { ChainReader, ConnextContractInterfaces } from "@connext/nxtp-txservice";
import { mkAddress, Logger, mock as _mock } from "@connext/nxtp-utils";
import { ConnextInterface } from "@connext/nxtp-contracts/typechain-types/Connext";
import { ConnextPriceOracleInterface } from "@connext/nxtp-contracts/typechain-types/ConnextPriceOracle";
import { TokenRegistryInterface } from "@connext/nxtp-contracts/typechain-types/TokenRegistry";
import { StableSwapInterface } from "@connext/nxtp-contracts/typechain-types/StableSwap";

import { SequencerConfig } from "../src/lib/entities";
import { AppContext } from "../src/lib/entities/context";

export const mock = {
  ..._mock,
  context: (): AppContext => {
    return {
      adapters: {
        subgraph: mock.adapters.subgraph(),
        cache: mock.adapters.cache(),
        chainreader: mock.adapters.chainreader(),
        contracts: mock.adapters.contracts(),
      },
      config: mock.config(),
      chainData: mock.chainData(),
      logger: new Logger({ name: "mock", level: process.env.LOG_LEVEL || "silent" }),
    };
  },
  config: (): SequencerConfig => ({
    chains: {
      [mock.chain.A]: {
        confirmations: 1,
        providers: ["http://example.com"],
        subgraph: {
          runtime: [{ query: "http://example.com", health: "http://example.com" }],
          analytics: [{ query: "http://example.com", health: "http://example.com" }],
          maxLag: 10,
        },
        deployments: {
          connext: mkAddress("0xabcdef123"),
        },
      },
      [mock.chain.B]: {
        confirmations: 1,
        providers: ["http://example.com"],
        subgraph: {
          runtime: [{ query: "http://example.com", health: "http://example.com" }],
          analytics: [{ query: "http://example.com", health: "http://example.com" }],
          maxLag: 10,
        },
        deployments: {
          connext: mkAddress("0xabcdef123"),
        },
      },
    },
    logLevel: "info",
    redis: { host: "localhost", port: 6379 },
    server: {
      adminToken: "foo",
      port: 3000,
      host: "0.0.0.0",
    },
    network: "testnet",
    auctionWaitTime: 1_000,
    mode: {
      cleanup: false,
    },
  }),
  adapters: {
    cache: (): SinonStubbedInstance<StoreManager> => {
      const cache = createStubInstance(StoreManager);
      const transactions = createStubInstance(TransfersCache);
      const auctions = createStubInstance(AuctionsCache);
      // NOTE: if this override doesn't work, we should resort to just making a mock object with
      // these caches as properties.
      (cache as any).transactions = transactions;
      (cache as any).auctions = auctions;
      transactions.getLatestNonce.resolves(0);
      return cache;
    },
    subgraph: (): SinonStubbedInstance<SubgraphReader> => {
      const subgraph = createStubInstance(SubgraphReader);
      subgraph.getXCalls.resolves([]);
      subgraph.getTransactionsWithStatuses.resolves([]);
      return subgraph;
    },
    chainreader: (): SinonStubbedInstance<ChainReader> => {
      const chainreader = createStubInstance(ChainReader);
      chainreader.getBalance.resolves(utils.parseEther("1"));

      chainreader.getDecimalsForAsset.resolves(18);
      chainreader.getBlockTime.resolves(Math.floor(Date.now() / 1000));
      chainreader.calculateGasFee.resolves(BigNumber.from(100));
      chainreader.calculateGasFeeInReceivingToken.resolves(BigNumber.from(100));
      chainreader.calculateGasFeeInReceivingTokenForFulfill.resolves(BigNumber.from(120));
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

      const priceOracle = createStubInstance(utils.Interface);
      priceOracle.encodeFunctionData.returns(encodedDataMock);
      priceOracle.decodeFunctionResult.returns([BigNumber.from(1000)]);

      const tokenRegistry = createStubInstance(utils.Interface);
      tokenRegistry.encodeFunctionData.returns(encodedDataMock);
      tokenRegistry.decodeFunctionResult.returns([BigNumber.from(1000)]);

      const stableSwap = createStubInstance(utils.Interface);
      stableSwap.encodeFunctionData.returns(encodedDataMock);
      stableSwap.decodeFunctionResult.returns([BigNumber.from(1000)]);

      return {
        connext: connext as unknown as ConnextInterface,
        priceOracle: priceOracle as unknown as ConnextPriceOracleInterface,
        tokenRegistry: tokenRegistry as unknown as TokenRegistryInterface,
        stableSwap: stableSwap as unknown as StableSwapInterface,
      };
    },
  },
  helpers: {
    relayer: {
      gelatoSend: stub(),
      isChainSupportedByGelato: stub(),
    },
    auctions: {
      encodeExecuteFromBid: stub(),
    },
  },
  operations: {
    auctions: {
      storeBid: stub(),
      executeAuctions: stub(),
    },
    relayer: {
      sendToRelayer: stub(),
    },
  },
};
