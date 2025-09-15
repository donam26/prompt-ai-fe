"use client";

import { useState } from "react";
import { Category, Section } from "@/lib/types";
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
import {
  createCategoryColumns,
  CategoryFilter,
  type FilterState,
} from "./(module)";
import { Plus } from "lucide-react";
import {
  useAdminCategories,
  useAdminSections,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "@/hooks";

export default function CategoryManagementPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: "",
    sectionId: "all",
    status: "all",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    section_id: "",
    is_coming_soon: false,
  });

  // Use hooks for data fetching
  const { data: categoriesData, isLoading: categoriesLoading } =
    useAdminCategories({
      page: currentPage,
      pageSize: 10,
      search: filters.searchTerm,
    });

  const { data: sectionsData, isLoading: sectionsLoading } = useAdminSections();

  // Extract data from API responses
  const categories = categoriesData?.data?.data || categoriesData?.data || [];
  const sections = sectionsData?.data?.data || sectionsData?.data || [];
  const totalPages = Math.ceil((categoriesData?.data?.total || 0) / 10);
  const isLoading = categoriesLoading || sectionsLoading;

  // Mutation hooks
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  const handleSubmit = async (e: React.FormEvent) => {
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
      setIsDialogOpen(false);
      setEditingCategory(null);
      setFormData({
        name: "",
        description: "",
        section_id: "",
        is_coming_soon: false,
      });
    } catch (error) {
      // Error handling is done in the hooks
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || "",
      section_id: String(category.section_id),
      is_coming_soon: category.is_coming_soon || false,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string | number) => {
    try {
      await deleteCategoryMutation.mutateAsync(id);
    } catch (error) {
      // Error handling is done in the hooks
    }
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      searchTerm: "",
      sectionId: "all",
      status: "all",
    });
    setCurrentPage(1);
  };

  // Client-side filtering for section and status (search is handled by API)
  const filteredCategories = categories.filter((category: Category) => {
    // Section filter
    if (filters.sectionId && filters.sectionId !== "all") {
      if (String(category.section_id) !== filters.sectionId) return false;
    }

    // Status filter
    if (filters.status && filters.status !== "all") {
      if (filters.status === "active" && category.is_coming_soon) return false;
      if (filters.status === "coming_soon" && !category.is_coming_soon)
        return false;
    }

    return true;
  });

  const columns = createCategoryColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-gray-900 text-3xl">Quản lý Danh mục</h1>
          <p className="mt-1 text-gray-600">Quản lý các danh mục prompt</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingCategory(null);
                setFormData({
                  name: "",
                  description: "",
                  section_id: "",
                  is_coming_soon: false,
                });
              }}
            >
              <Plus className="mr-2 w-4 h-4" />
              Thêm danh mục
            </Button>
          </DialogTrigger>
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tên danh mục</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={e =>
                    setFormData(prev => ({ ...prev, name: e.target.value }))
                  }
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
                    setFormData(prev => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Nhập mô tả danh mục"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="section">Phân loại</Label>
                <Select
                  value={formData.section_id}
                  onValueChange={value =>
                    setFormData(prev => ({ ...prev, section_id: value }))
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
                    setFormData(prev => ({
                      ...prev,
                      is_coming_soon: e.target.checked,
                    }))
                  }
                  className="border-gray-300 rounded"
                />
                <Label htmlFor="coming_soon">Sắp ra mắt</Label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Hủy
                </Button>
                <Button type="submit">
                  {editingCategory ? "Cập nhật" : "Tạo mới"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <CategoryFilter
        sections={sections}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        initialFilters={filters}
        showActiveFilters={true}
      />

      {/* Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách danh mục</CardTitle>
          <CardDescription>
            Quản lý tất cả các danh mục trong hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredCategories}
            columns={columns}
            loading={isLoading}
            emptyText="Không tìm thấy danh mục nào"
            pagination={{
              currentPage,
              totalPages,
              onPageChange: setCurrentPage,
              showPrevNext: true,
              maxVisiblePages: 5,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
