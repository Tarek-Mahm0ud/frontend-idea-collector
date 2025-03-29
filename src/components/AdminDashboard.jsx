import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  console.log('AdminDashboard component rendering');

  const [users, setUsers] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.email !== 'tarek@gmail.com') {
      console.log('Not admin, redirecting from AdminDashboard'); // Debug log
      navigate('/dashboard');
      return;
    }

    fetchUsers();
    fetchIdeas();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('accessToken');
      console.log('Token:', token);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/users`, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });

      const data = await response.json();
      console.log('Users data:', data); // Debug log
      
      if (response.ok) {
        setUsers(data.users);
      } else {
        setError(data.message || 'Failed to fetch users');
      }
    } catch (error) {
      setError('Error connecting to server');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchIdeas = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('accessToken');
      
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/ideas`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      console.log('Ideas data:', data); // Debug log
      
      if (response.ok) {
        setIdeas(data.ideas);
      } else {
        setError(data.message || 'Failed to fetch ideas');
      }
    } catch (error) {
      setError('Error connecting to server');
      console.error('Error fetching ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/users/${userId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          fetchUsers();
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleDeleteIdea = async (ideaId) => {
    if (window.confirm('Are you sure you want to delete this idea?')) {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/ideas/${ideaId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          fetchIdeas();
        }
      } catch (error) {
        console.error('Error deleting idea:', error);
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      {error && (
        <div className="error-message" style={{ color: 'red', marginBottom: '20px' }}>
          {error}
        </div>
      )}
      
      <div className="tab-buttons">
        <button 
          className={activeTab === 'users' ? 'active' : ''} 
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button 
          className={activeTab === 'ideas' ? 'active' : ''} 
          onClick={() => setActiveTab('ideas')}
        >
          Ideas
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          {activeTab === 'users' && (
            <div className="users-section">
              <h2>Registered Users ({users.length})</h2>
              <div className="users-list">
                {users.length === 0 ? (
                  <p>No users found</p>
                ) : (
                  users.map(user => (
                    <div key={user._id} className="user-card">
                      <div className="user-info">
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                      </div>
                      {user.email !== 'tarek@gmail.com' && (
                        <button 
                          className="delete-btn"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          Delete User
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'ideas' && (
            <div className="ideas-section">
              <h2>Submitted Ideas ({ideas.length})</h2>
              <div className="ideas-list">
                {ideas.length === 0 ? (
                  <p>No ideas found</p>
                ) : (
                  ideas.map(idea => (
                    <div key={idea._id} className="idea-card">
                      <div className="idea-info">
                        <p><strong>By:</strong> {idea.username}</p>
                        <p><strong>Description:</strong> {idea.description}</p>
                        <p><strong>Status:</strong> {idea.status}</p>
                      </div>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDeleteIdea(idea._id)}
                      >
                        Delete Idea
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard; 