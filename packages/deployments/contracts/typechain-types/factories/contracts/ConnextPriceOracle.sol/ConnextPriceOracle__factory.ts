/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ConnextPriceOracle,
  ConnextPriceOracleInterface,
} from "../../../contracts/ConnextPriceOracle.sol/ConnextPriceOracle";

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
    name: "admin",
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
    name: "getPriceFromDex",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "priceRecords",
    outputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "baseToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "lpToken",
        type: "address",
      },
      {
        internalType: "bool",
        name: "active",
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
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "setAdmin",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "address",
        name: "_baseToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_lpToken",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_active",
        type: "bool",
      },
    ],
    name: "setDexPriceInfo",
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
  "0x608060405234801561001057600080fd5b5060405161111038038061111083398101604081905261002f9161005d565b600180546001600160a01b039092166001600160a01b0319928316179055600080549091163317905561008d565b60006020828403121561006f57600080fd5b81516001600160a01b038116811461008657600080fd5b9392505050565b6110748061009c6000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c806366331bba11610097578063cb45c4f211610066578063cb45c4f2146102a8578063d02641a0146102bb578063f851a440146102ce578063fe10c98d146102e157600080fd5b806366331bba146101ed578063704b6c0214610205578063856d562d14610218578063a2a870a91461022b57600080fd5b80634c8e42a1116100d35780634c8e42a11461018657806350e70d48146101a7578063538e573c146101ba5780635e9a523c146101cd57600080fd5b806309a8acb014610105578063112cdab91461011a5780631994b4fd146101605780633f9fb50514610173575b600080fd5b610118610113366004610c7a565b6102f4565b005b610143610128366004610ca4565b6003602052600090815260409020546001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b61011861016e366004610cbf565b61039b565b610118610181366004610d66565b6104d6565b610199610194366004610ca4565b610639565b604051908152602001610157565b600154610143906001600160a01b031681565b6101996101c8366004610ca4565b6108e9565b6101996101db366004610ca4565b60056020526000908152604090205481565b6101f5600181565b6040519015158152602001610157565b610118610213366004610ca4565b6108fc565b610199610226366004610ca4565b610987565b610273610239366004610ca4565b6004602052600090815260409020805460018201546002909201546001600160a01b0391821692821691811690600160a01b900460ff1684565b60405161015794939291906001600160a01b039485168152928416602084015292166040820152901515606082015260800190565b6101186102b6366004610ca4565b610abd565b6101996102c9366004610ca4565b610b50565b600054610143906001600160a01b031681565b600254610143906001600160a01b031681565b6000546001600160a01b031633146103275760405162461bcd60e51b815260040161031e90610dd2565b60405180910390fd5b6001600160a01b0382166000818152600560209081526040918290205482519384529083015281018290527fe2c8fb681c257e4e8df5ef1c464cff10ce6b072837628c9b6de5e7239a483e5d9060600160405180910390a16001600160a01b03909116600090815260056020526040902055565b6000546001600160a01b031633146103c55760405162461bcd60e51b815260040161031e90610dd2565b6001600160a01b0384166000908152600460205260408120906103e785610b50565b90506000811161042e5760405162461bcd60e51b815260206004820152601260248201527134b73b30b634b2103130b9b2903a37b5b2b760711b604482015260640161031e565b81546001600160a01b038781166001600160a01b031992831681178555600185018054898416941684179055600285018054871515600160a01b81026001600160a81b0319909216948a16948517919091179091556040805192835260208301949094529281019190915260608101919091527f896c992bf7fd70df3a83c741812b6b20c1da89e5efeaefa1fde40987c7e91a129060800160405180910390a1505050505050565b6000546001600160a01b031633146105005760405162461bcd60e51b815260040161031e90610dd2565b60005b838110156106325782828281811061051d5761051d610e09565b90506020020160208101906105329190610ca4565b6003600087878581811061054857610548610e09565b905060200201602081019061055d9190610ca4565b6001600160a01b039081168252602082019290925260400160002080546001600160a01b031916929091169190911790557f89baabef7dfd0683c0ac16fd2a8431c51b49fbe654c3f7b5ef19763e2ccd88f28585838181106105c1576105c1610e09565b90506020020160208101906105d69190610ca4565b8484848181106105e8576105e8610e09565b90506020020160208101906105fd9190610ca4565b604080516001600160a01b0393841681529290911660208301520160405180910390a18061062a81610e35565b915050610503565b5050505050565b6001600160a01b03811660009081526004602052604081206002810154600160a01b900460ff16156108da57805460028201546040516370a0823160e01b81526001600160a01b03918216600482015260009291909116906370a0823190602401602060405180830381865afa1580156106b7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106db9190610e50565b905060008260000160009054906101000a90046001600160a01b03166001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa158015610734573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107589190610e69565b6107669060ff166012610e8c565b9050600061077f61077883600a610f87565b8490610c3d565b600185015460028601546040516370a0823160e01b81526001600160a01b0391821660048201529293506000929116906370a0823190602401602060405180830381865afa1580156107d5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107f99190610e50565b905060008560010160009054906101000a90046001600160a01b03166001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa158015610852573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108769190610e69565b6108849060ff166012610e8c565b9050600061089661077883600a610f87565b60018801549091506000906108b3906001600160a01b0316610b50565b905060006108cb866108c58486610c3d565b90610c52565b9b9a5050505050505050505050565b50600092915050565b50919050565b6000806108f583610987565b9392505050565b6000546001600160a01b031633146109265760405162461bcd60e51b815260040161031e90610dd2565b600080546001600160a01b038381166001600160a01b031983168117909355604080519190921680825260208201939093527ff9ffabca9c8276e99321725bcb43fb076a6c66a54b7f21c4e8146d8519b417dc910160405180910390a15050565b6001600160a01b0380821660009081526003602052604081205490911680156108e3576000816001600160a01b031663feaf968c6040518163ffffffff1660e01b815260040160a060405180830381865afa1580156109ea573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a0e9190610fad565b5050509150508060001415610a27575060009392505050565b60008190506000610ab3846001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa158015610a6f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a939190610e69565b610aa19060ff166012610e8c565b610aac90600a610f87565b8390610c3d565b9695505050505050565b6000546001600160a01b03163314610ae75760405162461bcd60e51b815260040161031e90610dd2565b600254604080516001600160a01b03928316815291831660208301527f42e2900b37aa23ca681e13d6efc8018181fa216ca6676cf2b983e00e056afc2c910160405180910390a1600280546001600160a01b0319166001600160a01b0392909216919091179055565b6000816001600160a01b038116610b6f57506001546001600160a01b03165b6001600160a01b03811660009081526005602052604090205480610b9957610b96826108e9565b90505b80610baa57610ba782610639565b90505b80158015610bc257506002546001600160a01b031615155b156108f557600254604051630681320d60e51b81526001600160a01b0384811660048301529091169063d02641a090602401602060405180830381865afa158015610c11573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c359190610e50565b949350505050565b6000610c498284610ffd565b90505b92915050565b6000610c49828461101c565b80356001600160a01b0381168114610c7557600080fd5b919050565b60008060408385031215610c8d57600080fd5b610c9683610c5e565b946020939093013593505050565b600060208284031215610cb657600080fd5b610c4982610c5e565b60008060008060808587031215610cd557600080fd5b610cde85610c5e565b9350610cec60208601610c5e565b9250610cfa60408601610c5e565b915060608501358015158114610d0f57600080fd5b939692955090935050565b60008083601f840112610d2c57600080fd5b50813567ffffffffffffffff811115610d4457600080fd5b6020830191508360208260051b8501011115610d5f57600080fd5b9250929050565b60008060008060408587031215610d7c57600080fd5b843567ffffffffffffffff80821115610d9457600080fd5b610da088838901610d1a565b90965094506020870135915080821115610db957600080fd5b50610dc687828801610d1a565b95989497509550505050565b60208082526017908201527f63616c6c6572206973206e6f74207468652061646d696e000000000000000000604082015260600190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b6000600019821415610e4957610e49610e1f565b5060010190565b600060208284031215610e6257600080fd5b5051919050565b600060208284031215610e7b57600080fd5b815160ff811681146108f557600080fd5b600082821015610e9e57610e9e610e1f565b500390565b600181815b80851115610ede578160001904821115610ec457610ec4610e1f565b80851615610ed157918102915b93841c9390800290610ea8565b509250929050565b600082610ef557506001610c4c565b81610f0257506000610c4c565b8160018114610f185760028114610f2257610f3e565b6001915050610c4c565b60ff841115610f3357610f33610e1f565b50506001821b610c4c565b5060208310610133831016604e8410600b8410161715610f61575081810a610c4c565b610f6b8383610ea3565b8060001904821115610f7f57610f7f610e1f565b029392505050565b6000610c498383610ee6565b805169ffffffffffffffffffff81168114610c7557600080fd5b600080600080600060a08688031215610fc557600080fd5b610fce86610f93565b9450602086015193506040860151925060608601519150610ff160808701610f93565b90509295509295909350565b600081600019048311821515161561101757611017610e1f565b500290565b60008261103957634e487b7160e01b600052601260045260246000fd5b50049056fea2646970667358221220d747e61d5a072b9394f24d32f14c65a9f6f2ed1d862343b639ccd5ba7c06d45f64736f6c634300080b0033";

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
    _wrapped: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ConnextPriceOracle> {
    return super.deploy(
      _wrapped,
      overrides || {}
    ) as Promise<ConnextPriceOracle>;
  }
  override getDeployTransaction(
    _wrapped: string,
    overrides?: Overrides & { from?: string | Promise<string> }
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
