/* eslint-disable require-jsdoc */
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
