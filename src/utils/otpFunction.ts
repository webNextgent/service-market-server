import axios from "axios";
import { envVars } from "../config/env";

export const sendWhatsappViaMYRC = async (
  phone: string,
  message: string
) => {
  const payload = {
    api_key: envVars.MYRC_API_KEY,
    sender: envVars.MYRC_SENDER,
    number: phone,
    message,
    footer: "Sent via mpcpest",
  };

  const { data } = await axios.post(
    envVars.MYRC_API_URL,
    payload,
    { headers: { "Content-Type": "application/json" } }
  );

  if (!data.status) {
    throw new Error(data.msg || "MYRC message failed");
  }

  return data;
};
