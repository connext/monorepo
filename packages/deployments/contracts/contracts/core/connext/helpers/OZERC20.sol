// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

// This is modified from "@openzeppelin/contracts/token/ERC20/IERC20.sol"
// Modifications were made to allow the name, hashed name, and cached
// domain separator to be internal

import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-IERC20Permit.sol";
import {EIP712} from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @dev Implementation of the {IERC20} interface.
 *
 * Implements ERC20 Permit extension allowing approvals to be made via
 * signatures, as defined in https://eips.ethereum.org/EIPS/eip-2612[EIP-2612].
 *
 * Adds the {permit} method, which can be used to change an account's ERC20
 * allowance (see {IERC20-allowance}) by presenting a message signed by the
 * account. By not relying on {IERC20-approve}, the token holder account doesn't
 * need to send a transaction, and thus is not required to hold Ether at all.
 *
 * This implementation is agnostic to the way tokens are created. This means
 * that a supply mechanism has to be added in a derived contract using {_mint}.
 * For a generic mechanism see {ERC20PresetMinterPauser}.
 *
 * TIP: For a detailed writeup see our guide
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[How
 * to implement supply mechanisms].
 *
 * We have followed general OpenZeppelin guidelines: functions revert instead
 * of returning `false` on failure. This behavior is nonetheless conventional
 * and does not conflict with the expectations of ERC20 applications.
 *
 * Additionally, an {Approval} event is emitted on calls to {transferFrom}.
 * This allows applications to reconstruct the allowance for all accounts just
 * by listening to said events. Other implementations of the EIP may not emit
 * these events, as it isn't required by the specification.
 *
 * Finally, the non-standard {decreaseAllowance} and {increaseAllowance}
 * functions have been added to mitigate the well-known issues around setting
 * allowances. See {IERC20-approve}.
 *
 * @dev Cannot use default ERC20/ERC20Permit implementation as there is no way to update
 * the name (set to private).
 *
 * Cannot use default EIP712 implementation as the _HASHED_NAME may change.
 * These functions use the same implementation, with easier storage access.
 */
contract ERC20 is IERC20Metadata, IERC20Permit {
  // See ERC20
  mapping(address => uint256) private _balances;

  mapping(address => mapping(address => uint256)) private _allowances;

  uint256 private _totalSupply;

  string internal _name; // made internal, need access
  string internal _symbol; // made internal, need access
  uint8 internal _decimals; // made internal, need access

  // See ERC20Permit
  using Counters for Counters.Counter;

  mapping(address => Counters.Counter) private _nonces;

  // See EIP712
  // Immutables used in EIP 712 structured data hashing & signing
  // https://eips.ethereum.org/EIPS/eip-712
  bytes32 private constant _PERMIT_TYPEHASH =
    keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
  bytes32 internal constant _TYPE_HASH =
    keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)");
  // made internal, need access

  // Cache the domain separator as an immutable value, but also store the chain id that it corresponds to, in order to
  // invalidate the cached domain separator if the chain id changes.
  bytes32 internal _CACHED_DOMAIN_SEPARATOR; // made internal, may change
  uint256 private immutable _CACHED_CHAIN_ID;
  address private immutable _CACHED_THIS;

  bytes32 internal _HASHED_NAME; // made internal, may change
  bytes32 internal immutable _HASHED_VERSION; // made internal, need access

  /**
   * @dev Initializes the {EIP712} domain separator using the `name` parameter,
   * and setting `version` to `"1"`.
   *
   * It's a good idea to use the same `name` that is defined as the ERC20 token name.
   */
  constructor(
    uint8 decimals_,
    string memory name_,
    string memory symbol_,
    string memory version_
  ) {
    // ERC20
    _name = name_;
    _symbol = symbol_;
    _decimals = decimals_;

    // EIP712
    bytes32 hashedName = keccak256(bytes(name_));
    bytes32 hashedVersion = keccak256(bytes(version_));
    _HASHED_NAME = hashedName;
    _HASHED_VERSION = hashedVersion;
    _CACHED_CHAIN_ID = block.chainid;
    _CACHED_DOMAIN_SEPARATOR = _buildDomainSeparator(_TYPE_HASH, hashedName, hashedVersion);
    _CACHED_THIS = address(this);
  }

  /**
   * @dev Returns the name of the token.
   */
  function name() public view virtual override returns (string memory) {
    return _name;
  }

  /**
   * @dev Returns the symbol of the token, usually a shorter version of the
   * name.
   */
  function symbol() public view virtual override returns (string memory) {
    return _symbol;
  }

  /**
   * @dev Returns the number of decimals used to get its user representation.
   * For example, if `decimals` equals `2`, a balance of `505` tokens should
   * be displayed to a user as `5.05` (`505 / 10 ** 2`).
   *
   * Tokens usually opt for a value of 18, imitating the relationship between
   * Ether and Wei. This is the value {ERC20} uses, unless this function is
   * overridden;
   *
   * NOTE: This information is only used for _display_ purposes: it in
   * no way affects any of the arithmetic of the contract, including
   * {IERC20-balanceOf} and {IERC20-transfer}.
   */
  function decimals() public view virtual override returns (uint8) {
    return _decimals;
  }

  /**
   * @dev See {IERC20-totalSupply}.
   */
  function totalSupply() public view virtual override returns (uint256) {
    return _totalSupply;
  }

  /**
   * @dev See {IERC20-balanceOf}.
   */
  function balanceOf(address account) public view virtual override returns (uint256) {
    return _balances[account];
  }

  /**
   * @dev See {IERC20-transfer}.
   *
   * Requirements:
   *
   * - `to` cannot be the zero address.
   * - the caller must have a balance of at least `amount`.
   */
  function transfer(address to, uint256 amount) public virtual override returns (bool) {
    _transfer(msg.sender, to, amount);
    return true;
  }

  /**
   * @dev See {IERC20-allowance}.
   */
  function allowance(address _owner, address _spender) public view virtual override returns (uint256) {
    return _allowances[_owner][_spender];
  }

  /**
   * @dev See {IERC20-approve}.
   *
   * NOTE: If `amount` is the maximum `uint256`, the allowance is not updated on
   * `transferFrom`. This is semantically equivalent to an infinite approval.
   *
   * Requirements:
   *
   * - `spender` cannot be the zero address.
   */
  function approve(address spender, uint256 amount) public virtual override returns (bool) {
    _approve(msg.sender, spender, amount);
    return true;
  }

  /**
   * @dev See {IERC20-transferFrom}.
   *
   * Emits an {Approval} event indicating the updated allowance. This is not
   * required by the EIP. See the note at the beginning of {ERC20}.
   *
   * Requirements:
   *
   * - `_sender` and `recipient` cannot be the zero address.
   * - `_sender` must have a balance of at least `amount`.
   * - the caller must have allowance for ``_sender``'s tokens of at least
   * `amount`.
   */
  function transferFrom(
    address _sender,
    address _recipient,
    uint256 _amount
  ) public virtual override returns (bool) {
    _spendAllowance(_sender, msg.sender, _amount);
    _transfer(_sender, _recipient, _amount);
    return true;
  }

  /**
   * @dev Atomically increases the allowance granted to `spender` by the caller.
   *
   * This is an alternative to {approve} that can be used as a mitigation for
   * problems described in {IERC20-approve}.
   *
   * Emits an {Approval} event indicating the updated allowance.
   *
   * Requirements:
   *
   * - `_spender` cannot be the zero address.
   */
  function increaseAllowance(address _spender, uint256 _addedValue) public virtual returns (bool) {
    _approve(msg.sender, _spender, _allowances[msg.sender][_spender] + _addedValue);
    return true;
  }

  /**
   * @dev Atomically decreases the allowance granted to `spender` by the caller.
   *
   * This is an alternative to {approve} that can be used as a mitigation for
   * problems described in {IERC20-approve}.
   *
   * Emits an {Approval} event indicating the updated allowance.
   *
   * Requirements:
   *
   * - `_spender` cannot be the zero address.
   * - `_spender` must have allowance for the caller of at least
   * `_subtractedValue`.
   */
  function decreaseAllowance(address _spender, uint256 _subtractedValue) public virtual returns (bool) {
    uint256 currentAllowance = allowance(msg.sender, _spender);
    require(currentAllowance >= _subtractedValue, "ERC20: decreased allowance below zero");
    unchecked {
      _approve(msg.sender, _spender, currentAllowance - _subtractedValue);
    }

    return true;
  }

  /**
   * @dev Moves tokens `amount` from `_sender` to `_recipient`.
   *
   * This is internal function is equivalent to {transfer}, and can be used to
   * e.g. implement automatic token fees, slashing mechanisms, etc.
   *
   * Emits a {Transfer} event.
   *
   * Requirements:
   *
   * - `_sender` cannot be the zero address.
   * - `_recipient` cannot be the zero address.
   * - `_sender` must have a balance of at least `amount`.
   */
  function _transfer(
    address _sender,
    address _recipient,
    uint256 _amount
  ) internal virtual {
    require(_sender != address(0), "ERC20: transfer from the zero address");
    require(_recipient != address(0), "ERC20: transfer to the zero address");

    _beforeTokenTransfer(_sender, _recipient, _amount);

    uint256 fromBalance = _balances[_sender];
    require(fromBalance >= _amount, "ERC20: transfer amount exceeds balance");
    unchecked {
      _balances[_sender] = fromBalance - _amount;
      // Overflow not possible: the sum of all balances is capped by totalSupply, and the sum is preserved by
      // decrementing then incrementing.
      _balances[_recipient] += _amount;
    }

    emit Transfer(_sender, _recipient, _amount);

    _afterTokenTransfer(_sender, _recipient, _amount);
  }

  /** @dev Creates `_amount` tokens and assigns them to `_account`, increasing
   * the total supply.
   *
   * Emits a {Transfer} event with `from` set to the zero address.
   *
   * Requirements:
   *
   * - `to` cannot be the zero address.
   */
  function _mint(address _account, uint256 _amount) internal virtual {
    require(_account != address(0), "ERC20: mint to the zero address");

    _beforeTokenTransfer(address(0), _account, _amount);

    _totalSupply += _amount;
    unchecked {
      // Overflow not possible: balance + amount is at most totalSupply + amount, which is checked above.
      _balances[_account] += _amount;
    }
    emit Transfer(address(0), _account, _amount);

    _afterTokenTransfer(address(0), _account, _amount);
  }

  /**
   * @dev Destroys `_amount` tokens from `_account`, reducing the
   * total supply.
   *
   * Emits a {Transfer} event with `to` set to the zero address.
   *
   * Requirements:
   *
   * - `_account` cannot be the zero address.
   * - `_account` must have at least `_amount` tokens.
   */
  function _burn(address _account, uint256 _amount) internal virtual {
    require(_account != address(0), "ERC20: burn from the zero address");

    _beforeTokenTransfer(_account, address(0), _amount);

    uint256 accountBalance = _balances[_account];
    require(accountBalance >= _amount, "ERC20: burn amount exceeds balance");
    unchecked {
      _balances[_account] = accountBalance - _amount;
      // Overflow not possible: amount <= accountBalance <= totalSupply
      _totalSupply -= _amount;
    }

    emit Transfer(_account, address(0), _amount);

    _afterTokenTransfer(_account, address(0), _amount);
  }

  /**
   * @dev Sets `_amount` as the allowance of `_spender` over the `_owner` s tokens.
   *
   * This internal function is equivalent to `approve`, and can be used to
   * e.g. set automatic allowances for certain subsystems, etc.
   *
   * Emits an {Approval} event.
   *
   * Requirements:
   *
   * - `_owner` cannot be the zero address.
   * - `_spender` cannot be the zero address.
   */
  function _approve(
    address _owner,
    address _spender,
    uint256 _amount
  ) internal virtual {
    require(_owner != address(0), "ERC20: approve from the zero address");
    require(_spender != address(0), "ERC20: approve to the zero address");

    _allowances[_owner][_spender] = _amount;
    emit Approval(_owner, _spender, _amount);
  }

  /**
   * @dev Updates `_owner` s allowance for `_spender` based on spent `_amount`.
   *
   * Does not update the allowance amount in case of infinite allowance.
   * Revert if not enough allowance is available.
   *
   * Might emit an {Approval} event.
   */
  function _spendAllowance(
    address _owner,
    address _spender,
    uint256 _amount
  ) internal virtual {
    uint256 currentAllowance = allowance(_owner, _spender);
    if (currentAllowance != type(uint256).max) {
      require(currentAllowance >= _amount, "ERC20: insufficient allowance");
      unchecked {
        _approve(_owner, _spender, currentAllowance - _amount);
      }
    }
  }

  /**
   * @dev Hook that is called before any transfer of tokens. This includes
   * minting and burning.
   *
   * Calling conditions:
   *
   * - when `_from` and `_to` are both non-zero, `_amount` of ``_from``'s tokens
   * will be to transferred to `_to`.
   * - when `_from` is zero, `_amount` tokens will be minted for `_to`.
   * - when `_to` is zero, `_amount` of ``_from``'s tokens will be burned.
   * - `_from` and `_to` are never both zero.
   *
   * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
   */
  function _beforeTokenTransfer(
    address _from,
    address _to,
    uint256 _amount
  ) internal virtual {}

  /**
   * @dev Hook that is called after any transfer of tokens. This includes
   * minting and burning.
   *
   * Calling conditions:
   *
   * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
   * has been transferred to `to`.
   * - when `from` is zero, `amount` tokens have been minted for `to`.
   * - when `to` is zero, `amount` of ``from``'s tokens have been burned.
   * - `from` and `to` are never both zero.
   *
   * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
   */
  function _afterTokenTransfer(
    address _from,
    address _to,
    uint256 _amount
  ) internal virtual {}

  /**
   * @dev See {IERC20Permit-permit}.
   * @notice Sets approval from owner to spender to value
   * as long as deadline has not passed
   * by submitting a valid signature from owner
   * Uses EIP 712 structured data hashing & signing
   * https://eips.ethereum.org/EIPS/eip-712
   * @param _owner The account setting approval & signing the message
   * @param _spender The account receiving approval to spend owner's tokens
   * @param _value The amount to set approval for
   * @param _deadline The timestamp before which the signature must be submitted
   * @param _v ECDSA signature v
   * @param _r ECDSA signature r
   * @param _s ECDSA signature s
   */
  function permit(
    address _owner,
    address _spender,
    uint256 _value,
    uint256 _deadline,
    uint8 _v,
    bytes32 _r,
    bytes32 _s
  ) public virtual override {
    require(block.timestamp <= _deadline, "ERC20Permit: expired deadline");

    bytes32 _structHash = keccak256(
      abi.encode(_PERMIT_TYPEHASH, _owner, _spender, _value, _useNonce(_owner), _deadline)
    );

    bytes32 _hash = _hashTypedDataV4(_structHash);

    address _signer = ECDSA.recover(_hash, _v, _r, _s);
    require(_signer == _owner, "ERC20Permit: invalid signature");

    _approve(_owner, _spender, _value);
  }

  /**
   * @dev See {IERC20Permit-nonces}.
   */
  function nonces(address _owner) public view virtual override returns (uint256) {
    return _nonces[_owner].current();
  }

  /**
   * @dev See {IERC20Permit-DOMAIN_SEPARATOR}.
   * This is ALWAYS calculated at runtime because the token name is mutable, not constant.
   */
  function DOMAIN_SEPARATOR() external view override returns (bytes32) {
    return _domainSeparatorV4();
  }

  /**
   * @dev "Consume a nonce": return the current value and increment.
   * @dev See {EIP712._buildDomainSeparator}
   */
  function _useNonce(address _owner) internal virtual returns (uint256 current) {
    Counters.Counter storage nonce = _nonces[_owner];
    current = nonce.current();
    nonce.increment();
  }

  /**
   * @dev Returns the domain separator for the current chain.
   * @dev See {EIP712._buildDomainSeparator}
   */
  function _domainSeparatorV4() internal view returns (bytes32) {
    if (address(this) == _CACHED_THIS && block.chainid == _CACHED_CHAIN_ID) {
      return _CACHED_DOMAIN_SEPARATOR;
    } else {
      return _buildDomainSeparator(_TYPE_HASH, _HASHED_NAME, _HASHED_VERSION);
    }
  }

  /**
   * @dev See {EIP712._buildDomainSeparator}. Made internal to allow usage in parent class.
   */
  function _buildDomainSeparator(
    bytes32 typeHash,
    bytes32 nameHash,
    bytes32 versionHash
  ) internal view returns (bytes32) {
    return keccak256(abi.encode(typeHash, nameHash, versionHash, block.chainid, address(this)));
  }

  /**
   * @dev Given an already https://eips.ethereum.org/EIPS/eip-712#definition-of-hashstruct[hashed struct], this
   * function returns the hash of the fully encoded EIP712 message for this domain.
   *
   * This hash can be used together with {ECDSA-recover} to obtain the signer of a message. For example:
   *
   * ```solidity
   * bytes32 digest = _hashTypedDataV4(keccak256(abi.encode(
   *     keccak256("Mail(address to,string contents)"),
   *     mailTo,
   *     keccak256(bytes(mailContents))
   * )));
   * address signer = ECDSA.recover(digest, signature);
   * ```
   */
  function _hashTypedDataV4(bytes32 structHash) internal view virtual returns (bytes32) {
    return ECDSA.toTypedDataHash(_domainSeparatorV4(), structHash);
  }
}
