import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  
  // Debug logs
  console.log('Current user:', user);
  console.log('User email:', user?.email);
  console.log('Is admin?:', user?.email === 'tarek@gmail.com');

  const isAdmin = user?.email === 'tarek@gmail.com';

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome back, {user?.username}!</h1>
        <p className="dashboard-subtitle">Ready to share your next great idea?</p>
      </div>
      
      <div className="dashboard-actions">
        <button 
          onClick={() => navigate('/submit-idea')}
          className="action-button submit-idea-btn"
        >
          ✨ Submit New Idea
        </button>
        
        <button 
          onClick={() => {
            localStorage.clear();
            navigate('/');
          }}
          className="action-button logout-button"
        >
          🔒 Logout
        </button>

        {isAdmin && (
          <button 
            className="action-button admin-button"
            onClick={() => navigate('/admin')}
            style={{
              backgroundColor: '#ff4757',
              color: 'white',
              marginTop: '10px',
              display: 'block',
              width: '100%'
            }}
          >
            👑 Admin Dashboard
          </button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;