"use client";

import { AdminPageLayout } from "@/components/admin";
import { ADMIN_LABELS } from "@/constants";
import {
  RecentTransactions,
  NewUsers,
  MailLogs,
  RecentFeedbacks,
} from "./modules";

export default function AdminDashboard(): React.JSX.Element {
  return (
    <AdminPageLayout
      title={ADMIN_LABELS.DASHBOARD.TITLE}
      description={ADMIN_LABELS.DASHBOARD.SUBTITLE}
    >
      <div className="space-y-4 sm:space-y-6">
        <div className="gap-4 sm:gap-6 grid grid-cols-1 md:grid-cols-2">
          <div>
            <RecentTransactions />
          </div>
          <div>
            <NewUsers />
          </div>
        </div>
        <div className="gap-4 sm:gap-6 grid grid-cols-1 md:grid-cols-2">
          <div>
            <MailLogs />
          </div>
          <div>
            <RecentFeedbacks />
          </div>
        </div>
      </div>
    </AdminPageLayout>
  );
}
