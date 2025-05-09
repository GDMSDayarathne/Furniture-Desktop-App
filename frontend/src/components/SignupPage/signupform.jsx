import React, { useState } from 'react';
import Axios from 'axios';
import './signup.css';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setMessage('Name is required.');
      return false;
    }
    if (!formData.email.trim()) {
      setMessage('Email is required.');
      return false;
    }
    if (!passwordRegex.test(formData.password)) {
      setMessage('Password must be at least 8 characters long, with at least one number and one symbol.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await Axios.post('http://localhost:3001/api/register', formData);
      if (response.status === 201) {
        setMessage('Account created successfully!');
        setFormData({ name: '', email: '', password: '' });
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || 'Signup failed!');
      } else {
        setMessage('Network error. Please try again.');
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left" />
      <div className="signup-right">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign up</h2>

          <div className="input-group">
            <span className="icon">👤</span>
            <input
              type="text"
              name="name"
              placeholder="Johnson Doe"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <span className="icon">📧</span>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <span className="icon">🔒</span>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="signup-btn">Sign Up</button>

          {message && <p className="signup-message">{message}</p>}
        </form>
      </div>
    </div>
  );
}
