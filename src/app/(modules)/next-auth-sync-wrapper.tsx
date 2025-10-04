"use client";

import { useNextAuthSync } from "@/hooks/useNextAuthSync";
import { ReactNode } from "react";

interface NextAuthSyncWrapperProps {
  children: ReactNode;
}

export const NextAuthSyncWrapper = ({ children }: NextAuthSyncWrapperProps) => {
  useNextAuthSync();
  return <>{children}</>;
};
