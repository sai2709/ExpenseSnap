import React from 'react';
import { NavLink } from 'react-router-dom';
import { CirclePlus, Clock, House, PieChart, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';

const NavBar: React.FC = () => {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-2 px-4 shadow-lg transition-colors duration-200">
      <div className="max-w-md mx-auto">
        <ul className="flex justify-between items-center">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex flex-col items-center p-2 ${
                  isActive 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300'
                } transition-colors duration-200`
              }
            >
              <House size={24} />
              <span className="text-xs mt-1">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                `flex flex-col items-center p-2 ${
                  isActive 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300'
                } transition-colors duration-200`
              }
            >
              <Clock size={24} />
              <span className="text-xs mt-1">History</span>
            </NavLink>
          </li>
          <li className="-mt-8">
            <NavLink
              to="/add"
              className="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-colors duration-200"
            >
              <CirclePlus size={32} />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/stats"
              className={({ isActive }) =>
                `flex flex-col items-center p-2 ${
                  isActive 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300'
                } transition-colors duration-200`
              }
            >
              <PieChart size={24} />
              <span className="text-xs mt-1">Stats</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex flex-col items-center p-2 ${
                  isActive 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300'
                } transition-colors duration-200`
              }
            >
              <Settings size={24} />
              <span className="text-xs mt-1">Settings</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
