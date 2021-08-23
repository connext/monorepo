import { fetchJson } from "ethers/lib/utils";

import { isNode } from "./env";
/**
 * Gets the current time in seconds. On browser environments, use a server to avoid issues where
 * the user's clock is out of sync.
 * @returns The current time in seconds.
 */
export const getNtpTimeSeconds = async () => {
  if (isNode()) {
    return Math.floor(Date.now() / 1000);
  }
  const time = await fetchJson("https://www.timeapi.io/api/Time/current/zone?timeZone=UTC");
  return Math.floor(Date.parse(time.dateTime) / 1000);
};
