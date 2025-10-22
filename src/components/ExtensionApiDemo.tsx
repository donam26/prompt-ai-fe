"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  sendApiStatusUpdate,
  sendRealTimeMessage,
  sendClosePopup,
} from "@/utils/extensionHelper";

export default function ExtensionApiDemo() {
  const [isLoading, setIsLoading] = useState(false);

  const handleApiCall = async () => {
    setIsLoading(true);

    try {
      // 1. Send loading status
      sendApiStatusUpdate("loading", "Đang kết nối với API...");

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 2. Send real-time progress messages
      for (let i = 1; i <= 5; i++) {
        sendRealTimeMessage(`Đang xử lý... (${i}/5 chunks)`, "info");
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // 3. Send success status
      sendApiStatusUpdate("success", "API call hoàn thành thành công!");
    } catch {
      // Send error status
      sendApiStatusUpdate("error", "Có lỗi xảy ra khi gọi API");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClosePopup = () => {
    sendClosePopup("User manually closed", "demo_user_123");
  };

  return (
    <div className="mx-auto p-6 max-w-md">
      <h2 className="mb-4 font-bold text-xl">Extension API Demo</h2>

      <div className="space-y-4">
        <Button onClick={handleApiCall} disabled={isLoading} className="w-full">
          {isLoading ? "Đang xử lý..." : "Simulate API Call"}
        </Button>

        <Button onClick={handleClosePopup} variant="outline" className="w-full">
          Send Close Popup Message
        </Button>
      </div>

      <div className="mt-4 text-gray-600 text-sm">
        <p>Mở Developer Tools để xem console logs</p>
        <p>Extension sẽ nhận được các message:</p>
        <ul className="space-y-1 mt-2 list-disc list-inside">
          <li>API_STATUS_UPDATE (loading/success/error)</li>
          <li>REAL_TIME_MESSAGE (progress updates)</li>
          <li>CLOSE_POPUP (close request)</li>
        </ul>
      </div>
    </div>
  );
}
