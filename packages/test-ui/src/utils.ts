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

export const getBalance = async (signer: Signer, assetId: string): Promise<BigNumber> => {
  const signerAddress = await signer.getAddress();
  let balance;
  if (assetId === constants.AddressZero) {
    balance = await signer.getBalance(signerAddress);
  } else {
    const contract = new Contract(assetId, TestTokenABI, signer);
    balance = await contract.balanceOf(signerAddress);
  }
  return balance;
};
