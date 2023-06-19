/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  PayableOverrides,
  BytesLike,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  UpgradeBeaconProxy,
  UpgradeBeaconProxyInterface,
} from "../../../../contracts/shared/upgrade/UpgradeBeaconProxy";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_upgradeBeacon",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_initializationCalldata",
        type: "bytes",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x60a060405261053580380380610014816100c5565b92833981016040828203126100a95781519161002f836100f7565b6020810151906001600160401b0382116100a957019181601f840112156100a95782519261006461005f85610108565b6100c5565b92848452602085830101116100a95761008c936100879160208086019101610132565b6101a1565b60405161026290816102d382396080518181816026015260f60152f35b600080fd5b50634e487b7160e01b600052604160045260246000fd5b6040519190601f01601f191682016001600160401b038111838210176100ea57604052565b6100f26100ae565b604052565b6001600160a01b038116036100a957565b6020906001600160401b038111610125575b601f01601f19160190565b61012d6100ae565b61011a565b60005b8381106101455750506000910152565b8181015183820152602001610135565b1561015c57565b60405162461bcd60e51b815260206004820152601f60248201527f626561636f6e20696d706c656d656e746174696f6e2021636f6e7472616374006044820152606490fd5b803b1561024c5780608052600080808080945afa906101be610284565b911561020d5760208280518101031261020a5750602001516101df816100f7565b6001600160a01b0316906101f5823b1515610155565b80516101ff575050565b610208916102aa565b565b80fd5b506044604051809262461bcd60e51b82526020600483015261023e8151809281602486015260208686019101610132565b601f01601f19168101030190fd5b60405162461bcd60e51b815260206004820152601060248201526f18995858dbdb880858dbdb9d1c9858dd60821b6044820152606490fd5b3d156102a5573d9061029861005f83610108565b9182523d6000602084013e565b606090565b6000918291602082519201905af46102c0610284565b50156102c857565b3d6000803e3d6000fdfe60806040523615610015575b6100136100e5565b005b6100b96100b46100a86000808080807f00000000000000000000000000000000000000000000000000000000000000005afa903d156100d857610099903d9267ffffffffffffffff938481116100cb575b60405194601f8201601f19908116603f01168601908111868210176100be575b604052845283849260203d92013e6101a1565b60208082518301019101610208565b6001600160a01b031690565b610169565b61000b565b6100c661018a565b610086565b6100d361018a565b610066565b50610099606080926101a1565b6101676100b46100a86000808080807f00000000000000000000000000000000000000000000000000000000000000005afa903d156100d857610099903d9267ffffffffffffffff938481116100cb5760405194601f8201601f19908116603f01168601908111868210176100be57604052845283849260203d92013e6101a1565b565b90506000808092368280378136915af43d82803e15610186573d90f35b3d90fd5b50634e487b7160e01b600052604160045260246000fd5b156101a95750565b6040519062461bcd60e51b82528160208060048301528251908160248401526000935b8285106101ef575050604492506000838284010152601f80199101168101030190fd5b84810182015186860160440152938101938593506101cc565b9081602091031261022757516001600160a01b03811681036102275790565b600080fdfea2646970667358221220c5a6d215bec1dc1a7cb302cfebcdca0785102b06a99d8e8076e051e935b88b7f64736f6c63430008110033";

type UpgradeBeaconProxyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: UpgradeBeaconProxyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class UpgradeBeaconProxy__factory extends ContractFactory {
  constructor(...args: UpgradeBeaconProxyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _upgradeBeacon: PromiseOrValue<string>,
    _initializationCalldata: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<UpgradeBeaconProxy> {
    return super.deploy(
      _upgradeBeacon,
      _initializationCalldata,
      overrides || {}
    ) as Promise<UpgradeBeaconProxy>;
  }
  override getDeployTransaction(
    _upgradeBeacon: PromiseOrValue<string>,
    _initializationCalldata: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _upgradeBeacon,
      _initializationCalldata,
      overrides || {}
    );
  }
  override attach(address: string): UpgradeBeaconProxy {
    return super.attach(address) as UpgradeBeaconProxy;
  }
  override connect(signer: Signer): UpgradeBeaconProxy__factory {
    return super.connect(signer) as UpgradeBeaconProxy__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UpgradeBeaconProxyInterface {
    return new utils.Interface(_abi) as UpgradeBeaconProxyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UpgradeBeaconProxy {
    return new Contract(address, _abi, signerOrProvider) as UpgradeBeaconProxy;
  }
}
