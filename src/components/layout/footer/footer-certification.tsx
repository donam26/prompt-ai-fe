"use client";

import Link from "next/link";
import Image from "next/image";
import { FOOTER_IMAGES, FOOTER_CONFIG } from "@/constants/footer";
import { cn } from "@/lib/utils";

/**
 * Props for the FooterCertification component
 */
interface FooterCertificationProps {
  readonly className?: string;
}

/**
 * Government certification component for footer
 *
 * @param props - The component props
 * @returns The certification component JSX
 */
export function FooterCertification({
  className,
}: FooterCertificationProps): React.JSX.Element {
  return (
    <div className={cn("w-48", className)}>
      <Link
        href={FOOTER_CONFIG.boCongThuongLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <Image
          src={FOOTER_IMAGES.boCongThuong}
          alt="Bộ Công Thương"
          width={300}
          height={100}
          className="w-full h-auto"
        />
      </Link>
    </div>
  );
}
