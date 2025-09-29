"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ExportExcelButton } from "@/components/admin/export-excel-button";
import type { PromptFilterState } from "@/types/admin/prompt";

interface PromptHeaderProps {
  onAddPrompt: () => void;
  filters: PromptFilterState;
}

/**
 * Prompt page header component
 *
 * @param props - The component props
 * @returns The prompt header JSX
 */
export const PromptHeader = ({
  onAddPrompt,
  filters,
}: PromptHeaderProps): React.JSX.Element => (
  <div className="flex justify-between items-center">
    <div>
      <h1 className="font-bold text-gray-900 text-3xl">Quản lý Prompt</h1>
      <p className="mt-2 text-gray-600">Quản lý các prompt trong hệ thống</p>
    </div>
    <div className="flex items-center gap-3">
      <ExportExcelButton filters={filters} />
      <Dialog>
        <DialogTrigger asChild>
          <Button
            onClick={onAddPrompt}
            className="bg-primary-600 hover:bg-primary-700 shadow-sm text-white"
          >
            <Plus className="mr-2 w-4 h-4" />
            Thêm prompt
          </Button>
        </DialogTrigger>
      </Dialog>
    </div>
  </div>
);
