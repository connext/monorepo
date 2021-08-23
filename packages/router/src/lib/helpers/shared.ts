import { getNtpTimeSeconds as _getNtpTimeSeconds } from "@connext/nxtp-utils";

/**
 * Helper to allow easy mocking
 */
export const getNtpTimeSeconds = async () => {
  return await _getNtpTimeSeconds();
};
