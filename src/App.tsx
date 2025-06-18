import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

// Components
import Layout from './components/Layout';
import { AppProvider } from './context/AppContext';

// Pages
import HomePage from './pages/HomePage';
import AddExpensePage from './pages/AddExpensePage';
import EditExpensePage from './pages/EditExpensePage';
import HistoryPage from './pages/HistoryPage';
import StatsPage from './pages/StatsPage';
import SettingsPage from './pages/SettingsPage';
import RegisterPage from './pages/RegisterPage';

// Auth Guard Component
const RequireAuth = ({ children }: { children: JSX.Element }) => {
  // Check if user is registered from localStorage
  const userProfileStr = localStorage.getItem('userProfile');
  const userProfile = userProfileStr ? JSON.parse(userProfileStr) : { isRegistered: false };
  
  if (!userProfile.isRegistered) {
    return <Navigate to="/register" replace />;
  }
  
  return children;
};

export function App() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <AppProvider>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            
            <Route element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }>
              <Route path="/" element={<HomePage />} />
              <Route path="/add" element={<AddExpensePage />} />
              <Route path="/edit/:id" element={<EditExpensePage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AppProvider>
  );
}

export default App;
