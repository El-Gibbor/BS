import React from 'react';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import { useAuth } from './components/AuthContext';

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <LandingPage />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
