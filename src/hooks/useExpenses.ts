import { useState, useEffect } from 'react';
import { Expense, ExpenseSummary } from '../types';
import { format, startOfMonth, endOfMonth, parseISO, isWithinInterval } from 'date-fns';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load expenses from localStorage
    const loadExpenses = () => {
      setIsLoading(true);
      try {
        const storedExpenses = localStorage.getItem('expenses');
        if (storedExpenses) {
          setExpenses(JSON.parse(storedExpenses));
        }
      } catch (error) {
        console.error('Error loading expenses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadExpenses();
  }, []);

  const saveExpenses = (updatedExpenses: Expense[]) => {
    try {
      localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    } catch (error) {
      console.error('Error saving expenses:', error);
    }
  };

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: crypto.randomUUID(),
    };
    
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);
    return newExpense;
  };

  const deleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);
  };

  const updateExpense = (updatedExpense: Expense) => {
    const updatedExpenses = expenses.map(expense => 
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);
  };

  const getMonthlyExpenses = (month: Date = new Date()): Expense[] => {
    const start = startOfMonth(month);
    const end = endOfMonth(month);
    
    return expenses.filter(expense => {
      const expenseDate = parseISO(expense.date);
      return isWithinInterval(expenseDate, { start, end });
    });
  };

  const getExpenseSummary = (month: Date = new Date()): ExpenseSummary => {
    const monthlyExpenses = getMonthlyExpenses(month);
    
    const totalExpenses = monthlyExpenses
      .filter(expense => expense.transactionType === 'expense')
      .reduce((sum, expense) => sum + expense.amount, 0);
      
    const totalIncome = monthlyExpenses
      .filter(expense => expense.transactionType === 'income')
      .reduce((sum, expense) => sum + expense.amount, 0);
    
    const netAmount = totalIncome - totalExpenses;
    
    const categoryTotals: Record<string, number> = {};
    monthlyExpenses.forEach(expense => {
      if (!categoryTotals[expense.category]) {
        categoryTotals[expense.category] = 0;
      }
      categoryTotals[expense.category] += expense.amount;
    });
    
    return {
      totalAmount: Math.abs(totalExpenses),
      totalIncome,
      netAmount,
      categoryTotals,
      dateRange: {
        start: format(startOfMonth(month), 'yyyy-MM-dd'),
        end: format(endOfMonth(month), 'yyyy-MM-dd'),
      }
    };
  };

  return {
    expenses,
    isLoading,
    addExpense,
    deleteExpense,
    updateExpense,
    getMonthlyExpenses,
    getExpenseSummary,
  };
};
