import Sinon, { stub, restore, reset, SinonStub } from "sinon";
import { chainDataToMap, expect, mkAddress } from "@connext/nxtp-utils";
import { getEnvConfig, getConfig } from "../src/config";
import * as ConfigFns from "../src/config";
import { mock } from "./mock";

describe("Config", () => {
  let testChainId = 1336;
  let testAddress = "0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
  let contractDeployment: any;

  beforeEach(() => {
    contractDeployment = {
      [String(testChainId)]: {
        test: {
          name: "test",
          chainId: testChainId,
          contracts: {
            TransactionManager: {
              address: testAddress,
              abi: ["fakeAbi()"],
            },
            ConnextPriceOracle: {
              address: testAddress,
              abi: ["fakeAbi()"],
            },
            Multicall: {
              address: testAddress,
              abi: ["fakeAbi()"],
            },
          },
        },
      },
    };
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("#getConfig", () => {
    let getEnvConfigStub: SinonStub;
    beforeEach(() => {
      getEnvConfigStub = stub(ConfigFns, "getEnvConfig");
    });
    it("should generate sequencer config from chainData in arguments", async () => {
      expect(() => getConfig(mock.chainData())).not.throw();
    });
    it("should generate sequencer config from external chainData", async () => {
      expect(() => getConfig(undefined)).not.throw();
    });
    it("should return sequencer config already created", async () => {
      stub(ConfigFns, "sequencerConfig").value(mock.config());
      await getConfig(mock.chainData());
      expect(getEnvConfigStub).callCount(0);
    });
  });

  describe("#getEnvConfig", () => {
    beforeEach(() => {
      stub(ConfigFns, "getDeployedTransactionManagerContract").returns({
        address: mkAddress("0xaaa"),
        abi: ["fakeAbi()"],
      });
    });
    afterEach(() => {
      restore();
      reset();
    });
    it("should read config from NXTP config with testnet network values overridden", () => {
      stub(process, "env").value({
        ...process.env,
        NXTP_NETWORK: "testnet",
        NXTP_CONFIG: JSON.stringify(mock.config()),
      });
      expect(() => getEnvConfig(mock.chainData())).not.throw();
    });
    it("should error if no config ", () => {
      stub(process, "env").value({
        ...process.env,
        NXTP_NETWORK: "testnet",
      });

      expect(() => getEnvConfig(mock.chainData())).throw();
    });
    it("should error if transaction manager address is missing", () => {
      stub(process, "env").value({
        ...process.env,
        NXTP_CONFIG_FILE: "buggypath",
        NXTP_NETWORK: "testnet",
        NXTP_CONFIG: JSON.stringify({
          ...mock.config(),
          chains: {
            [mock.chain.A]: { confirmations: 1, providers: ["http://example.com"] },
            [mock.chain.B]: { confirmations: 1, providers: ["http://example.com"] },
          },
        }),
      });
      const chainData = chainDataToMap([
        {
          name: "Unit Test Chain 1",
          chainId: parseInt(mock.chain.A),
          domainId: "2000",
          confirmations: 1,
          assetId: {},
        },
        {
          name: "Unit Test Chain 2",
          chainId: parseInt(mock.chain.B),
          domainId: "3000",
          confirmations: 1,
          assetId: {},
        },
      ]);
      expect(() => getEnvConfig(chainData)).throw("No transactionManager address for domain");
    });
    it("should read transactionManager from contract", () => {
      stub(process, "env").value({
        ...process.env,
        NXTP_CONFIG_FILE: "buggypath",
        NXTP_NETWORK: "testnet",
        NXTP_CONFIG: JSON.stringify({
          ...mock.config(),
          chains: {
            [mock.chain.A]: {
              confirmations: 1,
              providers: ["http://example.com"],
              deployments: {},
              subgraph: {
                runtime: ["http://example.com"],
                analytics: ["http://example.com"],
                maxLag: 10,
              },
            },
            [mock.chain.B]: {
              confirmations: 1,
              providers: ["http://example.com"],
              deployments: {},
              subgraph: {
                runtime: ["http://example.com"],
                analytics: ["http://example.com"],
                maxLag: 10,
              },
            },
          },
        }),
      });

      expect(() => getEnvConfig(mock.chainData())).not.throw();
    });
    it("should read runtime subgraph from chainData", () => {
      stub(process, "env").value({
        ...process.env,
        NXTP_CONFIG_FILE: "buggypath",
        NXTP_NETWORK: "testnet",
        NXTP_CONFIG: JSON.stringify({
          ...mock.config(),
          chains: {
            [mock.chain.A]: {
              confirmations: 1,
              providers: ["http://example.com"],
              deployments: {},
              subgraph: {
                analytics: ["http://example.com"],
                maxLag: 10,
              },
            },
            [mock.chain.B]: {
              confirmations: 1,
              providers: ["http://example.com"],
              deployments: {},
              subgraph: {
                analytics: ["http://example.com"],
                maxLag: 10,
              },
            },
          },
        }),
      });

      expect(() => getEnvConfig(mock.chainData())).not.throw();
    });
    it("should read analytics subgraph from chainData", () => {
      stub(process, "env").value({
        ...process.env,
        NXTP_CONFIG_FILE: "buggypath",
        NXTP_NETWORK: "testnet",
        NXTP_CONFIG: JSON.stringify({
          ...mock.config(),
          chains: {
            [mock.chain.A]: {
              confirmations: 1,
              providers: ["http://example.com"],
              deployments: {},
              subgraph: {
                runtime: ["http://example.com"],
                maxLag: 10,
              },
            },
            [mock.chain.B]: {
              confirmations: 1,
              providers: ["http://example.com"],
              deployments: {},
              subgraph: {
                runtime: ["http://example.com"],
                maxLag: 10,
              },
            },
          },
        }),
      });

      expect(() => getEnvConfig(mock.chainData())).not.throw();
    });
    it("should read recommended confirmations", () => {
      stub(process, "env").value({
        ...process.env,
        NXTP_CONFIG_FILE: "buggypath",
        NXTP_NETWORK: "testnet",
        NXTP_CONFIG: JSON.stringify({
          ...mock.config(),
          chains: {
            [mock.chain.A]: {
              providers: ["http://example.com"],
              deployments: {},
              subgraph: {
                runtime: ["http://example.com"],
                analytics: ["http://example.com"],
                maxLag: 10,
              },
            },
            [mock.chain.B]: {
              providers: ["http://example.com"],
              deployments: {},
              subgraph: {
                runtime: ["http://example.com"],
                analytics: ["http://example.com"],
                maxLag: 10,
              },
            },
          },
        }),
      });

      expect(() => getEnvConfig(mock.chainData())).not.throw();
    });
    it("should error if validation fails", () => {
      stub(process, "env").value({
        ...process.env,
        NXTP_CONFIG_FILE: "buggypath",
        NXTP_NETWORK: "testnet",
        NXTP_CONFIG: JSON.stringify({
          ...mock.config(),
          auctionWaitTime: "ABCDEF",
        }),
      });
      expect(() => getEnvConfig(mock.chainData())).throw();
    });
  });
});
