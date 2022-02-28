import { readFileSync } from "fs";
import { DEFAULT_LOCAL_CONFIG, SequencerConfig} from "../entities"


let sequencerConfig: SequencerConfig | undefined;

/**
 * Gets and validates the router config from the environment.
 * @param useDefaultLocal - (optional) If true, use the default local config.
 * @returns The router config with sensible defaults
 */
export const getConfig = (useDefaultLocal = false): SequencerConfig => {
  if (!sequencerConfig) {
    const path = process.env.NXTP_TEST_CONFIG_FILE ?? "./ops/config/config.json";
    const data = useDefaultLocal ? DEFAULT_LOCAL_CONFIG : JSON.parse(readFileSync(path, "utf8"));
    sequencerConfig = {
      network: data.network || "testnet",
      routers: [],
      ...data,
    };
  }
  return sequencerConfig!;
};
