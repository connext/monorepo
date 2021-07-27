import hyperid from "hyperid";
const hId = hyperid();

/**
 * Gets a unique identifier.
 * @returns UUID
 */
export const getUuid = () => hId();

export type RequestContext = {
  id: string;
  origin: string;
};

/**
 * Creates a RequestContext that logs across functions.
 * @param origin The origin of the request
 * @returns
 */
export const createRequestContext = (origin: string): RequestContext => {
  return { id: getUuid(), origin };
};
