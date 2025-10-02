"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { BLOG_CATEGORY_CONSTANTS } from "@/constants/blog-category";
import {
  blogCategoryFormSchema,
  getBlogCategoryFormDefaultValues,
} from "@/libs/form-schemas";
import type { BlogCategoryFormModalProps } from "@/types/admin/blog-category";

export const BlogCategoryFormModal = ({
  blogCategory,
  onSubmit,
  onCancel,
  isLoading = false,
  errors = {},
  isOpen = true,
}: BlogCategoryFormModalProps): React.JSX.Element => {
  const form = useForm({
    resolver: zodResolver(blogCategoryFormSchema),
    defaultValues: getBlogCategoryFormDefaultValues(blogCategory),
  });

  const handleSubmit = (values: any): void => {
    const formData = {
      id: blogCategory?.id,
      name: values.name,
      description: values.description,
    };
    onSubmit(formData);
  };

  const handleCancel = (): void => {
    form.reset();
    onCancel();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-semibold text-xl">
            {blogCategory
              ? "Chỉnh sửa Blog Category"
              : "Thêm Blog Category mới"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="space-y-4">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-sm">
                      {BLOG_CATEGORY_CONSTANTS.FORM.FIELDS.NAME.LABEL}
                      <span className="ml-1 text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          BLOG_CATEGORY_CONSTANTS.FORM.FIELDS.NAME.PLACEHOLDER
                        }
                        {...field}
                        disabled={isLoading}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description Field */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-sm">
                      {BLOG_CATEGORY_CONSTANTS.FORM.FIELDS.DESCRIPTION.LABEL}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={
                          BLOG_CATEGORY_CONSTANTS.FORM.FIELDS.DESCRIPTION
                            .PLACEHOLDER
                        }
                        {...field}
                        disabled={isLoading}
                        className="w-full min-h-[100px] resize-none"
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Error Display */}
            {Object.keys(errors).length > 0 && (
              <div className="bg-red-50 p-4 border border-red-200 rounded-md">
                <div className="text-red-800 text-sm">
                  {Object.values(errors).map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <DialogFooter className="flex sm:flex-row flex-col gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                {isLoading
                  ? "Đang xử lý..."
                  : blogCategory
                    ? "Cập nhật"
                    : "Tạo mới"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
