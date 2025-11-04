import { useState } from "react";
import { format, isPast, isToday, isTomorrow } from "date-fns";
import { motion } from "framer-motion";
import Checkbox from "@/components/atoms/Checkbox";
import Button from "@/components/atoms/Button";
import PriorityIndicator from "@/components/molecules/PriorityIndicator";
import Badge from "@/components/atoms/Badge";
import TaskFormFields from "@/components/molecules/TaskFormFields";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const TaskCard = ({ task, onToggleComplete, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate
  });

  const getDueDateDisplay = () => {
    if (!task.dueDate) return null;
    
    const date = new Date(task.dueDate);
    const isPastDue = isPast(date) && !isToday(date);
    
    let label = format(date, "MMM dd");
    if (isToday(date)) label = "Today";
    else if (isTomorrow(date)) label = "Tomorrow";

    return (
      <Badge variant={isPastDue ? "danger" : "default"} className="text-xs">
        <ApperIcon name="Calendar" size={12} className="mr-1" />
        {label}
      </Badge>
    );
  };

  const handleSave = async () => {
    await onUpdate(task.Id, formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 border-primary-200 dark:border-primary-700 p-6"
      >
        <TaskFormFields
          formData={formData}
          onChange={setFormData}
          onSubmit={handleSave}
          submitLabel="Save Changes"
        />
        <Button
          variant="ghost"
          className="w-full mt-2"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
"bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6",
        "transition-all duration-200 hover:shadow-md hover:-translate-y-0.5",
        task.completed && "opacity-60"
      )}
    >
      <div className="flex items-start gap-4">
        <div className="mt-1">
          <Checkbox
            checked={task.completed}
            onChange={() => onToggleComplete(task.Id)}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <PriorityIndicator priority={task.priority} size="md" />
              <h3 
className={cn(
                  "text-base font-semibold text-gray-900 dark:text-gray-100 truncate",
                  task.completed && "line-through text-gray-500 dark:text-gray-600"
                )}
              >
                {task.title}
              </h3>
            </div>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              {getDueDateDisplay()}
            </div>
          </div>

          {task.description && (
<p className={cn(
              "text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2",
              task.completed && "text-gray-400 dark:text-gray-500"
            )}>
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-2 mt-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="text-xs"
            >
              <ApperIcon name="Edit2" size={14} className="mr-1" />
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.Id)}
className="text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <ApperIcon name="Trash2" size={14} className="mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;