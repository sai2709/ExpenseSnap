import React, { useState } from 'react';
import { format } from 'date-fns';
import { categories } from '../data/categories';
import { useApp } from '../context/AppContext';

interface ExpenseFormProps {
  onSubmit: (data: {
    amount: number;
    category: string;
    description: string;
    date: string;
    transactionType: 'expense' | 'income';
  }) => void;
  initialValues?: {
    amount: number;
    category: string;
    description: string;
    date: string;
    transactionType: 'expense' | 'income';
  };
  buttonText?: string;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  onSubmit,
  initialValues = {
    amount: 0,
    category: 'food',
    description: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    transactionType: 'expense',
  },
  buttonText = 'Save Transaction',
}) => {
  const [amount, setAmount] = useState(initialValues.amount);
  const [category, setCategory] = useState(initialValues.category);
  const [description, setDescription] = useState(initialValues.description);
  const [date, setDate] = useState(initialValues.date);
  const [transactionType, setTransactionType] = useState<'expense' | 'income'>(initialValues.transactionType);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { settings } = useApp();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (amount <= 0) {
      newErrors.amount = 'Amount must be greater than zero';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Check limit before submitting
    if (transactionType === 'expense' && amount > settings.monthlyExpenseLimit) {
      if (!window.confirm(`This expense exceeds your monthly limit of $${settings.monthlyExpenseLimit}. Do you want to continue?`)) {
        return;
      }
    }
    
    onSubmit({
      amount,
      category,
      description,
      date,
      transactionType,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Transaction Type
        </label>
        <div className="flex w-full rounded-md shadow-sm mb-4">
          <button
            type="button"
            className={`flex-1 py-3 px-4 text-center rounded-l-md border transition-colors duration-200 ${
              transactionType === 'expense'
                ? 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
            onClick={() => setTransactionType('expense')}
          >
            Expense
          </button>
          <button
            type="button"
            className={`flex-1 py-3 px-4 text-center rounded-r-md border transition-colors duration-200 ${
              transactionType === 'income'
                ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
            onClick={() => setTransactionType('income')}
          >
            Income
          </button>
        </div>
      </div>
      
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Amount
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 dark:text-gray-400 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            step="0.01"
            id="amount"
            className={`block w-full pl-8 pr-12 py-3 rounded-md border transition-colors duration-200 ${
              errors.amount ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white`}
            placeholder="0.00"
            value={amount || ''}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
          />
        </div>
        {errors.amount && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.amount}</p>}
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="description"
            className={`block w-full py-3 px-4 rounded-md border transition-colors duration-200 ${
              errors.description ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white`}
            placeholder="What did you spend on?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {errors.description && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>}
      </div>
      
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Category
        </label>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all duration-200 ${
                category === cat.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => setCategory(cat.id)}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mb-1"
                style={{ backgroundColor: cat.color + '33' }}
              >
                <span className="text-lg" style={{ color: cat.color }}>
                  {cat.icon === 'utensils' && '🍽️'}
                  {cat.icon === 'car' && '🚗'}
                  {cat.icon === 'film' && '🎬'}
                  {cat.icon === 'shopping-bag' && '🛍️'}
                  {cat.icon === 'home' && '🏠'}
                  {cat.icon === 'plug' && '🔌'}
                  {cat.icon === 'heart' && '❤️'}
                  {cat.icon === 'grid' && '📌'}
                </span>
              </div>
              <span className="text-xs dark:text-gray-300">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Date
        </label>
        <div className="mt-1">
          <input
            type="date"
            id="date"
            className="block w-full py-3 px-4 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-colors duration-200"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>
      
      <div className="pt-4">
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
