import { stub, restore, reset, SinonStub } from "sinon";
import { chainDataToMap, expect, mkAddress } from "@connext/nxtp-utils";
import { getEnvConfig, getConfig } from "../src/config";
import * as ConfigFns from "../src/config";
import { mock } from "./mock";

const mockDeployments = mock.contracts.deployments;
describe("Config", () => {
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
      expect(() => getConfig(mock.chainData(), mockDeployments)).not.throw();
    });

    it("should return sequencer config already created", async () => {
      stub(ConfigFns, "sequencerConfig").value(mock.config());
      await getConfig(mock.chainData(), mockDeployments);
      expect(getEnvConfigStub).callCount(0);
    });
  });

  describe("#getEnvConfig", () => {
    beforeEach(() => {});

    afterEach(() => {
      restore();
      reset();
    });

    it("should read config from NXTP config with testnet network values overridden", () => {
      stub(process, "env").value({
        ...process.env,
        SEQ_NETWORK: "testnet",
        SEQ_CONFIG: JSON.stringify(mock.config()),
      });
      expect(() => getEnvConfig(mock.chainData(), mockDeployments)).not.throw();
    });

    it("should error if no config ", () => {
      stub(process, "env").value({
        ...process.env,
        SEQ_NETWORK: "testnet",
        SEQ_CONFIG: null,
        SEQ_CONFIG_FILE: "buggypath",
      });

      expect(() => getEnvConfig(mock.chainData(), mockDeployments)).throw();
    });

    it("should error if connext address is missing", () => {
      stub(process, "env").value({
        ...process.env,
        SEQ_CONFIG_FILE: "buggypath",
        SEQ_NETWORK: "testnet",
        SEQ_CONFIG: JSON.stringify({
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
      expect(() => getEnvConfig(chainData, mockDeployments)).throw("No Connext contract address");
    });

    it("should read connext from contract", () => {
      stub(process, "env").value({
        ...process.env,
        SEQ_CONFIG_FILE: "buggypath",
        SEQ_NETWORK: "testnet",
        SEQ_CONFIG: JSON.stringify({
          ...mock.config(),
          chains: {
            [mock.chain.A]: {
              confirmations: 1,
              providers: ["http://example.com"],
              deployments: {},
              subgraph: {
                runtime: [{ query: "http://example.com", health: "http://example.com" }],
                analytics: [{ query: "http://example.com", health: "http://example.com" }],
                maxLag: 10,
              },
            },
            [mock.chain.B]: {
              confirmations: 1,
              providers: ["http://example.com"],
              deployments: {},
              subgraph: {
                runtime: [{ query: "http://example.com", health: "http://example.com" }],
                analytics: [{ query: "http://example.com", health: "http://example.com" }],
                maxLag: 10,
              },
            },
          },
        }),
      });

      expect(() => getEnvConfig(mock.chainData(), mockDeployments)).not.throw();
    });

    it("should read runtime subgraph from chainData", () => {
      stub(process, "env").value({
        ...process.env,
        SEQ_CONFIG_FILE: "buggypath",
        SEQ_NETWORK: "testnet",
        SEQ_CONFIG: JSON.stringify({
          ...mock.config(),
          chains: {
            [mock.chain.A]: {
              confirmations: 1,
              providers: ["http://example.com"],
              deployments: {},
              subgraph: {
                analytics: [{ query: "http://example.com", health: "http://example.com" }],
                maxLag: 10,
              },
            },
            [mock.chain.B]: {
              confirmations: 1,
              providers: ["http://example.com"],
              deployments: {},
              subgraph: {
                analytics: [{ query: "http://example.com", health: "http://example.com" }],
                maxLag: 10,
              },
            },
          },
        }),
      });

      expect(() => getEnvConfig(mock.chainData(), mockDeployments)).not.throw();
    });

    it("should read analytics subgraph from chainData", () => {
      stub(process, "env").value({
        ...process.env,
        SEQ_CONFIG_FILE: "buggypath",
        SEQ_NETWORK: "testnet",
        SEQ_CONFIG: JSON.stringify({
          ...mock.config(),
          chains: {
            [mock.chain.A]: {
              confirmations: 1,
              providers: ["http://example.com"],
              deployments: {},
              subgraph: {
                runtime: [{ query: "http://example.com", health: "http://example.com" }],
                maxLag: 10,
              },
            },
            [mock.chain.B]: {
              confirmations: 1,
              providers: ["http://example.com"],
              deployments: {},
              subgraph: {
                runtime: [{ query: "http://example.com", health: "http://example.com" }],
                maxLag: 10,
              },
            },
          },
        }),
      });

      expect(() => getEnvConfig(mock.chainData(), mockDeployments)).not.throw();
    });

    it("should read recommended confirmations", () => {
      stub(process, "env").value({
        ...process.env,
        SEQ_CONFIG_FILE: "buggypath",
        SEQ_NETWORK: "testnet",
        SEQ_CONFIG: JSON.stringify({
          ...mock.config(),
          chains: {
            [mock.chain.A]: {
              providers: ["http://example.com"],
              deployments: {},
              subgraph: {
                runtime: [{ query: "http://example.com", health: "http://example.com" }],
                analytics: [{ query: "http://example.com", health: "http://example.com" }],
                maxLag: 10,
              },
            },
            [mock.chain.B]: {
              providers: ["http://example.com"],
              deployments: {},
              subgraph: {
                runtime: [{ query: "http://example.com", health: "http://example.com" }],
                analytics: [{ query: "http://example.com", health: "http://example.com" }],
                maxLag: 10,
              },
            },
          },
        }),
      });

      expect(() => getEnvConfig(mock.chainData(), mockDeployments)).not.throw();
    });

    it("should error if no file fails", () => {
      stub(process, "env").value({
        ...process.env,
        SEQ_CONFIG_FILE: "buggypath",
      });
      expect(() => getEnvConfig(mock.chainData(), mockDeployments)).throw();
    });

    it("should error if validation fails", () => {
      stub(process, "env").value({
        ...process.env,
        SEQ_CONFIG_FILE: "buggypath",
        SEQ_NETWORK: "testnet",
        SEQ_CONFIG: JSON.stringify({
          ...mock.config(),
          auctionWaitTime: "ABCDEF",
        }),
      });
      expect(() => getEnvConfig(mock.chainData(), mockDeployments)).throw();
    });

    it("should return sequencer config already created", async () => {});
  });
});
