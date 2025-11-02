"use client";

import { Component, type ReactNode } from "react";
import { Button } from "./button";

interface ErrorBoundaryProps {
  readonly children: ReactNode;
  readonly fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: undefined });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
          <h2 className="mb-4 font-bold text-2xl text-gray-900">
            Đã xảy ra lỗi
          </h2>
          <p className="mb-6 text-gray-600 max-w-md">
            Rất tiếc, đã có lỗi xảy ra. Vui lòng thử lại sau hoặc liên hệ với
            chúng tôi nếu vấn đề vẫn tiếp tục.
          </p>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <details className="mb-6 p-4 bg-gray-100 rounded-lg text-left text-sm max-w-2xl overflow-auto">
              <summary className="mb-2 font-semibold cursor-pointer">
                Chi tiết lỗi (chỉ hiển thị trong development)
              </summary>
              <pre className="whitespace-pre-wrap text-xs">
                {this.state.error.toString()}
                {this.state.error.stack}
              </pre>
            </details>
          )}
          <div className="flex gap-4">
            <Button onClick={this.handleReset} variant="outline">
              Thử lại
            </Button>
            <Button
              onClick={() => window.location.reload()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Tải lại trang
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
