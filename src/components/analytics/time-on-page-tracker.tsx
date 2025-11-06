"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { sendEvent } from "@/lib/ga";

/**
 * Component to track time spent on each page
 * Sends event when user leaves the page or after 30 seconds intervals
 */
export const TimeOnPageTracker = (): null => {
  const pathname = usePathname();
  const startTimeRef = useRef<number>(Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastReportTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    // Reset when pathname changes
    startTimeRef.current = Date.now();
    lastReportTimeRef.current = Date.now();

    // Report time every 30 seconds
    intervalRef.current = setInterval(() => {
      const currentTime = Date.now();
      const timeSpent = Math.floor(
        (currentTime - lastReportTimeRef.current) / 1000
      );

      if (timeSpent >= 30) {
        sendEvent("time_on_page", {
          page_path: pathname,
          time_spent: timeSpent,
          event_category: "engagement",
        });
        lastReportTimeRef.current = currentTime;
      }
    }, 30000); // Check every 30 seconds

    // Report final time when leaving page
    const handleBeforeUnload = () => {
      const totalTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
      if (totalTime > 0) {
        // Use gtag directly for reliable tracking on page unload
        if (typeof window !== "undefined" && window.gtag) {
          const GA_TRACKING_ID =
            process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "G-XXXXXXXXXX";
          if (GA_TRACKING_ID !== "G-XXXXXXXXXX") {
            // Send via gtag if available
            window.gtag("event", "time_on_page", {
              page_path: pathname,
              time_spent: totalTime,
              event_category: "engagement",
            });
          }
        } else {
          sendEvent("time_on_page", {
            page_path: pathname,
            time_spent: totalTime,
            event_category: "engagement",
          });
        }
      }
    };

    // Track when page becomes hidden (user switches tab, closes, etc.)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const totalTime = Math.floor(
          (Date.now() - startTimeRef.current) / 1000
        );
        if (totalTime > 0) {
          sendEvent("time_on_page", {
            page_path: pathname,
            time_spent: totalTime,
            event_category: "engagement",
          });
        }
      } else {
        // User came back, reset start time
        startTimeRef.current = Date.now();
        lastReportTimeRef.current = Date.now();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      // Final report on cleanup
      const totalTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
      if (totalTime > 0) {
        sendEvent("time_on_page", {
          page_path: pathname,
          time_spent: totalTime,
          event_category: "engagement",
        });
      }
    };
  }, [pathname]);

  return null;
};
