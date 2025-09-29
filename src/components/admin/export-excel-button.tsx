"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExportPromptsExcel } from "@/hooks/admin/usePrompt/useExportPromptsExcel";
import type { PromptFilterState } from "@/types/admin/prompt";

interface ExportExcelButtonProps {
  filters: PromptFilterState;
  disabled?: boolean;
  className?: string;
}

export function ExportExcelButton({
  filters,
  disabled = false,
  className = "",
}: ExportExcelButtonProps) {
  const { isExporting, exportPromptsExcel } = useExportPromptsExcel(filters);

  const handleExport = async () => {
    try {
      await exportPromptsExcel();
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={disabled || isExporting}
      variant="outline"
      className={`gap-2 ${className}`}
    >
      <Download className="w-4 h-4" />
      {isExporting ? "Đang xuất..." : "Xuất Excel"}
    </Button>
  );
}
