import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(({ 
  className,
  checked = false,
  onChange,
  ...props 
}, ref) => {
  return (
    <div className="relative inline-flex items-center">
      <input
        type="checkbox"
        ref={ref}
        checked={checked}
        onChange={onChange}
        className="sr-only"
        {...props}
      />
      <div
        onClick={() => onChange && onChange({ target: { checked: !checked } })}
        className={cn(
          "w-5 h-5 rounded-md border-2 cursor-pointer transition-all duration-200",
          "flex items-center justify-center",
          checked 
            ? "bg-gradient-to-br from-primary-500 to-primary-600 border-primary-600 scale-105" 
            : "bg-white border-gray-300 hover:border-primary-400",
          className
        )}
      >
        {checked && (
          <ApperIcon 
            name="Check" 
            size={14} 
            className="text-white"
            strokeWidth={3}
          />
        )}
      </div>
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;