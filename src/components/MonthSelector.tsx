import React from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MonthSelectorProps {
  currentMonth: Date;
  onMonthChange: (newMonth: Date) => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({ currentMonth, onMonthChange }) => {
  const handlePreviousMonth = () => {
    onMonthChange(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    onMonthChange(addMonths(currentMonth, 1));
  };

  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 mb-4 transition-colors duration-200">
      <button
        onClick={handlePreviousMonth}
        className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors duration-200"
        aria-label="Previous month"
      >
        <ChevronLeft size={20} />
      </button>
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white transition-colors duration-200">
        {format(currentMonth, 'MMMM yyyy')}
      </h2>
      <button
        onClick={handleNextMonth}
        className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors duration-200"
        aria-label="Next month"
        disabled={format(addMonths(currentMonth, 1), 'yyyy-MM') > format(new Date(), 'yyyy-MM')}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default MonthSelector;
