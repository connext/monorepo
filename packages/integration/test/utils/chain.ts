import { providers, BigNumber, Contract, constants, Wallet } from "ethers";

export const TestTokenABI = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function allowance(address _owner, address _spender) public view returns (uint256 remaining)",

  // Authenticated Functions
  "function approve(address _spender, uint256 _value) public returns (bool success)",
  "function transfer(address to, uint amount) returns (boolean)",
  "function mint(address account, uint256 amount)",
];

export const getOnchainBalance = async (
  assetId: string,
  address: string,
  provider: providers.Provider,
): Promise<BigNumber> => {
  return assetId === constants.AddressZero
    ? provider.getBalance(address)
    : new Contract(assetId, TestTokenABI, provider).balanceOf(address);
};

export const sendGift = async (
  assetId: string,
  value: string,
  recipient: string,
  funder: Wallet,
  nonce?: number,
): Promise<providers.TransactionResponse> => {
  const toSend = BigNumber.from(value);
  if (toSend.eq(0)) {
    throw new Error(`Cannot send gift of 0`);
  }
  const tx =
    assetId === constants.AddressZero
      ? await funder.sendTransaction({ to: recipient, value: BigNumber.from(value), nonce })
      : await new Contract(assetId, TestTokenABI, funder).transfer(recipient, BigNumber.from(value), { nonce });
  return tx;
};
