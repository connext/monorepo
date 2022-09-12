import { utils, BigNumber } from "ethers";
import { createStubInstance, SinonStubbedInstance, stub } from "sinon";
import { ConnextContractDeployments, ConnextContractInterfaces, ChainReader } from "@connext/nxtp-txservice";
import { mkAddress, Logger, mock as _mock, mkBytes32, createLoggingContext, XMessage } from "@connext/nxtp-utils";

import { NxtpLighthouseConfig } from "../src/config";
import { ProverContext } from "../src/tasks/prover/context";
import { Cartographer } from "../src/tasks/prover/adapters";

export const mockTaskId = mkBytes32("0xabcdef123");
export const mockRelayerAddress = mkAddress("0xabcdef123");
export const encodedDataMock = "0xabcde";
export const requestContext = createLoggingContext("LIGHTHOUSE-TEST").requestContext;

export const mockXMessage1: XMessage = {
  originDomain: _mock.domain.A,
  destinationDomain: _mock.domain.B,
  leaf: mkBytes32("0xabcde"),
  origin: { index: 42, message: mkBytes32("0xabc"), root: mkBytes32("0x123") },
  transferId: mkBytes32("0xabc"),
};

export const mockXMessage2: XMessage = {
  originDomain: _mock.domain.B,
  destinationDomain: _mock.domain.A,
  leaf: mkBytes32("0xedcba"),
  origin: { index: 24, message: mkBytes32("0xcba"), root: mkBytes32("0x321") },
  transferId: mkBytes32("0xabcdef"),
};

export const mock = {
  ..._mock,
  context: (): ProverContext => {
    return {
      logger: new Logger({ name: "mock", level: process.env.LOG_LEVEL || "silent" }),
      adapters: {
        chainreader: mock.adapters.chainreader(),
        contracts: mock.adapters.contracts(),
        relayer: mock.adapters.relayer(),
        cartographer: mock.adapters.cartographer(),
      },
      config: mock.config(),
      chainData: mock.chainData(),
    };
  },
  config: (): NxtpLighthouseConfig => ({
    chains: {
      [mock.domain.A]: {
        providers: ["http://example.com"],
        deployments: {
          spokeConnector: mkAddress("0xfedcba321"),
        },
      },
      [mock.domain.B]: {
        providers: ["http://example.com"],
        deployments: {
          spokeConnector: mkAddress("0xfedcba321"),
        },
      },
    },
    logLevel: "info",
    network: "testnet",
    cartographerUrl: "https://postgrest.testnet.staging.connext.ninja",
    mode: {
      diagnostic: false,
      cleanup: false,
    },
    polling: {
      cartographer: 10_000,
    },
    environment: "staging",
    relayerUrl: "http://www.example.com",
  }),
  adapters: {
    chainreader: (): SinonStubbedInstance<ChainReader> => {
      const chainreader = createStubInstance(ChainReader);
      chainreader.getBalance.resolves(utils.parseEther("1"));

      chainreader.getDecimalsForAsset.resolves(18);
      chainreader.getBlockTime.resolves(Math.floor(Date.now() / 1000));
      chainreader.getTokenPrice.resolves(BigNumber.from(1));
      chainreader.getGasEstimate.resolves(BigNumber.from(24001));
      chainreader.getGasEstimateWithRevertCode.resolves(BigNumber.from(1));

      const mockReceipt = mock.ethers.receipt();
      chainreader.getTransactionReceipt.resolves(mockReceipt);
      return chainreader;
    },
    contracts: (): SinonStubbedInstance<ConnextContractInterfaces> => {
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

      const spokeConnector = createStubInstance(utils.Interface);
      spokeConnector.encodeFunctionData.returns(encodedDataMock);
      spokeConnector.decodeFunctionResult.returns([BigNumber.from(1000)]);

      return {
        erc20: erc20 as unknown as ConnextContractInterfaces["erc20"],
        erc20Extended: erc20 as unknown as ConnextContractInterfaces["erc20Extended"],
        connext: connext as unknown as ConnextContractInterfaces["connext"],
        priceOracle: priceOracle as unknown as ConnextContractInterfaces["priceOracle"],
        tokenRegistry: tokenRegistry as unknown as ConnextContractInterfaces["tokenRegistry"],
        stableSwap: stableSwap as unknown as ConnextContractInterfaces["stableSwap"],
        spokeConnector: spokeConnector as unknown as ConnextContractInterfaces["spokeConnector"],
      };
    },
    relayer: () => {
      return {
        getRelayerAddress: stub().resolves(mockRelayerAddress),
        send: stub().resolves(mockTaskId),
      };
    },
    cartographer: (): Cartographer => {
      return { getUnProcessedMessages: stub().resolves([mockXMessage1, mockXMessage2]) };
    },
  },
  contracts: {
    deployments: (): ConnextContractDeployments => {
      return {
        connext: (_: number) => ({
          address: mkAddress("0xbadcab"),
          abi: {},
        }),
        priceOracle: (_: number) => ({ address: mkAddress("0xbaddad"), abi: {} }),
        tokenRegistry: (_: number) => ({ address: mkAddress("0xbbbddde"), abi: {} }),
        stableSwap: (_: number) => ({ address: mkAddress("0xbbbdddf"), abi: {} }),
        spokeConnector: (_: number) => ({ address: mkAddress("0xbbbddda"), abi: {} }),
      };
    },
  },
  helpers: {
    relayer: {
      gelatoSend: stub(),
      isChainSupportedByGelato: stub(),
      getGelatoRelayerAddress: stub(),
    },
    shared: {
      existsSync: stub(),
      readFileSync: stub(),
    },
  },
  operations: {
    execute: stub(),
    sendExecuteFastToRelayer: stub(),
    pollCartographer: stub(),
  },
};
