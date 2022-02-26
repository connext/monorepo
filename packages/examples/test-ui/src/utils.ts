/* eslint-disable require-jsdoc */
import { ChainData } from "@connext/nxtp-utils";
import { Contract, providers, Signer, utils } from "ethers";

export const TestTokenABI = [
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
