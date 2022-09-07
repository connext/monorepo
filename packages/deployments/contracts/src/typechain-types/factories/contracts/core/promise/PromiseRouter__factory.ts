/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  PromiseRouter,
  PromiseRouterInterface,
} from "../../../../contracts/core/promise/PromiseRouter";

const _abi = [
  {
    inputs: [],
    name: "PromiseRouter__bumpCallbackFee_messageUnavailable",
    type: "error",
  },
  {
    inputs: [],
    name: "PromiseRouter__bumpCallbackFee_valueIsZero",
    type: "error",
  },
  {
    inputs: [],
    name: "PromiseRouter__initCallbackFee_valueIsZero",
    type: "error",
  },
  {
    inputs: [],
    name: "PromiseRouter__onlyConnext_notConnext",
    type: "error",
  },
  {
    inputs: [],
    name: "PromiseRouter__process_insufficientCallbackFee",
    type: "error",
  },
  {
    inputs: [],
    name: "PromiseRouter__process_invalidMessage",
    type: "error",
  },
  {
    inputs: [],
    name: "PromiseRouter__process_invalidTransferId",
    type: "error",
  },
  {
    inputs: [],
    name: "PromiseRouter__process_notApprovedRelayer",
    type: "error",
  },
  {
    inputs: [],
    name: "PromiseRouter__process_notContractCallback",
    type: "error",
  },
  {
    inputs: [],
    name: "PromiseRouter__send_callbackEmpty",
    type: "error",
  },
  {
    inputs: [],
    name: "PromiseRouter__send_returndataEmpty",
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "transferId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "success",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "address",
        name: "relayer",
        type: "address",
      },
    ],
    name: "CallbackExecuted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "transferId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "addedFee",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalFee",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "CallbackFeeAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
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
        indexed: true,
        internalType: "uint64",
        name: "originAndNonce",
        type: "uint64",
      },
      {
        indexed: true,
        internalType: "uint32",
        name: "origin",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "transferId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "callbackAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "success",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "message",
        type: "bytes",
      },
    ],
    name: "Receive",
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
        name: "updated",
        type: "uint256",
      },
    ],
    name: "ReserveGasSet",
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
        name: "remote",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "transferId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "callbackAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "success",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "message",
        type: "bytes",
      },
    ],
    name: "Send",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "connext",
        type: "address",
      },
    ],
    name: "SetConnext",
    type: "event",
  },
  {
    inputs: [],
    name: "MAX_COPY",
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
    name: "RESERVE_GAS",
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
    name: "VERSION",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "_transferId",
        type: "bytes32",
      },
    ],
    name: "bumpCallbackFee",
    outputs: [],
    stateMutability: "payable",
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
    name: "callbackFees",
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
    name: "connext",
    outputs: [
      {
        internalType: "contract IConnextHandler",
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
        internalType: "uint32",
        name: "_domain",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "_router",
        type: "bytes32",
      },
    ],
    name: "enrollRemoteRouter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_origin",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "_nonce",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "_sender",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "_message",
        type: "bytes",
      },
    ],
    name: "handle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_transferId",
        type: "bytes32",
      },
    ],
    name: "initCallbackFee",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_xAppConnectionManager",
        type: "address",
      },
    ],
    name: "initialize",
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
    name: "messageHashes",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "transferId",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "_message",
        type: "bytes",
      },
    ],
    name: "process",
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
        name: "",
        type: "uint32",
      },
    ],
    name: "remotes",
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
        name: "_transferId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "_callbackAddress",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_returnSuccess",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "_returnData",
        type: "bytes",
      },
    ],
    name: "send",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_connext",
        type: "address",
      },
    ],
    name: "setConnext",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_reserve",
        type: "uint256",
      },
    ],
    name: "setReserveGas",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_xAppConnectionManager",
        type: "address",
      },
    ],
    name: "setXAppConnectionManager",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "xAppConnectionManager",
    outputs: [
      {
        internalType: "contract IConnectorManager",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506126d6806100206000396000f3fe6080604052600436106101815760003560e01c80638da5cb5b116100d1578063c5b350df1161008a578063de4b054811610064578063de4b05481461047e578063dfefb7d71461049e578063fc89d377146104be578063ffa1ad74146104d157600080fd5b8063c5b350df14610415578063d1851c921461042a578063d232c2201461044857600080fd5b80638da5cb5b146103435780639367427c14610367578063ab2dc3f514610395578063b1f8100d146103b5578063b49c53a7146103d5578063c4d66de8146103f557600080fd5b80634fa6b6341161013e5780636a42b8f8116101185780636a42b8f8146102be5780637080f771146102d4578063715018a61461030157806383bbb8061461031657600080fd5b80634fa6b6341461025e5780635540f1c01461028b57806365d82b8b1461029e57600080fd5b806325e3beda146101865780633339df96146101af5780633cf52ffb146101e757806341bdc8b5146101fc57806348d677e81461021e5780634d6f20131461023e575b600080fd5b34801561019257600080fd5b5061019c60ce5481565b6040519081526020015b60405180910390f35b3480156101bb57600080fd5b506034546101cf906001600160a01b031681565b6040516001600160a01b0390911681526020016101a6565b3480156101f357600080fd5b5060025461019c565b34801561020857600080fd5b5061021c610217366004611fa7565b6104f8565b005b34801561022a57600080fd5b5061021c610239366004611fc4565b61054b565b34801561024a57600080fd5b5061021c610259366004611fa7565b6105bd565b34801561026a57600080fd5b5061019c610279366004611fc4565b60cc6020526000908152604090205481565b61021c610299366004611fc4565b610638565b3480156102aa57600080fd5b5061021c6102b9366004612048565b610732565b3480156102ca57600080fd5b5062093a8061019c565b3480156102e057600080fd5b5061019c6102ef366004611fc4565b60cb6020526000908152604090205481565b34801561030d57600080fd5b5061021c6108db565b34801561032257600080fd5b5061019c6103313660046120cb565b60666020526000908152604090205481565b34801561034f57600080fd5b506000546201000090046001600160a01b03166101cf565b34801561037357600080fd5b5060cd546103829061ffff1681565b60405161ffff90911681526020016101a6565b3480156103a157600080fd5b5061021c6103b03660046120fc565b6109a0565b3480156103c157600080fd5b5061021c6103d0366004611fa7565b610b2b565b3480156103e157600080fd5b5061021c6103f03660046121d8565b610bdf565b34801561040157600080fd5b5061021c610410366004611fa7565b610c29565b34801561042157600080fd5b5061021c610d0b565b34801561043657600080fd5b506001546001600160a01b03166101cf565b34801561045457600080fd5b5061046e6000546201000090046001600160a01b03161590565b60405190151581526020016101a6565b34801561048a57600080fd5b5060ca546101cf906001600160a01b031681565b3480156104aa57600080fd5b5061021c6104b9366004612202565b610d66565b61021c6104cc366004611fc4565b611014565b3480156104dd57600080fd5b506104e6600081565b60405160ff90911681526020016101a6565b6000546201000090046001600160a01b03163314610529576040516311a8a1bb60e31b815260040160405180910390fd5b603480546001600160a01b0319166001600160a01b0392909216919091179055565b6000546201000090046001600160a01b0316331461057c576040516311a8a1bb60e31b815260040160405180910390fd5b60ce5460408051918252602082018390527fc4f6391de2c7e6a71a52545396978cad807d085036052c9a75273006156a682f910160405180910390a160ce55565b6000546201000090046001600160a01b031633146105ee576040516311a8a1bb60e31b815260040160405180910390fd5b60ca80546001600160a01b0319166001600160a01b0383169081179091556040517f8ff00ea0f06ea523b8f4b80a53bb86b4967c9909b4e354b47a83371249ad57f390600090a250565b60ca546001600160a01b0316331461066357604051632c4b07cf60e01b815260040160405180910390fd5b60026098540361068e5760405162461bcd60e51b81526004016106859061224e565b60405180910390fd5b6002609855346000036106b757604051600162bcaa2760e01b0319815260040160405180910390fd5b600081815260cc6020526040812080543492906106d590849061229b565b9091555050600081815260cc6020908152604091829020548251348152918201523381830152905182917fe01346f7c5b12b318c8239d37465281e572012b3f898085a3d2ed142ba2fa15d919081900360600190a2506001609855565b60ca546001600160a01b0316331461075d57604051632c4b07cf60e01b815260040160405180910390fd5b6001600160a01b03841661078457604051638676471760e01b815260040160405180910390fd5b600061078f87611088565b905060006107a087878787876110da565b9050603460009054906101000a90046001600160a01b03166001600160a01b0316639fa92f9d6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156107f5573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061081991906122b3565b6001600160a01b031663fa31de018984846040518463ffffffff1660e01b81526004016108489392919061231d565b6020604051808303816000875af1158015610867573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061088b9190612342565b507fa1d84c22c68d469068eaf6be2c49fd6f9120f7e4176ba1dc8027e5e1cdce1f9188838989898989886040516108c998979695949392919061235b565b60405180910390a15050505050505050565b6000546201000090046001600160a01b0316331461090c576040516311a8a1bb60e31b815260040160405180910390fd5b60025460000361092f57604051630e4b303f60e21b815260040160405180910390fd5b62093a806002544261094191906123d6565b1161095f576040516386d4b3f160e01b815260040160405180910390fd5b6001546001600160a01b031615610989576040516323295ef960e01b815260040160405180910390fd5b60015461099e906001600160a01b0316611122565b565b6109a933611192565b6109e05760405162461bcd60e51b8152602060048201526008602482015267217265706c69636160c01b6044820152606401610685565b83826109ec8282611207565b610a295760405162461bcd60e51b815260206004820152600e60248201526d10b932b6b7ba32903937baba32b960911b6044820152606401610685565b6000610a43610a388583611231565b62ffffff1916611255565b90506000610a5662ffffff19831661126e565b90506000610a6962ffffff1984166112a1565b90506000610a7c62ffffff1985166112c1565b90506000610a8f62ffffff1986166112ee565b9050610aa062ffffff19861661132c565b600085815260cb602052604090205563ffffffff8b16610ad58c8c63ffffffff1660209190911b67ffffffff00000000161790565b67ffffffffffffffff167f878c51ec082a65de8c0a9e68ec34c48c86f4d76ae6d693587eb4420611ae0f51868686868e604051610b169594939291906123ed565b60405180910390a35050505050505050505050565b6000546201000090046001600160a01b03163314610b5c576040516311a8a1bb60e31b815260040160405180910390fd5b6001546001600160a01b038281169116148015610b8157506001600160a01b03811615155b15610b9f576040516311bc066560e11b815260040160405180910390fd5b6000546001600160a01b03808316620100009092041603610bd357604051634a2fb73f60e11b815260040160405180910390fd5b610bdc81611375565b50565b6000546201000090046001600160a01b03163314610c10576040516311a8a1bb60e31b815260040160405180910390fd5b63ffffffff909116600090815260666020526040902055565b600054610100900460ff1615808015610c495750600054600160ff909116105b80610c635750303b158015610c63575060005460ff166001145b610c7f5760405162461bcd60e51b81526004016106859061243d565b6000805460ff191660011790558015610ca2576000805461ff0019166101001790555b610cab826113c3565b60cd805461ffff191661010017905561c35060ce558015610d07576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498906020015b60405180910390a15b5050565b6001546001600160a01b03163314610d36576040516311a7f27160e11b815260040160405180910390fd5b62093a8060025442610d4891906123d6565b116109895760405163d39c12bb60e01b815260040160405180910390fd5b600260985403610d885760405162461bcd60e51b81526004016106859061224e565b6002609855600083815260cb602052604090205480610dba57604051633099ed6360e01b815260040160405180910390fd5b6000610e03610a38600086868080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092939250506112319050565b9050610e1462ffffff19821661132c565b8214610e3357604051630824701d60e11b815260040160405180910390fd5b60ca5460405163465d45b560e11b81523360048201526001600160a01b0390911690638cba8b6a90602401602060405180830381865afa158015610e7b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e9f919061248b565b610ebc57604051630be95c7560e41b815260040160405180910390fd5b6000610ecd62ffffff1983166112a1565b90506001600160a01b0381163b610ef7576040516374a3bc6160e11b815260040160405180910390fd5b600086815260cc60208181526040808420805460cb8452918520859055929091529082905560ce549091905a610f2d91906123d6565b60cd54909150600090610fb49085908490849061ffff166301a5d78760e11b8e610f5c62ffffff198d166112c1565b610f6b62ffffff198e166112ee565b604051602401610f7d939291906124a8565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b0319909316929092179091526114a1565b506040805182151581523360208201529192508a917fb57ab1d3a3b4ddbf8823dfeefb7fe73d09cef77971f2111f6b21d00016b393f1910160405180910390a2821561100457611004338461152c565b5050600160985550505050505050565b6002609854036110365760405162461bcd60e51b81526004016106859061224e565b60026098553460000361105c57604051633f1fd4df60e21b815260040160405180910390fd5b600081815260cb60205260409020546106b7576040516353b0f6d960e01b815260040160405180910390fd5b63ffffffff8116600090815260666020526040902054806110d55760405162461bcd60e51b81526020600482015260076024820152662172656d6f746560c81b6044820152606401610685565b919050565b606060018686866110ec5760006110ef565b60015b60405161110894939291908790899082906020016124c9565b604051602081830303815290604052905095945050505050565b600080546001600160a01b038381166201000081810262010000600160b01b031985161785556002859055600180546001600160a01b031916905560405193049190911692909183917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a35050565b603454604051635190bc5360e01b81526001600160a01b0383811660048301526000921690635190bc5390602401602060405180830381865afa1580156111dd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611201919061248b565b92915050565b63ffffffff82166000908152606660205260408120548214801561122a57508115155b9392505050565b81516000906020840161124c64ffffffffff8516828461164a565b95945050505050565b600061120161126383611691565b62ffffff19166116c3565b6000816001611285815b62ffffff1984169061171e565b5061129962ffffff198516600160206117f7565b949350505050565b60008160016112af81611278565b5061129962ffffff1985166021611953565b60008160016112cf81611278565b506112e362ffffff1985166035600161195d565b600114949350505050565b60608160016112fc81611278565b5060006113088561198d565b905061124c61132162ffffff19871660568460006119a2565b62ffffff1916611a1c565b6000806113428360781c6001600160601b031690565b6001600160601b0316905060006113628460181c6001600160601b031690565b6001600160601b03169091209392505050565b42600255600180546001600160a01b0319166001600160a01b0383169081179091556040517f6ab4d119f23076e8ad491bc65ce85f017fb0591dce08755ba8591059cc51737a90600090a250565b600054610100900460ff16158080156113e35750600054600160ff909116105b806113fd5750303b1580156113fd575060005460ff166001145b6114195760405162461bcd60e51b81526004016106859061243d565b6000805460ff19166001179055801561143c576000805461ff0019166101001790555b603480546001600160a01b0319166001600160a01b03841617905561145f611a65565b8015610d07576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb384740249890602001610cfe565b6000606060008060008661ffff1667ffffffffffffffff8111156114c7576114c76120e6565b6040519080825280601f01601f1916602001820160405280156114f1576020820181803683370190505b5090506000808751602089018b8e8ef191503d925086831115611512578692505b828152826000602083013e90999098509650505050505050565b8047101561157c5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a20696e73756666696369656e742062616c616e63650000006044820152606401610685565b6000826001600160a01b03168260405160006040518083038185875af1925050503d80600081146115c9576040519150601f19603f3d011682016040523d82523d6000602084013e6115ce565b606091505b50509050806116455760405162461bcd60e51b815260206004820152603a60248201527f416464726573733a20756e61626c6520746f2073656e642076616c75652c207260448201527f6563697069656e74206d617920686176652072657665727465640000000000006064820152608401610685565b505050565b600080611657838561229b565b9050604051811115611667575060005b8060000361167c5762ffffff1991505061122a565b5050606092831b9190911790911b1760181b90565b600061169c82611a94565b156116b9576301000000600160d81b038216600160d81b17611201565b62ffffff19611201565b60006116ce82611ad7565b61171a5760405162461bcd60e51b815260206004820152601960248201527f56616c696469747920617373657274696f6e206661696c6564000000000000006044820152606401610685565b5090565b600061172a8383611b14565b6117f057600061174961173d8560d81c90565b64ffffffffff16611b37565b915050600061175e8464ffffffffff16611b37565b6040517f5479706520617373657274696f6e206661696c65642e20476f7420307800000060208201526001600160b01b031960b086811b8216603d8401526c05c408af0e0cac6e8cac84060f609b1b604784015283901b16605482015290925060009150605e0160405160208183030381529060405290508060405162461bcd60e51b8152600401610685919061251f565b5090919050565b60008160ff1660000361180c5750600061122a565b61181f8460181c6001600160601b031690565b6001600160601b031661183560ff84168561229b565b1115611899576118806118518560781c6001600160601b031690565b6001600160601b031661186d8660181c6001600160601b031690565b6001600160601b0316858560ff16611be5565b60405162461bcd60e51b8152600401610685919061251f565b60208260ff1611156119135760405162461bcd60e51b815260206004820152603a60248201527f54797065644d656d566965772f696e646578202d20417474656d70746564207460448201527f6f20696e646578206d6f7265207468616e2033322062797465730000000000006064820152608401610685565b60088202600061192c8660781c6001600160601b031690565b6001600160601b031690506000600160ff1b60001984011d91909501511695945050505050565b600061122a838360145b600061196a826020612532565b611975906008612555565b60ff166119838585856117f7565b901c949350505050565b600061120162ffffff1983166036602061195d565b6000806119b88660781c6001600160601b031690565b6001600160601b031690506119cc86611c53565b846119d7878461229b565b6119e1919061229b565b11156119f45762ffffff19915050611299565b6119fe858261229b565b9050611a128364ffffffffff16828661164a565b9695505050505050565b6060600080611a348460181c6001600160601b031690565b6001600160601b031690506040519150819250611a548483602001611c8c565b508181016020016040529052919050565b600054610100900460ff16611a8c5760405162461bcd60e51b81526004016106859061257e565b61099e611de3565b6000601882901c6001600160601b031660368111611ab55750600092915050565b6000611ac08461198d565b905081611ace82605661229b565b14949350505050565b6000611ae38260d81c90565b64ffffffffff1664ffffffffff03611afd57506000919050565b6000611b0883611c53565b60405110199392505050565b60008164ffffffffff16611b288460d81c90565b64ffffffffff16149392505050565b600080601f5b600f8160ff161115611b8c576000611b56826008612555565b60ff1685901c9050611b6781611e13565b61ffff16841793508160ff16601014611b8257601084901b93505b5060001901611b3d565b50600f5b60ff8160ff161015611bdf576000611ba9826008612555565b60ff1685901c9050611bba81611e13565b61ffff16831792508160ff16600014611bd557601083901b92505b5060001901611b90565b50915091565b60606000611bf286611b37565b9150506000611c0086611b37565b9150506000611c0e86611b37565b9150506000611c1c86611b37565b91505083838383604051602001611c3694939291906125c9565b604051602081830303815290604052945050505050949350505050565b6000611c688260181c6001600160601b031690565b611c7b8360781c6001600160601b031690565b016001600160601b03169050919050565b600062ffffff1980841603611cf45760405162461bcd60e51b815260206004820152602860248201527f54797065644d656d566965772f636f7079546f202d204e756c6c20706f696e7460448201526732b9103232b932b360c11b6064820152608401610685565b611cfd83611ad7565b611d5d5760405162461bcd60e51b815260206004820152602b60248201527f54797065644d656d566965772f636f7079546f202d20496e76616c696420706f60448201526a34b73a32b9103232b932b360a91b6064820152608401610685565b6000611d728460181c6001600160601b031690565b6001600160601b031690506000611d928560781c6001600160601b031690565b6001600160601b031690506000604051905084811115611db25760206060fd5b8285848460045afa50611a12611dc88760d81c90565b64ffffffffff60601b606091821b168717901b841760181b90565b600054610100900460ff16611e0a5760405162461bcd60e51b81526004016106859061257e565b61099e33611122565b6000611e2560048360ff16901c611e45565b60ff1661ffff919091161760081b611e3c82611e45565b60ff1617919050565b600060f08083179060ff82169003611e605750603092915050565b8060ff1660f103611e745750603192915050565b8060ff1660f203611e885750603292915050565b8060ff1660f303611e9c5750603392915050565b8060ff1660f403611eb05750603492915050565b8060ff1660f503611ec45750603592915050565b8060ff1660f603611ed85750603692915050565b8060ff1660f703611eec5750603792915050565b8060ff1660f803611f005750603892915050565b8060ff1660f903611f145750603992915050565b8060ff1660fa03611f285750606192915050565b8060ff1660fb03611f3c5750606292915050565b8060ff1660fc03611f505750606392915050565b8060ff1660fd03611f645750606492915050565b8060ff1660fe03611f785750606592915050565b8060ff1660ff03611f8c5750606692915050565b50919050565b6001600160a01b0381168114610bdc57600080fd5b600060208284031215611fb957600080fd5b813561122a81611f92565b600060208284031215611fd657600080fd5b5035919050565b803563ffffffff811681146110d557600080fd5b8015158114610bdc57600080fd5b60008083601f84011261201157600080fd5b50813567ffffffffffffffff81111561202957600080fd5b60208301915083602082850101111561204157600080fd5b9250929050565b60008060008060008060a0878903121561206157600080fd5b61206a87611fdd565b955060208701359450604087013561208181611f92565b9350606087013561209181611ff1565b9250608087013567ffffffffffffffff8111156120ad57600080fd5b6120b989828a01611fff565b979a9699509497509295939492505050565b6000602082840312156120dd57600080fd5b61122a82611fdd565b634e487b7160e01b600052604160045260246000fd5b6000806000806080858703121561211257600080fd5b61211b85611fdd565b935061212960208601611fdd565b925060408501359150606085013567ffffffffffffffff8082111561214d57600080fd5b818701915087601f83011261216157600080fd5b813581811115612173576121736120e6565b604051601f8201601f19908116603f0116810190838211818310171561219b5761219b6120e6565b816040528281528a60208487010111156121b457600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b600080604083850312156121eb57600080fd5b6121f483611fdd565b946020939093013593505050565b60008060006040848603121561221757600080fd5b83359250602084013567ffffffffffffffff81111561223557600080fd5b61224186828701611fff565b9497909650939450505050565b6020808252601f908201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604082015260600190565b634e487b7160e01b600052601160045260246000fd5b600082198211156122ae576122ae612285565b500190565b6000602082840312156122c557600080fd5b815161122a81611f92565b6000815180845260005b818110156122f6576020818501810151868301820152016122da565b81811115612308576000602083870101525b50601f01601f19169290920160200192915050565b63ffffffff8416815282602082015260606040820152600061124c60608301846122d0565b60006020828403121561235457600080fd5b5051919050565b63ffffffff8916815287602082015286604082015260018060a01b0386166060820152841515608082015260e060a08201528260e082015260006101008486828501376000838601820152601f8501601f19168301838103820160c08501526123c6818301866122d0565b9c9b505050505050505050505050565b6000828210156123e8576123e8612285565b500390565b8581526001600160a01b0385166020820152831515604082015260a06060820181905260009061241f908301856122d0565b828103608084015261243181856122d0565b98975050505050505050565b6020808252602e908201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160408201526d191e481a5b9a5d1a585b1a5e995960921b606082015260800190565b60006020828403121561249d57600080fd5b815161122a81611ff1565b838152821515602082015260606040820152600061124c60608301846122d0565b600060ff60f81b808a60f81b1683528860018401526001600160601b03198860601b166021840152808760f81b166035840152508460368301528284605684013750600091016056019081529695505050505050565b60208152600061122a60208301846122d0565b600060ff821660ff84168082101561254c5761254c612285565b90039392505050565b600060ff821660ff84168160ff048111821515161561257657612576612285565b029392505050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b7f54797065644d656d566965772f696e646578202d204f76657272616e20746865815274040ecd2caee5c40a6d8d2c6ca40d2e640c2e84060f605b1b60208201526001600160d01b031960d086811b821660358401526e040eed2e8d040d8cadccee8d04060f608b1b603b840181905286821b8316604a8501527f2e20417474656d7074656420746f20696e646578206174206f666673657420306050850152600f60fb1b607085015285821b83166071850152607784015283901b166086820152601760f91b608c8201526000608d8201611a1256fea26469706673582212204bc44b4936e6305cf494c039b75fa50da614328c2fd248af74e711168c6696ae64736f6c634300080f0033";

type PromiseRouterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PromiseRouterConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PromiseRouter__factory extends ContractFactory {
  constructor(...args: PromiseRouterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<PromiseRouter> {
    return super.deploy(overrides || {}) as Promise<PromiseRouter>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): PromiseRouter {
    return super.attach(address) as PromiseRouter;
  }
  override connect(signer: Signer): PromiseRouter__factory {
    return super.connect(signer) as PromiseRouter__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PromiseRouterInterface {
    return new utils.Interface(_abi) as PromiseRouterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PromiseRouter {
    return new Contract(address, _abi, signerOrProvider) as PromiseRouter;
  }
}
