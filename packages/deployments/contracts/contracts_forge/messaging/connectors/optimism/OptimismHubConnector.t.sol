// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import "@openzeppelin/contracts/crosschain/errors.sol";
import {IRootManager} from "../../../../contracts/messaging/interfaces/IRootManager.sol";
import {OptimismHubConnector} from "../../../../contracts/messaging/connectors/optimism/OptimismHubConnector.sol";
import {OptimismAmb} from "../../../../contracts/messaging/interfaces/ambs/optimism/OptimismAmb.sol";
import {IStateCommitmentChain, L2MessageInclusionProof, ChainBatchHeader, ChainInclusionProof} from "../../../../contracts/messaging/interfaces/ambs/optimism/IStateCommitmentChain.sol";
import {SecureMerkleTrie} from "../../../../contracts/messaging/connectors/optimism/lib/SecureMerkleTrie.sol";

import "../../../utils/ConnectorHelper.sol";
import "../../../utils/Mock.sol";

contract OptimismHubConnectorTest is ConnectorHelper {
  // ============ Events ============
  event DefaultGasPriceUpdated(uint256 previous, uint256 current);

  // ============ Storage ============

  // ============ Test set up ============
  function setUp() public {
    vm.etch(_stateCommitmentChain, new bytes(0x22));

    // NOTE: sample value taken from:
    // https://blockscout.com/optimism/goerli/tx/0x440fda036d28eb547394a8689af90c5342a00a8ca2ab5117f2b85f54d1416ddd/logs
    _l2Connector = payable(address(0x15Fe056CbFd5ac3625d3987f3Db96Dc9fd09770A));

    // deploy
    _l1Connector = payable(
      address(
        new OptimismHubConnector(_l1Domain, _l2Domain, _amb, _rootManager, _l2Connector, _stateCommitmentChain, _gasCap)
      )
    );
  }

  // ============ Utils ============
  function utils_setHubConnectorVerifyMocks(address _sender) public {
    // call to l2 bridge to get address
    vm.mockCall(_amb, abi.encodeWithSelector(OptimismAmb.xDomainMessageSender.selector), abi.encode(_sender));
  }

  function utils_setHubConnectorProcessMocks(address _sender) public {
    utils_setHubConnectorVerifyMocks(_sender);

    // call to root manager
    vm.mockCall(_rootManager, abi.encodeWithSelector(IRootManager.aggregate.selector), abi.encode(true));
  }

  // ============ OptimismHubConnector.verifySender ============
  function test_OptimismHubConnector__verifySender_shouldWorkIfSenderExpected() public {
    address expected = address(234);
    utils_setHubConnectorVerifyMocks(expected);

    vm.prank(_amb);
    assertTrue(OptimismHubConnector(_l1Connector).verifySender(expected));
  }

  function test_OptimismHubConnector__verifySender_shouldWorkIfSenderNotExpected() public {
    address expected = address(234);
    address notExpected = address(123);
    utils_setHubConnectorVerifyMocks(notExpected);

    vm.prank(_amb);
    assertEq(OptimismHubConnector(_l1Connector).verifySender(expected), false);
  }

  function test_OptimismHubConnector__verifySender_shouldFailIfCallerNotAmb() public {
    address expected = address(234);

    vm.expectRevert(bytes("!bridge"));
    assertEq(OptimismHubConnector(_l1Connector).verifySender(expected), false);
  }

  // ============ OptimismHubConnector.sendMessage ============
  function test_OptimismHubConnector__sendMessage_works() public {
    bytes memory _data = abi.encode(bytes32(bytes("test")));
    // encoded data
    bytes memory _encodedData = abi.encode(_gasCap);

    vm.mockCall(_amb, abi.encodeWithSelector(OptimismAmb.sendMessage.selector), abi.encode());

    vm.expectEmit(true, true, true, true);
    emit MessageSent(_data, _encodedData, _rootManager);

    vm.expectCall(
      _amb,
      abi.encodeWithSelector(
        OptimismAmb.sendMessage.selector,
        _l2Connector,
        abi.encodeWithSelector(Connector.processMessage.selector, _data),
        _gasCap
      )
    );

    vm.prank(_rootManager);
    OptimismHubConnector(_l1Connector).sendMessage(_data, _encodedData);
  }

  function test_OptimismHubConnector__sendMessage_works_fuzz(bytes32 data) public {
    bytes memory _data = abi.encode(data);

    // encoded data
    bytes memory _encodedData = abi.encode(_gasCap);

    vm.mockCall(_amb, abi.encodeWithSelector(OptimismAmb.sendMessage.selector), abi.encode());

    vm.expectEmit(true, true, true, true);
    emit MessageSent(_data, _encodedData, _rootManager);

    vm.expectCall(
      _amb,
      abi.encodeWithSelector(
        OptimismAmb.sendMessage.selector,
        _l2Connector,
        abi.encodeWithSelector(Connector.processMessage.selector, _data),
        _gasCap
      )
    );

    vm.prank(_rootManager);
    OptimismHubConnector(_l1Connector).sendMessage(_data, _encodedData);
  }

  // ============ OptimismHubConnector.processMessage ============
  function test_OptimismHubConnector__processMessage_shouldRevert() public {
    utils_setHubConnectorProcessMocks(_l2Connector);
    bytes32 data = bytes32(bytes("test"));
    bytes memory _data = abi.encode(data);

    vm.prank(_amb);

    vm.expectRevert(Connector.Connector__processMessage_notUsed.selector);
    OptimismHubConnector(_l1Connector).processMessage(_data);
  }

  // ============ OptimismHubConnector.processMessageFromRoot ============
  function test_OptimismHubConnector_processMessageFromRoot_works() public {
    // NOTE: _target is taken from the sample message
    address payable _target = payable(address(0));
    // set the target to have the code at the contract we want to test so the proof works
    vm.etch(_target, _l1Connector.code);
    address _sender = _l2Connector;
    // set the mirror connector on the appropriate target storage slot
    vm.store(_target, bytes32(uint256(3)), bytes32(abi.encode(_sender)));
    // set the commitment chain to the appropriate target storage slot
    vm.store(_target, bytes32(uint256(5)), bytes32(abi.encode(_stateCommitmentChain)));
    // NOTE: sample values taken from:
    // https://blockscout.com/optimism/goerli/tx/0x440fda036d28eb547394a8689af90c5342a00a8ca2ab5117f2b85f54d1416ddd/logs
    bytes32 _root = bytes32(0x27ae5ba08d7291c96c8cbddcc148bf48a6d68c7974b94356f53754ef6171d757);
    bytes memory _message = bytes(
      hex"4ff746f60000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002027ae5ba08d7291c96c8cbddcc148bf48a6d68c7974b94356f53754ef6171d757"
    );
    uint256 _messageNonce = 104500;

    // Ensure the _verifyStateRootProof call succeeds
    vm.mockCall(
      _stateCommitmentChain,
      abi.encodeWithSelector(IStateCommitmentChain.verifyStateCommitment.selector),
      abi.encode(true)
    );

    // Ensure _verifyStorageProof succeeds
    // NOTE: values taken from contract transaction above

    // Create siblings object
    bytes32[] memory siblings = new bytes32[](7);
    siblings[0] = bytes32(bytes(hex"df9c8ebff0044e22f62ad6e9a3ca3c74a63577a7429096884cda5e20606e0824"));
    siblings[1] = bytes32(bytes(hex"ef429e8c5ec9550a9cc666ce78def4592ac791e3e9975b3cc8843450b039f71a"));
    siblings[2] = bytes32(bytes(hex"55f747a50cfdfb6b97084a8544454ff406eff2aefa1c53e0f9acc9cc769bbdd0"));
    siblings[3] = bytes32(bytes(hex"03a4eb84ccffb952112d15f91a3438455b99e66adf5834a2f806c5eb7d7751d5"));
    siblings[4] = bytes32(bytes(hex"0460bd328f93e0f910ac438f4fb6066b46ca1b4be0070b38840876a8c3349cc4"));
    siblings[5] = bytes32(bytes(hex"752346f91fd91d0fcb2cfef04883da50fb4eedd741b031e3e66314e6a68fb40b"));
    siblings[6] = bytes32(bytes(hex"a859bec0593039c5db7429a6bfd10bfa28ce84f150ace69341b39ce3867cf291"));

    L2MessageInclusionProof memory _proof = L2MessageInclusionProof({
      stateRoot: bytes32(bytes(hex"e8b10105320cd42d72683b6a3889fd432618c8ff5753e12924de6e06ad0fe6d1")),
      stateRootBatchHeader: ChainBatchHeader({
        batchIndex: 13386,
        batchRoot: bytes32(bytes(hex"2f4ba1db4225c22f70ec1e6079ddbe29c23189a2dced60b3fd207a8b1a92f502")),
        batchSize: 101,
        prevTotalElements: 1351576,
        extraData: bytes(
          hex"00000000000000000000000000000000000000000000000000000000632cc8f800000000000000000000000002b1786a85ec3f71fbbba46507780db7cf9014f6"
        )
      }),
      stateRootProof: ChainInclusionProof({index: 41, siblings: siblings}),
      stateTrieWitness: bytes(
        hex"f9085cb90214f90211a010e994a23aada310d0d308944a9dd3de7d23b52189c7cdc122658627ff808d96a042303cda430599e6ecc3e755e199bba92193c5355d4ed395e63068acff00340aa008fb954cc758e551ed08d9876c5caf494892249414d68c60f4c5407dae80d98ca0d9b5c09a84b0cca5a68d5cb179fdd4695d17104ae76034c4099817b680bc004da06a479226cef34c58f7f2f34a5fac8ff17391c3483a94ad34454d24b217803e23a0ca8ab5f766592ce7d11114bf505a80e14a43efb2e6d3f4d4bacaec18f31f2ee7a0cbaccc3a318efb93d504c4b6cf42a1a952c3d47dd110f2f5edf6ba6e0fc79f96a0af0f8b6d1fe455d10291e5372d5532977bb7fa7b4e2625a309fc9052e5c9f8d9a033f74b22f27f7ba77c0d4055c28b2ac36d3089578a23e5b3fd855cf2d08699a6a0c15f22cd24b30154579af1bd9ea09999d61c261c0fa26469d64693c0cbb69b6fa0fdac3f6ad9a571a8a55976c653a0c3199171ca983a9be8089101e4473e29cb28a00fed24eed1334d909234fb3ebcd4f55961901deb41ffa160a2400dbe5e88e089a05c903bbef0e0136e4a42c968512e598cad924a2804dd13d679feba692e353f8ba05a53ffc568f3fa9df8b0dc3d98b0e8ab45dce158f5c9ceecf6c2e5712c846d20a0a25e32118e10865e5715e8f83620537b693cdc7c735a2cd3704a1ae8df86e614a0775927b196e740df013101ed8c9895ef0719668395db1567b2faf6ba67e3d33c80b90214f90211a054621916fea7186e35f96e06bb81a565c033916b086676b39fbbc0c4c30a6631a0da7f469c76371ea561ca8db519a4a0abc2c286dc45a0df1b0be93b02e98740b1a069325407c3a837e7118a390a00475b3abace4f925e83fd42fd1fea37128f565aa094c4adda24a97564deb53cc2ba06c5fc70d7e2dc3af8b5f93e875cc539426f73a086c57fc8b19eb3ec7a48800168f8dc6dd0818f372374f3b4fb9ed9f99a59eb68a057f60900fc9d50aeab3be7fb9a454b305a6c6bf6dd29a1a836f67319fd4c2f70a066bf480d069acde4a46d83246f27ace44571b9f38d45c50a92a6ab995a270118a0b11e61a0c66c35bce13167f949acb62940ab1f755abf0fa2505c30891714d1cba081b72ef929bae5e9043610b73c858ada08aaf0a7fba6d133dfc32d470b01ef19a05b6074ecc9baae2afddd2f2007a2a3466307a28df2fbc43cd3d394f1e77d00d4a06800822ec398d4fc86deb84cd1a539630765f028e91ed7398c1afcff9a85f89fa0f62507cb9e7f1db367dbee469ddcfdced394165f585043ba874937fba33b5b02a050c1c7c7ffc3d18ef139030e47d85fa7b61b372595ecb97cc38ae860b3cdb4daa0d38ac03d7180a88a32cde6d3bdff11dae9527ef511ed8ebac21b7909cbab7893a097ddcf7909b7763b1e30b8aee4e240ec9e911f450c95054f9ebd29c6fb87ec5ca07bed4b85be8765f18822b7ad540d18a0632f2d07d38547aeae74a21f1167766280b90214f90211a0be369e3b38709e30a43e1a31e1c9e031a91796630701830b3e27381b94c59582a0fb93aa01e530e16b6bfa80bb856893540a78d666581e98c56797a0af8788a018a0a42bf03ab6dd6b829f8f7e7a7272766ae474c60d0022ef865de4319286bf6b4ca0e2329778d5a2f76502f6c432985fa61137786c1f3c18529af64ed44befeb0f15a0b1cb44ea76388240a1475d499f03b3db8449aff8a50c4a4ea7e2e116430404bea035aa41a2170ca8c234bedabbef1ccd7a484f7bbcd23e7b1f30a55d5f6e0919d3a05cbdaf58578de859b88450668e1d4761db8d5adfce2f474f4c7551b3112164b4a03e06aa837a8c9ebab7ebfed92553e11c066af8e2e873e4902ca0da73e4892223a08dc7e7258676b6a91fe6fe5b030563e488c60ad092c17b17ce431e1d6e691a08a01dafb1bd6532973281e0a433a6e74a6b534b421b265366f75d0f294bd1e18f63a0b0a5689bc6eba98538dbf0fd4b61fa3ecb04d35cbee7efbbf76dc0be8cf1da99a0f3eb65d946a2ba25342ebf2b9b53cd0ef72b82b5cc802c9bc5d2151e57afb8aea07ca5fd19eabd2050cafd56399074ed67c7af17bb92d8bcff37a5807581527cf9a0e2b6a114ee372598e2920ed2ea55c8c599ee8092fdd9d9e3b3a304ca11428802a0b2fb9496cd54953c40c0ce2a2b08ce08c84a9e47ab217092906f15996910dffea0f6f30fd617799efe2e27d35363fb5455cef7f8cdafe93859f1c9d865d27db27080b90154f90151a0d0ffaf8e0648671ac62fd22e5ce069326d31dcacfb2a25b3709af60dfa218cfca0c569ffd90b638254e2afbdbbb5892642ebee4f47f0be37994c4c52e30143ede8a060e6617b7f47504534133e180709bfda077ba6511badd77534461d479247123c80a0f297e86d8788fad70ae190702430907500fb0a4ef6e2e856fe5a23fe79dea6e68080a093379e79668b2a2f842ce61a636f4b2f43323ce338c9336c6c34f544e429fbd080a005fef53ddb58ede19725db04d2080b5bb33796fdad6634769a884d2e85efb78aa0fe9a210cba73c6658d857cc14b3fec727eea5983a53670a77d96a2d92d7411d8a04ac70462cfc67acfb9a4e66a57ffd23dff07672c5407b74b2499d17fc71d3805a0fd858f0e390c34064ce4851b5112cbae788f06bfd65202a8793567bb45f02a29a0ff9cd827b542cc6c2b15c3709be2d66de74d8758dc1d78a47467e213ac113012808080b853f85180a0e8424bcf81769c723325c04c5eb77829eceae9a757375ffcd5503915c339913a80a09f8d70a41e245414504273cf6378a99ce8081f14e41d05c77f618b07d3f40e9a80808080808080808080808080b869f8679e311b46a2440f3eaf346b6c1ce588ed08712591822a258c5a1c4cf44cd0c9b846f8448080a0bb7916e3228203d37cd548980a3dc60d5bfe3f8bc7107943942f8719f1e3713da0c89b4b2237442578842fd73dfe24a34f3d19a8db05719dd7938f04574b4e89e6"
      ),
      storageTrieWitness: bytes(
        hex"f9065db90214f90211a0ff41298ea54059b1f04070d5ccd7a2125836525f6d955aef53710671c4736133a0fcfd9bd8bf2f938f5a869f6054bbb46386e3ba90e17a7c300b4d8d07e0eced6fa0ce6040fa7692d8f8693e81613ce6e5735a9542795897b9f154b74a58189d81b2a08494b7d02aefd4b1f9c300ef3a2db5888330f2d7905d7bf760b172b33b910658a073579ae954a65b794e2c8928122214410ba8b261fd47dee1fc5b08f5bad8cb6da04c32a4fa28e4091ddb1082a19a207a74aecd8b2c6418d99427a2ab21dc69ec11a0641734a1fce468b5827a533af81f6643b974967fafe90ce512b1c9ea1bbf1cd8a06faa3a5d576af69134b0aaae5200243cf75ef19c8f29447d310b7560c21f4acea0f4a18439b98f508ba5526b7f93168e901d056683ead9a3ebede497b27b1e28e4a0c5183cd5b00f5b4e6a9f3193c73dc95506423513b694632c723199741d3c505da0a020d15197175f78136db1a7ba8236005b5969c32ea08b03f64deb6f6cd53946a0ba6da8a5eabb7ccc3557a3e15d2db1a064377d16fcbb974bedcecc29bc6927eea07f8760783d1472d55e4ff22a090e76a973fa618f9330e9e1c26c8c7d323fbb1da0f52ca1183607614a05497341c61f926b655f87e5b7911bb3578fcd9fed137d4aa076fadd6341b17a08c302574f34d00b23450660189e8a55fceaf336d5f3632a61a0154edccae71eeeacd8e388bdf9f888d604018c12628d522f5b913cb369b0e7af80b90214f90211a0043e624af3c37a1b93952d79c6e745c286c36b601f4aa112e0d8cc20a2dd8658a075a9555e58feb02aad5fde11520eedb519fedcd8e27135c205b10c524564974ca0077dfedc3c1af2251e0c55d2e317d6fcb81be0148a8212ed1a94193206bb6aa6a00b5c7159a47b6ac756f42a8448a735472460c0eb1cbaddae7438893729c32e24a03777717e1223dce28137de62560f456c5db1475b26f920589f79273286b041b9a01f9d2da0aee8d11e0dc8fcc69196c86fd22dd4f6f033f5b8d0fdcd1b90b6909ea043c069f9c58c577eaa4e063c90f530e9618002084e7a9efa60b64ca313f095f7a022f17e967bf6c721815d96f3734a09285de56ddab70f68bcdebacf42a90897e6a0517e04399e7380c5d38ed1e3e4b7bef8ced6eefac64615125586277d0bc15fada0f3e62f68c18248e36f4c32edc0dab097dc6e95bb6d974d840a4ea14b8309ba50a0a6dac7dab714f3311c36e844681844b0e67f15be033cfe9a208a65781b004508a0dc7978d75bf4cfd8af97310d58a295c5cf2cff4b4f4e3109b17fb16110900759a0c7a291eccc7239cbfaa1e505152913417474147e3eac022e902bc0a99a444786a057d184b250f081d550615d9049fdc09fa221c3154a945197acea0b56392a5381a03ce071dd538766d785c6c3ffbc572f2256d95ad4d1db4f2b7e56451ed733f2eca0513c80a5596b4a03cb34476754e44444790dc5dcbdb80d7e56a6547601536e1380b901b4f901b1a0bfb8919bb6af4a311f8ee2d36713cb664f2c3101be886b4c67c0e2cfb86a94a8a043fc5aebba42f0e1bd1b68f2d71a469f0ff91390cf02adcd8a5590c05c65b206a0a94266a5ecbcf5a257322593adc089171e653f47b0f953a8641f5eddb87c7560a0169157f89d5e101a3d0e43ad2048c0ecbd77cc8209520f04e04751cd2fed5acea00b9256c87035d5860f173a7985fe1118caa05530c070447f4ddfa5a6ea00702da0ce90d42e0f3fb36bb1e1b1aac86f2afd8886037c92c383864a35e19ec9a8a311a0a372ebe0aa1bb1c076d55be4daa8c1340b81c1a90136a7b2b42bfaeccf1b8a5680a057f3aba5ae193763c7e5ee453759a2e61f613ace6111885ea4d8add40121219ea0b11979bd6b8a751b214bc7d1006733860a2af73f17f1d9fd62245b2a2c70d46ba063285e978290f0fb28a63c80d242d9d500cf34fd56700e4e89f6a357b23f0ac18080a0c16206034adc07375bfb6778e7e2aa381364cce7301544380213cf35386d7319a0941c91731afc4045854fd002cff8de87aace4046d60afde9d465d8747690afa4a0de28fdfcbee27c2d3bdc850455d39cc0529396b0339f95010f1fd4438b6e65d380b853f85180808080808080808080a091715bd8bd6d31f0f9394a472f860c8123278de296420abb997434414c4170d5808080a08edc9218490995123418c02303a9f9ec931ab59cbeffcb83a6b6286d16e204658080a2e19f206dc975d0698d5d1898358f82da5ef9924c81e9ca94952dd1ad0cec33e6d901"
      )
    });

    // Ensure the call to root manager succeeds
    vm.mockCall(_rootManager, abi.encodeWithSelector(IRootManager.aggregate.selector), abi.encode(true));

    // Check the call succeeds
    vm.expectCall(_rootManager, abi.encodeWithSelector(IRootManager.aggregate.selector, _l2Domain, _root));

    OptimismHubConnector(_target).processMessageFromRoot(_target, _sender, _message, _messageNonce, _proof);
    assertTrue(OptimismHubConnector(_target).processed(_root));
  }

  function test_OptimismHubConnector_processMessageFromRoot_failsIfNotMirrorConnector() public {
    utils_setHubConnectorVerifyMocks(_l2Connector);

    vm.expectRevert(bytes("!mirrorConnector"));

    // Invalid Arguments
    address _target = address(2121);
    address _sender;
    bytes memory _message;
    uint256 _messageNonce;
    L2MessageInclusionProof memory _proof;
    OptimismHubConnector(_l1Connector).processMessageFromRoot(_target, _sender, _message, _messageNonce, _proof);
  }

  function test_OptimismHubConnector_processMessageFromRoot_failsIfNotTarget() public {
    utils_setHubConnectorVerifyMocks(_l2Connector);

    vm.expectRevert(bytes("!this"));

    address _target;
    address _sender = _l2Connector;
    bytes memory _message;
    uint256 _messageNonce;
    L2MessageInclusionProof memory _proof;
    OptimismHubConnector(_l1Connector).processMessageFromRoot(_target, _sender, _message, _messageNonce, _proof);
  }

  function test_OptimismHubConnector_processMessageFromRoot_failsIfStateRootUnverified() public {
    utils_setHubConnectorVerifyMocks(_l2Connector);

    address _target = _l1Connector;
    address _sender = _l2Connector;
    bytes memory _message;
    uint256 _messageNonce;
    L2MessageInclusionProof memory _proof;

    // Ensure the _verifyStateRootProof call fails
    vm.mockCall(
      _stateCommitmentChain,
      abi.encodeWithSelector(IStateCommitmentChain.verifyStateCommitment.selector),
      abi.encode(false)
    );

    vm.expectRevert("!proof");
    OptimismHubConnector(_l1Connector).processMessageFromRoot(_target, _sender, _message, _messageNonce, _proof);
  }
}
