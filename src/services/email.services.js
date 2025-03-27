import { createTransport } from "nodemailer";
import 'dotenv/config';

class EmailServices {
  constructor() {
    this.transporter = createTransport({
      service: "gmail",
      secure: true,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  sendEmail = async (to, subject, html) => {
    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
      });
    } catch (error) {
      throw error;
    }
  };
}

export const emailService = new EmailServices();