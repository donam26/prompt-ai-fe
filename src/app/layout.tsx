import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { QueryProvider } from "@/providers/QueryProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prom - Thư Viện & Nâng Cấp Prompt!",
  description: "Hơn 8,000+ prompts tạo ra từ các chuyên gia về AI",
  keywords: "prompt, AI, ChatGPT, Midjourney, prompt library, AI tools",
  authors: [{ name: "Prom Team" }],
  openGraph: {
    title: "Prom - Thư Viện & Nâng Cấp Prompt!",
    description: "Hơn 8,000+ prompts tạo ra từ các chuyên gia về AI",
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prom - Thư Viện & Nâng Cấp Prompt!",
    description: "Hơn 8,000+ prompts tạo ra từ các chuyên gia về AI",
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
      </head>
      <body className={inter.className}>
        <QueryProvider>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
