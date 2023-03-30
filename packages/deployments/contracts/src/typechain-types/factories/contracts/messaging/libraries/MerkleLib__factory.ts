/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  MerkleLib,
  MerkleLibInterface,
} from "../../../../contracts/messaging/libraries/MerkleLib";

const _abi = [
  {
    inputs: [],
    name: "MerkleLib__insert_treeIsFull",
    type: "error",
  },
] as const;

const _bytecode =
  "0x00000001012001900000000b0000613d0000008001000039000000400010043f0000000001000416000000000110004c0000000b0000c13d0000002001000039000001000010044300000120000004430010000c0000040f0010000e0000040f0000000501000041000000110001042e000000000100001900000012000104300000001000000432000000110001042e0000001200010430000000000000000000000002000000000000000000000000000000400000010000000000000000000000000000000000000000000000000000000000000000000000000000000000";

type MerkleLibConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MerkleLibConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MerkleLib__factory extends ContractFactory {
  constructor(...args: MerkleLibConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MerkleLib> {
    return super.deploy(overrides || {}) as Promise<MerkleLib>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): MerkleLib {
    return super.attach(address) as MerkleLib;
  }
  override connect(signer: Signer): MerkleLib__factory {
    return super.connect(signer) as MerkleLib__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MerkleLibInterface {
    return new utils.Interface(_abi) as MerkleLibInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MerkleLib {
    return new Contract(address, _abi, signerOrProvider) as MerkleLib;
  }
}
