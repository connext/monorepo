// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "./interfaces/ITransactionManager.sol";
import "./lib/LibAsset.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract Router is Ownable {
  ITransactionManager public transactionManager;

  uint256 private chainId;

  address public recipient;

  address public routerSigner;

  struct SignedRemoveLiquidityData {
    uint256 amount;
    address assetId;
    uint256 chainId; // For domain separation
    address routerSigner; // For domain separation
  }

  constructor() {}

  function init(
    address _transactionManager,
    uint256 _chainId,
    address _routerSigner,
    address _recipient,
    address _owner
  ) external onlyOwner {
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

  function removeLiquidity(
    uint256 amount,
    address assetId,
    bytes calldata signature
  ) external {
    if (msg.sender != routerSigner) {
      SignedRemoveLiquidityData memory payload = SignedRemoveLiquidityData({
        amount: amount,
        assetId: assetId,
        chainId: chainId,
        routerSigner: routerSigner
      });
      address recovered = recoverSignature(abi.encode(payload), signature);
      require(recovered == routerSigner, "Router signature is not valid");
    }

    return transactionManager.removeLiquidity(amount, assetId, payable(recipient));
  }

  function prepare(ITransactionManager.PrepareArgs calldata args, bytes calldata signature)
    external
    payable
    returns (ITransactionManager.TransactionData memory)
  {
    if (msg.sender != routerSigner) {
      address recovered = recoverSignature(abi.encode(args), signature);
      require(recovered == routerSigner, "Router signature is not valid");
    }

    return
      transactionManager.prepare{value: LibAsset.isNativeAsset(args.invariantData.sendingAssetId) ? msg.value : 0}(
        args
      );
  }

  function fulfill(ITransactionManager.FulfillArgs calldata args, bytes calldata signature)
    external
    returns (ITransactionManager.TransactionData memory)
  {
    if (msg.sender != routerSigner) {
      address recovered = recoverSignature(abi.encode(args), signature);
      require(recovered == routerSigner, "Router signature is not valid");
    }

    return transactionManager.fulfill(args);
  }

  function cancel(ITransactionManager.CancelArgs calldata args, bytes calldata signature)
    external
    returns (ITransactionManager.TransactionData memory)
  {
    if (msg.sender != routerSigner) {
      address recovered = recoverSignature(abi.encode(args), signature);
      require(recovered == routerSigner, "Router signature is not valid");
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
