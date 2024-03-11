// Messages are formatted:
// prefix (76 bytes) + data (variable length)
// where prefix:
// domain (4 bytes) + sender (32 bytes) + nonce (4 bytes) + destination domain (4 bytes) + recipient (32 bytes)

export const MESSAGE_PREFIX_LENGTH = 76;

export const parseBodyFromMessage = (message: string): string => {
  // you want to splice out prefix
  return parseSubstring(message, MESSAGE_PREFIX_LENGTH);
};

export const parseOriginFromMessage = (message: string): string => {
  return parseSubstring(message, 0, 4);
};

export const parseSenderFromMessage = (message: string): string => {
  return parseSubstring(message, 4, 32);
};

export const parseNonceFromMessage = (message: string): string => {
  return parseSubstring(message, 4 + 32, 4);
};

export const parseDestinationFromMessage = (message: string): string => {
  return parseSubstring(message, 4 + 32 + 4, 4);
};

export const parseRecipientFromMessage = (message: string): string => {
  return parseSubstring(message, 4 + 32 + 4 + 4, 32);
};

const parseSubstring = (message: string, bytesToStrip: number, bytesLength?: number): string => {
  const stripped = message.startsWith("0x")
    ? message.slice(2).substring(bytesToStrip * 2)
    : message.substring(bytesToStrip * 2);
  return `0x${bytesLength ? stripped.slice(0, bytesLength * 2) : stripped}`;
};
