"use client";

import React from "react";
import { Save, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BUTTON_CONSTANTS } from "@/constants";

export const BlogFormActions = ({
  onReset,
  onSubmit,
}: {
  onReset: () => void;
  onSubmit: (e: React.FormEvent) => void;
}): React.JSX.Element => (
  <div className="flex justify-end items-center gap-4">
    {/* Reset button */}
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={onReset}
        className={`${BUTTON_CONSTANTS.OUTLINE} h-10`}
      >
        <ArrowLeft className="mr-2 w-4 h-4" />
        Đặt lại
      </Button>
    </div>

    {/* Save button */}
    <Button
      type="submit"
      form="blog-form"
      onClick={onSubmit}
      className={`${BUTTON_CONSTANTS.PRIMARY} h-10`}
    >
      <Save className="mr-2 w-4 h-4" />
      Cập nhật
    </Button>
  </div>
);
