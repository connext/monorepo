import hyperid from "hyperid";
const hId = hyperid();

/**
 * Gets a unique identifier.
 * @returns UUID
 */
export const getUuid = () => hId();

/**
 * Top-level identifier. I.e. API function that was called
 */
export type RequestContext = {
  id: string;
  origin: string;
  transactionId?: string;
};

/**
 * Low-level identifier. I.e. what function am i in now
 */
export type MethodContext = {
  id: string;
  name: string;
};

/**
 * Creates a RequestContext that logs across functions.
 * @param origin The origin of the request
 * @returns
 */
export const createRequestContext = (origin: string, transactionId?: string): RequestContext => {
  const id = getUuid();
  return transactionId ? { id, origin, transactionId } : { id, origin };
};

/**
 * Creates a MethodContext that logs within functions
 * @param name The method name
 * @returns {MethodContext}
 */
export const createMethodContext = (name: string) => {
  return { id: getUuid(), name };
};

export const createLoggingContext = (methodName: string, inherited?: RequestContext, transactionId?: string) => {
  return {
    methodContext: createMethodContext(methodName),
    requestContext: inherited ?? createRequestContext(methodName, transactionId),
  };
};
