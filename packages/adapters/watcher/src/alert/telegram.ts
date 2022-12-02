import https from "https";

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

// t.me/ConnextWatcherBot
const apikey = "5903777140:AAEEspBx-lGTMENudZwt8vpidaJeSGaVFj0";
const chatId = "happyliu130";

export const alertViaTelegram = async (report: Report) => {
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

  logger.info("Sending message via telegram", requestContext, methodContext, {
    timestamp,
    event,
    reason,
    errors,
    domains,
    relevantTransactions,
    rpcs,
  });

  try {
    const telegram = new Telegram(apikey);
    await telegram.send(chatId, "*Hello World\\!*", Telegram_ParseModes.MarkdownV2);
  } catch (e: unknown) {
    console.log(e);
  }
};
