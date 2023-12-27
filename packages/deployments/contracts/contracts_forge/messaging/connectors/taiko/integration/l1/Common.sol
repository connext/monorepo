// SPDX-License-Identifier: MIT
pragma solidity =0.8.17;

import {Connector} from "../../../../../../contracts/messaging/connectors/Connector.sol";
import {ConnectorHelper} from "../../../../../utils/ConnectorHelper.sol";
import {MerkleTreeManager} from "../../../../../../contracts/messaging/MerkleTreeManager.sol";
import {RootManager} from "../../../../../../contracts/messaging/RootManager.sol";
import {TaikoHubConnector} from "../../../../../../contracts/messaging/connectors/taiko/TaikoHubConnector.sol";
import {WatcherManager} from "../../../../../../contracts/messaging/WatcherManager.sol";
import {ISignalService} from "../../../../../../contracts/messaging/interfaces/ambs/taiko/ISignalService.sol";
import {console} from "forge-std/Test.sol";

contract Common is ConnectorHelper {
  uint256 internal constant _FORK_BLOCK = 4_775_438;

  uint256 public constant TAIKO_CHAIN_ID = 167007;
  // Sepolia domain id for Connext
  uint32 public constant DOMAIN = 20;
  // Taiko domain id for Connext
  uint32 public constant MIRROR_DOMAIN = 101;

  // Signal service contract on Sepolia
  ISignalService public constant SIGNAL_SERVICE = ISignalService(0xcD5e2bebd3DfE46e4BF96aE2ac7B89B22cc6a982);
  // Signal on the Bridge contract grabbed from on Taiko network
  bytes32 public constant SIGNAL = 0xf8c15826bf02f723864208066ac5f5795296c062b06a544ab7788d19f23f9926;
  // The proof of the signal sent
  bytes public constant PROOF =
    hex"000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000001436aa00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000916f90913b90214f90211a06237677a1f0311e91c4e6462e105b4b94455c57e10e935080f88646f10378918a04281dc293d72fb684bf50246145df380ee4dca5ac7456ddbda5bcf0539b0b13fa0704491aa05942190433cb8363af4595e6c4a10f9644f2a52f3c8b68758a6fec2a0c0601f364d59b44cb52a437880d2080b107801df878440fc8db29c4759f04b3ea05a9fa72b85692ba0c837a73677809b744ba8297ffbff95e6d633d0388aee6494a0181e716a398f0c30a5e4cc482ba5c3e0cbe534a7ca7e527eb77a7e907aaad9e1a06e76178acae3ebcc10cfff7eefa5f44930dc5334d37b68f66aac4f0b5bee03d6a0d209ff27ea93bc5ef4b381b9962077e1cbf2ec6d0360076ef73bf445d412c525a0dc9821dc6ae0126993b4bbb76c8a11cd8f0d4d6ba853309a16b658b09a6de121a017689f77da9a967de5370030d2546fb6c5e0639db7be2b2893c2c93730d34e41a0807bdfcc466746b93149e772e8cf6e6aaa9c9f4d234e0a8baf956c119d46e23ba0abc1ba47947abcd41908cf3295f851a0862378e86ac5f08e7612220e58ee9437a07d2a4efb9d387ebd6a6e4a3fcdc2f18f974df045e730592f14ef01fcf00989bba027f7cc1fe7bbf2b8ec2352814d109b35142200b0edeac55170d1620074f5f296a06b17c0713897ee15bf1a9236e3d61acee2a5079d0142eb319c54a945c18b1d03a0a709843a71c389a204471310f5f2c09d0b057866ddde627f0be488a9a09d828580b90214f90211a0842f75f069112427f970f6f4790eeb9766571a4c826a8093161d9499a4fc7f95a01d8e9948ecd1290e7335673be33c5dce4a9c8eefbc1944a26cb555c9cc1c2dd7a0fd1cc0416b97c328fb2dd73a24bbabce57d60f397e69840cf8b6b90ed73236c8a0c533a0fe5fa5ef5af0ff51b06e88215dfd98b9cc4d20b6af9d3ec44b01651ed8a087db8b94fcfcaf3df7c25290e736021594e96e2c99b6707f70a040c56b3e13daa0c61b16ffba74839d97d1dba5c890d31744357c29c01e189b5ebf4e93d188ec58a03ca60a9ddc0515016006af8d428c8df953010d3ad0c28fc93a7c18010a2a1837a068de18dfcbd9d75abfee705c710de6fd773621dac19e708eeb77486f2c80004ba0fb0b2f8c2066e8fde698201fe60533a6ebdb46a4dce077675d030298462f5a39a05f96a855a38d625b8ed66540df1c8519285c09076ea2520eda1f4b32617b97aba0445dd07e1aa111d7f7a8ca313ddd0ce008f9bb31461a56853ecef4b962beb70da0dcf398ca994648296c0d453603828616abf2509470d3261768568d82eaa62dc7a001859b323e3a2b607195277051757b91a46f48bb4bfea07889657af8efb6df71a0baadedc6d9c29954638582d86ecc0b989e4c9152aaaedce66618848f46281fe7a029b78211810218538f67ca310646e9fae28ee6cfdc5dff7dff9a9d66b0fd01bda00813e02002f3c6eb59f6c9c8d2a17cabce659a52600ca1d447decd1bcee04b5c80b90214f90211a0c329815d022750b88f5f0c58389709356ef8b28bfa869b033b4d175931bd35cca0daa9007f009ea1ee4079c2e7b89b52889a3435a982c9a7f3b57f3f7ca1c73851a0ec3638085921018fe99229e4973d64b0e97c01a1e400f51fe49eca0e053d8b26a005e66071c060ef425847d2975b0bf23c000a509c528f94f88e374000e3ecc7e1a01d4d09eac389a32fed3c0696e77363eeef93a909c178a2474acce80cbec1fb7da083263297b93338ca2fcaef77b55ea87ad9a9cf38c0f1abfab960c40944a52748a0f81c62176c53bb991eb1a300e53bb488de120e21df95aacd7f1e5596e14c450fa0f99d886f7cb84254c4ad68a511a7df9dba9bdf2d88a803d9422ea4bbfd71aa18a0c7c1ea46c432fd21f92e79c79003bf9db40af9a570bf023bd69c26f523900d33a0ed3ab3c353c1c413210632a7b829793a0fceb14eb5df95d6ce669f8739a75213a01e30bb9ae06caf0f546a07b34665b6fad8fef06298ed453194c9608e3104e8daa06a0afe3630b64c45e5131dda947a5f0d77303c8adb22159a93a237b3d93c4910a000000bc6c8e7939b47057624df01e4cec832032d0acdae7df94b9224cd1c5939a055a59026d095e20b176a68bcebac3ac0f1c895712548ca007efaa32132ba915ba0c52cbe5bde16d49dda028a247b7949faf7d8b057b0dd1ab772aae9603db399b8a0d06983f8ef09e64bf4b2f49feeae75fd0b07ad5506890b7428e230421a56bc3a80b90214f90211a03abf5c312bf5c315d896dc6ef572cbf3a7ae0d1d3ba73e594d4e697ded8dfae2a068c104ae71fe4b11569590fa10cdfd138cfd529df52052a65dca8116b130859ba0dbd4a8f92d633e27714a874ef6b910606ef38000b33ce825b0a48486a66f0b2ba0714bf2bcb61728266f9bf3269592bde78d733c3f365cdf54879f37c224f1249ca01b8602a88ea77d0f4072e2986165f15850597920270742a29bee48992b3757efa08e56584598719ae6074a20500f0771b9976477cabfb30d39cc2d4fce26a6caeda0c1399287f857b325bc42d987e1f980e5e04a7e451c2f556223215e7a383e5e6ea0d6786e24adf523f0090e690894bd68cd99aff1750e3f057e88a92997f0188e01a04f5b809f42d1c7d70ac2369dd81c59f3567a3fec5979e8e3a969fdd3d15baa92a082583361f1e908774b6cc96eb542cb1ddca689a1de232fd0264ba2e22a679166a073445b7fb49af5b355180e0b363dc5d27cc3fe42bb31b07b4474867cc3e8ecf6a05f3d36dc89a00410299ffd551135b27e2959389cb62fe93a645922942ca3d13ba018367ca94c7379cb13b7ec2a26c7bbc56252f5d9f6bbaced19f7c6fc9d7c8a47a010124d02be2f82763cb25c363dbeacaf28af8c1fef9e48ff9f07ba044f3e6374a0e6326f73ae0432824a6cdb071e5897799bca67bb345ab27e642cd73db471f313a0b27bcf2de6e9a3e87cb85dd77b39b2a36e42bedc6995a31f85696206c0ea44d180b893f89180a0c43f0167a7c9960641d2e88fc2ba1e4add43ea06129cba54357fe66241a8e0d380a0f87c155ef8b0142803176e08188432e9e6ea0cb093edcf49be5b23f8eb73bf078080808080a06f73e54a27f5bd4c20c0e50dd08f033e73d3e124337a31aa7dad685270aeaacb80a06f74906e1b8cad0c879b68f6c4406574a4491cd707a3f8f18017fc48c11965bd8080808080a1e09e3aee302c7a109582921a42799f1c5c0757414867c761269eed974f14c1050100000000000000000000";

  /**
   * @dev The mirror connector address is hardcoded because the receive integration test is tested with a real signal sent.
   * There Taiko Spoke Connector checks that the origin sender is the mirror connector.
   * Since we are using a real signal sent, we are using the origin sender from that signal as the mirror connector address.
   * In this case, the mirror connector address, is the `Bridge` contract address on Taiko L2 network.
   */
  address public constant MIRROR_CONNECTOR = 0x1000777700000000000000000000000000000004;

  // EOAs and external addresses
  address public owner = makeAddr("owner");
  address public relayer = makeAddr("relayer");
  address public whitelistedWatcher = makeAddr("whitelistedWatcher");
  // Connext off chain agent in charge of sending messages to the Taiko Hub Connector
  address public offChainAgent = makeAddr("offChainAgent");

  // Connext Contracts
  TaikoHubConnector public taikoHubConnector;
  RootManager public rootManager;
  MerkleTreeManager public merkleTreeManager;
  WatcherManager public watcherManager;

  /**
   * @notice Deploys the merkle tree manager, adds a watcher, deploys the root manager and the taiko spoke connector.
   * It also adds the taiko spoke connector as a new supported domain in the root manager and finally it activates the slow mode
   * on the root manager so root messages can be received.
   */
  function setUp() public {
    vm.createSelectFork(vm.rpcUrl(vm.envString("SEPOLIA_RPC")), _FORK_BLOCK);

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
    taikoHubConnector = new TaikoHubConnector(
      DOMAIN,
      MIRROR_DOMAIN,
      offChainAgent,
      address(rootManager),
      MIRROR_CONNECTOR,
      address(SIGNAL_SERVICE),
      TAIKO_CHAIN_ID
    );

    // Add connector as a new supported domain
    rootManager.addConnector(MIRROR_DOMAIN, address(taikoHubConnector));
    vm.stopPrank();
  }
}
