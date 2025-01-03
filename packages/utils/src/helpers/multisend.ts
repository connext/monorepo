import { BigNumber, utils } from "ethers";

import { MultisendAbi } from "../constants";

export enum MultisendTransactionOperation {
  CALL = 1,
  DELEGATE_CALL = 2,
}

export type MultisendTransaction = {
  operation?: MultisendTransactionOperation;
  to: string;
  data: string;
  value?: BigNumber;
};

export const encodeMultisendCall = (txs: MultisendTransaction[]): string => {
  const calldata =
    "0x" +
    txs
      .map((tx) => {
        const bytes = utils.arrayify(tx.data);
        return utils
          .solidityPack(
            [
              "uint8", // operation as a uint8 with 0 for a call or 1 for a delegatecall)
              "address", // to as an address
              "uint256", // value as a uint256 (must always be 0 in our txs as not payable)
              "uint256", // data length as a uint256
              "bytes", // data as bytes
            ],
            [
              !tx.operation || tx.operation === MultisendTransactionOperation.CALL ? 0 : 1,
              tx.to,
              tx.value ? tx.value : BigNumber.from("0"),
              bytes.length,
              bytes,
            ],
          )
          .slice(2); // remove leading "0x"
      })
      .join("");
  const iface = new utils.Interface(MultisendAbi);
  return iface.encodeFunctionData("multiSend", [calldata]);
};
