// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {IERC20Metadata} from "@openzeppelin/contracts/interfaces/IERC20Metadata.sol";

import {TypeCasts} from "../../../shared/libraries/TypeCasts.sol";

import {TokenId} from "../libraries/TokenId.sol";
import {AssetLogic} from "../libraries/AssetLogic.sol";
import {TokenConfig} from "../libraries/LibConnextStorage.sol";

import {IStableSwap} from "../interfaces/IStableSwap.sol";
import {IBridgeToken} from "../interfaces/IBridgeToken.sol";

import {BridgeToken} from "../helpers/BridgeToken.sol";

import {BaseConnextFacet} from "./BaseConnextFacet.sol";

contract TokenFacet is BaseConnextFacet {
  // ========== Custom Errors ===========
  error TokenFacet__addAssetId_alreadyAdded();
  error TokenFacet__addAssetId_badMint();
  error TokenFacet__addAssetId_badBurn();
  error TokenFacet__removeAssetId_notAdded();
  error TokenFacet__removeAssetId_invalidParams();
  error TokenFacet__removeAssetId_remainsCustodied();
  error TokenFacet__updateDetails_localNotFound();
  error TokenFacet__updateDetails_onlyRemote();
  error TokenFacet__updateDetails_notApproved();
  error TokenFacet__enrollAdoptedAndLocalAssets_emptyCanonical();
  error TokenFacet__setupAsset_representationListed();
  error TokenFacet__setupAsset_invalidCanonicalConfiguration();
  error TokenFacet__setupAssetWithDeployedRepresentation_invalidRepresentation();
  error TokenFacet__setupAssetWithDeployedRepresentation_onCanonicalDomain();
  error TokenFacet__setLiquidityCap_notCanonicalDomain();

  // ============ Events ============

  /**
   * @notice emitted when a representation token contract is deployed
   * @param domain the domain of the chain where the canonical asset is deployed
   * @param id the bytes32 address of the canonical token contract
   * @param representation the address of the newly locally deployed representation contract
   */
  event TokenDeployed(uint32 indexed domain, bytes32 indexed id, address indexed representation);

  /**
   * @notice Emitted when a new stable-swap AMM is added for the local <> adopted token
   * @param key - The key in the mapping (hash of canonical id and domain)
   * @param canonicalId - The canonical identifier of the token the local <> adopted AMM is for
   * @param domain - The domain of the canonical token for the local <> adopted amm
   * @param swapPool - The address of the AMM
   * @param caller - The account that called the function
   */
  event StableSwapAdded(
    bytes32 indexed key,
    bytes32 indexed canonicalId,
    uint32 indexed domain,
    address swapPool,
    address caller
  );

  /**
   * @notice Emitted when a liquidity cap is updated
   * @param key - The key in the mapping (hash of canonical id and domain)
   * @param canonicalId - The canonical identifier of the token the local <> adopted AMM is for
   * @param domain - The domain of the canonical token for the local <> adopted amm
   * @param cap - The newly enforced liquidity cap (if it is 0, no cap is enforced)
   * @param caller - The account that called the function
   */
  event LiquidityCapUpdated(
    bytes32 indexed key,
    bytes32 indexed canonicalId,
    uint32 indexed domain,
    uint256 cap,
    address caller
  );

  /**
   * @notice Emitted when a new asset is added
   * @param key - The key in the mapping (hash of canonical id and domain)
   * @param canonicalId - The canonical identifier of the token the local <> adopted AMM is for
   * @param domain - The domain of the canonical token for the local <> adopted amm
   * @param adoptedAsset - The address of the adopted (user-expected) asset
   * @param localAsset - The address of the local asset
   * @param caller - The account that called the function
   */
  event AssetAdded(
    bytes32 indexed key,
    bytes32 indexed canonicalId,
    uint32 indexed domain,
    address adoptedAsset,
    address localAsset,
    address caller
  );

  /**
   * @notice Emitted when an asset is removed from allowlists
   * @param key - The hash of the canonical identifier and domain of the token removed
   * @param caller - The account that called the function
   */
  event AssetRemoved(bytes32 indexed key, address caller);

  // ============ Getters ============

  function canonicalToAdopted(bytes32 _key) public view returns (address) {
    return _getAdoptedAsset(_key);
  }

  function canonicalToAdopted(TokenId calldata _canonical) public view returns (address) {
    return _getAdoptedAsset(AssetLogic.calculateCanonicalHash(_canonical.id, _canonical.domain));
  }

  function adoptedToCanonical(address _adopted) public view returns (TokenId memory) {
    TokenId memory canonical = TokenId(s.adoptedToCanonical[_adopted].domain, s.adoptedToCanonical[_adopted].id);
    return canonical;
  }

  function canonicalToRepresentation(bytes32 _key) public view returns (address) {
    return _getRepresentationAsset(_key);
  }

  function canonicalToRepresentation(TokenId calldata _canonical) public view returns (address) {
    return _getRepresentationAsset(AssetLogic.calculateCanonicalHash(_canonical.id, _canonical.domain));
  }

  function representationToCanonical(address _representation) public view returns (TokenId memory) {
    TokenId memory canonical = TokenId(
      s.representationToCanonical[_representation].domain,
      s.representationToCanonical[_representation].id
    );
    return canonical;
  }

  function getTokenId(address _candidate) public view returns (TokenId memory) {
    return _getCanonicalTokenId(_candidate);
  }

  function getLocalAndAdoptedToken(bytes32 _id, uint32 _domain) public view returns (address, address) {
    return _getLocalAndAdoptedToken(AssetLogic.calculateCanonicalHash(_id, _domain), _id, _domain);
  }

  function approvedAssets(bytes32 _key) public view returns (bool) {
    return s.tokenConfigs[_key].approval;
  }

  function approvedAssets(TokenId calldata _canonical) public view returns (bool) {
    return approvedAssets(AssetLogic.calculateCanonicalHash(_canonical.id, _canonical.domain));
  }

  function adoptedToLocalExternalPools(bytes32 _key) public view returns (IStableSwap) {
    return IStableSwap(s.tokenConfigs[_key].adoptedToLocalExternalPools);
  }

  function adoptedToLocalExternalPools(TokenId calldata _canonical) public view returns (IStableSwap) {
    return adoptedToLocalExternalPools(AssetLogic.calculateCanonicalHash(_canonical.id, _canonical.domain));
  }

  function getCustodiedAmount(bytes32 _key) public view returns (uint256) {
    return s.tokenConfigs[_key].custodied;
  }

  // ============ Admin functions ============

  /**
   * @notice Used to add supported assets. This is an admin only function
   *
   * @dev When allowlisting the canonical asset, all representational assets would be
   * allowlisted as well. In the event you have a different adopted asset (i.e. PoS USDC
   * on polygon), you should *not* allowlist the adopted asset. The stable swap pool
   * address used should allow you to swap between the local <> adopted asset.
   *
   * If a representation has been deployed at any point, `setupAssetWithDeployedRepresentation`
   * should be used instead.
   *
   * The following can only be added on *REMOTE* domains:
   * - `_adoptedAssetId`
   * - `_stableSwapPool`
   *
   * Whereas the `_cap` can only be added on the canonical domain
   *
   * @param _canonical - The canonical asset to add by id and domain. All representations
   * will be allowlisted as well
   * @param _canonicalDecimals - The decimals of the canonical asset (will be used for deployed
   * representation)
   * @param _representationName - The name to be used for the deployed asset
   * @param _representationSymbol - The symbol used for the deployed asset
   * @param _adoptedAssetId - The used asset id for this domain (e.g. PoS USDC for
   * polygon)
   * @param _stableSwapPool - The address of the local stableswap pool, if it exists.
   */
  function setupAsset(
    TokenId calldata _canonical,
    uint8 _canonicalDecimals,
    string memory _representationName,
    string memory _representationSymbol,
    address _adoptedAssetId,
    address _stableSwapPool,
    uint256 _cap
  ) external onlyOwnerOrAdmin returns (address _local) {
    // Calculate the canonical key.
    bytes32 key = AssetLogic.calculateCanonicalHash(_canonical.id, _canonical.domain);

    bool onCanonical = _canonical.domain == s.domain;
    if (onCanonical) {
      // On the canonical domain, the local is the canonical address.
      _local = TypeCasts.bytes32ToAddress(_canonical.id);

      // Sanity check: ensure adopted asset ID == canonical address (or empty).
      // This could reflect a user error or miscalculation and lead to unexpected behavior.
      // NOTE: Since we're on canonical domain, there should be no stableswap pool provided.
      if ((_adoptedAssetId != address(0) && _adoptedAssetId != _local) || _stableSwapPool != address(0)) {
        revert TokenFacet__setupAsset_invalidCanonicalConfiguration();
      }

      // Enroll the asset. Pass in address(0) for adopted: it should use the local asset (i.e. the
      // canonical asset in this case) instead for both adopted and local.
      _enrollAdoptedAndLocalAssets(true, _canonicalDecimals, address(0), _local, address(0), _canonical, _cap, key);
    } else {
      // Cannot already have an assigned representation.
      // NOTE: *If* it does, it can still be replaced with `setupAssetWithDeployedRepresentation`
      if (s.tokenConfigs[key].representation != address(0) || s.tokenConfigs[key].representationDecimals != 0) {
        revert TokenFacet__setupAsset_representationListed();
      }

      // On remote, deploy a local representation.
      _local = _deployRepresentation(
        _canonical.id,
        _canonical.domain,
        _canonicalDecimals,
        _representationName,
        _representationSymbol
      );
      // Enroll the asset.
      _enrollAdoptedAndLocalAssets(
        false,
        _canonicalDecimals,
        _adoptedAssetId,
        _local,
        _stableSwapPool,
        _canonical,
        0,
        key
      );
    }
  }

  /**
   * @notice Used to add supported assets, without deploying a unique representation
   * asset, and instead using what admins have provided. This is an admin only function
   *
   * @dev This function does very minimal checks to ensure the correct `_representation`
   * token is used. The only enforced checks are:
   * - Bridge can mint, and balance of bridge will increase
   * - Bridge can burn, and balance of bridge will decrease
   *
   * However, there are many things that must be checked manually to avoid enrolling a bad
   * representation:
   * - decimals must always be equal to canonical decimals
   * - regular `mint`, `burn`, `ERC20` functionality could be implemented improperly
   * - the required interface functions (see `IBridgeToken`) may not be implemented
   * - upgradeability could interfere with required functionality
   *
   * Using this method allows admins to override existing local tokens, and should be used
   * carefully.
   *
   * @param _canonical - The canonical asset to add by id and domain. All representations
   * will be whitelisted as well
   * @param _representation - The address of the representative asset
   * @param _adoptedAssetId - The used asset id for this domain (e.g. PoS USDC for
   * polygon)
   * @param _stableSwapPool - The address of the local stableswap pool, if it exists.
   */
  function setupAssetWithDeployedRepresentation(
    TokenId calldata _canonical,
    address _representation,
    address _adoptedAssetId,
    address _stableSwapPool
  ) external onlyOwnerOrAdmin returns (address) {
    if (_representation == address(0)) {
      revert TokenFacet__setupAssetWithDeployedRepresentation_invalidRepresentation();
    }

    if (_canonical.domain == s.domain) {
      revert TokenFacet__setupAssetWithDeployedRepresentation_onCanonicalDomain();
    }

    // Calculate the canonical key.
    bytes32 key = AssetLogic.calculateCanonicalHash(_canonical.id, _canonical.domain);

    _enrollAdoptedAndLocalAssets(
      false,
      IERC20Metadata(_representation).decimals(),
      _adoptedAssetId,
      _representation,
      _stableSwapPool,
      _canonical,
      0,
      key
    );

    return _representation;
  }

  /**
   * @notice Adds a stable swap pool for the local <> adopted asset.
   * @dev Must pass in the _canonical information so it can be emitted in event
   */
  function addStableSwapPool(TokenId calldata _canonical, address _stableSwapPool) external onlyOwnerOrAdmin {
    bytes32 key = AssetLogic.calculateCanonicalHash(_canonical.id, _canonical.domain);
    _addStableSwapPool(_canonical, _stableSwapPool, key);
  }

  /**
   * @notice Adds a stable swap pool for the local <> adopted asset.
   * @dev Must pass in the _canonical information so it can be emitted in event
   */
  function updateLiquidityCap(TokenId calldata _canonical, uint256 _updated) external onlyOwnerOrAdmin {
    bytes32 key = AssetLogic.calculateCanonicalHash(_canonical.id, _canonical.domain);
    _setLiquidityCap(_canonical, _updated, key);
  }

  /**
   * @notice Used to remove assets from the allowlist
   * @param _key - The hash of the canonical id and domain to remove (mapping key)
   * @param _adoptedAssetId - Corresponding adopted asset to remove
      * @param _representation - Corresponding representation asset to remove

   */
  function removeAssetId(
    bytes32 _key,
    address _adoptedAssetId,
    address _representation
  ) external onlyOwnerOrAdmin {
    TokenId memory canonical = s.adoptedToCanonical[_adoptedAssetId];
    _removeAssetId(_key, _adoptedAssetId, _representation, canonical);
  }

  /**
   * @notice Used to remove assets from the allowlist
   * @param _canonical - The canonical id and domain to remove
   * @param _adoptedAssetId - Corresponding adopted asset to remove
   * @param _representation - Corresponding representation asset to remove
   */
  function removeAssetId(
    TokenId calldata _canonical,
    address _adoptedAssetId,
    address _representation
  ) external onlyOwnerOrAdmin {
    bytes32 key = AssetLogic.calculateCanonicalHash(_canonical.id, _canonical.domain);
    _removeAssetId(key, _adoptedAssetId, _representation, _canonical);
  }

  /**
   * @notice Used to update the name and symbol of a local token
   * @param _canonical - The canonical id and domain to remove
   * @param _name - The new name
   * @param _symbol - The new symbol
   */
  function updateDetails(
    TokenId calldata _canonical,
    string memory _name,
    string memory _symbol
  ) external onlyOwnerOrAdmin {
    bytes32 key = AssetLogic.calculateCanonicalHash(_canonical.id, _canonical.domain);
    address local = AssetLogic.getConfig(key).representation;
    if (local == address(0)) {
      revert TokenFacet__updateDetails_localNotFound();
    }

    // Can only happen on remote domains
    if (s.domain == _canonical.domain) {
      revert TokenFacet__updateDetails_onlyRemote();
    }

    // ensure asset is currently approved because `s.canonicalToRepresentation` does
    // not get cleared when asset is removed from allowlist
    if (!s.tokenConfigs[key].approval) {
      revert TokenFacet__updateDetails_notApproved();
    }

    // make sure the asset is still active
    IBridgeToken(local).setDetails(_name, _symbol);
  }

  // ============ Private Functions ============

  function _enrollAdoptedAndLocalAssets(
    bool _onCanonical,
    uint8 _localDecimals,
    address _adopted,
    address _local,
    address _stableSwapPool,
    TokenId calldata _canonical,
    uint256 _cap,
    bytes32 _key
  ) internal {
    // Sanity check: canonical ID and domain are not 0.
    if (_canonical.domain == 0 || _canonical.id == bytes32("")) {
      revert TokenFacet__enrollAdoptedAndLocalAssets_emptyCanonical();
    }

    // Get true adopted
    bool adoptedIsLocal = _adopted == address(0);
    address adopted = adoptedIsLocal ? _local : _adopted;

    // Get whether you are on canonical
    bool onCanonical = s.domain == _canonical.domain;

    // Sanity check: needs approval
    if (s.tokenConfigs[_key].approval) revert TokenFacet__addAssetId_alreadyAdded();

    // Sanity check: bridge can mint / burn on remote
    if (!onCanonical) {
      IBridgeToken candidate = IBridgeToken(_local);
      uint256 starting = candidate.balanceOf(address(this));
      candidate.mint(address(this), 1);
      if (candidate.balanceOf(address(this)) != starting + 1) {
        revert TokenFacet__addAssetId_badMint();
      }
      candidate.burn(address(this), 1);
      if (candidate.balanceOf(address(this)) != starting) {
        revert TokenFacet__addAssetId_badBurn();
      }
    }

    // Generate Config
    // NOTE: Using address(0) for stable swap, then using `_addStableSwap`. Slightly less
    // efficient, but preserves events. Same case for cap / custodied.
    // NOTE: IFF on canonical domain, `representation` must *always* be address(0)!
    s.tokenConfigs[_key] = TokenConfig(
      _onCanonical ? address(0) : _local, // representation
      _localDecimals, // representationDecimals
      adopted, // adopted
      adoptedIsLocal ? _localDecimals : IERC20Metadata(adopted).decimals(), // adoptedDecimals
      address(0), // adoptedToLocalExternalPools, see note
      true, // approval
      0, // cap, see note
      0 // custodied, see note
    );

    // Update reverse lookups
    // Update the adopted mapping using convention of local == adopted iff (_adopted == address(0))
    s.adoptedToCanonical[adopted].domain = _canonical.domain;
    s.adoptedToCanonical[adopted].id = _canonical.id;

    if (!_onCanonical) {
      // Update the local <> canonical. Representations only exist on non-canonical domains.
      s.representationToCanonical[_local].domain = _canonical.domain;
      s.representationToCanonical[_local].id = _canonical.id;
      // Update swap (on the canonical domain, there is no representation / pool).
      _addStableSwapPool(_canonical, _stableSwapPool, _key);
    } else if (_cap > 0) {
      // Update cap (only on canonical domain).
      _setLiquidityCap(_canonical, _cap, _key);
    }

    // Emit event
    emit AssetAdded(_key, _canonical.id, _canonical.domain, adopted, _local, msg.sender);
  }

  /**
   * @notice Used to add an AMM for adopted <> local assets
   * @param _canonical - The canonical TokenId to add (domain and id)
   * @param _stableSwap - The address of the amm to add
   * @param _key - The hash of the canonical id and domain
   */
  function _addStableSwapPool(
    TokenId calldata _canonical,
    address _stableSwap,
    bytes32 _key
  ) internal {
    // Update the pool mapping
    s.tokenConfigs[_key].adoptedToLocalExternalPools = _stableSwap;

    // Emit event
    emit StableSwapAdded(_key, _canonical.id, _canonical.domain, _stableSwap, msg.sender);
  }

  /**
   * @notice Used to add a cap on amount of custodied canonical asset
   * @dev The `custodied` amount will only increase in real time as router liquidity
   * and xcall are used and the cap is set (i.e. if cap is removed, `custodied` values are
   * no longer updated or enforced).
   *
   * When the `cap` is updated, the `custodied` value is set to the balance of the contract,
   * which is distinct from *retrievable* funds from the contracts (i.e. could include the
   * value someone just sent directly to the contract). Whenever you are updating the cap, you
   * should set the value with this in mind.
   *
   * @param _canonical - The canonical TokenId to add (domain and id)
   * @param _updated - The updated liquidity cap value
   * @param _key - The hash of the canonical id and domain
   */
  function _setLiquidityCap(
    TokenId calldata _canonical,
    uint256 _updated,
    bytes32 _key
  ) internal {
    if (s.domain != _canonical.domain) {
      revert TokenFacet__setLiquidityCap_notCanonicalDomain();
    }
    // Update the stored cap
    s.tokenConfigs[_key].cap = _updated;

    if (_updated > 0) {
      // Update the custodied value to be the balance of this contract
      address canonical = TypeCasts.bytes32ToAddress(_canonical.id);
      s.tokenConfigs[_key].custodied = IERC20Metadata(canonical).balanceOf(address(this));
    }

    emit LiquidityCapUpdated(_key, _canonical.id, _canonical.domain, _updated, msg.sender);
  }

  /**
   * @notice Used to remove assets from the allowlist
   *
   * @dev When you are removing an asset, `xcall` will fail but `handle` and `execute` will not to
   * allow for inflight transfers to be addressed. Similarly, the `repayAavePortal` function will
   * work.
   *
   * @param _key - The hash of the canonical id and domain to remove (mapping key)
   * @param _adoptedAssetId - Corresponding adopted asset to remove
   * @param _representation - Corresponding representation asset (i.e. bridged asset) to remove.
   * @param _canonical - The TokenId (canonical ID and domain) of the asset.
   */
  function _removeAssetId(
    bytes32 _key,
    address _adoptedAssetId,
    address _representation,
    TokenId memory _canonical
  ) internal {
    TokenConfig storage config = s.tokenConfigs[_key];
    // Sanity check: already approval
    if (!config.approval) revert TokenFacet__removeAssetId_notAdded();

    // Sanity check: consistent set of params
    if (config.adopted != _adoptedAssetId || config.representation != _representation)
      revert TokenFacet__removeAssetId_invalidParams();

    bool onCanonical = s.domain == _canonical.domain;
    if (onCanonical) {
      // Sanity check: no value custodied if on canonical domain
      address canonicalAsset = TypeCasts.bytes32ToAddress(_canonical.id);
      // Check custodied amount for the given canonical asset address.
      // NOTE: if the `cap` is not set, the `custodied` value will not continue to be updated,
      // so you must use the `balanceOf` for accurate accounting. If there are funds held
      // on these contracts, then when you remove the asset id, the assets cannot be bridged back and
      // become worthless. This means the bridged assets would become worthless.
      // An attacker could prevent admins from removing an asset by sending funds to this contract,
      // but all of the liquidity should already be removed before this function is called.
      if (IERC20Metadata(canonicalAsset).balanceOf(address(this)) > 0) {
        revert TokenFacet__removeAssetId_remainsCustodied();
      }
    } else {
      // Sanity check: supply is 0 if on remote domain.
      if (IBridgeToken(_representation).totalSupply() > 0) {
        revert TokenFacet__removeAssetId_remainsCustodied();
      }
    }

    // Delete token config from configs mapping.
    // NOTE: we do NOT delete the representation entries from the config. This is
    // done to prevent multiple representations being deployed in `setupAsset`
    delete s.tokenConfigs[_key].adopted;
    delete s.tokenConfigs[_key].adoptedDecimals;
    delete s.tokenConfigs[_key].adoptedToLocalExternalPools;
    delete s.tokenConfigs[_key].approval;
    delete s.tokenConfigs[_key].cap;
    // NOTE: custodied will always be 0 at this point

    // Delete from reverse lookups
    delete s.representationToCanonical[_representation];
    delete s.adoptedToCanonical[_adoptedAssetId];

    // Emit event
    emit AssetRemoved(_key, msg.sender);
  }

  /**
   * @notice Deploy and initialize a new token contract
   * @dev Each token contract is a proxy which
   * points to the token upgrade beacon
   * @return _token the address of the token contract
   */
  function _deployRepresentation(
    bytes32 _id,
    uint32 _domain,
    uint8 _decimals,
    string memory _name,
    string memory _symbol
  ) internal returns (address _token) {
    // deploy the token contract
    _token = address(new BridgeToken(_decimals, _name, _symbol));
    // emit event upon deploying new token
    emit TokenDeployed(_domain, _id, _token);
  }
}
