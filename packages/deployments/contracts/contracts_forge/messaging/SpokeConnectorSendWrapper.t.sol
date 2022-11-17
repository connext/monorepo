// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {SpokeConnectorSendWrapper} from "../../contracts/messaging/SpokeConnectorSendWrapper.sol";
import {SpokeConnector} from "../../contracts/messaging/connectors/SpokeConnector.sol";

import "../utils/ConnectorHelper.sol";

contract SpokeConnectorSendWrapperTest is ForgeHelper {
  // ============ Errors ============
  error ProposedOwnable__onlyOwner_notOwner();

  // ============ Events ============
  event FundsReceived(uint256 amount, uint256 balance);

  event FundsDeducted(uint256 amount, uint256 balance);

  event SpokeConnectorChanged(address spokeConnector, address oldSpokeConnector);

  // ============ Storage ============
  SpokeConnectorSendWrapper spokeConnectorSendWrapper;

  address payable spokeConnector = payable(address(2));

  function setUp() public {
    vm.expectEmit(true, true, true, true);
    emit SpokeConnectorChanged(spokeConnector, address(0));
    spokeConnectorSendWrapper = new SpokeConnectorSendWrapper(spokeConnector);

    vm.expectEmit(true, true, true, true);
    emit FundsReceived(0.1 ether, 0.1 ether);

    address alice = address(1);
    vm.deal(alice, 1 ether);
    vm.prank(alice);
    payable(address(spokeConnectorSendWrapper)).transfer(0.1 ether);
  }

  // ============ SpokeConnectorSendWrapper.setSpokeConnector ============
  function test_SpokeConnectorSendWrapper__setSpokeConnector_shouldFailIfNotOwner(address caller) public {
    address owner = spokeConnectorSendWrapper.owner();
    if (caller == owner) {
      return;
    }

    vm.expectRevert(ProposedOwnable__onlyOwner_notOwner.selector);
    vm.prank(caller);
    spokeConnectorSendWrapper.setSpokeConnector(address(42));
  }

  function test_SpokeConnectorSendWrapper__setSpokeConnector_shouldWork() public {
    vm.expectEmit(true, true, true, true);
    emit SpokeConnectorChanged(address(42), spokeConnector);

    address owner = spokeConnectorSendWrapper.owner();
    vm.prank(owner);
    spokeConnectorSendWrapper.setSpokeConnector(address(42));
  }

  // ============ SpokeConnectorSendWrapper.withdraw ============
  function test_SpokeConnectorSendWrapper__withdraw_shouldFailIfNotOwner(address caller) public {
    address owner = spokeConnectorSendWrapper.owner();
    if (caller == owner) {
      return;
    }

    vm.expectRevert(ProposedOwnable__onlyOwner_notOwner.selector);
    vm.prank(caller);
    spokeConnectorSendWrapper.withdraw();
  }

  function test_SpokeConnectorSendWrapper__withdraw_shouldWork() public {
    vm.expectEmit(true, true, true, true);
    emit FundsDeducted(0.1 ether, 0);

    address owner = spokeConnectorSendWrapper.owner();
    vm.prank(owner);
    spokeConnectorSendWrapper.withdraw();
  }

  // ============ SpokeConnectorSendWrapper.fallback ============
  function test_SpokeConnectorSendWrapper__send_shouldWork() public {
    uint256 _fee = 0.04 ether;
    bytes memory _encodedData = abi.encode("hello");

    vm.expectEmit(true, true, true, true);
    emit FundsDeducted(0.09 ether, 0.1 ether);

    emit log_named_address("spokeConnector", address(spokeConnectorSendWrapper.spokeConnector()));

    vm.mockCall(
      address(spokeConnector),
      abi.encodeWithSelector(SpokeConnector(spokeConnector).send.selector),
      abi.encode()
    );

    vm.expectCall(
      address(spokeConnector),
      0.09 ether,
      abi.encodeWithSelector(SpokeConnector(spokeConnector).send.selector)
    );

    spokeConnectorSendWrapper.send(_encodedData, _fee);
  }

  receive() external payable {}
}
