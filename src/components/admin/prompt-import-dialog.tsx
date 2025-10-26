"use client";

import { useState, useRef } from "react";
import { Upload, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PromptImportDialogProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onImport: (file: File) => Promise<void>;
  readonly isLoading: boolean;
}

interface ImportResult {
  readonly totalProcessed: number;
  readonly successCount: number;
  readonly errorCount: number;
  readonly errors: Array<{
    readonly row: number;
    readonly error: string;
    readonly data: Record<string, unknown>;
  }>;
}

export const PromptImportDialog = ({
  isOpen,
  onClose,
  onImport,
  isLoading,
}: PromptImportDialogProps): React.JSX.Element => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File): void => {
    if (
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.type === "application/vnd.ms-excel" ||
      file.name.endsWith(".xlsx") ||
      file.name.endsWith(".xls")
    ) {
      setSelectedFile(file);
      setImportResult(null);
    } else {
      alert("Vui lòng chọn file Excel hợp lệ (.xlsx hoặc .xls)");
    }
  };

  const handleDrag = (e: React.DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleImport = async (): Promise<void> => {
    if (!selectedFile) return;

    try {
      await onImport(selectedFile);
      // Reset form after successful import
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Import failed:", error);
    }
  };

  const handleClose = (): void => {
    setSelectedFile(null);
    setImportResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Import Prompts từ Excel
          </DialogTitle>
          <DialogDescription>
            Chọn file Excel để import danh sách prompts. File Excel cần có các
            cột: Title, Content, CategoryId, SubType, Tags, Description.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragActive
                ? "border-primary bg-primary/5"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileInputChange}
              className="hidden"
            />

            {selectedFile ? (
              <div className="space-y-2">
                <CheckCircle className="mx-auto w-8 h-8 text-green-500" />
                <p className="font-medium text-green-700 text-sm">
                  {selectedFile.name}
                </p>
                <p className="text-gray-500 text-xs">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="mx-auto w-8 h-8 text-gray-400" />
                <p className="text-gray-600 text-sm">
                  Kéo thả file Excel vào đây hoặc{" "}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-primary hover:underline"
                  >
                    chọn file
                  </button>
                </p>
                <p className="text-gray-500 text-xs">
                  Chỉ hỗ trợ file .xlsx, .xls
                </p>
              </div>
            )}
          </div>

          {/* Import Result */}
          {importResult && (
            <Alert>
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>
                <div className="space-y-1">
                  <p>
                    <strong>Tổng số:</strong> {importResult.totalProcessed} dòng
                  </p>
                  <p>
                    <strong>Thành công:</strong> {importResult.successCount}{" "}
                    dòng
                  </p>
                  <p>
                    <strong>Lỗi:</strong> {importResult.errorCount} dòng
                  </p>
                  {importResult.errorCount > 0 && (
                    <p className="text-red-600 text-sm">
                      Vui lòng kiểm tra lại dữ liệu và thử lại
                    </p>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Loading Progress */}
          {isLoading && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span>Đang import...</span>
                <span>Vui lòng đợi</span>
              </div>
              <Progress value={undefined} className="w-full" />
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Hủy
          </Button>
          <Button
            onClick={handleImport}
            disabled={!selectedFile || isLoading}
            className="bg-primary-600 hover:bg-primary-700"
          >
            {isLoading ? "Đang import..." : "Import"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
