import { delay } from "@connext/nxtp-utils";

export const pollSomething = async (input: { attempts: number; parity: number; method: () => Promise<any> }) => {
  const { attempts, parity, method } = input;
  for (let i = 0; i < attempts; i++) {
    const result = await method();
    if (result) {
      return result;
    }
    await delay(parity);
  }
};
