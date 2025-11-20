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
  <div className="flex sm:flex-row flex-col sm:justify-between sm:items-start gap-4">
    <div className="sm:text-left text-center">
      <h1 className="font-bold text-gray-900 text-2xl sm:text-3xl">
        Quản lý Ngành nghề
      </h1>
      <p className="mt-1 sm:mt-2 text-gray-600">
        Quản lý các ngành nghề trong hệ thống
      </p>
    </div>
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={onAddIndustry}
          className="bg-primary-600 hover:bg-primary-700 shadow-sm text-white justify-center w-full sm:w-auto"
        >
          <Plus className="mr-2 w-4 h-4" />
          Thêm ngành nghề
        </Button>
      </DialogTrigger>
    </Dialog>
  </div>
);
