/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  ZkSyncHubConnector,
  ZkSyncHubConnectorInterface,
} from "../../../../../contracts/messaging/connectors/zksync/ZkSyncHubConnector";

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
        name: "_stateCommitmentChain",
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
    inputs: [],
    name: "TypedMemView__index_indexMoreThan32Bytes",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "loc",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "len",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "slice",
        type: "uint256",
      },
    ],
    name: "TypedMemView__index_overrun",
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
        internalType: "uint32",
        name: "_l2BlockNumber",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "_l2MessageIndex",
        type: "uint256",
      },
      {
        internalType: "uint16",
        name: "_l2TxNumberInBlock",
        type: "uint16",
      },
      {
        internalType: "bytes",
        name: "_message",
        type: "bytes",
      },
      {
        internalType: "bytes32[]",
        name: "_proof",
        type: "bytes32[]",
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
];

const _bytecode =
  "0x6101006040523480156200001257600080fd5b50604051620019b9380380620019b98339810160408190526200003591620002dc565b80878787878784848484846200004b336200019b565b8463ffffffff16600003620000965760405162461bcd60e51b815260206004820152600c60248201526b32b6b83a3c903237b6b0b4b760a11b60448201526064015b60405180910390fd5b6001600160a01b038216620000e25760405162461bcd60e51b815260206004820152601160248201527032b6b83a3c903937b7ba26b0b730b3b2b960791b60448201526064016200008d565b63ffffffff8086166080526001600160a01b0380851660a05283811660c05290851660e0528116156200011a576200011a8162000200565b604080516001600160a01b0385811682528481166020830152831681830152905163ffffffff86811692908816917f4f9c27c2fe3f84576ea469d367d044da53c45e951617e8389f2b5ed8db9d25f09181900360600190a3505050505050505050506200018d816200026960201b60201c565b505050505050505062000368565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b039092166001600160a01b0319928316178155600255600180549091169055565b600354604080516001600160a01b03928316815291831660208301527fc77bec288fc88f168427f2f7da682eadb26cac89d8d591af6e443da98dff2bbc910160405180910390a1600380546001600160a01b0319166001600160a01b0392909216919091179055565b60045460408051918252602082018390527f877a02cb809da0364d23adca3cd50c451b53f279d3df632e1fc11eb66335bce5910160405180910390a1600455565b805163ffffffff81168114620002bf57600080fd5b919050565b80516001600160a01b0381168114620002bf57600080fd5b600080600080600080600060e0888a031215620002f857600080fd5b6200030388620002aa565b96506200031360208901620002aa565b95506200032360408901620002c4565b94506200033360608901620002c4565b93506200034360808901620002c4565b92506200035360a08901620002c4565b915060c0880151905092959891949750929550565b60805160a05160c05160e0516115e6620003d36000396000818161014101526109d50152600081816102370152818161042b0152610a100152600081816103be015281816104e00152818161081f01528181610b9b0152610c51015260006101e301526115e66000f3fe6080604052600436106101235760003560e01c80638da5cb5b116100a0578063d1851c9211610064578063d1851c921461036f578063d232c2201461038d578063d69f9d61146103ac578063db1b7659146103e0578063e92a492f1461040057600080fd5b80638da5cb5b146102bc578063b1f8100d146102da578063c1f0808a146102fa578063c5b350df1461033a578063cc3942831461034f57600080fd5b80635bd11efc116100e75780635bd11efc146102055780635f61e3ec146102255780636a42b8f814610271578063715018a6146102875780637850b0201461029c57600080fd5b8063141684161461012f5780633cf52ffb1461017d57806348e6fa231461019c5780634ff746f6146101b157806352a9674b146101d157600080fd5b3661012a57005b600080fd5b34801561013b57600080fd5b506101637f000000000000000000000000000000000000000000000000000000000000000081565b60405163ffffffff90911681526020015b60405180910390f35b34801561018957600080fd5b506002545b604051908152602001610174565b6101af6101aa366004611119565b610420565b005b3480156101bd57600080fd5b506101af6101cc36600461117d565b6104d5565b3480156101dd57600080fd5b506101637f000000000000000000000000000000000000000000000000000000000000000081565b34801561021157600080fd5b506101af6102203660046111ba565b610572565b34801561023157600080fd5b506102597f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b039091168152602001610174565b34801561027d57600080fd5b5062093a8061018e565b34801561029357600080fd5b506101af6105a9565b3480156102a857600080fd5b506101af6102b73660046111e3565b61065d565b3480156102c857600080fd5b506000546001600160a01b0316610259565b3480156102e657600080fd5b506101af6102f53660046111ba565b610691565b34801561030657600080fd5b5061032a6103153660046111e3565b60056020526000908152604090205460ff1681565b6040519015158152602001610174565b34801561034657600080fd5b506101af61072f565b34801561035b57600080fd5b50600354610259906001600160a01b031681565b34801561037b57600080fd5b506001546001600160a01b0316610259565b34801561039957600080fd5b506000546001600160a01b03161561032a565b3480156103b857600080fd5b506102597f000000000000000000000000000000000000000000000000000000000000000081565b3480156103ec57600080fd5b5061032a6103fb3660046111ba565b61079f565b34801561040c57600080fd5b506101af61041b36600461128a565b6107a9565b336001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161461048c5760405162461bcd60e51b815260206004820152600c60248201526b10b937b7ba26b0b730b3b2b960a11b60448201526064015b60405180910390fd5b6104968282610a7b565b7fdcaa37a042a0087de79018c629bbd29cee82ca80bd9be394e1696bf9e93550778282336040516104c99392919061137f565b60405180910390a15050565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146105365760405162461bcd60e51b81526004016104839060208082526004908201526310a0a6a160e11b604082015260600190565b7fb3abc57bfeebd2cac918901db582f71972a8e628bccf19f5ae3e3482b98a5ced81336040516105679291906113bd565b60405180910390a150565b6000546001600160a01b0316331461059d576040516311a8a1bb60e31b815260040160405180910390fd5b6105a681610d21565b50565b6000546001600160a01b031633146105d4576040516311a8a1bb60e31b815260040160405180910390fd5b6002546000036105f757604051630e4b303f60e21b815260040160405180910390fd5b62093a806002544261060991906113fd565b11610627576040516386d4b3f160e01b815260040160405180910390fd5b6001546001600160a01b031615610651576040516323295ef960e01b815260040160405180910390fd5b61065b6000610d8a565b565b6000546001600160a01b03163314610688576040516311a8a1bb60e31b815260040160405180910390fd5b6105a681610def565b6000546001600160a01b031633146106bc576040516311a8a1bb60e31b815260040160405180910390fd5b6001546001600160a01b0382811691161480156106da575060025415155b156106f8576040516311bc066560e11b815260040160405180910390fd5b6000546001600160a01b0380831691160361072657604051634a2fb73f60e11b815260040160405180910390fd5b6105a681610e30565b6001546001600160a01b0316331461075a576040516311a7f27160e11b815260040160405180910390fd5b62093a806002544261076c91906113fd565b1161078a5760405163d39c12bb60e01b815260040160405180910390fd5b60015461065b906001600160a01b0316610d8a565b6000805b92915050565b602483146107e35760405162461bcd60e51b8152602060048201526007602482015266042d8cadccee8d60cb1b6044820152606401610483565b6040805160608101825261ffff871681526003546001600160a01b03166020808301919091528251601f870182900482028101820184528681527f0000000000000000000000000000000000000000000000000000000000000000936000939290830191908990899081908401838280828437600092018290525093909452505060405163e4948f4360e01b8152929350916001600160a01b038516915063e4948f439061089d908d908d9087908b908b90600401611410565b602060405180830381865afa1580156108ba573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108de9190611499565b9050806109175760405162461bcd60e51b815260206004820152600760248201526610b83937bb32b760c91b6044820152606401610483565b600061095d600089898080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509293925050610e7e9050565b9050600061099461097c6020601885901c6001600160601b03166114bb565b62ffffff198416906001600160601b03166020610ea2565b60008181526005602052604090205490915060ff16610a6d5760008181526005602052604090819020805460ff191660011790555163473ec9fd60e11b81527f000000000000000000000000000000000000000000000000000000000000000063ffffffff166004820152602481018290526001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690638e7d93fa90604401600060405180830381600087803b158015610a5457600080fd5b505af1158015610a68573d6000803e3d6000fd5b505050505b505050505050505050505050565b8051602014610abb5760405162461bcd60e51b815260206004820152600c60248201526b042c8c2e8c240d8cadccee8d60a31b6044820152606401610483565b8151602014610af65760405162461bcd60e51b8152602060048201526007602482015266042d8cadccee8d60cb1b6044820152606401610483565b6000634ff746f660e01b83604051602401610b1191906114e2565b604051602081830303815290604052906001600160e01b0319166020820180516001600160e01b0383818316178352505050509050600082806020019051810190610b5c91906114f5565b90506127106000610b6c34610fb1565b8451604051632e6b3b8f60e11b8152600481018690526024810185905263ffffffff90911660448201529091507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690635cd6771e90606401602060405180830381865afa158015610bea573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c0e91906114f5565b8111610c445760405162461bcd60e51b8152602060048201526005602482015264216665657360d81b6044820152606401610483565b6003546001600160a01b037f000000000000000000000000000000000000000000000000000000000000000081169163725ad850918491166000888782604051908082528060200260200182016040528015610cb457816020015b6060815260200190600190039081610c9f5790505b506040518763ffffffff1660e01b8152600401610cd595949392919061150e565b60206040518083038185885af1158015610cf3573d6000803e3d6000fd5b50505050506040513d601f19601f82011682018060405250810190610d1891906114f5565b50505050505050565b600354604080516001600160a01b03928316815291831660208301527fc77bec288fc88f168427f2f7da682eadb26cac89d8d591af6e443da98dff2bbc910160405180910390a1600380546001600160a01b0319166001600160a01b0392909216919091179055565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b039092166001600160a01b0319928316178155600255600180549091169055565b60045460408051918252602082018390527f877a02cb809da0364d23adca3cd50c451b53f279d3df632e1fc11eb66335bce5910160405180910390a1600455565b42600255600180546001600160a01b0319166001600160a01b0383169081179091556040517f6ab4d119f23076e8ad491bc65ce85f017fb0591dce08755ba8591059cc51737a90600090a250565b815160009060208401610e9964ffffffffff85168284610fc7565b95945050505050565b60008160ff16600003610eb757506000610faa565b610eca8460181c6001600160601b031690565b6001600160601b0316610ee060ff84168561159d565b1115610f4857610ef98460781c6001600160601b031690565b610f0c8560181c6001600160601b031690565b6040516378218d2960e01b81526001600160601b039283166004820152911660248201526044810184905260ff83166064820152608401610483565b60208260ff161115610f6d5760405163045df3f960e01b815260040160405180910390fd5b600882026000610f868660781c6001600160601b031690565b6001600160601b031690506000600160ff1b60001984011d91860151909116925050505b9392505050565b6000600454821115610fc35760045491505b5090565b600080610fd4838561159d565b9050604051811115610fe4575060005b80600003610ff95762ffffff19915050610faa565b610e9985858560006060601883856001600160601b03821682148015611027575086816001600160601b0316145b6110605760405162461bcd60e51b815260206004820152600a602482015269085d1c9d5b98d85d195960b21b6044820152606401610483565b96831b90961790911b90941790931b9392505050565b634e487b7160e01b600052604160045260246000fd5b600082601f83011261109d57600080fd5b813567ffffffffffffffff808211156110b8576110b8611076565b604051601f8301601f19908116603f011681019082821181831017156110e0576110e0611076565b816040528381528660208588010111156110f957600080fd5b836020870160208301376000602085830101528094505050505092915050565b6000806040838503121561112c57600080fd5b823567ffffffffffffffff8082111561114457600080fd5b6111508683870161108c565b9350602085013591508082111561116657600080fd5b506111738582860161108c565b9150509250929050565b60006020828403121561118f57600080fd5b813567ffffffffffffffff8111156111a657600080fd5b6111b28482850161108c565b949350505050565b6000602082840312156111cc57600080fd5b81356001600160a01b0381168114610faa57600080fd5b6000602082840312156111f557600080fd5b5035919050565b60008083601f84011261120e57600080fd5b50813567ffffffffffffffff81111561122657600080fd5b60208301915083602082850101111561123e57600080fd5b9250929050565b60008083601f84011261125757600080fd5b50813567ffffffffffffffff81111561126f57600080fd5b6020830191508360208260051b850101111561123e57600080fd5b600080600080600080600060a0888a0312156112a557600080fd5b873563ffffffff811681146112b957600080fd5b965060208801359550604088013561ffff811681146112d757600080fd5b9450606088013567ffffffffffffffff808211156112f457600080fd5b6113008b838c016111fc565b909650945060808a013591508082111561131957600080fd5b506113268a828b01611245565b989b979a50959850939692959293505050565b6000815180845260005b8181101561135f57602081850181015186830182015201611343565b506000602082860101526020601f19601f83011685010191505092915050565b6060815260006113926060830186611339565b82810360208401526113a48186611339565b91505060018060a01b0383166040830152949350505050565b6040815260006113d06040830185611339565b905060018060a01b03831660208301529392505050565b634e487b7160e01b600052601160045260246000fd5b818103818111156107a3576107a36113e7565b63ffffffff861681528460208201526080604082015261ffff845116608082015260018060a01b0360208501511660a082015260006040850151606060c084015261145e60e0840182611339565b838103606085015284815290506001600160fb1b0384111561147f57600080fd5b8360051b8086602084013701602001979650505050505050565b6000602082840312156114ab57600080fd5b81518015158114610faa57600080fd5b6001600160601b038281168282160390808211156114db576114db6113e7565b5092915050565b602081526000610faa6020830184611339565b60006020828403121561150757600080fd5b5051919050565b60018060a01b038616815260006020868184015260a0604084015261153660a0840187611339565b85606085015283810360808501528085518083528383019150838160051b84010184880160005b8381101561158b57601f19868403018552611579838351611339565b9487019492509086019060010161155d565b50909c9b505050505050505050505050565b808201808211156107a3576107a36113e756fea26469706673582212206827f878534967025a9033c6fc38b5a370d349bcc9ebb0ed754c2df282c5db8b64736f6c63430008110033";

type ZkSyncHubConnectorConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ZkSyncHubConnectorConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ZkSyncHubConnector__factory extends ContractFactory {
  constructor(...args: ZkSyncHubConnectorConstructorParams) {
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
    _stateCommitmentChain: PromiseOrValue<string>,
    _gasCap: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ZkSyncHubConnector> {
    return super.deploy(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _stateCommitmentChain,
      _gasCap,
      overrides || {}
    ) as Promise<ZkSyncHubConnector>;
  }
  override getDeployTransaction(
    _domain: PromiseOrValue<BigNumberish>,
    _mirrorDomain: PromiseOrValue<BigNumberish>,
    _amb: PromiseOrValue<string>,
    _rootManager: PromiseOrValue<string>,
    _mirrorConnector: PromiseOrValue<string>,
    _stateCommitmentChain: PromiseOrValue<string>,
    _gasCap: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _stateCommitmentChain,
      _gasCap,
      overrides || {}
    );
  }
  override attach(address: string): ZkSyncHubConnector {
    return super.attach(address) as ZkSyncHubConnector;
  }
  override connect(signer: Signer): ZkSyncHubConnector__factory {
    return super.connect(signer) as ZkSyncHubConnector__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ZkSyncHubConnectorInterface {
    return new utils.Interface(_abi) as ZkSyncHubConnectorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ZkSyncHubConnector {
    return new Contract(address, _abi, signerOrProvider) as ZkSyncHubConnector;
  }
}
