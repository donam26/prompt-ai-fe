"use client";

import Link from "next/link";
import { ROUTES_URL } from "@/constants/routes-url";
import Image from "next/image";
import { LAYOUT_LABELS } from "@/constants/layout";
import { cn } from "@/lib/utils";

interface Props {
  readonly className?: string;
}

export function FooterBrand({ className }: Props): React.JSX.Element {
  return (
    <div className="gap-4 grid h-full">
      <div className={cn("space-y-6", className)}>
        {/* CTA Title */}
        <h3 className="font-bold text-gray-800 text-2xl lg:text-3xl leading-tight">
          {LAYOUT_LABELS.footer.ctaTitle}
        </h3>

        {/* CTA Button */}
        <Link
          href={ROUTES_URL.CONTACT}
          className="inline-block bg-[#5700C6] hover:bg-[#4a00a8] px-8 py-4 rounded-full font-medium text-white text-lg transition-colors duration-200"
        >
          {LAYOUT_LABELS.footer.ctaButton}
        </Link>
      </div>

      {/* Logo */}
      <Link href="/" className="flex items-end">
        <Image
          src="/icons/logos/logo-final-1.svg"
          alt="Logo"
          width={120}
          height={120}
        />
      </Link>
    </div>
  );
}
