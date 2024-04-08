import { Contract, providers } from "ethers";
import * as zk from "zksync-ethers";
import { getChainData } from "@connext/nxtp-utils";

import { Deployment, CallSchema, ReadSchema } from "./types";

import { log } from "./log";

const DEFAULT_CONFIRMATIONS = 1;

type WaitForTxArguments = {
  deployment: Deployment;
  tx: providers.TransactionResponse | zk.types.TransactionResponse;
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
  const chainData = _chainData ?? (await getChainData());
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
  const { deployment, read: _read, write: _write, desired, chainData, apply, auth: _auth } = schema;
  let { contract } = deployment;

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

  const auth = _auth ? (!Array.isArray(_auth) ? [_auth] : _auth) : undefined;

  // Sanity check: contract has methods.
  const callable = Object.keys(contract.functions).concat(Object.keys(contract.callStatic));
  if (!callable.includes(read.method)) {
    if (!deployment.abi.map((f) => f?.name?.includes(read.method))) {
      log.error.method({ deployment, method: read.method, callable });
    }
    contract = new Contract(contract.address, deployment.abi, contract.provider);
  }
  if (!callable.includes(write.method)) {
    if (!deployment.abi.map((f) => f?.name?.includes(write.method))) {
      log.error.method({ deployment, method: write.method, callable });
    }
    contract = new Contract(contract.address, deployment.abi, contract.provider);
  }

  const readCall = async <T = string>(method: string, args: any[]): Promise<T> => {
    return await contract.callStatic[method](...args);
  };

  const writeCall = async (
    chain: number,
  ): Promise<providers.TransactionResponse | zk.types.TransactionResponse | undefined> => {
    let authed = undefined;
    if (auth) {
      for (const cond of auth) {
        const res = cond.eval(await readCall(cond.method, cond.args ?? []));
        authed = authed === undefined ? res : authed || res;
      }
    } else {
      authed = true;
    }
    const tx = {
      to: contract.address,
      data: contract.interface.encodeFunctionData(write.method, write.args),
      chain,
      from: authed ? await contract.signer.getAddress() : undefined,
    };

    if (!apply || !authed) {
      log.info.tx({ ...tx, deployment, chain, call: write });
      return;
    }
    if (chain === 137) {
      return await contract[write.method](...write.args, {
        gasLimit: 5000000,
        gasPrice: "500000000000",
      });
    } else if (chain == 280) {
      return await contract[write.method](...write.args, {
        gasLimit: 30000000,
      });
    } else if (chain == 59144) {
      return await contract[write.method](...write.args, {
        gasPrice: "4500000000",
      });
    } else if (chain == 195) {
      return await contract[write.method](...write.args, {
        gasPrice: "150000000000",
      });
    } else {
      return await contract[write.method](...write.args);
    }
  };

  const network = await contract.provider.getNetwork();
  const chain = network.chainId;

  let value;
  let valid = false;

  if (desiredExists) {
    try {
      value = await readCall(read.method, read.args);
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
    if (!tx) {
      return;
    }

    const waitForTxParam: WaitForTxArguments = {
      deployment,
      tx,
      name: write.method,
      chainData,
    };

    if (desiredExists) {
      waitForTxParam.checkResult = {
        method: () => readCall(read.method, read.args),
        desired,
      };
    }

    const res = await waitForTx(waitForTxParam);
    log.info.value({ chain, deployment, call: read, value: res.result, updated: true });
  }
};

export const assertValue = async <T>(schema: ReadSchema<T>): Promise<void> => {
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

export const getValue = async <T>(schema: ReadSchema<T>): Promise<T> => {
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
