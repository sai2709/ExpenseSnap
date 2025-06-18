import { useState, useEffect } from 'react';

export interface UserSettings {
  monthlyExpenseLimit: number;
  monthlySavingGoal: number;
  darkMode: boolean;
  notificationsEnabled: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  isRegistered: boolean;
}

const defaultSettings: UserSettings = {
  monthlyExpenseLimit: 2000,
  monthlySavingGoal: 500,
  darkMode: false,
  notificationsEnabled: true,
};

const defaultProfile: UserProfile = {
  name: '',
  email: '',
  phone: '',
  isRegistered: false,
};

export const useUserSettings = () => {
  const [settings, setSettings] = useState<UserSettings>(() => {
    const savedSettings = localStorage.getItem('userSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    const savedProfile = localStorage.getItem('userProfile');
    return savedProfile ? JSON.parse(savedProfile) : defaultProfile;
  });

  useEffect(() => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }, [profile]);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateProfile = (newProfile: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...newProfile }));
  };

  const registerUser = (name: string, email: string, phone: string) => {
    setProfile({
      name,
      email,
      phone,
      isRegistered: true,
    });
  };

  const logoutUser = () => {
    setProfile(defaultProfile);
  };

  return {
    settings,
    profile,
    updateSettings,
    updateProfile,
    registerUser,
    logoutUser,
  };
};

export default useUserSettings;
