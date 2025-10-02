"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { useAdminPermissions } from "@/hooks/useAdminPermissions";
import { AdminLayout as NewAdminLayout, Loading } from "@/components/admin";
import { LOADING_TYPE } from "@/constants/loading";
import { ROUTES_URL } from "@/constants/routes-url";
import type { AdminLayoutProps } from "@/types/admin";

export default function AdminLayout({
  children,
}: AdminLayoutProps): React.JSX.Element | null {
  const { isLoading } = useAuth();
  const { isAdmin } = useAdminPermissions();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push(ROUTES_URL.HOME);
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
