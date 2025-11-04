import ApperIcon from "@/components/ApperIcon";

const Loading = () => {
  return (
<div className="flex items-center justify-center py-12">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center">
          <ApperIcon 
            name="Loader2" 
            size={40} 
            className="text-primary-600 dark:text-primary-400 animate-spin" 
          />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading your tasks...</p>
      </div>
    </div>
  );
};

export default Loading;