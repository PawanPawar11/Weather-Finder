import { Loader2 } from "lucide-react";
import type React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className="animate-spin size-6 text-white" />
    </div>
  );
};

export default LoadingSpinner;
