"use client";

import { Edit, Trash2, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ActionsCellProps<T> {
  item: T;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onManageBadge?: (item: T) => void;
  getItemId?: (item: T) => string | number;
  className?: string;
}

export function ActionsCell<T>({
  item,
  onEdit,
  onDelete,
  onManageBadge,
  // getItemId = (item: any) => item.id,
  className,
}: ActionsCellProps<T>) {
  const handleEdit = () => {
    onEdit?.(item);
  };

  const handleDelete = () => {
    onDelete?.(item);
  };

  const handleManageBadge = () => {
    onManageBadge?.(item);
  };

  return (
    <div className={cn("flex justify-center items-center gap-1", className)}>
      {/* Edit Button */}
      {onEdit && (
        <Button
          variant="ghost"
          onClick={handleEdit}
          className="hover:bg-blue-50 p-1 sm:p-1.5 w-7 sm:w-8 h-7 sm:h-8 hover:text-blue-600 transition-colors"
          title="Chỉnh sửa"
        >
          <Edit className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
        </Button>
      )}

      {/* Delete Button */}
      {onDelete && (
        <Button
          variant="ghost"
          onClick={handleDelete}
          className="hover:bg-red-50 p-1 sm:p-1.5 w-7 sm:w-8 h-7 sm:h-8 hover:text-red-600 transition-colors"
          title="Xóa"
        >
          <Trash2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
        </Button>
      )}

      {/* Manage Badge Button */}
      {onManageBadge && (
        <Button
          variant="ghost"
          onClick={handleManageBadge}
          className="hover:bg-purple-50 p-1 sm:p-1.5 w-7 sm:w-8 h-7 sm:h-8 hover:text-purple-600 transition-colors"
          title="Quản lý badge"
        >
          <Award className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
        </Button>
      )}
    </div>
  );
}
