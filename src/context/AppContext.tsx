import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import useTheme from '../hooks/useTheme';
import useNotifications from '../hooks/useNotifications';
import useUserSettings from '../hooks/useUserSettings';
import { useExpenses } from '../hooks/useExpenses';
import { format } from 'date-fns';

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  notifications: any[];
  addNotification: (notification: any) => any;
  markAsRead: (id: string) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  settings: any;
  profile: any;
  updateSettings: (newSettings: any) => void;
  updateProfile: (newProfile: any) => void;
  registerUser: (name: string, email: string, phone: string) => void;
  logoutUser: () => void;
  expenses: any[];
  addExpense: (expense: any) => any;
  deleteExpense: (id: string) => void;
  updateExpense: (expense: any) => void;
  getMonthlyExpenses: (month?: Date) => any[];
  getExpenseSummary: (month?: Date) => any;
  checkGoalsAndLimits: (month?: Date) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const notificationManager = useNotifications();
  const userSettingsManager = useUserSettings();
  const expensesManager = useExpenses();
  const [currentMonth] = useState(new Date());
  
  // Check goals and limits each time expenses change
  useEffect(() => {
    checkGoalsAndLimits();
  }, [expensesManager.expenses]);
  
  const checkGoalsAndLimits = (month = currentMonth) => {
    if (!userSettingsManager.profile.isRegistered) return;
    
    const summary = expensesManager.getExpenseSummary(month);
    const { monthlyExpenseLimit, monthlySavingGoal } = userSettingsManager.settings;
    
    // Check expense limit
    if (summary.totalAmount > monthlyExpenseLimit) {
      notificationManager.addNotification({
        title: 'Expense Limit Exceeded',
        message: `You've exceeded your monthly expense limit of $${monthlyExpenseLimit}. Current spending: $${summary.totalAmount.toFixed(2)}.`,
        type: 'warning',
      });
      
      // Simulate email notification
      console.log(`[Email to ${userSettingsManager.profile.email}]: Expense limit exceeded notification`);
    }
    
    // Check saving goal
    if (summary.netAmount >= monthlySavingGoal && monthlySavingGoal > 0) {
      notificationManager.addNotification({
        title: 'Saving Goal Reached!',
        message: `Congratulations! You've reached your monthly saving goal of $${monthlySavingGoal}.`,
        type: 'success',
      });
      
      // Simulate email notification
      console.log(`[Email to ${userSettingsManager.profile.email}]: Saving goal reached notification`);
    }
  };
  
  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        ...notificationManager,
        ...userSettingsManager,
        ...expensesManager,
        checkGoalsAndLimits,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
