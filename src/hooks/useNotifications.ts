import { useState, useEffect } from 'react';
import { NotificationItem } from '../components/Notification';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const savedNotifications = localStorage.getItem('notifications');
    return savedNotifications ? JSON.parse(savedNotifications) : [];
  });

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (notification: Omit<NotificationItem, 'id' | 'read' | 'date'>) => {
    const newNotification: NotificationItem = {
      ...notification,
      id: crypto.randomUUID(),
      read: false,
      date: new Date().toISOString(),
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    return newNotification;
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return {
    notifications,
    addNotification,
    markAsRead,
    removeNotification,
    clearAllNotifications,
  };
};

export default useNotifications;
