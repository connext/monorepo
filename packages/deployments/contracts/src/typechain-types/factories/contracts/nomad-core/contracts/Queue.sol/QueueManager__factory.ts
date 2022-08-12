/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  QueueManager,
  QueueManagerInterface,
} from "../../../../../contracts/nomad-core/contracts/Queue.sol/QueueManager";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_item",
        type: "bytes32",
      },
    ],
    name: "queueContains",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "queueEnd",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "queueLength",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610257806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80632bef289214610046578063ab91c7b01461006e578063f6d1610214610084575b600080fd5b610059610054366004610186565b6100ab565b60405190151581526020015b60405180910390f35b6100766100be565b604051908152602001610065565b600154600160801b90046001600160801b0316600090815260026020526040902054610076565b60006100b86001836100cf565b92915050565b60006100ca6001610134565b905090565b81546000906001600160801b03165b8354600160801b90046001600160801b0316811161012a5760008181526001850160205260409020548390036101185760019150506100b8565b80610122816101b5565b9150506100de565b5060009392505050565b80546000906001600160801b03600160801b820481169116610156828261015e565b949350505050565b60008161016c8460016101ce565b61017691906101f9565b6001600160801b03169392505050565b60006020828403121561019857600080fd5b5035919050565b634e487b7160e01b600052601160045260246000fd5b6000600182016101c7576101c761019f565b5060010190565b60006001600160801b038083168185168083038211156101f0576101f061019f565b01949350505050565b60006001600160801b03838116908316818110156102195761021961019f565b03939250505056fea2646970667358221220dfb491fe54990dc02df9c54f1474239fadd9cd588fa7669573ce6267410dd47964736f6c634300080f0033";

type QueueManagerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: QueueManagerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class QueueManager__factory extends ContractFactory {
  constructor(...args: QueueManagerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<QueueManager> {
    return super.deploy(overrides || {}) as Promise<QueueManager>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): QueueManager {
    return super.attach(address) as QueueManager;
  }
  override connect(signer: Signer): QueueManager__factory {
    return super.connect(signer) as QueueManager__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): QueueManagerInterface {
    return new utils.Interface(_abi) as QueueManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): QueueManager {
    return new Contract(address, _abi, signerOrProvider) as QueueManager;
  }
}
