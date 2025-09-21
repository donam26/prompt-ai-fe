"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import type { BlogHeaderProps } from "@/types/admin";

/**
 * Blog page header component
 *
 * @param props - The component props
 * @returns The blog header JSX
 */
export const BlogHeader = ({
  onAddBlog,
}: BlogHeaderProps): React.JSX.Element => (
  <div className="flex justify-between items-center">
    <div>
      <h1 className="font-bold text-gray-900 text-3xl">Quản lý Blog</h1>
      <p className="mt-2 text-gray-600">
        Quản lý các bài viết blog trong hệ thống
      </p>
    </div>
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={onAddBlog}
          className="bg-primary-600 hover:bg-primary-700 shadow-sm text-white"
        >
          <Plus className="mr-2 w-4 h-4" />
          Thêm bài viết
        </Button>
      </DialogTrigger>
    </Dialog>
  </div>
);
