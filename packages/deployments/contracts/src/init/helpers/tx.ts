import { providers } from "ethers";
import { getChainData } from "@connext/nxtp-utils";

import { log } from "./log";
import { CallScheme } from "./types";

const DEFAULT_CONFIRMATIONS = 5;

export const waitForTx = async (args: {
  tx: providers.TransactionResponse;
  name: string;
  checkResult?: {
    method: () => Promise<any>;
    desired: any;
  };
}): Promise<{ receipt: providers.TransactionReceipt; result?: any }> => {
  const { tx, name: _name, checkResult } = args;
  // Try to get the desired amount of confirmations from chain data.
  const chainData = await getChainData();
  const info = chainData.get(tx.chainId.toString());

  const name = `[${_name}] `;
  console.log(`\t${name}Transaction sent: ${tx.hash}`);
  const receipt = await tx.wait(info?.confirmations ?? DEFAULT_CONFIRMATIONS);
  console.log(`\tTransaction mined:`, receipt.transactionHash);

  let value: any | undefined = undefined;
  if (checkResult && typeof checkResult.method === "function") {
    value = await checkResult.method();
    if (value !== checkResult.desired) {
      throw new Error(`${name}Checking result of update failed: ${value} !== ${checkResult.desired}`);
    }
  }

  return { receipt, result: value };
};

export const updateIfNeeded = async <T>(args: { scheme: CallScheme<T> }): Promise<void> => {
  const {
    scheme: { contract, read: _read, write: _write, desired },
  } = args;

  // Sanity check: write method included.
  if (!_write) {
    throw new Error("Cannot update if no write method is provided!");
  }
  // Sanity check: desired is specified.
  if (!desired) {
    throw new Error("Desired value not specified for `updateIfNeeded` call.");
  }

  const write = {
    ..._write,
    args: _write.args ?? [],
  };
  const read =
    typeof _read === "string"
      ? {
          method: _read,
          args: [],
        }
      : {
          ..._read,
          args: _read.args ?? [],
        };

  // Sanity check: contract has methods.
  const callable = Object.keys(contract.functions).concat(Object.keys(contract.callStatic));
  if (!callable.includes(read.method)) {
    throw new Error(`Read method ${read.method} not found in contract functions!`);
  }
  if (!callable.includes(write.method)) {
    throw new Error(`Write method ${write.method} not found in contract functions!`);
  }

  const readCall = async (): Promise<T> => {
    return await contract.callStatic[read.method](...read.args);
  };
  const writeCall = async (): Promise<providers.TransactionResponse> => {
    return await contract[write.method](...write.args);
  };

  const network = await contract.provider.getNetwork();
  const chain = network.chainId;
  const address = contract.address;

  const value = await readCall();
  log.info.value({ chain, address, call: read, value });
  if (value !== desired) {
    const tx = await writeCall();
    const res = await waitForTx({
      tx,
      name: write.method,
      checkResult: {
        method: readCall,
        desired,
      },
    });
    log.info.value({ chain, address, call: read, value: res.result, updated: true });
  }
};

export const assertValue = async <T>(args: { scheme: CallScheme<T> }): Promise<void> => {
  const {
    scheme: { contract, read: _read, desired },
  } = args;

  const read =
    typeof _read === "string"
      ? {
          method: _read,
          args: [],
        }
      : {
          ..._read,
          args: _read.args ?? [],
        };
  // Sanity check: desired is specified.
  if (!desired) {
    throw new Error("Desired value not specified for `assertValue` call.");
  }

  // Sanity check: contract has read method.
  const callable = Object.keys(contract.functions).concat(Object.keys(contract.callStatic));
  if (!callable.includes(read.method)) {
    throw new Error(`Read method ${read.method} not found in contract functions!`);
  }

  const readCall = async (): Promise<T> => {
    return await contract.callStatic[read.method](...read.args);
  };

  const network = await contract.provider.getNetwork();
  const chain = network.chainId;
  const address = contract.address;

  const value = await readCall();

  if (value === desired) {
    log.info.value({ chain, address, call: read, value });
  } else {
    log.error.value({ chain, address, call: read, value, desired });
  }
};

export const getValue = async <T>(args: { scheme: CallScheme<T> }): Promise<T> => {
  const {
    scheme: { contract, read: _read },
  } = args;

  const read =
    typeof _read === "string"
      ? {
          method: _read,
          args: [],
        }
      : {
          ..._read,
          args: _read.args ?? [],
        };

  // Sanity check: contract has read method.
  const callable = Object.keys(contract.functions).concat(Object.keys(contract.callStatic));
  if (!callable.includes(read.method)) {
    throw new Error(`Read method ${read.method} not found in contract functions!`);
  }

  const readCall = async (): Promise<T> => {
    return await contract.callStatic[read.method](...read.args);
  };

  const network = await contract.provider.getNetwork();
  const chain = network.chainId;
  const address = contract.address;

  const value = await readCall();
  log.info.value({ chain, address, call: read, value });
  return value;
};
