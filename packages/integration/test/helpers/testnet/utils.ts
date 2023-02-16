import { utils, BigNumber, constants, Wallet } from "ethers";
import { ChainReader, getConnextInterface } from "@connext/nxtp-txservice";
import { ERC20Abi } from "@connext/nxtp-utils";

import { DomainInfo, TestAgents } from "../../constants/testnet";

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
    optimismgoerli: "blockscout.com/optimism/goerli",
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
    domain: { domain },
  } = input;
  const erc20 = new utils.Interface(ERC20Abi);

  const encoded = erc20.encodeFunctionData("allowance", [owner, spender]);
  const result = await chainreader.readTx({
    domain: +domain,
    to: asset,
    data: encoded,
  });
  return erc20.decodeFunctionResult("allowance", result)[0];
};

export const getAssetApproval = async (
  context: OperationContext,
  input: {
    canonicalId: string;
    canonicalDomain: string;
    domain: DomainInfo;
  },
): Promise<boolean> => {
  const { chainreader } = context;
  const {
    canonicalId: _canonicalId,
    canonicalDomain,
    domain: {
      domain,
      config: {
        deployments: { connext: contract },
      },
    },
  } = input;
  const connext = getConnextInterface();

  const canonicalTokenId = {
    id: utils.hexlify(canonizeTokenId(_canonicalId)),
    domain: +canonicalDomain,
  };

  const key = utils.solidityKeccak256(
    ["bytes"],
    [utils.defaultAbiCoder.encode(["bytes32", "uint32"], [canonicalTokenId.id, canonicalTokenId.domain])],
  );

  const encoded = connext.encodeFunctionData("approvedAssets(bytes32)", [key]);
  const result = await chainreader.readTx({
    domain: +domain,
    to: contract,
    data: encoded,
  });
  return connext.decodeFunctionResult("approvedAssets(bytes32)", result)[0] as boolean;
};

export const convertToCanonicalAsset = async (
  context: OperationContext,
  input: {
    adopted: string;
    domain: DomainInfo;
  },
): Promise<{
  canonicalDomain: string;
  canonicalId: string;
}> => {
  const { chainreader } = context;
  const {
    adopted,
    domain: {
      domain,
      config: {
        deployments: { connext: contract },
      },
    },
  } = input;
  const connext = getConnextInterface();

  const encoded = connext.encodeFunctionData("adoptedToCanonical", [adopted]);
  const result = await chainreader.readTx({
    domain: +domain,
    to: contract,
    data: encoded,
  });
  const decoded = connext.decodeFunctionResult("adoptedToCanonical", result)[0];
  const canonicalDomain = decoded[0] as string;
  const canonicalId = decoded[1] as string;

  return { canonicalDomain, canonicalId };
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
  canonicalId: string;
  canonicalDomain: string;
  canonicalKey: string;
  getTokenId: string;
}> => {
  const { chainreader } = context;
  const {
    adopted,
    domain: {
      domain,
      config: {
        deployments: { connext: contract },
      },
    },
  } = input;
  const connext = getConnextInterface();

  let canonicalDomain: string;
  let adoptedToCanonical: string;
  let canonicalToAdopted: string;
  let getTokenId: string;
  {
    const encoded = connext.encodeFunctionData("adoptedToCanonical", [adopted]);
    const result = await chainreader.readTx({
      domain: +domain,
      to: contract,
      data: encoded,
    });
    const decoded = connext.decodeFunctionResult("adoptedToCanonical", result)[0];
    canonicalDomain = decoded[0] as string;
    adoptedToCanonical = decoded[1] as string;
  }

  let canonicalKey: string;
  const canonicalId = utils.hexlify(canonizeTokenId(adoptedToCanonical));
  {
    const canonicalTokenId = {
      id: utils.hexlify(canonizeTokenId(canonicalId)),
      domain: +canonicalDomain,
    };

    canonicalKey = utils.solidityKeccak256(
      ["bytes"],
      [utils.defaultAbiCoder.encode(["bytes32", "uint32"], [canonicalTokenId.id, canonicalTokenId.domain])],
    );

    const encoded = connext.encodeFunctionData("canonicalToAdopted(bytes32)", [canonicalKey]);
    const result = await chainreader.readTx({
      domain: +domain,
      to: contract,
      data: encoded,
    });
    canonicalToAdopted = connext.decodeFunctionResult("canonicalToAdopted(bytes32)", result)[0] as string;
  }

  {
    const encoded = connext.encodeFunctionData("getTokenId", [adopted]);
    const result = await chainreader.readTx({
      domain: +domain,
      to: contract,
      data: encoded,
    });
    getTokenId = connext.decodeFunctionResult("getTokenId", result)[1] as string;
  }

  return {
    canonicalToAdopted: canonicalToAdopted.toLowerCase(),
    adoptedToCanonical: adoptedToCanonical.toLowerCase(),
    canonicalId: canonicalId.toLowerCase(),
    canonicalDomain: canonicalDomain,
    canonicalKey: canonicalKey,
    getTokenId: getTokenId.toLowerCase(),
  };
};

export const removeAsset = async (
  _: OperationContext,
  input: {
    deployer?: Wallet;
    canonicalId: string;
    canonicalDomain: string;
    local: string;
    domain: DomainInfo;
  },
): Promise<string> => {
  const {
    deployer,
    canonicalId: _canonicalId,
    canonicalDomain,
    local,
    domain: {
      chain,
      config: {
        deployments: { connext: contract },
      },
    },
  } = input;
  const connext = getConnextInterface();
  if (!deployer) {
    throw new Error("Need deployer agent to remove asset");
  }

  const canonicalId = utils.hexlify(canonizeTokenId(_canonicalId));
  const payload = utils.defaultAbiCoder.encode(
    ["tuple(bytes32 canonicalId,uint32 canonicalDomain)"],
    [{ canonicalId, canonicalDomain }],
  );
  const key = utils.solidityKeccak256(["bytes32"], [payload]);

  // Asset is not approved. Use deployer to approve asset.
  const encoded = connext.encodeFunctionData("removeAssetId(bytes32,address,address)", [key, local, local]);
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
  const encoded = connext.encodeFunctionData("setupAssetWithDeployedRepresentation", [
    {
      id: canonicalTokenId,
      domain: domain,
    },
    local,
    constants.AddressZero,
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
      domain,
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
    domain: +domain,
    to: contract,
    data: encoded,
  });
  return connext.decodeFunctionResult("getRouterApproval", result)[0] as boolean;
};
