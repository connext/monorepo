// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "./interfaces/ITransactionManager.sol";
import "./lib/LibAsset.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract Router is Ownable {
  address public immutable routerFactory;

  ITransactionManager public transactionManager;

  uint256 private chainId;

  address public recipient;

  address public routerSigner;

  struct SignedPrepareData {
    ITransactionManager.PrepareArgs args;
    address routerRelayerFeeAsset;
    uint256 routerRelayerFee;
    uint256 chainId; // For domain separation
  }

  struct SignedFulfillData {
    ITransactionManager.FulfillArgs args;
    address routerRelayerFeeAsset;
    uint256 routerRelayerFee;
    uint256 chainId; // For domain separation
  }

  struct SignedCancelData {
    ITransactionManager.CancelArgs args;
    address routerRelayerFeeAsset;
    uint256 routerRelayerFee;
    uint256 chainId; // For domain separation
  }

  struct SignedRemoveLiquidityData {
    uint256 amount;
    address assetId;
    uint256 chainId; // For domain separation
  }

  event RelayerFeeAdded(address assetId, uint256 amount, address caller);
  event RelayerFeeRemoved(address assetId, uint256 amount, address caller);

  constructor(address _routerFactory) {
    routerFactory = _routerFactory;
  }

  // Prevents from calling methods other than routerFactory contract
  modifier onlyViaFactory() {
    require(msg.sender == routerFactory, "ONLY_VIA_FACTORY");
    _;
  }

  function init(
    address _transactionManager,
    uint256 _chainId,
    address _routerSigner,
    address _recipient,
    address _owner
  ) external onlyViaFactory {
    transactionManager = ITransactionManager(_transactionManager);
    chainId = _chainId;
    routerSigner = _routerSigner;
    recipient = _recipient;
    transferOwnership(_owner);
  }

  function setRecipient(address _recipient) external onlyOwner {
    recipient = _recipient;
  }

  function setSigner(address _routerSigner) external onlyOwner {
    routerSigner = _routerSigner;
  }

  function addRelayerFee(uint256 amount, address assetId) external payable {
    // Sanity check: nonzero amounts
    require(amount > 0, "#RC_ARF:002");

    // Transfer funds to contract
    // Validate correct amounts are transferred
    if (LibAsset.isNativeAsset(assetId)) {
      require(msg.value == amount, "#RC_ARF:005");
    } else {
      require(msg.value == 0, "#RC_ARF:006");
      LibAsset.transferFromERC20(assetId, msg.sender, address(this), amount);
    }

    // Emit event
    emit RelayerFeeAdded(assetId, amount, msg.sender);
  }

  function removeRelayerFee(uint256 amount, address assetId) external onlyOwner {
    // Sanity check: nonzero amounts
    require(amount > 0, "#RC_RRF:002");

    // Transfer funds from contract
    LibAsset.transferAsset(assetId, payable(recipient), amount);

    // Emit event
    emit RelayerFeeRemoved(assetId, amount, msg.sender);
  }

  function removeLiquidity(
    uint256 amount,
    address assetId,
    bytes calldata signature
  ) external {
    if (msg.sender != routerSigner) {
      SignedRemoveLiquidityData memory payload = SignedRemoveLiquidityData({
        amount: amount,
        assetId: assetId,
        chainId: chainId
      });

      address recovered = recoverSignature(abi.encode(payload), signature);
      require(recovered == routerSigner, "#RC_RL:040");
    }

    return transactionManager.removeLiquidity(amount, assetId, payable(recipient));
  }

  function prepare(
    ITransactionManager.PrepareArgs calldata args,
    address routerRelayerFeeAsset,
    uint256 routerRelayerFee,
    bytes calldata signature
  ) external payable returns (ITransactionManager.TransactionData memory) {
    if (msg.sender != routerSigner) {
      SignedPrepareData memory payload = SignedPrepareData({
        args: args,
        routerRelayerFeeAsset: routerRelayerFeeAsset,
        routerRelayerFee: routerRelayerFee,
        chainId: chainId
      });

      address recovered = recoverSignature(abi.encode(payload), signature);
      require(recovered == routerSigner, "#RC_P:040");

      // Send the relayer the fee
      if (routerRelayerFee > 0) {
        LibAsset.transferAsset(routerRelayerFeeAsset, payable(msg.sender), routerRelayerFee);
      }
    }

    return
      transactionManager.prepare(
        args
      );
  }

  function fulfill(
    ITransactionManager.FulfillArgs calldata args,
    address routerRelayerFeeAsset,
    uint256 routerRelayerFee,
    bytes calldata signature
  ) external returns (ITransactionManager.TransactionData memory) {
    if (msg.sender != routerSigner) {
      SignedFulfillData memory payload = SignedFulfillData({
        args: args,
        routerRelayerFeeAsset: routerRelayerFeeAsset,
        routerRelayerFee: routerRelayerFee,
        chainId: chainId
      });

      address recovered = recoverSignature(abi.encode(payload), signature);
      require(recovered == routerSigner, "#RC_F:040");

      // Send the relayer the fee
      if (routerRelayerFee > 0) {
        LibAsset.transferAsset(routerRelayerFeeAsset, payable(msg.sender), routerRelayerFee);
      }
    }

    return transactionManager.fulfill(args);
  }

  function cancel(
    ITransactionManager.CancelArgs calldata args,
    address routerRelayerFeeAsset,
    uint256 routerRelayerFee,
    bytes calldata signature
  ) external returns (ITransactionManager.TransactionData memory) {
    if (msg.sender != routerSigner) {
      SignedCancelData memory payload = SignedCancelData({
        args: args,
        routerRelayerFeeAsset: routerRelayerFeeAsset,
        routerRelayerFee: routerRelayerFee,
        chainId: chainId
      });

      address recovered = recoverSignature(abi.encode(payload), signature);
      require(recovered == routerSigner, "#RC_C:040");

      // Send the relayer the fee
      if (routerRelayerFee > 0) {
        LibAsset.transferAsset(routerRelayerFeeAsset, payable(msg.sender), routerRelayerFee);
      }
    }

    return transactionManager.cancel(args);
  }

  /**
   * @notice Holds the logic to recover the routerSigner from an encoded payload.
   *         Will hash and convert to an eth signed message.
   * @param encodedPayload The payload that was signed
   * @param signature The signature you are recovering the routerSigner from
   */
  function recoverSignature(bytes memory encodedPayload, bytes calldata signature) internal pure returns (address) {
    // Recover
    return ECDSA.recover(ECDSA.toEthSignedMessageHash(keccak256(encodedPayload)), signature);
  }
}
