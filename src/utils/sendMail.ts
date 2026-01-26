import nodemailer from "nodemailer";
import { envVars } from "../config/env";

interface SendEmailPayload {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

const sendEmail = async ({
  to,
  subject,
  html,
  text,
}: SendEmailPayload) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: envVars.EMAIL,
      pass: envVars.PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"mpcpest control" <${envVars.EMAIL}>`,
    to,
    subject,
    html, 
    text,
  });
};

export default sendEmail;
