import { utils, BigNumber } from "ethers";
import { createStubInstance, SinonStubbedInstance, stub } from "sinon";
import { ChainReader, ConnextContractDeployments, ConnextContractInterfaces } from "@connext/nxtp-txservice";
import {
  mkAddress,
  Logger,
  mock as _mock,
  mkBytes32,
  createLoggingContext,
  XMessage,
  RelayerType,
} from "@connext/nxtp-utils";
import { Relayer } from "@connext/nxtp-adapters-relayer";
import { mockRelayer } from "@connext/nxtp-adapters-relayer/test/mock";
import { mockDatabase } from "@connext/nxtp-adapters-database/test/mock";
import { mockChainReader } from "@connext/nxtp-txservice/test/mock";

import { NxtpLighthouseConfig } from "../src/config";
import { ProverContext } from "../src/tasks/prover/context";
import { ProcessFromRootContext } from "../src/tasks/processFromRoot/context";
import { PropagateContext } from "../src/tasks/propagate/context";
import { mockSubgraph } from "@connext/nxtp-adapters-subgraph/test/mock";

export const mockTaskId = mkBytes32("0xabcdef123");
export const mockRelayerAddress = mkAddress("0xabcdef123");
export const encodedDataMock = "0xabcde";
export const requestContext = createLoggingContext("LIGHTHOUSE-TEST").requestContext;

export const mockXMessage1: XMessage = { ..._mock.entity.xMessage(), transferId: mkBytes32("0xabc") };

export const mockXMessage2: XMessage = {
  ..._mock.entity.xMessage(),
  originDomain: _mock.domain.B,
  destinationDomain: _mock.domain.A,
  transferId: mkBytes32("0xabcdef"),
};

export const mock = {
  ..._mock,
  proverCtx: (): ProverContext => {
    return {
      logger: new Logger({ name: "mock", level: process.env.LOG_LEVEL || "silent" }),
      adapters: {
        chainreader: mock.adapters.chainreader() as unknown as ChainReader,
        contracts: mock.adapters.contracts(),
        relayers: mock.adapters.relayers(),
        database: mock.adapters.database(),
      },
      config: mock.config(),
      chainData: mock.chainData(),
    };
  },
  processFromRootCtx: (): ProcessFromRootContext => {
    return {
      logger: new Logger({ name: "mock", level: process.env.LOG_LEVEL || "silent" }),
      adapters: {
        chainreader: mock.adapters.chainreader() as unknown as ChainReader,
        contracts: mock.adapters.deployments(),
        relayers: mock.adapters.relayers(),
        database: mock.adapters.database(),
      },
      config: mock.config(),
      chainData: mock.chainData(),
    };
  },
  propagateCtx: (): PropagateContext => {
    return {
      logger: new Logger({ name: "mock", level: process.env.LOG_LEVEL || "silent" }),
      adapters: {
        chainreader: mock.adapters.chainreader() as unknown as ChainReader,
        contracts: mock.adapters.deployments(),
        relayers: mock.adapters.relayers(),
        subgraph: mock.adapters.subgraph(),
        ambs: mock.adapters.ambs(),
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
    database: { url: "postgres://localhost:5432/lighthouse" },
    healthUrls: {},
    hubDomain: mock.domain.A,
    relayers: [
      {
        type: "Connext",
        url: "https://relayer-backup.com",
        apiKey: "foo",
      },
    ],
  }),
  adapters: {
    chainreader: () => mockChainReader(),
    contracts: (): SinonStubbedInstance<ConnextContractInterfaces> => {
      const connext = createStubInstance(utils.Interface);
      connext.encodeFunctionData.returns(encodedDataMock);
      connext.decodeFunctionResult.returns([BigNumber.from(1000)]);

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
      spokeConnector.encodeFunctionData.returns(encodedDataMock);
      spokeConnector.decodeFunctionResult.returns([BigNumber.from(1000)]);

      return {
        erc20: erc20 as unknown as ConnextContractInterfaces["erc20"],
        erc20Extended: erc20 as unknown as ConnextContractInterfaces["erc20Extended"],
        connext: connext as unknown as ConnextContractInterfaces["connext"],
        priceOracle: priceOracle as unknown as ConnextContractInterfaces["priceOracle"],
        stableSwap: stableSwap as unknown as ConnextContractInterfaces["stableSwap"],
        spokeConnector: spokeConnector as unknown as ConnextContractInterfaces["spokeConnector"],
      };
    },
    deployments: (): SinonStubbedInstance<ConnextContractDeployments> => {
      return {
        connext: stub().returns({ address: mkAddress("0xabc"), abi: [] }) as any,
        hubConnector: stub().returns({ address: mkAddress("0xabc"), abi: [] }) as any,
        priceOracle: stub().returns({ address: mkAddress("0xabc"), abi: [] }) as any,
        spokeConnector: stub().returns({ address: mkAddress("0xabc"), abi: [] }) as any,
        stableSwap: stub().returns({ address: mkAddress("0xabc"), abi: [] }) as any,
        rootManagerPropagateWrapper: stub().returns({ address: mkAddress("0xabc"), abi: [] }) as any,
      };
    },
    relayers: () => [
      { instance: mockRelayer(), type: "Mock", apiKey: "foo" } as {
        instance: Relayer;
        type: RelayerType;
        apiKey: string;
      },
    ],
    database: () => mockDatabase(),
    subgraph: () => mockSubgraph(),
    ambs: () => {
      return {
        optimism: [],
        gnosis: [],
        arbitrum: [],
        bnb: [],
      };
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
        stableSwap: (_: number) => ({ address: mkAddress("0xbbbdddf"), abi: {} }),
        spokeConnector: (_: number) => ({ address: mkAddress("0xbbbddda"), abi: {} }),
        hubConnector: (_: number) => ({ address: mkAddress("0xbbbdddb"), abi: {} }),
        rootManagerPropagateWrapper: (_: number) => ({ address: mkAddress("0xbbbdddc"), abi: {} }),
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
