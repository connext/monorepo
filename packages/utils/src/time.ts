/**
 * Gets the current time in seconds.
 * @returns The current time in seconds.
 */
export const getNtpTimeSeconds = async () => {
  return Math.floor(Date.now() / 1000);
};
