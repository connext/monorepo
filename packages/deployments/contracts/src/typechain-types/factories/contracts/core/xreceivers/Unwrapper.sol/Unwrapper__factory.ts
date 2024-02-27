/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  Unwrapper,
  UnwrapperInterface,
} from "../../../../../contracts/core/xreceivers/Unwrapper.sol/Unwrapper";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "connext",
        type: "address",
      },
      {
        internalType: "address",
        name: "wrapper",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
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
    name: "ProposedOwnable__ownershipDelayElapsed_delayNotElapsed",
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
        indexed: false,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FundsDelivered",
    type: "event",
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
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "asset",
        type: "address",
      },
    ],
    name: "WrongAsset",
    type: "event",
  },
  {
    inputs: [],
    name: "CONNEXT",
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
    name: "WRAPPER",
    outputs: [
      {
        internalType: "contract IWrapper",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
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
        name: "recipient",
        type: "address",
      },
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "sweep",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "unwrapAndSweep",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
      {
        internalType: "bytes",
        name: "callData",
        type: "bytes",
      },
    ],
    name: "xReceive",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x60c060405234801561001057600080fd5b50604051610e83380380610e8383398101604081905261002f916100d0565b6100383361004f565b6001600160a01b0390811660a05216608052610103565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b039092166001600160a01b0319928316178155600255600180549091169055565b80516001600160a01b03811681146100cb57600080fd5b919050565b600080604083850312156100e357600080fd5b6100ec836100b4565b91506100fa602084016100b4565b90509250929050565b60805160a051610d3f610144600039600081816102570152818161057d015281816106ba015261076b01526000818161018701526105fe0152610d3f6000f3fe6080604052600436106100c65760003560e01c8063b1f8100d1161007f578063d232c22011610059578063d232c220146101fc578063e03720c014610225578063e1eb13c114610245578063fd614f411461027957600080fd5b8063b1f8100d146101a9578063c5b350df146101c9578063d1851c92146101de57600080fd5b80633cf52ffb146100d257806362c06767146100f65780636a42b8f814610118578063715018a61461012e5780638da5cb5b1461014357806392f75cb21461017557600080fd5b366100cd57005b600080fd5b3480156100de57600080fd5b506002545b6040519081526020015b60405180910390f35b34801561010257600080fd5b50610116610111366004610aaa565b6102a6565b005b34801561012457600080fd5b5062093a806100e3565b34801561013a57600080fd5b50610116610327565b34801561014f57600080fd5b506000546001600160a01b03165b6040516001600160a01b0390911681526020016100ed565b34801561018157600080fd5b5061015d7f000000000000000000000000000000000000000000000000000000000000000081565b3480156101b557600080fd5b506101166101c4366004610aeb565b6103db565b3480156101d557600080fd5b5061011661047c565b3480156101ea57600080fd5b506001546001600160a01b031661015d565b34801561020857600080fd5b506000546040516001600160a01b039091161581526020016100ed565b34801561023157600080fd5b50610116610240366004610b0f565b6104ec565b34801561025157600080fd5b5061015d7f000000000000000000000000000000000000000000000000000000000000000081565b34801561028557600080fd5b50610299610294366004610b51565b6105f1565b6040516100ed9190610c55565b6000546001600160a01b031633146102d1576040516311a8a1bb60e31b815260040160405180910390fd5b806000036103175760405162461bcd60e51b815260206004820152600e60248201526d1cddd9595c0e8808585b5bdd5b9d60921b60448201526064015b60405180910390fd5b6103228383836107e7565b505050565b6000546001600160a01b03163314610352576040516311a8a1bb60e31b815260040160405180910390fd5b62093a80600254426103649190610ca3565b11610382576040516324e0285f60e21b815260040160405180910390fd5b6002546000036103a557604051630e4b303f60e21b815260040160405180910390fd5b6001546001600160a01b0316156103cf576040516323295ef960e01b815260040160405180910390fd5b6103d960006108c9565b565b6000546001600160a01b03163314610406576040516311a8a1bb60e31b815260040160405180910390fd5b6001546001600160a01b038281169116148015610424575060025415155b15610442576040516311bc066560e11b815260040160405180910390fd5b6000546001600160a01b0380831691160361047057604051634a2fb73f60e11b815260040160405180910390fd5b6104798161092e565b50565b6001546001600160a01b031633146104a7576040516311a7f27160e11b815260040160405180910390fd5b62093a80600254426104b99190610ca3565b116104d7576040516324e0285f60e21b815260040160405180910390fd5b6001546103d9906001600160a01b03166108c9565b6000546001600160a01b03163314610517576040516311a8a1bb60e31b815260040160405180910390fd5b806000036105675760405162461bcd60e51b815260206004820152601760248201527f756e77726170416e6453776565703a2021616d6f756e74000000000000000000604482015260640161030e565b604051632e1a7d4d60e01b8152600481018290527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690632e1a7d4d90602401600060405180830381600087803b1580156105c957600080fd5b505af11580156105dd573d6000803e3d6000fd5b505050506105ed826000836107e7565b5050565b6060336001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161461065e5760405162461bcd60e51b815260206004820152601060248201526f1d5b9ddc985c0e880858dbdb9b995e1d60821b604482015260640161030e565b856000036106a05760405162461bcd60e51b815260206004820152600f60248201526e1d5b9ddc985c0e8808585b5bdd5b9d608a1b604482015260640161030e565b6000828060200190518101906106b69190610cca565b90507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316866001600160a01b03161461075557604080516001600160a01b038084168252881660208201527f9f79eedfea1da16b88bd43866c5385861173a9895ac74e1628662f7f2192962e910160405180910390a161073f8187896107e7565b50506040805160208101909152600081526107dd565b604051632e1a7d4d60e01b8152600481018890527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690632e1a7d4d90602401600060405180830381600087803b1580156107b757600080fd5b505af11580156107cb573d6000803e3d6000fd5b505050506107db816000896107e7565b505b9695505050505050565b6001600160a01b038216610804576107ff838261097c565b610879565b60405163a9059cbb60e01b81526001600160a01b0384811660048301526024820183905283169063a9059cbb906044016020604051808303816000875af1158015610853573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108779190610ce7565b505b604080516001600160a01b038086168252841660208201529081018290527f91ebf95f2932ae1bb84918555319ba9cf24fd2359b03932337af5599f2553fa99060600160405180910390a1505050565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b039092166001600160a01b0319928316178155600255600180549091169055565b42600255600180546001600160a01b0319166001600160a01b0383169081179091556040517f6ab4d119f23076e8ad491bc65ce85f017fb0591dce08755ba8591059cc51737a90600090a250565b804710156109cc5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a20696e73756666696369656e742062616c616e6365000000604482015260640161030e565b6000826001600160a01b03168260405160006040518083038185875af1925050503d8060008114610a19576040519150601f19603f3d011682016040523d82523d6000602084013e610a1e565b606091505b50509050806103225760405162461bcd60e51b815260206004820152603a60248201527f416464726573733a20756e61626c6520746f2073656e642076616c75652c207260448201527f6563697069656e74206d61792068617665207265766572746564000000000000606482015260840161030e565b6001600160a01b038116811461047957600080fd5b600080600060608486031215610abf57600080fd5b8335610aca81610a95565b92506020840135610ada81610a95565b929592945050506040919091013590565b600060208284031215610afd57600080fd5b8135610b0881610a95565b9392505050565b60008060408385031215610b2257600080fd5b8235610b2d81610a95565b946020939093013593505050565b634e487b7160e01b600052604160045260246000fd5b60008060008060008060c08789031215610b6a57600080fd5b86359550602087013594506040870135610b8381610a95565b93506060870135610b9381610a95565b9250608087013563ffffffff81168114610bac57600080fd5b915060a087013567ffffffffffffffff80821115610bc957600080fd5b818901915089601f830112610bdd57600080fd5b813581811115610bef57610bef610b3b565b604051601f8201601f19908116603f01168101908382118183101715610c1757610c17610b3b565b816040528281528c6020848701011115610c3057600080fd5b8260208601602083013760006020848301015280955050505050509295509295509295565b600060208083528351808285015260005b81811015610c8257858101830151858201604001528201610c66565b506000604082860101526040601f19601f8301168501019250505092915050565b81810381811115610cc457634e487b7160e01b600052601160045260246000fd5b92915050565b600060208284031215610cdc57600080fd5b8151610b0881610a95565b600060208284031215610cf957600080fd5b81518015158114610b0857600080fdfea2646970667358221220f6b28a7547d9416268a270b6b949192890b994c51b055287f898d24006f507bb64736f6c63430008110033";

type UnwrapperConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: UnwrapperConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Unwrapper__factory extends ContractFactory {
  constructor(...args: UnwrapperConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    connext: PromiseOrValue<string>,
    wrapper: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Unwrapper> {
    return super.deploy(
      connext,
      wrapper,
      overrides || {}
    ) as Promise<Unwrapper>;
  }
  override getDeployTransaction(
    connext: PromiseOrValue<string>,
    wrapper: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(connext, wrapper, overrides || {});
  }
  override attach(address: string): Unwrapper {
    return super.attach(address) as Unwrapper;
  }
  override connect(signer: Signer): Unwrapper__factory {
    return super.connect(signer) as Unwrapper__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UnwrapperInterface {
    return new utils.Interface(_abi) as UnwrapperInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Unwrapper {
    return new Contract(address, _abi, signerOrProvider) as Unwrapper;
  }
}
