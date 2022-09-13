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
    name: "PortalFacet__repayAavePortalFor_notSupportedAsset",
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
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
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
            internalType: "address",
            name: "agent",
            type: "address",
          },
          {
            internalType: "bool",
            name: "receiveLocal",
            type: "bool",
          },
          {
            internalType: "address",
            name: "callback",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "callbackFee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "relayerFee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "destinationMinOut",
            type: "uint256",
          },
        ],
        internalType: "struct CallParams",
        name: "_params",
        type: "tuple",
      },
      {
        internalType: "address",
        name: "_local",
        type: "address",
      },
      {
        internalType: "address",
        name: "_originSender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_bridgedAmt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_nonce",
        type: "uint256",
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
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
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
            internalType: "address",
            name: "agent",
            type: "address",
          },
          {
            internalType: "bool",
            name: "receiveLocal",
            type: "bool",
          },
          {
            internalType: "address",
            name: "callback",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "callbackFee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "relayerFee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "destinationMinOut",
            type: "uint256",
          },
        ],
        internalType: "struct CallParams",
        name: "_params",
        type: "tuple",
      },
      {
        internalType: "address",
        name: "_adopted",
        type: "address",
      },
      {
        internalType: "address",
        name: "_originSender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_bridgedAmt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_nonce",
        type: "uint256",
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
  "0x608060405234801561001057600080fd5b50612117806100206000396000f3fe60806040526004361061007b5760003560e01c806381006ec91161004e57806381006ec914610115578063a03e4bc314610135578063d1e5f31c1461016b578063ef1eb0c11461019857600080fd5b806309d7ba54146100805780630fa58edd146100c0578063349f937c146100d55780633bd30d34146100f5575b600080fd5b34801561008c57600080fd5b506100ad61009b366004611b1c565b60009081526026602052604090205490565b6040519081526020015b60405180910390f35b6100d36100ce366004611b6a565b6101ad565b005b3480156100e157600080fd5b506100d36100f0366004611bed565b6102a3565b34801561010157600080fd5b506100d3610110366004611b1c565b610324565b34801561012157600080fd5b506100d3610130366004611c08565b6103a5565b34801561014157600080fd5b5060245461010090046001600160a01b03166040516001600160a01b0390911681526020016100b7565b34801561017757600080fd5b506100ad610186366004611b1c565b60009081526027602052604090205490565b3480156101a457600080fd5b506025546100ad565b602154600119016101d157604051637ce54e2d60e11b815260040160405180910390fd5b60026021556001600160a01b0386166000908152600860209081526040918290208251808401909352805463ffffffff1683526001015490820181905261022b5760405163f88b978d60e01b815260040160405180910390fd5b600061024b6102398a611d9a565b8787856020015186600001518c610575565b905060006102598486611e7e565b90508060000361027c576040516330d5e3e360e11b815260040160405180910390fd5b61028689826105b4565b610292898686856105f5565b505060016021555050505050505050565b336102d57fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c1320546001600160a01b031690565b6001600160a01b0316146102fc576040516314e74a2560e21b815260040160405180910390fd5b602480546001600160a01b0390921661010002610100600160a81b0319909216919091179055565b336103567fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c1320546001600160a01b031690565b6001600160a01b03161461037d576040516314e74a2560e21b815260040160405180910390fd5b6127108111156103a05760405163f48157d160e01b815260040160405180910390fd5b602555565b602154600119016103c957604051637ce54e2d60e11b815260040160405180910390fd5b6002602155336000908152600c602090815260408083206001600160a01b038b1684529091529020548111156104125760405163badaeb5960e01b815260040160405180910390fd5b6005546040516378a9bb4360e11b81526001600160a01b03898116600483015260009283926401000000009091049091169063f1537686906024016040805180830381865afa158015610469573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061048d9190611e96565b9150915060006104aa8b6104a090611d9a565b898985878e610575565b905060008060006104cf6104be868861074a565b8e6104c98b8d611e7e565b8a61078d565b925092509250826104f3576040516379a3a9f160e01b815260040160405180910390fd5b816000600c016000336001600160a01b03166001600160a01b0316815260200190815260200160002060008f6001600160a01b03166001600160a01b03168152602001908152602001600020600082825461054e9190611ec4565b909155506105609050818a8a876105f5565b50506001602155505050505050505050505050565b600084878386868a60405160200161059296959493929190611f33565b6040516020818303038152906040528051906020012090509695505050505050565b806000036105c0575050565b6001600160a01b0382166105e757604051632a38b13360e01b815260040160405180910390fd5b6105f182826107e7565b5050565b60008181526026602052604081208054859290610613908490611ec4565b909155505060008181526027602052604081208054849290610636908490611ec4565b909155505060245461065990859061010090046001600160a01b03166000610905565b60245461067f90859061010090046001600160a01b031661067a8587611e7e565b610a52565b6024805460405163d65dc7a160e01b81526001600160a01b038781166004830152928101869052604481018590526101009091049091169063d65dc7a190606401600060405180830381600087803b1580156106da57600080fd5b505af11580156106ee573d6000803e3d6000fd5b5050604080516001600160a01b0388168152602081018790529081018590523360608201528392507f54b01a5ae4ec60eeeef60570103ba1a5de0999725219c02b2baf1b706625bb08915060800160405180910390a250505050565b6000828260405160200161076e92919091825263ffffffff16602082015260400190565b6040516020818303038152906040528051906020012090505b92915050565b6000848152600960205260408120548190819081906001600160a01b0390811690881681036107c7576001878994509450945050506107dd565b6107d48989838a8a610b0a565b94509450945050505b9450945094915050565b806000036107f3575050565b6040516370a0823160e01b81523060048201526000906001600160a01b038416906370a0823190602401602060405180830381865afa15801561083a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061085e9190612025565b905061086c83333085610cf7565b6040516370a0823160e01b8152306004820152829082906001600160a01b038616906370a0823190602401602060405180830381865afa1580156108b4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108d89190612025565b6108e29190611ec4565b1461090057604051631a39afd960e11b815260040160405180910390fd5b505050565b80158061097f5750604051636eb1769f60e11b81523060048201526001600160a01b03838116602483015284169063dd62ed3e90604401602060405180830381865afa158015610959573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061097d9190612025565b155b6109ef5760405162461bcd60e51b815260206004820152603660248201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60448201527520746f206e6f6e2d7a65726f20616c6c6f77616e636560501b60648201526084015b60405180910390fd5b6040516001600160a01b03831660248201526044810182905261090090849063095ea7b360e01b906064015b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152610d2f565b604051636eb1769f60e11b81523060048201526001600160a01b038381166024830152600091839186169063dd62ed3e90604401602060405180830381865afa158015610aa3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ac79190612025565b610ad19190611e7e565b6040516001600160a01b038516602482015260448101829052909150610b0490859063095ea7b360e01b90606401610a1b565b50505050565b6000808080600080610b2d8b600090815260226020526040902060080154151590565b15610b8b5760008b8152602284016020526040812090610b4d8d8d610e01565b90506000610b5b8e8d610e01565b9050610b698383838e610e89565b8a10610b835760019450610b808383838e8e610ef4565b93505b505050610ce7565b60008b815260068401602052604080822054905163f9a15fb960e01b81526001600160a01b038d811660048301528c81166024830152604482018c90529091169190829063f9a15fb990606401602060405180830381865afa158015610bf5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c199190612025565b9050888111610ce45760019350610c328c836000610905565b610c3d8c8383610a52565b6001600160a01b038216635428c1178b8e8e8d610c5c42610e10611e7e565b6040516001600160e01b031960e088901b16815260048101959095526001600160a01b0393841660248601529290911660448401526064830152608482015260a4016020604051808303816000875af1158015610cbd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ce19190612025565b92505b50505b909a909950969750505050505050565b6040516001600160a01b0380851660248301528316604482015260648101829052610b049085906323b872dd60e01b90608401610a1b565b6000610d84826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b03166111b79092919063ffffffff16565b8051909150156109005780806020019051810190610da2919061203e565b6109005760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b60648201526084016109e6565b60008281526023602090815260408083206001600160a01b0385168085529083528184205486855260229093529083206008018054849360ff1692919083908110610e4e57610e4e61205b565b6000918252602090912001546001600160a01b031614610e815760405163054e442960e41b815260040160405180910390fd5b949350505050565b6000610eea8585858589600a01805480602002602001604051908101604052809291908181526020018280548015610ee057602002820191906000526020600020905b815481526020019060010190808311610ecc575b50505050506111d0565b5095945050505050565b600085600a018460ff1681548110610f0e57610f0e61205b565b9060005260206000200154831115610f615760405162461bcd60e51b81526020600482015260166024820152756d6f7265207468616e20706f6f6c2062616c616e636560501b60448201526064016109e6565b600080600088600a01805480602002602001604051908101604052809291908181526020018280548015610fb457602002820191906000526020600020905b815481526020019060010190808311610fa0575b50505050509050610fc889898989856111d0565b90935091508483111561100a5760405162461bcd60e51b815260206004820152600a6024820152690c8f0407c40dac2f088f60b31b60448201526064016109e6565b6000896009018960ff16815481106110245761102461205b565b90600052602060002001546402540be4008b60060154856110459190612071565b61104f9190612090565b6110599190612090565b90508084838b60ff16815181106110725761107261205b565b60200260200101516110849190611e7e565b61108e9190611ec4565b8a600a018a60ff16815481106110a6576110a661205b565b906000526020600020018190555086828960ff16815181106110ca576110ca61205b565b60200260200101516110dc9190611ec4565b8a600a018960ff16815481106110f4576110f461205b565b600091825260209091200155801561115957808a600b018a60ff168154811061111f5761111f61205b565b90600052602060002001546111349190611e7e565b8a600b018a60ff168154811061114c5761114c61205b565b6000918252602090912001555b895460408051868152602081018a905260ff8c8116828401528b16606082015290513392917f28d4cf2d5709da3b474b5f05cfd7083faffd601f9500d1f8439b8a13ec7df320919081900360800190a3509198975050505050505050565b60606111c6848460008561141a565b90505b9392505050565b6000808460ff168660ff16036112285760405162461bcd60e51b815260206004820152601760248201527f636f6d7061726520746f6b656e20746f20697473656c6600000000000000000060448201526064016109e6565b60008760090180548060200260200160405190810160405280929190818152602001828054801561127857602002820191906000526020600020905b815481526020019060010190808311611264575b50505050509050600061128b858361154b565b905080518860ff161080156112a3575080518760ff16105b6112e45760405162461bcd60e51b8152602060048201526012602482015271696e646578206f7574206f662072616e676560701b60448201526064016109e6565b60006112ef8a611656565b905060006112fd8383611661565b9050838960ff16815181106113145761131461205b565b6020026020010151886113279190612071565b838a60ff168151811061133c5761133c61205b565b602002602001015161134e9190611ec4565b838a60ff16815181106113635761136361205b565b602002602001018181525050600061137d838c868561180e565b9050838b60ff16815181106113945761139461205b565b6020026020010151816113a79190611ec4565b6113b2906001611e7e565b96506402540be4008c60050154886113ca9190612071565b6113d49190612090565b9550848b60ff16815181106113eb576113eb61205b565b602002602001015186886113ff9190611e7e565b6114099190612090565b965050505050509550959350505050565b60608247101561147b5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b60648201526084016109e6565b6001600160a01b0385163b6114d25760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016109e6565b600080866001600160a01b031685876040516114ee91906120b2565b60006040518083038185875af1925050503d806000811461152b576040519150601f19603f3d011682016040523d82523d6000602084013e611530565b606091505b50915091506115408282866119fd565b979650505050505050565b815181516060919081146115985760405162461bcd60e51b81526020600482015260146024820152736d69736d61746368206d756c7469706c6965727360601b60448201526064016109e6565b60008167ffffffffffffffff8111156115b3576115b3611c94565b6040519080825280602002602001820160405280156115dc578160200160208202803683370190505b50905060005b8281101561164d578481815181106115fc576115fc61205b565b60200260200101518682815181106116165761161661205b565b60200260200101516116289190612071565b82828151811061163a5761163a61205b565b60209081029190910101526001016115e2565b50949350505050565b600061078782611a36565b815160009081805b828110156116a0578581815181106116835761168361205b565b6020026020010151826116969190611e7e565b9150600101611669565b50806000036116b457600092505050610787565b600081816116c28588612071565b905060005b6101008110156117cf578260005b8781101561172057878b82815181106116f0576116f061205b565b60200260200101516117029190612071565b61170c8684612071565b6117169190612090565b91506001016116d5565b50839450808760016117329190611e7e565b61173c9190612071565b6064856117498287611ec4565b6117539190612071565b61175d9190612090565b6117679190611e7e565b846117728984612071565b606461177e8a88612071565b6117889190612090565b6117929190611e7e565b61179c9190612071565b6117a69190612090565b93506117b28486611ae0565b156117c65783975050505050505050610787565b506001016116c7565b5060405162461bcd60e51b81526020600482015260136024820152724420646f6573206e6f7420636f6e766572676560681b60448201526064016109e6565b815160009060ff851681116118575760405162461bcd60e51b815260206004820152600f60248201526e151bdad95b881b9bdd08199bdd5b99608a1b60448201526064016109e6565b82600080611865848a612071565b905060005b848110156118e7578860ff1681146118df5787818151811061188e5761188e61205b565b6020026020010151836118a19190611e7e565b9250848882815181106118b6576118b661205b565b60200260200101516118c89190612071565b6118d28886612071565b6118dc9190612090565b93505b60010161186a565b506118f28482612071565b60646118fe8886612071565b6119089190612071565b6119129190612090565b9250600081611922606489612071565b61192c9190612090565b6119369084611e7e565b9050600087815b6101008110156119b45781925089848360026119599190612071565b6119639190611e7e565b61196d9190611ec4565b876119788480612071565b6119829190611e7e565b61198c9190612090565b91506119988284611ae0565b156119ac57509650610e8195505050505050565b60010161193d565b5060405162461bcd60e51b815260206004820152601e60248201527f417070726f78696d6174696f6e20646964206e6f7420636f6e7665726765000060448201526064016109e6565b60608315611a0c5750816111c9565b825115611a1c5782518084602001fd5b8160405162461bcd60e51b81526004016109e691906120ce565b6004810154600282015460009190428211156111c9576003840154600185015480831115611aa457611a688285611ec4565b611a728342611ec4565b611a7c8386611ec4565b611a869190612071565b611a909190612090565b611a9a9082611e7e565b9695505050505050565b611aae8285611ec4565b611ab88342611ec4565b611ac28584611ec4565b611acc9190612071565b611ad69190612090565b611a9a9082611ec4565b60006001611aee8484611af7565b11159392505050565b600081831115611b1257611b0b8284611ec4565b9050610787565b6111c98383611ec4565b600060208284031215611b2e57600080fd5b5035919050565b60006101408284031215611b4857600080fd5b50919050565b80356001600160a01b0381168114611b6557600080fd5b919050565b600080600080600080600060e0888a031215611b8557600080fd5b873567ffffffffffffffff811115611b9c57600080fd5b611ba88a828b01611b35565b975050611bb760208901611b4e565b9550611bc560408901611b4e565b969995985095966060810135965060808101359560a0820135955060c0909101359350915050565b600060208284031215611bff57600080fd5b6111c982611b4e565b600080600080600080600080610100898b031215611c2557600080fd5b883567ffffffffffffffff811115611c3c57600080fd5b611c488b828c01611b35565b985050611c5760208a01611b4e565b9650611c6560408a01611b4e565b979a96995096976060810135975060808101359660a0820135965060c0820135955060e0909101359350915050565b634e487b7160e01b600052604160045260246000fd5b604051610140810167ffffffffffffffff81118282101715611cce57611cce611c94565b60405290565b600082601f830112611ce557600080fd5b813567ffffffffffffffff80821115611d0057611d00611c94565b604051601f8301601f19908116603f01168101908282118183101715611d2857611d28611c94565b81604052838152866020858801011115611d4157600080fd5b836020870160208301376000602085830101528094505050505092915050565b63ffffffff81168114611d7357600080fd5b50565b8035611b6581611d61565b8015158114611d7357600080fd5b8035611b6581611d81565b60006101408236031215611dad57600080fd5b611db5611caa565b611dbe83611b4e565b8152602083013567ffffffffffffffff811115611dda57600080fd5b611de636828601611cd4565b602083015250611df860408401611d76565b6040820152611e0960608401611d76565b6060820152611e1a60808401611b4e565b6080820152611e2b60a08401611d8f565b60a0820152611e3c60c08401611b4e565b60c082015260e08381013590820152610100808401359082015261012092830135928101929092525090565b634e487b7160e01b600052601160045260246000fd5b60008219821115611e9157611e91611e68565b500190565b60008060408385031215611ea957600080fd5b8251611eb481611d61565b6020939093015192949293505050565b600082821015611ed657611ed6611e68565b500390565b60005b83811015611ef6578181015183820152602001611ede565b83811115610b045750506000910152565b60008151808452611f1f816020860160208601611edb565b601f01601f19169290920160200192915050565b86815260c06020820152611f5360c0820187516001600160a01b03169052565b600060208701516101408060e0850152611f71610200850183611f07565b91506040890151610100611f8c8187018363ffffffff169052565b60608b01519150610120611fa78188018463ffffffff169052565b60808c8101516001600160a01b039081169589019590955260a08d0151151561016089015260c08d0151851661018089015260e08d01516101a0890152918c01516101c08801528b01516101e08701529189166040860152506060840187905263ffffffff86169084015290508260a0830152979650505050505050565b60006020828403121561203757600080fd5b5051919050565b60006020828403121561205057600080fd5b81516111c981611d81565b634e487b7160e01b600052603260045260246000fd5b600081600019048311821515161561208b5761208b611e68565b500290565b6000826120ad57634e487b7160e01b600052601260045260246000fd5b500490565b600082516120c4818460208701611edb565b9190910192915050565b6020815260006111c96020830184611f0756fea26469706673582212204626c2dbe063493b57d0ecc94726273f8299fd09ba713b7ce0c219c3fc62a25564736f6c634300080f0033";

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
