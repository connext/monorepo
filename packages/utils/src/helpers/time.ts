/**
 * Gets the current time in seconds.
 * @returns The current time in seconds.
 */
export const getNtpTimeSeconds = () => {
  return Math.floor(Date.now() / 1000);
};

/**
 * Creates a promise that resolves after a specified period
 *
 * @param ms - Time to wait for resolution
 */
// eslint-disable-next-line @typescript-eslint/no-implied-eval
export const delay = (ms: number): Promise<void> => new Promise((res: () => void): any => setTimeout(res, ms));

export const delayAndThrow = (ms: number, msg = ""): Promise<undefined> =>
  new Promise((_: any, rej: any): any => setTimeout((): undefined => rej(new Error(msg)), ms));
