export interface SendOTPRequest {
  phone: string;
  purpose: 'LOGIN' | 'REGISTER' | 'VERIFY';
}

export interface VerifyOTPRequest {
  phone: string;
  otp: string;
  purpose: 'LOGIN' | 'REGISTER' | 'VERIFY';
}

export interface CheckPhoneRequest {
  phone: string;
}

export interface RegisterRequest {
  phone: string;
  name?: string;
  email?: string;
  password?: string;
}

export interface LoginRequest {
  phone: string;
  password?: string;
  otp?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user?: {
      id: string;
      phone: string;
      name?: string;
      email?: string;
      role: string;
      isVerified: boolean;
    };
    token?: string;
    expiresIn?: number;
    requiresOTP?: boolean;
    exists?: boolean;
  };
  error?: string;
}