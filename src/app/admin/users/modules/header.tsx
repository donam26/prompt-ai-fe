"use client";

import { Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CsvImportDialog } from "@/components/admin/csv-import-dialog";
import { useImportUsers } from "@/hooks/admin/useUser/useImportUsers";
import { useState } from "react";

interface UserHeaderProps {
  onAddUser: () => void;
  onImportSuccess?: () => void;
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
}: UserHeaderProps): React.JSX.Element => {
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const { mutate: handleImport, isImporting } = useImportUsers();

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

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-gray-900 text-3xl">
            Quản lý Người dùng
          </h1>
          <p className="mt-2 text-gray-600">
            Quản lý tài khoản người dùng trong hệ thống
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleImportClick}
            variant="outline"
            className="hover:bg-primary-50 border-primary-600 text-primary-600"
          >
            <Upload className="mr-2 w-4 h-4" />
            Import CSV
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                onClick={onAddUser}
                className="bg-primary-600 hover:bg-primary-700 shadow-sm text-white"
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
