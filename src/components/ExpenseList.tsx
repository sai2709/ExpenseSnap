import React from 'react';
import { Expense } from '../types';
import ExpenseCard from './ExpenseCard';
import { format, parseISO } from 'date-fns';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
}

interface GroupedExpenses {
  [key: string]: Expense[];
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDelete, onEdit }) => {
  if (expenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500 dark:text-gray-400">
        <svg
          className="w-16 h-16 mb-4 text-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
        <p className="text-lg font-medium">No expenses yet</p>
        <p className="mt-1 text-sm">Add your first expense to get started</p>
      </div>
    );
  }

  // Group expenses by date
  const groupedExpenses: GroupedExpenses = expenses.reduce((groups, expense) => {
    const date = format(parseISO(expense.date), 'yyyy-MM-dd');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(expense);
    return groups;
  }, {} as GroupedExpenses);

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedExpenses).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div className="space-y-6">
      {sortedDates.map(date => (
        <div key={date}>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 sticky top-0 bg-gray-50 dark:bg-gray-900 py-2 px-1 z-10 transition-colors duration-200">
            {format(parseISO(date), 'EEEE, MMMM d, yyyy')}
          </h3>
          <div className="mt-2">
            {groupedExpenses[date]
              .sort((a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime())
              .map(expense => (
                <ExpenseCard
                  key={expense.id}
                  expense={expense}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
