import { cn } from "@/utils/cn";

const PriorityIndicator = ({ priority, showLabel = false, size = "md" }) => {
  const priorityConfig = {
    high: {
      color: "bg-red-500",
      label: "High",
textColor: "text-red-700 dark:text-red-400"
    },
    medium: {
      color: "bg-orange-400",
      label: "Medium", 
      textColor: "text-orange-700 dark:text-orange-400"
    },
    low: {
      color: "bg-blue-500",
      label: "Low",
      textColor: "text-blue-700 dark:text-blue-400"
    }
  };

  const sizes = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-2.5 h-2.5"
  };

  const config = priorityConfig[priority] || priorityConfig.low;

  if (showLabel) {
    return (
      <span className={cn("inline-flex items-center gap-1.5 text-xs font-medium", config.textColor)}>
        <span className={cn("rounded-full", config.color, sizes[size])} />
        {config.label}
      </span>
    );
  }

  return <span className={cn("rounded-full", config.color, sizes[size])} />;
};

export default PriorityIndicator;