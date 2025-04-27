import React from 'react';
import Button from './Button';
import { RefreshCw } from 'lucide-react';

interface ErrorProps {
  message?: string;
  onRetry?: () => void;
}

const Error: React.FC<ErrorProps> = ({ message = 'Something went wrong', onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
      <p className="text-red-600 mb-4">{message}</p>
      {onRetry && (
        <Button
          variant="outline"
          onClick={onRetry}
          icon={<RefreshCw size={16} />}
        >
          Try Again
        </Button>
      )}
    </div>
  );
};

export default Error;