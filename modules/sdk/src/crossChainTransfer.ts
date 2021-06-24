import { Contract } from "ethers";
import { hexlify } from "@ethersproject/bytes";
import { randomBytes } from "@ethersproject/random";
import Ajv from "ajv";
import { getTransactionManagerContract } from "./utils";
import { PrepareParamType } from "./types";

export const ajv = new Ajv();

export const prepare = async (params: PrepareParamType): Promise<void> => {
  const method = "prepare";
  const methodId = hexlify(randomBytes(32));
  console.log(method, methodId, params);
  // const validate = ajv.compile(PrepareParamSchema);
  // const valid = validate(params);
  // if (!valid) {
  //   console.log(method, methodId, params);
  //   throw new Error("Invalid Params");
  // }
  let address: string;
  let abi: any;
  try {
    ({ address, abi } = getTransactionManagerContract(params.sendingChainId));
  } catch (e) {
    throw e;
  }

  const transactionManagerInstance = new Contract(address, abi);
  console.log(transactionManagerInstance);

  // const transaction =
  // const prepareTx = await transactionManagerInstance.connect(bobProvider).prepare();
};

// const listenRouterPrepare = (): void => {};

// const routerFulfill = (): void => {};
