"use client";

import { Plus, Upload, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CsvImportDialog } from "@/components/admin/csv-import-dialog";
import { useImportUsers } from "@/hooks/admin/useUser/useImportUsers";
import { useExportUsers } from "@/hooks/admin/useUser/useExportUsers";
import { useState } from "react";
import type { UserFilterState } from "@/types/admin/user";

interface UserHeaderProps {
  onAddUser: () => void;
  onImportSuccess?: () => void;
  filters: UserFilterState;
}

/**
 * User page header component
 *
 * @param props - The component props
 * @returns The user header JSX
 */
export const UserHeader = ({
  onAddUser,
  onImportSuccess,
  filters,
}: UserHeaderProps): React.JSX.Element => {
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const { mutate: handleImport, isImporting } = useImportUsers();
  const { mutate: handleExport, isExporting } = useExportUsers();

  const handleImportClick = (): void => {
    setIsImportDialogOpen(true);
  };

  const handleImportClose = (): void => {
    setIsImportDialogOpen(false);
  };

  const handleImportSubmit = async (file: File): Promise<void> => {
    const success = await handleImport(file);
    if (success) {
      setIsImportDialogOpen(false);
      // Emit success event to parent component
      onImportSuccess?.();
    }
  };

  const handleExportClick = async (): Promise<void> => {
    await handleExport(filters);
  };

  return (
    <>
      <div className="flex sm:flex-row flex-col sm:justify-between sm:items-start gap-4">
        <div className="sm:text-left text-center">
          <h1 className="font-bold text-gray-900 text-2xl sm:text-3xl">
            Quản lý Người dùng
          </h1>
          <p className="mt-1 sm:mt-2 text-gray-600">
            Quản lý tài khoản người dùng trong hệ thống
          </p>
        </div>
        <div className="flex sm:flex-row flex-col flex-wrap gap-3 w-full sm:w-auto">
          <Button
            onClick={handleExportClick}
            variant="outline"
            disabled={isExporting}
            className="hover:bg-green-50 border-green-600 text-green-600 justify-center w-full sm:w-auto"
          >
            <Download className="mr-2 w-4 h-4" />
            {isExporting ? "Đang export..." : "Export Excel"}
          </Button>
          <Button
            onClick={handleImportClick}
            variant="outline"
            className="hover:bg-primary-50 border-primary-600 text-primary-600 justify-center w-full sm:w-auto"
          >
            <Upload className="mr-2 w-4 h-4" />
            Import CSV
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                onClick={onAddUser}
                className="bg-primary-600 hover:bg-primary-700 shadow-sm text-white justify-center w-full sm:w-auto"
              >
                <Plus className="mr-2 w-4 h-4" />
                Thêm người dùng
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>

      <CsvImportDialog
        isOpen={isImportDialogOpen}
        onClose={handleImportClose}
        onImport={handleImportSubmit}
        isLoading={isImporting}
      />
    </>
  );
};
