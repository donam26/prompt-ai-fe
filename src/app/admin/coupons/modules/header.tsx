"use client";

import { Plus, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

interface CouponHeaderProps {
  onAddCoupon: () => void;
}

export const CouponHeader = ({
  onAddCoupon,
}: CouponHeaderProps): React.JSX.Element => (
  <div className="flex justify-between items-center">
    <div>
      <h1 className="font-bold text-gray-900 text-3xl">Quản lý Mã giảm giá</h1>
      <p className="mt-2 text-gray-600">
        Quản lý các mã giảm giá và khuyến mãi trong hệ thống
      </p>
    </div>
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={onAddCoupon}
          className="bg-primary-600 hover:bg-primary-700 shadow-sm text-white"
        >
          <Plus className="mr-2 w-4 h-4" />
          Thêm mã giảm giá
        </Button>
      </DialogTrigger>
    </Dialog>
  </div>
);
