import { providers } from "ethers";
import { getChainData } from "@connext/nxtp-utils";

import { Deployment } from "../../types";

import { log } from "./log";
import { CallSchema } from "./types";

const DEFAULT_CONFIRMATIONS = 3;

type WaitForTxArguments = {
  deployment: Deployment;
  tx: providers.TransactionResponse;
  name: string;
  checkResult?: {
    method: () => Promise<any>;
    desired?: any;
  };
  chainData?: any;
};

export const waitForTx = async (
  args: WaitForTxArguments,
): Promise<{ receipt: providers.TransactionReceipt; result?: any }> => {
  const { tx, name: _name, checkResult, deployment, chainData: _chainData } = args;
  // Try to get the desired amount of confirmations from chain data.
  const chainData = _chainData ?? (await getChainData(true, true));
  const info = chainData.get(tx.chainId.toString());

  const prefix = `${log.prefix.base({ chain: tx.chainId, deployment })} ${_name}() `;
  const confirmations = info?.confirmations ?? DEFAULT_CONFIRMATIONS;
  console.log(`${prefix}Transaction sent: ${tx.hash}\n\t\tWaiting for ${confirmations} confirmations.`);
  const receipt = await tx.wait(confirmations as number);
  console.log(`${prefix}Transaction mined:`, receipt.transactionHash);

  let value: any | undefined = undefined;
  if (checkResult?.desired != undefined && typeof checkResult.method === "function") {
    value = await checkResult.method();
    if (value.toString().toLowerCase() !== checkResult.desired.toString().toLowerCase()) {
      throw new Error(`${prefix}Checking result of update failed: ${value} !== ${checkResult.desired}`);
    }
  }

  return { receipt, result: value };
};

export const updateIfNeeded = async <T>(schema: CallSchema<T>): Promise<void> => {
  const { deployment, read: _read, write: _write, desired, chainData } = schema;
  const { contract } = deployment;

  // Sanity check: write method included.
  if (!_write) {
    throw new Error("Cannot update if no write method is provided!");
  }

  // Check if desired is defined
  const desiredExists = desired != undefined;

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
  const writeCall = async (chain: number): Promise<providers.TransactionResponse> => {
    if (chain === 137) {
      return await contract[write.method](...write.args, {
        gasLimit: 2000000,
        gasPrice: "100000000000",
      });
    } else {
      return await contract[write.method](...write.args, {
        gasLimit: 2500000,
      });
    }
  };

  const network = await contract.provider.getNetwork();
  const chain = network.chainId;

  let value;
  let valid = false;

  if (desiredExists) {
    try {
      value = await readCall();
      if (typeof desired === "string" && typeof value === "string") {
        valid = value.toLowerCase() === desired.toLowerCase();
      } else {
        valid = value === desired;
      }
    } catch {}
  }

  log.info.value({ chain, deployment, call: read, value, valid });
  if (!valid) {
    const tx = await writeCall(chain);
    const waitForTxParam: WaitForTxArguments = {
      deployment,
      tx,
      name: write.method,
      chainData,
    };

    if (desiredExists) {
      waitForTxParam.checkResult = {
        method: readCall,
        desired,
      };
    }

    const res = await waitForTx(waitForTxParam);
    log.info.value({ chain, deployment, call: read, value: res.result, updated: true });
  }
};

export const assertValue = async <T>(schema: CallSchema<T>): Promise<void> => {
  const { deployment, desired: _desired, read: _read, caseSensitive: _caseSensitive } = schema;
  const { contract } = deployment;

  const caseSensitive = _caseSensitive ?? false;
  const desired = caseSensitive ? _desired : (_desired as any).toString().toLowerCase();

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

  let value = await readCall();
  if (!caseSensitive) {
    value = (value as any).toString().toLowerCase();
  }

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
