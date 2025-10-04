"use client";

import Link from "next/link";
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
 * Footer navigation links component with 3 columns
 *
 * @param props - The component props
 * @returns The footer links component JSX
 */
export function FooterLinks({
  className,
}: FooterLinksProps): React.JSX.Element {
  return (
    <div className={cn("gap-8 grid grid-cols-1 md:grid-cols-3", className)}>
      {/* Menu Column */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-800 text-lg">
          {LAYOUT_LABELS.footer.menu}
        </h4>
        <ul className="space-y-3">
          {FOOTER_NAVIGATION.menu.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex items-center text-gray-600 hover:text-[#5700C6] text-sm transition-colors duration-200"
              >
                {link.label}
                {link.label === "Công cụ" && (
                  <svg
                    className="ml-1 w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Company Column */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-800 text-lg">
          {LAYOUT_LABELS.footer.company}
        </h4>
        <ul className="space-y-3">
          {FOOTER_NAVIGATION.company.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-gray-600 hover:text-[#5700C6] text-sm transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Legal Column */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-800 text-lg">
          {LAYOUT_LABELS.footer.legal}
        </h4>
        <ul className="space-y-3">
          {FOOTER_NAVIGATION.legal.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-gray-600 hover:text-[#5700C6] text-sm transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
