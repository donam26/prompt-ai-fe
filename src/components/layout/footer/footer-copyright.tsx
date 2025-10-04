"use client";

import Link from "next/link";
import Image from "next/image";
import { FOOTER_CONFIG, SOCIAL_LINKS } from "@/constants/footer";
import { LAYOUT_LABELS } from "@/constants/layout";
import { cn } from "@/lib/utils";

interface Props {
  readonly className?: string;
}

export function FooterCopyright({ className }: Props): React.JSX.Element {
  return (
    <div className={cn("py-6", className)}>
      <div className="flex sm:flex-row flex-col justify-between items-center gap-4">
        {/* Left Side - Logo and Copyright */}
        <div className="flex sm:flex-row flex-col items-center gap-4">
          {/* Copyright */}
          <p className="text-gray-600 text-sm">
            {FOOTER_CONFIG.currentYear} {LAYOUT_LABELS.footer.copyright}{" "}
            {FOOTER_CONFIG.companyName}
          </p>
        </div>

        {/* Right Side - Social Icons */}
        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map(social => (
            <Link
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5700C6] hover:text-[#4a00a8] transition-colors duration-200"
              aria-label={social.label}
            >
              <Image
                src={social.icon}
                alt={social.alt}
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
