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

import { SECTIONS_CONSTANTS } from "@/constants/sections";
import {
  sectionFormSchema,
  getSectionFormDefaultValues,
} from "@/libs/form-schemas";
import type { SectionFormModalProps } from "@/types/admin/section";

export const SectionFormModal = ({
  section,
  onSubmit,
  onCancel,
  isLoading = false,
  errors = {},
  isOpen = true,
}: SectionFormModalProps): React.JSX.Element => {
  const form = useForm({
    resolver: zodResolver(sectionFormSchema),
    defaultValues: getSectionFormDefaultValues(section),
  });

  const handleSubmit = (values: any): void => {
    const formData = {
      id: section?.id,
      name: values.name,
      description: values.description,
      status: values.status,
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
            {section ? "Chỉnh sửa Section" : "Thêm Section mới"}
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
                      {SECTIONS_CONSTANTS.FORM.FIELDS.NAME.LABEL}
                      <span className="ml-1 text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          SECTIONS_CONSTANTS.FORM.FIELDS.NAME.PLACEHOLDER
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
                      {SECTIONS_CONSTANTS.FORM.FIELDS.DESCRIPTION.LABEL}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={
                          SECTIONS_CONSTANTS.FORM.FIELDS.DESCRIPTION.PLACEHOLDER
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
                {isLoading ? "Đang xử lý..." : section ? "Cập nhật" : "Tạo mới"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
