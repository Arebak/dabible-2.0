import React from "react";

interface ChapterErrorProps {
  message?: string;
  onRetry?: () => void;
  context?: string; // e.g., "parallel view"
}

export const ChapterError: React.FC<ChapterErrorProps> = ({ message = "Failed to load this chapter.", onRetry, context }) => {
  return (
    <div className="mt-4 p-4 border border-red-200 bg-red-50 rounded-lg" role="alert">
      <p className="text-sm text-red-700 mb-3 font-medium">
        {message} {context ? `(${context})` : ''}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ChapterError;
