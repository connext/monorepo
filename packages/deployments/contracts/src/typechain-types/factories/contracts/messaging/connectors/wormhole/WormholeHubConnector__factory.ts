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
  WormholeHubConnector,
  WormholeHubConnectorInterface,
} from "../../../../../contracts/messaging/connectors/wormhole/WormholeHubConnector";

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
        name: "_gasCap",
        type: "uint256",
      },
      {
        internalType: "uint16",
        name: "_mirrorChainId",
        type: "uint16",
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
    name: "MIRROR_CHAIN_ID",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
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
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "processedWhMessages",
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
    inputs: [
      {
        internalType: "uint256",
        name: "gasLimit",
        type: "uint256",
      },
    ],
    name: "quoteEVMDeliveryPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "cost",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "payload",
        type: "bytes",
      },
      {
        internalType: "bytes[]",
        name: "additionalVaas",
        type: "bytes[]",
      },
      {
        internalType: "bytes32",
        name: "sourceAddress",
        type: "bytes32",
      },
      {
        internalType: "uint16",
        name: "sourceChain",
        type: "uint16",
      },
      {
        internalType: "bytes32",
        name: "deliveryHash",
        type: "bytes32",
      },
    ],
    name: "receiveWormholeMessages",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "relayerAddress",
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
  "0x6101406040523480156200001257600080fd5b5060405162001889380380620018898339810160408190526200003591620002f8565b848282818a8a858a8a84848484846200004e33620001b7565b8463ffffffff16600003620000995760405162461bcd60e51b815260206004820152600c60248201526b32b6b83a3c903237b6b0b4b760a11b60448201526064015b60405180910390fd5b6001600160a01b038216620000e55760405162461bcd60e51b815260206004820152601160248201527032b6b83a3c903937b7ba26b0b730b3b2b960791b604482015260640162000090565b63ffffffff8086166080526001600160a01b0380851660a05283811660c05290851660e0528116156200011d576200011d816200021c565b604080516001600160a01b0385811682528481166020830152831681830152905163ffffffff86811692908816917f4f9c27c2fe3f84576ea469d367d044da53c45e951617e8389f2b5ed8db9d25f09181900360600190a35050505050505050505062000190816200028560201b60201c565b506001600160a01b03909216610100525061ffff1661012052506200038e95505050505050565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b039092166001600160a01b0319928316178155600255600180549091169055565b600354604080516001600160a01b03928316815291831660208301527fc77bec288fc88f168427f2f7da682eadb26cac89d8d591af6e443da98dff2bbc910160405180910390a1600380546001600160a01b0319166001600160a01b0392909216919091179055565b60045460408051918252602082018390527f877a02cb809da0364d23adca3cd50c451b53f279d3df632e1fc11eb66335bce5910160405180910390a1600455565b805163ffffffff81168114620002db57600080fd5b919050565b80516001600160a01b0381168114620002db57600080fd5b600080600080600080600060e0888a0312156200031457600080fd5b6200031f88620002c6565b96506200032f60208901620002c6565b95506200033f60408901620002e0565b94506200034f60608901620002e0565b93506200035f60808901620002e0565b925060a0880151915060c088015161ffff811681146200037e57600080fd5b8091505092959891949750929550565b60805160a05160c05160e051610100516101205161146562000424600039600081816103ed015281816104e5015281816106f30152610ec20152600081816101b00152818161051d015281816107630152610e930152600081816101620152610bbb01526000818161031b015281816105a10152610b940152600081816104910152610656015260006102c701526114656000f3fe6080604052600436106101445760003560e01c80636a42b8f8116100b6578063c8a4d6901161006f578063c8a4d690146103db578063cc39428314610422578063d1851c9214610442578063d232c22014610460578063d69f9d611461047f578063db1b7659146104b357600080fd5b80636a42b8f81461033d578063715018a6146103535780637850b020146103685780638da5cb5b14610388578063b1f8100d146103a6578063c5b350df146103c657600080fd5b806348e6fa231161010857806348e6fa231461026d5780634ff746f614610282578063529dca32146102a257806352a9674b146102b55780635bd11efc146102e95780635f61e3ec1461030957600080fd5b8063141684161461015057806318a7cca81461019e57806318c81709146101ea5780631c79166e1461022a5780633cf52ffb1461025857600080fd5b3661014b57005b600080fd5b34801561015c57600080fd5b506101847f000000000000000000000000000000000000000000000000000000000000000081565b60405163ffffffff90911681526020015b60405180910390f35b3480156101aa57600080fd5b506101d27f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b039091168152602001610195565b3480156101f657600080fd5b5061021a610205366004610fb8565b60056020526000908152604090205460ff1681565b6040519015158152602001610195565b34801561023657600080fd5b5061024a610245366004610fb8565b6104d3565b604051908152602001610195565b34801561026457600080fd5b5060025461024a565b61028061027b366004611088565b610596565b005b34801561028e57600080fd5b5061028061029d3660046110ec565b61064b565b6102806102b0366004611140565b6106f1565b3480156102c157600080fd5b506101847f000000000000000000000000000000000000000000000000000000000000000081565b3480156102f557600080fd5b50610280610304366004611249565b610840565b34801561031557600080fd5b506101d27f000000000000000000000000000000000000000000000000000000000000000081565b34801561034957600080fd5b5062093a8061024a565b34801561035f57600080fd5b50610280610877565b34801561037457600080fd5b50610280610383366004610fb8565b61092b565b34801561039457600080fd5b506000546001600160a01b03166101d2565b3480156103b257600080fd5b506102806103c1366004611249565b61095f565b3480156103d257600080fd5b506102806109fd565b3480156103e757600080fd5b5061040f7f000000000000000000000000000000000000000000000000000000000000000081565b60405161ffff9091168152602001610195565b34801561042e57600080fd5b506003546101d2906001600160a01b031681565b34801561044e57600080fd5b506001546001600160a01b03166101d2565b34801561046c57600080fd5b506000546001600160a01b03161561021a565b34801561048b57600080fd5b506101d27f000000000000000000000000000000000000000000000000000000000000000081565b3480156104bf57600080fd5b5061021a6104ce366004611249565b610a6d565b60405163c23ee3c360e01b815261ffff7f000000000000000000000000000000000000000000000000000000000000000016600482015260006024820181905260448201839052907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063c23ee3c3906064016040805180830381865afa15801561056b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061058f9190611279565b5092915050565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146106025760405162461bcd60e51b815260206004820152600c60248201526b10b937b7ba26b0b730b3b2b960a11b60448201526064015b60405180910390fd5b61060c8282610a7e565b7fdcaa37a042a0087de79018c629bbd29cee82ca80bd9be394e1696bf9e935507782823360405161063f939291906112e3565b60405180910390a15050565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146106ac5760405162461bcd60e51b81526004016105f99060208082526004908201526310a0a6a160e11b604082015260600190565b6106b581610aab565b7fb3abc57bfeebd2cac918901db582f71972a8e628bccf19f5ae3e3482b98a5ced81336040516106e6929190611321565b60405180910390a150565b7f000000000000000000000000000000000000000000000000000000000000000061ffff168261ffff16146107585760405162461bcd60e51b815260206004820152600d60248201526c10b9b7bab931b29031b430b4b760991b60448201526064016105f9565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146107bb5760405162461bcd60e51b815260206004820152600860248201526710b932b630bcb2b960c11b60448201526064016105f9565b60008181526005602052604090205460ff161561080e5760405162461bcd60e51b8152602060048201526011602482015270185b1c9958591e481c1c9bd8d95cdcd959607a1b60448201526064016105f9565b6000818152600560205260409020805460ff1916600117905561083961083384610ac4565b86610b0b565b5050505050565b6000546001600160a01b0316331461086b576040516311a8a1bb60e31b815260040160405180910390fd5b61087481610c70565b50565b6000546001600160a01b031633146108a2576040516311a8a1bb60e31b815260040160405180910390fd5b62093a80600254426108b4919061134b565b116108d2576040516324e0285f60e21b815260040160405180910390fd5b6002546000036108f557604051630e4b303f60e21b815260040160405180910390fd5b6001546001600160a01b03161561091f576040516323295ef960e01b815260040160405180910390fd5b6109296000610cd9565b565b6000546001600160a01b03163314610956576040516311a8a1bb60e31b815260040160405180910390fd5b61087481610d3e565b6000546001600160a01b0316331461098a576040516311a8a1bb60e31b815260040160405180910390fd5b6001546001600160a01b0382811691161480156109a8575060025415155b156109c6576040516311bc066560e11b815260040160405180910390fd5b6000546001600160a01b038083169116036109f457604051634a2fb73f60e11b815260040160405180910390fd5b61087481610d7f565b6001546001600160a01b03163314610a28576040516311a7f27160e11b815260040160405180910390fd5b62093a8060025442610a3a919061134b565b11610a58576040516324e0285f60e21b815260040160405180910390fd5b600154610929906001600160a01b0316610cd9565b6000610a7882610dcd565b92915050565b600354610aa7906001600160a01b0316610aa06000546001600160a01b031690565b8484610de6565b5050565b6040516316c2fdb560e21b815260040160405180910390fd5b600060a082901c15610b075760405162461bcd60e51b815260206004820152600c60248201526b2165766d206164647265737360a01b60448201526064016105f9565b5090565b610b1482610dcd565b610b4f5760405162461bcd60e51b815260206004820152600c60248201526b10b61921b7b73732b1ba37b960a11b60448201526064016105f9565b8051602014610b8a5760405162461bcd60e51b8152602060048201526007602482015266042d8cadccee8d60cb1b60448201526064016105f9565b6001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016638e7d93fa7f0000000000000000000000000000000000000000000000000000000000000000610be38461136c565b6040516001600160e01b031960e085901b16815263ffffffff9290921660048301526024820152604401600060405180830381600087803b158015610c2757600080fd5b505af1158015610c3b573d6000803e3d6000fd5b505050507fb3abc57bfeebd2cac918901db582f71972a8e628bccf19f5ae3e3482b98a5ced813360405161063f929190611321565b600354604080516001600160a01b03928316815291831660208301527fc77bec288fc88f168427f2f7da682eadb26cac89d8d591af6e443da98dff2bbc910160405180910390a1600380546001600160a01b0319166001600160a01b0392909216919091179055565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b039092166001600160a01b0319928316178155600255600180549091169055565b60045460408051918252602082018390527f877a02cb809da0364d23adca3cd50c451b53f279d3df632e1fc11eb66335bce5910160405180910390a1600455565b42600255600180546001600160a01b0319166001600160a01b0383169081179091556040517f6ab4d119f23076e8ad491bc65ce85f017fb0591dce08755ba8591059cc51737a90600090a250565b6003546000906001600160a01b03838116911614610a78565b8151602014610e265760405162461bcd60e51b815260206004820152600c60248201526b042c8c2e8c240d8cadccee8d60a31b60448201526064016105f9565b6000610e3182610f43565b90506000610e3e826104d3565b9050348114610e7c5760405162461bcd60e51b815260206004820152600a602482015269216d73672e76616c756560b01b60448201526064016105f9565b6040516312d729bd60e21b81526001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690634b5ca6f4908390610ef7907f0000000000000000000000000000000000000000000000000000000000000000908b908a906000908a9085908f90600401611393565b60206040518083038185885af1158015610f15573d6000803e3d6000fd5b50505050506040513d601f19601f82011682018060405250810190610f3a91906113ec565b50505050505050565b60008151602014610f8d5760405162461bcd60e51b8152602060048201526014602482015273042cadcc6dec8cac840c8c2e8c240d8cadccee8d60631b60448201526064016105f9565b610a7882806020019051810190610fa49190611416565b6000600454821115610b0757505060045490565b600060208284031215610fca57600080fd5b5035919050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561101057611010610fd1565b604052919050565b600082601f83011261102957600080fd5b813567ffffffffffffffff81111561104357611043610fd1565b611056601f8201601f1916602001610fe7565b81815284602083860101111561106b57600080fd5b816020850160208301376000918101602001919091529392505050565b6000806040838503121561109b57600080fd5b823567ffffffffffffffff808211156110b357600080fd5b6110bf86838701611018565b935060208501359150808211156110d557600080fd5b506110e285828601611018565b9150509250929050565b6000602082840312156110fe57600080fd5b813567ffffffffffffffff81111561111557600080fd5b61112184828501611018565b949350505050565b803561ffff8116811461113b57600080fd5b919050565b600080600080600060a0868803121561115857600080fd5b853567ffffffffffffffff8082111561117057600080fd5b61117c89838a01611018565b965060209150818801358181111561119357600080fd5b8801601f81018a136111a457600080fd5b8035828111156111b6576111b6610fd1565b8060051b6111c5858201610fe7565b918252828101850191858101908d8411156111df57600080fd5b86850192505b8383101561121b578235868111156111fd5760008081fd5b61120b8f8983890101611018565b83525091860191908601906111e5565b809a50505050505050506040860135925061123860608701611129565b949793965091946080013592915050565b60006020828403121561125b57600080fd5b81356001600160a01b038116811461127257600080fd5b9392505050565b6000806040838503121561128c57600080fd5b505080516020909101519092909150565b6000815180845260005b818110156112c3576020818501810151868301820152016112a7565b506000602082860101526020601f19601f83011685010191505092915050565b6060815260006112f6606083018661129d565b8281036020840152611308818661129d565b91505060018060a01b0383166040830152949350505050565b604081526000611334604083018561129d565b905060018060a01b03831660208301529392505050565b81810381811115610a7857634e487b7160e01b600052601160045260246000fd5b8051602080830151919081101561138d576000198160200360031b1b821691505b50919050565b600061ffff808a16835260018060a01b03808a16602085015260e060408501526113c060e085018a61129d565b925087606085015286608085015281861660a085015280851660c0850152505098975050505050505050565b6000602082840312156113fe57600080fd5b815167ffffffffffffffff8116811461127257600080fd5b60006020828403121561142857600080fd5b505191905056fea2646970667358221220e093727ad847f4baef96e803153af4b107dda27325e4194567bdff07273fe1b664736f6c63430008110033";

type WormholeHubConnectorConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: WormholeHubConnectorConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class WormholeHubConnector__factory extends ContractFactory {
  constructor(...args: WormholeHubConnectorConstructorParams) {
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
    _gasCap: PromiseOrValue<BigNumberish>,
    _mirrorChainId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<WormholeHubConnector> {
    return super.deploy(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _gasCap,
      _mirrorChainId,
      overrides || {}
    ) as Promise<WormholeHubConnector>;
  }
  override getDeployTransaction(
    _domain: PromiseOrValue<BigNumberish>,
    _mirrorDomain: PromiseOrValue<BigNumberish>,
    _amb: PromiseOrValue<string>,
    _rootManager: PromiseOrValue<string>,
    _mirrorConnector: PromiseOrValue<string>,
    _gasCap: PromiseOrValue<BigNumberish>,
    _mirrorChainId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _gasCap,
      _mirrorChainId,
      overrides || {}
    );
  }
  override attach(address: string): WormholeHubConnector {
    return super.attach(address) as WormholeHubConnector;
  }
  override connect(signer: Signer): WormholeHubConnector__factory {
    return super.connect(signer) as WormholeHubConnector__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WormholeHubConnectorInterface {
    return new utils.Interface(_abi) as WormholeHubConnectorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): WormholeHubConnector {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as WormholeHubConnector;
  }
}
