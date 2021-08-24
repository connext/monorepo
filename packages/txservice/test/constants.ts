import { providers, BigNumber } from "ethers";
import { AddressZero, One, Zero } from "@ethersproject/constants";
import { mkHash, mkAddress } from "@connext/nxtp-utils";

import { FullTransaction, ReadTransaction, WriteTransaction } from "../src/types";

type TransactionReceipt = providers.TransactionReceipt;
type TransactionResponse = providers.TransactionResponse;

export const TEST_SENDER_CHAIN_ID = 1337;
export const TEST_RECEIVER_CHAIN_ID = 1338;
export const DEFAULT_GAS_LIMIT = BigNumber.from("21004");

export const TEST_READ_TX: ReadTransaction = {
  chainId: TEST_SENDER_CHAIN_ID,
  to: AddressZero,
  data: "0x",
};

export const TEST_TX: WriteTransaction = {
  chainId: TEST_SENDER_CHAIN_ID,
  to: AddressZero,
  from: AddressZero,
  data: "0x",
  value: Zero,
};

export const TEST_TX_RESPONSE: TransactionResponse = {
  chainId: TEST_SENDER_CHAIN_ID,
  confirmations: 0,
  data: "0x",
  from: AddressZero,
  gasLimit: DEFAULT_GAS_LIMIT,
  gasPrice: One,
  hash: mkHash(),
  nonce: 1,
  value: Zero,
  wait: () => Promise.resolve({} as TransactionReceipt),
};

export const TEST_FULL_TX: FullTransaction = {
  ...TEST_TX,
  nonce: 15,
  gasPrice: TEST_TX_RESPONSE.gasPrice,
  gasLimit: TEST_TX_RESPONSE.gasLimit,
};

export const TEST_TX_RECEIPT: TransactionReceipt = {
  blockHash: mkHash("0xabc"),
  blockNumber: 123,
  byzantium: true,
  confirmations: 1,
  contractAddress: mkAddress("0xa"),
  cumulativeGasUsed: BigNumber.from(21000),
  from: TEST_TX_RESPONSE.from,
  gasUsed: BigNumber.from(21000),
  logs: [],
  logsBloom: "0x",
  to: mkAddress("0xbbb"),
  transactionHash: TEST_TX_RESPONSE.hash,
  transactionIndex: 1,
  status: 1,
  effectiveGasPrice: One,
  type: 0,
};

export const makeChaiReadable = (obj: any) => {
  const result = {};
  Object.keys(obj).forEach(key => {
    if (BigNumber.isBigNumber(obj[key])) {
      result[key] = BigNumber.from(obj[key]).toString();
    } else {
      result[key] = obj[key];
    }
  });
  return result;
};
