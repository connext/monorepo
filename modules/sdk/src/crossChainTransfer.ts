import { Contract } from "ethers";
import { hexlify } from "@ethersproject/bytes";
import { randomBytes } from "@ethersproject/random";
import { BigNumber } from "@ethersproject/bignumber";
import { AddressZero } from "@ethersproject/constants";
import Ajv from "ajv";
import { getTransactionManagerContract, validateAndParseAddress } from "./utils";
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

  try {
    const signer = params.userWebProvider.getSigner();
    const userAddress = signer.getAddress();

    const routerAddress = validateAndParseAddress(params.routerAddress);
    const sendingAssetId = validateAndParseAddress(params.sendingAssetId);
    const receivingAssetId = validateAndParseAddress(params.receivingAssetId);
    const receivingAddress = validateAndParseAddress(params.receivingAddress);

    const callData = params.callData ?? "0x";
    const transactionId = hexlify(randomBytes(32));

    // validate expiry
    const expiry = params.expiry;

    const { address, abi } = getTransactionManagerContract(params.sendingChainId);

    const transactionManagerInstance = new Contract(address, abi);
    console.log(transactionManagerInstance);

    const transaction = {
      user: userAddress,
      router: routerAddress,
      sendingAssetId: sendingAssetId,
      receivingAssetId: receivingAssetId,
      receivingAddress: receivingAddress,
      callData: callData,
      transactionId: transactionId,
      sendingChainId: params.sendingChainId,
      receivingChainId: params.receivingChainId,
    };

    const record = {
      amount: BigNumber.from(params.amount),
      expiry: expiry,
    };

    const prepareTx = await transactionManagerInstance
      .connect(signer)
      .prepare(
        transaction,
        record.amount,
        record.expiry,
        transaction.sendingAssetId === AddressZero ? { value: record.amount } : {},
      );

    const prepareReceipt = await prepareTx.wait(1);
    console.log(method, prepareReceipt);

    signer.provider.waitForTransaction(prepareTx.hash, 1).then((receipt) => {
      if (receipt.status === 0) {
        // tx reverted
        const message = "Transaction reverted onchain";
        console.error(message, receipt);
        throw new Error(message);
      }
    });
  } catch (e) {
    throw e;
  }
};

export const listenRouterPrepare = (): void => {};

export const listenRouterFulfill = (): void => {};
