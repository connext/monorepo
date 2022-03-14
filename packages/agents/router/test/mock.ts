import { utils, BigNumber, Wallet } from "ethers";
import { createStubInstance, SinonStubbedInstance } from "sinon";
import { AuctionsCache, StoreManager, TransactionsCache } from "@connext/nxtp-adapters-cache";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { ConnextContractDeployments, ConnextContractInterfaces, TransactionService } from "@connext/nxtp-txservice";
import { mkAddress, Logger, mock as _mock } from "@connext/nxtp-utils";
import { NxtpRouterConfig } from "../src/config";
import { AppContext } from "../src/lib/entities/context";

// export const MUTATED_AMOUNT = "100000000000000000000";
// export const MUTATED_BUFFER = 123400;
// export const BID_EXPIRY = 123401;

export const mock = {
  ..._mock,
  context: (): AppContext => {
    return {
      adapters: {
        wallet: mock.adapter.wallet(),
        subgraph: mock.adapter.subgraph(),
        cache: mock.adapter.cache(),
        txservice: mock.adapter.txservice(),
        contracts: mock.contracts.interfaces(),
      },
      config: mock.config(),
      chainData: mock.chainData(),
      routerAddress: mock.address.router,
      logger: new Logger({ name: "mock", level: process.env.LOG_LEVEL || "silent" }),
    };
  },
  config: (): NxtpRouterConfig => ({
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
  }),
  adapter: {
    wallet: (): SinonStubbedInstance<Wallet> => {
      const wallet = createStubInstance(Wallet);
      // need to do this differently bc the function doesnt exist on the interface
      (wallet as any).address = mock.address.router;
      wallet.getAddress.resolves(mock.address.router);
      wallet.signMessage.resolves(mock.signature);
      return wallet;
    },
    cache: (): SinonStubbedInstance<StoreManager> => {
      const cache = createStubInstance(StoreManager);
      const transactions = createStubInstance(TransactionsCache);
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
      subgraph.getPreparedTransactions.resolves([]);
      subgraph.getTransactionsWithStatuses.resolves([]);
      return subgraph;
    },
    txservice: (): SinonStubbedInstance<TransactionService> => {
      const txservice = createStubInstance(TransactionService);
      txservice.getBalance.resolves(utils.parseEther("1"));

      txservice.getDecimalsForAsset.resolves(18);
      txservice.getBlockTime.resolves(Math.floor(Date.now() / 1000));
      txservice.calculateGasFee.resolves(BigNumber.from(100));
      txservice.calculateGasFeeInReceivingToken.resolves(BigNumber.from(100));
      txservice.calculateGasFeeInReceivingTokenForFulfill.resolves(BigNumber.from(120));
      txservice.getTokenPrice.resolves(BigNumber.from(1));
      txservice.getGasEstimate.resolves(BigNumber.from(24001));

      const mockReceipt = mock.ethers.receipt();
      txservice.sendTx.resolves(mockReceipt);
      txservice.getTransactionReceipt.resolves(mockReceipt);
      return txservice;
    },
  },
  contracts: {
    interfaces: (): SinonStubbedInstance<ConnextContractInterfaces> => {
      const encodedDataMock = "0xabcde";

      const transactionManager = createStubInstance(utils.Interface);
      transactionManager.encodeFunctionData.returns(encodedDataMock);
      transactionManager.decodeFunctionResult.returns([BigNumber.from(1000)]);

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
        transactionManager: transactionManager as unknown as ConnextContractInterfaces["transactionManager"],
        priceOracle: priceOracle as unknown as ConnextContractInterfaces["priceOracle"],
        tokenRegistry: tokenRegistry as unknown as ConnextContractInterfaces["tokenRegistry"],
        stableSwap: stableSwap as unknown as ConnextContractInterfaces["stableSwap"],
      };
    },
    deployments: (): ConnextContractDeployments => {
      return {
        transactionManager: (_: number) => ({
          address: mkAddress("0xbadcab"),
          abi: {},
        }),
        priceOracle: (_: number) => ({ address: mkAddress("0xbaddad"), abi: {} }),
      };
    },
  },
};
