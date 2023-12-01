// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

// import {SygmaSpokeConnector} from "../../../../contracts/messaging/connectors/sygma/SygmaSpokeConnector.sol";
// import {SygmaAMB} from "../../../../contracts/messaging/interfaces/ambs/SygmaAMB.sol";

// import {ConnectorHelper} from "../../../utils/ConnectorHelper.sol";
// import {MerkleTreeManager} from "../../../../contracts/messaging/MerkleTreeManager.sol";

// contract Base is ConnectorHelper {
//   SygmaSpokeConnector public sygmaConnector;
//   address public feeRouter = makeAddr("feeRouter");

//   uint16 _chainIdL1 = 2;
//   uint16 _chainIdL2 = 4;
//   uint256 _gasCapL1 = 300000;
//   uint256 _gasCapL2 = 300000;

//   uint8 public sygmaSpokeDomainId = 2;
//   uint8 public sygmaHubDomainId = 1;

//   function setUp() public {
//     // Allow future contract mock
//     vm.etch(_amb, new bytes(0x42));
//     vm.etch(_rootManager, new bytes(0x42));

//     // Get the n+1 deployment address
//     _l1Connector = payable(address(bytes20(keccak256("_l1Connector"))));
//     _merkle = address(new MerkleTreeManager());

//     SygmaSpokeConnector.SygmaInfo memory _info = SygmaSpokeConnector.SygmaInfo(
//       sygmaSpokeDomainId,
//       sygmaHubDomainId,
//       feeRouter
//     );

//     // Deploy
//     vm.prank(_owner);
//     sygmaConnector = new SygmaSpokeConnector(
//       _l1Domain,
//       _l2Domain,
//       _amb,
//       _rootManager,
//       _l1Connector,
//       _processGas,
//       _reserveGas,
//       0, // uint256 _delayBlocks
//       _merkle,
//       address(1), // watcher manager
//       _info
//     );
//   }
// }

// contract SygmaSpokeConnector__Constructor is Base {
//   function test_constructor() public {
//     assertEq(sygmaConnector.DOMAIN(), _l2Domain);
//     assertEq(sygmaConnector.MIRROR_DOMAIN(), _l1Domain);
//     // assertEq(sygmaConnector.FEE_ROUTER(), address(1));
//     assertEq(sygmaConnector.PROCESS_GAS(), _processGas);
//     assertEq(sygmaConnector.RESERVE_GAS(), _reserveGas);
//     assertEq(sygmaConnector.delayBlocks(), 0);
//     assertEq(address(sygmaConnector.MERKLE()), address(_merkle));
//     assertEq(address(sygmaConnector.watcherManager()), address(1));
//     assertEq(sygmaConnector.mirrorConnector(), _l1Connector);
//     assertEq(sygmaConnector.AMB(), _amb);
//     // assertEq(sygmaConnector.FEE_ROUTER(), feeRouter);
//     assertEq(sygmaConnector.ROOT_MANAGER(), _rootManager);
//   }
// }
