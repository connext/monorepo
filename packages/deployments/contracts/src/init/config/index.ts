import * as fs from "fs";
import * as path from "path";

import { ajv } from "@connext/nxtp-utils";

import { InitConfig, InitConfigSchema, ProtocolStack } from "../helpers";
import { chainIdToDomain } from "../../domain";

/**
 * Load the protocol stack from the default config
 * @param network - The network identifier which can be either `mainnet` or `testnet`
 * @param env - The smart contract environment which can be either `staging` or `prod`
 * @param chainIds - The array of chain Ids you wanna initialize.
 *      If not set, it will run the init script for the all chains.
 */
export const getDefaulProtocolStack = (
  network: "testnet" | "mainnet",
  env: "staging" | "prod",
  chainIds?: number[],
): ProtocolStack | undefined => {
  const json_filename = `${network}.${env}.json`;
  const file_path = path.join(__dirname, `./default/${json_filename}`);
  if (!fs.existsSync(file_path)) {
    return undefined;
  }

  const json = fs.readFileSync(file_path, { encoding: "utf-8" });
  const config = JSON.parse(json) as InitConfig;

  // schema validation for json config
  const validate = ajv.compile(InitConfigSchema);
  const valid = validate(config);
  if (!valid) {
    throw new Error(validate.errors?.map((err: unknown) => JSON.stringify(err, null, 2)).join(","));
  }

  // validation for the chainIds
  const supported_domains = config.supportedDomains;
  let active_domains: string[] = [];
  if (chainIds) {
    for (const chainId of chainIds) {
      const domain = chainIdToDomain(chainId).toString();
      if (!supported_domains.includes(domain)) {
        throw new Error(`Unsupported chain: ${chainId}, domain: ${domain}, supported: ${supported_domains}`);
      }
      active_domains.push(domain);
    }
  } else {
    active_domains = supported_domains;
  }
};
