/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  RootManager,
  RootManagerInterface,
} from "../../../../contracts/core/messaging/RootManager";

const _abi = [
  {
    inputs: [],
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
        indexed: false,
        internalType: "uint32",
        name: "domain",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "connector",
        type: "address",
      },
    ],
    name: "ConnectorAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint32",
        name: "domain",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "connector",
        type: "address",
      },
    ],
    name: "ConnectorRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint32",
        name: "domain",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "outboundRoot",
        type: "bytes32",
      },
    ],
    name: "OutboundRootUpdated",
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
        name: "watcher",
        type: "address",
      },
    ],
    name: "WatcherAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "watcher",
        type: "address",
      },
    ],
    name: "WatcherRemoved",
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
    inputs: [
      {
        internalType: "uint32",
        name: "_domain",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "_connector",
        type: "address",
      },
    ],
    name: "addConnector",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_watcher",
        type: "address",
      },
    ],
    name: "addWatcher",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    name: "connectors",
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
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "domains",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    name: "outboundRoots",
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
    name: "propagate",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [
      {
        internalType: "uint32",
        name: "_domain",
        type: "uint32",
      },
    ],
    name: "removeConnector",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_watcher",
        type: "address",
      },
    ],
    name: "removeWatcher",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "uint32",
        name: "_domain",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "_outbound",
        type: "bytes32",
      },
    ],
    name: "setOutboundRoot",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "watchers",
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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061001a3361001f565b61007e565b600080546001600160a01b038381166001600160a01b0319808416821785556002859055600180549091169055604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b610d4d8061008d6000396000f3fe608060405234801561001057600080fd5b50600436106101165760003560e01c8063b1f8100d116100a2578063c5b350df11610071578063c5b350df14610262578063d1851c921461026a578063d232c2201461027b578063e6f1208d1461028d578063ec2b1345146102a057600080fd5b8063b1f8100d1461020b578063b904670f1461021e578063c14bad4a14610231578063c54609121461025a57600080fd5b80636a42b8f8116100e95780636a42b8f8146101a2578063715018a6146101ab578063765a6095146101b357806378ffd0a1146101d35780638da5cb5b146101e657600080fd5b806324bdff8c1461011b5780633cf52ffb14610130578063596150d71461014757806366cf8fab1461017a575b600080fd5b61012e610129366004610b83565b6102b3565b005b6002545b6040519081526020015b60405180910390f35b61016a610155366004610b83565b60066020526000908152604090205460ff1681565b604051901515815260200161013e565b61018d610188366004610ba5565b610339565b60405163ffffffff909116815260200161013e565b62093a80610134565b61012e610373565b6101346101c1366004610bd2565b60046020526000908152604090205481565b61012e6101e1366004610bed565b610432565b6000546001600160a01b03165b6040516001600160a01b03909116815260200161013e565b61012e610219366004610b83565b6104ea565b61012e61022c366004610c17565b610592565b6101f361023f366004610bd2565b6003602052600090815260409020546001600160a01b031681565b61012e61067d565b61012e6107e1565b6001546001600160a01b03166101f3565b6000546001600160a01b03161561016a565b61012e61029b366004610bd2565b61083c565b61012e6102ae366004610b83565b610a3e565b6000546001600160a01b031633146102de576040516311a8a1bb60e31b815260040160405180910390fd5b6001600160a01b038116600081815260066020908152604091829020805460ff1916600117905590519182527fbd71030f437353231b6e5bedade573b1e0da5cb6e8bdde37c33c1fea986c29c791015b60405180910390a150565b6005818154811061034957600080fd5b9060005260206000209060089182820401919006600402915054906101000a900463ffffffff1681565b6000546001600160a01b0316331461039e576040516311a8a1bb60e31b815260040160405180910390fd5b6002546000036103c157604051630e4b303f60e21b815260040160405180910390fd5b62093a80600254426103d39190610c60565b116103f1576040516386d4b3f160e01b815260040160405180910390fd5b6001546001600160a01b03161561041b576040516323295ef960e01b815260040160405180910390fd5b600154610430906001600160a01b0316610aba565b565b63ffffffff821660009081526003602052604090205482906001600160a01b031633146104935760405162461bcd60e51b815260206004820152600a60248201526910b1b7b73732b1ba37b960b11b60448201526064015b60405180910390fd5b63ffffffff8316600081815260046020908152604091829020859055815192835282018490527fb2a03565e1fcba9e74dcf22ce00df9588c4903ede1bd443605ba8385dcd99e3891015b60405180910390a1505050565b6000546001600160a01b03163314610515576040516311a8a1bb60e31b815260040160405180910390fd5b6001546001600160a01b03828116911614801561053a57506001600160a01b03811615155b15610558576040516311bc066560e11b815260040160405180910390fd5b6000546001600160a01b0380831691160361058657604051634a2fb73f60e11b815260040160405180910390fd5b61058f81610b19565b50565b6000546001600160a01b031633146105bd576040516311a8a1bb60e31b815260040160405180910390fd5b63ffffffff828116600081815260036020908152604080832080546001600160a01b0319166001600160a01b0388169081179091556005805460018101825594527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db06008850401805460079095166004026101000a968702199094169585029590951790925581519283528201929092527fffe1880f946ecead1a35ac14f99c782cacaa440f95493896794dabacf8f95c54910160405180910390a15050565b600060046000600560008154811061069757610697610c77565b90600052602060002090600891828204019190066004029054906101000a900463ffffffff1663ffffffff1663ffffffff168152602001908152602001600020546040516020016106ea91815260200190565b604051602081830303815290604052905060005b60055460ff821610156107dd5760006003600060058460ff168154811061072757610727610c77565b6000918252602080832060088304015460079092166004026101000a90910463ffffffff1683528201929092526040019020546001600160a01b0316905080156107ca5760405163848d940760e01b81526001600160a01b0382169063848d940790610797908690600401610c8d565b600060405180830381600087803b1580156107b157600080fd5b505af11580156107c5573d6000803e3d6000fd5b505050505b50806107d581610ce2565b9150506106fe565b5050565b6001546001600160a01b0316331461080c576040516311a7f27160e11b815260040160405180910390fd5b62093a806002544261081e9190610c60565b1161041b5760405163d39c12bb60e01b815260040160405180910390fd5b3360009081526006602052604090205460ff166108865760405162461bcd60e51b815260206004820152600860248201526710bbb0ba31b432b960c11b604482015260640161048a565b63ffffffff8116600090815260036020526040812080546001600160a01b03198116909155600580546001600160a01b0390921692916108c890600190610c60565b815481106108d8576108d8610c77565b60009182526020822060088204015460079091166004026101000a900463ffffffff1691505b60055460ff821610156109b2578363ffffffff1660058260ff168154811061092857610928610c77565b6000918252602090912060088204015460079091166004026101000a900463ffffffff16036109a0578160058260ff168154811061096857610968610c77565b90600052602060002090600891828204019190066004026101000a81548163ffffffff021916908363ffffffff1602179055506109b2565b806109aa81610ce2565b9150506108fe565b5060058054806109c4576109c4610d01565b600082815260209020600860001990920191820401805463ffffffff600460078516026101000a021916905590556040517fb576e68aeacfc9a4973bc2ac5c7ea7e6662b78809d33443fed101e04ceb7c9d4906104dd908590859063ffffffff9290921682526001600160a01b0316602082015260400190565b6000546001600160a01b03163314610a69576040516311a8a1bb60e31b815260040160405180910390fd5b6001600160a01b038116600081815260066020908152604091829020805460ff1916905590519182527ffa8eab6357bec870e7048c2413cbaa813236bb29ebac113541a76fef429e94dc910161032e565b600080546001600160a01b038381166001600160a01b0319808416821785556002859055600180549091169055604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b42600255600180546001600160a01b0319166001600160a01b0383169081179091556040517f6ab4d119f23076e8ad491bc65ce85f017fb0591dce08755ba8591059cc51737a90600090a250565b80356001600160a01b0381168114610b7e57600080fd5b919050565b600060208284031215610b9557600080fd5b610b9e82610b67565b9392505050565b600060208284031215610bb757600080fd5b5035919050565b803563ffffffff81168114610b7e57600080fd5b600060208284031215610be457600080fd5b610b9e82610bbe565b60008060408385031215610c0057600080fd5b610c0983610bbe565b946020939093013593505050565b60008060408385031215610c2a57600080fd5b610c3383610bbe565b9150610c4160208401610b67565b90509250929050565b634e487b7160e01b600052601160045260246000fd5b600082821015610c7257610c72610c4a565b500390565b634e487b7160e01b600052603260045260246000fd5b600060208083528351808285015260005b81811015610cba57858101830151858201604001528201610c9e565b81811115610ccc576000604083870101525b50601f01601f1916929092016040019392505050565b600060ff821660ff8103610cf857610cf8610c4a565b60010192915050565b634e487b7160e01b600052603160045260246000fdfea264697066735822122033ec8734dcd133769b6432f9c3786fc402b19fd6e89bacaa76a14371b5450ab764736f6c634300080f0033";

type RootManagerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RootManagerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class RootManager__factory extends ContractFactory {
  constructor(...args: RootManagerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<RootManager> {
    return super.deploy(overrides || {}) as Promise<RootManager>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): RootManager {
    return super.attach(address) as RootManager;
  }
  override connect(signer: Signer): RootManager__factory {
    return super.connect(signer) as RootManager__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RootManagerInterface {
    return new utils.Interface(_abi) as RootManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RootManager {
    return new Contract(address, _abi, signerOrProvider) as RootManager;
  }
}
