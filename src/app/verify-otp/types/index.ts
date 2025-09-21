/**
 * Types for Verify OTP module
 */

/**
 * OTP verification form data
 */
export interface VerifyOTPFormData {
  readonly email: string;
  readonly otp: string;
}

/**
 * OTP verification response
 */
export interface VerifyOTPResponse {
  readonly success: boolean;
  readonly message: string;
  readonly token?: string;
}

/**
 * Resend OTP response
 */
export interface ResendOTPResponse {
  readonly success: boolean;
  readonly message: string;
}

/**
 * OTP verification page props
 */
export interface VerifyOTPPageProps {
  readonly searchParams?: {
    readonly email?: string;
  };
}

/**
 * VerifyOTPContent component props
 */
export interface VerifyOTPContentProps {
  readonly className?: string;
}
