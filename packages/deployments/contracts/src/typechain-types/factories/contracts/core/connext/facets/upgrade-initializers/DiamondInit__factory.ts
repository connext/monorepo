/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../../common";
import type {
  DiamondInit,
  DiamondInitInterface,
} from "../../../../../../contracts/core/connext/facets/upgrade-initializers/DiamondInit";

const _abi = [
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
    name: "DiamondInit__init_alreadyInitialized",
    type: "error",
  },
  {
    inputs: [],
    name: "DiamondInit__init_domainsDontMatch",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_domain",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "_xAppConnectionManager",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_acceptanceDelay",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_lpTokenTargetAddress",
        type: "address",
      },
    ],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60808060405234610016576102e5908161001c8239f35b600080fdfe60806040908082526004918236101561001757600080fd5b600092833560e01c639a7e155e1461002e57600080fd5b346102ab5760803660031901126102ab5780359163ffffffff918284168094036102a7576001600160a01b03946024358681169591908690036102a3576064359680881680980361029f5788549160ff831661029157507fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c13205416330361024e57835163234d8e3d60e21b815260209590868186818b5afa90811561024457908492918b916101db575b5016036101cb5760ff19908116600190811789556301ffc9a760e01b89527fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131f86528489208054831682179055636f5723a360e11b895284892080548316821790556348e2b09360e01b8952848920805483168217905563286b971b60e01b89529388208054909116841790556044357fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c13225560168390556017839055815463ffffffff191617905561270b90556005600c5580546001600160a01b03199081169092179055601a805490911691909117905580f35b8351631fdd17b360e11b81528390fd5b91925050863d881161023d575b601f8101601f1916820167ffffffffffffffff81118382101761022a57889183918952810103126102265751908082168203610226578391386100d7565b8980fd5b634e487b7160e01b8c526041875260248cfd5b503d6101e8565b86513d8c823e3d90fd5b835162461bcd60e51b8152602081850152601b60248201527f4c69624469616d6f6e643a2021636f6e7472616374206f776e657200000000006044820152606490fd5b6318fc834360e21b81528490fd5b8880fd5b8780fd5b8580fd5b8380fdfea2646970667358221220bea36b304375a4c830d567798cb899c790b376f4efa3e47413dcc38c0360107564736f6c63430008110033";

type DiamondInitConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DiamondInitConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DiamondInit__factory extends ContractFactory {
  constructor(...args: DiamondInitConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DiamondInit> {
    return super.deploy(overrides || {}) as Promise<DiamondInit>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): DiamondInit {
    return super.attach(address) as DiamondInit;
  }
  override connect(signer: Signer): DiamondInit__factory {
    return super.connect(signer) as DiamondInit__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DiamondInitInterface {
    return new utils.Interface(_abi) as DiamondInitInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DiamondInit {
    return new Contract(address, _abi, signerOrProvider) as DiamondInit;
  }
}
