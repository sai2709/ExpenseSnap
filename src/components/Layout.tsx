import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { useApp } from '../context/AppContext';
import NotificationCenter from './NotificationCenter';

const Layout: React.FC = () => {
  const { 
    notifications, 
    markAsRead, 
    removeNotification, 
    clearAllNotifications, 
    profile 
  } = useApp();

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <header className="bg-white dark:bg-gray-800 shadow-sm py-2 px-4 sticky top-0 z-20 transition-colors duration-200">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">ExpenseSnap</h1>
          <div className="flex items-center space-x-2">
            <NotificationCenter 
              notifications={notifications}
              onReadNotification={markAsRead}
              onDeleteNotification={removeNotification}
              onClearAll={clearAllNotifications}
            />
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
              {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-auto pb-16">
        <Outlet />
      </main>
      <NavBar />
    </div>
  );
};

export default Layout;
