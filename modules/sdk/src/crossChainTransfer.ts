import { Contract, providers } from "ethers";
import { hexlify } from "@ethersproject/bytes";
import { randomBytes } from "@ethersproject/random";
import { BigNumber } from "@ethersproject/bignumber";
import { AddressZero } from "@ethersproject/constants";
import { signFulfillTransactionPayload, InvariantTransactionData } from "@connext/nxtp-utils";
import Ajv from "ajv";
import {
  getTransactionManagerContract,
  TransactionManagerEvents,
  TransactionManagerListener,
  validateAndParseAddress,
} from "./utils";
import { PrepareParamType, ListenRouterPrepareParamType, ListenRouterFulfillParamType } from "./types";

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

    signer.provider.waitForTransaction(prepareTx.hash, 1).then(receipt => {
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

export type TransactionPrepareEvent = {
  txData: InvariantTransactionData;
  amount: BigNumber;
  expiry: BigNumber;
  blockNumber: BigNumber;
  caller: string;
};

const switchChainIfNeeded = async (receivingChainId: number, web3Provider: providers.Web3Provider) => {
  // Make sure user is on the receiving chain
  const { chainId } = await web3Provider.getNetwork();

  // TODO: what if they arent using metamask
  if (chainId !== receivingChainId) {
    console.warn(`user is on ${chainId} and should be on ${receivingChainId}`);
    const promise = new Promise<void>(resolve => {
      web3Provider.on("chainChanged", chainId => {
        if (chainId === receivingChainId) {
          resolve();
        }
      });
    });

    const networkSwitch = new Promise<void>((resolve, reject) => {
      web3Provider
        .send("wallet_switchEthereumChain", [{ chainId: BigNumber.from(receivingChainId).toHexString() }])
        .then(resolve)
        .catch(reject);
    });

    await Promise.all([promise, networkSwitch]);
  }
};

export const listenRouterPrepare = async (params: ListenRouterPrepareParamType): Promise<void> => {
  const method = "listenRouterPrepare";
  const methodId = hexlify(randomBytes(32));
  console.log(method, methodId, params);

  // Make sure user is on the receiving chain
  await switchChainIfNeeded(params.receivingChainId, params.userWebProvider);

  const listener = await TransactionManagerListener.connect(params.userWebProvider);

  const signer = params.userWebProvider.getSigner();

  // Wait 1min for router event
  const event = await listener.waitFor(
    TransactionManagerEvents.TransactionPrepared,
    60_000,
    data => data.txData.transactionId === params.txData.transactionId,
  );

  // Generate signature
  const signature = await signFulfillTransactionPayload(event.txData, params.relayerFee.toString(), signer);
  console.log(signature);

  // TODO: broadcast from messaging service here and add logic to wait
  // for relayer submission or submit it on our own before expiry
  // Submit fulfill to receiver chain
  const { address, abi } = getTransactionManagerContract(params.receivingChainId);
  const instance = new Contract(address, abi);
  console.log("submitting fulfill to chain");
  const fulfillTx = await instance.fulfill(event.txData, params.relayerFee.toString(), signature);
  console.log("submitted", fulfillTx.hash);
  await fulfillTx.wait();
  console.log("mined");
};

// NOTE: once we have submitted the `Fulfill` we dont need to wait for the
// router to do it
export const listenRouterFulfill = async (params: ListenRouterFulfillParamType): Promise<void> => {
  const method = "listenRouterFulfill";
  const methodId = hexlify(randomBytes(32));
  console.log(method, methodId, params);

  // Make sure user is on the receiving chain
  await switchChainIfNeeded(params.receivingChainId, params.userWebProvider);

  const listener = await TransactionManagerListener.connect(params.userWebProvider);

  await listener.waitFor(TransactionManagerEvents.TransactionFulfilled, 60_000, data => {
    return data.txData.transactionId === params.txData.transactionId && data.caller === params.txData.router;
  });
};
