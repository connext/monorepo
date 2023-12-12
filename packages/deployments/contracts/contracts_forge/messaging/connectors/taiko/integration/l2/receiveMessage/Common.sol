// SPPX-LicenseIdentifier: MIT
pragma solidity =0.8.17;

import {Connector} from "../../../../../../../contracts/messaging/connectors/Connector.sol";
import {ConnectorHelper} from "../../../../../../utils/ConnectorHelper.sol";
import {MerkleTreeManager} from "../../../../../../../contracts/messaging/MerkleTreeManager.sol";
import {RootManager} from "../../../../../../../contracts/messaging/RootManager.sol";
import {SpokeConnector} from "../../../../../../../contracts/messaging/connectors/SpokeConnector.sol";
import {TaikoSpokeConnector} from "../../../../../../../contracts/messaging/connectors/taiko/TaikoSpokeConnector.sol";
import {WatcherManager} from "../../../../../../../contracts/messaging/WatcherManager.sol";
import {ISignalService} from "../../../../../../../contracts/messaging/interfaces/ambs/taiko/ISignalService.sol";
import {console} from "forge-std/Test.sol";

contract Common is ConnectorHelper {
  uint256 internal constant _FORK_BLOCK = 1_359_432;

  uint256 public constant SEPOLIA_CHAIN_ID = 11155111;
  ISignalService public constant SIGNAL_SERVICE = ISignalService(0x1000777700000000000000000000000000000007);
  uint32 public constant DOMAIN = 1; // Ethereum
  uint32 public constant MIRROR_DOMAIN = 101; // Taiko

  // Signal sent on the Bridge contract grabbed from Sepolia network
  bytes32 public constant SIGNAL = bytes32(0x8998cbbd932bc4795c12e4c1cef6bd27aab800309fb8c977b4150f9ecbb9f097);
  // The proof of the signal sent
  bytes public constant PROOF =
    hex"0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000048e88f000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000009b8f909b5b90214f90211a012f804182e37bfb7cd779ba141371061435d3694dbe20152f260fdbaa475e754a0cb76fceabf64dc5d032b59d1df37f8f65973869c6096662ad9515d39c461e6fda0130e25d9a11e7c0dfa23e12315c5803edcfe22cafd76c7104b66166ff4eb7bf1a062fbf1361f4db99b892d6d8359aef93de433278664108f1b7efa4399c9c562b6a0c825abc6ad40fd21b8452c237ab0a1d2c3e907943e34e709aa96aed4be6d432ca053615b715b27b754b1e2fd9e01fe95aeb75422d519a8ba23d8e0787f9de980c5a0a4e5440329f87384f78436f65e73517211ea587d27754ff243ecf0a7d48b0501a034d2ec5faf1d7ce76319c50ebf1a5964be2d0de1694537f79db3f043fc986732a04f2968ac2717d1cd51903b2890f23848743147d4149183f06486e3089f93a682a0023dfb61366fa5b3b3c0122e36531caa7aaf0e41787908e719085bcd2fcb2a7ea031c174a896427ed9d180e07d05427b66ed53474e83aa3f7dfdd428656d3b8fd5a02d5f6c8ebaf722662b57c94ce5da44e69d828ab5ffb1dfbf76a07e7e953a02bba0a443462908b2ebcc8efac944553f5484223c8bd2715b5e4cecf71e14f65ead28a0c0fa1a303c8a526b27040db12834865d6b5329806120bc0a2f18175a7547a29ca080b9e0ff6f8aaab8b9327f29ab3db4bb969597eda86ffc5078d75aefe3348375a07e612cac3416c87be9a8a298f04a39d38f19c63ece0e45812319403d7566d37d80b90214f90211a0c7b5a5f2fcd0f409cfe65dcf9d85768da895407102b5490f836d3d98ec445433a0dab2c40cabc659f8c2bee03b104fc8f6c147f642622517c01943adb79a9c45b4a0a31c51a98d16deebdc2160f381940f9e759f10175b82bec1bbafdd7da9a20b16a038f4c63e44ed078c2fc1b71223c2d0ddd2984c21f8b9608a18d9c3522f53b54fa08baf7f63bc43ee402be4c9adbe7e6cb89f89924d6f3d07121ef843a8e4dc776da0a5211a4ae6bd498e3fd24fd5de02f1b99c311e7f1f743e6accd0de08dd9ffd29a007d41089ab855f883590e133afaaa2648c0c24ff9813d96ff432271c2581cda1a076e68eae28b617bbc2a3899bc1dcf9adedf8f18e1bfbbc6c46a7877b9600495ea0bbbf7ef05bd1cff0599af1f077f2a87c91577ad7e8907a737b7f54911b2d206da05cc4916ef65e4791f48bdfc2de255fc9d2d275bd271a9dd702b50426121e4f95a079ad96878571f897d1bfa91b835f30baeb2a117b2564b6b917a33733d708dea1a0704e0cecc090e6af5e8e64706261088eed8e35b115e58d16e1c4f41c54354ea8a0f259d687d4e24118cf228f82ac0311ff23c2976fb1c312d0158b0e7393c65fb4a0035a74771c348c4405a8bf5076ac8c1eb1f75c4762d9363adbc759f0cbd042b1a0c2e32ab49cf6f93a1949b14a4537209f8e62227b5da3ce65ba2595f46f0bf863a0417aeddab420cb58c809cf9eb817fd05dc60ea1d68318b8b741e27c3e8bd841080b90214f90211a0a3212a1c009b1ff9c2985b045becdaf2f54b8800c30e79d327453fd2defe86fca0a0f76251e4470b2adc6cb8b0057a7dae04fdee67063b69478fb306e95315aedba0d537292b274f32e1e47e3d624359e078daf4d9f663fb0ea896c62cb012155173a061c32ce689470269c4773c75b6dbe5ed39d97f3bfcaa1efc944da63befaa1c52a0f15f1f7afb9706220c08358a23d6194a7e477c087e7ccd7e9b7b7baccfdca088a0ca9365d7ae8443eaadea8a5474739db4d59aeac66e7c7a6f9ede2fdc17df7f7ba0384478943993d1a54159a2d33e7154e48897deb1f1c8e892591cffcb7f50f466a0a1ff82c4c485647990853b9bd7dd91489e0334382e747e1ff7a8527b91fbcc51a03baf572f70fb5e48ff55dd7ff8150f6c75c8a41146931dcaa6eed92add0b1be0a00c9d147f6bb6a4d8c3d1856af35c27eb81319baca0c7c869edd7ff85f3ebc4dba0946fc184ff9c63bc5122e7389a1f36097f0bc9a56ebf58379a4a60193c4e4358a09e1ead18115690000a5537658e133be64fb4b891a60d14f4c94f8e7896ec98a5a0e69cbf3d7ab20c7cd4e3b268b43248dfa75462ba33cb95ed32fb35e3a9f1a395a0c7835bf9923ff91f7aaf5690fdeb23a636d41bb909773ea6de500e7314b538a4a026f743ead4d263f455977d861bd5a7e1de65cfc48d31edada87606f0e7adedbfa05b0f59389158be0e5108cd33ffea76cac13daae31716fbc0598e3dcbc3371fe280b90214f90211a0bc370e74c6d829a861fbd900e4c8c9281663157b943907035bc2a9c6eb51db98a0432b7342f2ec2055cc1c617054b273a12d7f846217b3013340a0472c2f1c42d8a0601c949d7ed885576ef7949c198abe1d69158f237a628471ca03e0162d04cd5da057abadb23aa61c4ba7ee50fcd928cb87e300a209eca2e207590702f05d00e66aa03c85c5a90747cae2bb651bab7c27e6eacf5fc006980e9273c7096e61daf52ebba0e98a6fec9641428830d7f2e4b7f830ceae49e1fc4968d7547a8fdda843be7507a0e5997befde71e12659d30e8eeac1fbe6c2522142e19d7922a5b8f68cb2376e99a0c28f7c5ec3a6787b8ca7909b179090e8e7a81d3df6b4d205f33f8c6c9b13112fa081b0f8f3f182ff0f4d7f3fba0ffab83a4c6f6a9287040ff2f1133c9b9d4410c5a06d39d3716540627bf3e91071a729ed25bc66925aaf3c4cfb4036106f408fe969a060bd9a73c8e9016b54475c218ecd248ec693dac7c788d71088d566372f492cc1a0349dcead53c057ab991e617414c0ac297e3552653718354462abed6aee3225c8a03fa6ed2e06680781a9d7c5cb9e8373d8651a12c13b19f5b496329aab259f7721a03fd7900cc90ac0c97b2b615d3033c2debf4c884b134c7bf8fdd67bc8b055c1fba0f1f4469b8bdd3423d93cfaa6b1a1be87654e827d2eae983e3be20075cb88d155a0d7899c3ebacebf8c1ef5028e32d0c918caca042332489709e79628ab213320b680b90134f9013180a0b22b29516277a514cba553fe3eb1734b86613a69518e305802f27dee4478b62d808080a08b029aa59873713caa10f9d0999340d5b753cf62340e6ffb4aa412676c88d9e7a0a10544bbc20e4fa09df42ff75f759ab8ca911f01fac79b6793d80f9e1dbc8e00a077b8d3bbba4de04c7a899df782b696de06707036603a88905e81b19ef0f57cf7a0c56eb1152dd50af3589326eac5af84e0646119c4e3b1c0e6a0c9f80bcf5e6d46a076f6f859607e18b346b24fa1b24e89b303bf9c9e3bd4f1cd52cd1af05e2d9621a08c9e6f434f402fe45622fbb922528d15c1bdfcd694f45f6839363cc23d326448a06ca961e01ffde8b2cd46f9d9cef3264c5c9ec61c190c8d2d1654205902e27e208080a0f810f83404514391331de561518a1c3fdabf3186f84c54a0113020fb7c5bf7318080a1e09e3e0aaeaf32e6c81c032cf121b2e0429ee5c0e5c8a41fbfe7010bc878ceb3010000000000000000";

  /**
   * @dev The receive integration test is tested with a real signal sent. In order to
   * succeed, the from address of the transaction that sends the signal must be the mirror connector.
   */
  address public constant TX_FROM_ADDRESS = 0xEA17E4094E04339f250a910e10809Ab6A90746d2;

  address public owner = makeAddr("owner");
  address public relayer = makeAddr("relayer");
  address public whitelistedWatcher = makeAddr("whitelistedWatcher");
  // Connext's off chain agent in charge of sending messages to the Taiko Hub Connector
  address public offChainAgent = makeAddr("offChainAgent");

  TaikoSpokeConnector public taikoSpokeConnector;
  RootManager public rootManager;
  MerkleTreeManager public merkleTreeManager;
  WatcherManager public watcherManager;

  function setUp() public {
    vm.createSelectFork(vm.rpcUrl(vm.envString("TAIKO_RPC")), _FORK_BLOCK);

    vm.startPrank(owner);
    // Deploy merkle tree manager (needed in root manager)
    merkleTreeManager = new MerkleTreeManager();

    // Deploy watcher manager (needed in root manager)
    watcherManager = new WatcherManager();
    // Add a watcher (need for setting the slow mode)
    watcherManager.addWatcher(whitelistedWatcher);

    // Deploy root manager (needed in scroll spoke connector)
    uint256 _minDisputeBlocks = 1;
    uint256 _disputeBlocks = 10;
    uint256 _delayBlocks = 0;
    rootManager = new RootManager(
      _delayBlocks,
      address(merkleTreeManager),
      address(watcherManager),
      _minDisputeBlocks,
      _disputeBlocks
    );

    // Deploy scroll hub connector
    SpokeConnector.ConstructorParams memory _constructorParams = SpokeConnector.ConstructorParams(
      DOMAIN,
      MIRROR_DOMAIN,
      offChainAgent,
      address(rootManager),
      TX_FROM_ADDRESS,
      _processGas,
      _reserveGas,
      _delayBlocks,
      address(merkleTreeManager),
      address(watcherManager),
      _minDisputeBlocks,
      _disputeBlocks
    );
    taikoSpokeConnector = new TaikoSpokeConnector(_constructorParams, address(SIGNAL_SERVICE), SEPOLIA_CHAIN_ID);

    // Add connector as a new supported domain
    rootManager.addConnector(MIRROR_DOMAIN, address(taikoSpokeConnector));
    vm.stopPrank();

    // Set root manager as slow mode so the L1_SCROLL_MESSENGER messages can be received
    vm.prank(whitelistedWatcher);
    rootManager.activateSlowMode();
  }
}
