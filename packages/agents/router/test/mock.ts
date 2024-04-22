import { utils, BigNumber, Wallet, constants } from "ethers";
import { createStubInstance, SinonStubbedInstance, stub } from "sinon";
import { AuctionsCache, TransfersCache } from "@connext/nxtp-adapters-cache";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import {
  ChainReader,
  ConnextContractDeployments,
  ConnextContractInterfaces,
  TransactionService,
} from "@connext/nxtp-txservice";
import { mkAddress, Logger, mock as _mock, OriginTransfer } from "@connext/nxtp-utils";

import { AppContext as PublisherAppContext } from "../src/tasks/publisher/context";
import { AppContext as SubscriberAppContext } from "../src/tasks/subscriber/context";
import { AppContext as ExecutorAppContext } from "../src/tasks/executor/context";
import { NxtpRouterConfig } from "../src/config";

export const mock = {
  ..._mock,
  publisherContext: (): PublisherAppContext => {
    return {
      adapters: {
        wallet: mock.adapters.wallet(),
        subgraph: mock.adapters.subgraph(),
        cache: mock.adapters.cache(),
        mqClient: mock.adapters.mqClient() as any,
      },
      config: mock.config(),
      chainData: mock.chainData(),
      routerAddress: mock.address.router,
      logger: new Logger({ name: "mock", level: process.env.LOG_LEVEL || "silent" }),
    };
  },
  subscriberContext: (): SubscriberAppContext => {
    return {
      adapters: {
        wallet: mock.adapters.wallet(),
        subgraph: mock.adapters.subgraph(),
        txservice: mock.adapters.txservice(),
        contracts: mock.contracts.interfaces(),
        mqClient: mock.adapters.mqClient() as any,
      },
      config: mock.config(),
      chainData: mock.chainData(),
      routerAddress: mock.address.router,
      logger: new Logger({ name: "mock", level: process.env.LOG_LEVEL || "silent" }),
    };
  },
  executorContext: (): ExecutorAppContext => {
    return {
      adapters: {
        wallet: mock.adapters.wallet(),
        chainreader: mock.adapters.chainreader(),
        contracts: mock.contracts.interfaces(),
      },
      config: mock.config(),
      chainData: mock.chainData(),
      logger: new Logger({ name: "mock", level: process.env.LOG_LEVEL || "silent" }),
    };
  },
  config: (): NxtpRouterConfig => ({
    chains: {
      [mock.domain.A]: {
        assets: [mock.asset.A],
        confirmations: 1,
        providers: ["http://example.com"],
        deployments: {
          connext: mkAddress("0xabcdef123"),
          relayerProxy: mkAddress("0xabcdef123"),
        },
        gasStations: [],
      },
      [mock.domain.B]: {
        assets: [mock.asset.A],
        confirmations: 1,
        providers: ["http://example.com"],
        deployments: {
          connext: mkAddress("0xabcdef123"),
          relayerProxy: mkAddress("0xabcdef123"),
        },
        gasStations: [],
      },
    },
    mnemonic: "hello world",
    logLevel: "info",
    redis: { port: 6379, host: "localhost" },
    sequencerUrl: "http://localhost:8081",
    cartographerUrl: "http://localhost:3000",
    server: {
      exec: { host: "0.0.0.0", port: 8080 },
      pub: {
        host: "0.0.0.0",
        port: 3001,
      },
      sub: {
        host: "0.0.0.0",
        port: 3000,
      },
      requestLimit: 2000,
      adminToken: "blahblahblah",
    },
    network: "testnet",
    slippage: 10000,
    mode: {
      diagnostic: false,
      cleanup: false,
      priceCaching: false,
    },
    polling: {
      subgraph: 10_000,
      cache: 10_000,
      cartographer: 10_000,
    },
    auctionRoundDepth: 4,
    environment: "staging",
    messageQueue: {},
  }),
  bridgeContext: (): any => {
    return {
      checkHomes: stub().resolves(),
      blacklist: stub().returns(new Set()),
    };
  },
  adapters: {
    wallet: (): SinonStubbedInstance<Wallet> => {
      const wallet = createStubInstance(Wallet);
      // need to do this differently bc the function doesn't exist on the interface
      (wallet as any).address = mock.address.router;
      wallet.getAddress.resolves(mock.address.router);
      wallet.signMessage.resolves(mock.signature);
      return wallet;
    },
    cache: (): any => {
      const transfers = createStubInstance(TransfersCache);
      const auctions = createStubInstance(AuctionsCache);
      transfers.getLatestNonce.resolves(0);
      transfers.addMissingNonces.resolves();
      return {
        transfers,
        auctions,
      };
    },
    subgraph: (): SinonStubbedInstance<SubgraphReader> => {
      const subgraph = createStubInstance(SubgraphReader);
      subgraph.getDestinationXCalls.resolves([]);
      subgraph.getOriginXCalls.resolves({
        allTxById: new Map(),
        latestNonces: new Map(),
        txIdsByDestinationDomain: new Map(),
      });
      subgraph.getOriginTransferById.resolves(mock.entity.xtransfer() as OriginTransfer);
      subgraph.getDestinationTransfers.resolves([]);
      subgraph.isRouterApproved.resolves(true);
      subgraph.getAssetBalance.resolves(constants.MaxUint256);
      return subgraph;
    },
    txservice: (): SinonStubbedInstance<TransactionService> => {
      const txservice = createStubInstance(TransactionService);
      txservice.getBalance.resolves(utils.parseEther("1"));

      txservice.getDecimalsForAsset.resolves(18);
      txservice.getBlockTime.resolves(Math.floor(Date.now() / 1000));
      txservice.getTokenPrice.resolves(BigNumber.from(1));
      txservice.getGasEstimate.resolves(BigNumber.from(24001));
      txservice.getCode.resolves("0x");

      const mockReceipt = mock.ethers.receipt();
      txservice.sendTx.resolves(mockReceipt);
      txservice.getTransactionReceipt.resolves(mockReceipt);
      return txservice;
    },
    chainreader: (): SinonStubbedInstance<ChainReader> => {
      const chainReader = createStubInstance(ChainReader);
      chainReader.getGasEstimate.resolves(utils.parseUnits("1", 9));
      chainReader.getGasEstimateWithRevertCode.resolves(utils.parseUnits("1", 9));
      return chainReader;
    },
    mqClient: () => {
      return {
        publish: stub(),
        startSubscription: stub(),
        stopSubscription: stub(),
        handle: stub() as any,
      };
    },
  },
  contracts: {
    interfaces: (): SinonStubbedInstance<ConnextContractInterfaces> => {
      const encodedDataMock = "0xabcde";

      const connext = createStubInstance(utils.Interface);
      connext.encodeFunctionData.returns(encodedDataMock);
      connext.decodeFunctionResult.returns([BigNumber.from(1000)]);

      const relayerProxy = createStubInstance(utils.Interface);
      relayerProxy.encodeFunctionData.returns(encodedDataMock);
      relayerProxy.decodeFunctionResult.returns([BigNumber.from(1000)]);

      const priceOracle = createStubInstance(utils.Interface);
      priceOracle.encodeFunctionData.returns(encodedDataMock);
      priceOracle.decodeFunctionResult.returns([BigNumber.from(1000)]);

      const stableSwap = createStubInstance(utils.Interface);
      stableSwap.encodeFunctionData.returns(encodedDataMock);
      stableSwap.decodeFunctionResult.returns([BigNumber.from(1000)]);

      const erc20 = createStubInstance(utils.Interface);
      erc20.encodeFunctionData.returns(encodedDataMock);
      erc20.decodeFunctionResult.returns([BigNumber.from(1000)]);

      const spokeConnector = createStubInstance(utils.Interface);
      erc20.encodeFunctionData.returns(encodedDataMock);
      erc20.decodeFunctionResult.returns([BigNumber.from(1000)]);

      const rootManagerPropagateWrapper = createStubInstance(utils.Interface);
      erc20.encodeFunctionData.returns(encodedDataMock);
      erc20.decodeFunctionResult.returns([BigNumber.from(1000)]);

      return {
        erc20: erc20 as any,
        connext: connext as unknown as ConnextContractInterfaces["connext"],
        relayerProxy: relayerProxy as unknown as ConnextContractInterfaces["relayerProxy"],
        priceOracle: priceOracle as unknown as ConnextContractInterfaces["priceOracle"],
        stableSwap: stableSwap as unknown as ConnextContractInterfaces["stableSwap"],
        erc20Extended: erc20 as unknown as ConnextContractInterfaces["erc20Extended"],
        spokeConnector: spokeConnector as unknown as ConnextContractInterfaces["spokeConnector"],
        rootManagerPropagateWrapper:
          rootManagerPropagateWrapper as unknown as ConnextContractInterfaces["rootManagerPropagateWrapper"],
      };
    },
    deployments: (): ConnextContractDeployments => {
      return {
        connext: (_: number) => ({
          address: mkAddress("0xbadcab"),
          abi: {},
        }),
        relayerProxy: (_: number) => ({
          address: mkAddress("0xbadcab"),
          abi: {},
        }),
        priceOracle: (_: number) => ({ address: mkAddress("0xbaddad"), abi: {} }),
        stableSwap: (_: number) => ({ address: mkAddress("0xbbbddd"), abi: {} }),
        hubConnector: (_: number) => ({ address: mkAddress("0xbbbddd"), abi: {} }),
        spokeConnector: (_: number) => ({ address: mkAddress("0xbbbddd"), abi: {} }),
        rootManagerPropagateWrapper: (_: number) => ({ address: mkAddress("0xbbbddd"), abi: {} }),
      };
    },
  },
};
