"use client";

import { AdminPageLayout, AdminContentCard } from "@/components/admin";
import { ADMIN_LABELS } from "@/constants";

export default function AdminDashboard(): React.JSX.Element {
  return (
    <AdminPageLayout
      title={ADMIN_LABELS.DASHBOARD.TITLE}
      description={ADMIN_LABELS.DASHBOARD.SUBTITLE}
    >
      <AdminContentCard>{ADMIN_LABELS.DASHBOARD.TITLE}</AdminContentCard>
    </AdminPageLayout>
  );
}
