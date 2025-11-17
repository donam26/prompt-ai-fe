"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CheckCircle,
  LogOut,
  Sparkles,
  Clock,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { SKOOL_COMMUNITY_URL } from "@/constants/homepage";

export function PaymentSuccess() {
  const searchParams = useSearchParams();
  const { logout } = useAuth();
  const [showSkoolPopup, setShowSkoolPopup] = useState(false);

  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const transactionNo = searchParams.get("transactionNo");
  const bankCode = searchParams.get("bankCode");
  const payDate = searchParams.get("payDate");
  const subscriptionId = searchParams.get("subscriptionId");
  const subscriptionName = searchParams.get("subscriptionName");

  const formattedAmount = amount
    ? Number.parseInt(amount, 10).toLocaleString("vi-VN") + " VND"
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

  // Show popup when component mounts (payment success)
  useEffect(() => {
    setShowSkoolPopup(true);
  }, []);

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

            {/* Skool Registration Instructions for subscriptionId=12 */}
            {subscriptionId === "12" && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 mb-6 p-6 border border-purple-200 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 mr-3 p-2 rounded-full">
                    <svg
                      className="w-5 h-5 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-purple-800 text-lg">
                    Hướng dẫn tham gia Skool
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="flex flex-shrink-0 justify-center items-center bg-purple-600 mt-0.5 mr-3 rounded-full w-6 h-6 font-bold text-white text-xs">
                      1
                    </span>
                    <p className="font-medium text-purple-700">
                      Sau khi bạn mua thì hãy đăng kí nick bên Skool bằng email
                      đã đăng kí sử dụng prom.vn
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="flex flex-shrink-0 justify-center items-center bg-purple-600 mt-0.5 mr-3 rounded-full w-6 h-6 font-bold text-white text-xs">
                      2
                    </span>
                    <p className="font-medium text-purple-700">
                      Bạn sẽ nhận được lời mời qua email bạn đang đăng kí sử
                      dụng prom.vn sau 5 phút
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="flex flex-shrink-0 justify-center items-center bg-purple-600 mt-0.5 mr-3 rounded-full w-6 h-6 font-bold text-white text-xs">
                      3
                    </span>
                    <p className="font-medium text-purple-700">
                      Hãy đồng ý lời mời để được tham gia Prom AI Hub trên Skool
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-purple-200 border-t">
                  <Button
                    onClick={() =>
                      window.open(
                        SKOOL_COMMUNITY_URL,
                        "_blank",
                        "noopener noreferrer"
                      )
                    }
                    className="bg-gradient-to-r from-purple-600 hover:from-purple-700 to-pink-600 hover:to-pink-700 shadow-md py-3 w-full font-semibold text-white text-base hover:scale-[1.02] transition-all duration-300"
                  >
                    <span>Đăng ký Skool ngay</span>
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

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

      {/* Skool Registration Popup */}
      <Dialog open={showSkoolPopup} onOpenChange={setShowSkoolPopup}>
        <DialogContent className="bg-transparent shadow-2xl p-0 border-0 sm:max-w-md overflow-hidden">
          <div className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 p-8 border border-purple-200/50 rounded-2xl">
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-transparent rounded-2xl pointer-events-none" />

            {/* Content */}
            <div className="z-10 relative">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-30 blur-xl rounded-full animate-pulse" />
                  <div className="relative flex justify-center items-center bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg rounded-full w-16 h-16">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              {/* Header */}
              <DialogHeader className="mb-6 text-center">
                <DialogTitle className="mb-3 font-bold text-gray-900 text-2xl">
                  🎉 Chúc mừng bạn!
                </DialogTitle>
                <DialogDescription className="font-semibold text-gray-700 text-base">
                  Bạn đã thanh toán thành công
                </DialogDescription>
              </DialogHeader>

              {/* Main Message */}
              <div className="bg-white/80 shadow-sm backdrop-blur-sm mb-6 p-6 border border-purple-100 rounded-xl">
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex-shrink-0 mt-1">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-base leading-relaxed">
                      Hãy đăng ký Skool trong vòng{" "}
                      <span className="inline-flex items-center bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-transparent">
                        24 giờ
                      </span>{" "}
                      để kích hoạt và sử dụng ngay{" "}
                      <span className="inline-flex items-center bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-transparent">
                        30 module AI
                      </span>{" "}
                      độc quyền!
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <div className="flex-shrink-0 bg-purple-500 rounded-full w-2 h-2" />
                  <span>
                    Bạn sẽ nhận được email hướng dẫn trong vài phút tới
                  </span>
                </div>
              </div>

              {/* Skool Link Button */}
              <Button
                onClick={() =>
                  window.open(
                    SKOOL_COMMUNITY_URL,
                    "_blank",
                    "noopener noreferrer"
                  )
                }
                className="bg-gradient-to-r from-purple-600 hover:from-purple-700 to-pink-600 hover:to-pink-700 shadow-lg py-6 w-full font-semibold text-white text-base hover:scale-[1.02] transition-all duration-300"
              >
                <span>Đăng ký Skool ngay</span>
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
