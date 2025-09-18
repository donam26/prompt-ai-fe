"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/sidebar/sidebar";
import { MainContent } from "@/components/admin/layout/main-content";

/**
 * Props for the AdminLayout component
 */
interface AdminLayoutProps {
  readonly children: React.ReactNode;
}

/**
 * Main admin layout component with collapsible sidebar
 *
 * @param props - The component props
 * @returns The admin layout JSX
 */
export function AdminLayout({ children }: AdminLayoutProps): React.JSX.Element {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = (): void => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <MainContent collapsed={sidebarCollapsed}>{children}</MainContent>
    </div>
  );
}
