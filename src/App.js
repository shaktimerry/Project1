import React, { useState } from 'react';

function App() {
  const [feedback, setFeedback] = useState({ name: '', email: '', comment: '' });
  const [status, setStatus] = useState('');

  const handleChange = e => setFeedback({ ...feedback, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      // Replace with your deployed API Gateway endpoint
      const response = await fetch('https://xxxxxx.execute-api.region.amazonaws.com/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback)
      });
      const result = await response.json();
      if (response.ok) setStatus('Thank you for your feedback!');
      else setStatus(`Error: ${result.error}`);
    } catch (err) {
      setStatus('Failed to submit feedback');
    }
  };

  return (
    <div>
      <h1>Customer Feedback</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={feedback.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={feedback.email} onChange={handleChange} required />
        <textarea name="comment" placeholder="Your feedback" value={feedback.comment} onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
      <p>{status}</p>
    </div>
  );
}

export default App;