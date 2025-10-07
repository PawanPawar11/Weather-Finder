import { AlertTriangle } from "lucide-react";
import React from "react";

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="flex items-center justify-center gap-2 text-red-500">
      <AlertTriangle className="size-5" />
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default ErrorMessage;
