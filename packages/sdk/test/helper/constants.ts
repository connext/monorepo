import { providers, BigNumber, utils } from "ethers";
import { AddressZero, One, Zero } from "@ethersproject/constants";
import { mkHash, mkAddress } from "@connext/nxtp-utils";

type TransactionReceipt = providers.TransactionReceipt;
type TransactionResponse = providers.TransactionResponse;

export const TEST_SENDER_CHAIN_ID = 1337;
export const TEST_RECEIVER_CHAIN_ID = 1338;

export const EmptyBytes = "0x";
export const EmptyCallDataHash = utils.keccak256(EmptyBytes);

export const TxResponse: TransactionResponse = {
  chainId: TEST_SENDER_CHAIN_ID,
  confirmations: 0,
  data: "0x",
  from: AddressZero,
  gasLimit: BigNumber.from(utils.parseUnits("1500", "gwei").toString()),
  gasPrice: One,
  hash: mkHash(),
  nonce: 1,
  value: Zero,
  wait: () => Promise.resolve({} as TransactionReceipt),
};

export const TxReceipt: TransactionReceipt = {
  blockHash: mkHash("0xabc"),
  blockNumber: 123,
  byzantium: true,
  confirmations: 1,
  contractAddress: mkAddress("0xa"),
  cumulativeGasUsed: BigNumber.from(21000),
  from: TxResponse.from,
  gasUsed: BigNumber.from(21000),
  logs: [],
  logsBloom: "0x",
  to: mkAddress("0xbbb"),
  transactionHash: TxResponse.hash,
  transactionIndex: 1,
  status: 1,
  effectiveGasPrice: One,
  type: 0,
};
