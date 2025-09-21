"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import type { SectionHeaderProps } from "@/types/admin";

/**
 * Section page header component
 *
 * @param props - The component props
 * @returns The section header JSX
 */
export const SectionHeader = ({
  onAddSection,
}: SectionHeaderProps): React.JSX.Element => (
  <div className="flex justify-between items-center">
    <div>
      <h1 className="font-bold text-gray-900 text-3xl">Quản lý Phân loại</h1>
      <p className="mt-2 text-gray-600">Quản lý các phân loại trong hệ thống</p>
    </div>
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={onAddSection}
          className="bg-primary-600 hover:bg-primary-700 shadow-sm text-white"
        >
          <Plus className="mr-2 w-4 h-4" />
          Thêm phân loại
        </Button>
      </DialogTrigger>
    </Dialog>
  </div>
);
