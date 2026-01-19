import dotenv from "dotenv";

dotenv.config();

interface EnvVars {
  PORT: string;
  NODE_ENV: string;
  DATABASE_URL: string;
  JWT_ACCESS_SECRET: string;
  JWT_EXPIRES_IN: string;
  BCRYPT_SALT_ROUND: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRED: string;
  TWILIO_PHONE_NUMBER:string;
  TWILIO_AUTH_TOKEN:string;
  TWILIO_ACCOUNT_SID:string
  TWILIO_VERIFY_SERVICE_SID:string
  TWILIO_MESSAGING_SERVICE_SID:string
  TWILIO_WHATSAPP_NUMBER:string
  MYRC_API_KEY:string
  MYRC_SENDER:string
  MYRC_API_URL:string


}

const loadEnvVariables = (): EnvVars => {
  const requiredVars = [
    "PORT",
    "NODE_ENV",
    "DATABASE_URL",
    "JWT_ACCESS_SECRET",
    "JWT_EXPIRES_IN",
    "BCRYPT_SALT_ROUND",
    "JWT_REFRESH_SECRET",
    "JWT_REFRESH_EXPIRED",
    "TWILIO_ACCOUNT_SID",
    "TWILIO_AUTH_TOKEN",
    "TWILIO_PHONE_NUMBER",
    "TWILIO_VERIFY_SERVICE_SID",
    "TWILIO_MESSAGING_SERVICE_SID",
    "TWILIO_WHATSAPP_NUMBER",
    "MYRC_API_KEY",
    "MYRC_SENDER",
    "MYRC_API_URL",
    
  ];
  requiredVars.forEach((key) => {
    if (!process.env[key]) {
      {
        throw new Error(`Environment variable ${key}is not set`);
      }
    }
  });
  return {
    PORT: process.env.PORT as string,
    NODE_ENV: process.env.NODE_ENV as string,
    DATABASE_URL: process.env.DATABASE_URL as string,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    JWT_REFRESH_EXPIRED: process.env.JWT_REFRESH_EXPIRED as string,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID as string,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN as string,
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER as string,
    TWILIO_VERIFY_SERVICE_SID: process.env.TWILIO_VERIFY_SERVICE_SID as string,
    TWILIO_MESSAGING_SERVICE_SID: process.env.TWILIO_MESSAGING_SERVICE_SID as string,
    TWILIO_WHATSAPP_NUMBER: process.env.TWILIO_WHATSAPP_NUMBER as string,
    MYRC_API_KEY: process.env.MYRC_API_KEY as string,
    MYRC_SENDER: process.env.MYRC_SENDER as string,
    MYRC_API_URL: process.env.MYRC_API_URL as string,
    
  };
};

export const envVars = loadEnvVariables();
