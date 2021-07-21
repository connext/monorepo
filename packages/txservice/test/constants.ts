import { providers, BigNumber } from "ethers";
import { AddressZero, One, Zero } from "@ethersproject/constants";
import { mkHash, mkAddress } from "@connext/nxtp-utils";

import { MinimalTransaction } from "../src/types";

type TransactionReceipt = providers.TransactionReceipt;
type TransactionResponse = providers.TransactionResponse;

export const tx: MinimalTransaction = {
  chainId: 1337,
  to: AddressZero,
  from: AddressZero,
  data: "0x",
  value: Zero,
};

export const txResponse: TransactionResponse = {
  chainId: 1337,
  confirmations: 1,
  data: "0x",
  from: AddressZero,
  gasLimit: One,
  gasPrice: One,
  hash: mkHash(),
  nonce: 1,
  value: Zero,
  wait: () => Promise.resolve({} as TransactionReceipt),
};

export const txReceipt: TransactionReceipt = {
  blockHash: mkHash("0xabc"),
  blockNumber: 123,
  byzantium: true,
  confirmations: 1,
  contractAddress: mkAddress("0xa"),
  cumulativeGasUsed: BigNumber.from(21000),
  from: txResponse.from,
  gasUsed: BigNumber.from(21000),
  logs: [],
  logsBloom: "0x",
  to: mkAddress("0xbbb"),
  transactionHash: txResponse.hash,
  transactionIndex: 1,
  status: 1,
  effectiveGasPrice: One,
  type: 0,
};