/**
 * Footer constants and configuration
 */

import { ROUTES_URL } from "./routes-url";

export const FOOTER_NAVIGATION = {
  menu: [
    { href: ROUTES_URL.HOME, label: "Prom" },
    { href: ROUTES_URL.PROMPT_LIBRARY, label: "Công cụ" },
    { href: ROUTES_URL.PRODUCT, label: "Sản phẩm" },
    { href: ROUTES_URL.BLOG, label: "Bài viết" },
    { href: ROUTES_URL.PRICING, label: "Bảng giá" },
    { href: ROUTES_URL.CONTACT, label: "Liên hệ" },
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
    { href: ROUTES_URL.HOME, label: "Home", isActive: true },
    { href: ROUTES_URL.PROMPT_LIBRARY, label: "Prompt", isActive: false },
    { href: ROUTES_URL.TOOLS, label: "Tools", isActive: false },
    { href: ROUTES_URL.PRODUCTS, label: "Products", isActive: false },
    { href: ROUTES_URL.BLOG, label: "Blog", isActive: false },
    { href: ROUTES_URL.PRICING, label: "Pricing", isActive: false },
    { href: ROUTES_URL.CONTACT, label: "Contact", isActive: false },
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
