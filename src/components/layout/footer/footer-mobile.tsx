"use client";

import { useState } from "react";
import Link from "next/link";
import { ROUTES_URL } from "@/constants/routes-url";
import Image from "next/image";
import {
  FOOTER_CONFIG,
  SOCIAL_LINKS,
  MOBILE_FOOTER_NAVIGATION,
} from "@/constants/footer";
import { LAYOUT_LABELS } from "@/constants/layout";
import { cn } from "@/lib/utils";

interface Props {
  readonly className?: string;
}

export function FooterMobile({ className }: Props): React.JSX.Element {
  const [expandedSections, setExpandedSections] = useState<{
    company: boolean;
    legal: boolean;
  }>({
    company: false,
    legal: false,
  });

  const handleToggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <footer className={cn("bg-white py-8", className)}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* CTA Section */}
        <div className="mb-8 text-left">
          <h3 className="mb-4 font-bold text-black text-2xl">
            {LAYOUT_LABELS.footer.ctaTitle}
          </h3>
          <Link
            href={ROUTES_URL.CONTACT}
            className="inline-block bg-[#5700C6] hover:bg-[#4a00a8] px-8 py-3 rounded-full font-medium text-white text-lg transition-colors duration-200"
          >
            Contact Now
          </Link>
        </div>

        {/* Company Section */}
        <div className="mb-6">
          <button
            onClick={() => handleToggleSection("company")}
            className="flex justify-between items-center w-full text-left"
          >
            <h4 className="font-bold text-black text-lg">Company</h4>
            <svg
              className={`w-5 h-5 transition-transform duration-200 ${
                expandedSections.company ? "rotate-180" : ""
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              expandedSections.company
                ? "max-h-40 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="space-y-2 mt-3">
              {MOBILE_FOOTER_NAVIGATION.company.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-black hover:text-[#5700C6] text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Legal Information Section */}
        <div className="mb-6">
          <button
            onClick={() => handleToggleSection("legal")}
            className="flex justify-between items-center w-full text-left"
          >
            <h4 className="font-bold text-black text-lg">Legal Information</h4>
            <svg
              className={`w-5 h-5 transition-transform duration-200 ${
                expandedSections.legal ? "rotate-180" : ""
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              expandedSections.legal
                ? "max-h-40 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="space-y-2 mt-3">
              {MOBILE_FOOTER_NAVIGATION.legal.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-black hover:text-[#5700C6] text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Prom Logo and Navigation */}
        <div className="mb-8">
          {/* Logo */}
          <Link href={ROUTES_URL.HOME} className="flex items-center gap-2 mb-4">
            <Image
              src="/icons/logos/logo-final-1.svg"
              alt="Logo"
              width={120}
              height={120}
            />
          </Link>

          {/* Navigation Links */}
          <div className="gap-2 grid grid-cols-2">
            {MOBILE_FOOTER_NAVIGATION.mainNav.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm transition-colors h-9 w-24 ${
                  (link as any).isActive
                    ? "bg-[#F4F0FF] text-[#5700C6] rounded-full font-medium text-center"
                    : "text-black hover:text-[#5700C6]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-4 mb-4">
          {SOCIAL_LINKS.map(social => (
            <Link
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center bg-gray-100 hover:bg-[#5700C6] rounded-full w-10 h-10 transition-colors duration-200"
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

        <div className="mb-6 border-[#E0E0E0] border-t h-0.5" />

        {/* Copyright */}
        <p className="text-gray-600 text-sm text-left">
          {FOOTER_CONFIG.currentYear} {LAYOUT_LABELS.footer.copyright}{" "}
          {FOOTER_CONFIG.companyName}
        </p>
      </div>
    </footer>
  );
}
