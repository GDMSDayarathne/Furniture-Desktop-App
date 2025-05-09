import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Style.css';

export default function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      try {
        const adminResponse = await Axios.post('http://localhost:3001/api/admin/login', {
          email,
          password,
        });

        if (adminResponse.status === 200) {
          const { token, admin } = adminResponse.data;
          localStorage.setItem('authToken', token);
          localStorage.setItem('user', JSON.stringify({ ...admin, role: 'admin' }));
          setMessage('Admin login successful!');
          navigate('/dashboard');
          return;
        }
      } catch (adminError) {
        console.log("Not an admin, trying user login");
      }

      const userResponse = await Axios.post('http://localhost:3001/api/login', {
        email,
        password,
      });

      if (userResponse.status === 200) {
        const { token, user } = userResponse.data;
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        setMessage('Login successful!');
        navigate('/');
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || 'Login failed!');
      } else {
        setMessage('Network error. Please try again.');
      }
    }
  };

  return (
    <div className="Admin-login bg-white px-10 py-20 border-2 border-gray-200 w-full">
      <h1 className="text-5xl font-sans font-bold">Admin Login</h1><br />
      <p className="font-sans font-medium text-lg text-gray-500 mt-4">
        Welcome Back! Please enter your details.
      </p><br />
      <form onSubmit={handleLogin}>
        <div className="mt-8">
          <div>
            <label className="text-lg font-sans font-medium">Email</label>
            <input
              type="email"
              className="w-full border-2 border-black-600 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div><br />
          <div>
            <label className="text-lg font-sans font-medium">Password</label>
            <input
              type="password"
              className="w-full border-2 border-black-600 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mt-8 flex justify-between items-center">
            <div>
              <input type="checkbox" id="remember" />
              <label className="ml-2 font-medium text-base" htmlFor="remember">
                Remember me
              </label>
            </div>
            <button className="font-medium text-base text-[#018ABD]">Forgot Password</button>
          </div><br />
          <div className="mt-8 flex flex-col gap-y-4">
            <button
              type="submit"
              className="group active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl text-white text-lg font-bold"
              style={{ backgroundColor: '#018ABD' }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#004581')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#018ABD')}
            >
              Sign in
            </button>
          </div>
        </div>
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
}