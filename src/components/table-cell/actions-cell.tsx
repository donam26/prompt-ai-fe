"use client";

import { Edit, Trash2, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

export interface ActionsCellProps<T> {
  item: T;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onManageBadge?: (item: T) => void;
  getItemName?: (item: T) => string;
  getItemId?: (item: T) => string | number;
  className?: string;
}

export function ActionsCell<T>({
  item,
  onEdit,
  onDelete,
  onManageBadge,
  getItemName = (item: any) => item.name || "Item",
  // getItemId = (item: any) => item.id,
  className,
}: ActionsCellProps<T>) {
  const handleEdit = () => {
    onEdit?.(item);
  };

  const handleDelete = () => {
    const itemId = (item as any).id;
    onDelete?.(itemId);
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
          size="sm"
          onClick={handleEdit}
          className="hover:bg-blue-50 p-1 sm:p-1.5 w-7 sm:w-8 h-7 sm:h-8 hover:text-blue-600 transition-colors"
          title="Chỉnh sửa"
        >
          <Edit className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
        </Button>
      )}

      {/* Delete Button */}
      {onDelete && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-red-50 p-1 sm:p-1.5 w-7 sm:w-8 h-7 sm:h-8 hover:text-red-600 transition-colors"
              title="Xóa"
            >
              <Trash2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
              <AlertDialogDescription>
                Bạn có chắc chắn muốn xóa &quot;
                {getItemName(item)}&quot;? Hành động này không thể hoàn tác.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Hủy</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Xóa
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Manage Badge Button */}
      {onManageBadge && (
        <Button
          variant="ghost"
          size="sm"
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
