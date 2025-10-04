"use client";

import { usePathname } from "next/navigation";
import { FooterBrand } from "./footer/footer-brand";
import { FooterLinks } from "./footer/footer-links";
import { FooterCopyright } from "./footer/footer-copyright";
import { FooterMobile } from "./footer/footer-mobile";
import { cn } from "@/lib/utils";
import { LAYOUT_CONFIG } from "@/constants/layout";

interface Props {
  readonly className?: string;
}

export function Footer({ className }: Props): React.JSX.Element | null {
  const pathname = usePathname();

  // Only show footer on home page
  if (!LAYOUT_CONFIG.showFooterOnPages.includes(pathname as "/" | "/home")) {
    return null;
  }

  return (
    <>
      {/* Mobile Footer */}
      <div className="lg:hidden">
        <FooterMobile />
      </div>

      {/* Desktop Footer */}
      <footer className={cn("hidden lg:block bg-white", className)}>
        {/* Upper Section - CTA + Navigation */}
        <div className="mx-auto px-4 py-12 container">
          <div className="flex lg:flex-row flex-col gap-8 lg:gap-12">
            {/* Left Section - CTA */}
            <div className="lg:w-1/3">
              <FooterBrand />
            </div>

            {/* Right Section - Navigation Links */}
            <div className="lg:w-2/3">
              <FooterLinks />
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div className="border-gray-200 border-t" />

        {/* Lower Section - Logo + Copyright + Social */}
        <div className="mx-auto px-4 container">
          <FooterCopyright />
        </div>
      </footer>
    </>
  );
}
