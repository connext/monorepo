/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type { WatcherClient, WatcherClientInterface } from "../../../contracts/messaging/WatcherClient";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_watcherManager",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ProposedOwnable__acceptProposedOwner_delayNotElapsed",
    type: "error",
  },
  {
    inputs: [],
    name: "ProposedOwnable__onlyOwner_notOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "ProposedOwnable__onlyProposed_notProposedOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "ProposedOwnable__proposeNewOwner_invalidProposal",
    type: "error",
  },
  {
    inputs: [],
    name: "ProposedOwnable__proposeNewOwner_noOwnershipChange",
    type: "error",
  },
  {
    inputs: [],
    name: "ProposedOwnable__renounceOwnership_delayNotElapsed",
    type: "error",
  },
  {
    inputs: [],
    name: "ProposedOwnable__renounceOwnership_invalidProposal",
    type: "error",
  },
  {
    inputs: [],
    name: "ProposedOwnable__renounceOwnership_noProposal",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "proposedOwner",
        type: "address",
      },
    ],
    name: "OwnershipProposed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "watcherManager",
        type: "address",
      },
    ],
    name: "WatcherManagerChanged",
    type: "event",
  },
  {
    inputs: [],
    name: "acceptProposedOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "delay",
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
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
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
    inputs: [
      {
        internalType: "address",
        name: "newlyProposed",
        type: "address",
      },
    ],
    name: "proposeNewOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "proposed",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proposedTimestamp",
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
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounced",
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
    inputs: [
      {
        internalType: "address",
        name: "_watcherManager",
        type: "address",
      },
    ],
    name: "setWatcherManager",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161079b38038061079b83398101604081905261002f91610059565b600380546001600160a01b03909216610100026001600160a81b0319909216919091179055610089565b60006020828403121561006b57600080fd5b81516001600160a01b038116811461008257600080fd5b9392505050565b610703806100986000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c80638da5cb5b116100715780638da5cb5b1461010a578063b1f8100d1461012f578063c5b350df14610142578063d1851c921461014a578063d232c2201461015b578063d2a3cc711461016d57600080fd5b80633cf52ffb146100b95780633f4ba83a146100d05780635c975abb146100da5780636a42b8f8146100f1578063715018a6146100fa5780638456cb5914610102575b600080fd5b6002545b6040519081526020015b60405180910390f35b6100d8610180565b005b60035460ff165b60405190151581526020016100c7565b62093a806100bd565b6100d86101bd565b6100d86101e8565b6000546001600160a01b03165b6040516001600160a01b0390911681526020016100c7565b6100d861013d366004610654565b6102a4565b6100d861034c565b6001546001600160a01b0316610117565b6000546001600160a01b0316156100e1565b6100d861017b366004610654565b6103bc565b6000546001600160a01b031633146101ab576040516311a8a1bb60e31b815260040160405180910390fd5b6101b3610489565b6101bb6104d2565b565b6000546001600160a01b031633146101bb576040516311a8a1bb60e31b815260040160405180910390fd5b6003546040516384785ecd60e01b81523360048201526101009091046001600160a01b0316906384785ecd90602401602060405180830381865afa158015610234573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102589190610684565b6102945760405162461bcd60e51b815260206004820152600860248201526710bbb0ba31b432b960c11b60448201526064015b60405180910390fd5b61029c610524565b6101bb61056a565b6000546001600160a01b031633146102cf576040516311a8a1bb60e31b815260040160405180910390fd5b6001546001600160a01b0382811691161480156102f457506001600160a01b03811615155b15610312576040516311bc066560e11b815260040160405180910390fd5b6000546001600160a01b0380831691160361034057604051634a2fb73f60e11b815260040160405180910390fd5b610349816105a7565b50565b6001546001600160a01b03163314610377576040516311a7f27160e11b815260040160405180910390fd5b62093a806002544261038991906106a6565b116103a75760405163d39c12bb60e01b815260040160405180910390fd5b6001546101bb906001600160a01b03166105f5565b6000546001600160a01b031633146103e7576040516311a8a1bb60e31b815260040160405180910390fd5b6003546001600160a01b0361010090910481169082160361044a5760405162461bcd60e51b815260206004820152601760248201527f616c72656164792077617463686572206d616e61676572000000000000000000604482015260640161028b565b6040516001600160a01b03821681527fc16d059e43d7f8e29ccb4e001a2f249d3c59e274925d6a6bc3912943441d9f6c9060200160405180910390a150565b60035460ff166101bb5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b604482015260640161028b565b6104da610489565b6003805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b60035460ff16156101bb5760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b604482015260640161028b565b610572610524565b6003805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586105073390565b42600255600180546001600160a01b0319166001600160a01b0383169081179091556040517f6ab4d119f23076e8ad491bc65ce85f017fb0591dce08755ba8591059cc51737a90600090a250565b600080546001600160a01b038381166001600160a01b0319808416821785556002859055600180549091169055604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60006020828403121561066657600080fd5b81356001600160a01b038116811461067d57600080fd5b9392505050565b60006020828403121561069657600080fd5b8151801515811461067d57600080fd5b818103818111156106c757634e487b7160e01b600052601160045260246000fd5b9291505056fea2646970667358221220c90e71276ac6a770a6235866e34764b1f8577414d5415fc957a31adf306d713d64736f6c63430008110033";

type WatcherClientConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (xs: WatcherClientConstructorParams): xs is ConstructorParameters<typeof ContractFactory> =>
  xs.length > 1;

export class WatcherClient__factory extends ContractFactory {
  constructor(...args: WatcherClientConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _watcherManager: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<WatcherClient> {
    return super.deploy(_watcherManager, overrides || {}) as Promise<WatcherClient>;
  }
  override getDeployTransaction(
    _watcherManager: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): TransactionRequest {
    return super.getDeployTransaction(_watcherManager, overrides || {});
  }
  override attach(address: string): WatcherClient {
    return super.attach(address) as WatcherClient;
  }
  override connect(signer: Signer): WatcherClient__factory {
    return super.connect(signer) as WatcherClient__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WatcherClientInterface {
    return new utils.Interface(_abi) as WatcherClientInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): WatcherClient {
    return new Contract(address, _abi, signerOrProvider) as WatcherClient;
  }
}
