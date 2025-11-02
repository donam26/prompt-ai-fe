import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/styles/skeleton.css";
import { NextAuthProvider } from "@/providers/NextAuthProvider";
import { Toast } from "@/components/ui/toast";
import { Header, Footer } from "@/components/layout";
import { ConditionalMain } from "@/components/layout/conditional-main";
import { CustomAuthSyncWrapper } from "@/app/(modules)/custom-auth-sync-wrapper";
import { BackToTopButton } from "@/components/ui/back-to-top-button";
import { ChatSupportButton } from "@/components/ui/chat-support-button";
import { ErrorBoundary } from "@/components/ui/error-boundary";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// Get base URL from environment variable or use default
const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://prom.vn");

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Prom - Thư Viện & Nâng Cấp Prompt!",
  description: "Hơn 8,000+ prompts tạo ra từ các chuyên gia về AI",
  keywords: "prompt, AI, ChatGPT, Midjourney, prompt library, AI tools",
  authors: [{ name: "Prom Team" }],
  icons: {
    icon: "/icons/ui/logo.svg",
  },
  openGraph: {
    title: "Prom - Thư Viện & Nâng Cấp Prompt!",
    description: "Hơn 8,000+ prompts tạo ra từ các chuyên gia về AI",
    type: "website",
    locale: "vi_VN",
    images: [
      {
        url: "/images/logos/prompt-preview.png",
        width: 1200,
        height: 630,
        alt: "Prom AI Hub - AI-First Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prom - Thư Viện & Nâng Cấp Prompt!",
    description: "Hơn 8,000+ prompts tạo ra từ các chuyên gia về AI",
    images: ["/images/logos/prompt-preview.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <meta name="google-adsense-account" content="ca-pub-2351800777200822" />
        <link
          rel="preload"
          href="/images/home/background.png"
          as="image"
          type="image/png"
        />
        <link
          rel="preload"
          href="/images/home/slider-home.png"
          as="image"
          type="image/png"
        />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <NextAuthProvider>
            <CustomAuthSyncWrapper>
              <div className="flex flex-col min-h-screen">
                <Header />
                <ConditionalMain>{children}</ConditionalMain>
                <Footer />
              </div>
              <BackToTopButton />
              <ChatSupportButton />
              <Toast />
            </CustomAuthSyncWrapper>
          </NextAuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
