import { utils, BigNumber, Wallet, constants } from "ethers";
import { createStubInstance, SinonStub, SinonStubbedInstance, stub } from "sinon";
import { AuctionsCache, TransfersCache } from "@connext/nxtp-adapters-cache";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { ConnextContractDeployments, ConnextContractInterfaces, TransactionService } from "@connext/nxtp-txservice";
import { mkAddress, Logger, mock as _mock } from "@connext/nxtp-utils";

import { NxtpRouterConfig } from "../src/config";
import { AppContext } from "../src/lib/entities/context";
// Used for stubbing functions at the bottom of this file:
import * as router from "../src/router";
import * as helpers from "../src/lib/helpers";
import * as operations from "../src/lib/operations";

export const mock = {
  ..._mock,
  context: (): AppContext => {
    return {
      adapters: {
        wallet: mock.adapters.wallet(),
        subgraph: mock.adapters.subgraph(),
        cache: mock.adapters.cache(),
        txservice: mock.adapters.txservice(),
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
        assets: [mock.asset.A],
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
        gasStations: [],
      },
      [mock.chain.B]: {
        assets: [mock.asset.A],
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
        gasStations: [],
      },
    },
    mnemonic: "hello world",
    logLevel: "info",
    redis: { port: 6379, host: "localhost" },
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
      subgraph.getTransactionsWithStatuses.resolves([]);
      subgraph.isRouterApproved.resolves(true);
      subgraph.getAssetBalance.resolves(constants.MaxUint256);
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
        connext: connext as unknown as ConnextContractInterfaces["connext"],
        priceOracle: priceOracle as unknown as ConnextContractInterfaces["priceOracle"],
        tokenRegistry: tokenRegistry as unknown as ConnextContractInterfaces["tokenRegistry"],
        stableSwap: stableSwap as unknown as ConnextContractInterfaces["stableSwap"],
      };
    },
    deployments: (): ConnextContractDeployments => {
      return {
        connext: (_: number) => ({
          address: mkAddress("0xbadcab"),
          abi: {},
        }),
        priceOracle: (_: number) => ({ address: mkAddress("0xbaddad"), abi: {} }),
      };
    },
  },
  helpers: {
    auctions: {
      getAuctionStatus: stub(),
      sendBid: stub(),
    },
    execute: {
      sanityCheck: stub(),
    },
    shared: {
      getDestinationLocalAsset: stub(),
      getTransactionId: stub(),
      signHandleRelayerFeePayload: stub(),
    },
  },
  operations: {
    execute: stub(),
  },
};

export let mockContext: any;
export let getContextStub: SinonStub;
// Stub getContext to return the mock context above.
export const stubContext = (_context?: AppContext) => {
  mockContext = _context ?? mock.context();
  try {
    getContextStub.restore();
  } catch (e) {}
  try {
    getContextStub = stub(router, "getContext").callsFake(() => {
      return mockContext;
    });
  } catch (e) {}
  return mockContext;
};

let getHelpersStub: SinonStub;
export const stubHelpers = () => {
  try {
    getHelpersStub.restore();
  } catch (e) {}
  try {
    getHelpersStub = stub(helpers, "getHelpers").returns(mock.helpers);
  } catch (e) {}
  return getHelpersStub;
};

let getOperationsStub: SinonStub;
export const stubOperations = () => {
  try {
    getOperationsStub.restore();
  } catch (e) {}
  try {
    getOperationsStub = stub(operations, "getOperations").returns(mock.operations);
  } catch (e) {}
  return getOperationsStub;
};
