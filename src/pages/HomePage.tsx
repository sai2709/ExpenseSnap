import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useApp } from '../context/AppContext';
import MonthSelector from '../components/MonthSelector';
import ExpenseSummaryChart from '../components/ExpenseSummaryChart';
import ExpenseList from '../components/ExpenseList';
import ProgressBar from '../components/ProgressBar';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { 
    expenses, 
    deleteExpense, 
    getExpenseSummary, 
    getMonthlyExpenses,
    settings,
    profile,
    checkGoalsAndLimits
  } = useApp();
  
  const summary = getExpenseSummary(currentMonth);
  const monthlyExpenses = getMonthlyExpenses(currentMonth);

  useEffect(() => {
    // Check goals and limits when month changes
    checkGoalsAndLimits(currentMonth);
  }, [currentMonth, checkGoalsAndLimits]);

  const handleEditExpense = (expense: any) => {
    navigate(`/edit/${expense.id}`);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Hi, {profile.name.split(' ')[0]}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{format(new Date(), 'EEEE, MMM d')}</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6 transition-colors duration-200">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Monthly Overview</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg transition-colors duration-200">
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">-${summary.totalAmount.toFixed(2)}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Expenses</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg transition-colors duration-200">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">+${summary.totalIncome.toFixed(2)}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Income</p>
          </div>
        </div>
        <div className="mb-4">
          <ProgressBar 
            current={summary.totalAmount} 
            target={settings.monthlyExpenseLimit}
            color="#4F46E5"
            type="expense"
          />
        </div>
        <div className="mb-4">
          <ProgressBar 
            current={Math.max(0, summary.netAmount)} 
            target={settings.monthlySavingGoal}
            color="#4F46E5"
            type="saving"
          />
        </div>
        <div className="flex items-baseline justify-between border-t border-gray-200 dark:border-gray-700 pt-3">
          <div>
            <p className={`text-2xl font-bold ${summary.netAmount >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} transition-colors duration-200`}>
              {summary.netAmount >= 0 ? '+' : ''}{summary.netAmount.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Net Balance</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-800 dark:text-white">
              {monthlyExpenses.length} {monthlyExpenses.length === 1 ? 'transaction' : 'transactions'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">This month</p>
          </div>
        </div>
      </div>
      
      <MonthSelector currentMonth={currentMonth} onMonthChange={setCurrentMonth} />
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6 transition-colors duration-200">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Spending by Category</h2>
        <ExpenseSummaryChart summary={summary} />
      </div>
      
      <div className="mb-20">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Recent Expenses</h2>
        <ExpenseList
          expenses={monthlyExpenses.slice(0, 5)}
          onDelete={deleteExpense}
          onEdit={handleEditExpense}
        />
        {monthlyExpenses.length > 5 && (
          <div className="text-center mt-4">
            <button
              onClick={() => navigate('/history')}
              className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
            >
              View all expenses
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
