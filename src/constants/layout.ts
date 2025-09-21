/**
 * Layout constants and configuration
 */

export const LAYOUT_NAVIGATION = {
  items: [
    { href: "/", label: "Trang chủ" },
    { href: "/thu-vien-prompt", label: "Prompt & Nâng Cấp" },
    { href: "/product", label: "Tài Liệu AI" },
    { href: "/blog", label: "Blog" },
    { href: "/pricing", label: "Gói Dịch Vụ" },
    { href: "/contact", label: "Liên Hệ" },
  ],
} as const;

export const LAYOUT_IMAGES = {
  logo: "/images/logos/logo.png",
  logoAlt: "logo",
  logoWidth: 120,
  logoHeight: 40,
} as const;

export const LAYOUT_ROUTES = {
  home: "/",
  homeAlt: "/home",
  login: "/login",
  register: "/register",
  userInfo: "/user-information",
  userInfoFavorites: "/user-information?tab=favorites",
  settings: "/settings",
} as const;

export const LAYOUT_LABELS = {
  navigation: {
    home: "Trang chủ",
    prompt: "Prompt & Nâng Cấp",
    product: "Tài Liệu AI",
    blog: "Blog",
    pricing: "Gói Dịch Vụ",
    contact: "Liên Hệ",
  },
  auth: {
    login: "Đăng Nhập",
    register: "Đăng Ký",
    logout: "Đăng xuất",
  },
  user: {
    favorites: "Yêu thích",
    profile: "Thông tin cá nhân",
    settings: "Cài đặt",
  },
  footer: {
    information: "Thông tin",
    learnMore: "Tìm hiểu",
    subscribe: "Đăng ký",
    emailPlaceholder: "Địa chỉ email của bạn",
    copyright: "All rights reserved © by",
  },
} as const;

export const LAYOUT_CONFIG = {
  mobileMenuBreakpoint: "lg",
  logoPriority: true,
  showFooterOnPages: ["/", "/home"],
} as const;
