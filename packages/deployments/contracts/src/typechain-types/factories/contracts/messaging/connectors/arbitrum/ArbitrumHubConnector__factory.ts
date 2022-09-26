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
  ArbitrumHubConnector,
  ArbitrumHubConnectorInterface,
} from "../../../../../contracts/messaging/connectors/arbitrum/ArbitrumHubConnector";

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
        internalType: "uint256",
        name: "_defaultGasPrice",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_outbox",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "NotCrossChainCall",
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
    name: "DefaultGasPriceUpdated",
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
    name: "defaultGasPrice",
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
    name: "outbox",
    outputs: [
      {
        internalType: "contract IArbitrumOutbox",
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
        internalType: "uint64",
        name: "_nodeNum",
        type: "uint64",
      },
      {
        internalType: "bytes32",
        name: "_sendRoot",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_blockHash",
        type: "bytes32",
      },
      {
        internalType: "bytes32[]",
        name: "_proof",
        type: "bytes32[]",
      },
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "address",
            name: "l2Sender",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "l2Block",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "l1Block",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "l2Timestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
        ],
        internalType: "struct L2Message",
        name: "_message",
        type: "tuple",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
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
    inputs: [],
    name: "rollup",
    outputs: [
      {
        internalType: "contract IArbitrumRollup",
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
    name: "sendMessage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_defaultGasPrice",
        type: "uint256",
      },
    ],
    name: "setDefaultGasPrice",
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
  "0x6101006040523480156200001257600080fd5b506040516200222b3803806200222b833981016040819052620000359162000383565b8787878787878585858585856200004c3362000248565b8563ffffffff16600003620000975760405162461bcd60e51b815260206004820152600c60248201526b32b6b83a3c903237b6b0b4b760a11b60448201526064015b60405180910390fd5b6001600160a01b038316620000e35760405162461bcd60e51b815260206004820152601160248201527032b6b83a3c903937b7ba26b0b730b3b2b960791b60448201526064016200008e565b63ffffffff8087166080526001600160a01b0380861660a05284811660c05290861660e0528216156200011b576200011b82620002a7565b80156200012d576200012d8162000310565b604080516001600160a01b0386811682528581166020830152841681830152905163ffffffff87811692908916917f4f9c27c2fe3f84576ea469d367d044da53c45e951617e8389f2b5ed8db9d25f09181900360600190a350505060058b90555050600680546001600160a01b0319166001600160a01b038a169081179091556040805163cb23bcb560e01b8152905191985063cb23bcb597506004808201975060209650919450849003019150829050865afa158015620001f3573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019062000219919062000419565b600780546001600160a01b0319166001600160a01b0392909216919091179055506200043e9650505050505050565b600080546001600160a01b038381166001600160a01b0319808416821785556002859055600180549091169055604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600354604080516001600160a01b03928316815291831660208301527fc77bec288fc88f168427f2f7da682eadb26cac89d8d591af6e443da98dff2bbc910160405180910390a1600380546001600160a01b0319166001600160a01b0392909216919091179055565b60045460408051918252602082018390527f34b09b90f4cfa8747776f5cffd7d53ce7863a9b1f1fc8121903d22543a256511910160405180910390a1600455565b805163ffffffff811681146200036657600080fd5b919050565b80516001600160a01b03811681146200036657600080fd5b600080600080600080600080610100898b031215620003a157600080fd5b620003ac8962000351565b9750620003bc60208a0162000351565b9650620003cc60408a016200036b565b9550620003dc60608a016200036b565b9450620003ec60808a016200036b565b935060a0890151925060c089015191506200040a60e08a016200036b565b90509295985092959890939650565b6000602082840312156200042c57600080fd5b62000437826200036b565b9392505050565b60805160a05160c05160e051611d89620004a2600039600081816101b501526107720152600081816102520152818161059801526107a301526000818161037f015281816103c801528181610b1e0152610fd1015260006102180152611d896000f3fe608060405234801561001057600080fd5b50600436106101735760003560e01c80638da5cb5b116100de578063ce11e6ab11610097578063d232c22011610071578063d232c22014610368578063d69f9d611461037a578063db1b7659146103a1578063e7b4294c146103b457600080fd5b8063ce11e6ab1461033b578063cf796c751461034e578063d1851c921461035757600080fd5b80638da5cb5b146102d65780639d4373a4146102e7578063b1f8100d146102fa578063c5b350df1461030d578063cb23bcb514610315578063cc3942831461032857600080fd5b80635f61e3ec116101305780635f61e3ec1461024d5780636a42b8f81461028c5780636eb67a5114610295578063715018a6146102a857806382646a58146102b05780638b42a40a146102c357600080fd5b806305a79e061461017857806314168416146101b05780633cf52ffb146101ec5780634ff746f6146101fe57806352a9674b146102135780635bd11efc1461023a575b600080fd5b61019b6101863660046116ad565b60086020526000908152604090205460ff1681565b60405190151581526020015b60405180910390f35b6101d77f000000000000000000000000000000000000000000000000000000000000000081565b60405163ffffffff90911681526020016101a7565b6002545b6040519081526020016101a7565b61021161020c366004611706565b6103bd565b005b6101d77f000000000000000000000000000000000000000000000000000000000000000081565b6102116102483660046117cc565b610463565b6102747f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b0390911681526020016101a7565b62093a806101f0565b6102116102a33660046116ad565b61049a565b6102116104ce565b6102116102be366004611706565b61058d565b6102116102d13660046116ad565b61062e565b6000546001600160a01b0316610274565b6102116102f5366004611811565b61069a565b6102116103083660046117cc565b610859565b6102116108fe565b600754610274906001600160a01b031681565b600354610274906001600160a01b031681565b600654610274906001600160a01b031681565b6101f060045481565b6001546001600160a01b0316610274565b6000546001600160a01b03161561019b565b6102747f000000000000000000000000000000000000000000000000000000000000000081565b61019b6103af3660046117cc565b610959565b6101f060055481565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146104275760405162461bcd60e51b815260040161041e9060208082526004908201526310a0a6a160e11b604082015260600190565b60405180910390fd5b7fb3abc57bfeebd2cac918901db582f71972a8e628bccf19f5ae3e3482b98a5ced8133604051610458929190611928565b60405180910390a150565b6000546001600160a01b0316331461048e576040516311a8a1bb60e31b815260040160405180910390fd5b6104978161096a565b50565b6000546001600160a01b031633146104c5576040516311a8a1bb60e31b815260040160405180910390fd5b610497816109d3565b6000546001600160a01b031633146104f9576040516311a8a1bb60e31b815260040160405180910390fd5b60025460000361051c57604051630e4b303f60e21b815260040160405180910390fd5b62093a806002544261052e9190611968565b1161054c576040516386d4b3f160e01b815260040160405180910390fd5b6001546001600160a01b031615610576576040516323295ef960e01b815260040160405180910390fd5b60015461058b906001600160a01b0316610a14565b565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146105f45760405162461bcd60e51b815260206004820152600c60248201526b10b937b7ba26b0b730b3b2b960a11b604482015260640161041e565b6105fd81610a73565b7fa69577a1e55dd0712044e7078b408c39fadff8b3e1b334b202ff17e70eda9fdc8133604051610458929190611928565b6000546001600160a01b03163314610659576040516311a8a1bb60e31b815260040160405180910390fd5b60055460408051918252602082018390527f577c2dd19d86f7555790e151b7455ad2b3897b5c6037646b19672da61a1a8734910160405180910390a1600555565b6106a5878787610ba2565b6106b28685858585610c95565b6106bf60c082018261197f565b90506024146106fa5760405162461bcd60e51b8152602060048201526007602482015266042d8cadccee8d60cb1b604482015260640161041e565b600061075e600460206107518461071460c088018861197f565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509293925050610df89050565b62ffffff19169190610e1c565b60405163473ec9fd60e11b815263ffffffff7f0000000000000000000000000000000000000000000000000000000000000000166004820152602481018290529091507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690638e7d93fa90604401600060405180830381600087803b1580156107ef57600080fd5b505af1158015610803573d6000803e3d6000fd5b507fb3abc57bfeebd2cac918901db582f71972a8e628bccf19f5ae3e3482b98a5ced925061083791505060c084018461197f565b33604051610847939291906119f6565b60405180910390a15050505050505050565b6000546001600160a01b03163314610884576040516311a8a1bb60e31b815260040160405180910390fd5b6001546001600160a01b0382811691161480156108a957506001600160a01b03811615155b156108c7576040516311bc066560e11b815260040160405180910390fd5b6000546001600160a01b038083169116036108f557604051634a2fb73f60e11b815260040160405180910390fd5b61049781610f7c565b6001546001600160a01b03163314610929576040516311a7f27160e11b815260040160405180910390fd5b62093a806002544261093b9190611968565b116105765760405163d39c12bb60e01b815260040160405180910390fd5b600061096482610fca565b92915050565b600354604080516001600160a01b03928316815291831660208301527fc77bec288fc88f168427f2f7da682eadb26cac89d8d591af6e443da98dff2bbc910160405180910390a1600380546001600160a01b0319166001600160a01b0392909216919091179055565b60045460408051918252602082018390527f34b09b90f4cfa8747776f5cffd7d53ce7863a9b1f1fc8121903d22543a256511910160405180910390a1600455565b600080546001600160a01b038381166001600160a01b0319808416821785556002859055600180549091169055604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b8051602014610aae5760405162461bcd60e51b8152602060048201526007602482015266042d8cadccee8d60cb1b604482015260640161041e565b6000634ff746f660e01b82604051602401610ac99190611a22565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092526004805460055460035494516345318d5360e11b81529395506001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000811695638a631aa695610b5a959190921691600091899101611a35565b6020604051808303816000875af1158015610b79573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b9d9190611a73565b505050565b604080516020808201849052818301859052825180830384018152606090920190925280519101206000906007546040516324b204d360e21b815267ffffffffffffffff871660048201529192506000916001600160a01b03909116906392c8134c9060240161018060405180830381865afa158015610c26573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c4a9190611a9c565b905081816040015114610c8e5760405162461bcd60e51b815260206004820152600c60248201526b21636f6e6669726d4461746160a01b604482015260640161041e565b5050505050565b6003546001600160a01b0316610cae60208301836117cc565b6001600160a01b031614610cf75760405162461bcd60e51b815260206004820152601060248201526f10b6b4b93937b921b7b73732b1ba37b960811b604482015260640161041e565b6006546000906001600160a01b0316639f0c04bf610d1860208501856117cc565b610d2860408601602087016117cc565b60408601356060870135608088013560a0890135610d4960c08b018b61197f565b6040518963ffffffff1660e01b8152600401610d6c989796959493929190611b6e565b602060405180830381865afa158015610d89573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dad9190611a73565b9050610df08585808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152508792508591508a9050611010565b505050505050565b815160009060208401610e1364ffffffffff851682846111b1565b95945050505050565b60008160ff16600003610e3157506000610f75565b610e448460181c6001600160601b031690565b6001600160601b0316610e5a60ff841685611bc0565b1115610ebe57610ea5610e768560781c6001600160601b031690565b6001600160601b0316610e928660181c6001600160601b031690565b6001600160601b0316858560ff166111f8565b60405162461bcd60e51b815260040161041e9190611a22565b60208260ff161115610f385760405162461bcd60e51b815260206004820152603a60248201527f54797065644d656d566965772f696e646578202d20417474656d70746564207460448201527f6f20696e646578206d6f7265207468616e203332206279746573000000000000606482015260840161041e565b600882026000610f518660781c6001600160601b031690565b6001600160601b031690506000600160ff1b60001984011d91860151909116925050505b9392505050565b42600255600180546001600160a01b0319166001600160a01b0383169081179091556040517f6ab4d119f23076e8ad491bc65ce85f017fb0591dce08755ba8591059cc51737a90600090a250565b6000610ff57f0000000000000000000000000000000000000000000000000000000000000000611322565b6001600160a01b0316826001600160a01b0316149050919050565b6101008451106110515760405162461bcd60e51b815260206004820152600c60248201526b0e0e4dedecc40d8cadccee8d60a31b604482015260640161041e565b835161105e906002611cbc565b831061109d5760405162461bcd60e51b815260206004820152600e60248201526d10b6b4b734b6b0b610383937b7b360911b604482015260640161041e565b60008381526008602052604090205460ff16156110e45760405162461bcd60e51b81526020600482015260056024820152641cdc195b9d60da1b604482015260640161041e565b600654604051627436d360e01b81526000916001600160a01b031690627436d39061111790889088908890600401611cc8565b602060405180830381865afa158015611134573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111589190611a73565b90508181146111925760405162461bcd60e51b815260206004820152600660248201526510b83937b7b360d11b604482015260640161041e565b5050506000908152600860205260409020805460ff1916600117905550565b6000806111be8385611bc0565b90506040518111156111ce575060005b806000036111e35762ffffff19915050610f75565b5050606092831b9190911790911b1760181b90565b6060600061120586611480565b915050600061121386611480565b915050600061122186611480565b915050600061122f86611480565b604080517f54797065644d656d566965772f696e646578202d204f76657272616e20746865602082015274040ecd2caee5c40a6d8d2c6ca40d2e640c2e84060f605b1b818301526001600160d01b031960d098891b811660558301526e040eed2e8d040d8cadccee8d04060f608b1b605b830181905297891b8116606a8301527f2e20417474656d7074656420746f20696e646578206174206f666673657420306070830152600f60fb1b609083015295881b861660918201526097810196909652951b90921660a68401525050601760f91b60ac8201528151808203608d01815260ad90910190915295945050505050565b60006001600160a01b038216331461134d5760405163253a6fc960e11b815260040160405180910390fd5b6000826001600160a01b031663ab5d89436040518163ffffffff1660e01b8152600401602060405180830381865afa15801561138d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113b19190611d15565b6001600160a01b03166380648b026040518163ffffffff1660e01b8152600401602060405180830381865afa1580156113ee573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114129190611d15565b90506001600160a01b0381166109645760405162461bcd60e51b815260206004820152602d60248201527f4c6962417262697472756d4c313a2073797374656d206d65737361676573207760448201526c34ba3437baba1039b2b73232b960991b606482015260840161041e565b600080601f5b600f8160ff1611156114d557600061149f826008611d32565b60ff1685901c90506114b08161152e565b61ffff16841793508160ff166010146114cb57601084901b93505b5060001901611486565b50600f5b60ff8160ff1610156115285760006114f2826008611d32565b60ff1685901c90506115038161152e565b61ffff16831792508160ff1660001461151e57601083901b92505b50600019016114d9565b50915091565b600061154060048360ff16901c611560565b60ff1661ffff919091161760081b61155782611560565b60ff1617919050565b600060f08083179060ff8216900361157b5750603092915050565b8060ff1660f10361158f5750603192915050565b8060ff1660f2036115a35750603292915050565b8060ff1660f3036115b75750603392915050565b8060ff1660f4036115cb5750603492915050565b8060ff1660f5036115df5750603592915050565b8060ff1660f6036115f35750603692915050565b8060ff1660f7036116075750603792915050565b8060ff1660f80361161b5750603892915050565b8060ff1660f90361162f5750603992915050565b8060ff1660fa036116435750606192915050565b8060ff1660fb036116575750606292915050565b8060ff1660fc0361166b5750606392915050565b8060ff1660fd0361167f5750606492915050565b8060ff1660fe036116935750606592915050565b8060ff1660ff036116a75750606692915050565b50919050565b6000602082840312156116bf57600080fd5b5035919050565b634e487b7160e01b600052604160045260246000fd5b604051610180810167ffffffffffffffff81118282101715611700576117006116c6565b60405290565b60006020828403121561171857600080fd5b813567ffffffffffffffff8082111561173057600080fd5b818401915084601f83011261174457600080fd5b813581811115611756576117566116c6565b604051601f8201601f19908116603f0116810190838211818310171561177e5761177e6116c6565b8160405282815287602084870101111561179757600080fd5b826020860160208301376000928101602001929092525095945050505050565b6001600160a01b038116811461049757600080fd5b6000602082840312156117de57600080fd5b8135610f75816117b7565b67ffffffffffffffff8116811461049757600080fd5b600060e082840312156116a757600080fd5b600080600080600080600060c0888a03121561182c57600080fd5b8735611837816117e9565b96506020880135955060408801359450606088013567ffffffffffffffff8082111561186257600080fd5b818a0191508a601f83011261187657600080fd5b81358181111561188557600080fd5b8b60208260051b850101111561189a57600080fd5b6020830196508095505060808a0135935060a08a01359150808211156118bf57600080fd5b506118cc8a828b016117ff565b91505092959891949750929550565b6000815180845260005b81811015611901576020818501810151868301820152016118e5565b81811115611913576000602083870101525b50601f01601f19169290920160200192915050565b60408152600061193b60408301856118db565b905060018060a01b03831660208301529392505050565b634e487b7160e01b600052601160045260246000fd5b60008282101561197a5761197a611952565b500390565b6000808335601e1984360301811261199657600080fd5b83018035915067ffffffffffffffff8211156119b157600080fd5b6020019150368190038213156119c657600080fd5b9250929050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b604081526000611a0a6040830185876119cd565b905060018060a01b0383166020830152949350505050565b602081526000610f7560208301846118db565b85815284602082015260018060a01b038416604082015282606082015260a060808201526000611a6860a08301846118db565b979650505050505050565b600060208284031215611a8557600080fd5b5051919050565b8051611a97816117e9565b919050565b60006101808284031215611aaf57600080fd5b611ab76116dc565b825181526020830151602082015260408301516040820152611adb60608401611a8c565b6060820152611aec60808401611a8c565b6080820152611afd60a08401611a8c565b60a0820152611b0e60c08401611a8c565b60c0820152611b1f60e08401611a8c565b60e0820152610100611b32818501611a8c565b90820152610120611b44848201611a8c565b90820152610140611b56848201611a8c565b90820152610160928301519281019290925250919050565b600060018060a01b03808b168352808a166020840152508760408301528660608301528560808301528460a083015260e060c0830152611bb260e0830184866119cd565b9a9950505050505050505050565b60008219821115611bd357611bd3611952565b500190565b600181815b80851115611c13578160001904821115611bf957611bf9611952565b80851615611c0657918102915b93841c9390800290611bdd565b509250929050565b600082611c2a57506001610964565b81611c3757506000610964565b8160018114611c4d5760028114611c5757611c73565b6001915050610964565b60ff841115611c6857611c68611952565b50506001821b610964565b5060208310610133831016604e8410600b8410161715611c96575081810a610964565b611ca08383611bd8565b8060001904821115611cb457611cb4611952565b029392505050565b6000610f758383611c1b565b606080825284519082018190526000906020906080840190828801845b82811015611d0157815184529284019290840190600101611ce5565b505050908301949094525060400152919050565b600060208284031215611d2757600080fd5b8151610f75816117b7565b600060ff821660ff84168160ff0481118215151615611cb457611cb461195256fea264697066735822122091db61d9522042ff24b02d709d8bc3a677291f44414c8e307ca472074150e1c964736f6c634300080f0033";

type ArbitrumHubConnectorConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ArbitrumHubConnectorConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ArbitrumHubConnector__factory extends ContractFactory {
  constructor(...args: ArbitrumHubConnectorConstructorParams) {
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
    _defaultGasPrice: PromiseOrValue<BigNumberish>,
    _outbox: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ArbitrumHubConnector> {
    return super.deploy(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _mirrorGas,
      _defaultGasPrice,
      _outbox,
      overrides || {}
    ) as Promise<ArbitrumHubConnector>;
  }
  override getDeployTransaction(
    _domain: PromiseOrValue<BigNumberish>,
    _mirrorDomain: PromiseOrValue<BigNumberish>,
    _amb: PromiseOrValue<string>,
    _rootManager: PromiseOrValue<string>,
    _mirrorConnector: PromiseOrValue<string>,
    _mirrorGas: PromiseOrValue<BigNumberish>,
    _defaultGasPrice: PromiseOrValue<BigNumberish>,
    _outbox: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _mirrorGas,
      _defaultGasPrice,
      _outbox,
      overrides || {}
    );
  }
  override attach(address: string): ArbitrumHubConnector {
    return super.attach(address) as ArbitrumHubConnector;
  }
  override connect(signer: Signer): ArbitrumHubConnector__factory {
    return super.connect(signer) as ArbitrumHubConnector__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ArbitrumHubConnectorInterface {
    return new utils.Interface(_abi) as ArbitrumHubConnectorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ArbitrumHubConnector {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ArbitrumHubConnector;
  }
}
