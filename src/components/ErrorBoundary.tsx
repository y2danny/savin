import React from 'react';
import Button from './ui/Button';
import { Home, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Oops!</h1>
            <p className="text-gray-600 mb-8">
              Something went wrong. We're working on fixing it.
            </p>
            <div className="space-y-4">
              <Button
                onClick={() => window.location.reload()}
                icon={<RefreshCw size={16} />}
              >
                Try Again
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = '/'}
                icon={<Home size={16} />}
              >
                Go Home
              </Button>
            </div>
            {import.meta.env.DEV && (
              <pre className="mt-8 text-left bg-red-50 p-4 rounded-lg text-sm text-red-600 overflow-auto">
                {this.state.error?.toString()}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;