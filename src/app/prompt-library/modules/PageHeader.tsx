"use client";

import { ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  title: string;
  description?: string;
  onBack: () => void;
}

export const PageHeader = ({ title, description, onBack }: PageHeaderProps) => {
  return (
    <div className="mb-6 page-header">
      <div className="flex flex-col gap-2 mb-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="pt-0 h-full back-button"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h3 className="mt-0 pb-0 font-bold text-2xl page-title">{title}</h3>
        </div>
        <Button
          type="button"
          variant="ghost"
          className="flex sm:flex gap-2 max-w-fit report-button"
        >
          <AlertCircle className="w-4 h-4" />
          <span>Report Prompt</span>
        </Button>
      </div>
      {description && (
        <div className="hidden sm:block items-center px-4">
          <div className="text-gray-600 page-header-description">
            {description}
          </div>
        </div>
      )}
    </div>
  );
};
