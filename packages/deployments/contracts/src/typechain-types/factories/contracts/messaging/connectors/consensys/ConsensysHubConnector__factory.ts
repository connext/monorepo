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
  ConsensysHubConnector,
  ConsensysHubConnectorInterface,
} from "../../../../../contracts/messaging/connectors/consensys/ConsensysHubConnector";

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
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "Connector__processMessage_notUsed",
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
    name: "ProposedOwnable__ownershipDelayElapsed_delayNotElapsed",
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
        internalType: "bytes",
        name: "encodedData",
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
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "_encodedData",
        type: "bytes",
      },
    ],
    name: "sendMessage",
    outputs: [],
    stateMutability: "payable",
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
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x6101003461024b57601f610eb238819003918201601f191683019291906001600160401b03841183851017610250578160a0928492604096875283398101031261024b5761004c81610266565b61005860208301610266565b91610064848201610277565b9261007d608061007660608501610277565b9301610277565b926000549086519460018060a01b0390338285167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a36001600160a01b031993841633176000908155600255600180548516905563ffffffff83811697909690881561021a57508281169384156101e25792606096949281927f4f9c27c2fe3f84576ea469d367d044da53c45e951617e8389f2b5ed8db9d25f09997956080528b60a05260c0528560e052168093816101a3575b50508951981688526020880152878701521693a351610c26908161028c82396080518161055e015260a0518181816101110152818161015a015281816105bf01526107f5015260c0518181816104980152818161060c01526107b6015260e05181818161066101526109ce0152f35b6003547fc77bec288fc88f168427f2f7da682eadb26cac89d8d591af6e443da98dff2bbc8d80518684168152856020820152a116176003558238610134565b8a5162461bcd60e51b815260206004820152601160248201527032b6b83a3c903937b7ba26b0b730b3b2b960791b6044820152606490fd5b62461bcd60e51b815260206004820152600c60248201526b32b6b83a3c903237b6b0b4b760a11b6044820152606490fd5b600080fd5b634e487b7160e01b600052604160045260246000fd5b519063ffffffff8216820361024b57565b51906001600160a01b038216820361024b5756fe60806040818152600480361015610021575b505050361561001f57600080fd5b005b600092833560e01c90816314168416146109b2575080633cf52ffb1461099357806348e6fa23146107665780634ff746f61461058257806352a9674b146105415780635bd11efc146104c75780635f61e3ec146104835780636a42b8f814610465578063715018a6146103985780638da5cb5b14610370578063b1f8100d146102ae578063c5b350df14610208578063cc394283146101df578063d1851c92146101b6578063d232c2201461018d578063d69f9d61146101455763db1b76590361001157346101415760203660031901126101415735916001600160a01b038316830361013e57506101356020927f0000000000000000000000000000000000000000000000000000000000000000610ada565b90519015158152f35b80fd5b8280fd5b505034610189578160031936011261018957517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b5080fd5b505034610189578160031936011261018957905490516001600160a01b03909116158152602090f35b50503461018957816003193601126101895760015490516001600160a01b039091168152602090f35b50503461018957816003193601126101895760035490516001600160a01b039091168152602090f35b5090346101415782600319360112610141576001546001600160a01b0392909183831691903383036102a15762093a8061024460025442610bcd565b1115610294575050806000549384167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a36001600160a01b03199283161760009081556002551660015580f35b516324e0285f60e21b8152fd5b516311a7f27160e11b8152fd5b509034610141576020366003190112610141576001600160a01b0382358181169391929084900361036c578285541633810361035e57846001549485161480610353575b610345578414610338575050426002556001600160a01b03191681176001557f6ab4d119f23076e8ad491bc65ce85f017fb0591dce08755ba8591059cc51737a8280a280f35b51634a2fb73f60e11b8152fd5b50516311bc066560e11b8152fd5b5060025415156102f2565b50516311a8a1bb60e31b8152fd5b8480fd5b505034610189578160031936011261018957905490516001600160a01b039091168152602090f35b50903461014157826003193601126101415782546001600160a01b039290831633036104575760025462093a806103cf8242610bcd565b1115610448571561043a576001549183831661042d575050600080549283167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a36001600160a01b031991821660009081556002551660015580f35b516323295ef960e01b8152fd5b9051630e4b303f60e21b8152fd5b5090516324e0285f60e21b8152fd5b90516311a8a1bb60e31b8152fd5b5050346101895781600319360112610189576020905162093a808152f35b505034610189578160031936011261018957517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b5034610141576020366003190112610141576001600160a01b0381358181169391929084900361036c5782855416330361045757507fc77bec288fc88f168427f2f7da682eadb26cac89d8d591af6e443da98dff2bbc906003549281519084168152846020820152a16001600160a01b0319161760035580f35b5050346101895781600319360112610189576020905163ffffffff7f0000000000000000000000000000000000000000000000000000000000000000168152f35b503461014157602091826003193601126106ee57813567ffffffffffffffff811161036c576105b49036908401610a3e565b916001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000818116330361073e576105f690826003541690610ada565b1561070d5790859161060a86865114610b97565b7f00000000000000000000000000000000000000000000000000000000000000001690845186860151908781106106fc575b50823b156106ee5760448492838751958694859363473ec9fd60e11b855263ffffffff7f0000000000000000000000000000000000000000000000000000000000000000169085015260248401525af180156106f2576106da575b50507fb3abc57bfeebd2cac918901db582f71972a8e628bccf19f5ae3e3482b98a5ced926106ce8251938385948552840190610a9a565b9033908301520390a180f35b6106e3906109f2565b6106ee578338610697565b8380fd5b83513d84823e3d90fd5b60001990880360031b1b163861063c565b5083606492519162461bcd60e51b8352820152600c60248201526b10b61921b7b73732b1ba37b960a11b6044820152fd5b6064868486519162461bcd60e51b83528183015260248201526310a0a6a160e11b6044820152fd5b5090806003193601126101415767ffffffffffffffff91803583811161036c576107939036908301610a3e565b9260243590811161036c576107ab9036908301610a3e565b906001600160a01b037f000000000000000000000000000000000000000000000000000000000000000081163303610961576107ea6020865114610b97565b825161092f578086917f0000000000000000000000000000000000000000000000000000000000000000169060035416908551916327fba37b60e11b60208401526020602484015261085183610843604482018b610a9a565b03601f198101855284610a1c565b813b156106ee578651634f9e72ad60e11b81529485015234602485015260606044850152839182908190610889906064830190610a9a565b039134905af18015610925576108e6575b5091816106ce7fdcaa37a042a0087de79018c629bbd29cee82ca80bd9be394e1696bf9e9355077946108d89451948594606086526060860190610a9a565b908482036020860152610a9a565b916106ce7fdcaa37a042a0087de79018c629bbd29cee82ca80bd9be394e1696bf9e935507794929561091a6108d8956109f2565b95929450509161089a565b83513d87823e3d90fd5b835162461bcd60e51b8152602081840152600c60248201526b042c8c2e8c240d8cadccee8d60a31b6044820152606490fd5b835162461bcd60e51b8152602081840152600c60248201526b10b937b7ba26b0b730b3b2b960a11b6044820152606490fd5b5050346101895781600319360112610189576020906002549051908152f35b84903461018957816003193601126101895760209063ffffffff7f0000000000000000000000000000000000000000000000000000000000000000168152f35b67ffffffffffffffff8111610a0657604052565b634e487b7160e01b600052604160045260246000fd5b90601f8019910116810190811067ffffffffffffffff821117610a0657604052565b81601f82011215610a955780359067ffffffffffffffff8211610a065760405192610a73601f8401601f191660200185610a1c565b82845260208383010111610a9557816000926020809301838601378301015290565b600080fd5b919082519283825260005b848110610ac6575050826000602080949584010152601f8019910116010190565b602081830181015184830182015201610aa5565b6001600160a01b039081169133839003610b68576020600493604051948580926333f2026760e11b82525afa928315610b5c57600093610b1e575b50811691161490565b6020939193813d8211610b54575b81610b3960209383610a1c565b81010312610189575190828216820361013e57509181610b15565b3d9150610b2c565b6040513d6000823e3d90fd5b60405162461bcd60e51b81526020600482015260076024820152662162726964676560c81b6044820152606490fd5b15610b9e57565b60405162461bcd60e51b8152602060048201526007602482015266042d8cadccee8d60cb1b6044820152606490fd5b91908203918211610bda57565b634e487b7160e01b600052601160045260246000fdfea2646970667358221220c05a9a840f69cf6ea3e83a94d34bd5bfd39d3632e6456378632eca5006370e0f64736f6c63430008110033";

type ConsensysHubConnectorConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ConsensysHubConnectorConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ConsensysHubConnector__factory extends ContractFactory {
  constructor(...args: ConsensysHubConnectorConstructorParams) {
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
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ConsensysHubConnector> {
    return super.deploy(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      overrides || {}
    ) as Promise<ConsensysHubConnector>;
  }
  override getDeployTransaction(
    _domain: PromiseOrValue<BigNumberish>,
    _mirrorDomain: PromiseOrValue<BigNumberish>,
    _amb: PromiseOrValue<string>,
    _rootManager: PromiseOrValue<string>,
    _mirrorConnector: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      overrides || {}
    );
  }
  override attach(address: string): ConsensysHubConnector {
    return super.attach(address) as ConsensysHubConnector;
  }
  override connect(signer: Signer): ConsensysHubConnector__factory {
    return super.connect(signer) as ConsensysHubConnector__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ConsensysHubConnectorInterface {
    return new utils.Interface(_abi) as ConsensysHubConnectorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ConsensysHubConnector {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ConsensysHubConnector;
  }
}
