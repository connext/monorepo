import * as fs from "fs";

import { ProtocolStack } from "../helpers";

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
  throw new Error("Not implemented yet");
};
