"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar/sidebar";
import { MainContent } from "@/components/admin/layout/main-content";

interface AdminLayoutProps {
  readonly children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps): React.JSX.Element {
  const pathname = usePathname();

  const shouldApplyPadding = !pathname.includes("/admin/dashboard");

  return (
    <div className="flex md:flex-row flex-col gap-2 md:gap-0 bg-gray-100 dark:bg-gray-900 p-2 md:p-0 pt-4 md:pt-0 max-w-[100vw] min-h-screen h-screen overflow-x-hidden">
      <AdminSidebar />
      <MainContent shouldApplyPadding={shouldApplyPadding}>
        {children}
      </MainContent>
    </div>
  );
}
