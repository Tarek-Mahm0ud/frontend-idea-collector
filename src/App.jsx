import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AuthForm from './components/AuthForm';
import IdeaForm from './components/IdeaForm';
import AdminDashboard from './components/AdminDashboard';

function App() {
  console.log('App rendering'); // Debug log
  
  return (
    <Router>
      <Routes>
      <Route path="/" element={<AuthForm />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/submit-idea" element={<ProtectedRoute><IdeaForm /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
      </Routes>
    </Router>
  );
}

// Protected Route for normal users
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

// Protected Route specifically for admin
const ProtectedAdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log('ProtectedAdminRoute - user:', user); // Debug log
  
  if (!user || user.email !== 'tarek@gmail.com') {
    console.log('Redirecting to dashboard - not admin'); // Debug log
    return <Navigate to="/dashboard" />;
  }
  
  console.log('Allowing admin access'); // Debug log
  return children;
};

export default App; 