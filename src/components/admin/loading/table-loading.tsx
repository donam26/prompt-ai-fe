import React from "react";
import { LOADING_SIZE, TABLE_LOADING_SIZE_CLASSES } from "@/constants/loading";

interface TableLoadingProps {
  size: LOADING_SIZE;
}

/**
 * Table loading component with dots animation
 * Used for table data loading states
 */
const TableLoading: React.FC<TableLoadingProps> = ({ size }) => (
  <div className="flex justify-center items-center space-x-1">
    <div
      className={`${TABLE_LOADING_SIZE_CLASSES[size]} bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]`}
    />
    <div
      className={`${TABLE_LOADING_SIZE_CLASSES[size]} bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]`}
    />
    <div
      className={`${TABLE_LOADING_SIZE_CLASSES[size]} bg-primary/80 rounded-full animate-bounce`}
    />
  </div>
);

export default TableLoading;
