"use client";

import { Suspense, use } from "react";
import { PaymentSuccess } from "./modules/payment-success";
import { PaymentFailed } from "./modules/payment-failed";

function PaymentResultContent({
  paramsPromise,
}: {
  paramsPromise: Promise<{ slug: string[] }>;
}) {
  const params = use(paramsPromise);
  // The slug parameter contains the route segments
  // e.g., /payment/success or /payment/failed
  const routeType = params.slug?.[0] || "";

  if (routeType === "success") {
    return <PaymentSuccess />;
  }

  if (routeType === "failed") {
    return <PaymentFailed />;
  }

  // Fallback for unknown routes
  return (
    <div className="flex justify-center items-center bg-gray-50 min-h-screen">
      <div className="text-center">
        <h1 className="mb-4 font-bold text-gray-900 text-3xl">
          Không tìm thấy trang
        </h1>
        <p className="text-gray-600">Đường dẫn thanh toán không hợp lệ</p>
      </div>
    </div>
  );
}

export default function PaymentResultPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center bg-gray-50 min-h-screen">
          <div className="text-center">
            <div className="mx-auto mb-4 border-purple-600 border-b-2 rounded-full w-12 h-12 animate-spin"></div>
            <p className="text-gray-600">Đang tải kết quả thanh toán...</p>
          </div>
        </div>
      }
    >
      <PaymentResultContent paramsPromise={params} />
    </Suspense>
  );
}
