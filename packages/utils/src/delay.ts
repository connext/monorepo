export const delay = (ms: number): Promise<void> => new Promise((res: any): any => setTimeout(res, ms));
