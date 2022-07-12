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
export type BaseRequestContext = {
  id: string;
  origin: string;
};

export type RequestContextWithTransactionId = BaseRequestContext & {
  transferId: string;
};

export type RequestContext<T extends string | undefined = undefined> = T extends undefined
  ? BaseRequestContext
  : RequestContextWithTransactionId;

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
export function createRequestContext<T extends string | undefined = undefined>(
  origin: string,
  transferId?: T,
): RequestContext<T> {
  const id = getUuid();
  if (transferId) {
    return { id, origin, transferId } as RequestContext<string>;
  }
  // FIXME: why will it not play nicely
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return { id, origin } as RequestContext<undefined>;
}

/**
 * Creates a MethodContext that logs within functions
 * @param name The method name
 * @returns {MethodContext}
 */
export const createMethodContext = (name: string): MethodContext => {
  return { id: getUuid(), name };
};

export const createLoggingContext = <T extends string | undefined = undefined>(
  methodName: string,
  inherited?: RequestContext<T>,
  transferId?: T,
) => {
  if (transferId && inherited) {
    inherited = {
      transferId,
      ...inherited,
    };
  }
  return {
    methodContext: createMethodContext(methodName),
    requestContext: inherited ?? createRequestContext<T>(methodName, transferId),
  };
};
