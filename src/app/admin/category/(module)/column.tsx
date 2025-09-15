import React from "react";
import { Badge } from "@/components/ui/badge";
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
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { Column } from "../../../../components/data-table/data-table";
import { Category } from "@/lib/types";

export const categoryColumns: Column<Category>[] = [
  {
    key: "image",
    title: "Hình ảnh",
    width: 80,
    align: "center",
    render: (_, category) =>
      category.image ? (
        <Image
          src={category.image}
          alt={category.name}
          width={40}
          height={40}
          className="rounded"
        />
      ) : (
        <div className="flex justify-center items-center bg-gray-200 rounded w-10 h-10">
          <span className="text-gray-400 text-xs">No Image</span>
        </div>
      ),
  },
  {
    key: "name",
    title: "Tên",
    dataIndex: "name",
    className: "font-medium",
  },
  {
    key: "description",
    title: "Mô tả",
    dataIndex: "description",
    className: "max-w-xs truncate",
  },
  {
    key: "section",
    title: "Phân loại",
    render: (_, category, index, context) =>
      category.section?.name || "Chưa phân loại",
  },
  {
    key: "status",
    title: "Trạng thái",
    render: (_, category, index, context) => (
      <Badge variant={category.is_coming_soon ? "secondary" : "default"}>
        {category.is_coming_soon ? "Sắp ra mắt" : "Hoạt động"}
      </Badge>
    ),
  },
  {
    key: "actions",
    title: "Thao tác",
    width: 120,
    align: "center",
    render: (_, category, index, context) => {
      const { onEdit, onDelete } =
        (context as {
          onEdit?: (category: Category) => void;
          onDelete?: (id: string | number) => void;
        }) || {};
      return (
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" onClick={() => onEdit?.(category)}>
            <Edit className="w-4 h-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Trash2 className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                <AlertDialogDescription>
                  Bạn có chắc chắn muốn xóa danh mục &quot;
                  {category.name}&quot;? Hành động này không thể hoàn tác.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete?.(category.id)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Xóa
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];

// Helper function to create columns with custom handlers
export const createCategoryColumns = (handlers: {
  onEdit?: (category: Category) => void;
  onDelete?: (id: string | number) => void;
}): Column<Category>[] => {
  return categoryColumns.map(column => {
    if (column.key === "actions") {
      return {
        ...column,
        render: (value, category, index) =>
          column.render?.(value, category, index, handlers),
      };
    }
    return column;
  });
};
