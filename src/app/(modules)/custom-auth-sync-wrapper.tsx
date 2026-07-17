"use client";

import { useCustomNextAuthSync } from "@/hooks/useCustomNextAuthSync";
import { useSyncSubscription } from "@/hooks/useSyncSubscription";
import { ReactNode } from "react";

interface CustomAuthSyncWrapperProps {
  children: ReactNode;
}

export const CustomAuthSyncWrapper = ({
  children,
}: CustomAuthSyncWrapperProps) => {
  // Use custom sync that doesn't interfere with multi-tab auth
  useCustomNextAuthSync();
  // Keep the persisted `userSub` fresh from /users/me so premium gates never read
  // a stale login-time snapshot (e.g. after an upgrade).
  useSyncSubscription();
  return <>{children}</>;
};
