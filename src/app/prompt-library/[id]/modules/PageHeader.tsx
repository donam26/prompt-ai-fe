"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  onBack: () => void;
}

const PageHeader = ({ title, description, onBack }: PageHeaderProps) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <Button
        variant="outline"
        size="icon"
        onClick={onBack}
        className="hover:bg-gray-100"
        aria-label="Go back"
      >
        <ArrowLeft className="w-4 h-4" />
      </Button>

      <div className="flex-1">
        <h1 className="mb-2 font-bold text-gray-900 text-2xl">{title}</h1>
        {description && (
          <p
            className="text-gray-600 text-sm"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </div>
    </div>
  );
};

export { PageHeader };
