import React, { useState } from 'react';
import './IdeaForm.css';

const IdeaForm = () => {
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!description.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Changed from 'token' to 'accessToken'
      const token = localStorage.getItem('accessToken');
      console.log('Using token:', token); // Debug log
      
      if (!token) {
        setError('Please sign in first');
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/ideas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Using accessToken
        },
        body: JSON.stringify({
          description: description.trim()
        })
      });

      console.log('Response status:', response.status); // Debug log
      const data = await response.json();
      console.log('Response data:', data); // Debug log

      if (response.ok) {
        setDescription('');
        alert('Idea submitted successfully!');
      } else {
        setError(data.msg || 'Could not submit idea. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Could not submit idea. Please try again.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="idea-form-container">
      <form className="idea-form" onSubmit={handleSubmit}>
        <h2>Submit Your Idea</h2>
        <div className="form-group">
          <label htmlFor="description">Idea Description</label>
          <textarea
            id="description"
            className="idea-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your idea in detail..."
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting || !description.trim()}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Idea'}
        </button>
      </form>
    </div>
  );
};

export default IdeaForm;
