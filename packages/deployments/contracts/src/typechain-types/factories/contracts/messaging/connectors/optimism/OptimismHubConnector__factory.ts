/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, BigNumberish, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  OptimismHubConnector,
  OptimismHubConnectorInterface,
} from "../../../../../contracts/messaging/connectors/optimism/OptimismHubConnector";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_domain",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "_mirrorDomain",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "_amb",
        type: "address",
      },
      {
        internalType: "address",
        name: "_rootManager",
        type: "address",
      },
      {
        internalType: "address",
        name: "_mirrorConnector",
        type: "address",
      },
      {
        internalType: "address",
        name: "_optimismPortal",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_gasCap",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "Connector__processMessage_notUsed",
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
        internalType: "uint256",
        name: "_previous",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_updated",
        type: "uint256",
      },
    ],
    name: "GasCapUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "MessageProcessed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "encodedData",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "MessageSent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previous",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "current",
        type: "address",
      },
    ],
    name: "MirrorConnectorUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint32",
        name: "domain",
        type: "uint32",
      },
      {
        indexed: true,
        internalType: "uint32",
        name: "mirrorDomain",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "amb",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "rootManager",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "mirrorConnector",
        type: "address",
      },
    ],
    name: "NewConnector",
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
    inputs: [],
    name: "AMB",
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
    name: "DOMAIN",
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
    inputs: [],
    name: "MIRROR_DOMAIN",
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
    inputs: [],
    name: "OPTIMISM_PORTAL",
    outputs: [
      {
        internalType: "contract IOptimismPortal",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ROOT_MANAGER",
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
    name: "gasCap",
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
    name: "mirrorConnector",
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
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "processMessage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "gasLimit",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct Types.WithdrawalTransaction",
        name: "_tx",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "_l2OutputIndex",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "bytes32",
            name: "version",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "stateRoot",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "messagePasserStorageRoot",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "latestBlockhash",
            type: "bytes32",
          },
        ],
        internalType: "struct Types.OutputRootProof",
        name: "_outputRootProof",
        type: "tuple",
      },
      {
        internalType: "bytes[]",
        name: "_withdrawalProof",
        type: "bytes[]",
      },
    ],
    name: "processMessageFromRoot",
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
    ],
    name: "processed",
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
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "_encodedData",
        type: "bytes",
      },
    ],
    name: "sendMessage",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gasCap",
        type: "uint256",
      },
    ],
    name: "setGasCap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_mirrorConnector",
        type: "address",
      },
    ],
    name: "setMirrorConnector",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_expected",
        type: "address",
      },
    ],
    name: "verifySender",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
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
  "0x6101206040523480156200001257600080fd5b5060405162001a5038038062001a508339810160408190526200003591620002eb565b8080888888888884848484846200004c33620001aa565b8463ffffffff16600003620000975760405162461bcd60e51b815260206004820152600c60248201526b32b6b83a3c903237b6b0b4b760a11b60448201526064015b60405180910390fd5b6001600160a01b038216620000e35760405162461bcd60e51b815260206004820152601160248201527032b6b83a3c903937b7ba26b0b730b3b2b960791b60448201526064016200008e565b63ffffffff8086166080526001600160a01b0380851660a05283811660c05290851660e0528116156200011b576200011b816200020f565b604080516001600160a01b0385811682528481166020830152831681830152905163ffffffff86811692908816917f4f9c27c2fe3f84576ea469d367d044da53c45e951617e8389f2b5ed8db9d25f09181900360600190a3505050505050505050506200018e816200027860201b60201c565b5050506001600160a01b03166101005250620003779350505050565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b039092166001600160a01b0319928316178155600255600180549091169055565b600354604080516001600160a01b03928316815291831660208301527fc77bec288fc88f168427f2f7da682eadb26cac89d8d591af6e443da98dff2bbc910160405180910390a1600380546001600160a01b0319166001600160a01b0392909216919091179055565b60045460408051918252602082018390527f877a02cb809da0364d23adca3cd50c451b53f279d3df632e1fc11eb66335bce5910160405180910390a1600455565b805163ffffffff81168114620002ce57600080fd5b919050565b80516001600160a01b0381168114620002ce57600080fd5b600080600080600080600060e0888a0312156200030757600080fd5b6200031288620002b9565b96506200032260208901620002b9565b95506200033260408901620002d3565b94506200034260608901620002d3565b93506200035260808901620002d3565b92506200036260a08901620002d3565b915060c0880151905092959891949750929550565b60805160a05160c05160e05161010051611663620003ed600039600081816102f9015261060801526000818161014c01526107e50152600081816102420152818161046a015261082001526000818161041d0152818161051f01528181610b6f0152610e78015260006101ee01526116636000f3fe60806040526004361061012e5760003560e01c80637850b020116100ab578063c5b350df1161006f578063c5b350df14610399578063cc394283146103ae578063d1851c92146103ce578063d232c220146103ec578063d69f9d611461040b578063db1b76591461043f57600080fd5b80637850b020146102c757806385734ee1146102e75780638da5cb5b1461031b578063b1f8100d14610339578063c1f0808a1461035957600080fd5b80635bd11efc116100f25780635bd11efc146102105780635f61e3ec146102305780636a42b8f81461027c5780637049138f14610292578063715018a6146102b257600080fd5b8063141684161461013a5780633cf52ffb1461018857806348e6fa23146101a75780634ff746f6146101bc57806352a9674b146101dc57600080fd5b3661013557005b600080fd5b34801561014657600080fd5b5061016e7f000000000000000000000000000000000000000000000000000000000000000081565b60405163ffffffff90911681526020015b60405180910390f35b34801561019457600080fd5b506002545b60405190815260200161017f565b6101ba6101b5366004611047565b61045f565b005b3480156101c857600080fd5b506101ba6101d73660046110ab565b610514565b3480156101e857600080fd5b5061016e7f000000000000000000000000000000000000000000000000000000000000000081565b34801561021c57600080fd5b506101ba61022b3660046110fd565b6105ba565b34801561023c57600080fd5b506102647f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b03909116815260200161017f565b34801561028857600080fd5b5062093a80610199565b34801561029e57600080fd5b506101ba6102ad366004611185565b6105f1565b3480156102be57600080fd5b506101ba6108c0565b3480156102d357600080fd5b506101ba6102e236600461127f565b610974565b3480156102f357600080fd5b506102647f000000000000000000000000000000000000000000000000000000000000000081565b34801561032757600080fd5b506000546001600160a01b0316610264565b34801561034557600080fd5b506101ba6103543660046110fd565b6109a8565b34801561036557600080fd5b5061038961037436600461127f565b60056020526000908152604090205460ff1681565b604051901515815260200161017f565b3480156103a557600080fd5b506101ba610a46565b3480156103ba57600080fd5b50600354610264906001600160a01b031681565b3480156103da57600080fd5b506001546001600160a01b0316610264565b3480156103f857600080fd5b506000546001600160a01b031615610389565b34801561041757600080fd5b506102647f000000000000000000000000000000000000000000000000000000000000000081565b34801561044b57600080fd5b5061038961045a3660046110fd565b610ab6565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146104cb5760405162461bcd60e51b815260206004820152600c60248201526b10b937b7ba26b0b730b3b2b960a11b60448201526064015b60405180910390fd5b6104d58282610ac7565b7fdcaa37a042a0087de79018c629bbd29cee82ca80bd9be394e1696bf9e9355077828233604051610508939291906112e8565b60405180910390a15050565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146105755760405162461bcd60e51b81526004016104c29060208082526004908201526310a0a6a160e11b604082015260600190565b61057e81610bde565b7fb3abc57bfeebd2cac918901db582f71972a8e628bccf19f5ae3e3482b98a5ced81336040516105af929190611326565b60405180910390a150565b6000546001600160a01b031633146105e5576040516311a8a1bb60e31b815260040160405180910390fd5b6105ee81610bf7565b50565b604051634870496f60e01b81526001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690634870496f90610645908890889088908890889060040161140b565b600060405180830381600087803b15801561065f57600080fd5b505af1158015610673573d6000803e3d6000fd5b5050505060008060006106898860a00151610c60565b60035494985092965091945050506001600160a01b0380861691161490506106e75760405162461bcd60e51b815260206004820152601160248201527010b6b4b93937b91031b7b73732b1ba37b960791b60448201526064016104c2565b6001600160a01b03821630146107295760405162461bcd60e51b8152602060048201526007602482015266085d185c99d95d60ca1b60448201526064016104c2565b80516020146107645760405162461bcd60e51b8152602060048201526007602482015266042d8cadccee8d60cb1b60448201526064016104c2565b600061076f826114c1565b60008181526005602052604090205490915060ff16156107bd5760405162461bcd60e51b81526020600482015260096024820152681c1c9bd8d95cdcd95960ba1b60448201526064016104c2565b60008181526005602052604090819020805460ff191660011790555163473ec9fd60e11b81527f000000000000000000000000000000000000000000000000000000000000000063ffffffff166004820152602481018290526001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690638e7d93fa90604401600060405180830381600087803b15801561086457600080fd5b505af1158015610878573d6000803e3d6000fd5b505050507fb3abc57bfeebd2cac918901db582f71972a8e628bccf19f5ae3e3482b98a5ced82336040516108ad929190611326565b60405180910390a1505050505050505050565b6000546001600160a01b031633146108eb576040516311a8a1bb60e31b815260040160405180910390fd5b62093a80600254426108fd91906114e5565b1161091b576040516324e0285f60e21b815260040160405180910390fd5b60025460000361093e57604051630e4b303f60e21b815260040160405180910390fd5b6001546001600160a01b031615610968576040516323295ef960e01b815260040160405180910390fd5b6109726000610d7d565b565b6000546001600160a01b0316331461099f576040516311a8a1bb60e31b815260040160405180910390fd5b6105ee81610de2565b6000546001600160a01b031633146109d3576040516311a8a1bb60e31b815260040160405180910390fd5b6001546001600160a01b0382811691161480156109f1575060025415155b15610a0f576040516311bc066560e11b815260040160405180910390fd5b6000546001600160a01b03808316911603610a3d57604051634a2fb73f60e11b815260040160405180910390fd5b6105ee81610e23565b6001546001600160a01b03163314610a71576040516311a7f27160e11b815260040160405180910390fd5b62093a8060025442610a8391906114e5565b11610aa1576040516324e0285f60e21b815260040160405180910390fd5b600154610972906001600160a01b0316610d7d565b6000610ac182610e71565b92915050565b8151602014610b025760405162461bcd60e51b8152602060048201526007602482015266042d8cadccee8d60cb1b60448201526064016104c2565b6000634ff746f660e01b83604051602401610b1d9190611506565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b031990941693909317909252600354600480549351633dbb202b60e01b81529294506001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000811694633dbb202b94610ba79490921692879201611519565b600060405180830381600087803b158015610bc157600080fd5b505af1158015610bd5573d6000803e3d6000fd5b50505050505050565b6040516316c2fdb560e21b815260040160405180910390fd5b600354604080516001600160a01b03928316815291831660208301527fc77bec288fc88f168427f2f7da682eadb26cac89d8d591af6e443da98dff2bbc910160405180910390a1600380546001600160a01b0319166001600160a01b0392909216919091179055565b602081015160009081908190819081906060906001600160e01b0319811663d764ad0b60e01b14610cbf5760405162461bcd60e51b815260206004820152600960248201526810b9b2b632b1ba37b960b91b60448201526064016104c2565b8751600490600090610cd29083906114e5565b905060008167ffffffffffffffff811115610cef57610cef610f59565b6040519080825280601f01601f191660200182016040528015610d19576020820181803683370190505b509050826020018b016020820160005b84811015610d41578281015182820152602001610d29565b50505080806020019051810190610d589190611553565b809a50819b50829c50839d50849e50859f505050505050505050505091939550919395565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b039092166001600160a01b0319928316178155600255600180549091169055565b60045460408051918252602082018390527f877a02cb809da0364d23adca3cd50c451b53f279d3df632e1fc11eb66335bce5910160405180910390a1600455565b42600255600180546001600160a01b0319166001600160a01b0383169081179091556040517f6ab4d119f23076e8ad491bc65ce85f017fb0591dce08755ba8591059cc51737a90600090a250565b6000610ac17f0000000000000000000000000000000000000000000000000000000000000000836000336001600160a01b03841614610edc5760405162461bcd60e51b81526020600482015260076024820152662162726964676560c81b60448201526064016104c2565b816001600160a01b0316836001600160a01b0316636e296e456040518163ffffffff1660e01b8152600401602060405180830381865afa158015610f24573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f489190611610565b6001600160a01b0316149392505050565b634e487b7160e01b600052604160045260246000fd5b60405160c0810167ffffffffffffffff81118282101715610f9257610f92610f59565b60405290565b604051601f8201601f1916810167ffffffffffffffff81118282101715610fc157610fc1610f59565b604052919050565b600067ffffffffffffffff821115610fe357610fe3610f59565b50601f01601f191660200190565b600082601f83011261100257600080fd5b813561101561101082610fc9565b610f98565b81815284602083860101111561102a57600080fd5b816020850160208301376000918101602001919091529392505050565b6000806040838503121561105a57600080fd5b823567ffffffffffffffff8082111561107257600080fd5b61107e86838701610ff1565b9350602085013591508082111561109457600080fd5b506110a185828601610ff1565b9150509250929050565b6000602082840312156110bd57600080fd5b813567ffffffffffffffff8111156110d457600080fd5b6110e084828501610ff1565b949350505050565b6001600160a01b03811681146105ee57600080fd5b60006020828403121561110f57600080fd5b813561111a816110e8565b9392505050565b60006080828403121561113357600080fd5b50919050565b60008083601f84011261114b57600080fd5b50813567ffffffffffffffff81111561116357600080fd5b6020830191508360208260051b850101111561117e57600080fd5b9250929050565b600080600080600060e0868803121561119d57600080fd5b853567ffffffffffffffff808211156111b557600080fd5b9087019060c0828a0312156111c957600080fd5b6111d1610f6f565b8235815260208301356111e3816110e8565b602082015260408301356111f6816110e8565b80604083015250606083013560608201526080830135608082015260a08301358281111561122357600080fd5b61122f8b828601610ff1565b60a08301525096506020880135955061124b8960408a01611121565b945060c088013591508082111561126157600080fd5b5061126e88828901611139565b969995985093965092949392505050565b60006020828403121561129157600080fd5b5035919050565b60005b838110156112b357818101518382015260200161129b565b50506000910152565b600081518084526112d4816020860160208601611298565b601f01601f19169290920160200192915050565b6060815260006112fb60608301866112bc565b828103602084015261130d81866112bc565b91505060018060a01b0383166040830152949350505050565b60408152600061133960408301856112bc565b905060018060a01b03831660208301529392505050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b81835260006020808501808196508560051b810191508460005b878110156113fe5782840389528135601e198836030181126113b457600080fd5b8701858101903567ffffffffffffffff8111156113d057600080fd5b8036038213156113df57600080fd5b6113ea868284611350565b9a87019a9550505090840190600101611393565b5091979650505050505050565b60e080825286519082015260208601516001600160a01b039081166101008301526040870151166101208201526060860151610140820152608086015161016082015260a086015160c061018083015260009061146c6101a08401826112bc565b90508660208401526114a26040840187803582526020810135602083015260408101356040830152606081013560608301525050565b82810360c08401526114b5818587611379565b98975050505050505050565b805160208083015191908110156111335760001960209190910360031b1b16919050565b81810381811115610ac157634e487b7160e01b600052601160045260246000fd5b60208152600061111a60208301846112bc565b6001600160a01b038416815260606020820181905260009061153d908301856112bc565b905063ffffffff83166040830152949350505050565b60008060008060008060c0878903121561156c57600080fd5b86519550602087015161157e816110e8565b604088015190955061158f816110e8565b80945050606087015192506080870151915060a087015167ffffffffffffffff8111156115bb57600080fd5b8701601f810189136115cc57600080fd5b80516115da61101082610fc9565b8181528a60208385010111156115ef57600080fd5b611600826020830160208601611298565b8093505050509295509295509295565b60006020828403121561162257600080fd5b815161111a816110e856fea2646970667358221220307d458f0014224453ca902dec95584e9c2ceae47ad80b90ad0fa46a01af7b7164736f6c63430008110033";

type OptimismHubConnectorConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (xs: OptimismHubConnectorConstructorParams): xs is ConstructorParameters<typeof ContractFactory> =>
  xs.length > 1;

export class OptimismHubConnector__factory extends ContractFactory {
  constructor(...args: OptimismHubConnectorConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _domain: PromiseOrValue<BigNumberish>,
    _mirrorDomain: PromiseOrValue<BigNumberish>,
    _amb: PromiseOrValue<string>,
    _rootManager: PromiseOrValue<string>,
    _mirrorConnector: PromiseOrValue<string>,
    _optimismPortal: PromiseOrValue<string>,
    _gasCap: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<OptimismHubConnector> {
    return super.deploy(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _optimismPortal,
      _gasCap,
      overrides || {},
    ) as Promise<OptimismHubConnector>;
  }
  override getDeployTransaction(
    _domain: PromiseOrValue<BigNumberish>,
    _mirrorDomain: PromiseOrValue<BigNumberish>,
    _amb: PromiseOrValue<string>,
    _rootManager: PromiseOrValue<string>,
    _mirrorConnector: PromiseOrValue<string>,
    _optimismPortal: PromiseOrValue<string>,
    _gasCap: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): TransactionRequest {
    return super.getDeployTransaction(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _optimismPortal,
      _gasCap,
      overrides || {},
    );
  }
  override attach(address: string): OptimismHubConnector {
    return super.attach(address) as OptimismHubConnector;
  }
  override connect(signer: Signer): OptimismHubConnector__factory {
    return super.connect(signer) as OptimismHubConnector__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OptimismHubConnectorInterface {
    return new utils.Interface(_abi) as OptimismHubConnectorInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): OptimismHubConnector {
    return new Contract(address, _abi, signerOrProvider) as OptimismHubConnector;
  }
}
