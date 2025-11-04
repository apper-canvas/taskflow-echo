import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Textarea = forwardRef(({ 
  className, 
  error = false,
  rows = 3,
  ...props 
}, ref) => {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        "w-full px-4 py-2.5 bg-white border-2 rounded-lg text-gray-900 placeholder:text-gray-400",
        "transition-all duration-200 resize-none",
        "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
        error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-200",
        "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export default Textarea;