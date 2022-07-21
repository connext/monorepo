import { utils, BigNumber, Wallet, constants } from "ethers";
import { createStubInstance, SinonStubbedInstance, stub } from "sinon";
import { AuctionsCache, TransfersCache } from "@connext/nxtp-adapters-cache";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { ConnextContractDeployments, ConnextContractInterfaces, TransactionService } from "@connext/nxtp-txservice";
import { mkAddress, Logger, mock as _mock } from "@connext/nxtp-utils";

import { AppContext as PublisherAppContext } from "../src/publisher/context";
import { AppContext as SubscriberAppContext } from "../src/subscriber/context";
import { NxtpRouterConfig } from "../src/config";

export const mock = {
  ..._mock,
  publisherContext: (): PublisherAppContext => {
    return {
      adapters: {
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
      bridgeContext: mock.bridgeContext(),
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
        },
        gasStations: [],
      },
      [mock.domain.B]: {
        assets: [mock.asset.A],
        confirmations: 1,
        providers: ["http://example.com"],
        deployments: {
          connext: mkAddress("0xabcdef123"),
        },
        gasStations: [],
      },
    },
    mnemonic: "hello world",
    logLevel: "info",
    redis: { port: 6379, host: "localhost" },
    sequencerUrl: "http://localhost:8081",
    server: {
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
    maxSlippage: 0,
    mode: {
      diagnostic: false,
      cleanup: false,
      priceCaching: false,
    },
    polling: {
      subgraph: 10_000,
      cache: 10_000,
    },
    auctionRoundDepth: 4,
    environment: "staging",
    nomadEnvironment: "staging",
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
      // need to do this differently bc the function doesnt exist on the interface
      (wallet as any).address = mock.address.router;
      wallet.getAddress.resolves(mock.address.router);
      wallet.signMessage.resolves(mock.signature);
      return wallet;
    },
    cache: (): any => {
      const transfers = createStubInstance(TransfersCache);
      const auctions = createStubInstance(AuctionsCache);
      transfers.getLatestNonce.resolves(0);
      return {
        transfers,
        auctions,
      };
    },
    subgraph: (): SinonStubbedInstance<SubgraphReader> => {
      const subgraph = createStubInstance(SubgraphReader);
      subgraph.getXCalls.resolves([]);
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

      const priceOracle = createStubInstance(utils.Interface);
      priceOracle.encodeFunctionData.returns(encodedDataMock);
      priceOracle.decodeFunctionResult.returns([BigNumber.from(1000)]);

      const tokenRegistry = createStubInstance(utils.Interface);
      tokenRegistry.encodeFunctionData.returns(encodedDataMock);
      tokenRegistry.decodeFunctionResult.returns([BigNumber.from(1000)]);

      const stableSwap = createStubInstance(utils.Interface);
      stableSwap.encodeFunctionData.returns(encodedDataMock);
      stableSwap.decodeFunctionResult.returns([BigNumber.from(1000)]);

      const erc20 = createStubInstance(utils.Interface);
      erc20.encodeFunctionData.returns(encodedDataMock);
      erc20.decodeFunctionResult.returns([BigNumber.from(1000)]);

      return {
        erc20: erc20 as any,
        connext: connext as unknown as ConnextContractInterfaces["connext"],
        priceOracle: priceOracle as unknown as ConnextContractInterfaces["priceOracle"],
        tokenRegistry: tokenRegistry as unknown as ConnextContractInterfaces["tokenRegistry"],
        stableSwap: stableSwap as unknown as ConnextContractInterfaces["stableSwap"],
        erc20Extended: erc20 as unknown as ConnextContractInterfaces["erc20Extended"],
      };
    },
    deployments: (): ConnextContractDeployments => {
      return {
        connext: (_: number) => ({
          address: mkAddress("0xbadcab"),
          abi: {},
        }),
        priceOracle: (_: number) => ({ address: mkAddress("0xbaddad"), abi: {} }),
        tokenRegistry: (_: number) => ({ address: mkAddress("0xbbbddd"), abi: {} }),
        stableSwap: (_: number) => ({ address: mkAddress("0xbbbddd"), abi: {} }),
      };
    },
  },
};
