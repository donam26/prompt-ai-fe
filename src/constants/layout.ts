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

export const LAYOUT_PAGE = {
  header: {
    container:
      "z-50 relative flex justify-between items-center bg-transparent font-medium px-4 sm:px-6 xl:px-12 w-full h-auto",
    containerHome:
      "z-50 relative flex justify-between items-center bg-gradient-to-r from-blue-50 to-purple-100 font-medium px-4 sm:px-6 xl:px-12 w-full h-auto",
    containerOther:
      "z-50 relative flex justify-between items-center bg-white font-medium px-4 sm:px-6 xl:px-12 w-full h-auto",
    logo: "flex items-center gap-2.5 text-inherit no-underline",
    logoImage: "w-auto h-12",
    desktopNav:
      "hidden lg:flex items-center justify-center gap-4 lg:gap-8 text-base lg:text-xl",
    navItem:
      "font-medium text-base text-gray-800 no-underline transition-colors duration-200 hover:font-bold hover:text-purple-600",
    navItemActive: "font-bold text-purple-600",
    navItemInactive: "text-gray-800",
    rightActions: "flex justify-end items-center gap-5",
    mobileMenuButton:
      "lg:hidden bg-none border-none text-2xl text-black cursor-pointer p-2 z-50 hover:text-purple-600",
    mobileSheet: "w-80",
    mobileNavItem:
      "block px-3 py-2 rounded-md hover:text-purple-600 transition-colors duration-200",
    mobileNavItemActive: "text-purple-600 bg-purple-50",
    mobileNavItemInactive: "text-gray-700",
    mobileAuthSection: "space-y-2 pt-4 border-t",
    mobileAuthItem:
      "block hover:bg-purple-50 px-3 py-2 rounded-md font-bold text-purple-600 transition-colors",
    desktopAuthContainer: "hidden lg:flex items-center gap-5",
    favoritesLink:
      "group flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded transition-all duration-200 cursor-pointer",
    heartIcon:
      "fill-current text-purple-600 group-hover:text-red-500 text-xl transition duration-200",
    loginLink:
      "no-underline text-purple-600 text-lg font-medium transition-colors duration-200 hover:font-bold",
    signupLink:
      "no-underline text-black text-lg font-medium transition-colors duration-200 hover:font-bold",
    signupButton:
      "bg-purple-600 text-white px-6 py-2 rounded-full text-lg font-medium cursor-pointer transition-colors duration-200 hover:bg-purple-700",
    mobileSignupButton:
      "bg-purple-600 text-white px-4 py-2 text-xs h-9 w-20 rounded-full border-none cursor-pointer transition-colors duration-200 hover:bg-purple-700",
    avatar:
      "w-11 h-11 rounded-full flex items-center justify-center overflow-hidden border-none",
    avatarMobile:
      "w-9 h-9 rounded-full flex items-center justify-center overflow-hidden",
    fullname:
      "text-gray-800 font-bold no-underline text-base transition-colors duration-200 cursor-pointer w-fit hover:text-purple-600 hover:font-bold",
    fullnameMobile: "text-sm font-bold leading-5.5 text-gray-800",
    mobileAuthButtons: "hidden w-full mt-5 gap-2.5",
    mobileLoginBtn:
      "block w-full p-3 text-center no-underline rounded-3xl font-semibold transition-all duration-200 text-purple-600 bg-transparent border-2 border-purple-600 hover:bg-purple-50",
    mobileSignupBtn:
      "block w-full p-3 text-center no-underline rounded-3xl font-semibold transition-all duration-200 text-white bg-purple-600 border-none hover:bg-purple-700",
  },
  footer: {
    container: "bg-white sm:px-12 user-footer",
    mainContainer: "mx-auto mb-4 w-full max-w-full container",
    gridContainer: "md:flex justify-between gap-5 grid",
    leftSection: "footer-up-left-box w-full",
    rightSection:
      "footer-up-right-box lg:float-right justify-start lg:justify-end mb-4 w-full",
  },
  main: {
    container: "flex flex-col min-h-screen",
    content: "flex-1 flex flex-col pt-0 bg-white",
    spacer: "h-18",
  },
} as const;
