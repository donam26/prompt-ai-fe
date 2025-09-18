"use client";

import { Separator } from "@/components/ui/separator";
import { FOOTER_CONFIG } from "@/constants/footer";
import { LAYOUT_LABELS } from "@/constants/layout";
import { cn } from "@/lib/utils";

/**
 * Props for the FooterCopyright component
 */
interface FooterCopyrightProps {
  readonly className?: string;
}

/**
 * Footer copyright component
 *
 * @param props - The component props
 * @returns The copyright component JSX
 */
export function FooterCopyright({
  className,
}: FooterCopyrightProps): React.JSX.Element {
  return (
    <div className={cn("py-4 text-center", className)}>
      <Separator className="mb-4" />
      <p className="text-gray-600 text-sm">
        {FOOTER_CONFIG.currentYear} {LAYOUT_LABELS.footer.copyright}{" "}
        {FOOTER_CONFIG.companyName}
      </p>
    </div>
  );
}
