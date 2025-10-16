/**
 * Layout constants and configuration
 */

import { ROUTES_URL } from "./routes-url";

export const LAYOUT_ROUTES = {
  home: ROUTES_URL.HOME,
  homeAlt: ROUTES_URL.HOME_ALT,
  login: ROUTES_URL.LOGIN,
  register: ROUTES_URL.REGISTER,
  userInfo: ROUTES_URL.PROFILE,
  userInfoFavorites: `${ROUTES_URL.PROFILE}?tab=favorites`,
  settings: ROUTES_URL.SETTINGS,
  promptLibrary: ROUTES_URL.PROMPT_LIBRARY,
  blog: ROUTES_URL.BLOG,
  pricing: ROUTES_URL.PRICING,
  contact: ROUTES_URL.CONTACT,
} as const;

export const LAYOUT_EXTERNAL_LINKS = {
  chromeExtension:
    "https://chromewebstore.google.com/detail/prom-n%C3%A2ng-c%E1%BA%A5p-prompt/gpcjhobhbnoifjkhgongdbggeljjpfif",
} as const;

export const LAYOUT_LABELS = {
  navigation: {
    home: "Home",
    promptLibrary: "Thư viện",
    chromeExtension: "Nâng Cấp prompt",
    product: "Tài Liệu AI",
    blog: "Blog",
    pricing: "Gói Dịch Vụ",
    contact: "Liên hệ",
  },
  auth: {
    login: "Login",
    register: "Signup",
    logout: "Đăng xuất",
  },
  user: {
    favorites: "Yêu thích",
    profile: "Thông tin cá nhân",
    settings: "Cài đặt",
  },
  footer: {
    ctaTitle: "Bạn quan tâm đến PROM?",
    ctaButton: "Liên hệ chúng tôi",
    menu: "Menu",
    company: "Công ty",
    legal: "Legal Information",
    emailPlaceholder: "Địa chỉ email của bạn",
    subscribe: "Đăng ký",
    copyright: "All rights reserved © by",
  },
} as const;

export const LAYOUT_NAVIGATION = {
  items: [
    {
      href: LAYOUT_ROUTES.home,
      label: LAYOUT_LABELS.navigation.home,
      isExternal: false,
    },
    {
      href: LAYOUT_ROUTES.promptLibrary,
      label: LAYOUT_LABELS.navigation.promptLibrary,
      isExternal: false,
    },
    {
      href: LAYOUT_EXTERNAL_LINKS.chromeExtension,
      label: LAYOUT_LABELS.navigation.chromeExtension,
      isExternal: true,
    },
    {
      href: LAYOUT_ROUTES.blog,
      label: LAYOUT_LABELS.navigation.blog,
      isExternal: false,
    },
    {
      href: LAYOUT_ROUTES.pricing,
      label: LAYOUT_LABELS.navigation.pricing,
      isExternal: false,
    },
    {
      href: LAYOUT_ROUTES.contact,
      label: LAYOUT_LABELS.navigation.contact,
      isExternal: false,
    },
  ],
} as const;

export const LAYOUT_IMAGES = {
  logo: "/icons/ui/logo.svg",
  logoAlt: "Prom logo",
  logoWidth: 30,
  logoHeight: 40,
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
