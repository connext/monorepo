import { getNtpTime as _getNtpTime } from "@connext/nxtp-utils";

/**
 * Helper to allow easy mocking
 */
export const getNtpTime = async () => {
  return await _getNtpTime()
};
