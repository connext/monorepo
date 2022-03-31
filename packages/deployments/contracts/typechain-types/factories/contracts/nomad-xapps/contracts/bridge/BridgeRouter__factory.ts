/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  BridgeRouter,
  BridgeRouterInterface,
} from "../../../../../contracts/nomad-xapps/contracts/bridge/BridgeRouter";

const _abi = [
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
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "liquidityProvider",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Receive",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint32",
        name: "toDomain",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "toId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "fastLiquidityEnabled",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "externalHash",
        type: "bytes32",
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
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "DUST_AMOUNT",
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
    name: "PRE_FILL_FEE_DENOMINATOR",
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
    name: "PRE_FILL_FEE_NUMERATOR",
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
    name: "connext",
    outputs: [
      {
        internalType: "contract IConnext",
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
        internalType: "uint32",
        name: "_domain",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "_id",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "_custom",
        type: "address",
      },
    ],
    name: "enrollCustom",
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
        internalType: "address",
        name: "_tokenRegistry",
        type: "address",
      },
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
    name: "liquidityProvider",
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
        name: "_oldRepr",
        type: "address",
      },
    ],
    name: "migrate",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "_destination",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "_recipient",
        type: "bytes32",
      },
      {
        internalType: "bool",
        name: "_enableFast",
        type: "bool",
      },
      {
        internalType: "bytes32",
        name: "_externalHash",
        type: "bytes32",
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
    name: "tokenRegistry",
    outputs: [
      {
        internalType: "contract ITokenRegistry",
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
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "xAppConnectionManager",
    outputs: [
      {
        internalType: "contract XAppConnectionManager",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50612ddb806100206000396000f3fe6080604052600436106101175760003560e01c806383bbb8061161009a578063b49c53a711610061578063b49c53a714610328578063ce5494bb1461035c578063de4b05481461037c578063f2fde38b1461039c578063ffa1ad74146103bc57005b806383bbb806146102825780638da5cb5b146102af57806397f641ab146102cd5780639d23c4c7146102e8578063ab2dc3f51461030857005b8063546d573d116100de578063546d573d146101dd5780636cdccfb8146102135780636eb3d5fe14610237578063715018a61461024d5780638022e5591461026257005b806328b1aea0146101205780633339df961461014057806341bdc8b51461017d578063485cc9551461019d5780634d6f2013146101bd57005b3661011e57005b005b34801561012c57600080fd5b5061011e61013b36600461269d565b6103e3565b34801561014c57600080fd5b50606554610160906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b34801561018957600080fd5b5061011e6101983660046126df565b61054d565b3480156101a957600080fd5b5061011e6101b83660046126fc565b610599565b3480156101c957600080fd5b5061011e6101d83660046126df565b610631565b3480156101e957600080fd5b506101606101f8366004612735565b60ca602052600090815260409020546001600160a01b031681565b34801561021f57600080fd5b5061022961270b81565b604051908152602001610174565b34801561024357600080fd5b5061022961271081565b34801561025957600080fd5b5061011e61067d565b34801561026e57600080fd5b5061011e61027d36600461275c565b6106b3565b34801561028e57600080fd5b5061022961029d3660046127c3565b60976020526000908152604090205481565b3480156102bb57600080fd5b506033546001600160a01b0316610160565b3480156102d957600080fd5b5061022966d529ae9e86000081565b3480156102f457600080fd5b5060c954610160906001600160a01b031681565b34801561031457600080fd5b5061011e61032336600461284f565b610a46565b34801561033457600080fd5b5061011e6103433660046128fe565b63ffffffff909116600090815260976020526040902055565b34801561036857600080fd5b5061011e6103773660046126df565b610bad565b34801561038857600080fd5b5060cb54610160906001600160a01b031681565b3480156103a857600080fd5b5061011e6103b73660046126df565b610da4565b3480156103c857600080fd5b506103d1600081565b60405160ff9091168152602001610174565b6033546001600160a01b031633146104165760405162461bcd60e51b815260040161040d9061292a565b60405180910390fd5b6040516340c10f1960e01b8152306004820152600160248201526001600160a01b038216906340c10f1990604401600060405180830381600087803b15801561045e57600080fd5b505af1158015610472573d6000803e3d6000fd5b5050604051632770a7eb60e21b8152306004820152600160248201526001600160a01b0384169250639dc29fac9150604401600060405180830381600087803b1580156104be57600080fd5b505af11580156104d2573d6000803e3d6000fd5b505060c9546040516301458d7560e51b815263ffffffff87166004820152602481018690526001600160a01b03858116604483015290911692506328b1aea09150606401600060405180830381600087803b15801561053057600080fd5b505af1158015610544573d6000803e3d6000fd5b50505050505050565b6033546001600160a01b031633146105775760405162461bcd60e51b815260040161040d9061292a565b606580546001600160a01b0319166001600160a01b0392909216919091179055565b600054610100900460ff166105b45760005460ff16156105b8565b303b155b6105d45760405162461bcd60e51b815260040161040d9061295f565b600054610100900460ff161580156105f6576000805461ffff19166101011790555b60c980546001600160a01b0319166001600160a01b03851617905561061a82610e3f565b801561062c576000805461ff00191690555b505050565b6033546001600160a01b0316331461065b5760405162461bcd60e51b815260040161040d9061292a565b60cb80546001600160a01b0319166001600160a01b0392909216919091179055565b6033546001600160a01b031633146106a75760405162461bcd60e51b815260040161040d9061292a565b6106b16000610ed5565b565b600085116106eb5760405162461bcd60e51b815260206004820152600560248201526408585b5b9d60da1b604482015260640161040d565b826107215760405162461bcd60e51b815260206004820152600660248201526502172656369760d41b604482015260640161040d565b600061072c85610f27565b60c95460405163c86415cb60e01b81526001600160a01b03808b1660048301529293508992600092169063c86415cb90602401602060405180830381865afa15801561077c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107a091906129ad565b156108f9576107ba6001600160a01b038a1633308b610f79565b6108f2826001600160a01b03166306fdde036040518163ffffffff1660e01b81526004016000604051808303816000875af11580156107fd573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261082591908101906129f6565b836001600160a01b03166395d89b416040518163ffffffff1660e01b8152600401600060405180830381865afa158015610863573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261088b91908101906129f6565b846001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa1580156108c9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108ed9190612a64565b610fea565b90506109be565b604051632770a7eb60e21b8152336004820152602481018990526001600160a01b03831690639dc29fac90604401600060405180830381600087803b15801561094157600080fd5b505af1158015610955573d6000803e3d6000fd5b50505050816001600160a01b0316634815fcb16040518163ffffffff1660e01b8152600401602060405180830381865afa158015610997573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109bb9190612a87565b90505b60006109cd878a848989611027565b905060006109dd828c8b886110a5565b905063ffffffff8916336001600160a01b038d167fcb554bfb97d7299e77bf47e9e3e4e26063c84b4f4e06066d4919047b1f57b9628b8e8c8c610a20898b61121a565b604051610a31959493929190612acc565b60405180910390a45050505050505050505050565b610a4f336112fc565b610a865760405162461bcd60e51b8152602060048201526008602482015267217265706c69636160c01b604482015260640161040d565b63ffffffff8416600090815260976020526040902054849083908114610adf5760405162461bcd60e51b815260206004820152600e60248201526d10b932b6b7ba32903937baba32b960911b604482015260640161040d565b6000610af9610aee8583611371565b62ffffff1916611395565b90506000610b0c62ffffff1983166113ae565b90506000610b1f62ffffff1984166113d2565b9050610b3062ffffff198216611420565b15610b4857610b4389898484600061142d565b610ba2565b610b5762ffffff198216611646565b15610b6a57610b4389898484600161142d565b60405162461bcd60e51b815260206004820152600d60248201526c10bb30b634b21030b1ba34b7b760991b604482015260640161040d565b505050505050505050565b60c954604051630e71e25160e01b81526001600160a01b0383811660048301526000921690630e71e25190602401602060405180830381865afa158015610bf8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c1c9190612af9565b9050816001600160a01b0316816001600160a01b03161415610c6d5760405162461bcd60e51b815260206004820152600a60248201526908591a5999995c995b9d60b21b604482015260640161040d565b6040516370a0823160e01b815233600482015282906000906001600160a01b038316906370a0823190602401602060405180830381865afa158015610cb6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cda9190612a87565b604051632770a7eb60e21b8152336004820152602481018290529091506001600160a01b03831690639dc29fac90604401600060405180830381600087803b158015610d2557600080fd5b505af1158015610d39573d6000803e3d6000fd5b50506040516340c10f1960e01b8152336004820152602481018490526001600160a01b03861692506340c10f1991506044015b600060405180830381600087803b158015610d8657600080fd5b505af1158015610d9a573d6000803e3d6000fd5b5050505050505050565b6033546001600160a01b03163314610dce5760405162461bcd60e51b815260040161040d9061292a565b6001600160a01b038116610e335760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161040d565b610e3c81610ed5565b50565b600054610100900460ff16610e5a5760005460ff1615610e5e565b303b155b610e7a5760405162461bcd60e51b815260040161040d9061295f565b600054610100900460ff16158015610e9c576000805461ffff19166101011790555b606580546001600160a01b0319166001600160a01b038416179055610ebf611653565b8015610ed1576000805461ff00191690555b5050565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b63ffffffff811660009081526097602052604090205480610f745760405162461bcd60e51b81526020600482015260076024820152662172656d6f746560c81b604482015260640161040d565b919050565b6040516001600160a01b0380851660248301528316604482015260648101829052610fe49085906323b872dd60e01b906084015b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152611682565b50505050565b600083518484518585604051602001611007959493929190612b16565b6040516020818303038152906040528051906020012090505b9392505050565b60008083611036576003611039565b60045b905061109a81600481111561105057611050612b76565b6110846000848b8b8b8a60405160200161106e959493929190612b8c565b60408051601f1981840301815291905290611371565b6301000000600160d81b031660d89190911b1790565b979650505050505050565b60c9546040516378a9bb4360e11b81526001600160a01b038581166004830152600092839283929091169063f1537686906024016040805180830381865afa1580156110f5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111199190612bd5565b9150915060006111298383611754565b9050606560009054906101000a90046001600160a01b03166001600160a01b0316639fa92f9d6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561117e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111a29190612af9565b6001600160a01b031663fa31de0187876111bc858d61121a565b6040518463ffffffff1660e01b81526004016111da93929190612c03565b600060405180830381600087803b1580156111f457600080fd5b505af1158015611208573d6000803e3d6000fd5b5092955050505050505b949350505050565b6060826001611231815b62ffffff19841690611788565b5061123b84611861565b6112715760405162461bcd60e51b815260206004820152600760248201526610b0b1ba34b7b760c91b604482015260640161040d565b60408051600280825260608201835260009260208301908036833701905050905085816000815181106112a6576112a6612c28565b602002602001019062ffffff1916908162ffffff19168152505084816001815181106112d4576112d4612c28565b62ffffff19909216602092830291909101909101526112f28161187b565b9695505050505050565b606554604051635190bc5360e01b81526001600160a01b0383811660048301526000921690635190bc5390602401602060405180830381865afa158015611347573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061136b91906129ad565b92915050565b81516000906020840161138c64ffffffffff851682846118d0565b95945050505050565b600061136b6113a383611914565b62ffffff1916611946565b60008160026113bc81611224565b5061121262ffffff1985166000602460016119a1565b60008160026113e081611224565b5060006113fb6024601887901c6001600160601b0316612c54565b9050600061140886611a11565b60ff1690506112f262ffffff198716602484846119a1565b600061136b826003611a26565b60c9546000906001600160a01b031663b869d89a61145062ffffff198716611a85565b61145f62ffffff198816611aa7565b6040516001600160e01b031960e085901b16815263ffffffff92909216600483015260248201526044016020604051808303816000875af11580156114a8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114cc9190612af9565b905060006114df62ffffff198516611ac9565b905060006114f262ffffff198616611adc565b9050600061150562ffffff198716611af1565b905084156115b95760cb54611525906001600160a01b0316858484611b06565b60cb546001600160a01b03166386ba778661154562ffffff198916611c21565b6040516001600160e01b031960e084901b16815260048101919091526001600160a01b0380881660248301528616604482015260648101859052608401600060405180830381600087803b15801561159c57600080fd5b505af11580156115b0573d6000803e3d6000fd5b505050506115ce565b6115c583858484611b06565b6115ce83611c36565b6001600160a01b0380841690851667ffffffff0000000060208c901b1663ffffffff8b161760408051600081526020810187905267ffffffffffffffff92909216917f9f9a97db84f39202ca3b409b63f7ccf7d3fd810e176573c7483088b6f181bbbb910160405180910390a4505050505050505050565b600061136b826004611a26565b600054610100900460ff1661167a5760405162461bcd60e51b815260040161040d90612c6b565b6106b1611c8c565b60006116d7826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b0316611cbc9092919063ffffffff16565b80519091501561062c57808060200190518101906116f591906129ad565b61062c5760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b606482015260840161040d565b600061102060016040516001600160e01b031960e087901b166020820152602481018590526110849060009060440161106e565b60006117948383611ccb565b61185a5760006117b36117a78560d81c90565b64ffffffffff16611cee565b91505060006117c88464ffffffffff16611cee565b6040517f5479706520617373657274696f6e206661696c65642e20476f7420307800000060208201526001600160b01b031960b086811b8216603d8401526c05c408af0e0cac6e8cac84060f609b1b604784015283901b16605482015290925060009150605e0160405160208183030381529060405290508060405162461bcd60e51b815260040161040d9190612cb6565b5090919050565b600061186c82611420565b8061136b575061136b82611646565b60405160609060006118908460208401611d9c565b905060006118a78260181c6001600160601b031690565b6001600160601b0316905060006118bd83611e2c565b9184525082016020016040525092915050565b6000806118dd8385612cc9565b90506040518111156118ed575060005b806118ff5762ffffff19915050611020565b5050606092831b9190911790911b1760181b90565b600061191f82611e42565b1561193c576301000000600160d81b038216600160d91b1761136b565b62ffffff1961136b565b600061195182611e65565b61199d5760405162461bcd60e51b815260206004820152601960248201527f56616c696469747920617373657274696f6e206661696c656400000000000000604482015260640161040d565b5090565b6000806119b78660781c6001600160601b031690565b6001600160601b031690506119cb86611ea3565b846119d68784612cc9565b6119e09190612cc9565b11156119f35762ffffff19915050611212565b6119fd8582612cc9565b90506112f28364ffffffffff1682866118d0565b600061136b62ffffff19831660246001611edc565b6000816004811115611a3a57611a3a612b76565b60ff16611a4684611f0c565b60ff161480156110205750816004811115611a6357611a63612b76565b611a6c84611f20565b6004811115611a7d57611a7d612b76565b149392505050565b6000816001611a9381611224565b5061121262ffffff19851660006004611edc565b6000816001611ab581611224565b5061121262ffffff19851660046020611f3b565b600061136b62ffffff198316600d612094565b600061136b62ffffff19831660216020611edc565b600061136b62ffffff19831660416020611f3b565b60c95460405163c86415cb60e01b81526001600160a01b0385811660048301529091169063c86415cb90602401602060405180830381865afa158015611b50573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b7491906129ad565b15611b9257611b8d6001600160a01b03841685846120a2565b610fe4565b6040516340c10f1960e01b81526001600160a01b038581166004830152602482018490528416906340c10f1990604401600060405180830381600087803b158015611bdc57600080fd5b505af1158015611bf0573d6000803e3d6000fd5b505060405163cc2ab7c760e01b8152600481018490526001600160a01b038616925063cc2ab7c79150602401610d6c565b600061136b62ffffff19831660616020611f3b565b66d529ae9e860000816001600160a01b031631108015611c5d575066d529ae9e8600004710155b15610e3c576040516001600160a01b0382169060009066d529ae9e8600009082818181858883f1505050505050565b600054610100900460ff16611cb35760405162461bcd60e51b815260040161040d90612c6b565b6106b133610ed5565b606061121284846000856120d2565b60008164ffffffffff16611cdf8460d81c90565b64ffffffffff16149392505050565b600080601f5b600f8160ff161115611d43576000611d0d826008612ce1565b60ff1685901c9050611d1e816121f8565b61ffff16841793508160ff16601014611d3957601084901b93505b5060001901611cf4565b50600f5b60ff8160ff161015611d96576000611d60826008612ce1565b60ff1685901c9050611d71816121f8565b61ffff16831792508160ff16600014611d8c57601083901b92505b5060001901611d47565b50915091565b600060405182811115611daf5760206060fd5b506000805b8451811015611e1c576000858281518110611dd157611dd1612c28565b60200260200101519050611de78184870161222a565b50611dfb8160181c6001600160601b031690565b6001600160601b031683019250508080611e1490612d0a565b915050611db4565b50606083901b811760181b611212565b6000611e3782612382565b61136b906020612d25565b6000601882901c6001600160601b0316611e5e60816024612cc9565b1492915050565b6000611e718260d81c90565b64ffffffffff1664ffffffffff1415611e8c57506000919050565b6000611e9783611ea3565b60405110199392505050565b6000611eb88260181c6001600160601b031690565b611ecb8360781c6001600160601b031690565b016001600160601b03169050919050565b6000611ee9826020612d44565b611ef4906008612ce1565b60ff16611f02858585611f3b565b901c949350505050565b600061136b62ffffff198316826001611edc565b600060d882901c60ff16600481111561136b5761136b612b76565b600060ff8216611f4d57506000611020565b611f608460181c6001600160601b031690565b6001600160601b0316611f7660ff841685612cc9565b1115611fda57611fc1611f928560781c6001600160601b031690565b6001600160601b0316611fae8660181c6001600160601b031690565b6001600160601b0316858560ff166123b7565b60405162461bcd60e51b815260040161040d9190612cb6565b60208260ff1611156120545760405162461bcd60e51b815260206004820152603a60248201527f54797065644d656d566965772f696e646578202d20417474656d70746564207460448201527f6f20696e646578206d6f7265207468616e203332206279746573000000000000606482015260840161040d565b60088202600061206d8660781c6001600160601b031690565b6001600160601b031690506000600160ff1b60001984011d91909501511695945050505050565b600061102083836014611edc565b6040516001600160a01b03831660248201526044810182905261062c90849063a9059cbb60e01b90606401610fad565b6060824710156121335760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b606482015260840161040d565b6001600160a01b0385163b61218a5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161040d565b600080866001600160a01b031685876040516121a69190612d67565b60006040518083038185875af1925050503d80600081146121e3576040519150601f19603f3d011682016040523d82523d6000602084013e6121e8565b606091505b509150915061109a8282866124e1565b600061220a60048360ff16901c61251a565b60ff1661ffff919091161760081b6122218261251a565b60ff1617919050565b600062ffffff1980841614156122935760405162461bcd60e51b815260206004820152602860248201527f54797065644d656d566965772f636f7079546f202d204e756c6c20706f696e7460448201526732b9103232b932b360c11b606482015260840161040d565b61229c83611e65565b6122fc5760405162461bcd60e51b815260206004820152602b60248201527f54797065644d656d566965772f636f7079546f202d20496e76616c696420706f60448201526a34b73a32b9103232b932b360a91b606482015260840161040d565b60006123118460181c6001600160601b031690565b6001600160601b0316905060006123318560781c6001600160601b031690565b6001600160601b0316905060006040519050848111156123515760206060fd5b8285848460045afa506112f26123678760d81c90565b64ffffffffff60601b606091821b168717901b841760181b90565b600060206123998360181c6001600160601b031690565b6123ad906001600160601b03166020612cc9565b61136b9190612d83565b606060006123c486611cee565b91505060006123d286611cee565b91505060006123e086611cee565b91505060006123ee86611cee565b604080517f54797065644d656d566965772f696e646578202d204f76657272616e20746865602082015274040ecd2caee5c40a6d8d2c6ca40d2e640c2e84060f605b1b818301526001600160d01b031960d098891b811660558301526e040eed2e8d040d8cadccee8d04060f608b1b605b830181905297891b8116606a8301527f2e20417474656d7074656420746f20696e646578206174206f666673657420306070830152600f60fb1b609083015295881b861660918201526097810196909652951b90921660a68401525050601760f91b60ac8201528151808203608d01815260ad90910190915295945050505050565b606083156124f0575081611020565b8251156125005782518084602001fd5b8160405162461bcd60e51b815260040161040d9190612cb6565b600060f08083179060ff821614156125355750603092915050565b8060ff1660f1141561254a5750603192915050565b8060ff1660f2141561255f5750603292915050565b8060ff1660f314156125745750603392915050565b8060ff1660f414156125895750603492915050565b8060ff1660f5141561259e5750603592915050565b8060ff1660f614156125b35750603692915050565b8060ff1660f714156125c85750603792915050565b8060ff1660f814156125dd5750603892915050565b8060ff1660f914156125f25750603992915050565b8060ff1660fa14156126075750606192915050565b8060ff1660fb141561261c5750606292915050565b8060ff1660fc14156126315750606392915050565b8060ff1660fd14156126465750606492915050565b8060ff1660fe141561265b5750606592915050565b8060ff1660ff14156126705750606692915050565b50919050565b63ffffffff81168114610e3c57600080fd5b6001600160a01b0381168114610e3c57600080fd5b6000806000606084860312156126b257600080fd5b83356126bd81612676565b92506020840135915060408401356126d481612688565b809150509250925092565b6000602082840312156126f157600080fd5b813561102081612688565b6000806040838503121561270f57600080fd5b823561271a81612688565b9150602083013561272a81612688565b809150509250929050565b60006020828403121561274757600080fd5b5035919050565b8015158114610e3c57600080fd5b60008060008060008060c0878903121561277557600080fd5b863561278081612688565b955060208701359450604087013561279781612676565b93506060870135925060808701356127ae8161274e565b8092505060a087013590509295509295509295565b6000602082840312156127d557600080fd5b813561102081612676565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561281f5761281f6127e0565b604052919050565b600067ffffffffffffffff821115612841576128416127e0565b50601f01601f191660200190565b6000806000806080858703121561286557600080fd5b843561287081612676565b9350602085013561288081612676565b925060408501359150606085013567ffffffffffffffff8111156128a357600080fd5b8501601f810187136128b457600080fd5b80356128c76128c282612827565b6127f6565b8181528860208385010111156128dc57600080fd5b8160208401602083013760006020838301015280935050505092959194509250565b6000806040838503121561291157600080fd5b823561291c81612676565b946020939093013593505050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b6020808252602e908201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160408201526d191e481a5b9a5d1a585b1a5e995960921b606082015260800190565b6000602082840312156129bf57600080fd5b81516110208161274e565b60005b838110156129e55781810151838201526020016129cd565b83811115610fe45750506000910152565b600060208284031215612a0857600080fd5b815167ffffffffffffffff811115612a1f57600080fd5b8201601f81018413612a3057600080fd5b8051612a3e6128c282612827565b818152856020838501011115612a5357600080fd5b61138c8260208301602086016129ca565b600060208284031215612a7657600080fd5b815160ff8116811461102057600080fd5b600060208284031215612a9957600080fd5b5051919050565b60008151808452612ab88160208601602086016129ca565b601f01601f19169290920160200192915050565b858152846020820152831515604082015282606082015260a06080820152600061109a60a0830184612aa0565b600060208284031215612b0b57600080fd5b815161102081612688565b85815260008551612b2e816020850160208a016129ca565b80830190508560208201528451612b4c8160408401602089016129ca565b60f89490941b6001600160f81b031916604091909401908101939093525050604101949350505050565b634e487b7160e01b600052602160045260246000fd5b600060058710612bac57634e487b7160e01b600052602160045260246000fd5b5060f89590951b8552600185019390935260218401919091526041830152606182015260810190565b60008060408385031215612be857600080fd5b8251612bf381612676565b6020939093015192949293505050565b63ffffffff8416815282602082015260606040820152600061138c6060830184612aa0565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600082821015612c6657612c66612c3e565b500390565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b6020815260006110206020830184612aa0565b60008219821115612cdc57612cdc612c3e565b500190565b600060ff821660ff84168160ff0481118215151615612d0257612d02612c3e565b029392505050565b6000600019821415612d1e57612d1e612c3e565b5060010190565b6000816000190483118215151615612d3f57612d3f612c3e565b500290565b600060ff821660ff841680821015612d5e57612d5e612c3e565b90039392505050565b60008251612d798184602087016129ca565b9190910192915050565b600082612da057634e487b7160e01b600052601260045260246000fd5b50049056fea26469706673582212208fd237e77a4fc211d01e9ccc304eed6f88e7c52589c13587e40281bf994b3a2e64736f6c634300080b0033";

type BridgeRouterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BridgeRouterConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BridgeRouter__factory extends ContractFactory {
  constructor(...args: BridgeRouterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<BridgeRouter> {
    return super.deploy(overrides || {}) as Promise<BridgeRouter>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): BridgeRouter {
    return super.attach(address) as BridgeRouter;
  }
  override connect(signer: Signer): BridgeRouter__factory {
    return super.connect(signer) as BridgeRouter__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BridgeRouterInterface {
    return new utils.Interface(_abi) as BridgeRouterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BridgeRouter {
    return new Contract(address, _abi, signerOrProvider) as BridgeRouter;
  }
}
