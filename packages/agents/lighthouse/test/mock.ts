import { utils, BigNumber, Wallet } from "ethers";
import { createStubInstance, SinonStubbedInstance, stub } from "sinon";
import { ChainReader, ConnextContractDeployments, ConnextContractInterfaces } from "@connext/nxtp-txservice";
import {
  mkAddress,
  Logger,
  mock as _mock,
  mkBytes32,
  createLoggingContext,
  XMessage,
  RootMessage,
  RelayerType,
  ReceivedAggregateRoot,
  ModeType,
} from "@connext/nxtp-utils";
import { Relayer } from "@connext/nxtp-adapters-relayer";
import { mockRelayer } from "@connext/nxtp-adapters-relayer/test/mock";
import { mockDatabase, mockDatabasePool } from "@connext/nxtp-adapters-database/test/mock";
import { mockChainReader } from "@connext/nxtp-txservice/test/mock";

import { NxtpLighthouseConfig } from "../src/config";
import { ProverContext } from "../src/tasks/prover/context";
import { ProcessFromRootContext } from "../src/tasks/processFromRoot/context";
import { PropagateContext } from "../src/tasks/propagate/context";
import { mockSubgraph } from "@connext/nxtp-adapters-subgraph/test/mock";
import { SendOutboundRootContext } from "../src/tasks/sendOutboundRoot/context";
import { ProposeContext } from "../src/tasks/propose/context";

export const mockTaskId = mkBytes32("0xabcdef123");
export const mockRelayerAddress = mkAddress("0xabcdef123");
export const encodedDataMock = "0xabcde";
export const requestContext = createLoggingContext("LIGHTHOUSE-TEST").requestContext;

export const mockXMessage1: XMessage = { ..._mock.entity.xMessage(), transferId: mkBytes32("0xabc") };
export const mockRootMessage: RootMessage = _mock.entity.rootMessage();
export const mockReceivedRoot: ReceivedAggregateRoot = _mock.entity.receivedAggregateRoot();

export const mockMqClient = () => {
  return {
    createChannel: () => {
      return {
        assertExchange: stub().resolves(),
        assertQueue: stub().resolves(),
        prefetch: stub().resolves(),
        publish: stub().resolves(),
        bindQueue: stub().resolves(),
        consume: stub().resolves(),
        close: stub().resolves(),
      };
    },
  };
};

export const mockCache = () => {
  return {
    messages: {
      getNonce: stub().resolves(1),
      setNonce: stub().resolves(),
      getLastBatchTime: stub().resolves(0),
      setLastBatchTime: stub().resolves(),
      storeMessages: stub().resolves(),
      getPending: stub().resolves(),
      getPendingTasks: stub().resolves(),
      addTaskPending: stub().resolves(),
      getMessage: stub().resolves(),
      setStatus: stub().resolves(),
      increaseAttempt: stub().resolves(),
      removePending: stub().resolves(),
      getNode: stub().resolves(),
      getNodes: stub().resolves(),
      putNode: stub().resolves(),
      delNode: stub().resolves(),
      putNodes: stub().resolves(),
      delNodes: stub().resolves(),
      getRoot: stub().resolves(),
      putRoot: stub().resolves(),
      delRoot: stub().resolves(),
      clearDomain: stub().resolves(),
      getCurrentLock: stub().resolves(),
      acquireLock: stub().resolves(),
      releaseLock: stub().resolves(),
    },
  };
};
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
        subgraph: mock.adapters.subgraph(),
        databaseWriter: { database: mock.adapters.database(), pool: mockDatabasePool() },
        cache: mockCache() as any,
        mqClient: mockMqClient() as any,
      },
      config: mock.config(),
      chainData: mock.chainData(),
      mode: ModeType.SlowMode,
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
        subgraph: mock.adapters.subgraph(),
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
        deployments: mock.adapters.deployments(),
        contracts: mock.adapters.contracts(),
        relayers: mock.adapters.relayers(),
        database: mock.adapters.database(),
        subgraph: mock.adapters.subgraph(),
        ambs: mock.adapters.ambs(),
      },
      config: mock.config(),
      chainData: mock.chainData(),
    };
  },
  sendOuboundRootCtx: (): SendOutboundRootContext => {
    return {
      logger: new Logger({ name: "mock", level: process.env.LOG_LEVEL || "silent" }),
      adapters: {
        chainreader: mock.adapters.chainreader() as unknown as ChainReader,
        deployments: mock.adapters.deployments(),
        contracts: mock.adapters.contracts(),
        relayers: mock.adapters.relayers(),
        subgraph: mock.adapters.subgraph(),
        ambs: mock.adapters.ambs(),
      },
      config: mock.config(),
      chainData: mock.chainData(),
    };
  },
  proposeCtx: (): ProposeContext => {
    return {
      logger: new Logger({ name: "mock", level: process.env.LOG_LEVEL || "silent" }),
      adapters: {
        chainreader: mock.adapters.chainreader() as unknown as ChainReader,
        deployments: mock.adapters.deployments(),
        contracts: mock.adapters.contracts(),
        relayers: mock.adapters.relayers(),
        database: mock.adapters.database(),
        subgraph: mock.adapters.subgraph(),
        ambs: mock.adapters.ambs(),
        wallet: mock.adapters.wallet(),
      },
      config: mock.config(),
      chainData: mock.chainData(),
    };
  },
  config: (): NxtpLighthouseConfig => ({
    snapshotDuration: mock.snapshotDuration,
    maxSafeRoots: mock.maxSafeRoots,
    chains: {
      [mock.domain.A]: {
        providers: ["http://example.com"],
        deployments: {
          connext: mkAddress("0xfedcba3234343434343"),
          spokeConnector: mkAddress("0xfedcba321"),
          spokeMerkleTree: mkAddress("0xfedcba321"),
          relayerProxy: mkAddress("0xfedcba321"),
        },
      },
      [mock.domain.B]: {
        providers: ["http://example.com"],
        deployments: {
          connext: mkAddress("0xfedcba3234343434343"),
          spokeConnector: mkAddress("0xfedcba321"),
          spokeMerkleTree: mkAddress("0xfedcba321"),
          relayerProxy: mkAddress("0xfedcba321"),
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
    databaseWriter: { url: "postgres://localhost:5432/lighthouse" },
    healthUrls: {},
    hubDomain: mock.domain.A,
    relayers: [
      {
        type: "Connext",
        url: "https://relayer-backup.com",
        apiKey: "foo",
      },
    ],
    proverBatchSize: {
      "1111": 10,
      "2222": 10,
    },
    proverBatchWaitTime: {
      "1111": 10,
      "2222": 10,
    },
    relayerWaitTime: 1000,
    service: "prover-pub",
    messageQueue: {
      connection: {
        uri: "amqp://guest:guest@localhost:5672",
      },
      exchange: {
        name: "proverX",
        type: "direct",
        publishTimeout: 1000,
        persistent: true,
        durable: true,
      },
    },
    server: {
      prover: {
        host: "0.0.0.0",
        port: 1000,
      },
      adminToken: "foo",
    },
    redis: {
      host: "127.0.0.1",
      port: 6397,
    },
  }),
  adapters: {
    chainreader: () => mockChainReader(),
    contracts: (): SinonStubbedInstance<ConnextContractInterfaces> => {
      const connext = createStubInstance(utils.Interface);
      connext.encodeFunctionData.returns(encodedDataMock);
      connext.decodeFunctionResult.returns([BigNumber.from(1000)]);

      const rootManager = createStubInstance(utils.Interface);
      rootManager.encodeFunctionData.returns(encodedDataMock);
      rootManager.decodeFunctionResult.returns([BigNumber.from(1000)]);

      const relayerProxy = createStubInstance(utils.Interface);
      relayerProxy.encodeFunctionData.returns(encodedDataMock);
      relayerProxy.decodeFunctionResult.returns([BigNumber.from(1000)]);

      const relayerProxyHub = createStubInstance(utils.Interface);
      relayerProxyHub.encodeFunctionData.returns(encodedDataMock);
      relayerProxyHub.decodeFunctionResult.returns([BigNumber.from(1000)]);

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
      spokeConnector.decodeFunctionData.returns([BigNumber.from(1000)]);

      const merkleTreeManager = createStubInstance(utils.Interface);
      spokeConnector.encodeFunctionData.returns(encodedDataMock);
      spokeConnector.decodeFunctionData.returns([BigNumber.from(1000)]);

      return {
        erc20: erc20 as unknown as ConnextContractInterfaces["erc20"],
        relayerProxy: relayerProxy as unknown as ConnextContractInterfaces["relayerProxy"],
        connext: connext as unknown as ConnextContractInterfaces["connext"],
        rootManager: rootManager as unknown as ConnextContractInterfaces["rootManager"],
        priceOracle: priceOracle as unknown as ConnextContractInterfaces["priceOracle"],
        stableSwap: stableSwap as unknown as ConnextContractInterfaces["stableSwap"],
        spokeConnector: spokeConnector as unknown as ConnextContractInterfaces["spokeConnector"],
        merkleTreeManager: merkleTreeManager as unknown as ConnextContractInterfaces["merkleTreeManager"],
        relayerProxyHub: createStubInstance(utils.Interface) as unknown as ConnextContractInterfaces["relayerProxyHub"],
        multisend: createStubInstance(utils.Interface) as unknown as ConnextContractInterfaces["multisend"],
        unwrapper: createStubInstance(utils.Interface) as unknown as ConnextContractInterfaces["unwrapper"],
      };
    },
    deployments: (): SinonStubbedInstance<ConnextContractDeployments> => {
      return {
        connext: stub().returns({ address: mkAddress("0xabc"), abi: [] }) as any,
        relayerProxy: stub().returns({ address: mkAddress("0xabc"), abi: [] }) as any,
        hubConnector: stub().returns({ address: mkAddress("0xabc"), abi: [] }) as any,
        priceOracle: stub().returns({ address: mkAddress("0xabc"), abi: [] }) as any,
        spokeConnector: stub().returns({ address: mkAddress("0xabc"), abi: [] }) as any,
        spokeMerkleTreeManager: stub().returns({ address: mkAddress("0xabc"), abi: [] }) as any,
        stableSwap: stub().returns({ address: mkAddress("0xabc"), abi: [] }) as any,
        multisend: stub().returns({ address: mkAddress("0xabc"), abi: [] }) as any,
        unwrapper: stub().returns({ address: mkAddress("0xabc"), abi: [] }) as any,
      };
    },
    relayers: () => [
      { instance: mockRelayer(), type: RelayerType.Mock, apiKey: "foo" } as {
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
    wallet: (): SinonStubbedInstance<Wallet> => {
      const wallet = createStubInstance(Wallet);
      // need to do this differently bc the function doesnt exist on the interface
      (wallet as any).address = mock.address.router;
      wallet.getAddress.resolves(mock.address.router);
      wallet.signMessage.resolves(mock.signature);
      return wallet;
    },
  },
  contracts: {
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
        stableSwap: (_: number) => ({ address: mkAddress("0xbbbdddf"), abi: {} }),
        spokeMerkleTreeManager: (_: number) => ({ address: mkAddress("bbbcccdddaaa"), abi: {} }),
        spokeConnector: (_: number) => ({ address: mkAddress("0xbbbddda"), abi: {} }),
        hubConnector: (_: number) => ({ address: mkAddress("0xbbbdddb"), abi: {} }),
        multisend: (_: number) => ({ address: mkAddress("0xbbbdddc"), abi: {} }),
        unwrapper: (_: number) => ({ address: mkAddress("0xbbbdddd"), abi: {} }),
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
