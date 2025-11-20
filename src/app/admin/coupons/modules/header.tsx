"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

interface CouponHeaderProps {
  onAddCoupon: () => void;
}

export const CouponHeader = ({
  onAddCoupon,
}: CouponHeaderProps): React.JSX.Element => (
  <div className="flex sm:flex-row flex-col sm:justify-between sm:items-start gap-4">
    <div className="sm:text-left text-center">
      <h1 className="font-bold text-gray-900 text-2xl sm:text-3xl">
        Quản lý Mã giảm giá
      </h1>
      <p className="mt-1 sm:mt-2 text-gray-600">
        Quản lý các mã giảm giá và khuyến mãi trong hệ thống
      </p>
    </div>
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={onAddCoupon}
          className="bg-primary-600 hover:bg-primary-700 shadow-sm text-white justify-center w-full sm:w-auto"
        >
          <Plus className="mr-2 w-4 h-4" />
          Thêm mã giảm giá
        </Button>
      </DialogTrigger>
    </Dialog>
  </div>
);
