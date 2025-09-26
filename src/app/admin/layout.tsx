"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { useAdminPermissions } from "@/hooks/useAdminPermissions";
import { AdminLayout as NewAdminLayout, Loading } from "@/components/admin";
import { LOADING_TYPE } from "@/constants/loading";
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
    return <Loading type={LOADING_TYPE.PAGE} text="Đang tải..." />;
  }

  if (!isAdmin) {
    return null;
  }

  return <NewAdminLayout>{children}</NewAdminLayout>;
}
