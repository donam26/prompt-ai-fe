"use client";

import { useState } from "react";
import { AdminSidebar as ModernSidebar } from "@/components/admin/sidebar/sidebar";

/**
 * Legacy AdminSidebar component - now uses the modern sidebar
 * This maintains backward compatibility while using the new design
 */
export function AdminSidebar(): React.JSX.Element {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = (): void => {
    setCollapsed(!collapsed);
  };

  return <ModernSidebar collapsed={collapsed} onToggle={handleToggle} />;
}
