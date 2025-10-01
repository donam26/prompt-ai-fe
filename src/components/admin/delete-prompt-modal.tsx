"use client";

import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Prompt } from "@/types";

interface Props {
  prompt: Prompt | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export const DeletePromptModal = ({
  prompt,
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}: Props) => {
  const handleConfirm = () => {
    if (isLoading) {
      return;
    }
    onConfirm();
  };

  const handleClose = () => {
    if (isLoading) {
      return;
    }
    onClose();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && !isLoading) {
      onClose();
    }
  };

  const getPromptDisplayName = (prompt: Prompt | null) => {
    if (!prompt) return "";
    return prompt.title;
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="data-[state=closed]:slide-out-to-top-[48%] data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:max-w-[425px] data-[state=closed]:animate-out data-[state=open]:animate-in duration-300 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
        <AlertDialogHeader className="space-y-3">
          <AlertDialogTitle className="flex items-center gap-3 font-semibold text-lg">
            <div className="flex flex-shrink-0 justify-center items-center bg-red-50 dark:bg-red-900/20 rounded-full w-8 h-8">
              <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <span className="text-gray-900 dark:text-gray-100">
              Xác nhận xóa prompt
            </span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 dark:text-gray-400 text-left leading-relaxed">
            <span className="block">
              Bạn có chắc chắn muốn xóa prompt{" "}
              <strong className="font-semibold text-gray-900 dark:text-gray-100">
                {getPromptDisplayName(prompt)}
              </strong>
              <span className="text-gray-600 dark:text-gray-400">?</span>
            </span>

            {prompt && (
              <div className="bg-gray-50 dark:bg-gray-800/50 mt-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      ID:
                    </span>
                    <span className="font-mono text-gray-600 dark:text-gray-400">
                      {prompt.id}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Tiêu đề:
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {prompt.title}
                    </span>
                  </div>
                  {prompt.category && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Danh mục:
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {prompt.category.name}
                      </span>
                    </div>
                  )}
                  {prompt.createdAt && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Ngày tạo:
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {new Date(prompt.createdAt).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <span className="block mt-3 text-gray-500 dark:text-gray-500 text-sm">
              Hành động này không thể hoàn tác và sẽ xóa vĩnh viễn prompt này
              khỏi hệ thống.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="sm:flex-row flex-col-reverse sm:justify-end sm:space-x-2 space-y-2 space-y-reverse sm:space-y-0">
          <AlertDialogCancel
            onClick={handleClose}
            disabled={isLoading}
            className="hover:bg-gray-50 dark:hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 w-full sm:w-auto transition-all duration-200"
          >
            Hủy
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 disabled:opacity-50 hover:shadow-lg focus:ring-2 focus:ring-red-500 focus:ring-offset-2 w-full sm:w-auto text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex justify-center items-center gap-2">
                <div className="border-2 border-white border-t-transparent rounded-full w-4 h-4 animate-spin" />
                <span>Đang xóa...</span>
              </span>
            ) : (
              "Xóa prompt"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
