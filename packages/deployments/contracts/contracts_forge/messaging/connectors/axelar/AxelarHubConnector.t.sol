// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {AxelarHubConnector} from "../../../../contracts/messaging/connectors/axelar/AxelarHubConnector.sol";
import {AxelarExecutable, IAxelarGateway, IAxelarGasService, StringToAddress, AddressToString} from "../../../../contracts/messaging/connectors/axelar/BaseAxelar.sol";

import {MerkleTreeManager} from "../../../../contracts/messaging/MerkleTreeManager.sol";

import "../../../utils/ConnectorHelper.sol";
import "../../../utils/Mock.sol";

contract AxelarHubConnectorTest is ConnectorHelper {
  using stdStorage for StdStorage;
  using StringToAddress for string;
  using AddressToString for address;
  using AddressToString for address payable;

  // ============ Storage ============
  string public BNB_CHAIN_ID = "binance";
  string public MAINNET_CHAIN_ID = "Ethereum";

  address _gasReceiver = address(bytes20(keccak256("_gasReceiver")));

  // ============ Test set up ============
  function setUp() public {
    // Allow future contract mock
    vm.etch(_amb, new bytes(0x42));
    vm.etch(_rootManager, new bytes(0x42));

    // Get the n+1 deployment address
    _l2Connector = payable(address(123123123123));

    bytes memory axelarParams = abi.encode(_gasReceiver, BNB_CHAIN_ID);

    // Deploy
    vm.prank(_owner);
    _l1Connector = payable(
      address(new AxelarHubConnector(_l2Domain, _l1Domain, _amb, _rootManager, _l2Connector, axelarParams))
    );
    assertEq(_owner, AxelarHubConnector(_l1Connector).owner());
  }

  // ============ Utils ============

  // ============ sendMessage ============

  // Happy path L1
  function test_AxelarHubConnector_sendMessage_sendMessageAndEmitEvent(bytes memory _data) public {
    vm.assume(_data.length == 32);

    string memory mirrorConnectorStr = _l2Connector.toString();

    // Mock the call to fees
    vm.mockCall(
      _gasReceiver,
      abi.encodeCall(
        IAxelarGasService.payNativeGasForContractCall,
        (_l1Connector, BNB_CHAIN_ID, mirrorConnectorStr, _data, _owner)
      ),
      abi.encode()
    );

    // Mock the call to callContract
    vm.mockCall(
      _amb,
      abi.encodeCall(IAxelarGateway.callContract, (BNB_CHAIN_ID, mirrorConnectorStr, _data)),
      abi.encode()
    );

    // Check: call to fees?
    vm.expectCall(
      _gasReceiver,
      1,
      abi.encodeCall(
        IAxelarGasService.payNativeGasForContractCall,
        (_l1Connector, BNB_CHAIN_ID, mirrorConnectorStr, _data, _owner)
      )
    );

    // Check: call to axelar contractCall?
    vm.expectCall(_amb, abi.encodeCall(IAxelarGateway.callContract, (BNB_CHAIN_ID, mirrorConnectorStr, _data)));

    vm.deal(_rootManager, 1 ether);
    vm.prank(_rootManager);
    AxelarHubConnector(_l1Connector).sendMessage{value: 1}(_data, bytes(""));
  }

  // Access control
  function test_Connector_sendMessage_revertIfSenderIsNotRootManager(
    address _nonRootManager,
    bytes memory _data
  ) public {
    vm.assume(_nonRootManager != _rootManager);

    // Check: revert if caller is not root manager
    vm.expectRevert(abi.encodePacked("!rootManager"));

    vm.deal(_nonRootManager, 1 ether);
    vm.prank(_nonRootManager);
    AxelarHubConnector(_l1Connector).sendMessage{value: 1}(_data, bytes(""));
  }

  // data length
  function test_AxelarHubConnector_sendMessage_failsIfBadDataLength(bytes memory _data) public {
    vm.assume(_data.length != 32);

    vm.deal(_rootManager, 1 ether);
    vm.prank(_rootManager);
    vm.expectRevert(bytes("!data length"));
    AxelarHubConnector(_l1Connector).sendMessage{value: 1}(_data, bytes(""));
  }

  // encoded length
  function test_AxelarHubConnector_sendMessage_failsIfBadEncodedLength(bytes memory _encoded) public {
    vm.assume(_encoded.length > 0);

    bytes memory _data = abi.encode(5216);
    vm.deal(_rootManager, 1 ether);
    vm.prank(_rootManager);
    vm.expectRevert(bytes("!data length"));
    AxelarHubConnector(_l1Connector).sendMessage{value: 1}(_data, _encoded);
  }

  // ============ processMessage ============

  // Happy path L1
  function test_AxelarHubConnector_processMessage_processMessageAndEmitEvent(
    bytes32 commandId,
    bytes calldata _data
  ) public {
    // Resize fuzzed bytes to 32 bytes long
    bytes memory _dataCorrectSize = abi.encodePacked(bytes32(_data));

    uint32 _mirrorDomain = AxelarHubConnector(_l1Connector).MIRROR_DOMAIN();
    bytes32 payloadHash = keccak256(_dataCorrectSize);
    // Mock the call to the root manager
    vm.mockCall(
      _rootManager,
      abi.encodeCall(IRootManager.aggregate, (_mirrorDomain, bytes32(_dataCorrectSize))),
      abi.encode()
    );

    vm.mockCall(
      _amb,
      abi.encodeCall(
        IAxelarGateway.validateContractCall,
        (commandId, BNB_CHAIN_ID, _l2Connector.toString(), payloadHash)
      ),
      abi.encode(true)
    );

    // Check: call to root manager?
    vm.expectCall(_rootManager, abi.encodeCall(IRootManager.aggregate, (_mirrorDomain, bytes32(_dataCorrectSize))));

    AxelarHubConnector(_l1Connector).execute(commandId, BNB_CHAIN_ID, _l2Connector.toString(), _dataCorrectSize);
  }

  // message coming from a wrong sender on the origin chain to L1
  function test_AxelarHubConnector_processMessage_revertIfWrongMirror(
    bytes32 commandId,
    address _wrongMirror,
    bytes calldata _data
  ) public {
    vm.assume(_wrongMirror != _l2Connector);
    uint32 _mirrorDomain = AxelarHubConnector(_l1Connector).MIRROR_DOMAIN();
    // Resize fuzzed bytes to 32 bytes long
    bytes memory _dataCorrectSize = abi.encodePacked(bytes32(_data));
    bytes32 payloadHash = keccak256(_dataCorrectSize);
    vm.mockCall(
      _amb,
      abi.encodeCall(
        IAxelarGateway.validateContractCall,
        (commandId, BNB_CHAIN_ID, _wrongMirror.toString(), payloadHash)
      ),
      abi.encode(true)
    );

    // Mock the call to the root manager
    vm.mockCall(_rootManager, abi.encodeCall(IRootManager.aggregate, (_mirrorDomain, bytes32(_data))), abi.encode());

    vm.expectRevert(abi.encodePacked("!l2Connector"));
    AxelarHubConnector(_l1Connector).execute(commandId, BNB_CHAIN_ID, _wrongMirror.toString(), _dataCorrectSize);
  }

  // message has a length > 32 bytes
  function test_AxelarHubConnector_processMessage_revertIfWrongDataLength(
    bytes32 commandId,
    uint8 callDataLength
  ) public {
    vm.assume(callDataLength != 32);

    // Insert mock data in the payload
    bytes memory _wrongLengthCalldata = new bytes(callDataLength);
    for (uint256 i; i < callDataLength; i++) _wrongLengthCalldata[i] = bytes1(keccak256(abi.encode(i)));

    bytes32 payloadHash = keccak256(_wrongLengthCalldata);
    vm.mockCall(
      _amb,
      abi.encodeCall(
        IAxelarGateway.validateContractCall,
        (commandId, BNB_CHAIN_ID, _l2Connector.toString(), payloadHash)
      ),
      abi.encode(true)
    );

    vm.expectRevert(abi.encodePacked("!length"));
    AxelarHubConnector(_l1Connector).execute(commandId, BNB_CHAIN_ID, _l2Connector.toString(), _wrongLengthCalldata);
  }
}
