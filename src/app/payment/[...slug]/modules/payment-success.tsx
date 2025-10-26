"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function PaymentSuccess() {
  const searchParams = useSearchParams();
  const { logout } = useAuth();

  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const transactionNo = searchParams.get("transactionNo");
  const bankCode = searchParams.get("bankCode");
  const payDate = searchParams.get("payDate");
  const subscriptionName = searchParams.get("subscriptionName");

  const formattedAmount = amount
    ? parseInt(amount).toLocaleString("vi-VN") + " VND"
    : "N/A";

  // Parse date format: 20251026162514 (YYYYMMDDHHmmss)
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";

    // Check if dateString is in YYYYMMDDHHmmss format (14 characters)
    if (dateString.length === 14) {
      const year = dateString.substring(0, 4);
      const month = dateString.substring(4, 6);
      const day = dateString.substring(6, 8);
      const hour = dateString.substring(8, 10);
      const minute = dateString.substring(10, 12);
      const second = dateString.substring(12, 14);

      const date = new Date(
        `${year}-${month}-${day}T${hour}:${minute}:${second}`
      );
      return date.toLocaleString("vi-VN");
    }

    // Fallback to standard date parsing
    return new Date(dateString).toLocaleString("vi-VN");
  };

  const formattedDate = formatDate(payDate);

  return (
    <div className="relative bg-white min-h-screen">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-pink-50/50"></div>

      <div className="relative flex justify-center items-center px-4">
        <Card className="bg-white shadow-xl border border-purple-100 w-full max-w-2xl">
          <CardContent className="p-10">
            {/* Success Icon */}
            <div className="flex justify-center mb-8">
              <div className="flex justify-center items-center bg-green-50 border-4 border-green-100 rounded-full w-20 h-20">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </div>

            {/* Title */}
            <div className="mb-8 text-center">
              <h1 className="mb-2 font-bold text-gray-900 text-3xl">
                Thanh toán thành công
              </h1>
              <p className="text-gray-600">Giao dịch của bạn đã được xử lý</p>
              {subscriptionName && (
                <div className="inline-flex bg-purple-100 mt-4 px-4 py-1.5 rounded-full font-semibold text-purple-700 text-sm">
                  {subscriptionName}
                </div>
              )}
            </div>

            {/* Payment Details */}
            <div className="space-y-4 mb-8 pt-6 border-t">
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Mã đơn hàng</span>
                <span className="font-medium text-gray-900">
                  {orderId || "N/A"}
                </span>
              </div>

              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Số tiền</span>
                <span className="font-bold text-green-600 text-xl">
                  {formattedAmount}
                </span>
              </div>

              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Mã giao dịch</span>
                <span className="font-medium text-gray-900">
                  {transactionNo || "N/A"}
                </span>
              </div>

              {bankCode && (
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">Ngân hàng</span>
                  <span className="font-medium text-gray-900">{bankCode}</span>
                </div>
              )}

              <div className="flex justify-between py-3">
                <span className="text-gray-600">Ngày thanh toán</span>
                <span className="font-medium text-gray-900">
                  {formattedDate}
                </span>
              </div>
            </div>

            {/* Notification Message */}
            <div className="bg-blue-50 mb-6 p-4 border border-blue-200 rounded-lg">
              <p className="font-medium text-blue-800 text-sm">
                💡 Vui lòng đăng xuất và đăng nhập lại để cập nhật thông tin tài
                khoản của bạn
              </p>
            </div>

            {/* Action Button */}
            <Button
              onClick={logout}
              className="bg-purple-600 hover:bg-purple-700 shadow-md py-6 w-full font-semibold text-white text-base"
            >
              <LogOut className="mr-2 w-5 h-5" />
              Đăng xuất
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
