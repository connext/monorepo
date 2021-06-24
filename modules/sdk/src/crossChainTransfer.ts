import { Contract } from "ethers";
import { hexlify } from "@ethersproject/bytes";
import { randomBytes } from "@ethersproject/random";
import { BigNumber } from "@ethersproject/bignumber";
import { AddressZero } from "@ethersproject/constants";
import { signFulfillTransactionPayload, InvariantTransactionData } from "@connext/nxtp-utils";
import Ajv from "ajv";
import { getTransactionManagerContract, validateAndParseAddress } from "./utils";
import { PrepareParamType, listenRouterPrepareParamType, listenRouterFulfillParamType } from "./types";

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

    const instance = new Contract(address, abi);
    console.log(instance);

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

    const prepareTx = await instance
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

export const listenRouterPrepare = async (params: listenRouterPrepareParamType): Promise<void> => {
  const method = "listenRouterPrepare";
  const methodId = hexlify(randomBytes(32));
  console.log(method, methodId, params);
  const { address, abi } = getTransactionManagerContract(params.receivingChainId);

  const instance = new Contract(address, abi);
  console.log(instance);

  const signer = params.userWebProvider.getSigner();

  let eventData: {
    txData: InvariantTransactionData;
    amount: BigNumber;
    expiry: BigNumber;
    blockNumber: BigNumber;
    caller: string;
  } = {} as any;

  instance.on("TransactionPrepared", (txData, amount, expiry, blockNumber, caller) => {
    console.log(txData, amount, expiry, blockNumber, caller);

    // detect user's prepare quote
    if (txData.user == caller) {
      eventData.txData = txData;
      eventData.amount = amount;
      eventData.expiry = expiry;
      eventData.blockNumber = blockNumber;
      eventData.caller = caller;
      instance.removeAllListeners("TransactionPrepared");
    }
  });

  instance.removeAllListeners("TransactionPrepared");

  if (eventData.caller) {
    // add verification here

    // if verified then proceed

    const signature = await signFulfillTransactionPayload(eventData.txData, params.relayerFee.toString(), signer);
    console.log(signature);

    // Broadcast the signature using messaging service
  }
};

export const listenRouterFulfill = async (params: listenRouterFulfillParamType): Promise<void> => {
  const method = "listenRouterFulfill";
  const methodId = hexlify(randomBytes(32));
  console.log(method, methodId, params);
  const { address, abi } = getTransactionManagerContract(params.receivingChainId);

  const instance = new Contract(address, abi);
  console.log(instance);

  let eventData: {
    txData: InvariantTransactionData;
    amount: BigNumber;
    expiry: BigNumber;
    blockNumber: BigNumber;
    relayerFee: BigNumber;
    signature: string;
    caller: string;
  } = {} as any;

  instance.on("TransactionFulfilled", (txData, amount, expiry, blockNumber, relayerFee, signature, caller) => {
    console.log(txData, amount, expiry, blockNumber, relayerFee, signature, caller);

    // detect user's prepare quote
    if (txData.user == caller) {
      eventData.txData = txData;
      eventData.amount = amount;
      eventData.expiry = expiry;
      eventData.blockNumber = blockNumber;
      eventData.relayerFee = relayerFee;
      eventData.signature = signature;
      eventData.caller = caller;
      instance.removeAllListeners("TransactionFulfilled");
    }
  });

  instance.removeAllListeners("TransactionFulfilled");
};
