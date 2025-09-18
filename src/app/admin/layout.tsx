"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { useAdminPermissions } from "@/hooks/useAdminPermissions";
import { AdminLayout as NewAdminLayout } from "@/components/admin";
import type { AdminLayoutProps } from "@/types/admin";

/**
 * Admin layout component that provides authentication and authorization checks
 * for admin pages. Redirects non-admin users to the home page.
 *
 * @param props - The component props
 * @returns The admin layout JSX or null if user is not authorized
 */
export default function AdminLayout({
  children,
}: AdminLayoutProps): React.JSX.Element | null {
  const { isLoading } = useAuth();
  const { isAdmin } = useAdminPermissions();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push("/");
    }
  }, [isLoading, isAdmin, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return <NewAdminLayout>{children}</NewAdminLayout>;
}
