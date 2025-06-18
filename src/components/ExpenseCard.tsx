import React from 'react';
import { format, parseISO } from 'date-fns';
import { Expense } from '../types';
import { getCategoryById } from '../data/categories';
import { Trash2 } from 'lucide-react';

interface ExpenseCardProps {
  expense: Expense;
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense, onDelete, onEdit }) => {
  const category = getCategoryById(expense.category);
  
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-4 mb-3 transition hover:shadow-md ${
        expense.transactionType === 'income' ? 'border-l-4 border-l-green-500 border-gray-100 dark:border-gray-700' : 'border-l-4 border-l-red-500 border-gray-100 dark:border-gray-700'
      } transition-colors duration-200`}
      onClick={() => onEdit(expense)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: category.color + '33' }}
          >
            <span className="text-lg" style={{ color: category.color }}>
              {category.icon === 'utensils' && '🍽️'}
              {category.icon === 'car' && '🚗'}
              {category.icon === 'film' && '🎬'}
              {category.icon === 'shopping-bag' && '🛍️'}
              {category.icon === 'home' && '🏠'}
              {category.icon === 'plug' && '🔌'}
              {category.icon === 'heart' && '❤️'}
              {category.icon === 'grid' && '📌'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {expense.description}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {format(parseISO(expense.date), 'MMM dd, yyyy')} • {category.name}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <p className={`text-lg font-semibold ${
            expense.transactionType === 'income' ? 'text-green-600' : 'text-red-600'
          }`}>
            {expense.transactionType === 'income' ? '+' : '-'}${expense.amount.toFixed(2)}
          </p>
          <button 
            className="ml-3 text-red-500 p-1 rounded-full hover:bg-red-50"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(expense.id);
            }}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
