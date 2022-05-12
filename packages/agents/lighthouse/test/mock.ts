import { utils, BigNumber, Wallet, constants } from "ethers";
import { createStubInstance, SinonStub, SinonStubbedInstance, stub } from "sinon";
import { ConnextContractDeployments, ConnextContractInterfaces, ChainReader } from "@connext/nxtp-txservice";
import { mkAddress, Logger, mock as _mock, mkBytes32 } from "@connext/nxtp-utils";

import { NxtpLighthouseConfig } from "../src/config";
import { AppContext } from "../src/lib/entities/context";
// Used for stubbing functions at the bottom of this file:
import * as router from "../src/lighthouse";
import * as helpers from "../src/lib/helpers";
import * as operations from "../src/lib/operations";

export const mockTaskId = mkBytes32("0xabcdef123");
export const mockRelayerAddress = mkAddress("0xabcdef123");

export const mock = {
  ..._mock,
  context: (): AppContext => {
    return {
      logger: new Logger({ name: "mock", level: process.env.LOG_LEVEL || "silent" }),
      adapters: {
        chainreader: mock.adapters.chainreader(),
        contracts: mock.adapters.contracts(),
        relayer: mock.adapters.relayer(),
      },
      config: mock.config(),
      chainData: mock.chainData(),
    };
  },
  config: (): NxtpLighthouseConfig => ({
    chains: {
      [mock.chain.A]: {
        confirmations: 1,
        providers: ["http://example.com"],
        deployments: {
          connext: mkAddress("0xabcdef123"),
        },
      },
      [mock.chain.B]: {
        confirmations: 1,
        providers: ["http://example.com"],
        deployments: {
          connext: mkAddress("0xabcdef123"),
        },
      },
    },
    logLevel: "info",
    network: "testnet",
    backendUrl: "https://postgrest.testnet.staging.connext.ninja",
    mode: {
      diagnostic: false,
      cleanup: false,
    },
    polling: {
      backend: 10_000,
    },
    environment: "staging",
  }),
  adapters: {
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

      const erc20 = createStubInstance(utils.Interface);
      erc20.encodeFunctionData.returns(encodedDataMock);
      erc20.decodeFunctionResult.returns([BigNumber.from(1000)]);

      return {
        erc20: erc20 as any,
        connext: connext as unknown as ConnextInterface,
        priceOracle: priceOracle as unknown as ConnextPriceOracleInterface,
        tokenRegistry: tokenRegistry as unknown as TokenRegistryInterface,
        stableSwap: stableSwap as unknown as StableSwapInterface,
      };
    },
    relayer: () => {
      return {
        getRelayerAddress: stub().resolves(mockRelayerAddress),
        send: stub().resolves(mockTaskId),
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
      signRouterPathPayload: stub(),
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
