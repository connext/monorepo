type ErrorsType = {
  [key: string]: string;
};

/**
 * @remarks Maps the error codes to human readable strings
 */
export const Errors: ErrorsType = {
  "001": "ROUTER_EMPTY",
  "002": "AMOUNT_IS_ZERO",
  "003": "BAD_ROUTER",
  "004": "BAD_ASSET",
  "005": "VALUE_MISMATCH",
  "006": "ETH_WITH_ERC_TRANSFER",
  "007": "RECIPIENT_EMPTY",
  "008": "INSUFFICIENT_FUNDS",
  "009": "USER_EMPTY",
  "010": "SENDING_CHAIN_FALLBACK_EMPTY",
  "011": "SAME_CHAINIDS",
  "012": "INVALID_CHAINIDS",
  "013": "TIMEOUT_TOO_LOW",
  "014": "TIMEOUT_TOO_HIGH",
  "015": "DIGEST_EXISTS",
  "016": "ROUTER_MISMATCH",
  "017": "ETH_WITH_ROUTER_PREPARE",
  "018": "INSUFFICIENT_LIQUIDITY",
  "019": "INVALID_VARIANT_DATA",
  "020": "EXPIRED",
  "021": "ALREADY_COMPLETED",
  "022": "INVALID_SIGNATURE",
  "023": "INVALID_RELAYER_FEE",
  "024": "INVALID_CALL_DATA",
  "025": "ROUTER_MUST_CANCEL",
  "026": "RECEIVING_ADDRESS_EMPTY",
  "027": "NOT_TRANSACTION_MANAGER",
  "028": "TRANSFER_FAILED",
  "029": "NOT_OWNER",
  "030": "DELAY_NOT_ELAPSED",
  "031": "NOT_CONTRACT",
  "032": "ALREADY_ADDED",
  "033": "NOT_ADDED",
  "034": "NO_NATIVE_ASSET",
  "035": "NOT_PROPOSED_OWNER",
  "036": "INVALID_PROPOSAL",
  "037": "NO_PROPOSAL",
  "038": "ALREADY_RENOUNCED",
};

type ErrorsPrefixType = {
  [key: string]: string;
};

/**
 * @remarks Describes the prefixex used throughout the contracts to indicate which function the error originates from
 */
export const ErrorsPrefix: ErrorsPrefixType = {
  "#AL": "addLiquidity",
  "#RL": "removeLiquidity",
  "#P": "prepare",
  "#F": "fulfill",
  "#C": "cancel",
  "#IA": "increaseERC20Allowance",
  "#DA": "decreaseERC20Allowance",
  "#OTM": "onlyTransactionManager",
  "#TNA": "transferNativeAsset",
  "#APO": "acceptProposedOwner",
  "#OO": "onlyOwner",
  "#OP": "onlyProposed",
  "#AR": "addRouter",
  "#RR": "removeRouter",
  "#TA": "transferAssetToContract",
  "#PROR": "proposeRouterOwnershipRenunciation",
  "#RRO": "renounceRouterOwnership",
  "#PAOR": "proposeAssetOwnershipRenunciation",
  "#RAO": "renounceAssetOwnership",
  "#PNO": "proposeNewOwner",
  "#RO": "renounceOwnership",
};

/**
 * Gets the human readable error from the string returned from the contract
 *
 * @param error - Contract error thrown
 * @returns Human readable error string
 */
export const getFullError = (error: string): string => {
  const [prefix, index] = error.split(":");

  const fullError: string = ErrorsPrefix[prefix].concat(":").concat(Errors[index]);

  return fullError;
};

/**
 * Gets the contract error from the human readable string
 *
 * @param error - Contract error
 * @returns Human readable translation of the error
 */
export const getContractError = (error: string): string => {
  const [prefix_value, error_value] = error.split(":");

  const shortError: string = Object.keys(ErrorsPrefix)
    .find((key) => ErrorsPrefix[key] === prefix_value.trim())!
    .concat(":")
    .concat(Object.keys(Errors).find((key) => Errors[key] === error_value.trim())!);

  return shortError;
};
