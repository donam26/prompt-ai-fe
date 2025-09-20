"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { DataTable } from "@/components/data-table";
import { createCategoryColumns, CategoryFilter } from "./(module)";
import {
  useAdminCategories,
  useAdminSections,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "@/hooks";
import type {
  Category,
  Section,
  CategoryFormData,
  FilterState,
  CategoryHeaderProps,
  CategoryFormDialogProps,
  CategoryFormFieldsProps,
  CategoryFormActionsProps,
  CategoryTableProps,
} from "@/types/admin";

/**
 * Initial form data for category creation
 */
const INITIAL_FORM_DATA: CategoryFormData = {
  name: "",
  description: "",
  section_id: "",
  is_coming_soon: false,
};

/**
 * Initial filter state
 */
const INITIAL_FILTERS: FilterState = {
  searchTerm: "",
  sectionId: "all",
  status: "all",
};

/**
 * Category management page component that allows CRUD operations on categories
 *
 * @returns The category management page JSX
 */
export default function CategoryManagementPage(): React.JSX.Element {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState<CategoryFormData>(INITIAL_FORM_DATA);

  // Use hooks for data fetching
  const { data: categoriesData, isLoading: categoriesLoading } =
    useAdminCategories({
      page: currentPage,
      pageSize: 10,
      search: filters.searchTerm,
    });

  const { data: sectionsData, isLoading: sectionsLoading } = useAdminSections();

  // Extract data from API responses
  const categories = Array.isArray(categoriesData?.data?.data)
    ? categoriesData.data.data
    : Array.isArray(categoriesData?.data)
      ? categoriesData.data
      : [];
  const sections = Array.isArray(sectionsData?.data?.data)
    ? sectionsData.data.data
    : Array.isArray(sectionsData?.data)
      ? sectionsData.data
      : [];
  const totalPages = Math.ceil((categoriesData?.data?.total || 0) / 10);
  const isLoading = categoriesLoading || sectionsLoading;

  // Mutation hooks
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  /**
   * Handles form submission for creating or updating categories
   *
   * @param e - The form event
   */
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await updateCategoryMutation.mutateAsync({
          id: editingCategory.id,
          data: formData,
        });
      } else {
        await createCategoryMutation.mutateAsync(formData);
      }
      resetForm();
    } catch {
      // Error submitting category form - could be logged to monitoring service
    }
  };

  /**
   * Handles editing a category by populating the form with category data
   *
   * @param category - The category to edit
   */
  const handleEdit = (category: Category): void => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || "",
      section_id: String(category.section_id),
      is_coming_soon: category.is_coming_soon || false,
    });
    setIsDialogOpen(true);
  };

  /**
   * Handles deleting a category
   *
   * @param id - The ID of the category to delete
   */
  const handleDelete = async (id: string | number): Promise<void> => {
    try {
      await deleteCategoryMutation.mutateAsync(id);
    } catch {
      // Error deleting category - could be logged to monitoring service
    }
  };

  /**
   * Handles filter changes and resets pagination
   *
   * @param newFilters - The new filter state
   */
  const handleFilterChange = (newFilters: FilterState): void => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  /**
   * Clears all filters and resets pagination
   */
  const handleClearFilters = (): void => {
    setFilters(INITIAL_FILTERS);
    setCurrentPage(1);
  };

  /**
   * Resets the form to initial state and closes dialog
   */
  const resetForm = (): void => {
    setIsDialogOpen(false);
    setEditingCategory(null);
    setFormData(INITIAL_FORM_DATA);
  };

  /**
   * Filters categories based on current filter state
   *
   * @param categories - The categories to filter
   * @param filters - The current filter state
   * @returns The filtered categories
   */
  const filterCategories = (
    categories: Category[],
    filters: FilterState
  ): Category[] => {
    return categories.filter((category: Category) => {
      // Section filter
      if (filters.sectionId && filters.sectionId !== "all") {
        if (String(category.section_id) !== filters.sectionId) return false;
      }

      // Status filter
      if (filters.status && filters.status !== "all") {
        if (filters.status === "active" && category.is_coming_soon)
          return false;
        if (filters.status === "coming_soon" && !category.is_coming_soon)
          return false;
      }

      return true;
    });
  };

  const filteredCategories = filterCategories(categories, filters);
  const columns = createCategoryColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  return (
    <div className="space-y-6">
      <CategoryHeader onAddCategory={resetForm} />
      <CategoryFilter
        sections={sections}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        initialFilters={filters}
        showActiveFilters={true}
      />
      <CategoryFormDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        editingCategory={editingCategory}
        formData={formData}
        onFormDataChange={setFormData}
        onSubmit={handleSubmit}
        sections={sections}
        onReset={resetForm}
      />
      <CategoryTable
        data={filteredCategories}
        columns={columns}
        loading={isLoading}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

/**
 * Category page header component
 *
 * @param props - The component props
 * @returns The category header JSX
 */
const CategoryHeader = ({
  onAddCategory,
}: CategoryHeaderProps): React.JSX.Element => (
  <div className="flex justify-between items-center">
    <div>
      <h1 className="font-bold text-gray-900 text-3xl">Quản lý Danh mục</h1>
      <p className="mt-1 text-gray-600">Quản lý các danh mục prompt</p>
    </div>
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={onAddCategory}>
          <Plus className="mr-2 w-4 h-4" />
          Thêm danh mục
        </Button>
      </DialogTrigger>
    </Dialog>
  </div>
);

/**
 * Category form dialog component for creating and editing categories
 *
 * @param props - The component props
 * @returns The category form dialog JSX
 */
const CategoryFormDialog = ({
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
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>
          {editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
        </DialogTitle>
        <DialogDescription>
          {editingCategory
            ? "Cập nhật thông tin danh mục"
            : "Điền thông tin để tạo danh mục mới"}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={onSubmit} className="space-y-4">
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
const CategoryFormFields = ({
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
const CategoryFormActions = ({
  onReset,
  editingCategory,
}: CategoryFormActionsProps): React.JSX.Element => (
  <div className="flex justify-end space-x-2">
    <Button type="button" variant="outline" onClick={onReset}>
      Hủy
    </Button>
    <Button type="submit">{editingCategory ? "Cập nhật" : "Tạo mới"}</Button>
  </div>
);

/**
 * Category table component
 *
 * @param props - The component props
 * @returns The category table JSX
 */
const CategoryTable = ({
  data,
  columns,
  loading,
  currentPage,
  totalPages,
  onPageChange,
}: CategoryTableProps): React.JSX.Element => (
  <Card>
    <CardHeader>
      <CardTitle>Danh sách danh mục</CardTitle>
      <CardDescription>
        Quản lý tất cả các danh mục trong hệ thống
      </CardDescription>
    </CardHeader>
    <CardContent>
      <DataTable
        data={data}
        columns={columns}
        loading={loading}
        emptyText="Không tìm thấy danh mục nào"
        pagination={{
          currentPage,
          totalPages,
          onPageChange,
          showPrevNext: true,
          maxVisiblePages: 5,
        }}
      />
    </CardContent>
  </Card>
);
