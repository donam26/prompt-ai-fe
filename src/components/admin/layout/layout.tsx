"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar/sidebar";
import { MainContent } from "@/components/admin/layout/main-content";

interface AdminLayoutProps {
  readonly children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps): React.JSX.Element {
  const pathname = usePathname();

  const shouldApplyPadding = !pathname.includes("/admin/dashboard");

  useEffect(() => {
    // Disable body scroll when admin layout is mounted
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      // Restore original overflow on unmount
      document.body.style.overflow = originalStyle;
      document.documentElement.style.overflow = originalStyle;
    };
  }, []);

  return (
    <div className="flex md:flex-row flex-col gap-2 md:gap-0 bg-gray-100 dark:bg-gray-900 p-2 md:p-0 pt-4 md:pt-0 max-w-[100vw] h-screen overflow-hidden min-h-0">
      <AdminSidebar />
      <MainContent shouldApplyPadding={shouldApplyPadding}>
        {children}
      </MainContent>
    </div>
  );
}
