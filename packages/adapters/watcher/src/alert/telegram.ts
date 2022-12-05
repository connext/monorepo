import { jsonifyError } from "@connext/nxtp-utils";
import https from "https";

import { WatcherConfig } from "../config";
import { Report } from "../types";

enum Telegram_ParseModes {
  MarkdownV2,
  HTML,
}

class Telegram {
  private readonly api: string;

  constructor(api: string) {
    this.api = api;
  }

  public async send(id: number | string, text: string, parseMode?: Telegram_ParseModes): Promise<boolean> {
    return (
      await this.request("/sendMessage", {
        chat_id: id,
        text: text,
        parse_mode: parseMode === undefined ? undefined : Telegram_ParseModes[parseMode],
      })
    ).ok;
  }

  private request<T extends Record<string, any>>(
    path: string,
    data?: Record<string, any>,
  ): Promise<{ ok: boolean } & Partial<T>> {
    return new Promise((resolve, reject) => {
      const req = https
        .request(
          "https://api.telegram.org/bot" + this.api + path,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
          },
          (res) => {
            let result = "";

            res
              .setEncoding("utf-8")
              .on("data", (chunk) => {
                result += chunk;
              })
              .on("end", () => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                resolve(JSON.parse(result));
              });
          },
        )
        .on("error", reject);

      if (data) {
        req.write(JSON.stringify(data));
      }

      req.end();
    });
  }
}

export const alertViaTelegram = async (report: Report, config: WatcherConfig) => {
  const {
    timestamp,
    event,
    reason,
    errors,
    logger,
    requestContext,
    methodContext,
    domains,
    relevantTransactions,
    rpcs,
  } = report;

  const { telegramChatId, telegramApiKey } = config;
  if (!telegramChatId || !telegramApiKey) {
    logger.error(
      "Failed to alert via telegram",
      requestContext,
      methodContext,
      jsonifyError(new Error("Telegram alert config is invalid!")),
    );
    throw new Error("alertViaTelegram: Telegram alert config is invalid!");
  }

  logger.info("Sending message via telegram", requestContext, methodContext, {
    timestamp,
    event,
    reason,
    errors,
    domains,
    relevantTransactions,
    rpcs,
  });

  const telegram = new Telegram(telegramApiKey);
  return await telegram.send(telegramChatId, "*Hello World\\!*", Telegram_ParseModes.MarkdownV2);
};
