import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message, onRetry }) => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center space-y-4 max-w-md">
        <div className="flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
            <ApperIcon name="AlertCircle" size={32} className="text-red-500" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Oops! Something went wrong</h3>
        <p className="text-sm text-gray-600">{message || "We couldn't load your tasks. Please try again."}</p>
        {onRetry && (
          <Button onClick={onRetry} className="mt-4">
            <ApperIcon name="RotateCw" size={16} className="mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
};

export default Error;