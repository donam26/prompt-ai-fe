"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { FOOTER_IMAGES } from "@/constants/footer";
import { FooterNewsletter } from "./footer-newsletter";
import { FooterSocial } from "./footer-social";
import { FooterCertification } from "./footer-certification";
import { cn } from "@/lib/utils";

/**
 * Props for the FooterBrand component
 */
interface FooterBrandProps {
  readonly className?: string;
}

/**
 * Footer brand section component
 *
 * @param props - The component props
 * @returns The brand section component JSX
 */
export function FooterBrand({
  className,
}: FooterBrandProps): React.JSX.Element {
  return (
    <Card className={cn("shadow-none border-0", className)}>
      <CardContent className="space-y-4 p-0">
        {/* Logo */}
        <Link href="/" className="block">
          <Image
            src={FOOTER_IMAGES.logo}
            alt="Logo"
            width={100}
            height={40}
            className="w-25 h-auto"
          />
        </Link>

        {/* Social Links */}
        <FooterSocial />

        {/* Newsletter and Certification */}
        <div className="space-y-4">
          <FooterNewsletter />
          <FooterCertification />
        </div>
      </CardContent>
    </Card>
  );
}
