export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface VerifyEmailPayload {
  email: string;
  otp: string;
}
export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  newPassword: string;
  otp: string;
}
