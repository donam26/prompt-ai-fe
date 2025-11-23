"use client";

import { AdminPageLayout } from "@/components/admin";
import { ADMIN_LABELS } from "@/constants";
import {
  RecentTransactions,
  NewUsers,
  MailLogs,
  RecentFeedbacks,
  ExpiringSubscriptions,
} from "./modules";

export default function AdminDashboard(): React.JSX.Element {
  return (
    <AdminPageLayout
      title={ADMIN_LABELS.DASHBOARD.TITLE}
      description={ADMIN_LABELS.DASHBOARD.SUBTITLE}
      className="p-4"
    >
      <div className="space-y-4 sm:space-y-6">
        {/* Top Row - Three cards */}
        <div className="gap-4 sm:gap-6 grid grid-cols-1 md:grid-cols-3">
          <RecentTransactions />
          <NewUsers />
          <ExpiringSubscriptions />
        </div>

        {/* Bottom Row - Two cards */}
        <div className="gap-4 sm:gap-6 grid grid-cols-1 md:grid-cols-2">
          <MailLogs />
          <RecentFeedbacks />
        </div>
      </div>
    </AdminPageLayout>
  );
}
