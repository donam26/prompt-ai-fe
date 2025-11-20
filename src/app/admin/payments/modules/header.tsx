"use client";

export const PaymentHeader = (): React.JSX.Element => (
  <div className="flex sm:flex-row flex-col sm:justify-between sm:items-start gap-4">
    <div className="sm:text-left text-center">
      <h1 className="font-bold text-gray-900 text-2xl sm:text-3xl">
        Quản lý Thanh toán
      </h1>
      <p className="mt-1 sm:mt-2 text-gray-600">
        Quản lý các giao dịch thanh toán trong hệ thống
      </p>
    </div>
  </div>
);
