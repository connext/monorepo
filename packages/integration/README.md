# Integration

A test script to validate the end-to-end cross-chain transfer process.

# E2E Local Environment

## Setup

### 1. External Dependencies

Make sure you have docker installed globally.

### 2. Environment Variables

In your local environment, run the following commands to export env variables which will be used in the local e2e runtime environment:

```sh
export GRAPH_1337_ENDPOINT="http://localhost:8010/subgraphs/name/connext/nxtp"
export GRAPH_1338_ENDPOINT="http://localhost:9010/subgraphs/name/connext/nxtp"
```

In `setup-integration-test.sh` there is a section that creates a `.env` file. Anything here such as image tags can be changed to reflect the test design. For example, if you want to run the test against a different image, you can change the tag in the bash file variables for `ROUTER_IMAGE` and `SEQUENCER_IMAGE`.

### 3. Build Local Images

If you need to run the test locally against local changes, you can build the images yourself.

```sh
./build-docker-images.sh
```

### 4. Setup Script

```sh
./setup-integration-test.sh
```

### 5. Run the Test

```sh
yarn workspace @connext/nxtp-integration run test
```

## Logs from Deployment

Used to get local addresses for use in test scripts.

### 1337

```
============================= Mainnet Fork: Testbed Setup ===============================
Retrieved AMB info.
Set code for 0x25ace71c97B33Cc4729CF772ae268934F7ab5fA1
Set storage: 0x0 0x000000000000000000000001de1fcfb0851916ca5101820a69b13a4e276bd81f
Set storage: 0x33 0x0000000000000000000000009ba6e03d8b90de867373db8cf1a58d2f7f006b3a
Enabling automine...
Automine enabled.

============================= Deploying Messaging Contracts ===============================
deployer:  0x627306090abaB3A6e1400e9345bC60c78a8BEf57
Network:  local 1337
Deploying hub messaging contracts...
Deploying RootManager...
deploying "RootManager" (tx: 0x9ab855ffedba57aa3c3abf9ffa91f7055a4d28eca6f51abece28a688c72e2221)...: deployed at 0x4EeE4559BD589b1cdFc419f0EEd2Ff9cBD47F439 with 818422 gas
RootManager deployed to 0x4EeE4559BD589b1cdFc419f0EEd2Ff9cBD47F439
Deploying MainnetL1Connector...
using config {
  prefix: 'Mainnet',
  ambs: {
    hub: '0x0000000000000000000000000000000000000000',
    spoke: '0x0000000000000000000000000000000000000000'
  },
  processGas: BigNumber { _hex: '0x0cf850', _isBigNumber: true },
  reserveGas: BigNumber { _hex: '0x3a98', _isBigNumber: true }
}
constructorArgs: [
  '4919',
  '4919',
  '0x0000000000000000000000000000000000000000',
  '0x4EeE4559BD589b1cdFc419f0EEd2Ff9cBD47F439',
  '0x0000000000000000000000000000000000000000',
  '850000',
  '850000',
  '15000'
]
deploying "MainnetL1Connector" (tx: 0x94ce7e6b55d9c72064e93c852934e608234625b536179c8cba8d4ca98f4af981)...: deployed at 0xCB152A2Aa90055a0D255cA7dbaeb85eDFdc86096 with 2324046 gas
MainnetL1Connector deployed to 0xCB152A2Aa90055a0D255cA7dbaeb85eDFdc86096
Deploying OptimismL1Connector...
using config {
  prefix: 'Optimism',
  ambs: {
    hub: '0x25ace71c97B33Cc4729CF772ae268934F7ab5fA1',
    spoke: '0x4200000000000000000000000000000000000007'
  },
  processGas: BigNumber { _hex: '0x0cf850', _isBigNumber: true },
  reserveGas: BigNumber { _hex: '0x3a98', _isBigNumber: true }
}
constructorArgs: [
  '4919',
  '4920',
  '0x25ace71c97B33Cc4729CF772ae268934F7ab5fA1',
  '0x4EeE4559BD589b1cdFc419f0EEd2Ff9cBD47F439',
  '0x0000000000000000000000000000000000000000',
  '850000',
  '850000',
  '15000'
]
deploying "OptimismL1Connector" (tx: 0x43ef4d0bdd5a5fb6811de8baa54b70317f38b86214624c251eaa3834ab433299)...: deployed at 0x23e84570f7b28aD0d5E5545d398009194a8734f3 with 2443204 gas
OptimismL1Connector deployed to 0x23e84570f7b28aD0d5E5545d398009194a8734f3

============================= Deploying Routers ===============================
deployer:  0x627306090abaB3A6e1400e9345bC60c78a8BEf57
using connector: MainnetL1Connector
deploying "UpgradeBeaconController" (tx: 0x6b036447309421375f67120180a48272d7f6732f1b31d71fa0e137ff831c172c)...: deployed at 0x75076e4fbba61f65efB41D64e45cFF340b1e518A with 307506 gas
Deploying BridgeToken with upgradeable scheme
deploying "BridgeToken" (tx: 0x133270abdf6962a6829339e6f87e2b37f8a0bcb7227265153cd034424b79dc31)...: deployed at 0x8cD918cee8f93989E334bc0107BB33A9586D05c0 with 1411024 gas
deployed implementation: 0x8cD918cee8f93989E334bc0107BB33A9586D05c0
deploying "BridgeTokenUpgradeBeacon" (tx: 0x851a8131befed763e118286c80f0d799ffa05e286685bcbfa97c9543cccb6df8)...: deployed at 0x488e9658bae7d527FC3A9303074e5AE05934C772 with 168935 gas
deploying "BridgeTokenUpgradeBeaconProxy" (tx: 0xceb87476d430fe9be3f3c9299c982aa91918ca3017e69305b5d51f8daeb0e866)...: deployed at 0x058f7CeFf4a998E5ce3CE7a8e913e32e9fA52601 with 229159 gas
Deploying TokenRegistry with upgradeable scheme
deploying "TokenRegistry" (tx: 0x166bc7e2bc6e57e88532e25ac922454066fb3580e003bcd70762dc17dbe5e68a)...: deployed at 0x059e17cEb15EF8470B7184B858D356317518aAB3 with 1580971 gas
deployed implementation: 0x059e17cEb15EF8470B7184B858D356317518aAB3
deploying "TokenRegistryUpgradeBeacon" (tx: 0xa29433552c0546026ecfa3bcf5d1ef57661fa0659f87bf087fa2807c352429aa)...: deployed at 0xD95B1DbEc167C6cf547d018dDEcF41a4cb2e2f73 with 168935 gas
deploying "TokenRegistryUpgradeBeaconProxy" (tx: 0x1b4c0e3b633a7749cdc94bc0288782a7ab0a82bbbb4bdeeab61e1603a50536ce)...: deployed at 0x2445BC665aEfca58D2137BAf26A62Edb38cBC274 with 257793 gas
Deploying PromiseRouter
Deploying PromiseRouter with upgradeable scheme
deploying "PromiseRouter" (tx: 0xe6f968d78b9ab452d23ee058b309981729ca803a1e826bceebdca9d2fd6100c6)...: deployed at 0xe134EeE40A4A313a413E9B1DA94Bb5D01B79F433 with 2156978 gas
deployed implementation: 0xe134EeE40A4A313a413E9B1DA94Bb5D01B79F433
deploying "PromiseRouterUpgradeBeacon" (tx: 0x1e4ee5f49b5d24aee11490387ac8fe26e999b6fd2069761e1f81c233defbbff6)...: deployed at 0x9eFec315E368e8812025B85b399a69513Cd0e716 with 168935 gas
deploying "PromiseRouterUpgradeBeaconProxy" (tx: 0x1f2afa8ea9d1502438b5209fc36f03a6b755d96426a7fd774e3f9d8418662f7d)...: deployed at 0xbbE595Df857805ab3734f15BE990f9A30CBB89F3 with 279312 gas
PromiseRouter deployed to 0xbbE595Df857805ab3734f15BE990f9A30CBB89F3
PromiseRouter owner set to 0x627306090abaB3A6e1400e9345bC60c78a8BEf57
allowlisting router on connector: 0xCB152A2Aa90055a0D255cA7dbaeb85eDFdc86096
allowlist tx: 0x487630a1500e13f2bb883cc3e5e07c0415270b9e10284074222936523ea5646f
allowlist tx mined
Deploying RelayerFeeRouter
Deploying RelayerFeeRouter with upgradeable scheme
deploying "RelayerFeeRouter" (tx: 0xd49394c408edcc5dcf64ba9729753419f16d636b17a6cd4dfb5106db9981f64c)...: deployed at 0xA509542aDa3196a38bD6fD03b253547EE09220C4 with 1528032 gas
deployed implementation: 0xA509542aDa3196a38bD6fD03b253547EE09220C4
deploying "RelayerFeeRouterUpgradeBeacon" (tx: 0x90a293784141e3530b8fd6a488b463d4d1ecc9e7759b0e6deeec38ccf241a659)...: deployed at 0xA4516018d6B0313A03a69130356f23a168C0AB10 with 168935 gas
deploying "RelayerFeeRouterUpgradeBeaconProxy" (tx: 0x8d839f0fe1bf6c38e372693d1624d7ab4863c898d1baab11d66478fdcc526b8a)...: deployed at 0x27032850077AbEf46Fc9c2b39b96885b40ABc3Ec with 235016 gas
RelayerFeeRouter deployed to 0x27032850077AbEf46Fc9c2b39b96885b40ABc3Ec
RelayerFeeRouter owner set to 0x627306090abaB3A6e1400e9345bC60c78a8BEf57
allowlisting router on connector: 0xCB152A2Aa90055a0D255cA7dbaeb85eDFdc86096
allowlist tx: 0xbcc9a4425736a6e38524d4cd6526f5acbbf0eb5067232c1fa9fb996ec25e4605
allowlist tx mined
Deploying BridgeRouter
Deploying BridgeRouter with upgradeable scheme
deploying "BridgeRouter" (tx: 0x7b4f5eea907d4fb91e6511bd8003108f9f155e4d4d08b5ffab21f66e6101dac2)...: deployed at 0xABa7902442c5739c6f0c182691d48D63d06A212E with 2824942 gas
deployed implementation: 0xABa7902442c5739c6f0c182691d48D63d06A212E
deploying "BridgeRouterUpgradeBeacon" (tx: 0xb69cd71dd00c04048a933b825c3488d893ec44ae54fbb14e3ac2696a866b6290)...: deployed at 0x8C7EF141E529C5263E2a45581d1c8a39F64Dc5dF with 168935 gas
deploying "BridgeRouterUpgradeBeaconProxy" (tx: 0xb636e6c0e633eab87ceeef82015658ac1d0416d9846c1fbae0bae27a6e56462b)...: deployed at 0x5034F49b27353CeDc562b49eA91C7438Ea351d36 with 257832 gas
BridgeRouter deployed to 0x5034F49b27353CeDc562b49eA91C7438Ea351d36
BridgeRouter owner set to 0x627306090abaB3A6e1400e9345bC60c78a8BEf57
allowlisting router on connector: 0xCB152A2Aa90055a0D255cA7dbaeb85eDFdc86096
allowlist tx: 0x4c40bb9bcee9ea82c2712bf01b204f9a55692b802fe52e77d1edea3559bff69e
allowlist tx mined

============================= Deploying Connext Contracts ===============================
deployer:  0x627306090abaB3A6e1400e9345bC60c78a8BEf57
network:  { chainId: 1337, name: 'unknown' }
domain:  4919
price:  1000000007
balance:  9999927009879209922230
Fetching token registry...
deploying "LPToken" (tx: 0xde649fb1dfe7492a7dcec856e5549247930c749f5850ce0a94b2f51864829d4c)...: deployed at 0xe4e47451AAd6C89a6D9E4aD104A7b77FfE1D3b36 with 1090094 gas
executing LPToken.initialize (tx: 0xf9c0cc0893d08df0cafe80f7c2c2ae7704912b9ebed32a0ad02145e71e829cd0) ...: performed with 115426 gas
Deploying connext diamond...
reusing "AssetFacet" at 0x23Ab702Ed46791D238A9d11Cfe368E8F0a541234
reusing "BridgeFacet" at 0x2F39B716d18474eA218Ad7f1d4ddE2103bB2c99C
reusing "Facet" at 0xc027Fd6ac29F04Ef34EB25D0E7f2deADf88c96D9
reusing "ProposedOwnableFacet" at 0x2B7558c3aDA198535fd938BCa496EC83987B4F74
reusing "RelayerFacet" at 0x16Ba9A171262A08cdfF3D5C99F5ABfbf6AAF0962
reusing "RoutersFacet" at 0x3c1ec29fD6d7062FF334E9A94F45fba340C21434
reusing "StableSwapFacet" at 0x9614Aed3c7aaA4D8a4783cA4e9D9Ac88A01FD88B
reusing "SwapAdminFacet" at 0x23fd97F04DaF8e6C2DE8F8722941e7B8D6693aB1
reusing "VersionFacet" at 0xddD7224602912aEb025504cC9849c481373c062B
reusing "DiamondCutFacet" at 0x6A673aec7c6b82aD0A72726d4CA7e48d19cAA5df
reusing "_DefaultDiamondLoupeFacet" at 0x3Bcf4185443A339517aD4e580067f178d1B68E1D
reusing "DiamondInit" at 0x0BDD7Ee32C2D60Ff2ab38a11339Df4c3Cc72F5e9
reusing "_DefaultDiamondERC165Init" at 0xe68d85348f227d2ebEE814C38918F8A2D7d9B603
deploying "ConnextHandler_DiamondProxy" (tx: 0xd8772f3ca1b70ccd75fca644dfa7f4af2c0b9883105d1e8f0b78b3c99244681c)...: deployed at 0x51FC52Fd0B30fA0319D97893dEFE0201fEd39C4c with 6855955 gas
connextAddress:  0x51FC52Fd0B30fA0319D97893dEFE0201fEd39C4c
setting connext on relayer fee router
setting connext on promiseRouter router
Deploying multicall...
deploying "Multicall" (tx: 0xfc5eb06d76a9014f730d6000c84a9bbeec9ecbc6223385f6b64c21180b0f9a14)...: deployed at 0x057D2360aBbe75F9fdF142f2CfE68cFC9a74EC12 with 313581 gas
Deploying test token on non-mainnet chain...
deploying "TestERC20" (tx: 0x229eeddec7c38e898ea9af22727afc7404096c7bc6b0c337f79746ed9af006bd)...: deployed at 0xF426505ac145abE033fE77C666840063757Be9cd with 801969 gas
TestERC20:  0xF426505ac145abE033fE77C666840063757Be9cd
deploying "TestWETH" (tx: 0x9fe4de130c2369912e109e8bf0cc70de339b1a78f1e146a1c4b05e7f89df3ef2)...: deployed at 0x9d075ae44D859191C121d7522da0Cc3B104b8837 with 802077 gas
TestERC20:  0x9d075ae44D859191C121d7522da0Cc3B104b8837

============================= Deploying StableSwap ===============================
deployer:  0x627306090abaB3A6e1400e9345bC60c78a8BEf57
reusing "LPToken" at 0xe4e47451AAd6C89a6D9E4aD104A7b77FfE1D3b36
deploying "SwapUtilsExternal" (tx: 0xeb29ea2c6767c44c2eaf7c184f12e74d478a0fe0e90e74218e54f7cd2d7db4a3)...: deployed at 0xd8672a4A1bf37D36beF74E36edb4f17845E76F4e with 4249818 gas
deploying "StableSwap" (tx: 0xcb7181ab1b65183849b773f43eab8a071a8c5a2b0dcced98846a6b4f09671a07)...: deployed at 0x51815CEbeF59b88DAfD1a5f24095eee1236ffCDd with 2573925 gas
```

### 1338

```
============================= Mainnet Fork: Testbed Setup ===============================
Retrieved AMB info.
Set code for 0x4200000000000000000000000000000000000007
Set storage: 0x3 0x000000000000000000000000000000000000000000000000000000000001aa33
Set storage: 0x4 0x000000000000000000000000000000000000000000000000000000000000dead
Set storage: 0x5 0x00000000000000000000000025ace71c97b33cc4729cf772ae268934f7ab5fa1
Enabling automine...
Automine enabled.

============================= Deploying Messaging Contracts ===============================
deployer:  0x627306090abaB3A6e1400e9345bC60c78a8BEf57
Network:  local 1338
Deploying spoke messaging contracts...
Deploying OptimismL2Connector...
using config {
  prefix: 'Optimism',
  ambs: {
    hub: '0x25ace71c97B33Cc4729CF772ae268934F7ab5fA1',
    spoke: '0x4200000000000000000000000000000000000007'
  },
  processGas: BigNumber { _hex: '0x0cf850', _isBigNumber: true },
  reserveGas: BigNumber { _hex: '0x3a98', _isBigNumber: true }
}
constructorArgs: [
  '4920',
  '4919',
  '0x4200000000000000000000000000000000000007',
  '0x4EeE4559BD589b1cdFc419f0EEd2Ff9cBD47F439',
  '0x0000000000000000000000000000000000000000',
  '850000',
  '850000',
  '15000'
]
deploying "OptimismL2Connector" (tx: 0x9899918eeede239f2585fd783698907923f4a663b35a8eb4db9645b32171b330)...: deployed at 0x8065F4c7b8c2bf53561af92D9DA2Ea022A0b28Ca with 2374182 gas
OptimismL2Connector deployed to 0x8065F4c7b8c2bf53561af92D9DA2Ea022A0b28Ca

============================= Deploying Routers ===============================
deployer:  0x627306090abaB3A6e1400e9345bC60c78a8BEf57
using connector: OptimismL2Connector
deploying "UpgradeBeaconController" (tx: 0x66e2641491c936835ef5d619a51b219287da3febbcb8393c51c1e9be405775ad)...: deployed at 0x4a5cd58b24e3BF04360B06bFEaF45A39aA8035b6 with 307506 gas
Deploying BridgeToken with  upgradeable scheme
deploying "BridgeToken" (tx: 0x30381e0752779841780841292163a3775aff467d2203571703a7a8a756dd0b3b)...: deployed at 0x4EeE4559BD589b1cdFc419f0EEd2Ff9cBD47F439 with 1411024 gas
deployed implementation: 0x4EeE4559BD589b1cdFc419f0EEd2Ff9cBD47F439
deploying "BridgeTokenUpgradeBeacon" (tx: 0x36f270b61f668c716d430eb7cfcda8b73f572870e2da9b654a188c0d59b3a619)...: deployed at 0xCB152A2Aa90055a0D255cA7dbaeb85eDFdc86096 with 168935 gas
deploying "BridgeTokenUpgradeBeaconProxy" (tx: 0xe8bf7c682c4314b8fec37a0c08bd12c0eac5d2aea636068f1e58b5b9ebcbf849)...: deployed at 0x23e84570f7b28aD0d5E5545d398009194a8734f3 with 229147 gas
Deploying TokenRegistry with  upgradeable scheme
deploying "TokenRegistry" (tx: 0x509a53829697bf2dfa2f0b666c2be44b8da6d3438dcbdccb5dc49ef8f893e29f)...: deployed at 0x75076e4fbba61f65efB41D64e45cFF340b1e518A with 1580971 gas
deployed implementation: 0x75076e4fbba61f65efB41D64e45cFF340b1e518A
deploying "TokenRegistryUpgradeBeacon" (tx: 0x56ef1ac6d3eb6077d3460b1d4df551c81f4985245a32fc11896ac7842b7e9426)...: deployed at 0x8cD918cee8f93989E334bc0107BB33A9586D05c0 with 168935 gas
deploying "TokenRegistryUpgradeBeaconProxy" (tx: 0x234a33aa7ed451b8d27b8a688a407dd3a858ece828a991771a981c0a1abc12c1)...: deployed at 0x488e9658bae7d527FC3A9303074e5AE05934C772 with 257805 gas
Deploying PromiseRouter
Deploying PromiseRouter with  upgradeable scheme
deploying "PromiseRouter" (tx: 0xe460ace29fd581b5bab16406b2ee4930d0895c0070ce5b042f3874ff4f1d60a0)...: deployed at 0x058f7CeFf4a998E5ce3CE7a8e913e32e9fA52601 with 2156978 gas
deployed implementation: 0x058f7CeFf4a998E5ce3CE7a8e913e32e9fA52601
deploying "PromiseRouterUpgradeBeacon" (tx: 0x6f2a8962a71b7164453e34ed32c35f0c700a3bb287d92ff51b0a635cfe1d2e10)...: deployed at 0x059e17cEb15EF8470B7184B858D356317518aAB3 with 168935 gas
deploying "PromiseRouterUpgradeBeaconProxy" (tx: 0xea0e3d5ef569bb2b05526688d72de1e1a5c3a69863fcb35cd7ab9a5e07c6eb5e)...: deployed at 0xD95B1DbEc167C6cf547d018dDEcF41a4cb2e2f73 with 279324 gas
PromiseRouter deployed to 0xD95B1DbEc167C6cf547d018dDEcF41a4cb2e2f73
PromiseRouter owner set to 0x627306090abaB3A6e1400e9345bC60c78a8BEf57
allowlisting router on connector: 0x8065F4c7b8c2bf53561af92D9DA2Ea022A0b28Ca
allowlist tx: 0x97601ff844cd37217c42e7bda3cb361c8edb0d42cd1257d90255015af98dc768
allowlist tx mined
Deploying RelayerFeeRouter
Deploying RelayerFeeRouter with  upgradeable scheme
deploying "RelayerFeeRouter" (tx: 0xd7fae2e280210cdafff14dc962c3890307fa9b33a14a8ce57b1f738d27d91679)...: deployed at 0xe134EeE40A4A313a413E9B1DA94Bb5D01B79F433 with 1528032 gas
deployed implementation: 0xe134EeE40A4A313a413E9B1DA94Bb5D01B79F433
deploying "RelayerFeeRouterUpgradeBeacon" (tx: 0x36d146966384d1857862d076eecc6911a4f4d2d9a925747bf13f99f3caaee7ca)...: deployed at 0x9eFec315E368e8812025B85b399a69513Cd0e716 with 168935 gas
deploying "RelayerFeeRouterUpgradeBeaconProxy" (tx: 0x2eb5994a8035d91ef5658d32509b4adcbb982b3f8d1f5836894fb4cce82805cc)...: deployed at 0xbbE595Df857805ab3734f15BE990f9A30CBB89F3 with 235028 gas
RelayerFeeRouter deployed to 0xbbE595Df857805ab3734f15BE990f9A30CBB89F3
RelayerFeeRouter owner set to 0x627306090abaB3A6e1400e9345bC60c78a8BEf57
allowlisting router on connector: 0x8065F4c7b8c2bf53561af92D9DA2Ea022A0b28Ca
allowlist tx: 0xc3d45fc5a7a12d1c628399f5ceb3b21a62e04f9625d8dd49c58393e68bf70be0
allowlist tx mined
Deploying BridgeRouter
Deploying BridgeRouter with  upgradeable scheme
deploying "BridgeRouter" (tx: 0x79d5aac8e7e07a8d8fa1ec9f804cdddfd505f9a5c2d36a92d26c393cc8880a33)...: deployed at 0xA509542aDa3196a38bD6fD03b253547EE09220C4 with 2824942 gas
deployed implementation: 0xA509542aDa3196a38bD6fD03b253547EE09220C4
deploying "BridgeRouterUpgradeBeacon" (tx: 0xeb9455a2e0386e1b42539ed95076c51a8658c74381f86c554aaa831aa436f18d)...: deployed at 0xA4516018d6B0313A03a69130356f23a168C0AB10 with 168935 gas
deploying "BridgeRouterUpgradeBeaconProxy" (tx: 0xb7ac115763f20175085b0535507d3c642cd64543c9cf21cb9e11cfff1dd03409)...: deployed at 0x27032850077AbEf46Fc9c2b39b96885b40ABc3Ec with 257844 gas
BridgeRouter deployed to 0x27032850077AbEf46Fc9c2b39b96885b40ABc3Ec
BridgeRouter owner set to 0x627306090abaB3A6e1400e9345bC60c78a8BEf57
allowlisting router on connector: 0x8065F4c7b8c2bf53561af92D9DA2Ea022A0b28Ca
allowlist tx: 0xc9af32451a4b5dbb9a164d74c9962ea2a6892c645e5586cbd8cffc2afdc3208a
allowlist tx mined

============================= Deploying Connext Contracts ===============================
deployer:  0x627306090abaB3A6e1400e9345bC60c78a8BEf57
network:  { chainId: 1338, name: 'unknown' }
domain:  4920
price:  1000000007
balance:  9999927918999558743170
Fetching token registry...
deploying "LPToken" (tx: 0x11f80849ce7bb6254723869f75ea6a4b6e8261a827177b290fbd63a791a1cbcf)...: deployed at 0xABa7902442c5739c6f0c182691d48D63d06A212E with 1090094 gas
executing LPToken.initialize (tx: 0xe292f1b2a8e65798674783092a35e6b6594955e02e7d047ddc5a086000a816a9) ...: performed with 115426 gas
Deploying connext diamond...
reusing "AssetFacet" at 0x23Ab702Ed46791D238A9d11Cfe368E8F0a541234
reusing "BridgeFacet" at 0x2F39B716d18474eA218Ad7f1d4ddE2103bB2c99C
reusing "Facet" at 0xc027Fd6ac29F04Ef34EB25D0E7f2deADf88c96D9
reusing "ProposedOwnableFacet" at 0x2B7558c3aDA198535fd938BCa496EC83987B4F74
reusing "RelayerFacet" at 0x16Ba9A171262A08cdfF3D5C99F5ABfbf6AAF0962
reusing "RoutersFacet" at 0x3c1ec29fD6d7062FF334E9A94F45fba340C21434
reusing "StableSwapFacet" at 0x9614Aed3c7aaA4D8a4783cA4e9D9Ac88A01FD88B
reusing "SwapAdminFacet" at 0x23fd97F04DaF8e6C2DE8F8722941e7B8D6693aB1
reusing "VersionFacet" at 0xddD7224602912aEb025504cC9849c481373c062B
reusing "DiamondCutFacet" at 0x6A673aec7c6b82aD0A72726d4CA7e48d19cAA5df
reusing "_DefaultDiamondLoupeFacet" at 0x3Bcf4185443A339517aD4e580067f178d1B68E1D
reusing "DiamondInit" at 0x0BDD7Ee32C2D60Ff2ab38a11339Df4c3Cc72F5e9
reusing "_DefaultDiamondERC165Init" at 0xe68d85348f227d2ebEE814C38918F8A2D7d9B603
deploying "ConnextHandler_DiamondProxy" (tx: 0xb5efa283052d9ea68708013491fd9da032f050b19d2d1c8200c9b050fb7ada7d)...: deployed at 0x5034F49b27353CeDc562b49eA91C7438Ea351d36 with 6855955 gas
connextAddress:  0x5034F49b27353CeDc562b49eA91C7438Ea351d36
setting connext on relayer fee router
setting connext on promiseRouter router
Deploying multicall...
deploying "Multicall" (tx: 0x0ff9e14ff627620b26975677512382e6430a6cfb78fad015b382082cb963feed)...: deployed at 0x3f6c622D32dA3BC70730C9E677ec343cb5acFe68 with 313581 gas
Deploying test token on non-mainnet chain...
deploying "TestERC20" (tx: 0xd63a005bcae40896abb3b2148ccc7b39ec871177cfbf2540c54f1e6a68ca5d83)...: deployed at 0x51FC52Fd0B30fA0319D97893dEFE0201fEd39C4c with 801969 gas
TestERC20:  0x51FC52Fd0B30fA0319D97893dEFE0201fEd39C4c
deploying "TestWETH" (tx: 0x3fdd8520808934769ccf46d5aa982873f2a154cbb0c4607009fca2817eefdfaa)...: deployed at 0x7153CCD1a20Bbb2f6dc89c1024de368326EC6b4F with 802077 gas
TestERC20:  0x7153CCD1a20Bbb2f6dc89c1024de368326EC6b4F

============================= Deploying StableSwap ===============================
deployer:  0x627306090abaB3A6e1400e9345bC60c78a8BEf57
reusing "LPToken" at 0xABa7902442c5739c6f0c182691d48D63d06A212E
deploying "SwapUtilsExternal" (tx: 0x822d357370bbbb637d4da10812c46fab0b29979d679c5d30616c2c95dab52679)...: deployed at 0x3ba7c2578B59e0e1CcfeE9A20D92F043C0e0b3e6 with 4249818 gas
deploying "StableSwap" (tx: 0x7f89371c71fbe52fe498f10c647585383ee4007591d85c4371165bef03862cdf)...: deployed at 0x057D2360aBbe75F9fdF142f2CfE68cFC9a74EC12 with 2573925 gas
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
