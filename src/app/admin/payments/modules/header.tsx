"use client";

import type { PaymentHeaderProps } from "@/types/admin";

/**
 * Payment page header component
 *
 * @param props - The component props
 * @returns The payment header JSX
 */
export const PaymentHeader = ({}: PaymentHeaderProps): React.JSX.Element => (
  <div className="flex justify-between items-center">
    <div>
      <h1 className="font-bold text-gray-900 text-3xl">Quản lý Thanh toán</h1>
      <p className="mt-2 text-gray-600">
        Quản lý các giao dịch thanh toán trong hệ thống
      </p>
    </div>
  </div>
);
