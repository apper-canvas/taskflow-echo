import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import QuickAddTask from "@/components/organisms/QuickAddTask";
import TaskList from "@/components/organisms/TaskList";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import taskService from "@/services/api/taskService";
import ApperIcon from "@/components/ApperIcon";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError(err.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = async (taskData) => {
    try {
      setIsAdding(true);
      const newTask = await taskService.create(taskData);
      setTasks(prev => [newTask, ...prev]);
      toast.success("Task created successfully!");
    } catch (err) {
      toast.error("Failed to create task");
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      const updatedTask = await taskService.toggleComplete(id);
      setTasks(prev => prev.map(t => t.Id === id ? updatedTask : t));
      
      if (updatedTask.completed) {
        toast.success("Task completed! Great job! 🎉");
      } else {
        toast.info("Task marked as incomplete");
      }
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      const updatedTask = await taskService.update(id, taskData);
      setTasks(prev => prev.map(t => t.Id === id ? updatedTask : t));
      toast.success("Task updated successfully!");
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await taskService.delete(id);
      setTasks(prev => prev.filter(t => t.Id !== id));
      toast.success("Task deleted");
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg">
              <ApperIcon name="ListTodo" size={24} className="text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              TaskFlow
            </h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">
            Organize your day, accomplish your goals
          </p>
        </motion.div>

        <div className="mb-8">
          <QuickAddTask onAddTask={handleAddTask} isAdding={isAdding} />
        </div>

        {loading ? (
          <Loading />
        ) : error ? (
          <Error message={error} onRetry={loadTasks} />
        ) : tasks.length === 0 ? (
          <Empty />
        ) : (
          <div className="space-y-8">
            {activeTasks.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Active Tasks
                  </h2>
                  <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
                    {activeTasks.length}
                  </span>
                </div>
                <TaskList
                  tasks={activeTasks}
                  onToggleComplete={handleToggleComplete}
                  onUpdate={handleUpdateTask}
                  onDelete={handleDeleteTask}
                />
              </motion.div>
            )}

            {completedTasks.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Completed
                  </h2>
                  <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                    {completedTasks.length}
                  </span>
                </div>
                <TaskList
                  tasks={completedTasks}
                  onToggleComplete={handleToggleComplete}
                  onUpdate={handleUpdateTask}
                  onDelete={handleDeleteTask}
                />
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;