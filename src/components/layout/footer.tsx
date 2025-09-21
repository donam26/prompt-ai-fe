"use client";

import { usePathname } from "next/navigation";
import { FooterBrand } from "./footer/footer-brand";
import { FooterLinks } from "./footer/footer-links";
import { FooterCopyright } from "./footer/footer-copyright";
import { cn } from "@/lib/utils";
import { LAYOUT_PAGE, LAYOUT_CONFIG } from "@/constants/layout";

/**
 * Props for the Footer component
 */
interface FooterProps {
  readonly className?: string;
}

/**
 * Main footer component for the application
 *
 * @param props - The component props
 * @returns The footer JSX
 */
export function Footer({ className }: FooterProps): React.JSX.Element | null {
  const pathname = usePathname();

  // Only show footer on home page
  if (!LAYOUT_CONFIG.showFooterOnPages.includes(pathname as "/" | "/home")) {
    return null;
  }

  return (
    <footer className={cn(LAYOUT_PAGE.footer.container, className)}>
      <div className={LAYOUT_PAGE.footer.mainContainer}>
        <div className={LAYOUT_PAGE.footer.gridContainer}>
          {/* Left Section - Brand */}
          <div className={LAYOUT_PAGE.footer.leftSection}>
            <FooterBrand />
          </div>

          {/* Right Section - Links */}
          <div className={LAYOUT_PAGE.footer.rightSection}>
            <FooterLinks />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <FooterCopyright />
    </footer>
  );
}
