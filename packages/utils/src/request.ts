import hyperid from "hyperid";
const hId = hyperid();
export const getUuid = () => hId();

export type RequestContext = {
  id: string;
  origin: string;
};

export const createRequestContext = (origin: string): RequestContext => {
  return { id: getUuid(), origin };
};
