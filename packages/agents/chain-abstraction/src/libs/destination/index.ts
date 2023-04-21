import { XReceiveTarget } from "../../types";

import { generateForwardCallData as generateInstadappData } from "./Instadapp";
import { generateForwardCallData as generateMidasData } from "./Midas";
import { generateForwardCallData as generateMeanData } from "./Mean";
import { generateForwardCallData as generateXSwapAndGreetData } from "./XSwapAndGreet";

export type ForwardCallDataCallback = (args: any) => Promise<string>;

export const forwardCallData: Record<XReceiveTarget, ForwardCallDataCallback> = {
  Instadapp: generateInstadappData,
  MidasProcotol: generateMidasData,
  MeanFinance: generateMeanData,
  XSwapAndGreet: generateXSwapAndGreetData,
};
