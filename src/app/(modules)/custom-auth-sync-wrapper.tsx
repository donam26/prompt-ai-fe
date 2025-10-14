"use client";

import { useCustomNextAuthSync } from "@/hooks/useCustomNextAuthSync";
import { ReactNode } from "react";

interface CustomAuthSyncWrapperProps {
  children: ReactNode;
}

export const CustomAuthSyncWrapper = ({
  children,
}: CustomAuthSyncWrapperProps) => {
  // Use custom sync that doesn't interfere with multi-tab auth
  useCustomNextAuthSync();
  return <>{children}</>;
};
