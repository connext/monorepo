// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import "@openzeppelin/contracts/crosschain/errors.sol";

import {IRootManager} from "../../../../contracts/messaging/interfaces/IRootManager.sol";

import {IZkSync} from "../../../../contracts/messaging/interfaces/ambs/zksync/IZkSync.sol";
import {ZkSyncHubConnector} from "../../../../contracts/messaging/connectors/zksync/ZkSyncHubConnector.sol";

import "../../../utils/ConnectorHelper.sol";
import "../../../utils/Mock.sol";

contract ZkSyncHubConnectorTest is ConnectorHelper {
  function setUp() public {
    _l2Connector = payable(address(123));
    // deploy
    _l1Connector = payable(
      address(new ZkSyncHubConnector(_l1Domain, _l2Domain, _amb, _rootManager, address(0), 1 ether))
    );
  }

  // ============ Utils ============
  function utils_setHubConnectorProcessMocks() public {
    // 3. call to root manager
    vm.mockCall(_rootManager, abi.encodeWithSelector(IRootManager.aggregate.selector), abi.encode(true));
  }

  // ============ ZkSyncHubConnector.sendMessage ============
  function test_ZkSyncHubConnector__sendMessage_works() public {
    ZkSyncHubConnector(_l1Connector).setMirrorConnector(_l2Connector);
    uint256 fee = 1 ether;
    vm.deal(_rootManager, 1000 ether);

    // setup mocks
    vm.mockCall(_amb, abi.encodeWithSelector(IZkSync.l2TransactionBaseCost.selector), abi.encode(123));
    vm.mockCall(_amb, abi.encodeWithSelector(IZkSync.requestL2Transaction.selector), abi.encode(bytes32(bytes(""))));

    // data
    bytes memory _data = abi.encode(123123123);

    // encoded
    uint256 l2GasLimit = uint256(1231234564564);
    uint256 l2GasPerByte = uint256(123124564);
    address refund = address(32);
    bytes memory _encoded = abi.encode(l2GasLimit, l2GasPerByte, refund);

    // should emit an event
    vm.expectEmit(true, true, true, true);
    emit MessageSent(_data, _encoded, _rootManager);

    // should call send contract transaction
    vm.expectCall(_amb, abi.encodeWithSelector(IZkSync.l2TransactionBaseCost.selector));
    vm.expectCall(
      _amb,
      abi.encodeWithSelector(
        IZkSync.requestL2Transaction.selector,
        _l2Connector,
        0,
        abi.encodeWithSelector(Connector.processMessage.selector, _data),
        l2GasLimit,
        l2GasPerByte,
        new bytes[](0),
        refund
      )
    );

    vm.prank(_rootManager);
    ZkSyncHubConnector(_l1Connector).sendMessage{value: fee}(_data, _encoded);
  }

  // ============ ZkSyncHubConnector.processMessage ============
}
