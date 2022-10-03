/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  PortalFacet,
  PortalFacetInterface,
} from "../../../../../contracts/core/connext/facets/PortalFacet";

const _abi = [
  {
    inputs: [],
    name: "AssetLogic__getTokenIndexFromStableSwapPool_notExist",
    type: "error",
  },
  {
    inputs: [],
    name: "AssetLogic__handleIncomingAsset_nativeAssetNotSupported",
    type: "error",
  },
  {
    inputs: [],
    name: "AssetLogic__transferAssetToContract_feeOnTransferNotSupported",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseConnextFacet__getAdoptedAsset_notWhitelisted",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseConnextFacet__getApprovedCanonicalId_notWhitelisted",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseConnextFacet__nonReentrant_reentrantCall",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseConnextFacet__onlyBridgeRouter_notBridgeRouter",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseConnextFacet__onlyOwnerOrAdmin_notOwnerOrAdmin",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseConnextFacet__onlyOwnerOrRouter_notOwnerOrRouter",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseConnextFacet__onlyOwnerOrWatcher_notOwnerOrWatcher",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseConnextFacet__onlyOwner_notOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseConnextFacet__onlyProposed_notProposedOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseConnextFacet__whenNotPaused_paused",
    type: "error",
  },
  {
    inputs: [],
    name: "PortalFacet__repayAavePortalFor_zeroAmount",
    type: "error",
  },
  {
    inputs: [],
    name: "PortalFacet__repayAavePortal_insufficientFunds",
    type: "error",
  },
  {
    inputs: [],
    name: "PortalFacet__repayAavePortal_swapFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "PortalFacet__setAavePortalFee_invalidFee",
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
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "AavePortalRepayment",
    type: "event",
  },
  {
    inputs: [],
    name: "aavePool",
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
    name: "aavePortalFee",
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
        internalType: "bytes32",
        name: "_transferId",
        type: "bytes32",
      },
    ],
    name: "getAavePortalDebt",
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
        internalType: "bytes32",
        name: "_transferId",
        type: "bytes32",
      },
    ],
    name: "getAavePortalFeeDebt",
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
        components: [
          {
            internalType: "uint32",
            name: "originDomain",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "destinationDomain",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "canonicalDomain",
            type: "uint32",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "address",
            name: "delegate",
            type: "address",
          },
          {
            internalType: "bool",
            name: "receiveLocal",
            type: "bool",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
          {
            internalType: "uint256",
            name: "slippage",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "originSender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "bridgedAmt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "normalizedIn",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "canonicalId",
            type: "bytes32",
          },
        ],
        internalType: "struct CallParams",
        name: "_params",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "_backingAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_feeAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maxIn",
        type: "uint256",
      },
    ],
    name: "repayAavePortal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "originDomain",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "destinationDomain",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "canonicalDomain",
            type: "uint32",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "address",
            name: "delegate",
            type: "address",
          },
          {
            internalType: "bool",
            name: "receiveLocal",
            type: "bool",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
          {
            internalType: "uint256",
            name: "slippage",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "originSender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "bridgedAmt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "normalizedIn",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "canonicalId",
            type: "bytes32",
          },
        ],
        internalType: "struct CallParams",
        name: "_params",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "_backingAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_feeAmount",
        type: "uint256",
      },
    ],
    name: "repayAavePortalFor",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_aavePool",
        type: "address",
      },
    ],
    name: "setAavePool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_aavePortalFeeNumerator",
        type: "uint256",
      },
    ],
    name: "setAavePortalFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50612074806100206000396000f3fe60806040526004361061007b5760003560e01c8063a03e4bc31161004e578063a03e4bc314610115578063b3f62fcb1461014b578063d1e5f31c1461016b578063ef1eb0c11461019857600080fd5b806309d7ba5414610080578063349f937c146100c05780633bd30d34146100e25780636a39b95d14610102575b600080fd5b34801561008c57600080fd5b506100ad61009b366004611ad2565b60009081526026602052604090205490565b6040519081526020015b60405180910390f35b3480156100cc57600080fd5b506100e06100db366004611b07565b6101ad565b005b3480156100ee57600080fd5b506100e06100fd366004611ad2565b61022e565b6100e0610110366004611b3b565b6102af565b34801561012157600080fd5b5060245461010090046001600160a01b03166040516001600160a01b0390911681526020016100b7565b34801561015757600080fd5b506100e0610166366004611b89565b610369565b34801561017757600080fd5b506100ad610186366004611ad2565b60009081526027602052604090205490565b3480156101a457600080fd5b506025546100ad565b336101df7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c1320546001600160a01b031690565b6001600160a01b031614610206576040516314e74a2560e21b815260040160405180910390fd5b602480546001600160a01b0390921661010002610100600160a81b0319909216919091179055565b336102607fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c1320546001600160a01b031690565b6001600160a01b031614610287576040516314e74a2560e21b815260040160405180910390fd5b6127108111156102aa5760405163f48157d160e01b815260040160405180910390fd5b602555565b602154600119016102d357604051637ce54e2d60e11b815260040160405180910390fd5b600260215560006103006102fb6101808601356102f66060880160408901611bf1565b6104ba565b6104fd565b9050600061031561031086611cf5565b610533565b905060006103238486611e01565b905080600003610346576040516330d5e3e360e11b815260040160405180910390fd5b6103508382610563565b61035c838686856105a4565b5050600160215550505050565b6021546001190161038d57604051637ce54e2d60e11b815260040160405180910390fd5b600260215560006103ad6101808601356102f66060880160408901611bf1565b905060006103d0826101808801356103cb60608a0160408b01611bf1565b6106f9565b336000908152600e602090815260408083206001600160a01b03851684529091529020549091508311156104175760405163badaeb5960e01b815260040160405180910390fd5b600061042561031088611cf5565b905060008080610440868661043a8b8d611e01565b8a610712565b92509250925082610464576040516379a3a9f160e01b815260040160405180910390fd5b336000908152600e602090815260408083206001600160a01b038916845290915281208054849290610497908490611e19565b909155506104a99050818a8a876105a4565b505060016021555050505050505050565b600082826040516020016104de92919091825263ffffffff16602082015260400190565b6040516020818303038152906040528051906020012090505b92915050565b6000818152600a60205260408120546001600160a01b0316806104f757604051634cdfde3760e11b815260040160405180910390fd5b6000816040516020016105469190611e88565b604051602081830303815290604052805190602001209050919050565b8060000361056f575050565b6001600160a01b03821661059657604051632a38b13360e01b815260040160405180910390fd5b6105a0828261076c565b5050565b600081815260266020526040812080548592906105c2908490611e19565b9091555050600081815260276020526040812080548492906105e5908490611e19565b909155505060245461060890859061010090046001600160a01b0316600061088a565b60245461062e90859061010090046001600160a01b03166106298587611e01565b6109d7565b6024805460405163d65dc7a160e01b81526001600160a01b038781166004830152928101869052604481018590526101009091049091169063d65dc7a190606401600060405180830381600087803b15801561068957600080fd5b505af115801561069d573d6000803e3d6000fd5b5050604080516001600160a01b0388168152602081018790529081018590523360608201528392507f54b01a5ae4ec60eeeef60570103ba1a5de0999725219c02b2baf1b706625bb08915060800160405180910390a250505050565b60006107088484846000610a8f565b90505b9392505050565b6000848152600a60205260408120548190819081906001600160a01b03908116908816810361074c57600187899450945094505050610762565b6107598989838a8a610ad2565b94509450945050505b9450945094915050565b80600003610778575050565b6040516370a0823160e01b81523060048201526000906001600160a01b038416906370a0823190602401602060405180830381865afa1580156107bf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107e39190611f82565b90506107f183333085610cbf565b6040516370a0823160e01b8152306004820152829082906001600160a01b038616906370a0823190602401602060405180830381865afa158015610839573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061085d9190611f82565b6108679190611e19565b1461088557604051631a39afd960e11b815260040160405180910390fd5b505050565b8015806109045750604051636eb1769f60e11b81523060048201526001600160a01b03838116602483015284169063dd62ed3e90604401602060405180830381865afa1580156108de573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109029190611f82565b155b6109745760405162461bcd60e51b815260206004820152603660248201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60448201527520746f206e6f6e2d7a65726f20616c6c6f77616e636560501b60648201526084015b60405180910390fd5b6040516001600160a01b03831660248201526044810182905261088590849063095ea7b360e01b906064015b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152610cf7565b604051636eb1769f60e11b81523060048201526001600160a01b038381166024830152600091839186169063dd62ed3e90604401602060405180830381865afa158015610a28573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a4c9190611f82565b610a569190611e01565b6040516001600160a01b038516602482015260448101829052909150610a8990859063095ea7b360e01b906064016109a0565b50505050565b600481015460009063ffffffff90811690841603610aae575082610aca565b506000848152600b820160205260409020546001600160a01b03165b949350505050565b6000808080600080610af58b600090815260226020526040902060080154151590565b15610b535760008b8152602284016020526040812090610b158d8d610dc9565b90506000610b238e8d610dc9565b9050610b318383838e610e49565b8a10610b4b5760019450610b488383838e8e610eb4565b93505b505050610caf565b60008b815260058401602052604080822054905163f9a15fb960e01b81526001600160a01b038d811660048301528c81166024830152604482018c90529091169190829063f9a15fb990606401602060405180830381865afa158015610bbd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610be19190611f82565b9050888111610cac5760019350610bfa8c83600061088a565b610c058c83836109d7565b6001600160a01b038216635428c1178b8e8e8d610c2442610e10611e01565b6040516001600160e01b031960e088901b16815260048101959095526001600160a01b0393841660248601529290911660448401526064830152608482015260a4016020604051808303816000875af1158015610c85573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ca99190611f82565b92505b50505b909a909950969750505050505050565b6040516001600160a01b0380851660248301528316604482015260648101829052610a899085906323b872dd60e01b906084016109a0565b6000610d4c826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b03166111779092919063ffffffff16565b8051909150156108855780806020019051810190610d6a9190611f9b565b6108855760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b606482015260840161096b565b60008281526023602090815260408083206001600160a01b0385168085529083528184205486855260229093529083206008018054849360ff1692919083908110610e1657610e16611fb8565b6000918252602090912001546001600160a01b031614610aca5760405163054e442960e41b815260040160405180910390fd5b6000610eaa8585858589600a01805480602002602001604051908101604052809291908181526020018280548015610ea057602002820191906000526020600020905b815481526020019060010190808311610e8c575b5050505050611186565b5095945050505050565b600085600a018460ff1681548110610ece57610ece611fb8565b9060005260206000200154831115610f215760405162461bcd60e51b81526020600482015260166024820152756d6f7265207468616e20706f6f6c2062616c616e636560501b604482015260640161096b565b600080600088600a01805480602002602001604051908101604052809291908181526020018280548015610f7457602002820191906000526020600020905b815481526020019060010190808311610f60575b50505050509050610f888989898985611186565b909350915084831115610fca5760405162461bcd60e51b815260206004820152600a6024820152690c8f0407c40dac2f088f60b31b604482015260640161096b565b6000896009018960ff1681548110610fe457610fe4611fb8565b90600052602060002001546402540be4008b60060154856110059190611fce565b61100f9190611fed565b6110199190611fed565b90508084838b60ff168151811061103257611032611fb8565b60200260200101516110449190611e01565b61104e9190611e19565b8a600a018a60ff168154811061106657611066611fb8565b906000526020600020018190555086828960ff168151811061108a5761108a611fb8565b602002602001015161109c9190611e19565b8a600a018960ff16815481106110b4576110b4611fb8565b600091825260209091200155801561111957808a600b018a60ff16815481106110df576110df611fb8565b90600052602060002001546110f49190611e01565b8a600b018a60ff168154811061110c5761110c611fb8565b6000918252602090912001555b895460408051868152602081018a905260ff8c8116828401528b16606082015290513392917f28d4cf2d5709da3b474b5f05cfd7083faffd601f9500d1f8439b8a13ec7df320919081900360800190a3509198975050505050505050565b606061070884846000856113d0565b6000808460ff168660ff16036111de5760405162461bcd60e51b815260206004820152601760248201527f636f6d7061726520746f6b656e20746f20697473656c66000000000000000000604482015260640161096b565b60008760090180548060200260200160405190810160405280929190818152602001828054801561122e57602002820191906000526020600020905b81548152602001906001019080831161121a575b5050505050905060006112418583611501565b905080518860ff16108015611259575080518760ff16105b61129a5760405162461bcd60e51b8152602060048201526012602482015271696e646578206f7574206f662072616e676560701b604482015260640161096b565b60006112a58a61160c565b905060006112b38383611617565b9050838960ff16815181106112ca576112ca611fb8565b6020026020010151886112dd9190611fce565b838a60ff16815181106112f2576112f2611fb8565b60200260200101516113049190611e19565b838a60ff168151811061131957611319611fb8565b6020026020010181815250506000611333838c86856117c4565b9050838b60ff168151811061134a5761134a611fb8565b60200260200101518161135d9190611e19565b611368906001611e01565b96506402540be4008c60050154886113809190611fce565b61138a9190611fed565b9550848b60ff16815181106113a1576113a1611fb8565b602002602001015186886113b59190611e01565b6113bf9190611fed565b965050505050509550959350505050565b6060824710156114315760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b606482015260840161096b565b6001600160a01b0385163b6114885760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161096b565b600080866001600160a01b031685876040516114a4919061200f565b60006040518083038185875af1925050503d80600081146114e1576040519150601f19603f3d011682016040523d82523d6000602084013e6114e6565b606091505b50915091506114f68282866119b3565b979650505050505050565b8151815160609190811461154e5760405162461bcd60e51b81526020600482015260146024820152736d69736d61746368206d756c7469706c6965727360601b604482015260640161096b565b60008167ffffffffffffffff81111561156957611569611c0c565b604051908082528060200260200182016040528015611592578160200160208202803683370190505b50905060005b82811015611603578481815181106115b2576115b2611fb8565b60200260200101518682815181106115cc576115cc611fb8565b60200260200101516115de9190611fce565b8282815181106115f0576115f0611fb8565b6020908102919091010152600101611598565b50949350505050565b60006104f7826119ec565b815160009081805b828110156116565785818151811061163957611639611fb8565b60200260200101518261164c9190611e01565b915060010161161f565b508060000361166a576000925050506104f7565b600081816116788588611fce565b905060005b610100811015611785578260005b878110156116d657878b82815181106116a6576116a6611fb8565b60200260200101516116b89190611fce565b6116c28684611fce565b6116cc9190611fed565b915060010161168b565b50839450808760016116e89190611e01565b6116f29190611fce565b6064856116ff8287611e19565b6117099190611fce565b6117139190611fed565b61171d9190611e01565b846117288984611fce565b60646117348a88611fce565b61173e9190611fed565b6117489190611e01565b6117529190611fce565b61175c9190611fed565b93506117688486611a96565b1561177c57839750505050505050506104f7565b5060010161167d565b5060405162461bcd60e51b81526020600482015260136024820152724420646f6573206e6f7420636f6e766572676560681b604482015260640161096b565b815160009060ff8516811161180d5760405162461bcd60e51b815260206004820152600f60248201526e151bdad95b881b9bdd08199bdd5b99608a1b604482015260640161096b565b8260008061181b848a611fce565b905060005b8481101561189d578860ff1681146118955787818151811061184457611844611fb8565b6020026020010151836118579190611e01565b92508488828151811061186c5761186c611fb8565b602002602001015161187e9190611fce565b6118888886611fce565b6118929190611fed565b93505b600101611820565b506118a88482611fce565b60646118b48886611fce565b6118be9190611fce565b6118c89190611fed565b92506000816118d8606489611fce565b6118e29190611fed565b6118ec9084611e01565b9050600087815b61010081101561196a57819250898483600261190f9190611fce565b6119199190611e01565b6119239190611e19565b8761192e8480611fce565b6119389190611e01565b6119429190611fed565b915061194e8284611a96565b1561196257509650610aca95505050505050565b6001016118f3565b5060405162461bcd60e51b815260206004820152601e60248201527f417070726f78696d6174696f6e20646964206e6f7420636f6e76657267650000604482015260640161096b565b606083156119c257508161070b565b8251156119d25782518084602001fd5b8160405162461bcd60e51b815260040161096b919061202b565b60048101546002820154600091904282111561070b576003840154600185015480831115611a5a57611a1e8285611e19565b611a288342611e19565b611a328386611e19565b611a3c9190611fce565b611a469190611fed565b611a509082611e01565b9695505050505050565b611a648285611e19565b611a6e8342611e19565b611a788584611e19565b611a829190611fce565b611a8c9190611fed565b611a509082611e19565b60006001611aa48484611aad565b11159392505050565b600081831115611ac857611ac18284611e19565b90506104f7565b61070b8383611e19565b600060208284031215611ae457600080fd5b5035919050565b80356001600160a01b0381168114611b0257600080fd5b919050565b600060208284031215611b1957600080fd5b61070b82611aeb565b60006101a08284031215611b3557600080fd5b50919050565b600080600060608486031215611b5057600080fd5b833567ffffffffffffffff811115611b6757600080fd5b611b7386828701611b22565b9660208601359650604090950135949350505050565b60008060008060808587031215611b9f57600080fd5b843567ffffffffffffffff811115611bb657600080fd5b611bc287828801611b22565b97602087013597506040870135966060013595509350505050565b803563ffffffff81168114611b0257600080fd5b600060208284031215611c0357600080fd5b61070b82611bdd565b634e487b7160e01b600052604160045260246000fd5b6040516101a0810167ffffffffffffffff81118282101715611c4657611c46611c0c565b60405290565b8015158114611c5a57600080fd5b50565b8035611b0281611c4c565b600082601f830112611c7957600080fd5b813567ffffffffffffffff80821115611c9457611c94611c0c565b604051601f8301601f19908116603f01168101908282118183101715611cbc57611cbc611c0c565b81604052838152866020858801011115611cd557600080fd5b836020870160208301376000602085830101528094505050505092915050565b60006101a08236031215611d0857600080fd5b611d10611c22565b611d1983611bdd565b8152611d2760208401611bdd565b6020820152611d3860408401611bdd565b6040820152611d4960608401611aeb565b6060820152611d5a60808401611aeb565b6080820152611d6b60a08401611c5d565b60a082015260c083013567ffffffffffffffff811115611d8a57600080fd5b611d9636828601611c68565b60c08301525060e083013560e0820152610100611db4818501611aeb565b9082015261012083810135908201526101408084013590820152610160808401359082015261018092830135928101929092525090565b634e487b7160e01b600052601160045260246000fd5b60008219821115611e1457611e14611deb565b500190565b600082821015611e2b57611e2b611deb565b500390565b60005b83811015611e4b578181015183820152602001611e33565b83811115610a895750506000910152565b60008151808452611e74816020860160208601611e30565b601f01601f19169290920160200192915050565b60208152611e9f60208201835163ffffffff169052565b60006020830151611eb8604084018263ffffffff169052565b50604083015163ffffffff811660608401525060608301516001600160a01b03811660808401525060808301516001600160a01b03811660a08401525060a083015180151560c08401525060c08301516101a08060e0850152611f1f6101c0850183611e5c565b60e086015161010086810191909152860151909250610120611f4b818701836001600160a01b03169052565b8601516101408681019190915286015161016080870191909152860151610180808701919091529095015193019290925250919050565b600060208284031215611f9457600080fd5b5051919050565b600060208284031215611fad57600080fd5b815161070b81611c4c565b634e487b7160e01b600052603260045260246000fd5b6000816000190483118215151615611fe857611fe8611deb565b500290565b60008261200a57634e487b7160e01b600052601260045260246000fd5b500490565b60008251612021818460208701611e30565b9190910192915050565b60208152600061070b6020830184611e5c56fea2646970667358221220ccba25ede5cdaaf8ecbd0be840326e3f86dbeb7c0d0dde94badb957f682a002e64736f6c634300080f0033";

type PortalFacetConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PortalFacetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PortalFacet__factory extends ContractFactory {
  constructor(...args: PortalFacetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<PortalFacet> {
    return super.deploy(overrides || {}) as Promise<PortalFacet>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): PortalFacet {
    return super.attach(address) as PortalFacet;
  }
  override connect(signer: Signer): PortalFacet__factory {
    return super.connect(signer) as PortalFacet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PortalFacetInterface {
    return new utils.Interface(_abi) as PortalFacetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PortalFacet {
    return new Contract(address, _abi, signerOrProvider) as PortalFacet;
  }
}
