import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../assets/Images/Logo.png';
import { handleLogout } from '../Login/Logout';
import Alert from '../Alert/Alert';

const Header = ({ onCategorySelect }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutError, setLogoutError] = useState('');
  const [logoutSuccess, setLogoutSuccess] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/main/get_category');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleLoginStateChanged = () => {
      setToken(localStorage.getItem('token'));
      setRole(localStorage.getItem('role'));
    };
    window.addEventListener('loginStateChanged', handleLoginStateChanged);

    return () => {
      window.removeEventListener('loginStateChanged', handleLoginStateChanged);
    };
  }, []);

  const handleCategoryChange = (categoryId, categoryName) => {
    if (onCategorySelect) {
      onCategorySelect(categoryId, categoryName);
      setMenuOpen(false);
      navigate('/');
    }
  };

  const handleLogoutClick = async () => {
    try {
      const { success, error } = await handleLogout({ onLogout: () => setToken(null) });

      if (success) {
        setLogoutSuccess(success);
        navigate(0);
      } else if (error) {
        setLogoutError(error);
      }
    } catch (error) {
      console.error('Logout failed', error);
      setLogoutError('Logout failed. Please try again.');
    }
  };

  const handleCloseAlert = () => {
    setLogoutError('');
    setLogoutSuccess('');
  };

  return (
    <header className="bg-gray-200 shadow-md sticky top-0 z-50 w-full">
      <nav className="bg-gray-200 border-b border-gray-300 mx-8 py-3">
        <div className="flex justify-between items-center w-11/12 mx-auto px-4">
          <div className="flex items-center">
            <a href="/">
              <img src={Logo} className="h-10 cursor-pointer transform hover:scale-110 transition duration-300" alt="Logo" />
            </a>
          </div>
          <div className="hidden lg:flex lg:items-center lg:space-x-14">
            {role === '1' && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `block py-2 duration-200 font-bold ${isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-700"} border-b-2 border-transparent hover:border-blue-600 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-600`
                }
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Dashboard
              </NavLink>
            )}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block py-2 duration-200 font-bold ${isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-700"} border-b-2 border-transparent hover:border-blue-600 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-600`
              }
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block py-2 duration-200 font-bold ${isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-700"} border-b-2 border-transparent hover:border-blue-600 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-600`
              }
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `block py-2 duration-200 font-bold ${isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-700"} border-b-2 border-transparent hover:border-blue-600 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-600`
              }
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Contact
            </NavLink>
            <div className="relative" onClick={() => setMenuOpen(!menuOpen)}>
              <button
                className="block py-2 text-base font-bold text-gray-700 border-b-2 border-transparent hover:border-blue-600 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-600"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Category
              </button>
              {menuOpen && (
                <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id, category.name)}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <NavLink
              to="/video"
              className={({ isActive }) =>
                `block py-2 duration-200 font-bold ${isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-700"} border-b-2 border-transparent hover:border-blue-600 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-600`
              }
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Video
            </NavLink>
          </div>
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                ></path>
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex items-center">
            {token ? (
              <button
                onClick={handleLogoutClick}
                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-semibold rounded-lg text-sm px-4 py-2 focus:outline-none"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Log out
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:ring-teal-300 font-semibold rounded-lg text-sm px-4 py-2 mr-2 focus:outline-none"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-sm px-4 py-2 focus:outline-none"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      {menuOpen && (
        <div className="lg:hidden bg-gray-200 shadow-md">
          <NavLink
            to="/"
            className="block px-4 py-2 text-gray-700 hover:text-gray-900 font-bold"
            style={{ fontFamily: 'Poppins, sans-serif' }}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="block px-4 py-2 text-gray-700 hover:text-gray-900 font-bold"
            style={{ fontFamily: 'Poppins, sans-serif' }}
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="block px-4 py-2 text-gray-700 hover:text-gray-900 font-bold"
            style={{ fontFamily: 'Poppins, sans-serif' }}
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </NavLink>
          <div className="block px-4 py-2 text-gray-700 hover:text-gray-900 font-bold">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-full text-left font-bold text-gray-700 hover:text-gray-900"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Category
            </button>
            {menuOpen && (
              <div className="bg-gray-200 shadow-md rounded-md mt-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id, category.name)}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <NavLink
            to="/video"
            className="block px-4 py-2 text-gray-700 hover:text-gray-900 font-bold"
            style={{ fontFamily: 'Poppins, sans-serif' }}
            onClick={() => setMenuOpen(false)}
          >
            Video
          </NavLink>
          {token ? (
            <button
              onClick={() => {
                handleLogoutClick();
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:text-gray-900 font-bold"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Log out
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-4 py-2 text-gray-700 hover:text-gray-900 focus:outline-none font-bold"
                style={{ fontFamily: 'Poppins, sans-serif' }}
                onClick={() => setMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="block px-4 py-2 text-gray-700 hover:text-gray-900 focus:outline-none font-bold"
                style={{ fontFamily: 'Poppins, sans-serif' }}
                onClick={() => setMenuOpen(false)}
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      )}
      {logoutError && <Alert message={logoutError} onClose={handleCloseAlert} type="error" />}
      {logoutSuccess && <Alert message={logoutSuccess} onClose={handleCloseAlert} type="success" />}
    </header>
  );
};

export default Header;
