"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useCookieBasedAuthGuard } from "@/hooks/auth/useCookieBasedAuthGuard";
import { useStorageSync } from "@/hooks/auth/useStorageSync";
import type { User } from "@/lib/types";

/**
 * SessionHandlerWrapper - Manages authentication state and cross-tab synchronization
 *
 * This component:
 * 1. Handles cookie-based authentication guard
 * 2. Manages cross-tab storage synchronization
 * 3. Ensures proper hydration state management
 * 4. Manages user redirects based on authentication status
 */
export const SessionHandlerWrapper = () => {
  const { setUser, setLoading } = useAuth();

  // Initialize authentication guard
  useCookieBasedAuthGuard();

  // Handle cross-tab synchronization
  useStorageSync({
    onUserChange: newUser => {
      setUser(newUser as User | null);
    },
    onRolesChange: () => {
      // Handle roles if needed in the future
    },
  });

  // Set loading to false after initial setup
  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return null; // Component không render gì
};
