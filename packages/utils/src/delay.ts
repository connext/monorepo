/**
 * Creates a promise that resolves after a specified period
 *
 * @param ms - Time to wait for resolution
 */
// eslint-disable-next-line @typescript-eslint/no-implied-eval
export const delay = (ms: number): Promise<void> => new Promise((res: any): any => setTimeout(res, ms));

export const delayAndThrow = (ms: number, msg = ""): Promise<undefined> =>
  new Promise((res: any, rej: any): any => setTimeout((): undefined => rej(new Error(msg)), ms));
