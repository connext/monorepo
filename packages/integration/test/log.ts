import * as path from "path";
import * as fs from "fs";

import { getNtpTimeSeconds } from "@connext/nxtp-utils";

import { DomainInfo, LOGFILE_PATH } from "./constants";
import { formatEtherscanLink } from "./helpers";

// Helper for logging steps in the integration test.
const logdir = path.join(path.dirname(__dirname), LOGFILE_PATH);
const logfile = path.join(logdir, getNtpTimeSeconds().toString() + ".txt");
if (!fs.existsSync(logdir)) {
  fs.mkdirSync(logdir, { recursive: true });
}

/**
 * Why use this custom logger instead of the Logger class?
 * - Will automatically intercept messages, format them, and append them to the session logfile.
 * - Handles colorful pretty-printing of the log messages to the console, including links to etherscan,
 * etc... intended for easy readability.
 * - Internally handles incrementing the current step number of the test.
 * - Fine control over what's printed, since we may want to use the saved logfiles as a validation step
 * for staging setups in the future.
 */
export const log = {
  step: 0,
  print: (mod: string, message: string, etc?: any) => {
    let append = "";
    if (etc) {
      for (const key of Object.keys(etc as object)) {
        const value = etc[key];
        const shouldStringify = typeof value !== "string";
        append += `\n\t${key.slice(0, 1).toUpperCase() + key.slice(1)}: ${
          shouldStringify ? JSON.stringify(value) : value
        }`;
      }
    }
    console.log(mod, message, append, "\x1b[0m");
    fs.appendFileSync(logfile, "\n" + message + append);
  },
  params: (params: string) => {
    log.print("\x1b[35m\x1b[4m%s", "TEST PARAMETERS");
    log.print("\x1b[35m%s", params);
  },
  info: (_message: string, context: { domain?: DomainInfo; hash?: string; etc?: any } = {}) => {
    const { domain, hash, etc } = context;
    const { network, chain } = domain ?? {};
    let message = `[INFO] (${log.step})`;
    message += chain ? ` {${chain}}` : "";
    message += ` ${_message}`;
    if (hash) {
      message += `\n\tHash: ${hash}`;
      if (network) {
        message += `\n\tEtherscan: ${formatEtherscanLink({
          hash,
          network,
        })}`;
      }
    }
    log.print("\x1b[36m%s", message, etc);
  },
  next: (message: string) => {
    log.step++;
    log.print("\x1b[32m%s", `\n[STEP] (${log.step}) ${message}`);
  },
  fail: (_message: string, context: { domain: DomainInfo; hash?: string; etc?: any }) => {
    const {
      domain: { chain, network },
      hash,
      etc,
    } = context;
    let message = `[FAIL] (${log.step}) {${chain}} ${_message}`;
    if (hash) {
      message += ` Hash: ${hash}`;
      if (network) {
        message += `Etherscan: ${formatEtherscanLink({
          hash,
          network,
        })}`;
      }
    }
    log.print("\x1b[31m%s", message, etc);
    process.exit(1);
  },
};
