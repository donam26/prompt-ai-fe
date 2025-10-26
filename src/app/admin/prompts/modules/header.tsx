"use client";

import { Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ExportExcelButton } from "@/components/admin/export-excel-button";
import { PromptImportDialog } from "@/components/admin/prompt-import-dialog";
import { PromptFilterState } from "@/types";
import { useState } from "react";
import { useImportPrompts } from "@/hooks/admin/usePrompt";

interface PromptHeaderProps {
  onAddPrompt: () => void;
  filters: PromptFilterState;
  disabled: boolean;
  onImportSuccess?: () => void;
}

export const PromptHeader = ({
  onAddPrompt,
  filters,
  disabled = false,
  onImportSuccess,
}: PromptHeaderProps): React.JSX.Element => {
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const { mutate: importPrompts, isImporting } = useImportPrompts();

  const handleImport = async (file: File): Promise<void> => {
    const success = await importPrompts(file);
    if (success) {
      setImportDialogOpen(false);
      onImportSuccess?.();
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="font-bold text-gray-900 text-3xl">Quản lý Prompt</h1>
        <p className="mt-2 text-gray-600">Quản lý các prompt trong hệ thống</p>
      </div>
      <div className="flex items-center gap-3">
        <ExportExcelButton filters={filters} disabled={disabled} />
        <Button
          variant="outline"
          onClick={() => setImportDialogOpen(true)}
          disabled={disabled}
          className="hover:bg-primary-50 border-primary-600 text-primary-600"
        >
          <Upload className="mr-2 w-4 h-4" />
          Import Excel
        </Button>
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

      <PromptImportDialog
        isOpen={importDialogOpen}
        onClose={() => setImportDialogOpen(false)}
        onImport={handleImport}
        isLoading={isImporting}
      />
    </div>
  );
};
