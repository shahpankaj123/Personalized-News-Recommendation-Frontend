import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '../Alert/Alert';
import '../../Style/styles.css';
import Logo from '../../assets/Images/Logo.png';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [alert, setAlert] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ message: '', type: '' });
  
    if (password !== confirmPassword) {
      setAlert({ message: 'Passwords do not match', type: 'error' });
      return;
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must be at least 6 characters & include a letter, a number, and a special character!');
      setAlert({ message: 'Password Validation Error!', type: 'error' });
      setTimeout(() => {
        setPasswordError('');
      },9000)
      return;
    }
  
    const payload = {
      username,
      email,
      password,
      password1: confirmPassword,
    };
  
    console.log('Request payload:', payload);
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/account/user/register', payload);
  
      console.log('Server response:', response);
  
      if (response.status === 201) {
        setAlert({ message: 'Registration successful', type: 'success' });
        localStorage.setItem('isLoggedIn', 'true');
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        window.dispatchEvent(new Event('loginStateChanged'));
        setTimeout(() => {
          navigate('/login');
        }, 3000);
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        setAlert({ message: 'Registration failed. Please try again.', type: 'error' });
        
      }
    } catch (error) {
      if (error.response) {
        console.error('Server responded with error:', error.response.data);
        if (error.response.data.email) {
          setAlert({ message: 'User with this email address already exists.', type: 'error' });
        } else {
          setAlert({ message: error.response.data.detail || 'Registration failed. Please try again.', type: 'error' });
        }
      } else if (error.request) {
        console.error('No response received:', error.request);
        setAlert({ message: 'No response from server. Please try again later.', type: 'error' });
      } else {
        console.error('Error setting up request:', error.message);
        setAlert({ message: 'Registration failed. Please try again.', type: 'error' });
      }
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-signup-bg bg-cover bg-center bg-blur p-4">
      {alert.message && (
        <Alert message={alert.message} type={alert.type} onClose={() => setAlert({ message: '', type: '' })} />
      )}
      <div className="transparent-bg p-4 rounded-lg shadow-md w-full max-w-xs">
        <img src={Logo} alt="Logo" className="h-16 mx-auto mb-2" />
        <h2 className="text-sm text-gray-500 text-center mb-2">By CodersUnited</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="block text-xs font-medium text-gray-700">Username</label>
            <input 
              type="text" 
              id="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs" 
              placeholder="Enter your username" 
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="block text-xs font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs" 
              placeholder="Enter your email" 
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="block text-xs font-medium text-gray-700">Password</label>
            {passwordError && <div className="text-red-600 text-xs mb-1 ml-1">{passwordError}</div>}
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs" 
              placeholder="Enter your password" 
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirm-password" className="block text-xs font-medium text-gray-700">Confirm Password</label>
            <input 
              type="password" 
              id="confirm-password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs" 
              placeholder="Confirm your password" 
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-1 px-3 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign up
          </button>
        </form>
        {/* <div className="mt-4 border-t border-gray-300 pt-2 text-center">
          <button className="w-full py-1 px-3 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 flex items-center justify-center">
            <svg className="w-4 h-4 mr-1" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.1 0 5.6 1 7.8 2.9l5.8-5.8C33.9 3.2 29.3 1.5 24 1.5 14.9 1.5 7.4 7.9 4.8 16.4l6.9 5.4C13.3 16.3 18.2 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.4 24.5c0-1.5-.1-3-.4-4.5H24v9h12.7c-.6 3-2.4 5.5-5 7.2l7.6 5.9C42.8 37.6 46.4 31.6 46.4 24.5z"></path>
              <path fill="#FBBC05" d="M7.3 14.5L.3 8.1C-.3 10.5-1 13.1-1 15.8c0 3.1.7 6 2 8.7l6.8-5.4C7.4 17.5 7.3 16 7.3 14.5z"></path>
              <path fill="#34A853" d="M24 47.5c6.4 0 11.8-2.1 15.7-5.7l-7.6-5.9c-2.1 1.5-4.9 2.5-8.1 2.5-5.7 0-10.5-3.9-12.2-9.2L4.8 31.6C8.1 39.9 15.5 47.5 24 47.5z"></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
            Sign up with Gmail
          </button>
        </div> */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-700">Already have an account?</p>
          <Link to="/login" className="w-full py-1 px-3 mt-2 inline-block text-center border border-transparent text-xs font-medium rounded-md text-white bg-green-700 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
