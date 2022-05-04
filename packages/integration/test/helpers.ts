import { utils, BigNumber, constants, Wallet } from "ethers";
import {
  ChainReader,
  getConnextInterface,
  getDeployedTokenRegistryContract,
  getTokenRegistryInterface,
} from "@connext/nxtp-txservice";
import { ERC20Abi } from "@connext/nxtp-utils";

import { DomainInfo, Environment, ENVIRONMENT, SUBG_TRANSFER_ENTITY_PARAMS, TestAgents } from "./constants";

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

export const formatEtherscanLink = (input: { network: string; hash?: string; address?: string }): string => {
  const { network: _network, hash, address } = input;
  const network = _network.toLowerCase();
  const networkNameToUrl: Record<string, string> = {
    mainnet: "etherscan.io",
    ropsten: "ropsten.etherscan.io",
    rinkeby: "rinkeby.etherscan.io",
    kovan: "kovan.etherscan.io",
    goerli: "goerli.etherscan.io",
  };
  const url = networkNameToUrl[network];
  if (!url) {
    throw new Error(`Unknown network: ${network}`);
  }
  if (hash) {
    return `https://${url}/tx/${hash}`;
  } else if (address) {
    return `https://${url}/address/${address}`;
  }
  return "";
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

export const getAssetApproval = async (
  context: OperationContext,
  input: {
    canonical: string;
    domain: DomainInfo;
  },
): Promise<boolean> => {
  const { chainreader } = context;
  const {
    canonical,
    domain: {
      chain,
      config: {
        deployments: { connext: contract },
      },
    },
  } = input;
  const canonicalTokenId = utils.hexlify(canonizeTokenId(canonical));
  const connext = getConnextInterface();

  const encoded = connext.encodeFunctionData("approvedAssets", [canonicalTokenId]);
  const result = await chainreader.readTx({
    chainId: chain,
    to: contract,
    data: encoded,
  });
  return connext.decodeFunctionResult("approvedAssets", result)[0] as boolean;
};

export const convertToCanonicalAsset = async (
  context: OperationContext,
  input: {
    adopted: string;
    domain: DomainInfo;
  },
): Promise<{
  canonicalAsset: string;
  canonicalTokenId: string;
}> => {
  const { chainreader } = context;
  const {
    adopted,
    domain: {
      chain,
      config: {
        deployments: { connext: contract },
      },
    },
  } = input;
  const connext = getConnextInterface();

  const encoded = connext.encodeFunctionData("adoptedToCanonical", [adopted]);
  const result = await chainreader.readTx({
    chainId: chain,
    to: contract,
    data: encoded,
  });
  const canonicalAsset = connext.decodeFunctionResult("adoptedToCanonical", result)[1] as string;

  const canonicalTokenId = utils.hexlify(canonizeTokenId(canonicalAsset));
  return { canonicalAsset, canonicalTokenId };
};

export const checkOnchainLocalAsset = async (
  context: OperationContext,
  input: {
    adopted: string;
    domain: DomainInfo;
  },
): Promise<{
  canonicalToAdopted: string;
  adoptedToCanonical: string;
  canonicalTokenId: string;
  tokenRegistry: string;
  getTokenId: string;
}> => {
  const { chainreader } = context;
  const {
    adopted,
    domain: {
      chain,
      config: {
        deployments: { connext: contract },
      },
    },
  } = input;
  const connext = getConnextInterface();

  let adoptedToCanonical: string;
  let canonicalToAdopted: string;
  let trAddress: string;
  let getTokenId: string;
  {
    const encoded = connext.encodeFunctionData("adoptedToCanonical", [adopted]);
    const result = await chainreader.readTx({
      chainId: chain,
      to: contract,
      data: encoded,
    });
    adoptedToCanonical = connext.decodeFunctionResult("adoptedToCanonical", result)[1] as string;
  }
  const canonicalTokenId = utils.hexlify(canonizeTokenId(adoptedToCanonical));

  {
    const encoded = connext.encodeFunctionData("canonicalToAdopted", [canonicalTokenId]);
    const result = await chainreader.readTx({
      chainId: chain,
      to: contract,
      data: encoded,
    });
    canonicalToAdopted = connext.decodeFunctionResult("canonicalToAdopted", result)[0] as string;
  }

  {
    const tr = getTokenRegistryInterface();
    trAddress = getDeployedTokenRegistryContract(
      chain,
      ENVIRONMENT === Environment.Staging ? "Staging" : "",
      true,
    )!.address;
    const encoded = tr.encodeFunctionData("getTokenId", [adopted]);
    const result = await chainreader.readTx({
      chainId: chain,
      to: trAddress,
      data: encoded,
    });
    getTokenId = tr.decodeFunctionResult("getTokenId", result)[1] as string;
  }

  return {
    canonicalToAdopted: canonicalToAdopted.toLowerCase(),
    adoptedToCanonical: adoptedToCanonical.toLowerCase(),
    canonicalTokenId: canonicalTokenId.toLowerCase(),
    getTokenId: getTokenId.toLowerCase(),
    tokenRegistry: trAddress,
  };
};

export const removeAsset = async (
  _: OperationContext,
  input: {
    deployer?: Wallet;
    canonical: string;
    local: string;
    domain: DomainInfo;
  },
): Promise<string> => {
  const {
    deployer,
    canonical,
    local,
    domain: {
      chain,
      config: {
        deployments: { connext: contract },
      },
    },
  } = input;
  const canonicalTokenId = utils.hexlify(canonizeTokenId(canonical));
  const connext = getConnextInterface();
  if (!deployer) {
    throw new Error("Need deployer agent to remove asset");
  }

  // Asset is not approved. Use deployer to approve asset.
  const encoded = connext.encodeFunctionData("removeAssetId", [canonicalTokenId, local]);
  const tx = await deployer.sendTransaction({
    chainId: chain,
    to: contract,
    data: encoded,
  });
  await tx.wait(1);
  return tx.hash;
};

export const setupAsset = async (
  _: OperationContext,
  input: {
    deployer?: Wallet;
    canonical: string;
    local: string;
    domain: DomainInfo;
  },
): Promise<string> => {
  const {
    deployer,
    canonical,
    local,
    domain: {
      domain,
      chain,
      config: {
        deployments: { connext: contract },
      },
    },
  } = input;
  const canonicalTokenId = utils.hexlify(canonizeTokenId(canonical));
  const connext = getConnextInterface();
  if (!deployer) {
    throw new Error("Need deployer agent to setup asset");
  }

  // Asset is not approved. Use deployer to approve asset.
  const encoded = connext.encodeFunctionData("setupAsset", [
    {
      id: canonicalTokenId,
      domain: domain,
    },
    local,
    constants.AddressZero,
  ]);
  const tx = await deployer.sendTransaction({
    chainId: chain,
    to: contract,
    data: encoded,
  });
  await tx.wait(1);
  return tx.hash;
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
  if (!router) {
    throw new Error("Cannot approve non-existent router!");
  }

  const connext = getConnextInterface();
  const encoded = connext.encodeFunctionData("getRouterApproval", [router.address]);
  const result = await chainreader.readTx({
    chainId: chain,
    to: contract,
    data: encoded,
  });
  return connext.decodeFunctionResult("getRouterApproval", result)[0] as boolean;
};
