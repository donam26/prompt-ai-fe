"use client";

import React from "react";
import { FormSkeleton } from "./form-skeleton";

export interface BlogFormSkeletonProps {
  readonly className?: string;
}

export const BlogFormSkeleton = ({
  className,
}: BlogFormSkeletonProps): React.JSX.Element => {
  return (
    <div className={className}>
      <FormSkeleton fields={6} showActions={true} />
    </div>
  );
};
