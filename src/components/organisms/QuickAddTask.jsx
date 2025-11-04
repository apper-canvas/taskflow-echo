import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskFormFields from "@/components/molecules/TaskFormFields";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const QuickAddTask = ({ onAddTask, isAdding }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: null
  });

  const handleSubmit = async () => {
    await onAddTask(formData);
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      dueDate: null
    });
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4"
      >
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full flex items-center gap-3 text-left text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary-50 to-primary-100">
            <ApperIcon name="Plus" size={20} className="text-primary-600" />
          </div>
          <span className="text-base">Add a new task...</span>
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-primary-200 dark:border-primary-700 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Create New Task</h3>
        <button
          onClick={() => setIsExpanded(false)}
          className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <ApperIcon name="X" size={20} />
        </button>
      </div>
      
      <TaskFormFields
        formData={formData}
        onChange={setFormData}
        onSubmit={handleSubmit}
        isSubmitting={isAdding}
      />
    </motion.div>
  );
};

export default QuickAddTask;