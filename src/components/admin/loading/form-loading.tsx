import React from "react";
import { LOADING_SIZE, FORM_LOADING_SIZE_CLASSES } from "@/constants/loading";

interface FormLoadingProps {
  size: LOADING_SIZE;
}

/**
 * Form loading component with spinning border
 * Used for form submission and inline loading states
 */
const FormLoading: React.FC<FormLoadingProps> = ({ size }) => (
  <div className={`relative ${FORM_LOADING_SIZE_CLASSES[size]}`}>
    <div className="border-[3px] border-gray-200 border-t-primary rounded-full w-full h-full animate-spin" />
  </div>
);

export default FormLoading;
