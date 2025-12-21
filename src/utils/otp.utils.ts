export const generateOTP = (length: number = 6): string => {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
};

export const getOTPExpiry = (minutes: number = 10): Date => {
  const expiry = new Date();
  expiry.setMinutes(expiry.getMinutes() + minutes);
  return expiry;
};

export const isOTPExpired = (expiryDate: Date): boolean => {
  return new Date() > expiryDate;
};

export const formatPhoneNumber = (phone: string): string => {
  // Ensure phone has + prefix
  if (!phone.startsWith('+')) {
    if (phone.startsWith('01')) {
      return `+880${phone.substring(1)}`;
    } else if (phone.startsWith('1')) {
      return `+88${phone}`;
    } else {
      return `+${phone}`;
    }
  }
  return phone;
};