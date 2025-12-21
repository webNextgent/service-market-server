import twilio from "twilio";
import { envVars } from "../../config/env";

const client = twilio(envVars.TWILIO_ACCOUNT_SID, envVars.TWILIO_AUTH_TOKEN);

type OtpRecord = { otp: string; expiresAt: number; attempts: number };
const otpStore = new Map<string, OtpRecord>();

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function normalizePhone(phone: string): string {
  let p = phone.trim();
  if (!p.startsWith("+")) p = "+" + p.replace(/^0+/, "");
  return p;
}

export const otpService = {
  sendOTP: async (data: { phone: string }) => {
    const phone = normalizePhone(data.phone);
    const otp = "rakib";
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 mins

    otpStore.set(phone, { otp, expiresAt, attempts: 0 });

    if (process.env.TEST_MODE === "true") {
      console.log(`[TEST_MODE] OTP for ${phone}: ${otp}`);
      return { success: true, method: "test", otp };
    }

    try {
      const message = await client.messages.create({
        // from: envVars.TWILIO_PHONE_NUMBER,
        to: phone,
        body: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
        messagingServiceSid: "MGa339ed902c716fde86c1a281f3c4cffa",
      });
      console.log(message);
      return { success: true, method: "sms", messageId: message.sid };
    } catch (error: any) {
      console.error("Twilio SMS error:", error.message);
      return { success: false, message: error.message };
    }
  },

  verifyOTP: (phone: string, otp: string) => {
    const formatted = normalizePhone(phone);
    const record = otpStore.get(formatted);
    if (!record) return { success: false, message: "OTP not found or expired" };

    if (Date.now() > record.expiresAt) {
      otpStore.delete(formatted);
      return { success: false, message: "OTP expired" };
    }

    if (record.otp === otp) {
      otpStore.delete(formatted);
      return { success: true, message: "OTP verified successfully" };
    } else {
      record.attempts += 1;
      otpStore.set(formatted, record);
      return {
        success: false,
        message: `Invalid OTP. ${3 - record.attempts} attempts remaining`,
      };
    }
  },
};
