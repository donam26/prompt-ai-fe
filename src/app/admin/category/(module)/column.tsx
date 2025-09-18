import React from "react";
import Image from "next/image";
import { Edit, Trash2 } from "lucide-react";

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
import { Column } from "../../../../components/data-table/data-table";
import type {
  Category,
  ColumnHandlers,
  CategoryImageProps,
  CategoryStatusProps,
  CategoryActionsProps,
} from "@/types/admin";

/**
 * Category image component that displays category image or placeholder
 *
 * @param props - The component props
 * @returns The category image JSX
 */
const CategoryImage = ({ category }: CategoryImageProps): React.JSX.Element => {
  if (category.image) {
    return (
      <Image
        src={category.image}
        alt={category.name}
        width={40}
        height={40}
        className="rounded"
      />
    );
  }

  return (
    <div className="flex justify-center items-center bg-gray-200 rounded w-10 h-10">
      <span className="text-gray-400 text-xs">No Image</span>
    </div>
  );
};

/**
 * Category status component that displays status badge
 *
 * @param props - The component props
 * @returns The category status JSX
 */
const CategoryStatus = ({
  category,
}: CategoryStatusProps): React.JSX.Element => (
  <Badge variant={category.is_coming_soon ? "secondary" : "default"}>
    {category.is_coming_soon ? "Sắp ra mắt" : "Hoạt động"}
  </Badge>
);

/**
 * Category actions component that displays edit and delete buttons
 *
 * @param props - The component props
 * @returns The category actions JSX
 */
const CategoryActions = ({
  category,
  handlers,
}: CategoryActionsProps): React.JSX.Element => {
  const { onEdit, onDelete } = handlers;

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
};

/**
 * Base category columns configuration
 */
export const categoryColumns: Column<Category>[] = [
  {
    key: "image",
    title: "Hình ảnh",
    width: 80,
    align: "center",
    render: (_, category) => <CategoryImage category={category} />,
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
    render: (_, category) => category.section?.name || "Chưa phân loại",
  },
  {
    key: "status",
    title: "Trạng thái",
    render: (_, category) => <CategoryStatus category={category} />,
  },
  {
    key: "actions",
    title: "Thao tác",
    width: 120,
    align: "center",
    render: (_, category, index, context) => {
      const handlers = (context as ColumnHandlers) || {};
      return <CategoryActions category={category} handlers={handlers} />;
    },
  },
];

/**
 * Creates category columns with custom handlers
 *
 * @param handlers - The column handlers
 * @returns The configured category columns
 */
export const createCategoryColumns = (
  handlers: ColumnHandlers
): Column<Category>[] => {
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
