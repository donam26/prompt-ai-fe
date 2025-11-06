// Google Analytics configuration and utility functions

export const GA_TRACKING_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "G-XXXXXXXXXX";

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Send a custom event to Google Analytics
 * @param action - The action name (e.g., 'login', 'signup', 'click')
 * @param params - Additional parameters for the event
 */
export const sendEvent = (
  action: string,
  params?: Record<string, unknown>
): void => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, params || {});
  }
};

/**
 * Track page view
 * @param url - The URL of the page
 */
export const trackPageView = (url: string): void => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

/**
 * Track login events
 * @param method - Login method ('email' | 'google')
 */
export const trackLogin = (method: "email" | "google"): void => {
  sendEvent("login", {
    method,
    event_category: "authentication",
    event_label: method === "google" ? "Google OAuth" : "Email OTP",
  });
};

/**
 * Track signup events
 * @param method - Signup method ('email' | 'google')
 */
export const trackSignup = (method: "email" | "google"): void => {
  sendEvent("sign_up", {
    method,
    event_category: "authentication",
    event_label: method === "google" ? "Google OAuth" : "Email OTP",
  });
};

/**
 * Track prompt run events
 * @param params - Parameters including who, prompt_type, prompt_id, prompt_name, prompt_slug
 */
export const trackRunPrompt = (params: {
  who: string;
  prompt_type: string;
  prompt_id?: number | string;
  prompt_name?: string;
  prompt_slug?: string;
}): void => {
  sendEvent("run_prompt", {
    ...params,
    event_category: "prompt",
    event_label:
      params.prompt_name || params.prompt_id?.toString() || params.prompt_type,
  });
};

/**
 * Track extension install events
 * @param params - Parameters including who (user email) and browser
 */
export const trackInstallExtension = (params: {
  who: string;
  browser: string;
}): void => {
  sendEvent("install_extension", params);
};
