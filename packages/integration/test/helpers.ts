import { utils, BigNumber } from "ethers";
import { ChainReader, getConnextInterface } from "@connext/nxtp-txservice";
import { ERC20Abi } from "@connext/nxtp-utils";

import { DomainInfo, SUBG_TRANSFER_ENTITY_PARAMS, TestAgents } from "./constants";

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

export const formatEtherscanLink = (input: { network: string; hash: string }): string => {
  const { network: _network, hash } = input;
  const network = _network.toLowerCase();
  const networkNameToUrl: Record<string, string> = {
    mainnet: "etherscan.io",
    ropsten: "ropsten.etherscan.io",
    rinkeby: "rinkeby.etherscan.io",
    kovan: "kovan.etherscan.io",
  };
  const url = networkNameToUrl[network];
  if (!url) {
    throw new Error(`Unknown network: ${network}`);
  }
  return `https://${url}/tx/${hash}`;
};

export const formatSubgraphGetTransferQuery = (
  input: { xcallTransactionHash: string } | { transferId: string },
): string => {
  const params = SUBG_TRANSFER_ENTITY_PARAMS;
  const { xcallTransactionHash, transferId } = input as any;
  const condition = xcallTransactionHash
    ? `xcalledTransactionHash: "${xcallTransactionHash}"`
    : `transferId: "${transferId}"`;
  return `
  {
    transfers(
      where: { ${condition} }
    ) {\n\t${params.map((param) => `${param}`).join("\n\t")}
    }
  }`.trim();
};

/// MARK - On-chain Operations
export type OperationContext = {
  agents: TestAgents;
  chainreader: ChainReader;
  domainInfo: { ORIGIN: DomainInfo; DESTINATION: DomainInfo };
};

export const getAllowance = async (
  context: OperationContext,
  input: {
    domain: DomainInfo;
    owner: string;
    spender: string;
    asset: string;
  },
): Promise<BigNumber> => {
  const { chainreader } = context;
  const {
    owner,
    spender,
    asset,
    domain: { chain },
  } = input;
  const erc20 = new utils.Interface(ERC20Abi);

  const encoded = erc20.encodeFunctionData("allowance", [owner, spender]);
  const result = await chainreader.readTx({
    chainId: chain,
    to: asset,
    data: encoded,
  });
  return erc20.decodeFunctionResult("allowance", result)[0];
};

export const getRouterApproval = async (
  context: OperationContext,
  input: {
    domain: DomainInfo;
  },
): Promise<boolean> => {
  const {
    agents: { router },
    chainreader,
  } = context;
  const {
    domain: {
      chain,
      config: {
        deployments: { connext: contract },
      },
    },
  } = input;
  const connext = getConnextInterface();

  if (!router) {
    throw new Error("Cannot approve non-existent router!");
  }

  const encoded = connext.encodeFunctionData("approvedRouters", [router.address]);
  const result = await chainreader.readTx({
    chainId: chain,
    to: contract,
    data: encoded,
  });
  return connext.decodeFunctionResult("approvedRouters", result)[0] as boolean;
};
