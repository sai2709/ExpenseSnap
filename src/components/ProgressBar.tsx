import React from 'react';

interface ProgressBarProps {
  current: number;
  target: number;
  color?: string;
  warningThreshold?: number;
  type?: 'saving' | 'expense';
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  target,
  color = '#4F46E5',
  warningThreshold = 0.8,
  type = 'saving'
}) => {
  const percentage = Math.min((current / target) * 100, 100);
  
  const getColor = () => {
    if (type === 'expense') {
      // For expenses, we want to show warning as it approaches limit
      if (percentage >= 100) return '#EF4444'; // Red when over limit
      if (percentage >= warningThreshold * 100) return '#F59E0B'; // Yellow when near limit
      return color;
    } else {
      // For savings, we celebrate progress
      if (percentage >= 100) return '#10B981'; // Green when reached goal
      return color;
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {type === 'saving' ? 'Saving Goal' : 'Expense Limit'}
        </span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          ${current.toFixed(2)} / ${target.toFixed(2)}
        </span>
      </div>
      <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ 
            width: `${percentage}%`, 
            backgroundColor: getColor() 
          }}
        ></div>
      </div>
      <div className="text-xs mt-1 text-right">
        {type === 'saving' ? (
          percentage >= 100 ? 
            <span className="text-green-600 dark:text-green-400">Goal reached! 🎉</span> :
            <span className="text-gray-500 dark:text-gray-400">{percentage.toFixed(0)}% of goal</span>
        ) : (
          percentage >= 100 ? 
            <span className="text-red-600 dark:text-red-400">Limit exceeded!</span> :
            <span className="text-gray-500 dark:text-gray-400">{percentage.toFixed(0)}% of limit</span>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
