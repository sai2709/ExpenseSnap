import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { format, subMonths, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { useExpenses } from '../hooks/useExpenses';
import ExpenseSummaryChart from '../components/ExpenseSummaryChart';
import { getCategoryById } from '../data/categories';

const StatsPage: React.FC = () => {
  const [period, setPeriod] = useState<'month' | 'day'>('month');
  const { expenses, getExpenseSummary } = useExpenses();
  
  const currentMonth = new Date();
  const summary = getExpenseSummary(currentMonth);
  
  // Generate data for monthly chart (last 6 months)
  const monthlyData = Array.from({ length: 6 }).map((_, index) => {
    const month = subMonths(currentMonth, 5 - index);
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    
    const monthExpenses = expenses.filter(expense => {
      const date = parseISO(expense.date);
      return date >= monthStart && date <= monthEnd;
    });
    
    const total = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    return {
      name: format(month, 'MMM'),
      amount: total,
    };
  });
  
  // Generate data for daily chart (current month)
  const dailyData = (() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    return days.map(day => {
      const dayExpenses = expenses.filter(expense => {
        const date = parseISO(expense.date);
        return isSameDay(date, day);
      });
      
      const total = dayExpenses.reduce((sum, expense) => sum + expense.amount, 0);
      
      return {
        name: format(day, 'd'),
        amount: total,
        fullDate: format(day, 'MMM d'),
      };
    });
  })();
  
  // Separate expenses by type
  const expensesByType = {
    expenses: expenses.filter(exp => exp.transactionType === 'expense'),
    income: expenses.filter(exp => exp.transactionType === 'income')
  };
  
  // Get top categories for expenses
  const topExpenseCategories = Object.entries(summary.categoryTotals)
    .map(([categoryId, amount]) => ({
      category: getCategoryById(categoryId),
      amount,
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Spending Stats</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Overview</h2>
        <ExpenseSummaryChart summary={summary} />
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Financial Overview</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-red-50 p-3 rounded-lg">
            <p className="text-xl font-bold text-red-600">-${summary.totalAmount.toFixed(2)}</p>
            <p className="text-sm text-gray-600">Expenses</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-xl font-bold text-green-600">+${summary.totalIncome.toFixed(2)}</p>
            <p className="text-sm text-gray-600">Income</p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="text-center">
            <p className={`text-2xl font-bold ${summary.netAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {summary.netAmount >= 0 ? '+$' : '-$'}{Math.abs(summary.netAmount).toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">Net Balance</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Transaction Trend</h2>
          <div className="flex rounded-md overflow-hidden border border-gray-200">
            <button
              className={`px-3 py-1 text-sm ${
                period === 'month' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
              }`}
              onClick={() => setPeriod('month')}
            >
              Monthly
            </button>
            <button
              className={`px-3 py-1 text-sm ${
                period === 'day' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
              }`}
              onClick={() => setPeriod('day')}
            >
              Daily
            </button>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={period === 'month' ? monthlyData : dailyData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis 
              tickFormatter={(value) => `$${value}`} 
              tickLine={false} 
              axisLine={false}
              width={40}
            />
            <Tooltip
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
              labelFormatter={(label) => period === 'day' ? dailyData.find(d => d.name === label)?.fullDate || '' : `${label} ${currentMonth.getFullYear()}`}
            />
            <Bar dataKey="amount" fill="#4F46E5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4 mb-20">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Top Expense Categories</h2>
        {topExpenseCategories.length > 0 ? (
          <div className="space-y-4">
            {topExpenseCategories.map(({ category, amount }) => (
              <div key={category.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
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
                  <div>
                    <p className="font-medium text-gray-900">{category.name}</p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div
                        className="h-1.5 rounded-full"
                        style={{ 
                          width: `${(amount / summary.totalAmount) * 100}%`,
                          backgroundColor: category.color 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${amount.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">
                    {((amount / summary.totalAmount) * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-4">No data available</p>
        )}
      </div>
    </div>
  );
};

export default StatsPage;
