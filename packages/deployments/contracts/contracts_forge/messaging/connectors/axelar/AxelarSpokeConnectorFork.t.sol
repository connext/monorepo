// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {MultichainSpokeConnector} from "../../../../contracts/messaging/connectors/multichain/MultichainSpokeConnector.sol";
import {AxelarSpokeConnector} from "../../../../contracts/messaging/connectors/axelar/AxelarSpokeConnector.sol";
import {Multichain} from "../../../../contracts/messaging/interfaces/ambs/Multichain.sol";

import {MerkleTreeManager} from "../../../../contracts/messaging/MerkleTreeManager.sol";

import "../../../utils/ConnectorHelper.sol";
import "../../../utils/Mock.sol";

contract AxelarSpokeConnectorTest is ConnectorHelper {
  using stdStorage for StdStorage;

  // ============ Storage ============
  uint256 bnbFork;

  address public immutable BNB_MULTICHAIN_SPOKE_CONNECTOR = 0x126A99af70eC62921C07E67943aCF61bF304Ef55;
  uint256 public FORK_BlOCK_NUMBER = 29293952;

  uint256 public immutable BNB_DOMAIN = 6450786;
  uint256 public immutable MAINNET_DOMAIN = 6648936;
  address public immutable AXELAR_GATEWAY = 0x304acf330bbE08d1e512eefaa92F6a57871fD895;
  address public immutable AXELAR_GAS_RECEIVER = 0x2d5d7d31F671F86C782533cc367F14109a082712;
  string public immutable BNB_CHAIN_ID = "binance";
  string public immutable MAINNET_CHAIN_ID = "Ethereum";
  address public immutable ROOT_MANAGER = 0xd5d61E9dfb6680Cba8353988Ba0337802811C2e1;
  address public immutable MIRROR_CONNECTOR = 0x0000000000000000000000000000000000000000;
  uint256 public immutable DELAY_BLOCKS = 0;

  MultichainSpokeConnector multichainSpokeConnector;
  AxelarSpokeConnector axelarSpokeConnector;

  // ============ Test set up ============
  function setUp() public {
    string memory BNB_RPC_URL = "https://bsc-dataseed.binance.org/"; //vm.envString("BNB_RPC_URL");
    bnbFork = vm.createFork(BNB_RPC_URL, FORK_BlOCK_NUMBER);

    multichainSpokeConnector = MultichainSpokeConnector(BNB_MULTICHAIN_SPOKE_CONNECTOR);

    bytes memory axelarParams = abi.encode(AXELAR_GAS_RECEIVER, BNB_CHAIN_ID);
    // Deploy
    vm.prank(_owner);
    axelarSpokeConnector = new AxelarSpokeConnector(
      BNB_DOMAIN,
      MAINNET_DOMAIN,
      AXELAR_GATEWAY,
      ROOT_MANAGER,
      MIRROR_CONNECTOR,
      _processGas,
      _reserveGas,
      DELAY_BLOCKS,
      multichainSpokeConnector.MERKLE(),
      multichainSpokeConnector.watchManager(),
      axelarParams
    );
    assertEq(_owner, MultichainSpokeConnector(_l2Connector).owner());
  }

  // ============ processMessage ============

  // can't prove old messages on new connector
  function test_AxelarSpokeConnector_processMessage_revertIfAlreadyProcessed() public {}
}
