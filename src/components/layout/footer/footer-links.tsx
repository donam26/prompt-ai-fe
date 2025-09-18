"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FOOTER_NAVIGATION } from "@/constants/footer";
import { LAYOUT_LABELS } from "@/constants/layout";
import { cn } from "@/lib/utils";

/**
 * Props for the FooterLinks component
 */
interface FooterLinksProps {
  readonly className?: string;
}

/**
 * Footer navigation links component
 *
 * @param props - The component props
 * @returns The footer links component JSX
 */
export function FooterLinks({
  className,
}: FooterLinksProps): React.JSX.Element {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Information Links */}
      <Card className="shadow-none border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">
            {LAYOUT_LABELS.footer.information}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="gap-1 sm:gap-2 grid grid-cols-2 lg:grid-cols-3">
            {FOOTER_NAVIGATION.information.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-purple-600 text-sm transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Legal Links */}
      <Card className="shadow-none border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">
            {LAYOUT_LABELS.footer.learnMore}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            {FOOTER_NAVIGATION.legal.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-gray-600 hover:text-purple-600 text-sm transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
