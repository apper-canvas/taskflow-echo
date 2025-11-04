import { useState, useRef, useEffect } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from "date-fns";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const DatePicker = ({ selectedDate, onDateSelect, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate ? new Date(selectedDate) : new Date());
  const pickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        onClose && onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const handleDateClick = (date) => {
    onDateSelect(date.toISOString());
    onClose && onClose();
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const firstDayOfWeek = monthStart.getDay();
  const emptyDays = Array(firstDayOfWeek).fill(null);

  return (
    <div
      ref={pickerRef}
      className="absolute z-50 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-4 w-80"
    >
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ApperIcon name="ChevronLeft" size={20} className="text-gray-600" />
        </button>
        
        <h3 className="text-base font-semibold text-gray-900">
          {format(currentMonth, "MMMM yyyy")}
        </h3>

        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ApperIcon name="ChevronRight" size={20} className="text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        {days.map(day => {
          const isSelected = selectedDate && isSameDay(day, new Date(selectedDate));
          const isCurrentDay = isToday(day);

          return (
            <button
              key={day.toISOString()}
              onClick={() => handleDateClick(day)}
              className={cn(
                "aspect-square flex items-center justify-center text-sm rounded-lg transition-all duration-200",
                "hover:bg-primary-50",
                isSelected && "bg-gradient-to-br from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700",
                !isSelected && isCurrentDay && "bg-gray-100 font-semibold",
                !isSelected && !isCurrentDay && "text-gray-700"
              )}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="flex-1"
          onClick={() => {
            onDateSelect(null);
            onClose && onClose();
          }}
        >
          Clear
        </Button>
        <Button
          size="sm"
          className="flex-1"
          onClick={() => {
            onDateSelect(new Date().toISOString());
            onClose && onClose();
          }}
        >
          Today
        </Button>
      </div>
    </div>
  );
};

export default DatePicker;