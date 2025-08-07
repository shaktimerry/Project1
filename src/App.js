import React, { useState } from 'react';
import './App.css';

const initialState = {
  name: '',
  email: '',
  address: '',
  phone: '',
  feedback: '',
};

function App() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState('');

  // Replace with your real API Gateway endpoint
  const API_ENDPOINT = 'https://ephn4vgj2f.execute-api.eu-north-1.amazonaws.com/Dev';

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setStatus('Thank you for your feedback!');
        setForm(initialState);
      } else {
        const result = await response.json();
        setStatus(result.error || 'Submission failed.');
      }
    } catch (err) {
      setStatus('Submission failed.');
    }
  };

  const handleReset = () => {
    setForm(initialState);
    setStatus('');
  };

  return (
    <div className="container">
      <div className="feedback-box">
        <h1>Customer Feedback</h1>
        <form onSubmit={handleSubmit} onReset={handleReset} autoComplete="off">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            pattern="[0-9]{10,15}"
          />
          <textarea
            name="feedback"
            placeholder="Please write your feedback"
            value={form.feedback}
            onChange={handleChange}
            required
            rows={4}
          />
          <div className="button-row">
            <button type="submit">Submit</button>
            <button type="reset" className="reset-btn">Reset</button>
          </div>
        </form>
        {status && <div className="status">{status}</div>}
      </div>
    </div>
  );
}

export default App;