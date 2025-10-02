"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { TopicFormData } from "@/types";
import type { TopicFormProps } from "@/types/admin/topic";
import { TOPICS_CONSTANTS } from "@/constants/topics";
import {
  topicFormSchema,
  TopicFormValues,
  getTopicFormDefaultValues,
} from "@/libs/form-schemas";

export const TopicFormModal = ({
  topic,
  onSubmit,
  onCancel,
  isLoading = false,
  errors = {},
  isOpen = true,
}: TopicFormProps & { isOpen?: boolean }): React.JSX.Element => {
  const form = useForm<TopicFormValues>({
    resolver: zodResolver(topicFormSchema),
    defaultValues: getTopicFormDefaultValues(topic),
  });

  useEffect(() => {
    form.reset(getTopicFormDefaultValues(topic));
  }, [topic, form]);

  const handleSubmit = (values: TopicFormValues): void => {
    const formData: TopicFormData = {
      id: topic?.id,
      name: values.name,
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
            {topic ? "Chỉnh sửa Topic" : "Thêm Topic mới"}
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
                      {TOPICS_CONSTANTS.FORM.FIELDS.NAME.LABEL}
                      <span className="ml-1 text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          TOPICS_CONSTANTS.FORM.FIELDS.NAME.PLACEHOLDER
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
                {isLoading ? "Đang xử lý..." : topic ? "Cập nhật" : "Tạo mới"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
