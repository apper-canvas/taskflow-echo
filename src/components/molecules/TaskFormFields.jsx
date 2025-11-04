import { useState } from "react";
import { format } from "date-fns";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import DatePicker from "@/components/molecules/DatePicker";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const TaskFormFields = ({ formData, onChange, onSubmit, submitLabel = "Add Task", isSubmitting = false }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (field, value) => {
    onChange({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Task Title *
        </label>
        <Input
          placeholder="What needs to be done?"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          autoFocus
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <Textarea
          placeholder="Add more details..."
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority
          </label>
          <Select
            value={formData.priority}
            onChange={(e) => handleChange("priority", e.target.value)}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </Select>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Due Date
          </label>
          <div className="relative">
            <Button
              type="button"
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !formData.dueDate && "text-gray-400"
              )}
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              <ApperIcon name="Calendar" size={16} className="mr-2" />
              {formData.dueDate ? format(new Date(formData.dueDate), "MMM dd, yyyy") : "Select date"}
            </Button>
            {showDatePicker && (
              <DatePicker
                selectedDate={formData.dueDate}
                onDateSelect={(date) => {
                  handleChange("dueDate", date);
                  setShowDatePicker(false);
                }}
                onClose={() => setShowDatePicker(false)}
              />
            )}
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={!formData.title.trim() || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <ApperIcon name="Loader2" size={16} className="mr-2 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <ApperIcon name="Plus" size={16} className="mr-2" />
            {submitLabel}
          </>
        )}
      </Button>
    </form>
  );
};

export default TaskFormFields;