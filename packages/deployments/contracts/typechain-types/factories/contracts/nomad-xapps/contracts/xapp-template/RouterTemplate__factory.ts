/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  RouterTemplate,
  RouterTemplateInterface,
} from "../../../../../contracts/nomad-xapps/contracts/xapp-template/RouterTemplate";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_xAppConnectionManager",
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
        internalType: "uint256",
        name: "number",
        type: "uint256",
      },
    ],
    name: "TypeAReceived",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_destinationDomain",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "_number",
        type: "uint256",
      },
    ],
    name: "dispatchTypeA",
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
        name: "",
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
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620012193803806200121983398101604081905262000034916200027d565b6200003f8162000046565b50620002af565b600054610100900460ff16620000635760005460ff16156200006d565b6200006d62000135565b620000d65760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b600054610100900460ff16158015620000f9576000805461ffff19166101011790555b606580546001600160a01b0319166001600160a01b0384161790556200011e62000153565b801562000131576000805461ff00191690555b5050565b60006200014d30620001bb60201b620004611760201c565b15905090565b600054610100900460ff16620001af5760405162461bcd60e51b815260206004820152602b6024820152600080516020620011f983398151915260448201526a6e697469616c697a696e6760a81b6064820152608401620000cd565b620001b9620001ca565b565b6001600160a01b03163b151590565b600054610100900460ff16620002265760405162461bcd60e51b815260206004820152602b6024820152600080516020620011f983398151915260448201526a6e697469616c697a696e6760a81b6064820152608401620000cd565b620001b933603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000602082840312156200029057600080fd5b81516001600160a01b0381168114620002a857600080fd5b9392505050565b610f3a80620002bf6000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c806383bbb8061161006657806383bbb806146100f85780638da5cb5b14610126578063ab2dc3f514610137578063b49c53a71461014a578063f2fde38b1461017157600080fd5b80631984a330146100985780633339df96146100ad57806341bdc8b5146100dd578063715018a6146100f0575b600080fd5b6100ab6100a6366004610c35565b610184565b005b6065546100c0906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b6100ab6100eb366004610c74565b610231565b6100ab610286565b610118610106366004610c91565b60976020526000908152604090205481565b6040519081526020016100d4565b6033546001600160a01b03166100c0565b6100ab610145366004610cc2565b6102bc565b6100ab610158366004610c35565b63ffffffff909116600090815260976020526040902055565b6100ab61017f366004610c74565b6103c6565b600061018f83610470565b905060006101c08360408051600160f81b602082015260218082019390935281518082039093018352604101905290565b90506101ca6104c2565b6001600160a01b031663fa31de018584846040518463ffffffff1660e01b81526004016101f993929190610deb565b600060405180830381600087803b15801561021357600080fd5b505af1158015610227573d6000803e3d6000fd5b5050505050505050565b6033546001600160a01b031633146102645760405162461bcd60e51b815260040161025b90610e10565b60405180910390fd5b606580546001600160a01b0319166001600160a01b0392909216919091179055565b6033546001600160a01b031633146102b05760405162461bcd60e51b815260040161025b90610e10565b6102ba6000610535565b565b6102c533610587565b6102fc5760405162461bcd60e51b8152602060048201526008602482015267217265706c69636160c01b604482015260640161025b565b63ffffffff84166000908152609760205260409020548490839081146103555760405162461bcd60e51b815260206004820152600e60248201526d10b932b6b7ba32903937baba32b960911b604482015260640161025b565b600061036184826105fc565b905061037262ffffff198216610620565b156103855761038081610645565b6103bd565b60405162461bcd60e51b815260206004820152600d60248201526c10bb30b634b21030b1ba34b7b760991b604482015260640161025b565b50505050505050565b6033546001600160a01b031633146103f05760405162461bcd60e51b815260040161025b90610e10565b6001600160a01b0381166104555760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161025b565b61045e81610535565b50565b6001600160a01b03163b151590565b63ffffffff8116600090815260976020526040902054806104bd5760405162461bcd60e51b81526020600482015260076024820152662172656d6f746560c81b604482015260640161025b565b919050565b60655460408051639fa92f9d60e01b815290516000926001600160a01b031691639fa92f9d9160048083019260209291908290030181865afa15801561050c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105309190610e5b565b905090565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b606554604051635190bc5360e01b81526001600160a01b0383811660048301526000921690635190bc5390602401602060405180830381865afa1580156105d2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105f69190610e78565b92915050565b81516000906020840161061764ffffffffff85168284610695565b95945050505050565b6000600161062d836106dc565b600181111561063e5761063e610e45565b1492915050565b600061065662ffffff1983166106f7565b90507f2b51a16951b17b51a53e06c3041d704232f26354acf317a5b7bfeab23f4ca6298160405161068991815260200190565b60405180910390a15050565b6000806106a28385610eb0565b90506040518111156106b2575060005b806106c45762ffffff199150506106d5565b5050606083811b8317901b811760181b5b9392505050565b600060d882901c60ff1660018111156105f6576105f6610e45565b600061070282610620565b6107655760405162461bcd60e51b815260206004820152602e60248201527f4d65737361676554656d706c6174652f6e756d6265723a2076696577206d757360448201526d74206265206f662074797065204160901b606482015260840161025b565b6105f662ffffff19831660006020816107878460181c6001600160601b031690565b6001600160601b031661079d60ff841685610eb0565b1115610801576107e86107b98560781c6001600160601b031690565b6001600160601b03166107d58660181c6001600160601b031690565b6001600160601b0316858560ff166108bb565b60405162461bcd60e51b815260040161025b9190610ec8565b60208260ff16111561087b5760405162461bcd60e51b815260206004820152603a60248201527f54797065644d656d566965772f696e646578202d20417474656d70746564207460448201527f6f20696e646578206d6f7265207468616e203332206279746573000000000000606482015260840161025b565b6008820260006108948660781c6001600160601b031690565b6001600160601b031690506000600160ff1b60001984011d91909501511695945050505050565b606060006108c8866109e5565b91505060006108d6866109e5565b91505060006108e4866109e5565b91505060006108f2866109e5565b604080517f54797065644d656d566965772f696e646578202d204f76657272616e20746865602082015274040ecd2caee5c40a6d8d2c6ca40d2e640c2e84060f605b1b818301526001600160d01b031960d098891b811660558301526e040eed2e8d040d8cadccee8d04060f608b1b605b830181905297891b8116606a8301527f2e20417474656d7074656420746f20696e646578206174206f666673657420306070830152600f60fb1b609083015295881b861660918201526097810196909652951b90921660a68401525050601760f91b60ac8201528151808203608d01815260ad90910190915295945050505050565b600080601f5b600f8160ff161115610a3a576000610a04826008610edb565b60ff1685901c9050610a1581610a93565b61ffff16841793508160ff16601014610a3057601084901b93505b50600019016109eb565b50600f5b60ff8160ff161015610a8d576000610a57826008610edb565b60ff1685901c9050610a6881610a93565b61ffff16831792508160ff16600014610a8357601083901b92505b5060001901610a3e565b50915091565b6000610aa560048360ff16901c610ac5565b60ff1661ffff919091161760081b610abc82610ac5565b60ff1617919050565b600060f08083179060ff82161415610ae05750603092915050565b8060ff1660f11415610af55750603192915050565b8060ff1660f21415610b0a5750603292915050565b8060ff1660f31415610b1f5750603392915050565b8060ff1660f41415610b345750603492915050565b8060ff1660f51415610b495750603592915050565b8060ff1660f61415610b5e5750603692915050565b8060ff1660f71415610b735750603792915050565b8060ff1660f81415610b885750603892915050565b8060ff1660f91415610b9d5750603992915050565b8060ff1660fa1415610bb25750606192915050565b8060ff1660fb1415610bc75750606292915050565b8060ff1660fc1415610bdc5750606392915050565b8060ff1660fd1415610bf15750606492915050565b8060ff1660fe1415610c065750606592915050565b8060ff1660ff1415610c1b5750606692915050565b50919050565b803563ffffffff811681146104bd57600080fd5b60008060408385031215610c4857600080fd5b610c5183610c21565b946020939093013593505050565b6001600160a01b038116811461045e57600080fd5b600060208284031215610c8657600080fd5b81356106d581610c5f565b600060208284031215610ca357600080fd5b6106d582610c21565b634e487b7160e01b600052604160045260246000fd5b60008060008060808587031215610cd857600080fd5b610ce185610c21565b9350610cef60208601610c21565b925060408501359150606085013567ffffffffffffffff80821115610d1357600080fd5b818701915087601f830112610d2757600080fd5b813581811115610d3957610d39610cac565b604051601f8201601f19908116603f01168101908382118183101715610d6157610d61610cac565b816040528281528a6020848701011115610d7a57600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b6000815180845260005b81811015610dc457602081850181015186830182015201610da8565b81811115610dd6576000602083870101525b50601f01601f19169290920160200192915050565b63ffffffff841681528260208201526060604082015260006106176060830184610d9e565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b634e487b7160e01b600052602160045260246000fd5b600060208284031215610e6d57600080fd5b81516106d581610c5f565b600060208284031215610e8a57600080fd5b815180151581146106d557600080fd5b634e487b7160e01b600052601160045260246000fd5b60008219821115610ec357610ec3610e9a565b500190565b6020815260006106d56020830184610d9e565b600060ff821660ff84168160ff0481118215151615610efc57610efc610e9a565b02939250505056fea2646970667358221220880ce64d72749bbff0c97254898ea6b1e3aacd798258ddfbe532d1fafdb543f864736f6c634300080b0033496e697469616c697a61626c653a20636f6e7472616374206973206e6f742069";

type RouterTemplateConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RouterTemplateConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class RouterTemplate__factory extends ContractFactory {
  constructor(...args: RouterTemplateConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _xAppConnectionManager: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<RouterTemplate> {
    return super.deploy(
      _xAppConnectionManager,
      overrides || {}
    ) as Promise<RouterTemplate>;
  }
  override getDeployTransaction(
    _xAppConnectionManager: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_xAppConnectionManager, overrides || {});
  }
  override attach(address: string): RouterTemplate {
    return super.attach(address) as RouterTemplate;
  }
  override connect(signer: Signer): RouterTemplate__factory {
    return super.connect(signer) as RouterTemplate__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RouterTemplateInterface {
    return new utils.Interface(_abi) as RouterTemplateInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RouterTemplate {
    return new Contract(address, _abi, signerOrProvider) as RouterTemplate;
  }
}
