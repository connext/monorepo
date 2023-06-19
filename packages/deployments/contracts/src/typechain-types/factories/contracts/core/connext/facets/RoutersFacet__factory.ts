/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  RoutersFacet,
  RoutersFacetInterface,
} from "../../../../../contracts/core/connext/facets/RoutersFacet";

const _abi = [
  {
    inputs: [],
    name: "AssetLogic__handleIncomingAsset_feeOnTransferNotSupported",
    type: "error",
  },
  {
    inputs: [],
    name: "AssetLogic__handleIncomingAsset_nativeAssetNotSupported",
    type: "error",
  },
  {
    inputs: [],
    name: "AssetLogic__handleOutgoingAsset_notNative",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseConnextFacet__getAdoptedAsset_assetNotFound",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseConnextFacet__getApprovedCanonicalId_notAllowlisted",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseConnextFacet__nonReentrant_reentrantCall",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseConnextFacet__nonXCallReentrant_reentrantCall",
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
    name: "RoutersFacet__acceptProposedRouterOwner_badCaller",
    type: "error",
  },
  {
    inputs: [],
    name: "RoutersFacet__acceptProposedRouterOwner_notElapsed",
    type: "error",
  },
  {
    inputs: [],
    name: "RoutersFacet__addLiquidityForRouter_amountIsZero",
    type: "error",
  },
  {
    inputs: [],
    name: "RoutersFacet__addLiquidityForRouter_badRouter",
    type: "error",
  },
  {
    inputs: [],
    name: "RoutersFacet__addLiquidityForRouter_capReached",
    type: "error",
  },
  {
    inputs: [],
    name: "RoutersFacet__addLiquidityForRouter_routerEmpty",
    type: "error",
  },
  {
    inputs: [],
    name: "RoutersFacet__approveRouterForPortal_alreadyApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "RoutersFacet__approveRouterForPortal_notAdded",
    type: "error",
  },
  {
    inputs: [],
    name: "RoutersFacet__approveRouter_alreadyAdded",
    type: "error",
  },
  {
    inputs: [],
    name: "RoutersFacet__approveRouter_routerEmpty",
    type: "error",
  },
  {
    inputs: [],
    name: "RoutersFacet__initializeRouter_configNotEmpty",
    type: "error",
  },
  {
    inputs: [],
    name: "RoutersFacet__onlyRouterOwner_notRouterOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "RoutersFacet__proposeRouterOwner_badRouter",
    type: "error",
  },
  {
    inputs: [],
    name: "RoutersFacet__proposeRouterOwner_notNewOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "RoutersFacet__removeRouterLiquidityFor_notOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "RoutersFacet__removeRouterLiquidity_amountIsZero",
    type: "error",
  },
  {
    inputs: [],
    name: "RoutersFacet__removeRouterLiquidity_insufficientFunds",
    type: "error",
  },
  {
    inputs: [],
    name: "RoutersFacet__removeRouterLiquidity_recipientEmpty",
    type: "error",
  },
  {
    inputs: [],
    name: "RoutersFacet__setLiquidityFeeNumerator_tooLarge",
    type: "error",
  },
  {
    inputs: [],
    name: "RoutersFacet__setLiquidityFeeNumerator_tooSmall",
    type: "error",
  },
  {
    inputs: [],
    name: "RoutersFacet__setMaxRoutersPerTransfer_invalidMaxRoutersPerTransfer",
    type: "error",
  },
  {
    inputs: [],
    name: "RoutersFacet__setRouterOwner_noChange",
    type: "error",
  },
  {
    inputs: [],
    name: "RoutersFacet__setRouterRecipient_notNewRecipient",
    type: "error",
  },
  {
    inputs: [],
    name: "RoutersFacet__unapproveRouterForPortal_notApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "RoutersFacet__unapproveRouter_notAdded",
    type: "error",
  },
  {
    inputs: [],
    name: "RoutersFacet__unapproveRouter_routerEmpty",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "liquidityFeeNumerator",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "LiquidityFeeNumeratorUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "maxRoutersPerTransfer",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "MaxRoutersPerTransferUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "router",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "RouterAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "router",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "RouterApprovedForPortal",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "router",
        type: "address",
      },
    ],
    name: "RouterInitialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "router",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "local",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "key",
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
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "RouterLiquidityAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "router",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "local",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "key",
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
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "RouterLiquidityRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "router",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "prevOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "RouterOwnerAccepted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "router",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "prevProposed",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newProposed",
        type: "address",
      },
    ],
    name: "RouterOwnerProposed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "router",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "prevRecipient",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newRecipient",
        type: "address",
      },
    ],
    name: "RouterRecipientSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "router",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "RouterRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "router",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "RouterUnapprovedForPortal",
    type: "event",
  },
  {
    inputs: [],
    name: "LIQUIDITY_FEE_DENOMINATOR",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "LIQUIDITY_FEE_NUMERATOR",
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
        name: "_router",
        type: "address",
      },
    ],
    name: "acceptProposedRouterOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_local",
        type: "address",
      },
    ],
    name: "addRouterLiquidity",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_local",
        type: "address",
      },
      {
        internalType: "address",
        name: "_router",
        type: "address",
      },
    ],
    name: "addRouterLiquidityFor",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_router",
        type: "address",
      },
    ],
    name: "approveRouter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_router",
        type: "address",
      },
    ],
    name: "approveRouterForPortal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_router",
        type: "address",
      },
    ],
    name: "getProposedRouterOwner",
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
        name: "_router",
        type: "address",
      },
    ],
    name: "getProposedRouterOwnerTimestamp",
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
        name: "_router",
        type: "address",
      },
    ],
    name: "getRouterApproval",
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
        name: "_router",
        type: "address",
      },
    ],
    name: "getRouterApprovalForPortal",
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
        name: "_router",
        type: "address",
      },
    ],
    name: "getRouterOwner",
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
        name: "_router",
        type: "address",
      },
    ],
    name: "getRouterRecipient",
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
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
    ],
    name: "initializeRouter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "maxRoutersPerTransfer",
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
        name: "_router",
        type: "address",
      },
      {
        internalType: "address",
        name: "_proposed",
        type: "address",
      },
    ],
    name: "proposeRouterOwner",
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
            name: "domain",
            type: "uint32",
          },
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
        ],
        internalType: "struct TokenId",
        name: "_canonical",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "_to",
        type: "address",
      },
    ],
    name: "removeRouterLiquidity",
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
            name: "domain",
            type: "uint32",
          },
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
        ],
        internalType: "struct TokenId",
        name: "_canonical",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "_to",
        type: "address",
      },
      {
        internalType: "address",
        name: "_router",
        type: "address",
      },
    ],
    name: "removeRouterLiquidityFor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_router",
        type: "address",
      },
      {
        internalType: "address",
        name: "_asset",
        type: "address",
      },
    ],
    name: "routerBalances",
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
        name: "_numerator",
        type: "uint256",
      },
    ],
    name: "setLiquidityFeeNumerator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newMaxRouters",
        type: "uint256",
      },
    ],
    name: "setMaxRoutersPerTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_router",
        type: "address",
      },
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
    ],
    name: "setRouterRecipient",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_router",
        type: "address",
      },
    ],
    name: "unapproveRouter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_router",
        type: "address",
      },
    ],
    name: "unapproveRouterForPortal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080806040523461001657611982908161001c8239f35b600080fdfe608060408181526004908136101561001657600080fd5b600092833560e01c90816304376ff414610ff3575080630951d6d814610fd457806309935b8f14610e5357806312d5717014610e175780631407093b14610dd957806322a3c00714610ca15780632d3f9ef614610c4e5780633b688da614610c2157806341258b5c14610bd85780634b72c5da14610bbb5780635406459414610b5e578063582c78d214610a9957806382904716146109c05780638770e6821461097f578063911b8ee2146108265780639bf6d87514610807578063b214c90114610628578063c6bf691d146105e9578063da3a892f1461046b578063e9160f3e1461042d578063f259cd271461032e578063f72c5048146102bd578063fd5bd5fe146101f15763ffaf3f1a1461012c57600080fd5b346101ed57806003193601126101ed576101446110fa565b61014c611115565b9160018060a01b03809216918286526015602052808287205460101c1633036101dd5782865260156020528060018388200154169316938484146101cf57508185526015602052842060010180546001600160a01b031916841790557f31f32ebf07b0ac7fe173f7b7f3f943020d9bdc6dbfbdcdae01bd45ea78d953d78480a480f35b9051631b0043f560e31b8152fd5b815163407c584960e01b81528590fd5b8280fd5b508290346102b95760a03660031901126102b95761020e3661119b565b6102166111d1565b608435929091906001600160a01b038085168086036102b5576002601654146102a557600260165560ff601a5460a01c1661029557865260156020528186205460101c8116806102905750845b16330361028157506102799394506044356113bc565b600160165580f35b5163f3dc2d1960e01b81528590fd5b610263565b8251633ee5b89360e01b81528890fd5b8251637ce54e2d60e11b81528890fd5b8680fd5b5080fd5b508290346102b95760803660031901126102b9576102da3661119b565b906102e36111d1565b9060026016541461031f57600260165560ff601a5460a01c166103105750906102799133916044356113bc565b51633ee5b89360e01b81528490fd5b51637ce54e2d60e11b81528490fd5b50346101ed5760203660031901126101ed576103486110fa565b60008051602061192d833981519152546001600160a01b0391908216331415806103f9575b6103ea57169182156103dc57828452601560205260ff82852054166103ce575060207fbc68405e644da2aaf25623ce2199da82c6dfd2e1de102b400eba6a091704d4f49183855260158252808520600160ff1982541617905551338152a280f35b905163916e73bd60e01b8152fd5b905163330ef51f60e01b8152fd5b5050516360237f6b60e11b8152fd5b50338552601460205260ff83862054168481101561041a576001141561036d565b634e487b7160e01b865260218552602486fd5b8382346102b95760203660031901126102b9576020916001600160a01b03908290826104576110fa565b16815260158552205460101c169051908152f35b50346101ed5760203660031901126101ed576104856110fa565b60008051602061192d8339815191525490926001600160a01b03918216331415806105b5575b6105a7578184169182865260156020528386209084516104ca8161112b565b60a0600384549460ff861615948515855280602086019760ff8160081c161515895260101c168a8601528060018301541660608601526002820154166080850152015491015280610598575b610589575161057b5750835260156020908152818420805461ff00191661010017905590516001600160a01b03909216825233908201527fc428fad4df337e27be8199c35a79ca103e8d00538a69b0f9701fb2bdf7d6c84c9080604081015b0390a180f35b825163c896c2d960e01b8152fd5b5082516375befccb60e01b8152fd5b506105a16111e7565b15610516565b8251637b32c26b60e01b8152fd5b50338552601460205260ff8386205416818110156105d657600314156104ab565b634e487b7160e01b865260218252602486fd5b8382346102b95760203660031901126102b9576020916001600160a01b03906001908390836106166110fa565b16815260158652200154169051908152f35b50346101ed57806003193601126101ed576106416110fa565b610649611115565b8133865260156020528386209284516106618161112b565b60a085549560ff87161515835260ff8760081c1615156020840152600180831b03809760101c1680898501528760018301541693846060820152600389600285015416938460808401520154938491015215928315936107fd575b5082156107f3575b5081156107e9575b506107d9578316156107d2575b8281169081156107c257338088526015602052858820805462010000600160b01b03191660109390931b62010000600160b01b03169290921790915586907fd73892e8827a6025d74a01fca72a8e0d9e2c04080272e728f8861410c7d3c2d18280a416918215801561076f575b84337f2622745e83f97f2d871ef785497c1eeba6f9bb94c7dd486cf28228e814d929e48280a280f35b6101cf575033808452601560205290832060010180546001600160a01b0319168317905582907f31f32ebf07b0ac7fe173f7b7f3f943020d9bdc6dbfbdcdae01bd45ea78d953d78280a438808080610746565b84516309a3ec2160e11b81528690fd5b50336106d9565b8451630efdad3160e11b81528690fd5b90501515386106cc565b15159150386106c4565b15159250386106bc565b8382346102b957816003193601126102b957602090600c549051908152f35b50346101ed576020908160031936011261097b576108426110fa565b60008051602061192d833981519152546001600160a01b03949190851633141580610948575b61093957841693841561092a578486526015845282862060a0600385519261088f8461112b565b8054948060ff871615968715875260ff8160081c1615158b88015260101c16888601528060018301541660608601526002820154166080850152015491015261091c575082845260158252808420805460ff19169055808420805461ff0019169055513381527fbee3e974bb6a6f44f20096ede047c191eef60322e65e4ee4bd3392230a8716d59190a280f35b9051632b31895f60e21b8152fd5b50905163085dd61360e11b8152fd5b5090516360237f6b60e11b8152fd5b503386526014845260ff8387205416828110156109685760011415610868565b634e487b7160e01b875260218352602487fd5b8380fd5b8382346102b95760203660031901126102b95760209160ff9082906001600160a01b036109aa6110fa565b16815260158552205460081c1690519015158152f35b50346101ed5760203660031901126101ed5781359160018060a01b0360008051602061192d833981519152541633141580610a65575b610a575782158015610a4c575b610a3e5750518181523360208201527fa7fe33308fb33ae6f3259e3c7c954ae3d6cd7f428cd17f653413c2cdc691666d90604090a1600c5580f35b9051630d9f9fad60e01b8152fd5b50600c548314610a03565b9051637b32c26b60e01b8152fd5b50338452601460205260ff828520541681811015610a8657600314156109f6565b634e487b7160e01b855260218252602485fd5b50346101ed5760203660031901126101ed5781359160018060a01b0360008051602061192d833981519152541633141580610b3d575b610a575761251c8310610b2f576127108311610b2157506001829055519081523360208201527feb6222a0b32216f861511e9aba88faa9549b749c2e0ad47df4e288565de5ceae908060408101610575565b9051637347083360e11b8152fd5b905163b74bfc8360e01b8152fd5b50338452601460205260ff828520541681811015610a865760031415610acf565b50806003193601126101ed57610b72611115565b90600260165414610bac57600260165560ff601a5460a01c16610b9d57509061027991339135611237565b51633ee5b89360e01b81529050fd5b51637ce54e2d60e11b81529050fd5b8382346102b957816003193601126102b957602090516127108152f35b8382346102b957806003193601126102b95780602092610bf66110fa565b610bfe611115565b6001600160a01b039182168352600a865283832091168252845220549051908152f35b8382346102b95760203660031901126102b9576020916001600160a01b03906002908390836106166110fa565b50829060603660031901126102b957610c65611115565b604435916001600160a01b038316830361097b5760026016541461031f57600260165560ff601a5460a01c166103105750610279929335611237565b50346101ed57806003193601126101ed57610cba6110fa565b610cc2611115565b9260018060a01b038092169283865260156020528086205483339160101c1603610dcc5783865260156020528086209183825196610cff8861112b565b81855460ff811615158a5260ff8160081c16151560208b015260101c1697888582015282600187015416606082015260a06003846002890154169760808401988952015491015216809614610dbe57858484511614610db057508386526015602052600281872001856bffffffffffffffffffffffff60a01b82541617905560034291872001555116907fee0158b57adc03901d8b16c48cd10c33ca1283ee96c6e0d30f817ceba74dc4a18480a480f35b9051631b2163f160e31b8152fd5b9051630e49614b60e31b8152fd5b5163407c584960e01b8152fd5b8382346102b95760203660031901126102b95760209160ff9082906001600160a01b03610e046110fa565b1681526015855220541690519015158152f35b8382346102b95760203660031901126102b95760209160039082906001600160a01b03610e426110fa565b168152601585522001549051908152f35b5090346101ed5760203660031901126101ed576001600160a01b039081610e786110fa565b16808552601560205283852091845191610e918361112b565b62093a80610ee860a086549560ff87161515815260ff8760081c1615156020820152888a82019760101c16875288600189015416606082015260038960028a0154169860808301998a520154918291015242611214565b1115610fc55784808551168015600014610fc05750808451165b163303610fb15783518580821694511692848414610fa357508188526015602052868820805462010000600160b01b03191660109290921b62010000600160b01b0316919091179055869560039590949093909290917fd73892e8827a6025d74a01fca72a8e0d9e2c04080272e728f8861410c7d3c2d18880a45116610f8a575b8220015580f35b80832060020180546001600160a01b0319169055610f83565b87516309a3ec2160e11b8152fd5b508451633253a7bd60e01b8152fd5b610f02565b5084516376b2ad0760e01b8152fd5b8382346102b957816003193601126102b9576020906001549051908152f35b9290503461097b57602036600319011261097b5761100f6110fa565b60008051602061192d8339815191525490936001600160a01b03918216331415806110c6575b6110b85750831690818552601560205260ff8386205460081c16156110aa5750835260156020908152818420805461ff001916905590516001600160a01b03909216825233908201527f903522f09b29fa2102f5d8d8b181ac8edb4cfaf5d705076e4ab95117f6bb02ad908060408101610575565b8251635d3abc4360e11b8152fd5b637b32c26b60e01b81529050fd5b50338652601460205260ff8487205416838110156110e75760031415611035565b634e487b7160e01b875260218452602487fd5b600435906001600160a01b038216820361111057565b600080fd5b602435906001600160a01b038216820361111057565b60c0810190811067ffffffffffffffff82111761114757604052565b634e487b7160e01b600052604160045260246000fd5b6040810190811067ffffffffffffffff82111761114757604052565b90601f8019910116810190811067ffffffffffffffff82111761114757604052565b604090600319011261111057604051906111b48261115d565b8160043563ffffffff811681036111105781526020602435910152565b606435906001600160a01b038216820361111057565b60008051602061192d833981519152546001600160a01b031615801561120a5790565b5060ff6012541690565b9190820391821161122157565b634e487b7160e01b600052601160045260246000fd5b6001600160a01b039283169283156113aa578115611398578216916000908382526020600681526040926112a48482208551906112738261115d565b63ffffffff906001828254169182855201548684019181835215908161138f575b50611380575b51915116906118f1565b928382526007835260ff6002868420015460a01c161561136f576112c66111e7565b158061135a575b61134957856112db916114fc565b868152600a8252838120868252825283812080549186830180931161133557505582519485528401528201523360608201527fcc3100122c1752fe0f6bfa5503175bc53eb00b5f2d774e81efedcd2b10a6d24b90608090a2565b634e487b7160e01b81526011600452602490fd5b8451631464c65f60e31b8152600490fd5b508782526015835260ff8583205416156112cd565b845163a13f958f60e01b8152600490fd5b8160045416835289815261129a565b90501538611294565b604051632a24141960e01b8152600490fd5b6040516339773cbf60e21b8152600490fd5b9092919260018060a01b038093169360009385855260206015815281604093816001868a2001541680156000146114f45750165b8281169687156114e35786156114d2578363ffffffff61141f85828a51169260045416831499019182516118f1565b97156114bd575116905b898152600a8452858120948216948582528452858120548881106114ac57977ffacf3161e9675ca1ca84a16d238bc838c7e2084c302cf411d9da7ac0391f648699979593879593838399848f9d60a09e6114939852600a89528284208a855289520391205561187b565b82519586528501528301526060820152336080820152a2565b8651630a1e6d4d60e01b8152600490fd5b50508581526007835283858220541690611429565b845163606ab7a160e11b8152600490fd5b845163516101e760e11b8152600490fd5b9150506113f0565b811561165e576001600160a01b031690811561164c57604080516370a0823160e01b80825230600483015291936020928383602481855afa92831561164157600093611612575b5085516323b872dd60e01b85820152336024820152306044820152606480820187905281529060a0820167ffffffffffffffff81118382101761114757859261158e91895284611662565b602487518094819382523060048301525afa908115611607576000916115d2575b506115ba9250611214565b036115c25750565b51630e40773560e21b8152600490fd5b919282813d8311611600575b6115e88183611179565b810103126115fd5750906115ba9151386115af565b80fd5b503d6115de565b85513d6000823e3d90fd5b90928482813d831161163a575b6116298183611179565b810103126115fd5750519138611543565b503d61161f565b86513d6000823e3d90fd5b604051632a38b13360e01b8152600490fd5b5050565b60018060a01b0316906040516040810167ffffffffffffffff9082811082821117611147576040526020938483527f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564858401526000808587829751910182855af1903d1561179c573d92831161178857906116fd939291604051926116f088601f19601f8401160185611179565b83523d868885013e6117a7565b80518061170b575b50505050565b818491810103126102b957820151908115918215036115fd575061173157808080611705565b6084906040519062461bcd60e51b82526004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b6064820152fd5b634e487b7160e01b85526041600452602485fd5b906116fd9392506060915b9192901561180957508151156117bb575090565b3b156117c45790565b60405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606490fd5b82519091501561181c5750805190602001fd5b6040519062461bcd60e51b82528160208060048301528251908160248401526000935b828510611862575050604492506000838284010152601f80199101168101030190fd5b848101820151868601604401529381019385935061183f565b9180156118ec576001600160a01b039283169283156118da576040519263a9059cbb60e01b6020850152166024830152604482015260448152608081019181831067ffffffffffffffff841117611147576118d892604052611662565b565b604051633a48ca7b60e11b8152600490fd5b505050565b9063ffffffff6040519160208301938452166040820152604081526060810181811067ffffffffffffffff821117611147576040525190209056fec8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c1320a26469706673582212206f337721a3eb7bf2aa323492dfc774084f005d582c5e931313caf629eb73aace64736f6c63430008110033";

type RoutersFacetConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RoutersFacetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class RoutersFacet__factory extends ContractFactory {
  constructor(...args: RoutersFacetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<RoutersFacet> {
    return super.deploy(overrides || {}) as Promise<RoutersFacet>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): RoutersFacet {
    return super.attach(address) as RoutersFacet;
  }
  override connect(signer: Signer): RoutersFacet__factory {
    return super.connect(signer) as RoutersFacet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RoutersFacetInterface {
    return new utils.Interface(_abi) as RoutersFacetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RoutersFacet {
    return new Contract(address, _abi, signerOrProvider) as RoutersFacet;
  }
}
