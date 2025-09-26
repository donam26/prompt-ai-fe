import clsx from "clsx";
import React from "react";
import {
  LOADING_TYPE,
  LOADING_SIZE,
  LOADING_DEFAULTS,
} from "@/constants/loading";
import FormLoading from "./form-loading";
import PageLoading from "./page-loading";
import TableLoading from "./table-loading";
import CardLoading from "./card-loading";

export interface LoadingProps {
  type?: LOADING_TYPE;
  size?: LOADING_SIZE;
  text?: string;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  type = LOADING_DEFAULTS.TYPE,
  size = LOADING_DEFAULTS.SIZE,
  text = LOADING_DEFAULTS.TEXT,
  className = LOADING_DEFAULTS.CLASS_NAME,
}) => {
  const renderLoadingComponent = (): React.ReactNode => {
    switch (type) {
      case LOADING_TYPE.PAGE:
        return <PageLoading />;
      case LOADING_TYPE.FORM:
        return <FormLoading size={size} />;
      case LOADING_TYPE.TABLE:
        return <TableLoading size={size} />;
      case LOADING_TYPE.CARD:
        return <CardLoading size={size} />;
      default:
        return <FormLoading size={size} />;
    }
  };

  return (
    <div
      className={clsx(
        type !== LOADING_TYPE.PAGE && "relative min-h-[150px]",
        "flex flex-col items-center justify-center w-full",
        className
      )}
    >
      {renderLoadingComponent()}
      {text && (
        <p className="mt-4 font-medium text-gray-600 text-sm text-center">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loading;
