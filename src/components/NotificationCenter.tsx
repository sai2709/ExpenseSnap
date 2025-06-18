import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import Notification, { NotificationItem } from './Notification';

interface NotificationCenterProps {
  notifications: NotificationItem[];
  onReadNotification: (id: string) => void;
  onDeleteNotification: (id: string) => void;
  onClearAll: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onReadNotification,
  onDeleteNotification,
  onClearAll,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 z-20 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Notifications</h3>
                <button
                  onClick={onClearAll}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  Clear all
                </button>
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto p-3">
              {notifications.length > 0 ? (
                notifications.map(notification => (
                  <Notification
                    key={notification.id}
                    notification={notification}
                    onRead={onReadNotification}
                    onDelete={onDeleteNotification}
                  />
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-6">
                  No notifications
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationCenter;
