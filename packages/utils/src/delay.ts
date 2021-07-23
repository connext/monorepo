/**
 * Creates a promise that resolves after a specified period
 *
 * @param ms - Time to wait for resolution
 */
export const delay = (ms: number): Promise<void> => new Promise((res: any): any => setTimeout(() => res, ms));
