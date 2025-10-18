/**
 * Constants for Verify OTP module
 */

/**
 * OTP input configuration
 */
export const OTP_CONFIG = {
  MAX_LENGTH: 6,
  MIN_LENGTH: 6,
  PLACEHOLDER: "Nhập mã OTP 6 số",
} as const;

/**
 * UI text constants
 */
export const VERIFY_OTP_TEXT = {
  TITLE: "Xác thực tài khoản",
  SUBTITLE: "Nhập mã OTP đã được gửi đến email của bạn",
  FORM_TITLE: "Nhập mã OTP",
  BACK_TO_LOGIN: "Quay lại đăng nhập",
  VERIFY_BUTTON: "Xác thực",
  RESEND_BUTTON: "Gửi lại mã OTP",
  OTP_LABEL: "Mã OTP",
} as const;

/**
 * CSS classes for consistent styling
 */
export const VERIFY_OTP_CLASSES = {
  CONTAINER: "flex justify-center items-center bg-white p-4 min-h-screen",
  CARD_CONTAINER: "w-full max-w-md",
  HEADER_SECTION: "mb-8 text-center",
  BACK_LINK:
    "inline-flex items-center mb-4 text-purple-600 hover:text-purple-700",
  FORM_SPACING: "space-y-4",
  INPUT_SPACING: "space-y-2",
  RESEND_SECTION: "mt-6 text-center",
} as const;
