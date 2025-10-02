"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

interface ProductHeaderProps {
  onAddProduct: () => void;
}

export const ProductHeader = ({
  onAddProduct,
}: ProductHeaderProps): React.JSX.Element => (
  <div className="flex justify-between items-center">
    <div>
      <h1 className="font-bold text-gray-900 text-3xl">Quản lý Sản phẩm</h1>
      <p className="mt-2 text-gray-600">Quản lý các sản phẩm trong hệ thống</p>
    </div>
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={onAddProduct}
          className="bg-primary-600 hover:bg-primary-700 shadow-sm text-white"
        >
          <Plus className="mr-2 w-4 h-4" />
          Thêm sản phẩm
        </Button>
      </DialogTrigger>
    </Dialog>
  </div>
);
