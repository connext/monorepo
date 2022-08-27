import { providers } from "ethers";
import { getChainData } from "@connext/nxtp-utils";

import { log } from "./log";
import { CallSchema, Deployment } from "./types";

const DEFAULT_CONFIRMATIONS = 3;

export const waitForTx = async (args: {
  deployment: Deployment;
  tx: providers.TransactionResponse;
  name: string;
  checkResult?: {
    method: () => Promise<any>;
    desired: any;
  };
}): Promise<{ receipt: providers.TransactionReceipt; result?: any }> => {
  const { tx, name: _name, checkResult, deployment } = args;
  // Try to get the desired amount of confirmations from chain data.
  const chainData = await getChainData(true, true);
  const info = chainData.get(tx.chainId.toString());

  const prefix = `${log.prefix.base({ chain: tx.chainId, deployment })} ${_name}() `;
  const confirmations = info?.confirmations ?? DEFAULT_CONFIRMATIONS;
  console.log(`${prefix}Transaction sent: ${tx.hash}\n\t\tWaiting for ${confirmations} confirmations.`);
  const receipt = await tx.wait(confirmations);
  console.log(`${prefix}Transaction mined:`, receipt.transactionHash);

  let value: any | undefined = undefined;
  if (checkResult && typeof checkResult.method === "function") {
    value = await checkResult.method();
    if (value !== checkResult.desired) {
      throw new Error(`${prefix}Checking result of update failed: ${value} !== ${checkResult.desired}`);
    }
  }

  return { receipt, result: value };
};

export const updateIfNeeded = async <T>(schema: CallSchema<T>): Promise<void> => {
  const { deployment, read: _read, write: _write, desired } = schema;
  const { contract } = deployment;

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
    log.error.method({ deployment, method: read.method, callable });
  }
  if (!callable.includes(write.method)) {
    log.error.method({ deployment, method: write.method, callable });
  }

  const readCall = async (): Promise<T> => {
    return await contract.callStatic[read.method](...read.args);
  };
  const writeCall = async (): Promise<providers.TransactionResponse> => {
    return await contract[write.method](...write.args);
  };

  const network = await contract.provider.getNetwork();
  const chain = network.chainId;

  const value = await readCall();
  const valid = value === desired;
  log.info.value({ chain, deployment, call: read, value, valid });
  if (!valid) {
    const tx = await writeCall();
    const res = await waitForTx({
      deployment,
      tx,
      name: write.method,
      checkResult: {
        method: readCall,
        desired,
      },
    });
    log.info.value({ chain, deployment, call: read, value: res.result, updated: true });
  }
};

export const assertValue = async <T>(schema: CallSchema<T>): Promise<void> => {
  const { deployment, read: _read, desired } = schema;
  const { contract } = deployment;

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
    log.error.method({ deployment, method: read.method, callable });
  }

  const readCall = async (): Promise<T> => {
    return await contract.callStatic[read.method](...read.args);
  };

  const network = await contract.provider.getNetwork();
  const chain = network.chainId;

  const value = await readCall();

  if (value === desired) {
    log.info.value({ chain, deployment, call: read, value, valid: true });
  } else {
    log.error.value({ chain, deployment, call: read, value, desired });
  }
};

export const getValue = async <T>(schema: CallSchema<T>): Promise<T> => {
  const { deployment, read: _read } = schema;
  const { contract } = deployment;

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
    log.error.method({ deployment, method: read.method, callable });
  }

  const readCall = async (): Promise<T> => {
    return await contract.callStatic[read.method](...read.args);
  };

  const network = await contract.provider.getNetwork();
  const chain = network.chainId;

  const value = await readCall();
  log.info.value({
    chain,
    deployment,
    call: read,
    value,
    valid: schema.desired ? value === schema.desired : undefined,
  });
  return value;
};
