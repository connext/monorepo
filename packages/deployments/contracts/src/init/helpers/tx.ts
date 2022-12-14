import { providers, utils } from "ethers";
import { getChainData } from "@connext/nxtp-utils";

import { log } from "./log";
import { CallSchema, CheckResult, Deployment } from "./types";

const DEFAULT_CONFIRMATIONS = 3;

type WaitForTxArguments = {
  deployment: Deployment;
  tx: providers.TransactionResponse;
  name: string;
  checkResult?: CheckResult;
  chainData?: any;
};

export const getMultisendTransaction = (operation: "call" | "delegatecall", to: string, data: string): string => {
  const bytes = utils.arrayify(data);
  return utils.solidityPack(
    [
      "uint8", // operation as a uint8 with 0 for a call or 1 for a delegatecall)
      "address", // to as a address
      "uint256", // value as a uint256 (must always be 0 in our txs as not payable)
      "uint256", // data length as a uint256
      "bytes", // data as bytes
    ],
    [operation === "call" ? 0 : 1, to, 0, bytes.length, bytes],
  );
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

const shouldUpdate = async <T>(
  schema: CallSchema<T>,
): Promise<{
  valid: boolean;
  readCall: () => Promise<T>;
  read: { method: string; args: (number | string)[] };
  write: { method: string; args: (number | string)[] };
}> => {
  const { deployment, read: _read, write: _write, desired } = schema;
  const { contract } = deployment;

  // Sanity check: read method included.
  if (!_read) {
    throw new Error("Cannot update if no read method is provided!");
  }

  // Sanity check: write method included.
  if (!_write) {
    throw new Error("Cannot update if no write method is provided!");
  }

  // Generate the read function
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

  // Generate the write funciton
  const write = {
    ..._write,
    args: _write.args ?? [],
  };

  // Sanity check: contract has methods.
  const callable = Object.keys(contract.functions).concat(Object.keys(contract.callStatic));
  if (!callable.includes(read.method)) {
    log.error.method({ deployment, method: read.method, callable });
  }
  if (!callable.includes(write.method)) {
    log.error.method({ deployment, method: write.method, callable });
  }

  const network = await contract.provider.getNetwork();
  const chain = network.chainId;

  const readCall = async (): Promise<T> => {
    return await contract.callStatic[read.method](...read.args);
  };

  // If desired is not defined, assume we should update
  if (desired == undefined) {
    log.info.value({ chain, deployment, call: read, value: undefined, valid: false });
    return { valid: false, readCall, write, read };
  }

  // Otherwise try to check the value
  let value;
  let valid = false;

  try {
    value = await readCall();
    if (typeof desired === "string" && typeof value === "string") {
      valid = value.toLowerCase() === desired.toLowerCase();
    } else {
      valid = value === desired;
    }
  } catch {}
  log.info.value({ chain, deployment, call: read, value, valid: !shouldUpdate });
  return { valid, readCall, write, read };
};

export const generateMultisendUpdateIfNeeded = async <T>(
  schema: CallSchema<T>,
): Promise<{
  checkResult?: CheckResult;
  data: string;
} | void> => {
  const { deployment, desired, multisend: _multisend } = schema;
  const { contract } = deployment;

  // Sanity check: wants to write later
  const multisend = _multisend ?? false;
  if (!multisend) {
    throw new Error(`Use "updateIfNeeded" when you should update immediately`);
  }

  const { valid, readCall, write } = await shouldUpdate(schema);

  if (valid) {
    return;
  }

  return {
    checkResult:
      desired != undefined
        ? {
            method: readCall,
            desired,
          }
        : undefined,
    data: getMultisendTransaction(
      "delegatecall",
      contract.address,
      contract.interface.encodeFunctionData(write.method, write.args),
    ),
  };
};

export const updateIfNeeded = async <T>(schema: CallSchema<T>): Promise<void> => {
  const { deployment, write: _write, desired, chainData, multisend: _multisend } = schema;
  const { contract } = deployment;

  // Sanity check: wants to write *now*
  const multisend = _multisend ?? false;
  if (multisend) {
    throw new Error(`Use "generateMultisendUpdateIfNeeded" when you should update with multisend functionality`);
  }

  // Sanity check: write method included.
  if (!_write) {
    throw new Error("Cannot update if no write method is provided!");
  }

  // Ensure we should update
  const { valid, readCall, write, read } = await shouldUpdate(schema);

  const writeCall = async (chain: number): Promise<providers.TransactionResponse> => {
    if (chain === 137) {
      return await contract[write.method](...write.args, {
        gasLimit: 2000000,
        gasPrice: "100000000000",
      });
    } else {
      return await contract[write.method](...write.args, {
        gasLimit: 2000000,
      });
    }
  };

  const network = await contract.provider.getNetwork();
  const chain = network.chainId;

  if (!valid) {
    const tx = await writeCall(chain);

    const waitForTxParam: WaitForTxArguments = {
      deployment,
      tx: tx,
      name: write.method,
      chainData,
      checkResult:
        desired != undefined
          ? {
              method: readCall,
              desired,
            }
          : undefined,
    };

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
