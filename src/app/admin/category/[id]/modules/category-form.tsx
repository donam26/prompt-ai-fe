"use client";

import { useState, useEffect } from "react";
import { Save, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BaseTextField,
  BaseTextareaField,
  BaseSelectField,
  BaseSwitchField,
} from "@/components/ui/base";
import type { Category } from "@/lib/types";
import type { SelectOption } from "@/types/select.type";

export interface CategoryFormData {
  name: string;
  description: string;
  section_id: string;
  is_coming_soon: boolean;
}

export interface CategoryFormProps {
  mode: "create" | "edit";
  category?: Category | null;
  isLoading?: boolean;
  isSaving?: boolean;
  onSave: (data: CategoryFormData) => void;
  onCancel: () => void;
  className?: string;
}

export const CategoryForm = ({
  mode,
  category,
  isLoading = false,
  isSaving = false,
  onSave,
  onCancel,
  className,
}: CategoryFormProps) => {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    description: "",
    section_id: "",
    is_coming_soon: false,
  });

  // Section options
  const sectionOptions: SelectOption[] = [
    { id: "1", name: "Technology" },
    { id: "2", name: "Business" },
    { id: "3", name: "Creative" },
  ];

  // Pre-populate form data for edit mode
  useEffect(() => {
    if (mode === "edit" && category) {
      setFormData({
        name: category.name,
        description: category.description || "",
        section_id: category.section_id.toString(),
        is_coming_soon:
          category.is_coming_soon || category.is_comming_soon || false,
      });
    }
  }, [mode, category]);

  const handleInputChange = (field: keyof CategoryFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (isLoading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-gray-200 rounded w-10 h-10 animate-pulse" />
            <div className="bg-gray-200 rounded w-48 h-8 animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-gray-200 rounded w-20 h-9 animate-pulse" />
            <div className="bg-gray-200 rounded w-32 h-9 animate-pulse" />
          </div>
        </div>
        <div className="gap-6 grid lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="bg-gray-200 rounded w-full h-64 animate-pulse" />
          </div>
          <div className="bg-gray-200 rounded w-full h-32 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-gray-900 text-2xl">
            {mode === "create" ? "Create New Category" : "Edit Category"}
          </h1>
          <p className="text-gray-500">
            {mode === "create"
              ? "Add a new category to the system"
              : category?.name}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onCancel} disabled={isSaving}>
            <X className="mr-2 w-4 h-4" />
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={isSaving}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Save className="mr-2 w-4 h-4" />
            {isSaving
              ? mode === "create"
                ? "Creating..."
                : "Saving..."
              : mode === "create"
                ? "Create Category"
                : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="gap-6 grid lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <BaseTextField
                  id="name"
                  label="Name"
                  value={formData.name}
                  onChange={value => handleInputChange("name", value)}
                  placeholder="Enter category name"
                  required
                />

                <BaseTextareaField
                  id="description"
                  label="Description"
                  value={formData.description}
                  onChange={value => handleInputChange("description", value)}
                  placeholder="Enter category description"
                  rows={4}
                />

                <BaseSelectField
                  id="section"
                  label="Section"
                  value={formData.section_id}
                  onChange={value => handleInputChange("section_id", value)}
                  options={sectionOptions}
                  placeholder="Select a section"
                  required
                />

                <BaseSwitchField
                  id="coming-soon"
                  label="Coming Soon"
                  checked={formData.is_coming_soon}
                  onCheckedChange={checked =>
                    handleInputChange("is_coming_soon", checked)
                  }
                  description="Mark this category as coming soon"
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {mode === "edit" && category ? (
              <Card>
                <CardHeader>
                  <CardTitle>Category Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="font-medium text-gray-500 text-sm">
                      ID
                    </label>
                    <p className="font-mono text-gray-900 text-sm">
                      {category.id}
                    </p>
                  </div>

                  <div>
                    <label className="font-medium text-gray-500 text-sm">
                      Created At
                    </label>
                    <p className="text-gray-900 text-sm">
                      {new Date(category.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <label className="font-medium text-gray-500 text-sm">
                      Updated At
                    </label>
                    <p className="text-gray-900 text-sm">
                      {new Date(category.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-gray-600 text-sm">
                    <p className="mb-2 font-medium">Category Name:</p>
                    <ul className="space-y-1 text-xs list-disc list-inside">
                      <li>Must be unique</li>
                      <li>2-100 characters</li>
                      <li>Use clear, descriptive names</li>
                    </ul>
                  </div>

                  <div className="text-gray-600 text-sm">
                    <p className="mb-2 font-medium">Description:</p>
                    <ul className="space-y-1 text-xs list-disc list-inside">
                      <li>Optional but recommended</li>
                      <li>Max 500 characters</li>
                      <li>Explain the category purpose</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
