/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  DiamondCutFacet,
  DiamondCutFacetInterface,
} from "../../../../../contracts/core/connext/facets/DiamondCutFacet";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "facetAddress",
            type: "address",
          },
          {
            internalType: "enum IDiamondCut.FacetCutAction",
            name: "action",
            type: "uint8",
          },
          {
            internalType: "bytes4[]",
            name: "functionSelectors",
            type: "bytes4[]",
          },
        ],
        indexed: false,
        internalType: "struct IDiamondCut.FacetCut[]",
        name: "_diamondCut",
        type: "tuple[]",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_init",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "_calldata",
        type: "bytes",
      },
    ],
    name: "DiamondCut",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "facetAddress",
            type: "address",
          },
          {
            internalType: "enum IDiamondCut.FacetCutAction",
            name: "action",
            type: "uint8",
          },
          {
            internalType: "bytes4[]",
            name: "functionSelectors",
            type: "bytes4[]",
          },
        ],
        indexed: false,
        internalType: "struct IDiamondCut.FacetCut[]",
        name: "_diamondCut",
        type: "tuple[]",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_init",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "_calldata",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "DiamondCutProposed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "facetAddress",
            type: "address",
          },
          {
            internalType: "enum IDiamondCut.FacetCutAction",
            name: "action",
            type: "uint8",
          },
          {
            internalType: "bytes4[]",
            name: "functionSelectors",
            type: "bytes4[]",
          },
        ],
        indexed: false,
        internalType: "struct IDiamondCut.FacetCut[]",
        name: "_diamondCut",
        type: "tuple[]",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_init",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "_calldata",
        type: "bytes",
      },
    ],
    name: "DiamondCutRescinded",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "facetAddress",
            type: "address",
          },
          {
            internalType: "enum IDiamondCut.FacetCutAction",
            name: "action",
            type: "uint8",
          },
          {
            internalType: "bytes4[]",
            name: "functionSelectors",
            type: "bytes4[]",
          },
        ],
        internalType: "struct IDiamondCut.FacetCut[]",
        name: "_diamondCut",
        type: "tuple[]",
      },
      {
        internalType: "address",
        name: "_init",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_calldata",
        type: "bytes",
      },
    ],
    name: "diamondCut",
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
            name: "facetAddress",
            type: "address",
          },
          {
            internalType: "enum IDiamondCut.FacetCutAction",
            name: "action",
            type: "uint8",
          },
          {
            internalType: "bytes4[]",
            name: "functionSelectors",
            type: "bytes4[]",
          },
        ],
        internalType: "struct IDiamondCut.FacetCut[]",
        name: "_diamondCut",
        type: "tuple[]",
      },
      {
        internalType: "address",
        name: "_init",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_calldata",
        type: "bytes",
      },
    ],
    name: "getAcceptanceTime",
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
            name: "facetAddress",
            type: "address",
          },
          {
            internalType: "enum IDiamondCut.FacetCutAction",
            name: "action",
            type: "uint8",
          },
          {
            internalType: "bytes4[]",
            name: "functionSelectors",
            type: "bytes4[]",
          },
        ],
        internalType: "struct IDiamondCut.FacetCut[]",
        name: "_diamondCut",
        type: "tuple[]",
      },
      {
        internalType: "address",
        name: "_init",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_calldata",
        type: "bytes",
      },
    ],
    name: "proposeDiamondCut",
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
            name: "facetAddress",
            type: "address",
          },
          {
            internalType: "enum IDiamondCut.FacetCutAction",
            name: "action",
            type: "uint8",
          },
          {
            internalType: "bytes4[]",
            name: "functionSelectors",
            type: "bytes4[]",
          },
        ],
        internalType: "struct IDiamondCut.FacetCut[]",
        name: "_diamondCut",
        type: "tuple[]",
      },
      {
        internalType: "address",
        name: "_init",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_calldata",
        type: "bytes",
      },
    ],
    name: "rescindDiamondCut",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611ac4806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80631f931c1c146100515780632c67849c1461006657806356a8ea4814610079578063bbf2358e1461009e575b600080fd5b61006461005f3660046112de565b6100b1565b005b6100646100743660046112de565b61010a565b61008c6100873660046112de565b61015c565b60405190815260200160405180910390f35b6100646100ac3660046112de565b6101cb565b6100b961021d565b6101036100c6858761144b565b8484848080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061028e92505050565b5050505050565b61011261021d565b61010361011f858761144b565b8484848080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061056592505050565b60006101c1868686868660405160200161017a959493929190611621565b6040516020818303038152906040528051906020012060009081527fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c1321602052604090205490565b9695505050505050565b6101d361021d565b6101036101e0858761144b565b8484848080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506105f692505050565b600080516020611a23833981519152600401546001600160a01b0316331461028c5760405162461bcd60e51b815260206004820152601b60248201527f4c69624469616d6f6e643a2021636f6e7472616374206f776e6572000000000060448201526064015b60405180910390fd5b565b604051600080516020611a23833981519152906000906102b690869086908690602001611847565b60408051601f19818403018152919052805160209091012060028301549091501561035a57600081815260058301602052604090205480158015906102fb5750428111155b6103475760405162461bcd60e51b815260206004820152601d60248201527f4c69624469616d6f6e643a2064656c6179206e6f7420656c61707365640000006044820152606401610283565b5060008181526005830160205260408120555b845160005b8181101561051757600087828151811061037b5761037b61187b565b60200260200101516020015190506000600281111561039c5761039c611578565b8160028111156103ae576103ae611578565b036103fc576103f78883815181106103c8576103c861187b565b6020026020010151600001518984815181106103e6576103e661187b565b6020026020010151604001516106bf565b61050e565b600181600281111561041057610410611578565b03610459576103f788838151811061042a5761042a61187b565b6020026020010151600001518984815181106104485761044861187b565b602002602001015160400151610830565b600281600281111561046d5761046d611578565b036104b6576103f78883815181106104875761048761187b565b6020026020010151600001518984815181106104a5576104a561187b565b6020026020010151604001516109b9565b60405162461bcd60e51b815260206004820152602760248201527f4c69624469616d6f6e644375743a20496e636f727265637420466163657443756044820152663a20b1ba34b7b760c91b6064820152608401610283565b5060010161035f565b507f8faa70878671ccd212d20771b795c50af8fd3ff6cf27f4bde57e5d4de0aeb67386868660405161054b93929190611847565b60405180910390a161055d8585610b6b565b505050505050565b600080516020611a23833981519152600501600084848460405160200161058e93929190611847565b604051602081830303815290604052805190602001208152602001908152602001600020600090557f47b4eb69218cd939e2a72afd9d24fe3a6ca02515a6d712ff3942062df2eedbdb8383836040516105e993929190611847565b60405180910390a1505050565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c132254600080516020611a238339815191529060009061063590426118a7565b90508082600501600087878760405160200161065393929190611847565b604051602081830303815290604052805190602001208152602001908152602001600020819055507f6c20294df7018c510b52fd6cc0352d7b78056de164d751b75da6ef7b63daa83e858585846040516106b094939291906118c0565b60405180910390a15050505050565b80516000036106e05760405162461bcd60e51b815260040161028390611906565b600080516020611a238339815191526001600160a01b0383166107155760405162461bcd60e51b815260040161028390611951565b6001600160a01b0383166000908152600182016020526040812054906001600160601b038216900361074b5761074b8285610d7e565b825160005b8181101561055d57600085828151811061076c5761076c61187b565b6020908102919091018101516001600160e01b031981166000908152918790526040909120549091506001600160a01b0316801561080a5760405162461bcd60e51b815260206004820152603560248201527f4c69624469616d6f6e644375743a2043616e2774206164642066756e6374696f6044820152746e207468617420616c72656164792065786973747360581b6064820152608401610283565b6108168683878b610de8565b846108208161199d565b9550508260010192505050610750565b805160008190036108535760405162461bcd60e51b815260040161028390611906565b600080516020611a238339815191526001600160a01b0384166108885760405162461bcd60e51b815260040161028390611951565b6001600160a01b0384166000908152600182016020526040812054906001600160601b03821690036108be576108be8286610d7e565b60005b8381101561055d5760008582815181106108dd576108dd61187b565b6020908102919091018101516001600160e01b031981166000908152918690526040909120549091506001600160a01b0390811690881681036109885760405162461bcd60e51b815260206004820152603860248201527f4c69624469616d6f6e644375743a2043616e2774207265706c6163652066756e60448201527f6374696f6e20776974682073616d652066756e6374696f6e00000000000000006064820152608401610283565b610993858284610e88565b61099f8583868b610de8565b836109a98161199d565b94505082600101925050506108c1565b80516000036109da5760405162461bcd60e51b815260040161028390611906565b600080516020611a23833981519152635df91ac760e11b6307e4c70760e21b6001600160a01b03851615610a6f5760405162461bcd60e51b815260206004820152603660248201527f4c69624469616d6f6e644375743a2052656d6f76652066616365742061646472604482015275657373206d757374206265206164647265737328302960501b6064820152608401610283565b835160005b81811015610b62576000868281518110610a9057610a9061187b565b60200260200101519050846001600160e01b031916816001600160e01b03191614158015610acb57506001600160e01b031981811690851614155b610b2a5760405162461bcd60e51b815260206004820152602a60248201527f4c69624469616d6f6e644375743a2043616e6e6f742072656d6f7665206375746044820152692073656c6563746f727360b01b6064820152608401610283565b6001600160e01b031981166000908152602087905260409020546001600160a01b0316610b58878284610e88565b5050600101610a74565b50505050505050565b6001600160a01b038216610bf257805115610bee5760405162461bcd60e51b815260206004820152603c60248201527f4c69624469616d6f6e644375743a205f696e697420697320616464726573732860448201527f3029206275745f63616c6c64617461206973206e6f7420656d707479000000006064820152608401610283565b5050565b8051600003610c695760405162461bcd60e51b815260206004820152603d60248201527f4c69624469616d6f6e644375743a205f63616c6c6461746120697320656d707460448201527f7920627574205f696e6974206973206e6f7420616464726573732830290000006064820152608401610283565b6001600160a01b0382163014610c9b57610c9b82604051806060016040528060288152602001611a436028913961124b565b600080836001600160a01b031683604051610cb691906119c3565b600060405180830381855af49150503d8060008114610cf1576040519150601f19603f3d011682016040523d82523d6000602084013e610cf6565b606091505b509150915081610d7857805115610d21578060405162461bcd60e51b815260040161028391906119df565b60405162461bcd60e51b815260206004820152602660248201527f4c69624469616d6f6e644375743a205f696e69742066756e6374696f6e2072656044820152651d995c9d195960d21b6064820152608401610283565b50505050565b610da081604051806060016040528060248152602001611a6b6024913961124b565b6002820180546001600160a01b0390921660008181526001948501602090815260408220860185905594840183559182529290200180546001600160a01b0319169091179055565b6001600160e01b0319831660008181526020868152604080832080546001600160601b03909716600160a01b026001600160a01b0397881617815594909516808352600180890183529583208054968701815583528183206008870401805460e09890981c60046007909816979097026101000a96870263ffffffff9097021990971695909517909555529290915281546001600160a01b031916179055565b6001600160a01b038216610f045760405162461bcd60e51b815260206004820152603760248201527f4c69624469616d6f6e644375743a2043616e27742072656d6f76652066756e6360448201527f74696f6e207468617420646f65736e27742065786973740000000000000000006064820152608401610283565b306001600160a01b03831603610f735760405162461bcd60e51b815260206004820152602e60248201527f4c69624469616d6f6e644375743a2043616e27742072656d6f766520696d6d7560448201526d3a30b1363290333ab731ba34b7b760911b6064820152608401610283565b6001600160e01b03198116600090815260208481526040808320546001600160a01b0386168452600180880190935290832054600160a01b9091046001600160601b03169291610fc2916119f9565b90508082146110b4576001600160a01b03841660009081526001860160205260408120805483908110610ff757610ff761187b565b600091825260208083206008830401546001600160a01b038916845260018a019091526040909220805460079092166004026101000a90920460e01b9250829190859081106110485761104861187b565b600091825260208083206008830401805463ffffffff60079094166004026101000a938402191660e09590951c929092029390931790556001600160e01b03199290921682528690526040902080546001600160a01b0316600160a01b6001600160601b038516021790555b6001600160a01b038416600090815260018601602052604090208054806110dd576110dd611a0c565b60008281526020808220600860001990940193840401805463ffffffff600460078716026101000a0219169055919092556001600160e01b03198516825286905260408120819055819003610103576002850154600090611140906001906119f9565b6001600160a01b03861660009081526001808901602052604090912001549091508082146111ef57600087600201838154811061117f5761117f61187b565b6000918252602090912001546002890180546001600160a01b0390921692508291849081106111b0576111b061187b565b600091825260208083209190910180546001600160a01b0319166001600160a01b03948516179055929091168152600189810190925260409020018190555b8660020180548061120257611202611a0c565b60008281526020808220830160001990810180546001600160a01b03191690559092019092556001600160a01b0388168252600189810190915260408220015550505050505050565b806001600160a01b0383163b6112745760405162461bcd60e51b815260040161028391906119df565b505050565b80356001600160a01b038116811461129057600080fd5b919050565b60008083601f8401126112a757600080fd5b50813567ffffffffffffffff8111156112bf57600080fd5b6020830191508360208285010111156112d757600080fd5b9250929050565b6000806000806000606086880312156112f657600080fd5b853567ffffffffffffffff8082111561130e57600080fd5b818801915088601f83011261132257600080fd5b81358181111561133157600080fd5b8960208260051b850101111561134657600080fd5b6020830197508096505061135c60208901611279565b9450604088013591508082111561137257600080fd5b5061137f88828901611295565b969995985093965092949392505050565b634e487b7160e01b600052604160045260246000fd5b6040516060810167ffffffffffffffff811182821017156113c9576113c9611390565b60405290565b604051601f8201601f1916810167ffffffffffffffff811182821017156113f8576113f8611390565b604052919050565b600067ffffffffffffffff82111561141a5761141a611390565b5060051b60200190565b80356003811061129057600080fd5b80356001600160e01b03198116811461129057600080fd5b600061145e61145984611400565b6113cf565b83815260208082019190600586811b86013681111561147c57600080fd5b865b8181101561156b57803567ffffffffffffffff8082111561149f5760008081fd5b818a019150606082360312156114b55760008081fd5b6114bd6113a6565b6114c683611279565b81526114d3878401611424565b87820152604080840135838111156114eb5760008081fd5b939093019236601f85011261150257600092508283fd5b8335925061151261145984611400565b83815292871b8401880192888101903685111561152f5760008081fd5b948901945b848610156115545761154586611433565b82529489019490890190611534565b91830191909152508852505094830194830161147e565b5092979650505050505050565b634e487b7160e01b600052602160045260246000fd5b600381106115ac57634e487b7160e01b600052602160045260246000fd5b9052565b8183526000602080850194508260005b858110156115ed576001600160e01b03196115da83611433565b16875295820195908201906001016115c0565b509495945050505050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b6060808252818101869052600090600560808085019089831b8601018a855b8b81101561170557878303607f190184528135368e9003605e1901811261166657600080fd5b8d016001600160a01b0361167982611279565b1684526020611689818301611424565b6116958287018261158e565b50604080830135601e198436030181126116ae57600080fd5b90920181810192903567ffffffffffffffff8111156116cc57600080fd5b80891b36038413156116dd57600080fd5b89828801526116ef8a880182866115b0565b9783019796505050929092019150600101611640565b50506001600160a01b0389166020870152858103604087015261172981888a6115f8565b9b9a5050505050505050505050565b600081518084526020808501808196508360051b810191508286016000805b868110156117e9578385038a52825180516001600160a01b03168652868101516060908188019061178a8a8a018261158e565b506040928301519288019190915281519081905290870190608087019084905b808210156117d45783516001600160e01b03191683529289019291890191600191909101906117aa565b50509a87019a95505091850191600101611757565b509298975050505050505050565b60005b838110156118125781810151838201526020016117fa565b50506000910152565b600081518084526118338160208601602086016117f7565b601f01601f19169290920160200192915050565b60608152600061185a6060830186611738565b6001600160a01b038516602084015282810360408401526101c1818561181b565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b808201808211156118ba576118ba611891565b92915050565b6080815260006118d36080830187611738565b6001600160a01b038616602084015282810360408401526118f4818661181b565b91505082606083015295945050505050565b6020808252602b908201527f4c69624469616d6f6e644375743a204e6f2073656c6563746f727320696e206660408201526a1858d95d081d1bc818dd5d60aa1b606082015260800190565b6020808252602c908201527f4c69624469616d6f6e644375743a204164642066616365742063616e2774206260408201526b65206164647265737328302960a01b606082015260800190565b60006001600160601b038083168181036119b9576119b9611891565b6001019392505050565b600082516119d58184602087016117f7565b9190910192915050565b6020815260006119f2602083018461181b565b9392505050565b818103818111156118ba576118ba611891565b634e487b7160e01b600052603160045260246000fdfec8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c4c69624469616d6f6e644375743a205f696e6974206164647265737320686173206e6f20636f64654c69624469616d6f6e644375743a204e657720666163657420686173206e6f20636f6465a2646970667358221220b31c8fc599c13bb07d2a113eb9e3c354c9dd13a7d5f9d098a0b4e9cf8422c35564736f6c63430008110033";

type DiamondCutFacetConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DiamondCutFacetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DiamondCutFacet__factory extends ContractFactory {
  constructor(...args: DiamondCutFacetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DiamondCutFacet> {
    return super.deploy(overrides || {}) as Promise<DiamondCutFacet>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): DiamondCutFacet {
    return super.attach(address) as DiamondCutFacet;
  }
  override connect(signer: Signer): DiamondCutFacet__factory {
    return super.connect(signer) as DiamondCutFacet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DiamondCutFacetInterface {
    return new utils.Interface(_abi) as DiamondCutFacetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DiamondCutFacet {
    return new Contract(address, _abi, signerOrProvider) as DiamondCutFacet;
  }
}
