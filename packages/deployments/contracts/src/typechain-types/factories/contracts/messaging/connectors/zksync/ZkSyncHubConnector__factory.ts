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
        internalType: "uint256",
        name: "_mirrorGas",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_stateCommitmentChain",
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
        indexed: false,
        internalType: "uint256",
        name: "previous",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "current",
        type: "uint256",
      },
    ],
    name: "MirrorGasUpdated",
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
    name: "mirrorGas",
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
    ],
    name: "sendMessage",
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
        internalType: "uint256",
        name: "_mirrorGas",
        type: "uint256",
      },
    ],
    name: "setMirrorGas",
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
];

const _bytecode =
  "0x6101006040523480156200001257600080fd5b50604051620019ee380380620019ee8339810160408190526200003591620002d9565b8686868686868585858585856200004c336200019e565b8563ffffffff16600003620000975760405162461bcd60e51b815260206004820152600c60248201526b32b6b83a3c903237b6b0b4b760a11b60448201526064015b60405180910390fd5b6001600160a01b038316620000e35760405162461bcd60e51b815260206004820152601160248201527032b6b83a3c903937b7ba26b0b730b3b2b960791b60448201526064016200008e565b63ffffffff8087166080526001600160a01b0380861660a05284811660c05290861660e0528216156200011b576200011b82620001fd565b80156200012d576200012d8162000266565b604080516001600160a01b0386811682528581166020830152841681830152905163ffffffff87811692908916917f4f9c27c2fe3f84576ea469d367d044da53c45e951617e8389f2b5ed8db9d25f09181900360600190a35050505050505050505050505050505050505062000365565b600080546001600160a01b038381166001600160a01b0319808416821785556002859055600180549091169055604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600354604080516001600160a01b03928316815291831660208301527fc77bec288fc88f168427f2f7da682eadb26cac89d8d591af6e443da98dff2bbc910160405180910390a1600380546001600160a01b0319166001600160a01b0392909216919091179055565b60045460408051918252602082018390527f34b09b90f4cfa8747776f5cffd7d53ce7863a9b1f1fc8121903d22543a256511910160405180910390a1600455565b805163ffffffff81168114620002bc57600080fd5b919050565b80516001600160a01b0381168114620002bc57600080fd5b600080600080600080600060e0888a031215620002f557600080fd5b6200030088620002a7565b96506200031060208901620002a7565b95506200032060408901620002c1565b94506200033060608901620002c1565b93506200034060808901620002c1565b925060a088015191506200035760c08901620002c1565b905092959891949750929550565b60805160a05160c05160e051611625620003c96000396000818161014101526108e60152600081816101e30152818161051a01526109210152600081816102f70152818161034a015281816107300152610b2d015260006101a901526116256000f3fe608060405234801561001057600080fd5b50600436106101375760003560e01c80638da5cb5b116100b8578063cf796c751161007c578063cf796c75146102c6578063d1851c92146102cf578063d232c220146102e0578063d69f9d61146102f2578063db1b765914610319578063e92a492f1461032c57600080fd5b80638da5cb5b14610254578063b1f8100d14610265578063c1f0808a14610278578063c5b350df146102ab578063cc394283146102b357600080fd5b80635f61e3ec116100ff5780635f61e3ec146101de5780636a42b8f81461021d5780636eb67a5114610226578063715018a61461023957806382646a581461024157600080fd5b8063141684161461013c5780633cf52ffb1461017d5780634ff746f61461018f57806352a9674b146101a45780635bd11efc146101cb575b600080fd5b6101637f000000000000000000000000000000000000000000000000000000000000000081565b60405163ffffffff90911681526020015b60405180910390f35b6002545b604051908152602001610174565b6101a261019d36600461116f565b61033f565b005b6101637f000000000000000000000000000000000000000000000000000000000000000081565b6101a26101d9366004611220565b6103e5565b6102057f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b039091168152602001610174565b62093a80610181565b6101a2610234366004611249565b61041c565b6101a2610450565b6101a261024f36600461116f565b61050f565b6000546001600160a01b0316610205565b6101a2610273366004611220565b6105b0565b61029b610286366004611249565b60056020526000908152604090205460ff1681565b6040519015158152602001610174565b6101a2610655565b600354610205906001600160a01b031681565b61018160045481565b6001546001600160a01b0316610205565b6000546001600160a01b03161561029b565b6102057f000000000000000000000000000000000000000000000000000000000000000081565b61029b610327366004611220565b6106b0565b6101a261033a3660046112f0565b6106ba565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146103a95760405162461bcd60e51b81526004016103a09060208082526004908201526310a0a6a160e11b604082015260600190565b60405180910390fd5b7fb3abc57bfeebd2cac918901db582f71972a8e628bccf19f5ae3e3482b98a5ced81336040516103da9291906113e5565b60405180910390a150565b6000546001600160a01b03163314610410576040516311a8a1bb60e31b815260040160405180910390fd5b6104198161098c565b50565b6000546001600160a01b03163314610447576040516311a8a1bb60e31b815260040160405180910390fd5b610419816109f5565b6000546001600160a01b0316331461047b576040516311a8a1bb60e31b815260040160405180910390fd5b60025460000361049e57604051630e4b303f60e21b815260040160405180910390fd5b62093a80600254426104b09190611425565b116104ce576040516386d4b3f160e01b815260040160405180910390fd5b6001546001600160a01b0316156104f8576040516323295ef960e01b815260040160405180910390fd5b60015461050d906001600160a01b0316610a36565b565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146105765760405162461bcd60e51b815260206004820152600c60248201526b10b937b7ba26b0b730b3b2b960a11b60448201526064016103a0565b61057f81610a95565b7fa69577a1e55dd0712044e7078b408c39fadff8b3e1b334b202ff17e70eda9fdc81336040516103da9291906113e5565b6000546001600160a01b031633146105db576040516311a8a1bb60e31b815260040160405180910390fd5b6001546001600160a01b03828116911614801561060057506001600160a01b03811615155b1561061e576040516311bc066560e11b815260040160405180910390fd5b6000546001600160a01b0380831691160361064c57604051634a2fb73f60e11b815260040160405180910390fd5b61041981610bfb565b6001546001600160a01b03163314610680576040516311a7f27160e11b815260040160405180910390fd5b62093a80600254426106929190611425565b116104f85760405163d39c12bb60e01b815260040160405180910390fd5b6000805b92915050565b602483146106f45760405162461bcd60e51b8152602060048201526007602482015266042d8cadccee8d60cb1b60448201526064016103a0565b6040805160608101825261ffff871681526003546001600160a01b03166020808301919091528251601f870182900482028101820184528681527f0000000000000000000000000000000000000000000000000000000000000000936000939290830191908990899081908401838280828437600092018290525093909452505060405163e4948f4360e01b8152929350916001600160a01b038516915063e4948f43906107ae908d908d9087908b908b90600401611438565b602060405180830381865afa1580156107cb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107ef91906114c1565b9050806108285760405162461bcd60e51b815260206004820152600760248201526610b83937bb32b760c91b60448201526064016103a0565b600061086e600089898080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509293925050610c499050565b905060006108a561088d6020601885901c6001600160601b03166114e3565b62ffffff198416906001600160601b03166020610c6d565b60008181526005602052604090205490915060ff1661097e5760008181526005602052604090819020805460ff191660011790555163473ec9fd60e11b81527f000000000000000000000000000000000000000000000000000000000000000063ffffffff166004820152602481018290526001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690638e7d93fa90604401600060405180830381600087803b15801561096557600080fd5b505af1158015610979573d6000803e3d6000fd5b505050505b505050505050505050505050565b600354604080516001600160a01b03928316815291831660208301527fc77bec288fc88f168427f2f7da682eadb26cac89d8d591af6e443da98dff2bbc910160405180910390a1600380546001600160a01b0319166001600160a01b0392909216919091179055565b60045460408051918252602082018390527f34b09b90f4cfa8747776f5cffd7d53ce7863a9b1f1fc8121903d22543a256511910160405180910390a1600455565b600080546001600160a01b038381166001600160a01b0319808416821785556002859055600180549091169055604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b8051602014610ad05760405162461bcd60e51b8152602060048201526007602482015266042d8cadccee8d60cb1b60448201526064016103a0565b6000634ff746f660e01b82604051602401610aeb919061150a565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b0319909316929092179091526003549091506001600160a01b037f000000000000000000000000000000000000000000000000000000000000000081169163725ad8509134911660008561271082604051908082528060200260200182016040528015610b9257816020015b6060815260200190600190039081610b7d5790505b506040518763ffffffff1660e01b8152600401610bb395949392919061151d565b60206040518083038185885af1158015610bd1573d6000803e3d6000fd5b50505050506040513d601f19601f82011682018060405250810190610bf691906115ac565b505050565b42600255600180546001600160a01b0319166001600160a01b0383169081179091556040517f6ab4d119f23076e8ad491bc65ce85f017fb0591dce08755ba8591059cc51737a90600090a250565b815160009060208401610c6464ffffffffff85168284610dcd565b95945050505050565b60008160ff16600003610c8257506000610dc6565b610c958460181c6001600160601b031690565b6001600160601b0316610cab60ff8416856115c5565b1115610d0f57610cf6610cc78560781c6001600160601b031690565b6001600160601b0316610ce38660181c6001600160601b031690565b6001600160601b0316858560ff16610e14565b60405162461bcd60e51b81526004016103a0919061150a565b60208260ff161115610d895760405162461bcd60e51b815260206004820152603a60248201527f54797065644d656d566965772f696e646578202d20417474656d70746564207460448201527f6f20696e646578206d6f7265207468616e20333220627974657300000000000060648201526084016103a0565b600882026000610da28660781c6001600160601b031690565b6001600160601b031690506000600160ff1b60001984011d91860151909116925050505b9392505050565b600080610dda83856115c5565b9050604051811115610dea575060005b80600003610dff5762ffffff19915050610dc6565b5050606092831b9190911790911b1760181b90565b60606000610e2186610f3e565b9150506000610e2f86610f3e565b9150506000610e3d86610f3e565b9150506000610e4b86610f3e565b604080517f54797065644d656d566965772f696e646578202d204f76657272616e20746865602082015274040ecd2caee5c40a6d8d2c6ca40d2e640c2e84060f605b1b818301526001600160d01b031960d098891b811660558301526e040eed2e8d040d8cadccee8d04060f608b1b605b830181905297891b8116606a8301527f2e20417474656d7074656420746f20696e646578206174206f666673657420306070830152600f60fb1b609083015295881b861660918201526097810196909652951b90921660a68401525050601760f91b60ac8201528151808203608d01815260ad90910190915295945050505050565b600080601f5b600f811115610f8a576000610f5a8260086115d8565b85901c9050610f6881610fda565b61ffff168417935081601014610f8057601084901b93505b5060001901610f44565b50600f5b60ff811015610fd4576000610fa48260086115d8565b85901c9050610fb281610fda565b61ffff168317925081600014610fca57601083901b92505b5060001901610f8e565b50915091565b6000610fec60048360ff16901c61100c565b60ff1661ffff919091161760081b6110038261100c565b60ff1617919050565b600060f08083179060ff821690036110275750603092915050565b8060ff1660f10361103b5750603192915050565b8060ff1660f20361104f5750603292915050565b8060ff1660f3036110635750603392915050565b8060ff1660f4036110775750603492915050565b8060ff1660f50361108b5750603592915050565b8060ff1660f60361109f5750603692915050565b8060ff1660f7036110b35750603792915050565b8060ff1660f8036110c75750603892915050565b8060ff1660f9036110db5750603992915050565b8060ff1660fa036110ef5750606192915050565b8060ff1660fb036111035750606292915050565b8060ff1660fc036111175750606392915050565b8060ff1660fd0361112b5750606492915050565b8060ff1660fe0361113f5750606592915050565b8060ff1660ff036111535750606692915050565b50919050565b634e487b7160e01b600052604160045260246000fd5b60006020828403121561118157600080fd5b813567ffffffffffffffff8082111561119957600080fd5b818401915084601f8301126111ad57600080fd5b8135818111156111bf576111bf611159565b604051601f8201601f19908116603f011681019083821181831017156111e7576111e7611159565b8160405282815287602084870101111561120057600080fd5b826020860160208301376000928101602001929092525095945050505050565b60006020828403121561123257600080fd5b81356001600160a01b0381168114610dc657600080fd5b60006020828403121561125b57600080fd5b5035919050565b60008083601f84011261127457600080fd5b50813567ffffffffffffffff81111561128c57600080fd5b6020830191508360208285010111156112a457600080fd5b9250929050565b60008083601f8401126112bd57600080fd5b50813567ffffffffffffffff8111156112d557600080fd5b6020830191508360208260051b85010111156112a457600080fd5b600080600080600080600060a0888a03121561130b57600080fd5b873563ffffffff8116811461131f57600080fd5b965060208801359550604088013561ffff8116811461133d57600080fd5b9450606088013567ffffffffffffffff8082111561135a57600080fd5b6113668b838c01611262565b909650945060808a013591508082111561137f57600080fd5b5061138c8a828b016112ab565b989b979a50959850939692959293505050565b6000815180845260005b818110156113c5576020818501810151868301820152016113a9565b506000602082860101526020601f19601f83011685010191505092915050565b6040815260006113f8604083018561139f565b905060018060a01b03831660208301529392505050565b634e487b7160e01b600052601160045260246000fd5b818103818111156106b4576106b461140f565b63ffffffff861681528460208201526080604082015261ffff845116608082015260018060a01b0360208501511660a082015260006040850151606060c084015261148660e084018261139f565b838103606085015284815290506001600160fb1b038411156114a757600080fd5b8360051b8086602084013701602001979650505050505050565b6000602082840312156114d357600080fd5b81518015158114610dc657600080fd5b6001600160601b038281168282160390808211156115035761150361140f565b5092915050565b602081526000610dc6602083018461139f565b60018060a01b038616815260006020868184015260a0604084015261154560a084018761139f565b85606085015283810360808501528085518083528383019150838160051b84010184880160005b8381101561159a57601f1986840301855261158883835161139f565b9487019492509086019060010161156c565b50909c9b505050505050505050505050565b6000602082840312156115be57600080fd5b5051919050565b808201808211156106b4576106b461140f565b80820281158282048414176106b4576106b461140f56fea2646970667358221220a02b6c78cf7cff5fbcbd175e8ccd80edd9b7f895c3e06cf25b7e010259913bf564736f6c63430008110033";

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
    _mirrorGas: PromiseOrValue<BigNumberish>,
    _stateCommitmentChain: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ZkSyncHubConnector> {
    return super.deploy(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _mirrorGas,
      _stateCommitmentChain,
      overrides || {}
    ) as Promise<ZkSyncHubConnector>;
  }
  override getDeployTransaction(
    _domain: PromiseOrValue<BigNumberish>,
    _mirrorDomain: PromiseOrValue<BigNumberish>,
    _amb: PromiseOrValue<string>,
    _rootManager: PromiseOrValue<string>,
    _mirrorConnector: PromiseOrValue<string>,
    _mirrorGas: PromiseOrValue<BigNumberish>,
    _stateCommitmentChain: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _mirrorGas,
      _stateCommitmentChain,
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
