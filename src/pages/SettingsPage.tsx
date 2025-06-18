import React, { useState } from 'react';
import { ChevronRight, LogOut, Mail, Moon, Phone, Sun, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    theme, 
    toggleTheme, 
    settings, 
    updateSettings, 
    profile,
    logoutUser
  } = useApp();
  
  const [monthlyExpenseLimit, setMonthlyExpenseLimit] = useState(settings.monthlyExpenseLimit);
  const [monthlySavingGoal, setMonthlySavingGoal] = useState(settings.monthlySavingGoal);
  
  const handleSaveFinancialGoals = () => {
    updateSettings({
      monthlyExpenseLimit,
      monthlySavingGoal
    });
    
    // Show success feedback
    alert('Financial goals updated successfully!');
  };
  
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logoutUser();
      navigate('/register');
    }
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to delete all your expense data? This action cannot be undone.')) {
      localStorage.removeItem('expenses');
      localStorage.removeItem('notifications');
      window.location.reload();
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 mb-20">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Settings</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6 transition-colors duration-200">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">Profile</h2>
        </div>
        
        <div className="p-4">
          <div className="flex items-center py-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white mr-3">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-white">{profile.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Account settings</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between py-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
              <div>
                <p className="font-medium text-gray-800 dark:text-white">Email</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{profile.email}</p>
              </div>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </div>
          
          <div className="flex items-center justify-between py-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
              <div>
                <p className="font-medium text-gray-800 dark:text-white">Phone</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{profile.phone}</p>
              </div>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6 transition-colors duration-200">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">Financial Goals</h2>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <label htmlFor="expenseLimit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Monthly Expense Limit ($)
            </label>
            <input
              type="number"
              id="expenseLimit"
              value={monthlyExpenseLimit}
              onChange={(e) => setMonthlyExpenseLimit(Number(e.target.value))}
              className="block w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              min="0"
              step="10"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              You'll be notified when your expenses exceed this limit
            </p>
          </div>
          
          <div>
            <label htmlFor="savingGoal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Monthly Saving Goal ($)
            </label>
            <input
              type="number"
              id="savingGoal"
              value={monthlySavingGoal}
              onChange={(e) => setMonthlySavingGoal(Number(e.target.value))}
              className="block w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              min="0"
              step="10"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              You'll be notified when you reach your saving goal
            </p>
          </div>
          
          <button
            onClick={handleSaveFinancialGoals}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
          >
            Save Financial Goals
          </button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6 transition-colors duration-200">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">Appearance</h2>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center">
              {theme === 'dark' ? (
                <Moon className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
              ) : (
                <Sun className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
              )}
              <div>
                <p className="font-medium text-gray-800 dark:text-white">Dark Mode</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Toggle dark theme</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={theme === 'dark'}
                onChange={toggleTheme}
              />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6 transition-colors duration-200">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">About</h2>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-gray-800 dark:text-white">Version</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">2.0.0</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between py-2 border-t border-gray-100 dark:border-gray-700">
            <div>
              <p className="font-medium text-gray-800 dark:text-white">Rate the app</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Let us know what you think</p>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </div>
          
          <div className="flex items-center justify-between py-2 border-t border-gray-100 dark:border-gray-700">
            <div>
              <p className="font-medium text-gray-800 dark:text-white">Send feedback</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Help us improve the app</p>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm transition-colors duration-200">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">Data</h2>
        </div>
        
        <div className="p-4 space-y-4">
          <button
            onClick={clearAllData}
            className="w-full py-3 px-4 border border-red-300 dark:border-red-700 rounded-md text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
          >
            Clear All Data
          </button>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            This will permanently delete all your expense data
          </p>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <LogOut size={16} className="mr-2" />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
