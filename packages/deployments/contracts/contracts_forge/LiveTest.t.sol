// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

import {TypeCasts} from "../contracts/shared/libraries/TypeCasts.sol";

import {TokenId} from "../contracts/core/connext/libraries/LibConnextStorage.sol";

import {IConnextHandler} from "../contracts/core/connext/interfaces/IConnextHandler.sol";
import {ITokenRegistry} from "../contracts/core/connext/interfaces/ITokenRegistry.sol";
import {IBridgeRouter} from "../contracts/core/connext/interfaces/IBridgeRouter.sol";

import "../contracts/core/connext/facets/BridgeFacet.sol";

import {LPToken} from "../contracts/core/connext/helpers/LPToken.sol";

import {PromiseRouter} from "../contracts/core/promise/PromiseRouter.sol";

import {RelayerFeeRouter} from "../contracts/core/relayer-fee/RelayerFeeRouter.sol";
import {RelayerFeeMessage} from "../contracts/core/relayer-fee/libraries/RelayerFeeMessage.sol";

import {TestERC20} from "../contracts/test/TestERC20.sol";
import {TokenRegistry} from "../contracts/test/TokenRegistry.sol";
import {BridgeMessage} from "../contracts/test/BridgeMessage.sol";
import {BridgeRouter} from "../contracts/test/BridgeRouter.sol";

import {WETH} from "./utils/TestWeth.sol";
import "./utils/ForgeHelper.sol";
import "./utils/Mock.sol";
import "./utils/Deployer.sol";

import "forge-std/console.sol";

contract LiveTest is ForgeHelper {
  IConnextHandler connext = IConnextHandler(0xB7CF5324641bD9F82903504c56c9DE2193B4822F);

  // ============ Test set up ============
  function setUp() public {}

  // you should be able to bump + claim relayer fees
  function test_execute() public {
    address[] memory routers = new address[](1);
    routers[0] = 0x71dD9fc6Fe5427F0c7cd7d42Bc89eFFe11C6d4B7;
    bytes[] memory routerSignatures = new bytes[](1);
    routerSignatures[
      0
    ] = hex"5917c2232316794f2ef3bbb4b922240af72ebc4720087f8285ab3b201b2fc17f12273707ab155bb5c4f15730a641cfc8f239a0bd5bddeb087a3777d5ab17af331b";

    bytes32 preImage = keccak256(
      abi.encode(0x07ef75eb13759ad6ae936f2bf20474f332cc78e72fe2dc951f4c742b11c23ba3, routers)
    );
    bytes32 toSign = ECDSA.toEthSignedMessageHash(preImage);
    emit log_named_address("signer: ", vm.addr(0x33f78d7a832d07cc041625f1e7b65208de9986cd8572e9c2b0f4cb8267ae3093));
    (uint8 v, bytes32 r, bytes32 _s) = vm.sign(
      0x33f78d7a832d07cc041625f1e7b65208de9986cd8572e9c2b0f4cb8267ae3093,
      toSign
    );
    emit log_bytes(abi.encodePacked(r, _s, v));

    vm.prank(0xaB0A8DCb1590C4565C35cC785dc25A0590398054);
    connext.execute(
      ExecuteArgs(
        CallParams(
          0x54BAA998771639628ffC0206c3b916c466b79c89, // to
          bytes(""), // callData
          1735353714, // origin domain
          1735356532, // dest domain
          0x5A9e792143bf2708b4765C144451dCa54f559a19, // agent
          0x5A9e792143bf2708b4765C144451dCa54f559a19, // recovery
          false, // forceSlow
          false, // receiveLocal
          address(0), // callback
          0, // callbackFee
          0, // relayerFee
          0 ether // destinationMinOut
        ), // CallParams
        0xf21Ad79d25d3E2eCAEe99e09c237EfDD83fdAfEB, // local asset
        routers, // routers
        routerSignatures, // router signatures
        0xAFCBcdF90776bCFBcB334a6908fdEDa02A75B983, // sequencer
        hex"dc0f344e003d949df43b67f660aedbf0aa884ef7ec558000a4ba2f0c5853022f4349ae081c87234cfc1ea057c7caaae5c9f1c445277110d57ea3a6fc14d78a171c", // sequencer signatures
        150000000000000000, // amount
        2, // nonce
        0x54BAA998771639628ffC0206c3b916c466b79c89 // originSender
      )
    );
  }

  function test_xcall() public {
    address transactingAsset = 0x68Db1c8d85C09d546097C65ec7DCBFF4D6497CbF;
    vm.startPrank(0x54BAA998771639628ffC0206c3b916c466b79c89);
    TestERC20(transactingAsset).approve(address(connext), 150000000000000000);

    emit log_named_address("bridge router: ", address(connext.bridgeRouter()));
    emit log_named_address("token registry: ", address(connext.tokenRegistry()));
    emit log_named_bytes32("canonical id: ", connext.adoptedToCanonical(transactingAsset).id);

    (uint32 canonicalDomain, bytes32 canonicalId) = connext.tokenRegistry().getTokenId(transactingAsset);
    address local = connext.tokenRegistry().getLocalAddress(canonicalDomain, canonicalId);
    emit log_named_address("local asset: ", local);
    emit log_named_uint(
      "tokenRegistry.isLocalOrigin(_token)",
      uint256(connext.tokenRegistry().isLocalOrigin(local) ? 1 : 0)
    );

    connext.xcall(
      XCallArgs(
        CallParams(
          0x54BAA998771639628ffC0206c3b916c466b79c89, // to
          bytes(""), // callData
          1735356532, // origin domain
          1735353714, // dest domain
          0x5A9e792143bf2708b4765C144451dCa54f559a19, // agent
          0x5A9e792143bf2708b4765C144451dCa54f559a19, // recovery
          false, // forceSlow
          false, // receiveLocal
          address(0), // callback
          0, // callbackFee
          0, // relayerFee
          0 // destinationMinOut
        ), // CallParams
        transactingAsset,
        150000000000000000,
        0
      )
    );

    vm.stopPrank();
  }

  function test_xcall_native_asset_zero_amount() public {
    vm.startPrank(0x54BAA998771639628ffC0206c3b916c466b79c89);

    emit log_named_address("bridge router: ", address(connext.bridgeRouter()));
    emit log_named_address("token registry: ", address(connext.tokenRegistry()));

    (uint32 canonicalDomain, bytes32 canonicalId) = connext.tokenRegistry().getTokenId(NATIVE_ASSET);
    address local = connext.tokenRegistry().getLocalAddress(canonicalDomain, canonicalId);
    emit log_named_address("local asset: ", local);
    emit log_named_uint(
      "tokenRegistry.isLocalOrigin(_token)",
      uint256(connext.tokenRegistry().isLocalOrigin(local) ? 1 : 0)
    );

    connext.xcall(
      XCallArgs(
        CallParams(
          0x54BAA998771639628ffC0206c3b916c466b79c89, // to
          bytes(""), // callData
          1735356532, // origin domain
          1735353714, // dest domain
          0x5A9e792143bf2708b4765C144451dCa54f559a19, // agent
          0x5A9e792143bf2708b4765C144451dCa54f559a19, // recovery
          false, // forceSlow
          false, // receiveLocal
          address(0), // callback
          0, // callbackFee
          0, // relayerFee
          0 // destinationMinOut
        ), // CallParams
        NATIVE_ASSET,
        0,
        0
      )
    );

    vm.stopPrank();
  }
}
