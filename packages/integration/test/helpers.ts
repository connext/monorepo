import { utils, BigNumber } from "ethers";
import { ChainReader } from "@connext/nxtp-txservice";

import { DomainInfo } from "./constants";

/// MARK - Utilities
export const canonizeTokenId = (data?: utils.BytesLike): Uint8Array => {
  if (!data) throw new Error("Bad input. Undefined");

  const buf = utils.arrayify(data);
  if (buf.length > 32) throw new Error("Too long");
  if (buf.length !== 20 && buf.length != 32) {
    throw new Error("bad input, expect address or bytes32");
  }
  return utils.zeroPad(buf, 32);
};

/// MARK - On-chain Operations
export type OperationContext = {
  chainreader: ChainReader;
  domainInfo: { ORIGIN: DomainInfo; DESTINATION: DomainInfo };
};

export const getAllowance = async (
  context: OperationContext,
  input: {
    chain: number;
    erc20: utils.Interface;
    owner: string;
    spender: string;
    asset: string;
  },
): Promise<BigNumber> => {
  const { chainreader } = context;
  const { erc20, owner, spender, asset, chain } = input;

  const encoded = erc20.encodeFunctionData("allowances", [owner, spender]);
  const result = await chainreader.readTx({
    chainId: chain,
    to: asset,
    data: encoded,
  });
  return erc20.decodeFunctionResult("allowances", result)[0];
};
