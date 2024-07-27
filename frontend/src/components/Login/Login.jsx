import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../Alert/Alert';
import '../../Style/styles.css';
import Logo from '../../assets/Images/Logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleCloseAlert = () => {
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must be at least 6 characters & include a letter, a number, and a special character!');
      setError('Password Validation Error !');
      setTimeout(() => {
        setPasswordError('');
      },10000)
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/account/user/login', {
        email,
        password,
      });

      console.log('Server response:', response);

      if (response.status === 200 ) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('id', response.data.id);
        localStorage.setItem('role', response.data.role);
        window.dispatchEvent(new Event('loginStateChanged'));
        setSuccess('Login successful!');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        console.error('Unexpected response:', response);
        setError('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        setError(error.response.data.detail || 'Login failed. Please try again.');
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-login-bg bg-cover bg-center bg-blur p-4">
      <div className="transparent-bg p-4 rounded-lg shadow-md w-full max-w-xs">
        <img src={Logo} alt="Logo" className="h-16 mx-auto mb-2" />
        <h2 className="text-sm text-gray-500 text-center mb-2">By CodersUnited</h2>
        <form onSubmit={handleSubmit}>
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
              autoComplete="current-email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="block text-xs font-medium text-gray-700">Password</label>
            {passwordError && <div className="text-red-600 text-xs mb-1">{passwordError}</div>}
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
          <button 
            type="submit" 
            className="w-full py-1 px-3 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </form>
        {error && <Alert message={error} type="error" onClose={handleCloseAlert} />} 
        {success && <Alert message={success} type="success" onClose={handleCloseAlert} />}
        <div className="mt-4 text-center">
          <Link to="/forget-password" className="text-xs text-gray-700 hover:underline">Forgot Password?</Link>
          <p className="text-xs text-gray-700 mt-2">Don't have an account?</p>
          <Link to="/signup" className="w-full py-1 px-3 mt-2 inline-block text-center border border-transparent text-xs font-medium rounded-md text-white bg-green-700 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
