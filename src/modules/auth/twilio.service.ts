import twilio from 'twilio';

export class TwilioService {
  private client: twilio.Twilio;
  private fromNumber: string;

  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    
    if (!accountSid || !authToken) {
      throw new Error('Twilio credentials are not configured');
    }

    this.client = twilio(accountSid, authToken);
    this.fromNumber = process.env.TWILIO_PHONE_NUMBER || '+13083205264';
  }

  async sendSMS(to: string, body: string) {
    try {
      const message = await this.client.messages.create({
        body,
        from: this.fromNumber,
        to,
      });

      console.log(`SMS sent to ${to}: ${message.sid}`);
      
      return {
        success: true,
        messageId: message.sid,
        status: message.status
      };
    } catch (error: any) {
      console.error('Twilio SMS error:', error.message);
      
      return {
        success: false,
        error: error.message,
        code: error.code
      };
    }
  }

  async sendOTP(to: string, otp: string, purpose: string) {
    let message: string;
    
    switch (purpose) {
      case 'LOGIN':
        message = `Your login OTP is: ${otp}. Valid for 10 minutes.`;
        break;
      case 'REGISTER':
        message = `Your registration OTP is: ${otp}. Valid for 10 minutes.`;
        break;
      case 'VERIFY':
        message = `Your verification OTP is: ${otp}. Valid for 10 minutes.`;
        break;
      default:
        message = `Your OTP is: ${otp}. Valid for 10 minutes.`;
    }

    return this.sendSMS(to, message);
  }
}