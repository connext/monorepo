import { Type } from "@sinclair/typebox";

// strings aliases: these function more as documentation for devs than checked types
export type Address = string; // aka HexString of length 42
export type HexString = string; // eg "0xabc123" of arbitrary length
export type PublicIdentifier = string; // "vector" + base58(<publicKey>)
export type PublicKey = string; // aka HexString of length 132
export type PrivateKey = string; // aka Bytes32
export type SignatureString = string; // aka HexString of length 132
export type UrlString = string; // eg "<protocol>://<host>[:<port>]/<path>

// String pattern types
export const TAddress = Type.RegEx(/^0x[a-fA-F0-9]{40}$/);
export const TIntegerString = Type.RegEx(/^([0-9])*$/);
export const TUrl = Type.String({ format: "uri" });
// Convenience types
export const TChainId = Type.Number({ minimum: 1 });
export const TDecimalString = Type.RegEx(/^[0-9]*\.?[0-9]*$/);

export const ERC20Abi = [
  // Read-Only Functions
  "function name() public view returns (string)",
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function totalSupply() public view returns (uint256)",
  "function symbol() view returns (string)",
  "function allowance(address _owner, address _spender) public view returns (uint256 remaining)",

  // Authenticated Functions
  "function transfer(address to, uint amount) returns (boolean)",
  "function mint(address account, uint256 amount)",
  "function approve(address _spender, uint256 _value) public returns (bool success)",
  "function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)",
];
