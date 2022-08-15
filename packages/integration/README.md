# Integration

A test script to validate the end-to-end cross-chain transfer process.

# E2E Local Environment

## External Dependencies

Make sure you have docker installed globally.

## Environment Variables

In your local environment, run the following commands to export env variables which will be used in the local e2e runtime environment:

```sh
export GRAPH_1337_ENDPOINT="http://localhost:8010/subgraphs/name/connext/nxtp"
export GRAPH_1338_ENDPOINT="http://localhost:9010/subgraphs/name/connext/nxtp"
```

## Build Local Images

If you need to run the test locally against local changes, you can build the images yourself.

```sh
./packages/integration/build-docker-images.sh
```

## Edit Config If Needed

In `setup.sh` there is a section that creates a `.env` file. Anything here such as image tags can be changed to reflect the test design. For example, if you want to run the test against a different image, you can change the tag in the bash file variables for `ROUTER_IMAGE` and `SEQUENCER_IMAGE`.

## Steps

NOTE: As of the time of writing this, `yarn workspace @connext/nxtp-integration run setup` does not start the local chains properly. Please call the `setup.sh` directly, as shown here:

```sh
./packages/integration/setup.sh
yarn workspace @connext/nxtp-integration run test
```

## Logs from Deployment

Used to get local addresses for use in test scripts.

```
============================= Deploying Nomad Core ===============================
deployer:  0x627306090abaB3A6e1400e9345bC60c78a8BEf57
deploying "UpgradeBeaconController" (tx: 0x5f33aa7fbe0285511702677fc5a455a1e1cb8d24ee6ccfb563b09368385fbc50)...: deployed at 0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0 with 307518 gas
Deploying BridgeToken with nomad upgradeable scheme
deploying "BridgeToken" (tx: 0x9c4fdf9ef48cedd92e0b102d08bb82af6880bef493027ce79502837d12dba963)...: deployed at 0xF12b5dd4EAD5F743C6BaA640B0216200e89B60Da with 1389032 gas
deployed implementation: 0xF12b5dd4EAD5F743C6BaA640B0216200e89B60Da
deploying "BridgeTokenUpgradeBeacon" (tx: 0x9ffdc19e0a58659deedb7a0068ad9ed534825762760ef528e76d4688e2d52e29)...: deployed at 0x345cA3e014Aaf5dcA488057592ee47305D9B3e10 with 168911 gas
deploying "BridgeTokenUpgradeBeaconProxy" (tx: 0xd40fd92aa309ad031befb4820639d1a310ebacc08746bcf8bc0b61bc7e256f3b)...: deployed at 0xf25186B5081Ff5cE73482AD761DB0eB0d25abfBF with 229159 gas
bridgeTokenBeacon address:  0x345cA3e014Aaf5dcA488057592ee47305D9B3e10
bridgeToken proxy address: 0xf25186B5081Ff5cE73482AD761DB0eB0d25abfBF
deploying "UpdaterManager" (tx: 0xdd6396206c037488c382fb79bbe528f6ab61b2f12bdaa07f64cbba42bab516f4)...: deployed at 0x8f0483125FCb9aaAEFA9209D8E9d7b9C8B9Fb90F with 365477 gas
updaterManager address:  0x8f0483125FCb9aaAEFA9209D8E9d7b9C8B9Fb90F
Deploying Home with nomad upgradeable scheme
deploying "Home" (tx: 0x7d3195e158decd20058a1a2ca6631f5a9f4f2e3367d63cc9dcb3f7a06f9040d3)...: deployed at 0x9FBDa871d559710256a2502A2517b794B482Db40 with 2048403 gas
deployed implementation: 0x9FBDa871d559710256a2502A2517b794B482Db40
deploying "HomeUpgradeBeacon" (tx: 0x39308252a7272d6f9e9409a8be4cd6b0ff03944bb0d6aa813414c8f4500c7769)...: deployed at 0x2C2B9C9a4a25e24B174f26114e8926a9f2128FE4 with 168923 gas
deploying "HomeUpgradeBeaconProxy" (tx: 0xb4311a6a61baa71887495dca52677db43a99345c26b7b6817f618a59401b3b79)...: deployed at 0x30753E4A8aad7F8597332E813735Def5dD395028 with 305696 gas
home address:  0x30753E4A8aad7F8597332E813735Def5dD395028

============================= Deploying Nomad ===============================
deployer:  0x627306090abaB3A6e1400e9345bC60c78a8BEf57
Deploying xapp connection manager...
deploying "XAppConnectionManager" (tx: 0xdb86636c681727289d54c02fb5eb6930783e255e58b79d6ca1b82e677ca9fa30)...: deployed at 0xFB88dE099e13c3ED21F80a7a1E49f8CAEcF10df6 with 934450 gas
deploy tx: 0xdb86636c681727289d54c02fb5eb6930783e255e58b79d6ca1b82e677ca9fa30
xappConnectionManagerAddress: 0xFB88dE099e13c3ED21F80a7a1E49f8CAEcF10df6
Deploying token registry...
Deploying TokenRegistry with nomad upgradeable scheme
deploying "TokenRegistry" (tx: 0x608cb1bb1cadb9ada7435d9c3ef55167d38b4cb0481eb0abf993281d306540cb)...: deployed at 0xAa588d3737B611baFD7bD713445b314BD453a5C8 with 1574316 gas
deployed implementation: 0xAa588d3737B611baFD7bD713445b314BD453a5C8
deploying "TokenRegistryUpgradeBeacon" (tx: 0x5c6d62a8eacdbc7c8b7df10e770a4c064eba86dbb3a65f78f6ac814817672bce)...: deployed at 0xf204a4Ef082f5c04bB89F7D5E6568B796096735a with 168935 gas
deploying "TokenRegistryUpgradeBeaconProxy" (tx: 0xeac41b4b7f299111f43d25e83486accf0e17dcbd3002a093557d3caf13461cfb)...: deployed at 0x75c35C980C0d37ef46DF04d31A140b65503c0eEd with 257835 gas
Deploying bridge router...
Deploying BridgeRouter with nomad upgradeable scheme
deploying "BridgeRouter" (tx: 0x5ebe4ca026102ba13b3e1ca07dfc28cdf6e34ff176f469ed561fe4acc33729a6)...: deployed at 0x82D50AD3C1091866E258Fd0f1a7cC9674609D254 with 2824942 gas
deployed implementation: 0x82D50AD3C1091866E258Fd0f1a7cC9674609D254
deploying "BridgeRouterUpgradeBeacon" (tx: 0x89efa2833fc636da0ffdbaa3b7ec5802ae899dc8902fca4eac4201d32dd0e12a)...: deployed at 0xdDA6327139485221633A1FcD65f4aC932E60A2e1 with 168935 gas
deploying "BridgeRouterUpgradeBeaconProxy" (tx: 0xdae55288f7092501910b1d7689d36fffa9dc266867818791c4f49a6be34eb4bd)...: deployed at 0xeec918d74c746167564401103096D45BbD494B74 with 257844 gas
BridgeRouterUpgradeBeaconProxy deployed to 0xeec918d74c746167564401103096D45BbD494B74
Setting local domain of token registry as 1338...
setDomain tx: 0x6e4cabd184a1ecc13d1da5d2626e634d23023b44d2c49c3abb6c4c1620bbdd86
setDomain tx mined: {
  to: '0x75c35C980C0d37ef46DF04d31A140b65503c0eEd',
  from: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
  contractAddress: null,
  transactionIndex: 0,
  gasUsed: BigNumber { _hex: '0x86cf', _isBigNumber: true },
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  blockHash: '0x9d5d04fdcbce623e40b5a55393c47e565a3b0ce238e41dd526d955bc9a93fcf3',
  transactionHash: '0x6e4cabd184a1ecc13d1da5d2626e634d23023b44d2c49c3abb6c4c1620bbdd86',
  logs: [],
  blockNumber: 56,
  confirmations: 1,
  cumulativeGasUsed: BigNumber { _hex: '0x86cf', _isBigNumber: true },
  effectiveGasPrice: BigNumber { _hex: '0x099795', _isBigNumber: true },
  status: 1,
  type: 2,
  byzantium: true,
  events: []
}
xapp owner 0x627306090abaB3A6e1400e9345bC60c78a8BEf57
setting home as 0x30753e4a8aad7f8597332e813735def5dd395028 on local1338....
setHome: 0x7bb3817d24ee52969a448e173d5eb5359719fe0e9e5bc4e18a12beef09f913c8


============================= Deploying Connext Contracts ===============================
deployer:  0x627306090abaB3A6e1400e9345bC60c78a8BEf57
network:  { chainId: 1338, name: 'unknown' }
domainConfig:  {
  name: 'local1338',
  domain: 1338,
  contracts: {
    bridge: { bridgeToke  n: [Object] },
    core: { replicas: [], home: [Object] }
  }
}
price:  1000550473
balance:  9999999971155483966150
Fetching token registry...
Deploying relayer fee router...
Deploying RelayerFeeRouter with nomad upgradeable scheme
deploying "RelayerFeeRouter" (tx: 0x2550ee2cd93effcfac0153876d6f4e40d010ab74693fed7633f010ce957bb6b1)...: deployed at 0x38cF23C52Bb4B13F051Aec09580a2dE845a7FA35 with 1528032 gas
deployed implementation: 0x38cF23C52Bb4B13F051Aec09580a2dE845a7FA35
deploying "RelayerFeeRouterUpgradeBeacon" (tx: 0xfafd0c657f51fc4489955a21844bda4ccb91279d418d7aee65dff6e84bdd9335)...: deployed at 0x4E72770760c011647D4873f60A3CF6cDeA896CD8 with 168935 gas
deploying "RelayerFeeRouterUpgradeBeaconProxy" (tx: 0x34846ac70bf09e79edc4e5e00e2f56909ae700fdfe900ed336d9e5c76b4eaeaf)...: deployed at 0xbaAA2a3237035A2c7fA2A33c76B44a8C6Fe18e87 with 235028 gas
relayer fee router address: 0xbaAA2a3237035A2c7fA2A33c76B44a8C6Fe18e87
relayer fee router owner: 0x627306090abaB3A6e1400e9345bC60c78a8BEf57
Deploying promise router...
Deploying PromiseRouter with nomad upgradeable scheme
deploying "PromiseRouter" (tx: 0xac1473abc5c9b59642480d6fd5fb1e9041041f12538f17c00445ac9141b62a92)...: deployed at 0x13274Fe19C0178208bCbee397af8167A7be27f6f with 2156978 gas
deployed implementation: 0x13274Fe19C0178208bCbee397af8167A7be27f6f
deploying "PromiseRouterUpgradeBeacon" (tx: 0xae2a4dbbc26a71cd8f4ab904ac081986d73dab08156cedee56597937ead01653)...: deployed at 0xA4392264a2d8c998901D10C154C91725b1BF0158 with 168935 gas
deploying "PromiseRouterUpgradeBeaconProxy" (tx: 0x20c400c90db3b1f356575950a49430f3d5a734f8d195475e92602b9aebe3e5e1)...: deployed at 0xB529f14AA8096f943177c09Ca294Ad66d2E08b1f with 279324 gas
promise router address: 0xB529f14AA8096f943177c09Ca294Ad66d2E08b1f
promise router owner: 0x627306090abaB3A6e1400e9345bC60c78a8BEf57
deploying "LPToken" (tx: 0xa2d0657b1c471a922d95607e1ed8e5ec401e7cd1e1ff434308144317d33f3bb9)...: deployed at 0x3d49d1eF2adE060a33c6E6Aa213513A7EE9a6241 with 1090094 gas
executing LPToken.initialize (tx: 0x465c51670037756c1237c8f94cc03875a77ffacb88cf1c7e6b0ee2156ab45c34) ...: performed with 115426 gas
Deploying connext diamond...
sending eth to create2 contract deployer address (0x3fab184622dc19b6109349b94811493bf2a45362) (tx: 0xd64445c327ad90faf05a6b64fdb9390f1ad99c68075276c5537365141979118a)...
deploying create2 deployer contract (at 0x4e59b44847b379578588920ca78fbf26c0b4956c) using deterministic deployment (https://github.com/Arachnid/deterministic-deployment-proxy) (tx: 0xeddf9e61fb9d8f5111840daef55e5fde0041f5702856532cdbb5a02998033d26)...
deploying "AssetFacet" (tx: 0xb134ede8861b0432d68b7d7ebca81b096ba600feda05b57c7b88cc19a8b29985)...: deployed at 0x038916872Ecc9Bb5A2fe9989820e7091dB9DB421 with 578830 gas
deploying "BridgeFacet" (tx: 0x4bcfbff8ef372b3f6df06aa96d083668529c73b48a9f0a311d0ddd30d77907d3)...: deployed at 0xa00828c4076EA017aE9B3905f6493e630Fb01F95 with 4382084 gas
deploying "NomadFacet" (tx: 0x158f999f3cb21e0d3462d49e7fdaa1cdbe7c942043cc78ebf4242d6a8c802bbf)...: deployed at 0xD1399Dbb69bDF154cC02493A24Cb446c57D3ecB7 with 671203 gas
deploying "ProposedOwnableFacet" (tx: 0x3c8f03bf8711aacf61b04fe87c398c63431f46fb8cbe60a1656251e950fcd4da)...: deployed at 0x0D2d954B09E28c946171DEa08F08d004E63E216d with 599754 gas
deploying "RelayerFacet" (tx: 0x8f2bd16364572e69d23cebacec056222d0b3d7b3e9a966acb83959468138947c)...: deployed at 0x924526A0fcb68Dc1d3d4089222fc9Ca0B97fe366 with 643900 gas
deploying "RoutersFacet" (tx: 0x04fd7c58baa5827480629175e59a2b9cd06495a38103e6dce9649f68a6d2a38e)...: deployed at 0x9fcCA3280889d41eBf378D4d8F96ebdB46eE6eBf with 1680773 gas
deploying "StableSwapFacet" (tx: 0x19d398292fdbc85da026d1c02c30acf0a27646f76ce906aeebd78837aaced873)...: deployed at 0xcc08cCa9E2E90d960EF867FE5C04887936e6BC88 with 4406489 gas
deploying "SwapAdminFacet" (tx: 0xfa09838dc80d15695a507eb4326b31c518954484f8bf8a950616374b2bb2fedf)...: deployed at 0x6273A16522d7b56B0D491260ceb0939429682A6F with 1545758 gas
deploying "VersionFacet" (tx: 0xe8f793aaf1a5710c4a6909795a1c6d69d34ce34493f3e2c0430da9104a9049a8)...: deployed at 0x61eE97D100213dc10ACf98f9E3037b0025E08481 with 86869 gas
deploying "DiamondCutFacet" (tx: 0x313ccc7fe152ca5e91dab47c1e85e33afec333411e2291af922a02dde8d6806d)...: deployed at 0x6A673aec7c6b82aD0A72726d4CA7e48d19cAA5df with 1398167 gas
deploying "_DefaultDiamondLoupeFacet" (tx: 0xa2578c00fbf713f9de4d81df6aafd459835a3d142e32ef04cdafd31d2bea4294)...: deployed at 0x3Bcf4185443A339517aD4e580067f178d1B68E1D with 511079 gas
deploying "DiamondInit" (tx: 0x3fc074f50d94a9a2c25706ecb0ce7125b780be118e8ad7ec3574034e697ca4e0)...: deployed at 0xc1Cd5773B9a758b45De4e16284a0E3EE4E9FE74E with 1685437 gas
deploying "_DefaultDiamondERC165Init" (tx: 0xbbb4700c9948d64044036e8dd08c11c9a2c7b06d658ec07251fef824305ab847)...: deployed at 0xe68d85348f227d2ebEE814C38918F8A2D7d9B603 with 279490 gas
deploying "ConnextHandler_DiamondProxy" (tx: 0x69622d564135fff17c493b50023330252d99dea1582dd4a4e691f5cb80ce306b)...: deployed at 0x8e4C131B37383E431B9cd0635D3cF9f3F628EDae with 7388210 gas
connextAddress:  0x8e4C131B37383E431B9cd0635D3cF9f3F628EDae
setting connext on relayer fee router
setting connext on promiseRouter router
Deploying multicall...
deploying "Multicall" (tx: 0x188a855c10f1024030e60f4298a150ea417df9e559d0fcd7f85223dec9eafcf5)...: deployed at 0x855d1c79Ad3fb086D516554Dc7187E3Fdfc1C79a with 313581 gas
Deploying test token on non-mainnet chain...
deploying "TestERC20" (tx: 0xe7a39afa29cdbdac06e739b62ddfdab6ed19df9f727ebfe1e3f803b350c43079)...: deployed at 0x913bbCFea2f347a24cfCA441d483E7CBAc8De3Db with 801969 gas
TestERC20:  0x913bbCFea2f347a24cfCA441d483E7CBAc8De3Db
deploying "TestWETH" (tx: 0x61dc99ba816b4f625a67b79a73142f0ad1d717b499537d5616f50dbe0ca6336d)...: deployed at 0x8065F4c7b8c2bf53561af92D9DA2Ea022A0b28Ca with 802077 gas
TestERC20:  0x8065F4c7b8c2bf53561af92D9DA2Ea022A0b28Ca

============================= Deploying StableSwap ===============================
deployer:  0x627306090abaB3A6e1400e9345bC60c78a8BEf57
reusing "LPToken" at 0x13274Fe19C0178208bCbee397af8167A7be27f6f
deploying "StableSwap" (tx: 0x1467c50c5ba73f3eb41567cf8c20b5c91c7280d390374df15b7926bbc386ada2)...: deployed at 0x913bbCFea2f347a24cfCA441d483E7CBAc8De3Db with 5556729 gas
Deployed contracts to 1337
```

# E2E Live Environment (Testnet)

## Setup

1. ENVIRONMENT

Create a .env file and fill in the following information:

```sh
ROUTER_MNEMONIC="<...>"
USER_MNEMONIC="<...>"
DEPLOYER_MNEMONIC="<...>"
INFURA_KEY="<...>"
```

**If you don't specify a `ROUTER_MNEMONIC`, we won't run a local router/sequencer instance. Instead, the test will be conducted using any active live counterparts.**

The `USER_MNEMONIC` can literally be any random mnemonic. While it's not necessary (the integration test will just generate a fresh random wallet), it's recommended that you specify one to use continually so as to recycle dust and save ETH on additional setup steps during execution.

You can generate a random wallet easily using node shell, assuming you have `ethers.js` installed globally (or locally)

```s
$ node
Welcome to Node.js v16.14.2.
Type ".help" for more information.
> require("ethers").Wallet.createRandom()._mnemonic().phrase
'provide tray domain smooth gentle now dad mesh artwork coast estate great'
>
```

`DEPLOYER_MNEMONIC` is only necessary if you want to run your router locally and the router hasn't been approved (on the destination domain) yet.

If you don't have an `INFURA_API_KEY`, head over to [infura.io](https://infura.io/) and make an account (it's free). It should be under Project Settings > Project ID (_not Project Secret!_). If you really don't want to use Infura, you can specify `ORIGIN_PROVIDER` and `DESTINATION_PROVIDER` directly, although it's less flexible. At the time of writing this README, the default transfer route for the test is Kovan (origin) => Rinkeby (destination).

2. FUNDING

#### With a local router

Your router's wallet (the wallet to which `ROUTER_MNEMONIC` belongs) must have some ETH supplied on both the origin and destination domains. Ultimately, once initial setup transactions are taken care of, the router _should not_ be using any ETH on the destination domain. However, it will require additional ETH on origin to fund the user agent as needed.

If you're not sure which domains to fund your router wallet for, you can check `constants.ts` under `Integration Settings`.

#### With live router

If `ROUTER_MNEMONIC` isn't specified, the `USER_MNEMONIC` will need to be pre-funded with ETH.

And that's it! No additional set up is required. All pre-flight tasking will be taken care of.

## Execution

To execute the test, just run (in NXTP root):

```s
yarn workspace @connext/nxtp-integration run test
```

NOTE: Do **NOT** run the router or sequencer separately, both will be initialized within the test itself.

## FAQ:

- Q: Do I need to run the router or sequencer separately for this to work? A: No. Both will be run inside the test, assuming a `ROUTER_MNEMONIC` is specified.
- Q: How can I save the test execution logs? A: They are saved automatically by timestamp in the ops/data folder.
- Q: Does this have to run on testnet? A: Yes.
- Q: Can I change the execution router and/or domains? A: Not yet.
- Q: Is this test intended to be run as a step in the CI pipeline? A: No.
- Q: How can I get the `DEPLOYER_MNEMONIC`? A: Ask the team.
