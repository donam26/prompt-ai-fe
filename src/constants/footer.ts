/**
 * Footer constants and configuration
 */

export const FOOTER_NAVIGATION = {
  menu: [
    { href: "/", label: "Prom" },
    { href: "/thu-vien-prompt", label: "Công cụ" },
    { href: "/product", label: "Sản phẩm" },
    { href: "/blog", label: "Bài viết" },
    { href: "/pricing", label: "Bảng giá" },
    { href: "/contact", label: "Liên hệ" },
  ],
  company: [
    { href: "/customer-service", label: "Dịch vụ khách hàng" },
    { href: "/recruitment", label: "Tuyển dụng" },
    { href: "/faqs", label: "FAQs" },
  ],
  legal: [
    { href: "/bao-mat", label: "Chính sách bảo mật" },
    { href: "/dieu-khoan-dich-vu", label: "Điều khoản dịch vụ" },
    { href: "/cookies", label: "Chính sách Cookies" },
  ],
} as const;

export const MOBILE_FOOTER_NAVIGATION = {
  company: [
    { href: "/customer-service", label: "Customer Help Center" },
    { href: "/careers", label: "Careers" },
    { href: "/faqs", label: "FAQs" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
  ],
  mainNav: [
    { href: "/", label: "Home", isActive: true },
    { href: "/thu-vien-prompt", label: "Prompt", isActive: false },
    { href: "/tools", label: "Tools", isActive: false },
    { href: "/products", label: "Products", isActive: false },
    { href: "/blog", label: "Blog", isActive: false },
    { href: "/pricing", label: "Pricing", isActive: false },
    { href: "/contact", label: "Contact", isActive: false },
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
  logo: "/icons/ui/logo.svg",
  boCongThuong: "/images/logos/logoBoCongThuong.png",
} as const;

export const FOOTER_CONFIG = {
  companyName: "Prom",
  currentYear: new Date().getFullYear(),
  emailPlaceholder: "Địa chỉ email của bạn",
  subscribeButtonText: "Đăng ký",
  boCongThuongLink: "http://online.gov.vn/Website/chi-tiet-130742",
} as const;
