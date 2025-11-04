"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/ga";

/**
 * Component to track page views in Google Analytics
 * Automatically tracks page views when route changes
 */
export const PageViewTracker = (): null => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Build full URL with search params
    const url =
      pathname +
      (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    // Track page view
    trackPageView(url);
  }, [pathname, searchParams]);

  // This component doesn't render anything
  return null;
};
