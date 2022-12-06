import { axiosGet as _axiosGet, axiosPost as _axiosPost } from "@connext/nxtp-utils";
import { Twilio as _Twilio } from "twilio";
import { MessageInstance } from "twilio/lib/rest/api/v2010/account/message";

export const axiosGet = _axiosGet;
export const axiosPost = _axiosPost;

export const Twilio = _Twilio;
export const sendMessageViaTwilio = async (
  accountSid: string,
  authToken: string,
  textContext: { body: string; to: string; from: string },
): Promise<MessageInstance> => {
  const client = new Twilio(accountSid, authToken);
  return await client.messages.create(textContext);
};
