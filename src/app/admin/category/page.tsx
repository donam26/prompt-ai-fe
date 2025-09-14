"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
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
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Plus, Edit, Trash2, Search, Filter } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function CategoryManagementPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSection] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    section_id: "",
    is_coming_soon: false,
  });

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      const response = await api.getCategoriesPage(currentPage, 10, "");
      setCategories(response.data.data || response.data);
      setTotalPages(Math.ceil((response.data.total || 0) / 10));
    } catch (error) {
      // Error loading categories
      toast.error("Có lỗi xảy ra khi tải danh mục");
    } finally {
      setIsLoading(false);
    }
  };

  const loadSections = async () => {
    try {
      const response = await api.getSections();
      setSections(response.data.data || response.data);
    } catch (error) {
      // Error loading sections
    }
  };

  useEffect(() => {
    loadCategories();
    loadSections();
  }, [currentPage, loadCategories, loadSections]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await api.updateCategories(editingCategory.id, formData);
        toast.success("Cập nhật danh mục thành công");
      } else {
        await api.createCategories(formData);
        toast.success("Tạo danh mục thành công");
      }
      setIsDialogOpen(false);
      setEditingCategory(null);
      setFormData({
        name: "",
        description: "",
        section_id: "",
        is_coming_soon: false,
      });
      loadCategories();
    } catch (error) {
      // Error saving category
      toast.error("Có lỗi xảy ra khi lưu danh mục");
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
      await api.deleteCategories(id);
      toast.success("Xóa danh mục thành công");
      loadCategories();
    } catch (error) {
      // Error deleting category
      toast.error("Có lỗi xảy ra khi xóa danh mục");
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    loadCategories();
  };

  const filteredCategories = categories.filter(
    category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (category.description &&
        category.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
                    {sections.map(section => (
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
      <Card>
        <CardHeader>
          <CardTitle>Tìm kiếm và lọc</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex sm:flex-row flex-col gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="top-3 left-3 absolute w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm danh mục..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button onClick={handleSearch}>
              <Filter className="mr-2 w-4 h-4" />
              Tìm kiếm
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách danh mục</CardTitle>
          <CardDescription>
            Quản lý tất cả các danh mục trong hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hình ảnh</TableHead>
                    <TableHead>Tên</TableHead>
                    <TableHead>Mô tả</TableHead>
                    <TableHead>Phân loại</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategories.map(category => (
                    <TableRow key={category.id}>
                      <TableCell>
                        {category.image ? (
                          <Image
                            src={category.image}
                            alt={category.name}
                            width={40}
                            height={40}
                            className="rounded"
                          />
                        ) : (
                          <div className="flex justify-center items-center bg-gray-200 rounded w-10 h-10">
                            <span className="text-gray-400 text-xs">
                              No Image
                            </span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        {category.name}
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {category.description || "Không có mô tả"}
                      </TableCell>
                      <TableCell>
                        {category.section?.name || "Chưa phân loại"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            category.is_coming_soon ? "secondary" : "default"
                          }
                        >
                          {category.is_coming_soon ? "Sắp ra mắt" : "Hoạt động"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(category)}
                          >
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
                                <AlertDialogTitle>
                                  Xác nhận xóa
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Bạn có chắc chắn muốn xóa danh mục &quot;
                                  {category.name}&quot;? Hành động này không thể
                                  hoàn tác.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Hủy</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(category.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Xóa
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredCategories.length === 0 && (
                <div className="py-8 text-gray-500 text-center">
                  Không tìm thấy danh mục nào
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Trước
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={() =>
                setCurrentPage(prev => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Sau
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
