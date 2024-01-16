// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {BaseTaiko} from "../../../../../contracts/messaging/connectors/taiko/BaseTaiko.sol";
import {Connector} from "../../../../../contracts/messaging/connectors/Connector.sol";
import {ConnectorHelper} from "../../../../utils/ConnectorHelper.sol";
import {IBridge} from "../../../../../contracts/messaging/interfaces/ambs/taiko/IBridge.sol";

/**
 * @dev For test contract to access internal functions of `BaseTaiko`
 */
contract BaseTaikoForTest is BaseTaiko {
  constructor(
    address _taikoBridge,
    uint256 _mirrorChainId,
    uint256 _gasCap
  ) BaseTaiko(_taikoBridge, _mirrorChainId, _gasCap) {}

  function forTest_sendMessage(bytes memory _data, address _mirrorConnector) external {
    _sendMessage(_data, _mirrorConnector);
  }
}

/**
 * @dev Base contract for the `BaseTaiko` unit tests contracts to inherit from
 */
contract Base is ConnectorHelper {
  uint256 internal constant MIRROR_CHAIN_ID = 10;
  address public user = makeAddr("user");
  address public mirrorConnector = makeAddr("mirrorConnector");
  address public taikoBridge = makeAddr("taikoBridge");
  BaseTaikoForTest public baseTaiko;

  /**
   * @notice Deploys a new `BaseTaikoForTest` contract instance
   */
  function setUp() public {
    baseTaiko = new BaseTaikoForTest(taikoBridge, MIRROR_CHAIN_ID, _gasCap);
  }
}

contract Unit_Connector_BaseTaiko_Constructor is Base {
  /**
   * @notice Tests the values of the constructor arguments
   */
  function test_checkConstructorArgs() public {
    assertEq(address(baseTaiko.BRIDGE()), taikoBridge);
    assertEq(baseTaiko.MIRROR_CHAIN_ID(), MIRROR_CHAIN_ID);
    assertEq(baseTaiko.gasCap(), _gasCap);
  }
}

contract Unit_Connector_BaseTaiko_sendMessage is Base {
  /**
   * @notice Tests that Taiko Bridge's `sendMessage()` is called with the expected message
   * @param _root The root to be sent
   */
  function test_callSendMessage(bytes32 _root) public {
    // Declare the calldata of the `processMessage` function with the root as argument
    bytes memory _calldata = abi.encodeWithSelector(Connector.processMessage.selector, abi.encode(_root));
    // Declare the expected message
    IBridge.Message memory _expectedMsg = IBridge.Message({
      id: 0,
      from: address(baseTaiko),
      srcChainId: block.chainid,
      destChainId: MIRROR_CHAIN_ID,
      user: user,
      to: mirrorConnector,
      refundTo: mirrorConnector,
      value: 0,
      fee: 0,
      gasLimit: _gasCap,
      data: _calldata,
      memo: ""
    });

    // Expect `sendMessage` function to be called
    _mockAndExpect(
      taikoBridge,
      abi.encodeWithSelector(IBridge.sendMessage.selector, _expectedMsg),
      abi.encode(keccak256(abi.encode(_expectedMsg)))
    );

    // Call `sendMessage` function
    vm.prank(user);
    bytes memory _data = abi.encode(_root);
    baseTaiko.forTest_sendMessage(_data, mirrorConnector);
  }
}
