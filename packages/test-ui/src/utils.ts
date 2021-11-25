/* eslint-disable require-jsdoc */
import { ChainData } from "@connext/nxtp-utils";
import { BigNumber, constants, Contract, providers, Signer, utils } from "ethers";

const TestTokenABI = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",

  // Authenticated Functions
  "function transfer(address to, uint amount) returns (boolean)",
  "function mint(address account, uint256 amount)",
];

export const mintTokens = async (signer: Signer, assetId: string): Promise<providers.TransactionResponse> => {
  const signerAddress = await signer.getAddress();
  const contract = new Contract(assetId, TestTokenABI, signer);
  const response = await contract.mint(signerAddress, utils.parseEther("1000"));
  return response;
};

export const getBalance = async (
  address: string,
  assetId: string,
  provider: providers.Provider,
): Promise<BigNumber> => {
  let balance;
  if (assetId === constants.AddressZero) {
    balance = await provider.getBalance(address);
  } else {
    const contract = new Contract(assetId, TestTokenABI, provider);
    balance = await contract.balanceOf(address);
  }
  return balance;
};

export const getChainName = (chainId: number, chainData: Map<string, ChainData>): string => {
  const chain = chainData.get(chainId.toString());
  return chain?.name ?? chainId.toString();
};

export const getExplorerLinkForTx = (tx: string, chainId: number, chainData: Map<string, ChainData>) => {
  const explorer = chainData.get(chainId.toString())?.explorers[0]?.url;
  return explorer ? `${explorer}/tx/${tx}` : "#";
};

export const getExplorerLinkForAddress = (address: string, chainId: number, chainData: Map<string, ChainData>) => {
  const explorer = chainData.get(chainId.toString())?.explorers[0]?.url;
  return explorer ? `${explorer}/address/${address}` : "#";
};

export const getDecimalsForAsset = async (
  assetId: string,
  chainId: number,
  provider: providers.Provider,
  chainData: Map<string, ChainData>,
): Promise<number> => {
  const chainInfo = chainData.get(chainId.toString());
  const decimals = chainInfo?.assetId[assetId]?.decimals;
  if (decimals) {
    return decimals;
  }
  const contract = new Contract(assetId, TestTokenABI, provider);
  return await contract.decimals();
};
