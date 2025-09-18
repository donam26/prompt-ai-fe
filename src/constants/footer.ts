/**
 * Footer constants and configuration
 */

export const FOOTER_NAVIGATION = {
  information: [
    { href: "/", label: "Trang chủ" },
    { href: "/thu-vien-prompt", label: "Prompt" },
    { href: "/product", label: "Tài Liệu AI" },
    { href: "/contact", label: "Liên Hệ" },
    { href: "/blog", label: "Blog" },
    { href: "/pricing", label: "Gói dịch vụ" },
  ],
  legal: [
    { href: "/bao-mat", label: "Chính sách bảo mật" },
    { href: "/dieu-khoan-chung", label: "Điều khoản và giao dịch chung" },
    { href: "/dieu-khoan-dich-vu", label: "Điều khoản dịch vụ" },
    { href: "/hoan-tien", label: "Chính sách hoàn tiền" },
    { href: "/cookies", label: "Chính sách cookie" },
    { href: "/payment-guide", label: "Hướng dẫn thanh toán VNPay" },
  ],
} as const;

export const SOCIAL_LINKS = [
  {
    href: "https://facebook.com",
    icon: "/icons/social/facebook2.svg",
    alt: "Facebook",
    label: "Facebook",
  },
  {
    href: "https://twitter.com",
    icon: "/icons/social/twitter.svg",
    alt: "Twitter",
    label: "Twitter",
  },
  {
    href: "https://instagram.com",
    icon: "/icons/social/ig.svg",
    alt: "Instagram",
    label: "Instagram",
  },
  {
    href: "https://linkedin.com",
    icon: "/icons/social/linkdle.svg",
    alt: "LinkedIn",
    label: "LinkedIn",
  },
] as const;

export const FOOTER_IMAGES = {
  logo: "/images/logos/logo.png",
  boCongThuong: "/images/logos/logoBoCongThuong.png",
} as const;

export const FOOTER_CONFIG = {
  companyName: "Prom",
  currentYear: new Date().getFullYear(),
  emailPlaceholder: "Địa chỉ email của bạn",
  subscribeButtonText: "Đăng ký",
  boCongThuongLink: "http://online.gov.vn/Website/chi-tiet-130742",
} as const;
