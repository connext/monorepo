import { expect } from "@connext/nxtp-utils";
import { DEFAULT_CHAIN_CONFIG_VALUE_MINS, validateTransactionServiceConfig } from "../src/config";
import { ConfigurationError } from "../src/shared";
import { TEST_SENDER_CHAIN_ID } from "./utils";

/// config.ts
describe("Config", () => {
  beforeEach(() => {});

  afterEach(() => {});

  describe("#validateTransactionServiceConfig", () => {
    it("throw if gas price max increase scalar is less", () => {
      let config = {
        [TEST_SENDER_CHAIN_ID.toString()]: {
          providers: [{ url: "https://-------------" }],
          gasPriceMaxIncreaseScalar: DEFAULT_CHAIN_CONFIG_VALUE_MINS.gasPriceMaxIncreaseScalar - 1,
        },
      };

      expect(() => validateTransactionServiceConfig(config)).to.throw(ConfigurationError);
    });

    it("throw if gas price replacement bump percent is less", () => {
      let config = {
        [TEST_SENDER_CHAIN_ID.toString()]: {
          providers: [{ url: "https://-------------" }],
          gasPriceReplacementBumpPercent: DEFAULT_CHAIN_CONFIG_VALUE_MINS.gasPriceReplacementBumpPercent - 1,
        },
      };

      expect(() => validateTransactionServiceConfig(config)).to.throw(ConfigurationError);
    });

    it("throw if gas limit inflation is less", () => {
      let config = {
        [TEST_SENDER_CHAIN_ID.toString()]: {
          providers: [{ url: "https://-------------" }],
          gasLimitInflation: DEFAULT_CHAIN_CONFIG_VALUE_MINS.gasLimitInflation - 1,
        },
      };

      expect(() => validateTransactionServiceConfig(config)).to.throw(ConfigurationError);
    });
  });
});
