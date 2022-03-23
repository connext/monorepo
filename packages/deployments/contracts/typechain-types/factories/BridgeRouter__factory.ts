/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { BridgeRouter, BridgeRouterInterface } from "../BridgeRouter";

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
        internalType: "address[3]",
        name: "tokens",
        type: "address[3]",
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
        internalType: "uint256[3]",
        name: "amounts",
        type: "uint256[3]",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "batchRoot",
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
        internalType: "address[3]",
        name: "_tokens",
        type: "address[3]",
      },
      {
        internalType: "uint256[3]",
        name: "_amounts",
        type: "uint256[3]",
      },
      {
        internalType: "uint32",
        name: "_destination",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "_batchRoot",
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
  "0x608060405234801561001057600080fd5b50613011806100206000396000f3fe6080604052600436106101175760003560e01c80638da5cb5b1161009a578063ce5494bb11610061578063ce5494bb1461033c578063de4b05481461035c578063f2fde38b1461037c578063f5cad7fc1461039c578063ffa1ad74146103bc57005b80638da5cb5b1461028f57806397f641ab146102ad5780639d23c4c7146102c8578063ab2dc3f5146102e8578063b49c53a71461030857005b8063546d573d116100de578063546d573d146101dd5780636cdccfb8146102135780636eb3d5fe14610237578063715018a61461024d57806383bbb8061461026257005b806328b1aea0146101205780633339df961461014057806341bdc8b51461017d578063485cc9551461019d5780634d6f2013146101bd57005b3661011e57005b005b34801561012c57600080fd5b5061011e61013b36600461285e565b6103e3565b34801561014c57600080fd5b50606554610160906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b34801561018957600080fd5b5061011e6101983660046128a0565b61054d565b3480156101a957600080fd5b5061011e6101b83660046128bd565b610599565b3480156101c957600080fd5b5061011e6101d83660046128a0565b610631565b3480156101e957600080fd5b506101606101f83660046128f6565b60ca602052600090815260409020546001600160a01b031681565b34801561021f57600080fd5b5061022961270b81565b604051908152602001610174565b34801561024357600080fd5b5061022961271081565b34801561025957600080fd5b5061011e61067d565b34801561026e57600080fd5b5061022961027d36600461290f565b60976020526000908152604090205481565b34801561029b57600080fd5b506033546001600160a01b0316610160565b3480156102b957600080fd5b5061022966d529ae9e86000081565b3480156102d457600080fd5b5060c954610160906001600160a01b031681565b3480156102f457600080fd5b5061011e61030336600461299b565b6106b3565b34801561031457600080fd5b5061011e610323366004612a4a565b63ffffffff909116600090815260976020526040902055565b34801561034857600080fd5b5061011e6103573660046128a0565b6107f0565b34801561036857600080fd5b5060cb54610160906001600160a01b031681565b34801561038857600080fd5b5061011e6103973660046128a0565b6109e7565b3480156103a857600080fd5b5061011e6103b7366004612a87565b610a82565b3480156103c857600080fd5b506103d1600081565b60405160ff9091168152602001610174565b6033546001600160a01b031633146104165760405162461bcd60e51b815260040161040d90612ad7565b60405180910390fd5b6040516340c10f1960e01b8152306004820152600160248201526001600160a01b038216906340c10f1990604401600060405180830381600087803b15801561045e57600080fd5b505af1158015610472573d6000803e3d6000fd5b5050604051632770a7eb60e21b8152306004820152600160248201526001600160a01b0384169250639dc29fac9150604401600060405180830381600087803b1580156104be57600080fd5b505af11580156104d2573d6000803e3d6000fd5b505060c9546040516301458d7560e51b815263ffffffff87166004820152602481018690526001600160a01b03858116604483015290911692506328b1aea09150606401600060405180830381600087803b15801561053057600080fd5b505af1158015610544573d6000803e3d6000fd5b50505050505050565b6033546001600160a01b031633146105775760405162461bcd60e51b815260040161040d90612ad7565b606580546001600160a01b0319166001600160a01b0392909216919091179055565b600054610100900460ff166105b45760005460ff16156105b8565b303b155b6105d45760405162461bcd60e51b815260040161040d90612b0c565b600054610100900460ff161580156105f6576000805461ffff19166101011790555b60c980546001600160a01b0319166001600160a01b03851617905561061a82610fd0565b801561062c576000805461ff00191690555b505050565b6033546001600160a01b0316331461065b5760405162461bcd60e51b815260040161040d90612ad7565b60cb80546001600160a01b0319166001600160a01b0392909216919091179055565b6033546001600160a01b031633146106a75760405162461bcd60e51b815260040161040d90612ad7565b6106b16000611066565b565b6106bc336110b8565b6106f35760405162461bcd60e51b8152602060048201526008602482015267217265706c69636160c01b604482015260640161040d565b63ffffffff841660009081526097602052604090205484908390811461074c5760405162461bcd60e51b815260206004820152600e60248201526d10b932b6b7ba32903937baba32b960911b604482015260640161040d565b600061076661075b858361112d565b62ffffff1916611151565b9050600061077962ffffff19831661116a565b9050600061078c62ffffff1984166111e1565b905061079d62ffffff198316611219565b6107d95760405162461bcd60e51b815260206004820152600d60248201526c10bb30b634b21030b1ba34b7b760991b604482015260640161040d565b6107e589898385611226565b505050505050505050565b60c954604051630e71e25160e01b81526001600160a01b0383811660048301526000921690630e71e25190602401602060405180830381865afa15801561083b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061085f9190612b5a565b9050816001600160a01b0316816001600160a01b031614156108b05760405162461bcd60e51b815260206004820152600a60248201526908591a5999995c995b9d60b21b604482015260640161040d565b6040516370a0823160e01b815233600482015282906000906001600160a01b038316906370a0823190602401602060405180830381865afa1580156108f9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061091d9190612b77565b604051632770a7eb60e21b8152336004820152602481018290529091506001600160a01b03831690639dc29fac90604401600060405180830381600087803b15801561096857600080fd5b505af115801561097c573d6000803e3d6000fd5b50506040516340c10f1960e01b8152336004820152602481018490526001600160a01b03861692506340c10f1991506044015b600060405180830381600087803b1580156109c957600080fd5b505af11580156109dd573d6000803e3d6000fd5b5050505050505050565b6033546001600160a01b03163314610a115760405162461bcd60e51b815260040161040d90612ad7565b6001600160a01b038116610a765760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161040d565b610a7f81611066565b50565b8235610ab85760405162461bcd60e51b815260206004820152600560248201526408585b5b9d60da1b604482015260640161040d565b6000610ac383611418565b9050610acd612819565b610ad5612819565b610add612819565b60005b6003811015610f0a576000898260038110610afd57610afd612b90565b602002016020810190610b1091906128a0565b90506001600160a01b038116610b265750610f0a565b60c95460009081906001600160a01b031663f15376868d8660038110610b4e57610b4e612b90565b602002016020810190610b6191906128a0565b6040516001600160e01b031960e084901b1681526001600160a01b0390911660048201526024016040805180830381865afa158015610ba4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bc89190612ba6565b9150915081868560038110610bdf57610bdf612b90565b63ffffffff909216602092909202015280858560038110610c0257610c02612b90565b602002015260c95460405163c86415cb60e01b81526001600160a01b038086166004830152859260009291169063c86415cb90602401602060405180830381865afa158015610c55573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c799190612bd4565b15610df357610cb433308f8960038110610c9557610c95612b90565b6020020135886001600160a01b031661146a909392919063ffffffff16565b610dec826001600160a01b03166306fdde036040518163ffffffff1660e01b81526004016000604051808303816000875af1158015610cf7573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610d1f9190810190612c22565b836001600160a01b03166395d89b416040518163ffffffff1660e01b8152600401600060405180830381865afa158015610d5d573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610d859190810190612c22565b846001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa158015610dc3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610de79190612c90565b6114db565b9050610ef2565b816001600160a01b0316639dc29fac338f8960038110610e1557610e15612b90565b6040516001600160e01b031960e086901b1681526001600160a01b03909316600484015260200201356024820152604401600060405180830381600087803b158015610e6057600080fd5b505af1158015610e74573d6000803e3d6000fd5b50505050816001600160a01b0316634815fcb16040518163ffffffff1660e01b8152600401602060405180830381865afa158015610eb6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610eda9190612b77565b898760038110610eec57610eec612b90565b60200201525b50505050508080610f0290612cc9565b915050610ae0565b506000610f466000801b878a60038060200260405190810160405280929190826003602002808284376000920191909152508991506115189050565b90506000610f578285858b8a61159b565b90508763ffffffff16336001600160a01b03168b604051610f789190612ce4565b60405180910390207f17fe35d54619d9b9ad77088e0288d5adfd7ac3755a21dc1d5138811aa6a7c8d58c8b610fad8789611696565b604051610fbc93929190612d57565b60405180910390a450505050505050505050565b600054610100900460ff16610feb5760005460ff1615610fef565b303b155b61100b5760405162461bcd60e51b815260040161040d90612b0c565b600054610100900460ff1615801561102d576000805461ffff19166101011790555b606580546001600160a01b0319166001600160a01b038416179055611050611765565b8015611062576000805461ff00191690555b5050565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b606554604051635190bc5360e01b81526001600160a01b0383811660048301526000921690635190bc5390602401602060405180830381865afa158015611103573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111279190612bd4565b92915050565b81516000906020840161114864ffffffffff85168284611794565b95945050505050565b600061112761115f836117d8565b62ffffff191661180a565b6000816002611181815b62ffffff19841690611865565b50600061119060246003612d91565b6111a790601887901c6001600160601b0316612db0565b905060006111b48661193e565b60ff1690506111d76111c860246003612d91565b62ffffff19881690848461195e565b9695505050505050565b60008160026111ef81611174565b50611211600061120160246003612d91565b62ffffff1987169190600661195e565b949350505050565b60006111278260056119cd565b60cb546001600160a01b031660005b60038110156113ab57600061125062ffffff19861683611a2c565b90508061125d57506113ab565b600061126f62ffffff19871684611a63565b60c954604051635c34ec4d60e11b815263ffffffff83166004820152602481018590529192506000916001600160a01b039091169063b869d89a906044016020604051808303816000875af11580156112cc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112f09190612b5a565b9050600061130462ffffff19881686611a8f565b9050600061131862ffffff19891687611ac4565b905061132687848484611aee565b6001600160a01b0380881690841667ffffffff0000000060208e901b1663ffffffff8d161760408051600081526020810187905267ffffffffffffffff92909216917f9f9a97db84f39202ca3b409b63f7ccf7d3fd810e176573c7483088b6f181bbbb910160405180910390a4505050505080806113a390612cc9565b915050611235565b5060cb546001600160a01b031663a5730fd36113cc62ffffff198516611c09565b6040518263ffffffff1660e01b81526004016113ea91815260200190565b600060405180830381600087803b15801561140457600080fd5b505af11580156107e5573d6000803e3d6000fd5b63ffffffff8116600090815260976020526040902054806114655760405162461bcd60e51b81526020600482015260076024820152662172656d6f746560c81b604482015260640161040d565b919050565b6040516001600160a01b03808516602483015283166044820152606481018290526114d59085906323b872dd60e01b906084015b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152611c1e565b50505050565b6000835184845185856040516020016114f8959493929190612dc7565b6040516020818303038152906040528051906020012090505b9392505050565b600060056111d7816115856000848a8a898460200201518b600060200201518b600160200201518d600160200201518d600260200201518f6002602002015160405160200161156f99989796959493929190612e27565b60408051601f198184030181529190529061112d565b6301000000600160d81b031660d89190911b1790565b6000806115a88686611cf0565b9050606560009054906101000a90046001600160a01b03166001600160a01b0316639fa92f9d6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156115fd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116219190612b5a565b6001600160a01b031663fa31de01858561163b858c611696565b6040518463ffffffff1660e01b815260040161165993929190612e8b565b600060405180830381600087803b15801561167357600080fd5b505af1158015611687573d6000803e3d6000fd5b50929998505050505050505050565b60608260066116a481611174565b506116ae84611d63565b6116e45760405162461bcd60e51b815260206004820152600760248201526610b0b1ba34b7b760c91b604482015260640161040d565b604080516002808252606082018352600092602083019080368337019050509050858160008151811061171957611719612b90565b602002602001019062ffffff1916908162ffffff191681525050848160018151811061174757611747612b90565b62ffffff19909216602092830291909101909101526111d781611d8c565b600054610100900460ff1661178c5760405162461bcd60e51b815260040161040d90612eb0565b6106b1611de8565b6000806117a18484611e18565b90506040518111156117b1575060005b806117c35762ffffff19915050611511565b5050606092831b9190911790911b1760181b90565b60006117e382611e24565b15611800576301000000600160d81b038216600160d91b17611127565b62ffffff19611127565b600061181582611e54565b6118615760405162461bcd60e51b815260206004820152601960248201527f56616c696469747920617373657274696f6e206661696c656400000000000000604482015260640161040d565b5090565b60006118718383611e92565b6119375760006118906118848560d81c90565b64ffffffffff16611eb5565b91505060006118a58464ffffffffff16611eb5565b6040517f5479706520617373657274696f6e206661696c65642e20476f7420307800000060208201526001600160b01b031960b086811b8216603d8401526c05c408af0e0cac6e8cac84060f609b1b604784015283901b16605482015290925060009150605e0160405160208183030381529060405290508060405162461bcd60e51b815260040161040d9190612efb565b5090919050565b600061112761194f60246003612d91565b62ffffff198416906001611f61565b6000806119748660781c6001600160601b031690565b6001600160601b0316905061198886611f91565b61199c856119968489611e18565b90611e18565b11156119af5762ffffff19915050611211565b6119b98186611e18565b90506111d78364ffffffffff168286611794565b60008160068111156119e1576119e1612d7b565b60ff166119ed84611fd2565b60ff161480156115115750816006811115611a0a57611a0a612d7b565b611a1384611fe6565b6006811115611a2457611a24612d7b565b149392505050565b6000826006611a3a81611174565b50611148611a49602486612d91565b611a54906004612f0e565b62ffffff198716906020612001565b6000826006611a7181611174565b50611148611a80602486612d91565b62ffffff198716906004611f61565b6000611511611a9f836040612d91565b611aaa906041612f0e565b611ab5906020612f0e565b62ffffff198516906020611f61565b6000611511611ad4836040612d91565b611adf906041612f0e565b62ffffff198516906020612001565b60c95460405163c86415cb60e01b81526001600160a01b0385811660048301529091169063c86415cb90602401602060405180830381865afa158015611b38573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b5c9190612bd4565b15611b7a57611b756001600160a01b038416858461215a565b6114d5565b6040516340c10f1960e01b81526001600160a01b038581166004830152602482018490528416906340c10f1990604401600060405180830381600087803b158015611bc457600080fd5b505af1158015611bd8573d6000803e3d6000fd5b505060405163cc2ab7c760e01b8152600481018490526001600160a01b038616925063cc2ab7c791506024016109af565b600061112762ffffff19831660216020612001565b6000611c73826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b031661218a9092919063ffffffff16565b80519091501561062c5780806020019051810190611c919190612bd4565b61062c5760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b606482015260840161040d565b81518151602080850151818501516040808801518188015191516001600160e01b031960e098891b811696820196909652602481019690965292861b841660448601526048850191909152931b166068820152606c81019190915260009061151190600690611585908490608c0161156f565b6000611d6e82612199565b80611d7d5750611d7d826121a6565b80611127575061112782611219565b6040516060906000611da884611da3846020612f0e565b6121b3565b90506000611dbf8260181c6001600160601b031690565b6001600160601b031690506000611dd583612254565b9184525082016020016040525092915050565b600054610100900460ff16611e0f5760405162461bcd60e51b815260040161040d90612eb0565b6106b133611066565b60006115118284612f0e565b6000601882901c6001600160601b0316610101611e4360246003612d91565b611e4d9190612f0e565b1492915050565b6000611e608260d81c90565b64ffffffffff1664ffffffffff1415611e7b57506000919050565b6000611e8683611f91565b60405110199392505050565b60008164ffffffffff16611ea68460d81c90565b64ffffffffff16149392505050565b600080601f5b600f8160ff161115611f13576000611ed4826008612f26565b60ff1685901c9050611ee58161226a565b61ffff16841793508160ff16601014611f0057601084901b93505b50611f0c600182612f4f565b9050611ebb565b50600f5b60ff8160ff161015611f5b5760ff600882021684901c611f368161226a565b61ffff16831792508160ff16600014611f5157601083901b92505b5060001901611f17565b50915091565b6000611f6e826020612f4f565b611f79906008612f26565b60ff16611f87858585612001565b901c949350505050565b6000611fa68260181c6001600160601b031690565b611fb98360781c6001600160601b031690565b611fc39190612f72565b6001600160601b031692915050565b600061112762ffffff198316826001611f61565b600060d882901c60ff16600681111561112757611127612d7b565b600060ff821661201357506000611511565b6120268460181c6001600160601b031690565b6001600160601b031661203c8460ff8516611e18565b11156120a0576120876120588560781c6001600160601b031690565b6001600160601b03166120748660181c6001600160601b031690565b6001600160601b0316858560ff1661229c565b60405162461bcd60e51b815260040161040d9190612efb565b60208260ff16111561211a5760405162461bcd60e51b815260206004820152603a60248201527f54797065644d656d566965772f696e646578202d20417474656d70746564207460448201527f6f20696e646578206d6f7265207468616e203332206279746573000000000000606482015260840161040d565b6008820260006121338660781c6001600160601b031690565b6001600160601b031690506000600160ff1b60001984011d91909501511695945050505050565b6040516001600160a01b03831660248201526044810182905261062c90849063a9059cbb60e01b9060640161149e565b606061121184846000856123c6565b60006111278260036119cd565b60006111278260046119cd565b6000604051828111156121c65760206060fd5b506000805b84518110156122445760008582815181106121e8576121e8612b90565b602002602001015190506122078184876122029190612f0e565b6124f7565b5061221b8160181c6001600160601b031690565b61222e906001600160601b031684612f0e565b925050808061223c90612cc9565b9150506121cb565b50606083901b811760181b611211565b600061225f8261264f565b611127906020612d91565b600061227c60048360ff16901c612684565b60ff1661ffff919091161760081b61229382612684565b60ff1617919050565b606060006122a986611eb5565b91505060006122b786611eb5565b91505060006122c586611eb5565b91505060006122d386611eb5565b604080517f54797065644d656d566965772f696e646578202d204f76657272616e20746865602082015274040ecd2caee5c40a6d8d2c6ca40d2e640c2e84060f605b1b818301526001600160d01b031960d098891b811660558301526e040eed2e8d040d8cadccee8d04060f608b1b605b830181905297891b8116606a8301527f2e20417474656d7074656420746f20696e646578206174206f666673657420306070830152600f60fb1b609083015295881b861660918201526097810196909652951b90921660a68401525050601760f91b60ac8201528151808203608d01815260ad90910190915295945050505050565b6060824710156124275760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b606482015260840161040d565b6001600160a01b0385163b61247e5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161040d565b600080866001600160a01b0316858760405161249a9190612f9d565b60006040518083038185875af1925050503d80600081146124d7576040519150601f19603f3d011682016040523d82523d6000602084013e6124dc565b606091505b50915091506124ec8282866127e0565b979650505050505050565b600062ffffff1980841614156125605760405162461bcd60e51b815260206004820152602860248201527f54797065644d656d566965772f636f7079546f202d204e756c6c20706f696e7460448201526732b9103232b932b360c11b606482015260840161040d565b61256983611e54565b6125c95760405162461bcd60e51b815260206004820152602b60248201527f54797065644d656d566965772f636f7079546f202d20496e76616c696420706f60448201526a34b73a32b9103232b932b360a91b606482015260840161040d565b60006125de8460181c6001600160601b031690565b6001600160601b0316905060006125fe8560781c6001600160601b031690565b6001600160601b03169050600060405190508481111561261e5760206060fd5b8285848460045afa506111d76126348760d81c90565b64ffffffffff60601b606091821b168717901b841760181b90565b6000602061267a602061266b8560181c6001600160601b031690565b6001600160601b031690611e18565b6111279190612fb9565b600060f08083179060ff8216141561269f5750603092915050565b8060ff1660f114156126b45750603192915050565b8060ff1660f214156126c95750603292915050565b8060ff1660f314156126de5750603392915050565b8060ff1660f414156126f35750603492915050565b8060ff1660f514156127085750603592915050565b8060ff1660f6141561271d5750603692915050565b8060ff1660f714156127325750603792915050565b8060ff1660f814156127475750603892915050565b8060ff1660f9141561275c5750603992915050565b8060ff1660fa14156127715750606192915050565b8060ff1660fb14156127865750606292915050565b8060ff1660fc141561279b5750606392915050565b8060ff1660fd14156127b05750606492915050565b8060ff1660fe14156127c55750606592915050565b8060ff1660ff14156127da5750606692915050565b50919050565b606083156127ef575081611511565b8251156127ff5782518084602001fd5b8160405162461bcd60e51b815260040161040d9190612efb565b60405180606001604052806003906020820280368337509192915050565b63ffffffff81168114610a7f57600080fd5b6001600160a01b0381168114610a7f57600080fd5b60008060006060848603121561287357600080fd5b833561287e81612837565b925060208401359150604084013561289581612849565b809150509250925092565b6000602082840312156128b257600080fd5b813561151181612849565b600080604083850312156128d057600080fd5b82356128db81612849565b915060208301356128eb81612849565b809150509250929050565b60006020828403121561290857600080fd5b5035919050565b60006020828403121561292157600080fd5b813561151181612837565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561296b5761296b61292c565b604052919050565b600067ffffffffffffffff82111561298d5761298d61292c565b50601f01601f191660200190565b600080600080608085870312156129b157600080fd5b84356129bc81612837565b935060208501356129cc81612837565b925060408501359150606085013567ffffffffffffffff8111156129ef57600080fd5b8501601f81018713612a0057600080fd5b8035612a13612a0e82612973565b612942565b818152886020838501011115612a2857600080fd5b8160208401602083013760006020838301015280935050505092959194509250565b60008060408385031215612a5d57600080fd5b8235612a6881612837565b946020939093013593505050565b806060810183101561112757600080fd5b6000806000806101008587031215612a9e57600080fd5b612aa88686612a76565b9350612ab78660608701612a76565b925060c0850135612ac781612837565b9396929550929360e00135925050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b6020808252602e908201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160408201526d191e481a5b9a5d1a585b1a5e995960921b606082015260800190565b600060208284031215612b6c57600080fd5b815161151181612849565b600060208284031215612b8957600080fd5b5051919050565b634e487b7160e01b600052603260045260246000fd5b60008060408385031215612bb957600080fd5b8251612bc481612837565b6020939093015192949293505050565b600060208284031215612be657600080fd5b8151801515811461151157600080fd5b60005b83811015612c11578181015183820152602001612bf9565b838111156114d55750506000910152565b600060208284031215612c3457600080fd5b815167ffffffffffffffff811115612c4b57600080fd5b8201601f81018413612c5c57600080fd5b8051612c6a612a0e82612973565b818152856020838501011115612c7f57600080fd5b611148826020830160208601612bf6565b600060208284031215612ca257600080fd5b815160ff8116811461151157600080fd5b634e487b7160e01b600052601160045260246000fd5b6000600019821415612cdd57612cdd612cb3565b5060010190565b60008183825b6003811015612d1c578135612cfe81612849565b6001600160a01b031683526020928301929190910190600101612cea565b50505060608201905092915050565b60008151808452612d43816020860160208601612bf6565b601f01601f19169290920160200192915050565b60608482376060810183905260a06080820181905260009061114890830184612d2b565b634e487b7160e01b600052602160045260246000fd5b6000816000190483118215151615612dab57612dab612cb3565b500290565b600082821015612dc257612dc2612cb3565b500390565b85815260008551612ddf816020850160208a01612bf6565b80830190508560208201528451612dfd816040840160208901612bf6565b60f89490941b6001600160f81b031916604091909401908101939093525050604101949350505050565b600060078b10612e4757634e487b7160e01b600052602160045260246000fd5b5060f89990991b89526001890197909752602188019590955260418701939093526061860191909152608185015260a184015260c183015260e18201526101010190565b63ffffffff841681528260208201526060604082015260006111486060830184612d2b565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b6020815260006115116020830184612d2b565b60008219821115612f2157612f21612cb3565b500190565b600060ff821660ff84168160ff0481118215151615612f4757612f47612cb3565b029392505050565b600060ff821660ff841680821015612f6957612f69612cb3565b90039392505050565b60006001600160601b03808316818516808303821115612f9457612f94612cb3565b01949350505050565b60008251612faf818460208701612bf6565b9190910192915050565b600082612fd657634e487b7160e01b600052601260045260246000fd5b50049056fea2646970667358221220605f973b88c27f55be2bd19ad43fc9e85c6b9ff0702b666f92a158f51bd7e3fc64736f6c634300080b0033";

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
    this.contractName = "BridgeRouter";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<BridgeRouter> {
    return super.deploy(overrides || {}) as Promise<BridgeRouter>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): BridgeRouter {
    return super.attach(address) as BridgeRouter;
  }
  connect(signer: Signer): BridgeRouter__factory {
    return super.connect(signer) as BridgeRouter__factory;
  }
  static readonly contractName: "BridgeRouter";
  public readonly contractName: "BridgeRouter";
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
