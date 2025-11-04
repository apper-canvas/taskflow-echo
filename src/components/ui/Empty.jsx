import ApperIcon from "@/components/ApperIcon";

const Empty = () => {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="text-center space-y-4 max-w-md">
        <div className="flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
            <ApperIcon name="CheckCircle2" size={40} className="text-primary-600" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900">All caught up!</h3>
        <p className="text-sm text-gray-600">
          You don't have any tasks yet. Create your first task to get started on your productivity journey.
        </p>
      </div>
    </div>
  );
};

export default Empty;