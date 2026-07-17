"use client";

import { useAuth } from "@/hooks/useAuth";
import { isPremiumUser } from "@/lib/subscription/premium";

/**
 * Returns whether the currently logged-in user has an active paid subscription.
 * Single source of truth for premium gating across the app.
 */
export const useIsPremium = (): boolean => {
  const { user } = useAuth();
  return isPremiumUser(user);
};
