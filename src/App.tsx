import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { UserButton, CivicAuthProvider } from "@civic/auth-web3/react";
import Home from './pages/Home';
import About from './pages/About';
import CreateAjo from './pages/CreateAjo';
import JoinAjo from './pages/JoinAjo';
import Layout from './components/Layout';
import { useAjoStore } from './store/ajoStore';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import { useAuth } from './hooks/useAuth';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import GroupDetails from './pages/GroupDetails';

const ProtectedRoute: React.FC = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/" />;
};

const AuthCallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-gray-600">Verifying login...</div>
  </div>
);

const App = () => {
  useAuth();

  return (
    <ErrorBoundary>
      <CivicAuthProvider 
        clientId={import.meta.env.VITE_CIVIC_CLIENT_ID}
        redirectUrl={`${window.location.origin}/auth/callback`}
      >
        <Router>
          <div className="min-h-screen">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create" element={<CreateAjo />} />
                <Route path="/join" element={<JoinAjo />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/group/:groupId" element={<GroupDetails />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </CivicAuthProvider>
    </ErrorBoundary>
  );
};

export default App;