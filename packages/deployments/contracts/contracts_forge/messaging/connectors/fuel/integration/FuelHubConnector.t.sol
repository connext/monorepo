// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Common} from "./Common.sol";
import {Connector} from "../../../../../contracts/messaging/connectors/Connector.sol";

contract Integration_Connector_FuelHubConnector is Common {
  /**
   * @notice Emitted when a message is sent from Ethereum to Fuel by the `FuelMessagePortal`
   * @param sender The sender of the message
   * @param recipient The recipient of the message
   * @param nonce The nonce of the message
   * @param amount The amount of the message
   * @param data The data of the message
   */
  event MessageSent(
    bytes32 indexed sender,
    bytes32 indexed recipient,
    uint256 indexed nonce,
    uint64 amount,
    bytes data
  );

  /**
   * @notice Emitted when a root is received on the `RootManager`
   * @param domain The domain of the root
   * @param receivedRoot The root received
   * @param queueIndex The queue index of the root
   */
  event RootReceived(uint32 domain, bytes32 receivedRoot, uint256 queueIndex);

  /**
   * @notice Sends a message trough the Fuel AMB using the Fuel Hub Connector and
   * checks the `MessageSent` event is successfully emitted by the `FuelMessagePortal`
   */
  function test_sendMessage() public {
    // Encode the root
    bytes memory _root = abi.encode(bytes32("aggregateRoot"));
    // Encode the mirror connector, which is the recipient address
    bytes memory _encodedData = abi.encode(mirrorConnector);

    // Expect `MessageSent` event to be emitted with the correct values
    // Parse the sender (fuel hub connector) and recipient (mirror connector) to bytes32
    bytes32 _sender = bytes32(uint256(uint160(address(fuelHubConnector))));
    bytes32 _recipient = bytes32(uint256(uint160(mirrorConnector)));
    // Declare the calldata, which is the message to be bridged
    bytes memory _calldata = abi.encodeWithSelector(Connector.processMessage.selector, _root);
    // Nonce grabbed from fuel network
    uint256 _nonce = 227101;
    // Value is 0 since no `msg.value` will be sent on the tx
    uint64 _value = 0;

    vm.expectEmit(true, true, true, true, address(FUEL_MESSAGE_PORTAL));
    emit MessageSent(_sender, _recipient, _nonce, _value, _calldata);

    vm.prank(address(rootManager));
    fuelHubConnector.sendMessage(_root, _encodedData);
  }

  /**
   * @notice Tests a bridged message is received from Fuel L2 to Sepolia L1 on the `FuelHubConnector`.
   * A real message bridged from Fuel L2 was picked for this test, and then it was simulated the relay of it in
   * order to get the correct calldata to be sent to the `FuelMessagePortal` with the message and the different proofs.
   * The test expects the `RootReceived` event to be emitted by the `RootManager` with the correct values.
   */
  function test_receiveMessage() public {
    // This is the root we sent as `processMessage()` argument on the message was bridged from Fuel L2 to Sepolia
    bytes32 _root = bytes32("root");

    // Expect `RootReceived` event to be emitted with the correct values by the `RootManager`
    vm.expectEmit(true, true, true, true, address(rootManager));
    // The queue index is 1 because is the first message received since it was deployed.
    uint256 _lastQueueIndex = 1;
    emit RootReceived(MIRROR_DOMAIN, _root, _lastQueueIndex);

    // This is the calldata to relay the message bridged from fuel in Sepolia. The call is over the `FuelMessagePortal` `relayMessage` function.
    // It cointains the message with the different proofs. It was picked from a simulation of the `relayMessage` tx that worked correctly.
    /* The message structure is the following:
     *  amount: 0,
     * data: [
     *  79, 247, 70, 246, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
     *  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
     *  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 114, 111, 111,
     *  116, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
     *  0, 0, 0, 0,
     * ],
     * digest: "6b766ed4875c794d6b54f4713c862727cf8c32984b5c02d377bef7fa547d9bb5",
     * len: 100,
     * nonce: "c2081a769fe1e0938c9007c84c51f978e57655ac4074f0fde739760b4ec4bf7d",
     * recipient: "0000000000000000000000008d8bb34fb9a1a52ac0bddc9901c5c7b5e7347d05",
     * sender: "27fc60f2d13d959e5c756ac770e74ce34cf2e11f802ce2cd61961f2e6d399b14",
     */
    bytes
      memory _calldata = hex"cd88ec5300000000000000000000000000000000000000000000000000000000000001e024bdd03275bc6509c4706b5f890a438fe481efbbeb91e8e97436b9b84c994cba0000000000000000000000000000000000000000000000000000000000a325a0000000000000000000000000000000000000000000000000400000006582f11e817cbe541a1b34c92bd427d95d6d3bcc1846a3cee14473dcd14b22416f09076def413debe55bf7c2ed9f9a6d8a56dfd519600a7cb3f1612912bde227a86b9c850000000000000000000000000000000000000000000000000000000000a30eb0000000000000000000000000000000000000000000000000400000006582da2800000000000000000000000000000000000000000000000000000000004b2003000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000018f56bc165404af851964cc13f7f31829e428b70473ae47d1b29fad25890cc0776fb2e83be1e4a34ecf161384c231dc2715dc9398d7a517832d7c321d04dcfdd6000000000000000000000000000000000000000000000000000000000000032000000000000000000000000000000000000000000000000000000000000005c027fc60f2d13d959e5c756ac770e74ce34cf2e11f802ce2cd61961f2e6d399b140000000000000000000000008d8bb34fb9a1a52ac0bddc9901c5c7b5e7347d05c2081a769fe1e0938c9007c84c51f978e57655ac4074f0fde739760b4ec4bf7d000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000644ff746f600000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000020726f6f7400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a30eb0000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000120774e48fcf78ec76006a5a1efe882592905c80976d9e54c1441c05f2d9c1ecf4f1620b2d17eb3a003165cb62fed992105bddc91ccec6a6975ab96f2846095ff4b52ec37e43a3ac67b781348b96982f412089b234959d6dc11919a4aabd85546dd240ec5356b5941d086029d6efb74d9be2af1ea4eda5a3ef8117bdc1b758ad95f7eb20f8ecd8cb2a2facda826fb6996b944c56015227f4de67cdeb5f9a380ff626a0f18ca832495fd2cf6dc058b3278307f1bc1db43e7f85df627771dc5e04a9cc8b759ef2daf15a1328725e26ed42c158878c7df2315e8cc9c45e0aefc4848905e8c41b056955d6e56255395aac5bbade8381340466c3aa55a4761fe1d6328664a1a1482726176916ca03c345208fa0ebfd0336f42b67455db25a1fa6e55207a4fb49a2f181dd1c1a61b529f04571b830b77532e7933e386f63e72e5abcb3f7cc25a7e6e6232ef78ad6f34040d65f98a48e614d6549e6a209d9d49267ceccfd967a536cad032426ffc6d6fa4f2ba86e7cfa865ad568303c53317db99fd1bf56cf2244d8e53e0502ad5a3da804368d337c65f02cd073002426f676b9871b532b3a94ad37e22eac4519e0ba4af3d95d1b362926ecfe7c0958138f74a80d3d7aaabb7a107f6f6b50cc31378e7d32842ba31e3819863656681c289975c7598630ff091ecdf0ec91786180201b79c5de602ec0ffaaec46a245b17a367294881a4f3ae28d7d8441b93fd5f8097fb034625722b61f7c004baaccd6f96dc05d14628cd19a36146127e3f44b632b029b382f8eeca1492537702f87a1d5bb3ac8bc960ff6000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000";
    address(FUEL_MESSAGE_PORTAL).call(_calldata);
  }
}
