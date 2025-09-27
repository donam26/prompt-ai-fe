"use client";

import { useState } from "react";
import { AdminSidebar as ModernSidebar } from "@/components/admin/sidebar/sidebar";

/**
 * Legacy AdminSidebar component - now uses the modern sidebar
 * This maintains backward compatibility while using the new design
 */
export function AdminSidebar(): React.JSX.Element {
  const [collapsed, setCollapsed] = useState(false);

  return <ModernSidebar className={collapsed ? "w-0" : "w-64"} />;
}
