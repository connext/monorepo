import pino, { BaseLogger, Bindings, LoggerOptions } from "pino";

import { NxtpErrorJson } from "./error";
import { createMethodContext, createRequestContext, MethodContext, RequestContext } from "./request";

export type LogLevel = "fatal" | "error" | "warn" | "info" | "debug" | "trace" | "silent";

/**
 * @classdesc Designed to log information in a uniform way to make parsing easier
 */
export class Logger {
  private log: BaseLogger;
  constructor(private readonly opts: LoggerOptions, private readonly forcedLevel?: LogLevel) {
    this.log = pino(this.opts);
  }

  child(bindings: Bindings, forcedLevel?: LogLevel) {
    return new Logger({ ...this.opts, ...bindings }, forcedLevel);
  }

  debug(msg: string, requestContext?: RequestContext, methodContext?: MethodContext, ctx?: any): void {
    this.print(
      this.forcedLevel ?? "debug",
      requestContext,
      methodContext,
      this.forcedLevel ? { ...ctx, intendedLevel: "debug" } : ctx,
      msg,
    );
  }

  info(msg: string, requestContext?: RequestContext, methodContext?: MethodContext, ctx?: any): void {
    this.print(
      this.forcedLevel ?? "info",
      requestContext,
      methodContext,
      this.forcedLevel ? { ...ctx, intendedLevel: "info" } : ctx,
      msg,
    );
  }

  warn(msg: string, requestContext?: RequestContext, methodContext?: MethodContext, ctx?: any): void {
    this.print(
      this.forcedLevel ?? "warn",
      requestContext,
      methodContext,
      this.forcedLevel ? { ...ctx, intendedLevel: "warn" } : ctx,
      msg,
    );
  }

  error(
    msg: string,
    requestContext?: RequestContext,
    methodContext?: MethodContext,
    error?: NxtpErrorJson,
    ctx?: any,
  ): void {
    this.print(
      this.forcedLevel ?? "error",
      requestContext,
      methodContext,
      this.forcedLevel ? { ...ctx, error, intendedLevel: "error" } : { ...ctx, error },
      msg,
    );
  }

  private print(
    level: LogLevel,
    requestContext: RequestContext = createRequestContext("Logger.print"),
    methodContext: MethodContext = createMethodContext("Logger.print"),
    ctx: any = {},
    msg: string,
  ): void {
    return this.log[level]({ requestContext, methodContext, ...ctx }, msg);
  }
}
