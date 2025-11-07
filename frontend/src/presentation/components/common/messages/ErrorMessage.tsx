import React from "react";

interface ErrorMessageProps {
  message?: string | null;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  className = "",
}) => {
  if (!message || message === undefined) return null;

  return (
    <div className={`mt-4 text-red-600 text-center font-medium ${className}`}>
      {message}
    </div>
  );
};

export default ErrorMessage;
