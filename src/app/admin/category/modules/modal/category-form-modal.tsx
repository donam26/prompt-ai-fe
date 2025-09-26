"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  DIALOG_CONSTANTS,
  FORM_CONSTANTS,
  BUTTON_CONSTANTS,
} from "@/constants";
import type {
  // Category,
  Section,
  // CategoryFormData,
  CategoryFormDialogProps,
  CategoryFormFieldsProps,
  CategoryFormActionsProps,
} from "@/types/admin";

/**
 * Category form dialog component for creating and editing categories
 *
 * @param props - The component props
 * @returns The category form dialog JSX
 */
export const CategoryFormDialog = ({
  isOpen,
  onOpenChange,
  editingCategory,
  formData,
  onFormDataChange,
  onSubmit,
  sections,
  onReset,
}: CategoryFormDialogProps): React.JSX.Element => (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogContent className={DIALOG_CONSTANTS.CONTENT_CLASS}>
      <DialogHeader className={DIALOG_CONSTANTS.HEADER_CLASS}>
        <DialogTitle className={DIALOG_CONSTANTS.TITLE_CLASS}>
          {editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
        </DialogTitle>
        <DialogDescription className="text-gray-600">
          {editingCategory
            ? "Cập nhật thông tin danh mục"
            : "Điền thông tin để tạo danh mục mới"}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={onSubmit} className={FORM_CONSTANTS.SPACING}>
        <CategoryFormFields
          formData={formData}
          onFormDataChange={onFormDataChange}
          sections={sections}
        />
        <CategoryFormActions
          onReset={onReset}
          editingCategory={editingCategory}
        />
      </form>
    </DialogContent>
  </Dialog>
);

/**
 * Category form fields component
 *
 * @param props - The component props
 * @returns The category form fields JSX
 */
export const CategoryFormFields = ({
  formData,
  onFormDataChange,
  sections,
}: CategoryFormFieldsProps): React.JSX.Element => (
  <>
    <div className="space-y-2">
      <Label htmlFor="name">Tên danh mục</Label>
      <Input
        id="name"
        value={formData.name}
        onChange={e => onFormDataChange({ ...formData, name: e.target.value })}
        placeholder="Nhập tên danh mục"
        required
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="description">Mô tả</Label>
      <Textarea
        id="description"
        value={formData.description}
        onChange={e =>
          onFormDataChange({ ...formData, description: e.target.value })
        }
        placeholder="Nhập mô tả danh mục"
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="section">Phân loại</Label>
      <Select
        value={formData.section_id}
        onValueChange={value =>
          onFormDataChange({ ...formData, section_id: value })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Chọn phân loại" />
        </SelectTrigger>
        <SelectContent>
          {sections.map((section: Section) => (
            <SelectItem key={section.id} value={String(section.id)}>
              {section.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id="coming_soon"
        checked={formData.is_coming_soon}
        onChange={e =>
          onFormDataChange({ ...formData, is_coming_soon: e.target.checked })
        }
        className="border-gray-300 rounded"
      />
      <Label htmlFor="coming_soon">Sắp ra mắt</Label>
    </div>
  </>
);

/**
 * Category form actions component
 *
 * @param props - The component props
 * @returns The category form actions JSX
 */
export const CategoryFormActions = ({
  onReset,
  editingCategory,
}: CategoryFormActionsProps): React.JSX.Element => (
  <div className={`flex justify-end space-x-3 ${FORM_CONSTANTS.BORDER_TOP}`}>
    <Button
      type="button"
      variant="outline"
      onClick={onReset}
      className={BUTTON_CONSTANTS.OUTLINE}
    >
      Hủy
    </Button>
    <Button type="submit" className={BUTTON_CONSTANTS.PRIMARY}>
      {editingCategory ? "Cập nhật" : "Tạo mới"}
    </Button>
  </div>
);
