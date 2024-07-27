import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../Style/styles.css';
import Logo from '../../assets/Images/Logo.png';
import Alert from '../Alert/Alert';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleCloseAlert = () => {
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/account/user/send-otp', {
        email,
      });

      console.log('Server response:', response);

      if (response.status === 202) {
        setSuccess('OTP sent to your email!');
        setTimeout(() => {
          navigate('/otp-verification', { state: { email } });
        }, 2000);
      } else {
        setError('Email not found. Please try again.');
      }
    } catch (error) {
      console.error('Error during sending OTP:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        setError(error.response.data.detail || 'Email not found. Please try again.');
      } else {
        setError('Email not found. Please try again.');
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
          <button 
            type="submit" 
            className="w-full py-1 px-3 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Send OTP
          </button>
        </form>
        {error && <Alert message={error} type="error" onClose={handleCloseAlert} />} 
        {success && <Alert message={success} type="success" onClose={handleCloseAlert} />}
        <div className="mt-4 border-t border-gray-300 pt-2 text-center">
          <p className="text-xs text-gray-700">Remember your password?</p>
          <Link to="/login" className="w-full py-1 px-3 mt-2 inline-block text-center border border-transparent text-xs font-medium rounded-md text-white bg-green-700 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
