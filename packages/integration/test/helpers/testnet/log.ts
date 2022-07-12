import * as path from "path";
import * as fs from "fs";

import { getNtpTimeSeconds } from "@connext/nxtp-utils";

import { DomainInfo, LOGFILE_PATH } from "../../constants/testnet";

import { formatEtherscanLink } from "./utils";

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
enum LogLevel {
  INIT = "INIT",
  STEP = "STEP",
  INFO = "INFO",
  DONE = "DONE",
  FAIL = "FAIL",
}

type LogContext = {
  domain?: DomainInfo;
  hash?: string;
  etc?: any;
};

export const log = {
  last: "",
  step: 0,
  print: (mod: string, level: LogLevel, _message: string, context: LogContext = {}) => {
    const { hash, etc } = context;
    const { chain, network } = context.domain ?? {};
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
    let message = "";
    message += level === LogLevel.STEP ? "\n" : "";
    message += level !== LogLevel.INIT ? `[${level.toString()}]` : "";
    message += log.step > 0 ? ` (${log.step})` : "";
    message += chain ? ` {${chain}}` : "";
    message += ` ${_message}`;
    message += level === LogLevel.DONE ? " ✔" : "";
    if (hash && network) {
      message += `\n\tHash: ${hash}`;
      message += `\n\tEtherscan: ${formatEtherscanLink({
        hash,
        network,
      })}`;
    }
    console.log(mod, message, append, "\x1b[0m");
    fs.appendFileSync(logfile, "\n" + message + append);
  },
  params: (params: string) => {
    log.print("\x1b[35m\x1b[4m%s\x1b[0m", LogLevel.INIT, "TEST PARAMETERS");
    log.print("\x1b[35m%s", LogLevel.INIT, params);
  },
  info: (message: string, context: LogContext = {}) => {
    log.print("\x1b[36m%s", LogLevel.INFO, message, context);
  },
  next: (message: string) => {
    if (log.last) {
      log.print("\x1b[32m%s", LogLevel.DONE, log.last);
    }
    log.step++;
    log.print("\x1b[32m%s", LogLevel.STEP, message);
    log.last = message;
  },
  done: () => {
    log.print("\x1b[32m%s", LogLevel.DONE, log.last);
  },
  fail: (message: string, context: LogContext) => {
    log.print("\x1b[31m%s", LogLevel.FAIL, message, context);
    throw new Error(message);
  },
};
