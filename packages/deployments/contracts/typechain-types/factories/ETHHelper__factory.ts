/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ETHHelper, ETHHelperInterface } from "../ETHHelper";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_weth",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "_bridge",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
    ],
    name: "Send",
    type: "event",
  },
  {
    inputs: [],
    name: "bridge",
    outputs: [
      {
        internalType: "contract BridgeRouter",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_domain",
        type: "uint32",
      },
      {
        internalType: "bool",
        name: "_enableFast",
        type: "bool",
      },
    ],
    name: "send",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_domain",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "_to",
        type: "bytes32",
      },
      {
        internalType: "bool",
        name: "_enableFast",
        type: "bool",
      },
    ],
    name: "sendTo",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_domain",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_enableFast",
        type: "bool",
      },
    ],
    name: "sendToEVMLike",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "weth",
    outputs: [
      {
        internalType: "contract IWeth",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60c060405234801561001057600080fd5b5060405161041138038061041183398101604081905261002f916100bd565b6001600160a01b03828116608081905290821660a081905260405163095ea7b360e01b815260048101919091526000602482015263095ea7b390604401600060405180830381600087803b15801561008657600080fd5b505af115801561009a573d6000803e3d6000fd5b5050505050506100f7565b6001600160a01b03811681146100ba57600080fd5b50565b600080604083850312156100d057600080fd5b82516100db816100a5565b60208401519092506100ec816100a5565b809150509250929050565b60805160a0516102f0610121600039600060d90152600081816076015261013801526102f06000f3fe60806040526004361061004a5760003560e01c80631411b7c01461004f5780633fc8cef3146100645780638b3a145e146100b4578063e78cea92146100c7578063fcdef44c146100fb575b600080fd5b61006261005d366004610203565b61010e565b005b34801561007057600080fd5b506100987f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b03909116815260200160405180910390f35b6100626100c2366004610236565b61011e565b3480156100d357600080fd5b506100987f000000000000000000000000000000000000000000000000000000000000000081565b610062610109366004610287565b610136565b61011a82335b83610136565b5050565b610131836001600160a01b038416610114565b505050565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663d0e30db0346040518263ffffffff1660e01b81526004016000604051808303818588803b15801561019157600080fd5b505af11580156101a5573d6000803e3d6000fd5b50506040513393507f7d4b3c5c44bd8008199bb99f184426274cf24f917f4da3485d6a39f894366b10925060009150a2505050565b803563ffffffff811681146101ee57600080fd5b919050565b803580151581146101ee57600080fd5b6000806040838503121561021657600080fd5b61021f836101da565b915061022d602084016101f3565b90509250929050565b60008060006060848603121561024b57600080fd5b610254846101da565b925060208401356001600160a01b038116811461027057600080fd5b915061027e604085016101f3565b90509250925092565b60008060006060848603121561029c57600080fd5b6102a5846101da565b92506020840135915061027e604085016101f356fea2646970667358221220b9b13bcfac8a396d27add87bfaaf463c89c9158e88282919ff086a1857aef07164736f6c634300080b0033";

type ETHHelperConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ETHHelperConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ETHHelper__factory extends ContractFactory {
  constructor(...args: ETHHelperConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "ETHHelper";
  }

  deploy(
    _weth: string,
    _bridge: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ETHHelper> {
    return super.deploy(_weth, _bridge, overrides || {}) as Promise<ETHHelper>;
  }
  getDeployTransaction(
    _weth: string,
    _bridge: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_weth, _bridge, overrides || {});
  }
  attach(address: string): ETHHelper {
    return super.attach(address) as ETHHelper;
  }
  connect(signer: Signer): ETHHelper__factory {
    return super.connect(signer) as ETHHelper__factory;
  }
  static readonly contractName: "ETHHelper";
  public readonly contractName: "ETHHelper";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ETHHelperInterface {
    return new utils.Interface(_abi) as ETHHelperInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ETHHelper {
    return new Contract(address, _abi, signerOrProvider) as ETHHelper;
  }
}
