import { Client } from "ntp-time";

const ntpClient = new Client("a.st1.ntp.br", 123, { timeout: 5000 });

export const getNtpTime = async () => {
  const time = await ntpClient.syncTime();
  return Math.floor(time.destinationTimestamp / 1000); // in seconds
};
