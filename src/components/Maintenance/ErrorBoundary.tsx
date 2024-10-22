// src/components/ErrorBoundary.js
import React from 'react';
import Maintenance from './Maintenance';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error) { // Thêm kiểu cho tham số 'error'
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) { // Thêm kiểu cho tham số 'errorInfo'
    // Bạn có thể ghi log lỗi ở đây
    console.error('Caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Maintenance />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;