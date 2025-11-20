"use client";

import React, { useState } from "react";
import { AdminPageLayout } from "@/components/admin";
import { SendMailForm, SendMailTestForm } from "./modules";
import { useSendMail, useSendMailTest } from "@/hooks/admin";
import { showToast } from "@/components/ui/toast";

export default function SendMailPage() {
  const [loading, setLoading] = useState(false);
  const [mailFailed, setMailFailed] = useState<string[]>([]);

  // Hooks for sending mail
  const { mutate: sendMail } = useSendMail();
  const { mutate: sendMailTest } = useSendMailTest();

  const handleSendMail = async (content: string) => {
    setLoading(true);
    setMailFailed([]);

    const response = await sendMail({ reply: content });
    setLoading(false);

    if (response && response.success) {
      showToast.success("Gửi email thành công");
      setMailFailed(response.failedEmails || []);
    } else {
      showToast.error("Gửi email thất bại");
    }
  };

  const handleSendMailTest = async (content: string) => {
    setLoading(true);
    setMailFailed([]);

    const response = await sendMailTest({ reply: content });
    setLoading(false);

    if (response && response.success) {
      showToast.success("Gửi email test thành công");
      setMailFailed(response.failedEmails || []);
    } else {
      showToast.error("Gửi email test thất bại");
    }
  };

  return (
    <AdminPageLayout title="Gửi Mail Hàng Loạt">
      <div className="space-y-8">
        <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
          {/* Send Mail Form */}
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="mb-4 font-semibold text-xl">Gửi Mail</h2>
            <SendMailForm onSend={handleSendMail} loading={loading} />
          </div>

          {/* Send Mail Test Form */}
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="mb-4 font-semibold text-xl">Gửi Mail Test</h2>
            <SendMailTestForm onSend={handleSendMailTest} loading={loading} />
          </div>
        </div>

        {/* Mail Failed Display */}
        {mailFailed.length > 0 && (
          <div className="bg-red-50 p-4 border border-red-200 rounded-lg">
            <h3 className="mb-2 font-semibold text-red-800 text-lg">
              Email gửi thất bại
            </h3>
            <div className="space-y-1">
              {mailFailed.map((email, index) => (
                <p key={index} className="text-red-700 text-sm">
                  {email}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminPageLayout>
  );
}
