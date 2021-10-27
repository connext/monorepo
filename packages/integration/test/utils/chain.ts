import { ERC20Abi } from "@connext/nxtp-utils";
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

export const getDecimals = async (assetId: string, funder: Wallet) => {
  if (assetId === constants.AddressZero) {
    return 18;
  }
  return await new Contract(assetId, ERC20Abi, funder.provider).decimals();
};

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
  amount: string,
  to: string,
  funder: Wallet,
  nonce?: number,
): Promise<providers.TransactionResponse> => {
  const value = BigNumber.from(amount);
  if (value.eq(0)) {
    throw new Error(`Cannot send gift of 0`);
  }
  const chainId = await funder.getChainId();

  console.log("sendTransaction", { to, value: value.toString(), nonce, chainId });
  try {
    return await funder.sendTransaction({ to, value, nonce, chainId });
  } catch (e) {
    console.log(nonce, "sendTransaction error:", e);
    throw e;
  }
  // const tx =
  //   assetId === constants.AddressZero
  //     ? await funder.sendTransaction({ to: recipient, value: BigNumber.from(value), nonce })
  //     : await new Contract(assetId, TestTokenABI, funder).mint(recipient, BigNumber.from(value), { nonce });
};
