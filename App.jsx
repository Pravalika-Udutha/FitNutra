import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import AppLayout from '@/components/layout/AppLayout';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import DailyLog from '@/pages/DailyLog';
import MealPlans from '@/pages/MealPlans';
import WaterTracker from '@/pages/WaterTracker';
import SleepTracker from '@/pages/SleepTracker';
import StepsTracker from '@/pages/StepsTracker';
import Medicines from '@/pages/Medicines';
import Exercises from '@/pages/Exercises';
import MedicalReports from '@/pages/MedicalReports';
import Notes from '@/pages/Notes';
import HealthCharts from '@/pages/HealthCharts';
import Chatbot from '@/pages/Chatbot';
import Reminders from '@/pages/Reminders';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/daily-log" element={<DailyLog />} />
        <Route path="/meals" element={<MealPlans />} />
        <Route path="/water" element={<WaterTracker />} />
        <Route path="/sleep" element={<SleepTracker />} />
        <Route path="/steps" element={<StepsTracker />} />
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/reports" element={<MedicalReports />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/health-charts" element={<HealthCharts />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/reminders" element={<Reminders />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App