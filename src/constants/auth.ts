// Authentication constants and messages

export const AUTH_MESSAGES = {
  LOGIN: {
    SUCCESS: "Đăng nhập thành công",
    FAILED: "Đăng nhập thất bại",
    OTP_SENT: "Mã OTP đã được gửi đến email của bạn",
    INVALID_CREDENTIALS: "Email hoặc mật khẩu không đúng",
    GENERIC_ERROR: "Có lỗi xảy ra khi đăng nhập",
  },
  REGISTER: {
    SUCCESS:
      "Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.",
    FAILED: "Đăng ký thất bại",
    GENERIC_ERROR: "Có lỗi xảy ra khi đăng ký",
    PASSWORD_MISMATCH: "Mật khẩu xác nhận không khớp",
    PASSWORD_TOO_SHORT: "Mật khẩu phải có ít nhất 6 ký tự",
  },
  VALIDATION: {
    PASSWORD_MIN_LENGTH: 6,
  },
} as const;

export const AUTH_LABELS = {
  LOGIN: {
    TITLE: "Chào mừng trở lại",
    SUBTITLE: "Đăng nhập để truy cập thư viện prompt",
    FORM_TITLE: "Đăng nhập",
    EMAIL_DESCRIPTION: "Nhập email để nhận mã OTP",
    PASSWORD_DESCRIPTION: "Nhập email và mật khẩu của bạn",
    EMAIL_PLACEHOLDER: "Nhập email của bạn",
    PASSWORD_PLACEHOLDER: "Nhập mật khẩu của bạn",
    SUBMIT_OTP: "Gửi mã OTP",
    SUBMIT_PASSWORD: "Đăng nhập",
    SWITCH_TO_PASSWORD: "Đăng nhập bằng mật khẩu",
    SWITCH_TO_OTP: "Đăng nhập bằng OTP",
    FORGOT_PASSWORD: "Quên mật khẩu?",
    NO_ACCOUNT: "Chưa có tài khoản?",
    REGISTER_LINK: "Đăng ký ngay",
    BACK_HOME: "Về trang chủ",
  },
  REGISTER: {
    TITLE: "Tạo tài khoản mới",
    SUBTITLE: "Đăng ký để bắt đầu sử dụng thư viện prompt",
    FORM_TITLE: "Đăng ký",
    FORM_DESCRIPTION: "Điền thông tin để tạo tài khoản mới",
    FULL_NAME_PLACEHOLDER: "Nhập họ và tên của bạn",
    EMAIL_PLACEHOLDER: "Nhập email của bạn",
    PASSWORD_PLACEHOLDER: "Nhập mật khẩu (ít nhất 6 ký tự)",
    CONFIRM_PASSWORD_PLACEHOLDER: "Nhập lại mật khẩu",
    SUBMIT: "Đăng ký",
    HAS_ACCOUNT: "Đã có tài khoản?",
    LOGIN_LINK: "Đăng nhập ngay",
    BACK_HOME: "Về trang chủ",
  },
} as const;

export const AUTH_FIELD_NAMES = {
  EMAIL: "email",
  PASSWORD: "password",
  FULL_NAME: "fullName",
  CONFIRM_PASSWORD: "confirmPassword",
} as const;
