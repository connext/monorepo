export { generateForwardCallData as generateInstadappData } from "./Instadapp";
export { generateForwardCallData as generateMidasData } from "./Midas";
export { generateForwardCallData as generateMeanData } from "./Mean";

export const forwardCallData = {
  instadapp: generateInstadappData,
  midas: generateMidasData,
  mean: generateMeanData,
};
