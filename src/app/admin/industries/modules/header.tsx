"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
interface IndustryHeaderProps {
  onAddIndustry: () => void;
}

/**
 * Industry page header component
 *
 * @param props - The component props
 * @returns The industry header JSX
 */
export const IndustryHeader = ({
  onAddIndustry,
}: IndustryHeaderProps): React.JSX.Element => (
  <div className="flex justify-between items-center">
    <div>
      <h1 className="font-bold text-gray-900 text-3xl">Quản lý Ngành nghề</h1>
      <p className="mt-2 text-gray-600">
        Quản lý các ngành nghề trong hệ thống
      </p>
    </div>
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={onAddIndustry}
          className="bg-primary-600 hover:bg-primary-700 shadow-sm text-white"
        >
          <Plus className="mr-2 w-4 h-4" />
          Thêm ngành nghề
        </Button>
      </DialogTrigger>
    </Dialog>
  </div>
);
