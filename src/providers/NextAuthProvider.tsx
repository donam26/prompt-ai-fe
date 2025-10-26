"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface NextAuthProviderProps {
  children: ReactNode;
}

export const NextAuthProvider = ({ children }: NextAuthProviderProps) => {
  return (
    <SessionProvider refetchOnWindowFocus={false} refetchInterval={0}>
      {children}
    </SessionProvider>
  );
};
