import React, { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  date: string;
}

interface NotificationProps {
  notification: NotificationItem;
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export const Notification: React.FC<NotificationProps> = ({ 
  notification, 
  onRead,
  onDelete
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const getBgColor = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-100 dark:bg-green-800/20 border-l-4 border-green-500';
      case 'warning':
        return 'bg-yellow-100 dark:bg-yellow-800/20 border-l-4 border-yellow-500';
      case 'error':
        return 'bg-red-100 dark:bg-red-800/20 border-l-4 border-red-500';
      default:
        return 'bg-blue-100 dark:bg-blue-800/20 border-l-4 border-blue-500';
    }
  };

  const getTextColor = () => {
    switch (notification.type) {
      case 'success':
        return 'text-green-800 dark:text-green-300';
      case 'warning':
        return 'text-yellow-800 dark:text-yellow-300';
      case 'error':
        return 'text-red-800 dark:text-red-300';
      default:
        return 'text-blue-800 dark:text-blue-300';
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onDelete(notification.id);
    }, 300);
  };

  useEffect(() => {
    if (!notification.read) {
      const timer = setTimeout(() => {
        onRead(notification.id);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification.id, notification.read, onRead]);

  return (
    <div 
      className={`${getBgColor()} p-4 rounded-md shadow-sm mb-3 transition-all duration-300 ${
        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2'
      } ${notification.read ? 'opacity-70' : ''}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          <div className={`${getTextColor()} mr-3 flex-shrink-0`}>
            <Bell size={20} />
          </div>
          <div>
            <h3 className={`text-sm font-medium ${getTextColor()}`}>{notification.title}</h3>
            <div className={`mt-1 text-sm ${getTextColor()}`}>
              <p>{notification.message}</p>
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {new Date(notification.date).toLocaleString()}
            </p>
          </div>
        </div>
        <button
          type="button"
          className={`${getTextColor()} hover:bg-white/20 dark:hover:bg-black/20 rounded-md p-1.5`}
          onClick={handleClose}
        >
          <span className="sr-only">Close</span>
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Notification;
