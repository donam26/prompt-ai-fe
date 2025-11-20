"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
interface BlogHeaderProps {
  onAddBlog: () => void;
}

/**
 * Blog page header component
 *
 * @param props - The component props
 * @returns The blog header JSX
 */
export const BlogHeader = ({
  onAddBlog,
}: BlogHeaderProps): React.JSX.Element => (
  <div className="flex sm:flex-row flex-col sm:justify-between sm:items-start gap-4">
    <div className="sm:text-left text-center">
      <h1 className="font-bold text-gray-900 text-2xl sm:text-3xl">
        Quản lý Blog
      </h1>
      <p className="mt-1 sm:mt-2 text-gray-600">
        Quản lý các bài viết blog trong hệ thống
      </p>
    </div>
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={onAddBlog}
          className="bg-primary-600 hover:bg-primary-700 shadow-sm text-white justify-center w-full sm:w-auto"
        >
          <Plus className="mr-2 w-4 h-4" />
          Thêm bài viết
        </Button>
      </DialogTrigger>
    </Dialog>
  </div>
);
