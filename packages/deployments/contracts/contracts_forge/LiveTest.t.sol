// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

import {XAppConnectionManager} from "../contracts/nomad-core/contracts/XAppConnectionManager.sol";
import {TypeCasts} from "../contracts/nomad-core/libs/TypeCasts.sol";

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
    ] = hex"23df9704e97a28dad53c29b18bae2f0075a1bfa3e2df0312a9da8f6ab662e2fe23dfaed78a5b6c52791cdfa663e2b20d80007704345a026533ab3ef184826ed91b";

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
        0x68Db1c8d85C09d546097C65ec7DCBFF4D6497CbF, // local asset
        routers, // routers
        routerSignatures, // router signatures
        0xAFCBcdF90776bCFBcB334a6908fdEDa02A75B983, // sequencer
        hex"7dce20e40050a52b12d6b1a71d919d4e94c9aac22bd894b733b3e3edf363c14e0b6a886d597d42cb3c36ccf8f4fb15d9efbbd1ee2c7d6e1470ea3b244578c7eb1c", // sequencer signatures
        150000000000000000, // amount
        0, // nonce
        0x54BAA998771639628ffC0206c3b916c466b79c89 // originSender
      )
    );
  }

  function test_xcall() public {
    vm.prank(0x54BAA998771639628ffC0206c3b916c466b79c89);
    TestERC20(0x68Db1c8d85C09d546097C65ec7DCBFF4D6497CbF).approve(address(connext), 150000000000000000);
    vm.prank(0x54BAA998771639628ffC0206c3b916c466b79c89);
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
        0x68Db1c8d85C09d546097C65ec7DCBFF4D6497CbF,
        150000000000000000,
        0
      )
    );
  }
}
