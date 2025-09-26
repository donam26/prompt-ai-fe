"use client";

import Image from "next/image";
import { ArrowLeft, Edit, Trash2, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
import type { Category } from "@/lib/types";

export interface CategoryDetailProps {
  category: Category;
  isLoading?: boolean;
  isDeleting?: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onBack: () => void;
  className?: string;
}

export const CategoryDetail = ({
  category,
  isLoading = false,
  isDeleting = false,
  onEdit,
  onDelete,
  onBack,
  className,
}: CategoryDetailProps) => {
  if (isLoading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="flex items-center gap-4">
          <div className="bg-gray-200 rounded w-10 h-10 animate-pulse" />
          <div className="bg-gray-200 rounded w-48 h-8 animate-pulse" />
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
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="font-bold text-gray-900 text-2xl">
              {category.name}
            </h1>
            <p className="text-gray-500">Category Details</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            className="hover:bg-blue-50 hover:text-blue-600"
          >
            <Edit className="mr-2 w-4 h-4" />
            Edit
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="mr-2 w-4 h-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Category</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete {category.name}? This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={onDelete}
                  disabled={isDeleting}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Separator />

      {/* Content */}
      <div className="gap-6 grid lg:grid-cols-3">
        {/* Main Info */}
        <div className="space-y-6 lg:col-span-2">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="gap-4 grid md:grid-cols-2">
                <div>
                  <label className="font-medium text-gray-500 text-sm">
                    Name
                  </label>
                  <p className="font-medium text-gray-900">{category.name}</p>
                </div>

                <div>
                  <label className="font-medium text-gray-500 text-sm">
                    Type
                  </label>
                  <div className="mt-1">
                    {category.type === "premium" ? (
                      <Badge variant="default">Premium</Badge>
                    ) : (
                      <Badge variant="secondary">Standard</Badge>
                    )}
                  </div>
                </div>
              </div>

              {category.description && (
                <div>
                  <label className="font-medium text-gray-500 text-sm">
                    Description
                  </label>
                  <p className="mt-1 text-gray-900">{category.description}</p>
                </div>
              )}

              <div className="gap-4 grid md:grid-cols-2">
                <div>
                  <label className="font-medium text-gray-500 text-sm">
                    Section
                  </label>
                  <p className="mt-1 text-gray-900">
                    {category.Section?.name ||
                      category.section?.name ||
                      "Not assigned"}
                  </p>
                </div>

                <div>
                  <label className="font-medium text-gray-500 text-sm">
                    Status
                  </label>
                  <div className="mt-1">
                    {category.is_coming_soon || category.is_comming_soon ? (
                      <Badge variant="destructive">Coming Soon</Badge>
                    ) : (
                      <Badge variant="default">Active</Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Industries */}
          {category.industries && category.industries.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Related Industries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.industries.map(industry => (
                    <Badge key={industry.id} variant="outline">
                      {industry.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Image */}
          {category.image && (
            <Card>
              <CardHeader>
                <CardTitle>Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg aspect-square overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle>Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
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

              <div>
                <label className="font-medium text-gray-500 text-sm">ID</label>
                <p className="font-mono text-gray-900 text-sm">{category.id}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
