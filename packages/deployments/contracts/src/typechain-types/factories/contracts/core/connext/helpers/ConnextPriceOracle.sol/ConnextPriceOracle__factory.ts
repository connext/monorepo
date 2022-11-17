/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../../common";
import type {
  ConnextPriceOracle,
  ConnextPriceOracleInterface,
} from "../../../../../../contracts/core/connext/helpers/ConnextPriceOracle.sol/ConnextPriceOracle";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_wrapped",
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
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "source",
        type: "address",
      },
    ],
    name: "AggregatorUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "oldPrice",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newPrice",
        type: "uint256",
      },
    ],
    name: "DirectPriceUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "NewAdmin",
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
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "baseToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "lpToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "_active",
        type: "bool",
      },
    ],
    name: "PriceRecordUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "V1PriceOracleUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "VALID_PERIOD",
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
    name: "acceptProposedOwner",
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
    name: "aggregators",
    outputs: [
      {
        internalType: "contract AggregatorV3Interface",
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
        name: "",
        type: "address",
      },
    ],
    name: "assetPrices",
    outputs: [
      {
        internalType: "uint256",
        name: "updatedAt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
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
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
    ],
    name: "getPriceFromChainlink",
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
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
    ],
    name: "getPriceFromOracle",
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
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
    ],
    name: "getTokenPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
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
    name: "isPriceOracle",
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
        internalType: "address[]",
        name: "tokenAddresses",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "sources",
        type: "address[]",
      },
    ],
    name: "setAggregators",
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
        name: "_price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_timestamp",
        type: "uint256",
      },
    ],
    name: "setDirectPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_v1PriceOracle",
        type: "address",
      },
    ],
    name: "setV1PriceOracle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "v1PriceOracle",
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
    name: "wrapped",
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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516110a43803806110a483398101604081905261002f91610118565b6001600160a01b0381166100895760405162461bcd60e51b815260206004820152601560248201527f7a65726f20777261707065642061646472657373210000000000000000000000604482015260640160405180910390fd5b600380546001600160a01b0319166001600160a01b0383161790556100ad336100b3565b50610148565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b039092166001600160a01b0319928316178155600255600180549091169055565b60006020828403121561012a57600080fd5b81516001600160a01b038116811461014157600080fd5b9392505050565b610f4d806101576000396000f3fe608060405234801561001057600080fd5b506004361061012c5760003560e01c8063856d562d116100ad578063cb45c4f211610071578063cb45c4f214610283578063d02641a014610296578063d1851c92146102a9578063d232c220146102ba578063fe10c98d146102cc57600080fd5b8063856d562d1461023c5780638da5cb5b1461024f578063ae3379c614610260578063b1f8100d14610268578063c5b350df1461027b57600080fd5b80635e901bdf116100f45780635e901bdf146101c45780635e9a523c146101d757806366331bba146102135780636a42b8f81461022b578063715018a61461023457600080fd5b8063112cdab9146101315780633cf52ffb146101775780633f9fb5051461018957806350e70d481461019e578063538e573c146101b1575b600080fd5b61015a61013f366004610bea565b6005602052600090815260409020546001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b6002545b60405190815260200161016e565b61019c610197366004610c51565b6102df565b005b60035461015a906001600160a01b031681565b61017b6101bf366004610bea565b61043b565b61019c6101d2366004610cbd565b61044e565b6101fe6101e5366004610bea565b6006602052600090815260409020805460019091015482565b6040805192835260208301919091520161016e565b61021b600181565b604051901515815260200161016e565b62093a8061017b565b61019c6105d7565b61017b61024a366004610bea565b61068b565b6000546001600160a01b031661015a565b61017b603c81565b61019c610276366004610bea565b610842565b61019c6108e3565b61019c610291366004610bea565b610953565b6101fe6102a4366004610bea565b6109e7565b6001546001600160a01b031661015a565b6000546001600160a01b03161561021b565b60045461015a906001600160a01b031681565b6000546001600160a01b0316331461030a576040516311a8a1bb60e31b815260040160405180910390fd5b8260005b818110156104335783838281811061032857610328610cf0565b905060200201602081019061033d9190610bea565b6005600088888581811061035357610353610cf0565b90506020020160208101906103689190610bea565b6001600160a01b039081168252602082019290925260400160002080546001600160a01b031916929091169190911790557f89baabef7dfd0683c0ac16fd2a8431c51b49fbe654c3f7b5ef19763e2ccd88f28686838181106103cc576103cc610cf0565b90506020020160208101906103e19190610bea565b8585848181106103f3576103f3610cf0565b90506020020160208101906104089190610bea565b604080516001600160a01b0393841681529290911660208301520160405180910390a160010161030e565b505050505050565b6000806104478361068b565b9392505050565b6000546001600160a01b03163314610479576040516311a8a1bb60e31b815260040160405180910390fd5b816000036104ba5760405162461bcd60e51b815260206004820152600960248201526862616420707269636560b81b60448201526064015b60405180910390fd5b8042111561051057603c6104ce8242610d1c565b1061050b5760405162461bcd60e51b815260206004820152600d60248201526c06261642074696d657374616d7609c1b60448201526064016104b1565b610558565b600361051c4283610d1c565b106105555760405162461bcd60e51b8152602060048201526009602482015268696e2066757475726560b81b60448201526064016104b1565b50425b6001600160a01b0383166000818152600660209081526040918290206001015482519384529083015281018390527fe2c8fb681c257e4e8df5ef1c464cff10ce6b072837628c9b6de5e7239a483e5d9060600160405180910390a16001600160a01b039092166000908152600660205260409020600181019190915555565b6000546001600160a01b03163314610602576040516311a8a1bb60e31b815260040160405180910390fd5b60025460000361062557604051630e4b303f60e21b815260040160405180910390fd5b62093a80600254426106379190610d1c565b11610655576040516386d4b3f160e01b815260040160405180910390fd5b6001546001600160a01b03161561067f576040516323295ef960e01b815260040160405180910390fd5b6106896000610b1b565b565b6001600160a01b03808216600090815260056020526040812054909116801561083957806001600160a01b031663feaf968c6040518163ffffffff1660e01b815260040160a060405180830381865afa925050508015610708575060408051601f3d908101601f1916820190925261070591810190610d4f565b60015b6107155750600092915050565b83158061073957508469ffffffffffffffffffff168169ffffffffffffffffffff16105b80610742575081155b806107565750610753603c83610d9f565b42115b1561076957506000979650505050505050565b6000849050600080886001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa1580156107af573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107d39190610db2565b60ff1690506012811115610808576107ec601282610d1c565b6107f790600a610eb9565b6108019084610ec5565b915061082b565b610813816012610d1c565b61081e90600a610eb9565b6108289084610ee7565b91505b509998505050505050505050565b50600092915050565b6000546001600160a01b0316331461086d576040516311a8a1bb60e31b815260040160405180910390fd5b6001546001600160a01b03828116911614801561088b575060025415155b156108a9576040516311bc066560e11b815260040160405180910390fd5b6000546001600160a01b038083169116036108d757604051634a2fb73f60e11b815260040160405180910390fd5b6108e081610b80565b50565b6001546001600160a01b0316331461090e576040516311a7f27160e11b815260040160405180910390fd5b62093a80600254426109209190610d1c565b1161093e5760405163d39c12bb60e01b815260040160405180910390fd5b600154610689906001600160a01b0316610b1b565b6000546001600160a01b0316331461097e576040516311a8a1bb60e31b815260040160405180910390fd5b600454604080516001600160a01b03928316815291831660208301527f42e2900b37aa23ca681e13d6efc8018181fa216ca6676cf2b983e00e056afc2c910160405180910390a1600480546001600160a01b0319166001600160a01b0392909216919091179055565b600080826001600160a01b038116610a0757506003546001600160a01b03165b6001600160a01b0381166000908152600660205260409020600101548015801590610a5557506001600160a01b038216600090815260066020526040902054603c90610a539042610d1c565b105b15610a69578060015b935093505050915091565b610a728261043b565b90508015610a8257806002610a5e565b6004546001600160a01b031615610b135760048054604051630681320d60e51b81526001600160a01b038581169382019390935291169063d02641a090602401602060405180830381865afa158015610adf573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b039190610efe565b90508015610b1357806003610a5e565b600080610a5e565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b039092166001600160a01b0319928316178155600255600180549091169055565b42600255600180546001600160a01b0319166001600160a01b0383169081179091556040517f6ab4d119f23076e8ad491bc65ce85f017fb0591dce08755ba8591059cc51737a90600090a250565b80356001600160a01b0381168114610be557600080fd5b919050565b600060208284031215610bfc57600080fd5b61044782610bce565b60008083601f840112610c1757600080fd5b50813567ffffffffffffffff811115610c2f57600080fd5b6020830191508360208260051b8501011115610c4a57600080fd5b9250929050565b60008060008060408587031215610c6757600080fd5b843567ffffffffffffffff80821115610c7f57600080fd5b610c8b88838901610c05565b90965094506020870135915080821115610ca457600080fd5b50610cb187828801610c05565b95989497509550505050565b600080600060608486031215610cd257600080fd5b610cdb84610bce565b95602085013595506040909401359392505050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b81810381811115610d2f57610d2f610d06565b92915050565b805169ffffffffffffffffffff81168114610be557600080fd5b600080600080600060a08688031215610d6757600080fd5b610d7086610d35565b9450602086015193506040860151925060608601519150610d9360808701610d35565b90509295509295909350565b80820180821115610d2f57610d2f610d06565b600060208284031215610dc457600080fd5b815160ff8116811461044757600080fd5b600181815b80851115610e10578160001904821115610df657610df6610d06565b80851615610e0357918102915b93841c9390800290610dda565b509250929050565b600082610e2757506001610d2f565b81610e3457506000610d2f565b8160018114610e4a5760028114610e5457610e70565b6001915050610d2f565b60ff841115610e6557610e65610d06565b50506001821b610d2f565b5060208310610133831016604e8410600b8410161715610e93575081810a610d2f565b610e9d8383610dd5565b8060001904821115610eb157610eb1610d06565b029392505050565b60006104478383610e18565b600082610ee257634e487b7160e01b600052601260045260246000fd5b500490565b8082028115828204841417610d2f57610d2f610d06565b600060208284031215610f1057600080fd5b505191905056fea2646970667358221220833a9b811bbf23f3ca721f2dddd36f45ef4ae3c4f3aa31920bcb41acbdf230d064736f6c63430008110033";

type ConnextPriceOracleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ConnextPriceOracleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ConnextPriceOracle__factory extends ContractFactory {
  constructor(...args: ConnextPriceOracleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _wrapped: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ConnextPriceOracle> {
    return super.deploy(
      _wrapped,
      overrides || {}
    ) as Promise<ConnextPriceOracle>;
  }
  override getDeployTransaction(
    _wrapped: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_wrapped, overrides || {});
  }
  override attach(address: string): ConnextPriceOracle {
    return super.attach(address) as ConnextPriceOracle;
  }
  override connect(signer: Signer): ConnextPriceOracle__factory {
    return super.connect(signer) as ConnextPriceOracle__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ConnextPriceOracleInterface {
    return new utils.Interface(_abi) as ConnextPriceOracleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ConnextPriceOracle {
    return new Contract(address, _abi, signerOrProvider) as ConnextPriceOracle;
  }
}
