type ErrorsType = {
  [key: string]: string;
};

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
  "016": "USER_MISMATCH",
  "017": "ROUTER_MISMATCH",
  "018": "ETH_WITH_ROUTER_PREPARE",
  "019": "INSUFFICIENT_LIQUIDITY",
  "020": "INVALID_VARIANT_DATA",
  "021": "EXPIRED",
  "022": "ALREADY_COMPLETED",
  "023": "INVALID_SIGNATURE",
  "024": "INVALID_RELAYER_FEE",
  "025": "INVALID_CALL_DATA",
  "026": "ROUTER_MUST_CANCEL",
  "027": "RECEIVING_ADDRESS_EMPTY",
};

type ErrorsPrefixType = {
  [key: string]: string;
};
export const ErrorsPrefix: ErrorsPrefixType = {
  "#AL": "addLiquidity",
  "#RL": "removeLiquidity",
  "#P": "prepare",
  "#F": "fulfill",
  "#C": "cancel",
};

export const getFullError = (error: string): string => {
  const [prefix, index] = error.split(":");

  const fullError: string = ErrorsPrefix[prefix].concat(":").concat(Errors[index]);

  return fullError;
};

export const getContractError = (error: string): string => {
  const [prefix_value, error_value] = error.split(":");

  const shortError: string = Object.keys(ErrorsPrefix)
    .find((key) => ErrorsPrefix[key] === prefix_value.trim())!
    .concat(":")
    .concat(Object.keys(Errors).find((key) => Errors[key] === error_value.trim())!);

  return shortError;
};
