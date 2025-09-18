"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SOCIAL_LINKS } from "@/constants/footer";
import { cn } from "@/lib/utils";

/**
 * Props for the FooterSocial component
 */
interface FooterSocialProps {
  readonly className?: string;
}

/**
 * Social media links component for footer
 *
 * @param props - The component props
 * @returns The social links component JSX
 */
export function FooterSocial({
  className,
}: FooterSocialProps): React.JSX.Element {
  return (
    <div className={cn("flex space-x-2", className)}>
      {SOCIAL_LINKS.map(social => (
        <Button
          key={social.label}
          variant="ghost"
          size="sm"
          asChild
          className="hover:bg-purple-100 p-0 w-10 h-10"
        >
          <Link href={social.href} target="_blank" rel="noopener noreferrer">
            <Image
              src={social.icon}
              alt={social.alt}
              width={20}
              height={20}
              className="w-5 h-5"
            />
            <span className="sr-only">{social.label}</span>
          </Link>
        </Button>
      ))}
    </div>
  );
}
