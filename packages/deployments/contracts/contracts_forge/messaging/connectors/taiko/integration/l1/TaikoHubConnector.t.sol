// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {Common} from "./Common.sol";
import {Connector} from "../../../../../../contracts/messaging/connectors/Connector.sol";
import {IBridge} from "../../../../../../contracts/messaging/interfaces/ambs/taiko/IBridge.sol";

contract Integration_Connector_TaikoHubConnector is Common {
  /**
   * @notice Emitted on Root Manager contract when a root is received
   * @param domain The domain id
   * @param receivedRoot The received root
   * @param queueIndex The queue index
   */
  event RootReceived(uint32 domain, bytes32 receivedRoot, uint256 queueIndex);

  /**
   * @notice Emitted on Taiko's Bridge contract when a message is sent through it
   * @param msgHash The message hash
   * @param message The message
   */
  event MessageSent(bytes32 indexed msgHash, IBridge.Message message);

  /**
   * @notice Tests the message is sent correctly through the Taiko's Bridge contract when calling Taiko Hub Connector `sendMessage`.
   * @dev To validate the message is sent correctly, we check the Bridge contract emits the `MessageSent` event with the correct arguments.
   */
  function test_sendMessage() public {
    bytes memory _data = abi.encode(bytes32("aggregateRoot"));
    bytes memory _calldata = abi.encodeWithSelector(Connector.processMessage.selector, _data);

    // Next id grabbed from the Taiko's Bridge state on the current block number
    uint256 _id = 728618;
    IBridge.Message memory _message = IBridge.Message({
      id: _id,
      from: address(taikoHubConnector),
      srcChainId: SEPOLIA_CHAIN_ID,
      destChainId: TAIKO_CHAIN_ID,
      user: address(rootManager),
      to: MIRROR_CONNECTOR,
      refundTo: MIRROR_CONNECTOR,
      value: 0,
      fee: 0,
      gasLimit: _gasCap,
      data: _calldata,
      memo: ""
    });

    // Expect the `MessageSent` event to be emitted correctly with the messag on taiko bridge
    vm.expectEmit(true, true, true, true, address(BRIDGE));
    emit MessageSent(keccak256(abi.encode(_message)), _message);

    // Send message from the root manager
    vm.prank(address(rootManager));
    bytes memory _encodedData = "";
    taikoHubConnector.sendMessage(_data, _encodedData);
  }

  /**
   * @notice Tests it receives the root correctly when relaying the message sent on Taiko L2.
   * @dev To assert it the `RootReceived` event is expected to be emitted with the correct arguments.
   */
  function test_receiveMessage() public {
    // Declare the message that was already sent on Taiko L2
    uint256 _messageId = 205226;
    IBridge.Message memory _message = IBridge.Message({
      id: _messageId,
      from: MIRROR_CONNECTOR,
      srcChainId: TAIKO_CHAIN_ID,
      destChainId: SEPOLIA_CHAIN_ID,
      user: MIRROR_CONNECTOR,
      to: address(taikoHubConnector),
      refundTo: address(taikoHubConnector),
      value: 0,
      fee: 0,
      gasLimit: _gasCap,
      data: abi.encodeWithSelector(Connector.processMessage.selector, abi.encode(bytes32("aggregateRoot"))),
      memo: ""
    });

    // Expect the `RootReceived` event to be emitted correctly with the message on taiko bridge
    uint256 _queueIndex = 1;
    vm.expectEmit(true, true, true, true, address(rootManager));
    emit RootReceived(MIRROR_DOMAIN, bytes32("aggregateRoot"), _queueIndex);

    // The message sent proof grabbed from Taiko L2
    bytes
      memory _proof = hex"000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000002096f200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000956f90953b90214f90211a0a2c44bfb7728e757af9ec0d672b8a7dee495613b336410383305d2ae73a6ef82a0f10ff96459735e1b6075b5158306229740d64a23382cedb30c0b83ecf2897c14a06d90e16f6ef95f50ffaa1bbde05bb72c9c635f557310c7e5950b057914d48a61a0b960108995af2f34604efadb65d13bd6a72cbb67a93d48d073e07123cacb19f0a0e75082b8935717e08a19e2b60fbbdbf9005c411cee1200aa555aa9a65c088c6aa0f884f877605ffdfd891a8a6d5298c3a089ae8f6e73baf975186b92a5271e82a2a047cb4e2bb2601058d71161a712c88748ec21c2f431db68b40aa6ae7d4a839c63a00063eadc7f4c6679915e4913bd1c27da62584a08503a4abee03e783dc18ea868a06268da789462c60ed84ba41930ce176508a51452f5f85a3a3135138053775074a0973cce26fbe3be934a2dfaf3cc7c76823657457df1934b9c85c44019ddaf184aa01de90ee62d3bbc895f5450ff738de09fe712aa6339521175b9deb72e9218253fa098cc086f5592f4fc8fd0986fb00bc1a917998a80f2e4d51f8f3a755ed1e7305ca0ce5c37291838addd4de01b3e9220a8a81179eb26d247ecdf4e62ec69cadd00c3a0eef2b5b44b15f6d63c52600783dcd26c78c11d11a76802804d6a6cba5db98707a042095cd377e137bd35847fe1143f6dc295cd93d41fe4fab22bfaf73b50d9ac2ea080ecf8eb9ba8be0b228ac47770752cc15b332a5147981e3a04f8e836bb986a0180b90214f90211a0aad2f9a3d48951ae15b0c9f88077bf511134f04e4a3b7da61009ab5355de5df9a02d5a7f200d5998793ca2512229c4ee496d323334a189ef0121e809f7ece36110a010a25869df279bd23ef09b4144af9063320614bb03d40e02e3d1073314bacc31a01fd985a17bf24c7aedd9fe2fc966a18336322683ceed25fd68f1764105368960a069baff45cd9cbfda8be9162fffe96824bfdda0e7ad4194b2f1b56e074cebd085a0379c3b4fe1782a60ab0e360e96a466d7f7be1be2152c7c1ae1f7e431565a468ea01393b809318ba2290081392e41908454d4f5631ca73d31a842be0958fb9abcbda0a257efc297d812cc5864c15fa677019949fb984c6ffb09499452f1fcbcbae17ba044225c8b2e4eb283eeeca2f029f325ebf0d5d8e4e5beb5d44179103631416917a0f7e127d0e75c8fe509da4e0088f9a83f167b24076005c6a80b3a868e5c4920dfa06a300e881a2b65b8709c22842bdf1c299cc0a4cd2b276a128f340c586e6bdb75a0d34db9b29f24ce40bebf7c8108a1e179ebec780c1d4a67b39392f31ff1e0e4eea09c6b0bad2280336492cc32c3569ffb8d2a5612bfeffba30d1920b86c9fec8b89a09cb0d7f3f822b9184ff3c77b2a8f5e5b5f9f590b31c5b1f0e30526a6701ead65a08738f49506f313ccf96d5cd90c544b086d139a20ae500086f568c85e314b5813a051a5f1f0ef5f8611d0615fc919c27b223b4f05547d3770beaf7df556c28f63ac80b90214f90211a00473d37f64ed82dd873c468e700c772a794b67f1ff1328c694370c9143773fe3a0333e65b3cfb7a9135fa6ef400befcfeb15ad2c9e1271ffa580a9ebcda3a18cfda082b42d596219a810be5b4809a412f3eab763752446847d11356980e3ad001d8ba0c81ab7e48041e469ad67c65811103c5ca6f0e4163d0559b337a558ce2b055196a0773aacd32789e244891d85d6b904a2c74c15b1a704d10c7ea6d908c5d21e0b8fa02ef9ea119c6749e52e6b9e50ca2e642c7cb42f781b21b6a66aaf4399ea8f0489a0064050939595ce491966ed39204450182c46e7815869029bb468a5e6f7b03f1da0c18d34f043f5eebac94cee4fd75f4a0582c83393e220ef364d89dfbd8590d069a0e78476fb8bfd8db4e1f0a9d4fe2b2d0982ff28439aef7dc8555e98b8c365240fa095bdb9b9491da4b6a53757d65dcdba0d26182580e2251ca7ad3a47f185354bf4a0fa5f75b38a4e6b1d1b2a2c2e4871434936130c190636572ebe777595cddf6a8ca0cf6adf07bd82a0086c405523ff48e53a55fa9ef49329b8aa3f32401a0ff57680a0fcbcaeb015f78993db8d9dc49dbbe91c98e2992ecd60631cf5b7d5a8e58c51e3a04747983515afbab94f77a36b1e6aefa3c78a98d77708c06c9acaaa3aab8102d6a0cf0e5fd7abab7fbbf34f31772d7a50198be90c230fb8644ef8cbc8ddd65fe862a007670594afb8559d950b60234182139f4d4935323a52abdf7f4f0c8cf3a16fa080b90214f90211a0ebca3a10e7ed1914de5da0dcd4bca656d16c110b99a15f336107813e42021042a050c12fa21729ff4c0fb5c445d7f7d73d529e54fd41a83c7c5308ffc4d058641fa003c7b0013b6afdacb3f3d37ca15409a580a72c742d35484fa5d7a724870e494ea080f7627ed40007c3e27e745ab41e6be38954116cf0c97ffe219ab2c31d6de015a042b28c62bf5fed89d7ca486bfb0cc2fd51826bd1e5fd145309033b3de0f8c4e9a00c4a28fe11b02f3d56f8eb6f801ed0031b584219f741a38bc9bcdab6b70cb2bda0f9424d1bf1c4a3900ccb1b1de212d2f987225098c7e33524ac51b015377edf05a098bf8cf5bb79379eb90140b151dc9ade90101ee201825fa65f08f6602f35a3b1a0251e3cbf032b3183a4162a52708ad7151028ee35ee612aa4ec553efba6b9c0e8a0a696872f57f74644a4047c1e93a4c8844c8420682d26059f7fb13119abc47228a0d0e8b1a32738c6c2ac0db0588ab9c6520bf6e85e0a462379c1deca564ed62d63a0063c5af8b3f4e803eecfb844933c69b07719feb6b464c5a7f59a75b2b3ff64c7a06e3f46b0b704c20b0696a247f3530eb13aa3c308fbea684f87bee6279f06830ea00032e7f69f99dce73466a4b4a4a72e9a2f7955c7a12714e7e181c817fdf37a16a0420ea37b920726e32b204a4655773b35165e5d53f6bf3485f80f8ff034b4ecc7a08b10a391f59d2cb2d5f08625fa19f36cca6b3d4b0b3f3ae2e5ff73c27a69c3e980b8d3f8d1a05afa38cf130d6b53431201348e23ccf700a77bbdffd2cde64c59c3273aa014fa80808080a0b90afa5940e896a95d65a59e121579b41615067bd12c95c8c63b274ab3cb4f948080a0887b2fd853ca0e59f37765faba28d5304f0953c9b3b19bf9c20b45de185ae872a06d4d11c081ad36a82339c32c34876cf8fe6fffb5cdbef52550fd1a34f2893e718080a06098a1ab05541a1c62bab04be143fbd1b633d902800123de8e7a9a594bbabae28080a016f9cc8711cbdbe88c5a522617eb6ceef8e62b2283210bcfc0cb444335869a2a80a1e09e3273d048d061de644912055997a8677680323fb70d1d374f7403056639ef0100000000000000000000";
    // Relay message on taiko bridge
    BRIDGE.processMessage(_message, _proof);
  }
}
