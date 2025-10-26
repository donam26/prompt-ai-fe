"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { XCircle, RefreshCcw, Home } from "lucide-react";

export function PaymentFailed() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get("orderId");
  const errorCode = searchParams.get("errorCode");
  const message = searchParams.get("message");
  const error = searchParams.get("error");

  return (
    <div className="relative bg-white min-h-screen">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 via-transparent to-orange-50/50"></div>

      <div className="relative flex justify-center items-center px-4">
        <Card className="bg-white shadow-xl border border-red-100 w-full max-w-2xl">
          <CardContent className="p-10">
            {/* Error Icon */}
            <div className="flex justify-center mb-8">
              <div className="flex justify-center items-center bg-red-50 border-4 border-red-100 rounded-full w-20 h-20">
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
            </div>

            {/* Title */}
            <div className="mb-8 text-center">
              <h1 className="mb-2 font-bold text-gray-900 text-3xl">
                Thanh toán thất bại
              </h1>
              <p className="text-gray-600">Không thể xử lý giao dịch của bạn</p>
            </div>

            {/* Error Details */}
            <div className="space-y-4 mb-8 pt-6 border-t">
              {orderId && (
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">Mã đơn hàng</span>
                  <span className="font-medium text-gray-900">{orderId}</span>
                </div>
              )}

              {errorCode && (
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">Mã lỗi</span>
                  <span className="font-medium text-red-600">{errorCode}</span>
                </div>
              )}

              {message && (
                <div className="bg-red-50 p-4 border border-red-200 rounded-lg">
                  <p className="font-medium text-red-700">{message}</p>
                </div>
              )}

              {error && (
                <div className="bg-orange-50 p-4 border border-orange-200 rounded-lg">
                  <p className="font-medium text-orange-700">{error}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={() => router.push("/checkout")}
                className="flex-1 bg-red-600 hover:bg-red-700 shadow-md py-6 font-semibold text-white text-base"
              >
                <RefreshCcw className="mr-2 w-5 h-5" />
                Thử lại
              </Button>
              <Button
                onClick={() => router.push("/")}
                variant="outline"
                className="flex-1 hover:bg-gray-50 py-6 border-2 border-gray-300 font-semibold text-gray-700 text-base"
              >
                <Home className="mr-2 w-5 h-5" />
                Về trang chủ
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
